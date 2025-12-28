/**
 * Gallery API Route
 */
import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

// ----------------------------------------------------------------------
// Interfaces
// ----------------------------------------------------------------------
export interface GalleryItem {
  id?: string;
  name: string;
  type: 'folder' | 'image';
  path?: string;   // 폴더일 때: 전체 경로
  src?: string;    // 이미지일 때: URL
  width?: number;
  height?: number;
  caption?: string; // 메타데이터 (Context)
  format?: string;
  createdAt?: string;
  tags?: string[]; // 프론트엔드 필터링용 태그 목록
}

interface CloudinaryFolder {
  name: string;
  path: string;
}

interface CloudinaryResource {
  public_id: string;
  filename: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  created_at: string;
  tags?: string[];
  context?: {
    custom?: Record<string, string>;
  };
}

/**
 * GET /api/gallery
 * @returns 갤러리 폴더 및 이미지 목록
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ---------------------------------------------------------
    // 1. 파라미터 정의
    // ---------------------------------------------------------
    // mode: 'folder' (탐색기) | 'widget' (위젯/전체검색)
    // * 기존 'tag' 모드는 'widget'으로 통합 사용 권장
    const mode = searchParams.get('mode') || 'folder';

    // path: 폴더 경로 (예: nct-wish/events/2024/0221_debut)
    const path = searchParams.get('path') || 'nct-wish';

    // tag: 
    // - mode='widget'일 때: 메인 검색 태그 (예: widget-polaroid)
    // - mode='folder'일 때: 폴더 내 필터링 태그 (예: sion)
    const tag = searchParams.get('tag') || '';

    // subTag: 위젯 모드에서 추가 필터링 (예: widget-photocard AND sion)
    const subTag = searchParams.get('subTag') || '';

    let items: GalleryItem[] = [];
    let expression = '';

    // ---------------------------------------------------------
    // 2. 검색 조건(Expression) 생성 로직
    // ---------------------------------------------------------
    
    // CASE A: 위젯 모드 (폴더 무시, 전체 태그 검색)
    if (mode === 'widget' || mode === 'tag') { 
      if (!tag) return NextResponse.json({ items: [] });
      
      expression = `tags:${tag}`;
      // 서브 태그가 있다면 교집합 검색 (AND)
      if (subTag) {
        expression += ` AND tags:${subTag}`;
      }
    } 
    // CASE B: 폴더 모드 (특정 폴더 내 검색)
    else {
      expression = `folder:"${path}"`;
      
      // ✨ 핵심 업그레이드: 폴더 안에서 특정 태그(멤버)만 필터링
      // 예: events폴더 안에서 'sion' 태그가 있는 사진만 검색
      if (tag) {
        expression += ` AND tags:${tag}`;
      }
    }

    // ---------------------------------------------------------
    // 3. 하위 폴더 가져오기 (탐색기 모드 && 필터 없을 때만)
    // ---------------------------------------------------------
    // 태그 필터링 중일 때는(예: 시온 사진만 보기) 하위 폴더를 보여주지 않는 것이 UX상 자연스러움
    if ((mode === 'folder') && !tag) {
      try {
        const folderRes = await cloudinary.api.sub_folders(path);
        const folders = folderRes.folders.map((f: CloudinaryFolder) => ({
          id: f.path,
          name: f.name,
          type: 'folder',
          path: f.path,
        }));
        items = [...items, ...folders];
      } catch (e) {
        // 하위 폴더가 없거나 에러가 나도(빈 폴더 등) 이미지 검색은 진행해야 함
      }
    }

    // ---------------------------------------------------------
    // 4. 이미지 가져오기 (Cloudinary Search API)
    // ---------------------------------------------------------
    try {
      const imageRes = await cloudinary.search
        .expression(expression)
        .sort_by('created_at', 'desc') // 최신순 정렬
        .max_results(100)              // 최대 100장 (필요시 페이징 추가 가능)
        .with_field('context')         // 캡션(Context) 포함
        .with_field('tags')            // 태그 정보 포함
        .execute();

      const images = imageRes.resources.map((file: CloudinaryResource) => {
        // 캡션 우선순위: caption > alt > description > 빈문자열
        const contextData = file.context?.custom || {};
        const caption = contextData.caption || contextData.alt || contextData.description || '';

        return {
          id: file.public_id,
          name: file.filename,
          type: 'image',
          src: file.secure_url,
          width: file.width,
          height: file.height,
          format: file.format,
          createdAt: file.created_at,
          caption: caption,
          tags: file.tags || []
        };
      });

      items = [...items, ...images];
    } catch (e) {
      console.error('Cloudinary Search Error:', e);
      // 이미지는 못 가져와도 위에서 가져온 폴더는 보여줌
    }

    // ---------------------------------------------------------
    // 5. 최종 응답
    // ---------------------------------------------------------
    return NextResponse.json({
      mode,
      path,
      filterTag: tag, // 현재 적용된 필터 태그 정보 반환
      items
    });

  } catch (error) {
    console.error('Gallery API Critical Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}