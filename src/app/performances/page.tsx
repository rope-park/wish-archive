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
import WindowFrame from '@/components/os/WindowFrame';
import type { ProgramType } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Performances & Programs',
  description: 'NCT WISH 공연 및 방송 프로그램 목록',
};

// 프로그램 타입 한글 라벨 변환
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
    <WindowFrame title="PERFORMANCES & PROGRAMS" icon="📺">
      {/* 상단 필터 (리모컨 스타일) */}
      <div className="bg-gray-100 p-4 rounded-xl border-2 border-gray-300 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* 타입 필터 */}
        <div className="flex gap-2">
          <Link href="/performances" className={`px-3 py-1 rounded border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 transition-all text-xs font-bold ${!typeParam ? 'bg-wish-pink text-white border-wish-pink' : 'bg-white text-gray-600'}`}>ALL</Link>
          <Link href="/performances?type=MUSIC_SHOW" className={`px-3 py-1 rounded border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 transition-all text-xs font-bold ${typeParam === 'MUSIC_SHOW' ? 'bg-wish-sky text-white border-wish-sky' : 'bg-white text-gray-600'}`}>MUSIC</Link>
          <Link href="/performances?type=VARIETY_SHOW" className={`px-3 py-1 rounded border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 transition-all text-xs font-bold ${typeParam === 'VARIETY_SHOW' ? 'bg-wish-green text-black border-wish-green' : 'bg-white text-gray-600'}`}>VARIETY</Link>
        </div>

        {/* 국가 필터 */}
        <div className="flex gap-2 font-press-start-2p text-[10px]">
          <Link href="/performances?country=KR" className={`hover:text-wish-pink ${country === 'KR' ? 'text-black underline' : 'text-gray-400'}`}>KR</Link>
          <span>|</span>
          <Link href="/performances?country=JP" className={`hover:text-wish-pink ${country === 'JP' ? 'text-black underline' : 'text-gray-400'}`}>JP</Link>
        </div>
      </div>

      {/* 프로그램 리스트 그리드 */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <Link key={program.id} href={`/performances/${program.id}`}>
            <div className="bg-white border-2 border-black rounded-xl p-4 hover:bg-wish-lemon/20 transition-colors cursor-pointer shadow-[4px_4px_0px_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 relative overflow-hidden group">

              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5 rounded">
                  {getProgramTypeLabel(program.pType)}
                </span>
                <span className="text-lg group-hover:scale-110 transition-transform">
                  {program.pType === 'RADIO' ? '📻' : '📺'}
                </span>
              </div>

              <h3 className="font-bagel-fat-one text-lg leading-tight mb-1">{program.name}</h3>
              <p className="text-xs text-gray-500 font-jua">{program.network} • {program.country}</p>

              <div className="mt-3 text-right">
                <span className="text-xs font-bold text-wish-pink">
                  {program._count.appearances} Episodes
                </span>
              </div>

            </div>
          </Link>
        ))}
      </div>

      {programs.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          프로그램이 없습니다.
        </div>
      )}

    </WindowFrame>
  );
}
