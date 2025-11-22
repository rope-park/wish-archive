/**
 * 음반 상세 페이지
 * 
 * - 앨범 커버 및 기본 정보
 * - 트랙 리스트
 * - 차트 성적
 * - 인증 정보
 */

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import TrackTable from '@/components/domain/releases/TrackTable';
import Link from 'next/link';
import Image from 'next/image';

// 릴리스 타입 한글 변환
function getReleaseTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    STUDIO_ALBUM: '정규',
    MINI_ALBUM: '미니',
    SINGLE_ALBUM: '싱글',
    DIGITAL_SINGLE: '디지털 싱글',
    PARTICIPATION: '참여',
  };
  return labels[type] || type;
}

// 시장 한글 변환
function getMarketLabel(market: string): string {
  const labels: Record<string, string> = {
    KOREA: '한국',
    JAPAN: '일본',
    GLOBAL: '글로벌',
  };
  return labels[market] || market;
}

/**
 * 동적 메타데이터 생성
 * @param param0 - params 객체
 * @returns params 기반 메타데이터
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const album = await prisma.album.findUnique({
    where: { id },
  });

  if (!album) {
    return {
      title: 'Album Not Found',
    };
  }

  return {
    title: `${album.title} - NCT WISH`,
    description: `NCT WISH의 ${getReleaseTypeLabel(album.type)} 앨범 ${album.title}`,
  };
}

/**
 * 앨범 상세 페이지 컴포넌트
 * @param param0 - params 객체
 * @returns 앨범 상세 페이지 JSX
 */
export default async function AlbumDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // 앨범 정보 조회
  const album = await prisma.album.findUnique({
    where: { id },
    include: {
      tracks: {
        orderBy: { trackNumber: 'asc' },
      },
      chartEntries: {
        include: {
          chart: true,
        },
        orderBy: {
          weekStart: 'desc',
        },
        take: 10,
      },
      certifications: {
        include: {},
        orderBy: {
          date: 'desc',
        },
      },
    },
  });

  if (!album) {
    notFound();
  }

  // 최고 차트 순위 계산
  const bestChartPosition = album.chartEntries.length > 0
    ? Math.min(...album.chartEntries.map((entry) => entry.position))
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* 앨범 헤더 */}
      <Card className="mb-8">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex justify-center sm:justify-start">
            {album.coverUrl ? (
              <Image
                src={album.coverUrl}
                alt={album.title}
                width={256}
                height={256}
                priority
                className="h-64 w-64 rounded-lg object-cover shadow-lg"
              />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center rounded-lg bg-linear-to-br from-blue-400 to-purple-500">
                <span className="text-6xl">💿</span>
              </div>
            )}
          </div>

          {/* 앨범 정보 */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="mb-2 flex flex-wrap gap-2">
                <Badge variant="primary">{getReleaseTypeLabel(album.type)}</Badge>
                <Badge variant="info">{getMarketLabel(album.market)}</Badge>
                {album.isPreDebut && <Badge variant="warning">프리데뷔</Badge>}
                {album.isPreRelease && <Badge variant="warning">선공개</Badge>}
                {album.isOst && <Badge variant="default">OST/참여</Badge>}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">{album.title}</h1>
              <p className="mt-2 text-lg text-gray-600">
                {new Date(album.releaseDate).toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {/* 앨범 상세 정보 */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {album.trackCount && (
                <div>
                  <span className="text-sm font-medium text-gray-700">트랙 수</span>
                  <p className="text-gray-900">{album.trackCount}곡</p>
                </div>
              )}

              {album.totalLengthSec && (
                <div>
                  <span className="text-sm font-medium text-gray-700">총 재생시간</span>
                  <p className="text-gray-900">
                    {Math.floor(album.totalLengthSec / 60)}분{' '}
                    {album.totalLengthSec % 60}초
                  </p>
                </div>
              )}

              {album.label && (
                <div>
                  <span className="text-sm font-medium text-gray-700">레이블</span>
                  <p className="text-gray-900">{album.label}</p>
                </div>
              )}

              {album.distributor && (
                <div>
                  <span className="text-sm font-medium text-gray-700">유통사</span>
                  <p className="text-gray-900">{album.distributor}</p>
                </div>
              )}

              {album.catalogNumber && (
                <div>
                  <span className="text-sm font-medium text-gray-700">카탈로그 번호</span>
                  <p className="text-gray-900">{album.catalogNumber}</p>
                </div>
              )}

              {bestChartPosition && (
                <div>
                  <span className="text-sm font-medium text-gray-700">최고 차트 순위</span>
                  <p className="text-gray-900">#{bestChartPosition}</p>
                </div>
              )}
            </div>

            {/* 설명 */}
            {album.description && (
              <div className="border-t pt-4">
                <p className="text-sm text-gray-600">{album.description}</p>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* 트랙 리스트 */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-bold text-gray-900">트랙 리스트</h2>
        {album.tracks.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500">등록된 트랙이 없습니다.</p>
          </Card>
        ) : (
          <TrackTable tracks={album.tracks} />
        )}
      </section>

      {/* 차트 성적 */}
      {album.chartEntries.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">차트 성적</h2>
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      차트
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      주차
                    </th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">
                      순위
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {album.chartEntries.map((entry) => (
                    <tr key={entry.id} className="border-b last:border-0">
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {entry.chart.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(entry.weekStart).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-4 py-3 text-right text-sm font-medium text-gray-900">
                        #{entry.position}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>
      )}

      {/* 인증 */}
      {album.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-gray-900">인증</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {album.certifications.map((cert) => (
              <Card key={cert.id}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="success">{cert.level}</Badge>
                    <span className="text-sm font-medium text-gray-700">
                      {cert.body}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {new Date(cert.date).toLocaleDateString('ko-KR')}
                  </p>
                  {cert.units && (
                    <p className="text-xs text-gray-500">
                      {cert.units.toLocaleString()} units
                    </p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 뒤로 가기 */}
      <div className="mt-8 text-center">
        <Link
          href="/releases"
          className="text-blue-600 hover:underline"
        >
          ← 전체 음반 보기
        </Link>
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicAlbum',
            name: album.title,
            albumProductionType: album.type,
            albumReleaseType: album.market,
            datePublished: album.releaseDate.toISOString().split('T')[0],
            numTracks: album.trackCount,
            byArtist: {
              '@type': 'MusicGroup',
              name: 'NCT WISH',
            },
            track: album.tracks.map((track) => ({
              '@type': 'MusicRecording',
              name: track.title,
              position: track.trackNumber,
              duration: track.durationSec ? `PT${track.durationSec}S` : undefined,
            })),
          }),
        }}
      />
    </div>
  );
}
