// src/app/api/archive/contents/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ContentType, EventType, Platform } from '@prisma/client';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // 1. 파라미터 파싱
    const eraId = searchParams.get('eraId');
    const memberIds = searchParams.get('memberIds')?.split(',') || []; // ex: "id1,id2"
    const categories = searchParams.get('categories')?.split(',') || []; // ex: "MUSIC_SHOW,BEHIND"

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // 2. 검색 조건 구성 (Where Clause)
    const whereClause: {
      AND: Array<Record<string, unknown>>
    } = {
      AND: [] // 모든 조건을 만족해야 함 (AND)
    };

    // (1) Era 필터: 해당 Era에 속한 Event나 Album에 연결된 컨텐츠
    if (eraId) {
      whereClause.AND.push({
        OR: [
          { event: { eraId: eraId } }, // 해당 Era의 이벤트에 연결된 것
          { album: { era: { id: eraId } } }, // 해당 Era의 앨범에 연결된 것 (Era <-> MainAlbum 관계가 아니라 Album -> Era 관계 확인 필요)
          // ⚠️ 스키마상 Album에는 Era 연결이 없을 수 있으므로, 날짜 기반이나 Event 연결 위주로 검색
        ]
      });
    }

    // (2) 멤버 필터: 선택된 멤버 중 '하나라도' 포함된 컨텐츠 (OR)
    if (memberIds.length > 0) {
      whereClause.AND.push({
        members: {
          some: {
            memberId: { in: memberIds }
          }
        }
      });
    }

    // (3) 카테고리 필터: EventType 또는 ContentType 매칭
    if (categories.length > 0) {
      const categoryConditions = [];

      const eventTypes = Object.values(EventType);
      const contentTypes = Object.values(ContentType);

      const targetEventTypes: EventType[] = [];
      const targetContentTypes: ContentType[] = [];

      categories.forEach((cat) => {
        // 타입 단언을 사용하여 체크 (실제로는 문자열 비교)
        if (eventTypes.includes(cat as EventType)) {
          targetEventTypes.push(cat as EventType);
        } else if (contentTypes.includes(cat as ContentType)) {
          targetContentTypes.push(cat as ContentType);
        }
      });

      // A. EventType 매칭 (스케줄 성격: 음악방송, 공연, 발매 등)
      if (targetEventTypes.length > 0) {
        categoryConditions.push({
          event: { type: { in: targetEventTypes } }
        });
      }

      // B. ContentType 매칭 (자료 성격: MV, 자컨, 커버곡, 직캠 등)
      if (targetContentTypes.length > 0) {
        categoryConditions.push({
          cType: { in: targetContentTypes }
        });
      }

      // 위 조건 중 하나라도 만족하면 됨 (OR)
      // 예: categories=MUSIC_SHOW,MV -> (이벤트가 음방) OR (컨텐츠 타입이 MV)
      if (categoryConditions.length > 0) {
        whereClause.AND.push({ OR: categoryConditions });
      }
    }

    // 3. DB 조회
    const [contents, total] = await Promise.all([
      prisma.content.findMany({
        where: whereClause,
        orderBy: { publishedAt: 'desc' }, // 최신순 정렬
        take: limit,
        skip: skip,
        include: {
          event: { select: { title: true, type: true } }, // 연결된 이벤트 정보
          album: { select: { title: true } }, // 연결된 앨범 정보
          members: {
            include: { member: { select: { stageName: true, colorCode: true } } }
          } // 출연 멤버 정보
        }
      }),
      prisma.content.count({ where: whereClause })
    ]);

    return NextResponse.json({
      data: contents,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Archive Content API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch contents' }, { status: 500 });
  }
}