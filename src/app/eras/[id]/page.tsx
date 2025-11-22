/**
 * 에라 상세 페이지
 * 
 * - 에라 정보 표시
 * - 해당 기간의 타임라인 이벤트
 */

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import EventCard from '@/components/domain/timeline/EventCard';
import Link from 'next/link';

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
  const era = await prisma.era.findUnique({
    where: { id },
  });

  if (!era) {
    return {
      title: 'Era Not Found',
    };
  }

  return {
    title: `${era.name} - NCT WISH`,
    description: era.description || `NCT WISH ${era.name} 활동 시기`,
  };
}

/**
 * 에라 상세 페이지 컴포넌트
 * @param param0 - params 객체
 * @returns 에라 상세 페이지 JSX
 */
export default async function EraDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // 에라 정보 조회
  const era = await prisma.era.findUnique({
    where: { id },
    include: {
      events: {
        include: {
          era: true,
          series: true,
          albums: {
            include: {
              album: {
                select: {
                  id: true,
                  title: true,
                  coverUrl: true,
                },
              },
            },
          },
          members: {
            include: {
              member: {
                select: {
                  id: true,
                  stageName: true,
                  emoji: true,
                },
              },
            },
          },
        },
        orderBy: { date: 'desc' },
        take: 50,
      },
      _count: {
        select: { events: true },
      },
    },
  });

  if (!era) {
    notFound();
  }

  // 기간 계산
  const startDate = new Date(era.startDate);
  const endDate = era.endDate ? new Date(era.endDate) : null;
  const isOngoing = !endDate || endDate > new Date();

  // 기간 일수 계산
  const durationDays = endDate
    ? Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
    : Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="wish-container min-h-screen py-8">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-[12%] left-[10%] text-5xl animate-float opacity-20">✨</span>
        <span className="absolute top-[25%] right-[15%] text-4xl animate-sparkle opacity-20" style={{ animationDelay: '0.5s' }}>🌟</span>
        <span className="absolute bottom-[20%] left-[12%] text-3xl animate-float opacity-15" style={{ animationDelay: '1s' }}>💫</span>
        <span className="absolute bottom-[35%] right-[8%] text-4xl animate-sparkle opacity-20" style={{ animationDelay: '1.5s' }}>⭐</span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* 에라 헤더 */}
        <div className="jelly-frame bg-white/90 backdrop-blur-md mb-8">
          <div className="space-y-4">
            {/* 타이틀 */}
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className={`px-5 py-2 rounded-full font-bold text-sm border-2 border-black shadow-hard ${isOngoing ? 'bg-wish-green text-black' : 'bg-gray-300 text-gray-700'}`}>
                  {isOngoing ? '⚡ 진행 중' : '✅ 종료'}
                </span>
                {era.color && (
                  <div
                    className="h-8 w-8 rounded-full border-4 border-black shadow-hard"
                    style={{ backgroundColor: era.color }}
                    title={era.color}
                  />
                )}
              </div>
              <h1 className="font-bagel-fat-one text-5xl text-text-dark drop-shadow-[4px_4px_0px_rgba(0,0,0,0.1)]">{era.name}</h1>
            </div>

          {/* 기간 정보 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-wish-green/30 rounded-2xl p-4 border-2 border-black">
              <span className="font-press-start-2p text-[10px] text-gray-600">🚀 시작일</span>
              <p className="font-jua text-base text-gray-900 mt-2">
                {startDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {endDate && (
              <div className="bg-wish-pink/30 rounded-2xl p-4 border-2 border-black">
                <span className="font-press-start-2p text-[10px] text-gray-600">🏁 종료일</span>
                <p className="font-jua text-base text-gray-900 mt-2">
                  {endDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}

            <div className="bg-wish-sky/30 rounded-2xl p-4 border-2 border-black">
              <span className="font-press-start-2p text-[10px] text-gray-600">⏱️ 활동 기간</span>
              <p className="font-jua text-base text-gray-900 mt-2">
                {durationDays}일{isOngoing && ' (진행 중)'}
              </p>
            </div>

            <div className="bg-wish-lemon/30 rounded-2xl p-4 border-2 border-black">
              <span className="font-press-start-2p text-[10px] text-gray-600">📊 총 이벤트</span>
              <p className="font-jua text-base text-gray-900 mt-2">{era._count.events}개</p>
            </div>
          </div>

          {/* 설명 */}
          {era.description && (
            <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-300">
              <div className="bg-wish-purple/20 rounded-2xl p-4 border-2 border-black">
                <p className="font-jua text-base text-gray-700">{era.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 타임라인 이벤트 */}
      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bagel-fat-one text-3xl text-text-dark drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            🕒 활동 타임라인
          </h2>
          {era._count.events > 50 && (
            <Link
              href={`/timeline?era=${era.id}`}
              className="pixel-btn px-4 py-2 text-sm bg-wish-purple text-white font-bold hover-lift"
            >
              전체 보기 ({era._count.events}개) →
            </Link>
          )}
        </div>

        {era.events.length === 0 ? (
          <div className="jelly-frame bg-white/90 backdrop-blur-md text-center py-12">
            <p className="text-5xl mb-4">📭</p>
            <p className="font-jua text-lg text-gray-500">이벤트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {era.events.map((event, idx) => (
              <div key={event.id} className="animate-pop-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 뒤로 가기 */}
      <div className="mt-10 text-center">
        <Link href="/eras">
          <button className="pixel-btn px-6 py-3 text-base bg-wish-green text-black font-bold hover-lift">
            ← 전체 활동 보기
          </button>
        </Link>
      </div>
      </div>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: era.name,
            description: era.description,
            startDate: era.startDate.toISOString(),
            endDate: era.endDate?.toISOString(),
            eventStatus: isOngoing
              ? 'https://schema.org/EventScheduled'
              : 'https://schema.org/EventCompleted',
            organizer: {
              '@type': 'MusicGroup',
              name: 'NCT WISH',
            },
          }),
        }}
      />
    </div>
  );
}
