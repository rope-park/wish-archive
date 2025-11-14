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
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const typeParam = searchParams.type as string | undefined;
  const country = searchParams.country as string | undefined;

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
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* 헤더 */}
      <header className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">
          Performances & Programs
        </h1>
        <p className="text-sm text-gray-600 sm:text-base">
          NCT WISH가 출연한 방송 프로그램
        </p>
      </header>

      {/* 필터 - 타입 */}
      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/performances"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            !typeParam
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          전체
        </a>
        <a
          href="/performances?type=MUSIC_SHOW"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            typeParam === 'MUSIC_SHOW'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          음악방송
        </a>
        <a
          href="/performances?type=VARIETY_SHOW"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            typeParam === 'VARIETY_SHOW'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          예능
        </a>
        <a
          href="/performances?type=RADIO"
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            typeParam === 'RADIO'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-100'
          }`}
        >
          라디오
        </a>
      </div>

      {/* 필터 - 국가 */}
      <div className="mb-6 flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700">국가:</span>
        <a
          href="/performances"
          className={`rounded px-2 py-1 text-sm transition-colors ${
            !country
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          전체
        </a>
        <a
          href="/performances?country=KR"
          className={`rounded px-2 py-1 text-sm transition-colors ${
            country === 'KR'
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          한국
        </a>
        <a
          href="/performances?country=JP"
          className={`rounded px-2 py-1 text-sm transition-colors ${
            country === 'JP'
              ? 'bg-gray-900 text-white'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          일본
        </a>
      </div>

      {/* 프로그램 리스트 */}
      {programs.length === 0 ? (
        <Card>
          <p className="text-center text-gray-500">
            프로그램이 없습니다.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Link key={program.id} href={`/performances/${program.id}`}>
              <Card hoverable className="cursor-pointer">
                <div className="space-y-3">
                  {/* 프로그램 타입 */}
                  <div>
                    <Badge variant="primary" size="sm">
                      {getProgramTypeLabel(program.pType)}
                    </Badge>
                  </div>

                  {/* 프로그램 이름 */}
                  <h2 className="text-lg font-bold text-gray-900">
                    {program.name}
                  </h2>

                  {/* 네트워크 */}
                  {program.network && (
                    <p className="text-sm text-gray-600">{program.network}</p>
                  )}

                  {/* 국가 */}
                  {program.country && (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {program.country === 'KR' && '🇰🇷 한국'}
                        {program.country === 'JP' && '🇯🇵 일본'}
                        {program.country !== 'KR' && program.country !== 'JP' && program.country}
                      </span>
                    </div>
                  )}

                  {/* 출연 횟수 */}
                  <div>
                    <Badge variant="info" size="sm">
                      {program._count.appearances}회 출연
                    </Badge>
                  </div>

                  {/* 메모 */}
                  {program.notes && (
                    <p className="line-clamp-2 text-xs text-gray-500">
                      {program.notes}
                    </p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
