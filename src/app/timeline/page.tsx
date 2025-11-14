/**
 * 타임라인 페이지
 * 
 * - 필터링 기능 (타입, 날짜, 멤버 등)
 * - 시간순 정렬
 * - 반응형 레이아웃
 */

import { prisma } from '@/lib/prisma';
import EventCard from '@/components/domain/timeline/EventCard';
import type { Event, Era, Album, EventOnAlbum, MemberOnEvent, EventType } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'NCT WISH의 활동을 시간 순으로 정리한 타임라인',
};

// Prisma include 결과 형태를 위한 타입
export interface EventWithRelations extends Event {
  era: Era | null;
  albums: (EventOnAlbum & { album: Album })[];
  members: (MemberOnEvent & {
    member: { id: string; stageName: string; emoji: string | null };
  })[];
}

// 서버 컴포넌트에서 searchParams 읽기
export default async function TimelinePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // 필터 파라미터 읽기
  const type = searchParams.type as EventType | undefined;
  const year = searchParams.year ? parseInt(searchParams.year as string) : undefined;
  const member = searchParams.member as string | undefined;

  // WHERE 조건 구성
  interface WhereClause {
    type?: EventType;
    date?: {
      gte: Date;
      lt: Date;
    };
    members?: {
      some: {
        memberId: string;
      };
    };
  }

  const where: WhereClause = {};
  
  if (type) {
    where.type = type;
  }

  if (year) {
    const yearStart = new Date(year, 0, 1);
    const yearEnd = new Date(year + 1, 0, 1);
    where.date = {
      gte: yearStart,
      lt: yearEnd,
    };
  }

  if (member) {
    where.members = {
      some: {
        memberId: member,
      },
    };
  }

  // 이벤트 조회
  const events = await prisma.event.findMany({
    where,
    include: {
      era: true,
      albums: {
        include: { album: true },
      },
      members: {
        include: { member: true },
      },
    },
    orderBy: { date: 'desc' },
    take: 50, // 페이지네이션 고려
  });

  // 연도 목록 (필터용)
  const years = await prisma.event.findMany({
    select: { date: true },
    orderBy: { date: 'desc' },
    distinct: ['date'],
  });

  const uniqueYears = Array.from(
    new Set(years.map((e) => new Date(e.date).getFullYear()))
  ).sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* 페이지 헤더 */}
      <header className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Timeline</h1>
        <p className="text-sm text-gray-600 sm:text-base">
          NCT WISH의 활동을 시간 순으로 정리한 타임라인입니다
        </p>
      </header>

      {/* 필터 바 (간단한 버전) */}
      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/timeline"
          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
            !type ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          전체
        </a>
        <a
          href="/timeline?type=RELEASE"
          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
            type === 'RELEASE' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          발매
        </a>
        <a
          href="/timeline?type=MUSIC_SHOW"
          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
            type === 'MUSIC_SHOW' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          음악방송
        </a>
        <a
          href="/timeline?type=CONCERT"
          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
            type === 'CONCERT' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          콘서트
        </a>
      </div>

      {/* 연도 필터 */}
      {uniqueYears.length > 1 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700">연도:</span>
          <a
            href="/timeline"
            className={`rounded px-2 py-1 text-sm transition-colors ${
              !year ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            전체
          </a>
          {uniqueYears.map((y) => (
            <a
              key={y}
              href={`/timeline?year=${y}`}
              className={`rounded px-2 py-1 text-sm transition-colors ${
                year === y ? 'bg-gray-900 text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {y}
            </a>
          ))}
        </div>
      )}

      {/* 타임라인 리스트 */}
      <section className="space-y-3 sm:space-y-4">
        {events.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center">
            <p className="text-gray-500">조건에 맞는 활동이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {events.map((event) => (
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
            '@type': 'ItemList',
            itemListElement: events.slice(0, 10).map((event, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Event',
                name: event.title,
                startDate: event.date.toISOString(),
                description: event.description || '',
                location: event.location || event.city || '',
              },
            })),
          }),
        }}
      />
    </div>
  );
}
