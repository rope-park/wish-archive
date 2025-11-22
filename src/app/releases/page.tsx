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

  return <AlbumSlider albums={albums} />;
}