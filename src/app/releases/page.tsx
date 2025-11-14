/**
 * 음반 목록 페이지
 * 
 * - 앨범 그리드 표시
 * - 필터: 타입, 시장, 연도
 * - 정렬: 최신순, 타입별
 */

import { prisma } from '@/lib/prisma';
import AlbumCard from '@/components/domain/releases/AlbumCard';
import type { ReleaseType, Market } from '@prisma/client';
import type { Metadata } from 'next';
import EmptyState from '@/components/ui/EmptyState';

export const metadata: Metadata = {
  title: 'Releases',
  description: 'NCT WISH의 모든 음반 - 정규, 미니, 싱글, 디지털',
};

export default async function ReleasesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 필터 파라미터
  const typeParam = searchParams.type as string | undefined;
  const marketParam = searchParams.market as string | undefined;
  const year = searchParams.year ? parseInt(searchParams.year as string) : undefined;

  // 유효한 enum 값만 사용
  const validTypes: ReleaseType[] = ['STUDIO_ALBUM', 'MINI_ALBUM', 'SINGLE_ALBUM', 'DIGITAL_SINGLE', 'PARTICIPATION'];
  const validMarkets: Market[] = ['KOREA', 'JAPAN', 'GLOBAL'];

  const type: ReleaseType | undefined = typeParam && validTypes.includes(typeParam as ReleaseType) 
    ? (typeParam as ReleaseType) 
    : undefined;
  
  const market: Market | undefined = marketParam && validMarkets.includes(marketParam as Market)
    ? (marketParam as Market)
    : undefined;

  // WHERE 조건
  interface WhereClause {
    type?: ReleaseType;
    market?: Market;
    releaseDate?: {
      gte: Date;
      lt: Date;
    };
  }

  const where: WhereClause = {};

  if (type) {
    where.type = type;
  }

  if (market) {
    where.market = market;
  }

  if (year) {
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year + 1, 0, 1);
    where.releaseDate = {
      gte: yearStart,
      lt: yearEnd,
    };
  }

  // 앨범 조회
  const albums = await prisma.album.findMany({
    where,
    orderBy: { releaseDate: 'desc' },
    take: 40,
  });

  // 연도 목록
  const years = await prisma.album.findMany({
    select: { releaseDate: true },
    orderBy: { releaseDate: 'desc' },
    distinct: ['releaseDate'],
  });

  const uniqueYears = Array.from(
    new Set(years.map((a) => new Date(a.releaseDate).getFullYear()))
  ).sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* 헤더 */}
      <header className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Releases</h1>
        <p className="text-sm text-gray-600 sm:text-base">
          NCT WISH의 모든 음반
        </p>
      </header>

      {/* 필터 탭 - 타입 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/releases"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            !typeParam ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          전체
        </a>
        <a
          href="/releases?type=STUDIO_ALBUM"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            typeParam === 'STUDIO_ALBUM' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          정규
        </a>
        <a
          href="/releases?type=MINI_ALBUM"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            typeParam === 'MINI_ALBUM' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          미니
        </a>
        <a
          href="/releases?type=SINGLE_ALBUM"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            typeParam === 'SINGLE_ALBUM' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          싱글
        </a>
        <a
          href="/releases?type=DIGITAL_SINGLE"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            typeParam === 'DIGITAL_SINGLE' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          디지털
        </a>
      </div>

      {/* 시장 & 연도 필터 */}
      <div className="mb-6 flex flex-wrap items-center gap-4">
        {/* 시장 */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">시장:</span>
          <a
            href="/releases"
            className={`rounded px-2 py-1 text-sm transition-colors ${
              !marketParam ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            전체
          </a>
          <a
            href="/releases?market=KOREA"
            className={`rounded px-2 py-1 text-sm transition-colors ${
              marketParam === 'KOREA' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            한국
          </a>
          <a
            href="/releases?market=JAPAN"
            className={`rounded px-2 py-1 text-sm transition-colors ${
              marketParam === 'JAPAN' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            일본
          </a>
        </div>

        {/* 연도 */}
        {uniqueYears.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">연도:</span>
            {uniqueYears.map((y) => (
              <a
                key={y}
                href={`/releases?year=${y}`}
                className={`rounded px-2 py-1 text-sm transition-colors ${
                  year === y ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {y}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* 앨범 그리드 */}
      {albums.length === 0 ? (
        <EmptyState
          icon={<EmptyState.Icon.NoData />}
          title="앨범이 없습니다"
          description="조건에 맞는 앨범을 찾을 수 없습니다."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: albums.slice(0, 10).map((album, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'MusicAlbum',
                name: album.title,
                releaseDate: album.releaseDate.toISOString(),
                albumProductionType: album.type,
                image: album.coverUrl || '',
              },
            })),
          }),
        }}
      />
    </div>
  );
}
