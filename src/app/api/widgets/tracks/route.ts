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

    // 데이터가 없으면 fallback 반환
    if (!tracks || tracks.length === 0) {
      console.warn('⚠️ No tracks found in database, returning fallback data');
      return NextResponse.json([
        { id: 'hvQZs3k6Ytk', trackId: 'fallback-1', title: 'WISH (Korean Ver.)', album: 'WISH', themeColor: '#BFFF00' },
        { id: '2XqVNFBtVo4', trackId: 'fallback-2', title: 'Songbird', album: 'Songbird', themeColor: '#8EE3F5' },
        { id: '4vgac97VlCE', trackId: 'fallback-3', title: 'Dunk Shot', album: 'Dunk Shot', themeColor: '#FF6B6B' },
      ]);
    }

    // YouTube URL에서 video ID 추출
    const playlist = tracks
      .map((track) => {
        let videoId = '';
        
        if (track.mvUrl) {
          console.log(`🔍 Track: "${track.title}" | URL: ${track.mvUrl}`);
          
          // 다양한 YouTube URL 형식 지원:
          // - https://youtu.be/VIDEO_ID
          // - https://youtube.com/watch?v=VIDEO_ID
          // - https://www.youtube.com/watch?v=VIDEO_ID&feature=share
          // - https://m.youtube.com/watch?v=VIDEO_ID
          // - https://www.youtube.com/embed/VIDEO_ID
          const match = track.mvUrl.match(/(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/);
          if (match) {
            videoId = match[1];
            console.log(`   ✅ Extracted ID: ${videoId}`);
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
    
    // 데이터베이스 연결 실패 시 fallback 반환
    console.warn('⚠️ Database error, returning fallback data');
    return NextResponse.json([
      { id: 'hvQZs3k6Ytk', trackId: 'fallback-1', title: 'WISH (Korean Ver.)', album: 'WISH', themeColor: '#BFFF00' },
      { id: '2XqVNFBtVo4', trackId: 'fallback-2', title: 'Songbird', album: 'Songbird', themeColor: '#8EE3F5' },
      { id: '4vgac97VlCE', trackId: 'fallback-3', title: 'Dunk Shot', album: 'Dunk Shot', themeColor: '#FF6B6B' },
    ]);
  }
}
