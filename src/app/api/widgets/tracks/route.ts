import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/widgets/tracks
 * MV가 있는 트랙 목록 조회 (미니플레이어용)
 */
export async function GET() {
  try {
    console.log('🎵 API: Fetching tracks with MVs...');
    
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
            iconUrl: true,
          },
        },
      },
      orderBy: {
        releaseDate: 'desc',
      },
    });

    console.log(`✅ Found ${tracks.length} tracks`);

    // YouTube URL에서 video ID 추출
    const playlist = tracks
      .map((track) => {
        let videoId = '';
        
        if (track.mvUrl) {
          // youtu.be/VIDEO_ID 또는 youtube.com/watch?v=VIDEO_ID 형식 지원
          const match = track.mvUrl.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
          if (match) {
            videoId = match[1];
          } else {
            console.warn(`⚠️ Failed to extract ID from: ${track.mvUrl}`);
          }
        }

        return {
          id: videoId,
          trackId: track.id,
          title: track.title,
          album: track.album.title,
          themeColor: track.themeColor,
        };
      })
      .filter(item => {
        // 플레이스홀더 패턴 제외: example, _VIDEO_ID_, _MV_, 등
        const placeholderPatterns = [
          'example',
          '_VIDEO_ID_',
          '_MV_',
          '_STAGE_',
          /^_.*_$/,  // 앞뒤 언더스코어
        ];
        
        const isPlaceholder = placeholderPatterns.some(pattern => {
          if (typeof pattern === 'string') {
            return item.id.toLowerCase().includes(pattern.toLowerCase());
          }
          return pattern.test(item.id);
        });
        
        // 유효한 YouTube ID: 정확히 11자, 영숫자/언더스코어/하이픈만
        const isValidLength = item.id.length === 11;
        const isValidFormat = /^[a-zA-Z0-9_-]{11}$/.test(item.id);
        
        const isValid = item.id && isValidLength && isValidFormat && !isPlaceholder;
        
        if (!isValid && item.id) {
          console.warn(`⚠️ Filtered out invalid video ID: ${item.id} for ${item.title}`);
        }
        
        return isValid;
      });

    console.log(`✅ Returning ${playlist.length} valid tracks`);
    return NextResponse.json(playlist);
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tracks', details: String(error) },
      { status: 500 }
    );
  }
}
