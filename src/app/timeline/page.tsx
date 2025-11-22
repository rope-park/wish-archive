// src/app/timeline/page.tsx
import { prisma } from '@/lib/prisma';
import EventCard from '@/components/domain/timeline/EventCard';
import WindowFrame from '@/components/os/WindowFrame';
import type { Prisma, EventType, Event as PrismaEvent } from '@prisma/client';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'NCT WISH 활동 타임라인',
};

// 서버 컴포넌트
export default async function TimelinePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  
  const type = params.type as EventType | undefined;
  const year = params.year ? parseInt(params.year as string) : undefined;
  const member = params.member as string | undefined;

  // 데이터 조회 로직
    const where: Prisma.EventWhereInput = {};
    if (type) where.type = type;
    if (year) {
      where.date = {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      };
    }
  if (member) {
    where.members = { some: { memberId: member } };
  }

  const events = await prisma.event.findMany({
    where,
    include: {
      era: true,
      series: true,
      albums: { include: { album: true } },
      members: { include: { member: true } },
    },
    orderBy: { date: 'desc' },
    take: 50,
  });

  const yearsData = await prisma.event.findMany({
    select: { date: true },
    orderBy: { date: 'desc' },
    distinct: ['date'],
  });
  
  const uniqueYears = Array.from(new Set(yearsData.map((e) => new Date(e.date).getFullYear()))).sort((a, b) => b - a);

  return (
    <WindowFrame title="TIMELINE MANAGER" icon="🕓">
      
      {/* 헤더 영역 (창 내부) */}
      <div className="mb-8 text-center">
        <h2 className="font-bagel-fat-one text-3xl text-wish-sky drop-shadow-sm">
          ACTIVITY LOGS
        </h2>
        <p className="font-jua text-gray-600 mt-2">
          NCT WISH의 모든 기록
        </p>
      </div>

      {/* 필터 UI */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md py-4 mb-6 border-b-2 border-dashed border-gray-200 -mx-4 px-4 flex flex-col gap-4 items-center">
        <div className="flex flex-wrap gap-2 justify-center">
          <a href="/timeline" className={`px-3 py-1 rounded-full text-xs font-bold border border-black transition-all ${!type ? 'bg-wish-sky text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>ALL</a>
          <a href="/timeline?type=RELEASE" className={`px-3 py-1 rounded-full text-xs font-bold border border-black transition-all ${type === 'RELEASE' ? 'bg-wish-green text-black' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>💿 RELEASE</a>
          <a href="/timeline?type=MUSIC_SHOW" className={`px-3 py-1 rounded-full text-xs font-bold border border-black transition-all ${type === 'MUSIC_SHOW' ? 'bg-wish-pink text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>🎤 STAGE</a>
        </div>

        {uniqueYears.length > 1 && (
          <div className="flex gap-2 overflow-x-auto max-w-full pb-2">
            {uniqueYears.map((y) => (
              <a key={y} href={`/timeline?year=${y}`} className={`px-3 py-1 rounded-md text-xs font-press-start-2p border border-black ${year === y ? 'bg-black text-wish-lemon' : 'bg-white text-gray-500'}`}>
                {y}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* 이벤트 리스트 */}
      {events.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-4xl mb-4 animate-bounce">🔍</div>
          <p className="font-jua text-lg text-gray-500">기록된 데이터가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((event, idx) => (
            <div key={event.id} className="animate-pop-in" style={{ animationDelay: `${idx * 0.05}s` }}>
              <EventCard event={event} />
            </div>
          ))}
        </div>
      )}
    </WindowFrame>
  );
}