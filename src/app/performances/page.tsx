/**
 * 공연/방송 프로그램 목록 페이지
 * 
 * - 프로그램 목록 표시
 * - 타입별 필터 (음악방송, 예능, 라디오)
 * - 국가별 필터
 */

import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';
import type { ProgramType } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Performances & Programs',
  description: 'NCT WISH의 방송 및 공연 출연 프로그램',
};

// 프로그램 타입 한글 변환
function getProgramTypeLabel(type: ProgramType): string {
  const labels: Record<ProgramType, string> = {
    MUSIC_SHOW: '음악방송',
    VARIETY_SHOW: '예능',
    RADIO: '라디오',
  };
  return labels[type];
}

export default async function PerformancesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // searchParams를 Promise로 처리 (Next.js 15+)
  const params = await searchParams;
  
  const typeParam = params.type as string | undefined;
  const country = params.country as string | undefined;

  // WHERE 조건
  interface WhereClause {
    pType?: ProgramType;
    country?: string;
  }

  const where: WhereClause = {};

  if (typeParam && ['MUSIC_SHOW', 'VARIETY_SHOW', 'RADIO'].includes(typeParam)) {
    where.pType = typeParam as ProgramType;
  }

  if (country) {
    where.country = country;
  }

  // 프로그램 조회
  const programs = await prisma.program.findMany({
    where,
    include: {
      _count: {
        select: { appearances: true },
      },
    },
    orderBy: { name: 'asc' },
  });

  return (
    <div className="wish-container min-h-screen py-8">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-[15%] left-[10%] text-5xl animate-float opacity-40">🎤</span>
        <span className="absolute top-[35%] right-[12%] text-4xl animate-sparkle opacity-35" style={{ animationDelay: '0.8s' }}>🎸</span>
        <span className="absolute bottom-[30%] left-[15%] text-4xl animate-float opacity-40" style={{ animationDelay: '1.5s' }}>🎭</span>
        <span className="absolute bottom-[20%] right-[10%] text-3xl animate-sparkle opacity-30" style={{ animationDelay: '2s' }}>✨</span>
      </div>

      {/* 헤더 */}
      <header className="mb-12 text-center relative z-10">
        <h1 className="font-bagel-fat-one text-4xl md:text-5xl text-wish-pink mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative inline-block">
          PERFORMANCES
          <span className="absolute -top-6 -right-10 text-4xl animate-sparkle">🎸</span>
          <span className="absolute -bottom-4 -left-8 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎤</span>
        </h1>
        <p className="text-lg font-jua text-text-dark mt-2">
          NCT WISH의 무대와 방송 활동
        </p>
      </header>

      {/* 필터 - 타입 */}
      <div className="mb-6 flex justify-center relative z-10">
        <div className="flex flex-wrap gap-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 border-4 border-black shadow-hard-lg">
          <a
            href="/performances"
            className={`px-5 py-2 rounded-full font-press-start-2p text-xs transition-all ${
              !typeParam
                ? 'bg-wish-pink text-white shadow-hard'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            ALL
          </a>
          <a
            href="/performances?type=MUSIC_SHOW"
            className={`px-5 py-2 rounded-full font-press-start-2p text-xs transition-all ${
              typeParam === 'MUSIC_SHOW'
                ? 'bg-wish-pink text-white shadow-hard'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            🎤 MUSIC
          </a>
          <a
            href="/performances?type=VARIETY_SHOW"
            className={`px-5 py-2 rounded-full font-press-start-2p text-xs transition-all ${
              typeParam === 'VARIETY_SHOW'
                ? 'bg-wish-purple text-white shadow-hard'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📺 VARIETY
          </a>
          <a
            href="/performances?type=RADIO"
            className={`px-5 py-2 rounded-full font-press-start-2p text-xs transition-all ${
              typeParam === 'RADIO'
                ? 'bg-wish-sky text-white shadow-hard'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📻 RADIO
          </a>
        </div>
      </div>

      {/* 필터 - 국가 */}
      <div className="mb-10 flex justify-center items-center gap-3 flex-wrap relative z-10">
        <span className="font-bagel-fat-one text-lg text-text-dark">🌍 COUNTRY:</span>
        <a
          href="/performances"
          className={`px-4 py-2 rounded-full font-jua text-sm border-2 border-black transition-all ${
            !country
              ? 'bg-wish-green text-black shadow-hard'
              : 'bg-white text-gray-600 hover:shadow-hard hover:-translate-y-0.5'
          }`}
        >
          전체
        </a>
        <a
          href="/performances?country=KR"
          className={`px-4 py-2 rounded-full font-jua text-sm border-2 border-black transition-all ${
            country === 'KR'
              ? 'bg-wish-green text-black shadow-hard'
              : 'bg-white text-gray-600 hover:shadow-hard hover:-translate-y-0.5'
          }`}
        >
          🇰🇷 한국
        </a>
        <a
          href="/performances?country=JP"
          className={`px-4 py-2 rounded-full font-jua text-sm border-2 border-black transition-all ${
            country === 'JP'
              ? 'bg-wish-green text-black shadow-hard'
              : 'bg-white text-gray-600 hover:shadow-hard hover:-translate-y-0.5'
          }`}
        >
          🇯🇵 일본
        </a>
      </div>

      {/* 프로그램 리스트 */}
      <div className="relative z-10">
        {programs.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-4 border-black shadow-hard-xl p-12 text-center">
            <div className="text-5xl mb-4 animate-float">📺</div>
            <p className="font-jua text-xl text-gray-500">
              프로그램이 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, idx) => (
            <Link key={program.id} href={`/performances/${program.id}`}>
              <div 
                className="era-card bg-white/70 p-6 cursor-pointer animate-pop-in hover-lift"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="space-y-4">
                  {/* 프로그램 타입 */}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-wish-pink text-white rounded-full text-xs font-press-start-2p shadow-hard">
                      {getProgramTypeLabel(program.pType)}
                    </span>
                  </div>

                  {/* 프로그램 이름 */}
                  <h2 className="font-bagel-fat-one text-xl text-gray-900">
                    {program.name}
                  </h2>

                  {/* 네트워크 */}
                  {program.network && (
                    <p className="text-sm font-jua text-gray-600">{program.network}</p>
                  )}

                  {/* 국가 */}
                  {program.country && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-jua text-gray-500">
                        {program.country === 'KR' && '🇰🇷 한국'}
                        {program.country === 'JP' && '🇯🇵 일본'}
                        {program.country !== 'KR' && program.country !== 'JP' && program.country}
                      </span>
                    </div>
                  )}

                  {/* 출연 횟수 */}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-wish-sky text-white rounded-full text-xs font-press-start-2p shadow-hard">
                      {program._count.appearances} TIMES
                    </span>
                    <span className="text-xl animate-sparkle">✨</span>
                  </div>

                  {/* 메모 */}
                  {program.notes && (
                    <p className="line-clamp-2 text-xs font-jua text-gray-600">
                      {program.notes}
                    </p>
                  )}
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
