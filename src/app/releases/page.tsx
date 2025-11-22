/**
 * 음반 목록 페이지 (RELEASES)
 * 
 * 풀스크린 슬라이더 형태의 앨범 아카이브
 * - 영상 레퍼런스 스타일: 하단 네비게이션, 배경 컬러 전환
 * - Framer Motion 기반 부드러운 애니메이션
 * - Y2K 키치 감성
 */

import { prisma } from '@/lib/prisma';
import AlbumSlider from '@/components/domain/releases/AlbumSlider';
import WindowFrame from '@/components/os/WindowFrame';

// DB에서 앨범 데이터 가져오기 (트랙 포함)
async function getAlbums() {
  const albums = await prisma.album.findMany({
    orderBy: { releaseDate: 'desc' },
    include: {
      tracks: {
        orderBy: { trackNumber: 'asc' },
      },
    },
  });
  return albums;
}

export default async function ReleasesPage() {
  const albums = await getAlbums();

  return (
    <WindowFrame title="DISCOGRAPHY PLAYER" icon="💿">
      <div className="w-full h-full flex flex-col">
        <div className="flex-1 relative rounded-xl overflow-hidden border-2 border-black shadow-inner bg-black">
          <AlbumSlider albums={albums} />
        </div>

        <div className="mt-3 text-center">
          <p className="font-press-start-2p text-[10px] text-gray-500 animate-pulse">
            USE ARROW KEYS TO NAVIGATE
          </p>
        </div>
      </div>
    </WindowFrame>
  );
}