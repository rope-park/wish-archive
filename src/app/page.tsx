/**
 * 홈 페이지
 * 
 * - Hero 섹션
 * - 최근 발매 앨범
 * - 다가오는 일정
 * - 최근 활동 타임라인
 */

import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import AlbumCard from '@/components/domain/releases/AlbumCard';
import EventCard from '@/components/domain/timeline/EventCard';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'NCT WISH의 모든 활동을 기록하는 아카이브 - 최신 음반, 일정, 타임라인',
};

// 오늘 날짜
const today = new Date();
today.setHours(0, 0, 0, 0);

export default async function HomePage() {
  // 최근 발매 앨범 (최대 6개)
  const recentAlbums = await prisma.album.findMany({
    orderBy: { releaseDate: 'desc' },
    take: 6,
  });

  // 다가오는 일정 (미래 이벤트)
  const upcomingEvents = await prisma.event.findMany({
    where: { date: { gte: today } },
    orderBy: { date: 'asc' },
    take: 6,
    include: {
      era: true,
      albums: {
        include: { album: true },
      },
      members: {
        include: { member: true },
      },
    },
  });

  // 최근 활동 (과거 이벤트)
  const recentEvents = await prisma.event.findMany({
    where: { date: { lt: today } },
    orderBy: { date: 'desc' },
    take: 8,
    include: {
      era: true,
      albums: {
        include: { album: true },
      },
      members: {
        include: { member: true },
      },
    },
  });

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-50 via-blue-50 to-pink-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">NCT WISH</span>
              <span className="block text-blue-600">Archive</span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-base text-gray-600 sm:text-lg md:mt-5 md:max-w-3xl md:text-xl">
              NCT WISH의 모든 활동을 기록하는 팬 아카이브
            </p>
            <div className="mx-auto mt-8 flex max-w-md justify-center gap-3 sm:gap-4">
              <Link href="/timeline">
                <Button variant="primary" size="lg">
                  타임라인 보기
                </Button>
              </Link>
              <Link href="/releases">
                <Button variant="secondary" size="lg">
                  음반 목록
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 최근 발매 앨범 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">최근 발매</h2>
          <Link
            href="/releases"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            전체보기 →
          </Link>
        </div>
        {recentAlbums.length === 0 ? (
          <p className="text-center text-gray-500">등록된 앨범이 없습니다.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {recentAlbums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}
      </section>

      {/* 다가오는 일정 */}
      {upcomingEvents.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">다가오는 일정</h2>
              <Link
                href="/timeline"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                전체보기 →
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 최근 활동 타임라인 */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">최근 활동</h2>
          <Link
            href="/timeline"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            전체보기 →
          </Link>
        </div>
        {recentEvents.length === 0 ? (
          <p className="text-center text-gray-500">최근 활동이 없습니다.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recentEvents.slice(0, 6).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MusicGroup',
            name: 'NCT WISH',
            genre: 'K-pop',
            url: 'https://nctwish-archive.com',
            description: 'NCT WISH의 모든 활동을 기록하는 아카이브',
          }),
        }}
      />
    </div>
  );
}
