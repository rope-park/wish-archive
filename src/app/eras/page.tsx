/**
 * 에라 목록 페이지
 * 
 * - 시기별 에라 카드
 * - 시작일 순 정렬
 */

import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Eras',
  description: 'NCT WISH 활동 시기별 정보',
};

/**
 * 에라 목록 페이지 컴포넌트
 * @returns 에라 목록 페이지 JSX
 */
export default async function ErasPage() {
  // 에라 조회
  const eras = await prisma.era.findMany({
    orderBy: { startDate: 'asc' },
    include: {
      _count: {
        select: { events: true },
      },
    },
  });

  return (
    <div className="wish-container min-h-screen py-8">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-[12%] left-[8%] text-5xl animate-float opacity-40">✨</span>
        <span className="absolute top-[25%] right-[15%] text-4xl animate-sparkle opacity-35" style={{ animationDelay: '0.8s' }}>⭐</span>
        <span className="absolute bottom-[30%] left-[12%] text-4xl animate-float opacity-40" style={{ animationDelay: '1.2s' }}>💜</span>
        <span className="absolute bottom-[15%] right-[10%] text-5xl animate-sparkle opacity-30" style={{ animationDelay: '1.8s' }}>🌟</span>
      </div>

      {/* 헤더 */}
      <header className="mb-12 text-center relative z-10">
        <h1 className="font-bagel-fat-one text-5xl md:text-6xl text-wish-purple mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative inline-block">
          ERAS
          <span className="absolute -top-6 -right-10 text-4xl animate-sparkle">🌟</span>
          <span className="absolute -bottom-4 -left-8 text-3xl animate-float" style={{ animationDelay: '0.6s' }}>✨</span>
        </h1>
        <p className="text-lg font-jua text-text-dark mt-2">
          NCT WISH의 찬란한 시간들
        </p>
      </header>

      {/* 에라 리스트 */}
      <div className="relative z-10">
        {eras.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-4 border-black shadow-hard-xl p-12 text-center">
            <p className="font-jua text-xl text-gray-500">등록된 에라가 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {eras.map((era, idx) => (
              <Link key={era.id} href={`/eras/${era.id}`}>
                <div
                  className="era-card bg-white/70 p-6 cursor-pointer animate-pop-in"
                  style={{ animationDelay: `${idx * 0.15}s` }}
                >
                  <div className="space-y-4">
                    {/* 에라 이름 */}
                    <h2 className="font-bagel-fat-one text-2xl text-gray-900">
                      {era.name}
                    </h2>

                    {/* 기간 */}
                    <div className="flex items-center gap-2 text-sm font-jua text-gray-600">
                      <span>
                        {new Date(era.startDate).toLocaleDateString('ko-KR', {
                          year: 'numeric',
                          month: 'long',
                        })}
                      </span>
                      {era.endDate && (
                        <>
                          <span>~</span>
                          <span>
                            {new Date(era.endDate).toLocaleDateString('ko-KR', {
                              year: 'numeric',
                              month: 'long',
                            })}
                          </span>
                        </>
                      )}
                    </div>

                    {/* 설명 */}
                    {era.description && (
                      <p className="line-clamp-2 text-sm font-jua text-gray-600">
                        {era.description}
                      </p>
                    )}

                    {/* 이벤트 개수 */}
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-wish-purple text-white rounded-full text-xs font-press-start-2p shadow-hard">
                        {era._count.events} EVENTS
                      </span>
                      <span className="text-2xl animate-sparkle">✨</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
