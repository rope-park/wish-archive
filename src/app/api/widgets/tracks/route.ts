/**
 * Tracks Widget API Route
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/widgets/tracks
 */
export async function GET() {
  try {
    const tracks = await prisma.track.findMany({
      where: {
        hasMv: true,
        mvUrl: {
          not: null,
        },
      },
      select: {
        id: true,
        title: true,
        mvUrl: true,
        themeColor: true,
        album: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        releaseDate: 'desc',
      },
    });

    console.log(`✅ Found ${tracks.length} tracks`);

    // 데이터가 없으면 fallback 반환
    if (!tracks || tracks.length === 0) {
      console.warn('⚠️ No tracks found in database, returning fallback data');
      return NextResponse.json([]);
    }

    // YouTube URL에서 video ID 추출
    const playlist = tracks
      .map((track) => {
        if (!track.mvUrl) return null;

        // 다양한 YouTube URL 형식 지원:
        // - https://youtu.be/VIDEO_ID
        // - https://youtube.com/watch?v=VIDEO_ID
        // - https://www.youtube.com/watch?v=VIDEO_ID&feature=share
        // - https://m.youtube.com/watch?v=VIDEO_ID
        // - https://www.youtube.com/embed/VIDEO_ID
        const match = track.mvUrl.match(/(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
        if (!match) return null;

        return {
          id: match[1],
          trackId: track.id,
          title: track.title,
          album: track.album.title,
          themeColor: track.themeColor,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
    console.log(`✅ Returning ${playlist.length} valid tracks`);
    return NextResponse.json(playlist);

  } catch (error) {
    console.error('❌ API Error:', error);

    // 데이터베이스 연결 실패 시 fallback 반환
    console.warn('⚠️ Database error, returning fallback data');
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
