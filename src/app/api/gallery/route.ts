/**
 * Gallery API Route
 */
import { NextResponse } from 'next/server';
import { Platform, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ----------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------
export interface GalleryItem {
  id: string;
  name: string;
  type: 'folder' | 'image';
  path?: string;   // 폴더일 때: 전체 경로
  src?: string;    // 이미지일 때: URL
  width?: number;
  height?: number;
  caption?: string | null; // 메타데이터 (Context)
  format?: string;
  createdAt?: string;
  tags?: string[];
  platform?: string; // 플랫폼 정보
}

/**
 * GET /api/gallery
 * @returns 갤러리 폴더 및 이미지 목록
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // mode: 'folder' (탐색기) | 'widget' (위젯/전체검색)
    const mode = searchParams.get('mode') || 'folder';
    // path: 폴더 경로 (예: nct-wish/2024/0221_debut)
    const path = searchParams.get('path') || 'nct-wish';

    // tag: 필터링 태그
    const tag = searchParams.get('tag') || '';

    let items: GalleryItem[] = [];

    // ---------------------------------------------------------
    // Path Parsing Logic
    // ---------------------------------------------------------
    // Path Structure: 'nct-wish' (Root) -> 'YYYY' (Year) -> 'EventTitle' (Event)

    const parts = path.split('/').filter(p => p !== 'nct-wish' && p !== '');
    const depth = parts.length; // 0: Root, 1: Year, 2: Event

    // ---------------------------------------------------------
    // 1. Root Level (List Years)
    // ---------------------------------------------------------
    if (depth === 0) {
      // DB에서 이벤트가 존재하는 연도 추출
      const events = await prisma.event.findMany({
        select: { date: true },
        orderBy: { date: 'desc' }
      });

      const years = Array.from(new Set(events.map(e => e.date.getFullYear().toString())));

      items = years.map(year => ({
        id: year,
        name: year,
        type: 'folder',
        path: `nct-wish/${year}`,
        createdAt: new Date().toISOString() // Dummy
      }));
    }

    // ---------------------------------------------------------
    // 2. Year Level (List Events in Year)
    // ---------------------------------------------------------
    else if (depth === 1) {
      const yearStr = parts[0];
      const yearStart = new Date(`${yearStr}-01-01`);
      const yearEnd = new Date(`${yearStr}-12-31`);

      const events = await prisma.event.findMany({
        where: {
          date: {
            gte: yearStart,
            lte: yearEnd
          }
        },
        select: {
          id: true,
          title: true,
          date: true,
          type: true,
          _count: {
            select: { galleryPosts: true }
          }
        },
        orderBy: { date: 'desc' }
      });

      // 갤러리 포스트가 있는 이벤트만 보여주거나, 모든 이벤트를 보여줄지 결정
      // 여기서는 모든 이벤트를 보여주되, 포스트 수를 표시할 수 있음
      items = events.map(event => {
        // 폴더 이름: 날짜_제목 (예: 0221_Debut)
        // 특수문자 제거 및 포맷팅
        const safeTitle = event.title.replace(/[\/\s]/g, "_");
        const dateStr = event.date.toISOString().split('T')[0]; // YYYY-MM-DD
        const monthDay = dateStr.substring(5).replace('-', ''); // MMDD
        const folderName = `${monthDay}_${safeTitle}`;

        return {
          id: event.id,
          name: folderName, // 화면에 표시될 폴더명 (실제 사용자에게 보여짐)
          type: 'folder',
          path: `nct-wish/${yearStr}/${folderName}`, // 클릭 시 이동 경로
          caption: `${event.type} • ${event._count.galleryPosts} items`,
          createdAt: event.date.toISOString(),
          tags: [event.type]
        };
      });
    }

    // ---------------------------------------------------------
    // 3. Event Level (List GalleryPosts)
    // ---------------------------------------------------------
    else if (depth === 2) {
      const yearStr = parts[0];
      const folderName = parts[1]; // MMDD_Title

      // 폴더명에서 DB 검색을 위해... ID를 역추적하기 어려우므로
      // 폴더 구조보다는 Event ID를 path에 포함시키는 게 좋지만, 
      // 현재 path 구조를 유지하려면, 해당 연도의 이벤트 중 folderName과 매칭되는 것을 찾아야 함.
      // 또는, 상위에서 path를 만들 때 ID를 포함시켰으면 좋았을 것임.
      // 하지만 UI 친화적인 URL을 위해, 검색을 시도함.

      // folderName 예: 0221_Debut
      // 날짜(0221)와 제목(Debut)으로 추정
      // 하지만 제목에 _가 있을 수 있어서 불확실함.

      // 해결책: 2단계(Year Level)에서 path에 ID를 쿼리 파라미터로 숨기거나, 
      // path 자체를 ID 기반으로 바꾸는 게 좋음. 하지만 사용자가 보는 주소창 UI라면...
      // 여기서는 "간편하게" folderName을 파싱하지 않고, 
      // DB에서 해당 연도의 모든 이벤트를 가져와서 'generateFolderName' 로직과 일치하는 놈을 찾거나
      // *가장 확실한 방법*: path에 id를 포함하는 것. `nct-wish/2024/EventID` 
      // 하지만 이러면 직관적이지 않음.

      // 타협: path에 `EventID_Title` 형식을 사용하자. (수정 필요)
      // 위의 2단계 로직을 수정하지 않고, 여기서 folderName 매칭을 시도.

      // 1. 해당 연도의 모든 이벤트 로드
      const yearStart = new Date(`${yearStr}-01-01`);
      const yearEnd = new Date(`${yearStr}-12-31`);

      const events = await prisma.event.findMany({
        where: {
          date: { gte: yearStart, lte: yearEnd }
        },
        include: {
          galleryPosts: true
        }
      });

      const matchedEvent = events.find(event => {
        const safeTitle = event.title.replace(/[\/\s]/g, "_");
        const dateStr = event.date.toISOString().split('T')[0];
        const monthDay = dateStr.substring(5).replace('-', '');
        const generatedFolderName = `${monthDay}_${safeTitle}`;
        return generatedFolderName === folderName;
      });

      if (matchedEvent && matchedEvent.galleryPosts) {
        items = matchedEvent.galleryPosts.map(post => ({
          id: post.id,
          name: `${post.platform}_${post.id}`, // 임의 이름
          type: 'image',
          src: post.imageUrl, // 실제 이미지 URL
          caption: post.caption || post.category,
          format: 'jpg', // 가정
          createdAt: post.createdAt.toISOString(),
          platform: post.platform,
          tags: [post.platform, post.category || 'OFFICIAL']
        }));
      }
    }

    // ---------------------------------------------------------
    // 4. Widget Mode (Search by Tag) - DB 구현
    // ---------------------------------------------------------
    // 위젯 모드는 보통 Random Photo 등을 원함.
    // 여기서는 간단히 전체 중 최신 n개를 가져오거나 랜덤을 해야 함.
    if (mode === 'widget') {
      // 태그가 있으면 필터링 (플랫폼, 타입 등)
      // 예: tag='INSTAGRAM'
      // 예: subTag='OFFICIAL'

      const posts = await prisma.galleryPost.findMany({
        where: {
          AND: [
            tag ? { platform: tag as Platform } : {}, // 대강 매핑
            // 추가 필터 필요 시
          ]
        },
        take: 20,
        orderBy: { createdAt: 'desc' }
      });

      items = posts.map(post => ({
        id: post.id,
        name: post.id,
        type: 'image',
        src: post.imageUrl,
        createdAt: post.createdAt.toISOString(),
        caption: post.caption,
        path: "",
        platform: post.platform
      }));
    }

    return NextResponse.json({
      mode,
      path,
      filterTag: tag,
      items
    });

  } catch (error) {
    console.error('Gallery API Critical Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}