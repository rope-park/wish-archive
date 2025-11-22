// prisma/seeds/03-albums.ts
import type { PrismaClient, Album } from '@prisma/client'

/**
 * 앨범 시드
 */
export async function seedAlbums(
  prisma: PrismaClient,
  groupId: string,
): Promise<Album[]> {
  const albums = [
    {
      title: 'Hands Up',
      releaseDate: new Date('2023-10-08'),
      type: 'DIGITAL_SINGLE' as const,
      market: 'JAPAN' as const,
      primaryLanguage: 'JAPANESE' as const,
      isPreDebut: true,
      isPreRelease: false,
      isOst: false,
      totalLengthSec: 6 * 60 + 15, // 6분 15초
      trackCount: 2,
      coverUrl: null, // TODO: 추가
      label: 'Avex Trax',
      distributor: 'Avex Entertainment',
      description: 'Pre-debut Single',
      catalogNumber: null,
      // 테마 설정
      mvUrl: 'https://youtu.be/ZVcy7bQkBhA',
      themeColor: '#C6B2FF',
      themeTextColor: '#2D1B4E',
      themeIcon: '🙌',
      groupId,
    },
    {
      title: 'WISH',
      releaseDate: new Date('2024-02-28'),
      type: 'SINGLE_ALBUM' as const,
      market: 'KOREA' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isPreRelease: false,
      isOst: false,
      totalLengthSec: 13 * 60 + 4,
      trackCount: 4,
      coverUrl: null,
      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment',
      description: 'The 1st Single',
      catalogNumber: null,
      // 테마 설정
      mvUrl: 'https://youtu.be/hvQZs3k6Ytk?si=VsbSFNYf1IdUTn04&t=50',
      themeColor: '#BFFF00',
      themeTextColor: '#000000',
      themeIcon: '💚',
      groupId,
    },
    {
      title: 'Songbird',
      releaseDate: new Date('2024-06-25'),
      type: 'SINGLE_ALBUM' as const,
      market: 'JAPAN' as const,
      primaryLanguage: 'JAPANESE' as const,
      isPreDebut: false,
      isPreRelease: false,
      isOst: false,
      totalLengthSec: 6 * 60 + 8,
      trackCount: 2,
      coverUrl: null,
      label: 'Avex Trax',
      distributor: 'Avex Entertainment',
      description: 'The 2nd Single (Japanese Ver.)',
      catalogNumber: null,
      // 테마 설정
      mvUrl: 'https://youtu.be/2XqVNFBtVo4?si=y-aefZXFXeC-XLsH&t=2',
      themeColor: '#8EE3F5',
      themeTextColor: '#004466',
      themeIcon: '🐦',
      groupId,
    },
    {
      title: 'Steady',
      releaseDate: new Date('2024-09-24'),
      type: 'MINI_ALBUM' as const,
      market: 'KOREA' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isPreRelease: false,
      isOst: false,
      totalLengthSec: 21 * 60 + 18,
      trackCount: 7,
      coverUrl: null,
      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment',
      description: 'The 1st Mini Album',
      catalogNumber: null,
      // 테마 설정
      mvUrl: 'https://youtu.be/IKlkZZv76Ho?si=PWRiLpqTfyuX6nE4',
      themeColor: '#FFB6D9',
      themeTextColor: '#660033',
      themeIcon: '💖',
      groupId,
    },
    {
      title: 'WISHFUL',
      releaseDate: new Date('2024-11-27'),
      type: 'STUDIO_ALBUM' as const,
      market: 'JAPAN' as const,
      primaryLanguage: 'JAPANESE' as const,
      isPreDebut: false,
      isPreRelease: false,
      isOst: false,
      totalLengthSec: 40 * 60 + 59,
      trackCount: 13,
      coverUrl: null,
      label: 'Avex Trax',
      distributor: 'Avex Entertainment',
      description: 'The 1st Japanese Album',
      catalogNumber: null,
      // 테마 설정
      mvUrl: 'https://youtu.be/2XqVNFBtVo4',
      themeColor: '#FFF89A',
      themeTextColor: '#4A4000',
      themeIcon: '✨',
      groupId,
    },
    {
      title: 'poppop',
      releaseDate: new Date('2025-04-14'),
      type: 'MINI_ALBUM' as const,
      market: 'KOREA' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isPreRelease: false,
      isOst: false,
      totalLengthSec: 17 * 60 + 56,
      trackCount: 6,
      coverUrl: null,
      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment',
      description: 'The 2nd Mini Album',
      catalogNumber: null,
      // 테마 설정
      mvUrl: null,
      themeColor: '#FF69B4',
      themeTextColor: '#FFFFFF',
      themeIcon: '🎈',
      groupId,
    },
    {
      title: 'COLOR',
      releaseDate: new Date('2025-09-01'),
      type: 'MINI_ALBUM' as const,
      market: 'KOREA' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isPreRelease: false,
      isOst: false,
      totalLengthSec: 21 * 60 + 14,
      trackCount: 7,
      coverUrl: null,
      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment',
      description: 'The 3rd Mini Album',
      catalogNumber: null,
      // 테마 설정
      mvUrl: null,
      themeColor: '#FF6B9D',
      themeTextColor: '#FFFFFF',
      themeIcon: '🌈',
      groupId,
    }
  ]

  const created: Album[] = []
  for (const album of albums) {
    const existing = await prisma.album.findFirst({
      where: { title: album.title },
    })
    if (existing) {
      created.push(existing)
      continue
    }

    const result = await prisma.album.create({
      data: album,
    })
    created.push(result)
  }

  console.log(`   ✓ Created ${created.length} albums`)
  return created
}