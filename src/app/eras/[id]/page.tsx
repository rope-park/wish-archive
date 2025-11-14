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

// 동적 메타데이터
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
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* 에라 헤더 */}
      <Card className="mb-8">
        <div className="space-y-4">
          {/* 타이틀 */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant={isOngoing ? 'success' : 'default'}>
                {isOngoing ? '진행 중' : '종료'}
              </Badge>
              {era.color && (
                <div
                  className="h-6 w-6 rounded-full border-2 border-gray-300"
                  style={{ backgroundColor: era.color }}
                  title={era.color}
                />
              )}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{era.name}</h1>
          </div>

          {/* 기간 정보 */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <span className="text-sm font-medium text-gray-700">시작일</span>
              <p className="text-gray-900">
                {startDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            {endDate && (
              <div>
                <span className="text-sm font-medium text-gray-700">종료일</span>
                <p className="text-gray-900">
                  {endDate.toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}

            <div>
              <span className="text-sm font-medium text-gray-700">활동 기간</span>
              <p className="text-gray-900">
                {durationDays}일{isOngoing && ' (진행 중)'}
              </p>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">총 이벤트</span>
              <p className="text-gray-900">{era._count.events}개</p>
            </div>
          </div>

          {/* 설명 */}
          {era.description && (
            <div className="border-t pt-4">
              <p className="text-gray-600">{era.description}</p>
            </div>
          )}
        </div>
      </Card>

      {/* 타임라인 이벤트 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">활동 타임라인</h2>
          {era._count.events > 50 && (
            <Link
              href={`/timeline?era=${era.id}`}
              className="text-sm text-blue-600 hover:underline"
            >
              전체 보기 ({era._count.events}개) →
            </Link>
          )}
        </div>

        {era.events.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500">이벤트가 없습니다.</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {era.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      {/* 뒤로 가기 */}
      <div className="mt-8 text-center">
        <Link href="/eras" className="text-blue-600 hover:underline">
          ← 전체 에라 보기
        </Link>
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
