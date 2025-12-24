/**
 * stat API route
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/stats
 * @returns 시스템 통계 데이터
 */
export async function GET() {
  try {
    // 1. 전체 카운트 통계 (병렬 실행)
    const [
      albumCount,
      trackCount,
      eventCount,
      contentCount,
      awardCount,
      recentEvents
    ] = await Promise.all([
      prisma.album.count(),
      prisma.track.count(),
      prisma.event.count(),
      prisma.content.count(),
      prisma.awardWin.count(),
      // 2. 최근 활동 로그 (프로세스 리스트용) - 최근 10개
      prisma.event.findMany({
        take: 10,
        orderBy: { date: 'desc' },
        select: {
          id: true,
          title: true,
          date: true,
          type: true,
        }
      })
    ]);

    // 3. 응답 데이터 구성
    const stats = {
      albums: albumCount,
      tracks: trackCount,
      events: eventCount,
      contents: contentCount,
      awards: awardCount,
      // 최근 로그를 프로세스 데이터처럼 가공
      recentLogs: recentEvents.map(event => ({
        id: event.id,
        name: `${event.title.replace(/\s+/g, '_')}.exe`, // 프로세스 이름처럼 변환
        date: event.date,
        type: event.type,
        // 재미를 위한 가상 메모리 사용량 (날짜 기반 난수)
        memUsage: Math.floor(Math.random() * 5000) + 1000 
      }))
    };

    return NextResponse.json(stats);

  } catch (error) {
    console.error('Stats API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system stats' }, 
      { status: 500 }
    );
  }
}