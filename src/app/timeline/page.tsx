/**
 * 타임라인 페이지
 * 
 * - 필터링 기능 (타입, 날짜, 멤버 등)
 * - 시간순 정렬
 * - 반응형 레이아웃
 */

import { prisma } from '@/lib/prisma';
import EventCard from '@/components/domain/timeline/EventCard';
import type { Event, Era, Album, EventOnAlbum, MemberOnEvent, EventType, EventSeries } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'NCT WISH의 활동을 시간 순으로 정리한 타임라인',
};

// Prisma include 결과 형태를 위한 타입
export interface EventWithRelations extends Event {
  era: Era | null;
  series: EventSeries | null;
  albums: (EventOnAlbum & { album: Album })[];
  members: (MemberOnEvent & {
    member: { id: string; stageName: string; emoji: string | null };
  })[];
}

// 서버 컴포넌트에서 searchParams 읽기
export default async function TimelinePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // searchParams를 Promise로 처리 (Next.js 15+)
  const params = await searchParams;
  
  // 필터 파라미터 읽기
  const type = params.type as EventType | undefined;
  const year = params.year ? parseInt(params.year as string) : undefined;
  const member = params.member as string | undefined;

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
      series: true,
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
    <div className="wish-container min-h-screen py-8">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-[10%] right-[12%] text-4xl animate-float opacity-40">🕒</span>
        <span className="absolute top-[30%] left-[10%] text-5xl animate-sparkle opacity-35" style={{ animationDelay: '1s' }}>⭐</span>
        <span className="absolute bottom-[25%] right-[15%] text-4xl animate-float opacity-40" style={{ animationDelay: '1.5s' }}>📅</span>
        <span className="absolute bottom-[40%] left-[8%] text-3xl animate-sparkle opacity-30" style={{ animationDelay: '2s' }}>✨</span>
      </div>

      {/* 페이지 헤더 */}
      <header className="mb-12 text-center relative z-10">
        <h1 className="font-bagel-fat-one text-5xl md:text-6xl text-wish-sky mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative inline-block">
          TIMELINE
          <span className="absolute -top-6 -right-10 text-4xl animate-sparkle">🕒</span>
          <span className="absolute -bottom-4 -left-8 text-3xl animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
        </h1>
        <p className="text-lg font-jua text-text-dark mt-2">
          NCT WISH의 모든 순간들을 함께 해요!
        </p>
      </header>

      {/* 필터 바 - 비드 스타일 */}
      <div className="mb-8 flex justify-center relative z-10">
        <div className="flex flex-wrap gap-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 border-4 border-black shadow-hard-lg">
          <a
            href="/timeline"
            className={`px-4 py-2 rounded-full font-press-start-2p text-xs transition-all ${
              !type ? 'bg-wish-sky text-white shadow-hard' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ALL
          </a>
          <a
            href="/timeline?type=RELEASE"
            className={`px-4 py-2 rounded-full font-press-start-2p text-xs transition-all ${
              type === 'RELEASE' ? 'bg-wish-green text-black shadow-hard' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            💿 RELEASE
          </a>
          <a
            href="/timeline?type=MUSIC_SHOW"
            className={`px-4 py-2 rounded-full font-press-start-2p text-xs transition-all ${
              type === 'MUSIC_SHOW' ? 'bg-wish-pink text-white shadow-hard' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🎤 MUSIC
          </a>
          <a
            href="/timeline?type=CONCERT"
            className={`px-4 py-2 rounded-full font-press-start-2p text-xs transition-all ${
              type === 'CONCERT' ? 'bg-wish-purple text-white shadow-hard' : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🎸 CONCERT
          </a>
        </div>
      </div>

      {/* 연도 필터 */}
      {uniqueYears.length > 1 && (
        <div className="mb-8 flex justify-center items-center gap-3 flex-wrap relative z-10">
          <span className="font-bagel-fat-one text-lg text-text-dark">📅 YEAR:</span>
          <a
            href="/timeline"
            className={`px-4 py-2 rounded-full font-jua text-sm border-2 border-black transition-all ${
              !year ? 'bg-wish-lemon text-black shadow-hard' : 'bg-white text-gray-600 hover:shadow-hard hover:-translate-y-0.5'
            }`}
          >
            전체
          </a>
          {uniqueYears.map((y) => (
            <a
              key={y}
              href={`/timeline?year=${y}`}
              className={`px-4 py-2 rounded-full font-jua text-sm border-2 border-black transition-all ${
                year === y ? 'bg-wish-lemon text-black shadow-hard' : 'bg-white text-gray-600 hover:shadow-hard hover:-translate-y-0.5'
              }`}
            >
              {y}
            </a>
          ))}
        </div>
      )}

      {/* 타임라인 리스트 */}
      <section className="relative z-10">
        {events.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-4 border-black shadow-hard-xl p-12 text-center">
            <div className="text-5xl mb-4 animate-float">🔍</div>
            <p className="font-jua text-xl text-gray-500">조건에 맞는 활동이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {events.map((event, idx) => (
              <div key={event.id} className="animate-pop-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <EventCard event={event} />
              </div>
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
