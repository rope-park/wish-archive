/**
 * 에라 목록 페이지
 * 
 * - 시기별 에라 카드
 * - 시작일 순 정렬
 */

import { prisma } from '@/lib/prisma';
import type { Metadata } from 'next';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Eras',
  description: 'NCT WISH 활동 시기 (에라)',
};

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
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* 헤더 */}
      <header className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Eras</h1>
        <p className="text-sm text-gray-600 sm:text-base">
          NCT WISH의 활동 시기
        </p>
      </header>

      {/* 에라 리스트 */}
      {eras.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center">
          <p className="text-gray-500">등록된 에라가 없습니다.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {eras.map((era) => (
            <Link key={era.id} href={`/eras/${era.id}`}>
              <Card hoverable className="cursor-pointer">
                <div className="space-y-3">
                  {/* 에라 이름 */}
                  <h2 className="text-xl font-bold text-gray-900">
                    {era.name}
                  </h2>

                  {/* 기간 */}
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>
                      {new Date(era.startDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                    {era.endDate && (
                      <>
                        <span>~</span>
                        <span>
                          {new Date(era.endDate).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </>
                    )}
                  </div>

                  {/* 설명 */}
                  {era.description && (
                    <p className="line-clamp-2 text-sm text-gray-600">
                      {era.description}
                    </p>
                  )}

                  {/* 이벤트 개수 */}
                  <div>
                    <Badge variant="info" size="sm">
                      {era._count.events}개 활동
                    </Badge>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
