/**
 * WISH 앨범 전용 상세 페이지
 * 
 * 데뷔 싱글의 스크랩북 감성을 살린 특별한 디자인
 * - 형광 라임 (#DFFF00) 메인 컬러
 * - 콜라주 & 포토북 스타일
 * - CD 플레이어 인터랙션
 * - 위츄 캐릭터 등장
 */

import { prisma } from '@/lib/prisma';
import WishScrapbook from '@/components/domain/releases/AlbumDetail';
import { notFound } from 'next/navigation';

// WISH 앨범 데이터 가져오기
async function getWishAlbum() {
  const album = await prisma.album.findFirst({
    where: {
      title: {
        contains: 'WISH',
        mode: 'insensitive',
      },
      type: 'SINGLE_ALBUM', // 데뷔 싱글
    },
    include: {
      tracks: {
        orderBy: { trackNumber: 'asc' },
      },
    },
  });

  if (!album) {
    notFound();
  }

  return album;
}

export default async function WishAlbumPage() {
  const album = await getWishAlbum();

  return <WishScrapbook album={album} />;
}

export const metadata = {
  title: 'WISH - NCT WISH Archive',
  description: 'NCT WISH 데뷔 싱글 WISH의 특별한 스크랩북 페이지',
};
