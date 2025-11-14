/**
 * 멤버 상세 페이지
 * 
 * - 멤버 프로필 정보
 * - 나이 계산 표시
 * - 참여 이벤트 목록
 * - 관련 음반
 */

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import EventCard from '@/components/domain/timeline/EventCard';
import Link from 'next/link';
import Image from 'next/image';

// 나이 계산 함수
function getAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

// 동적 메타데이터
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const member = await prisma.member.findUnique({
    where: { id },
  });

  if (!member) {
    return {
      title: 'Member Not Found',
    };
  }

  return {
    title: `${member.stageName} - NCT WISH`,
    description: `${member.stageName}의 프로필과 활동`,
  };
}

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // 멤버 정보 조회
  const member = await prisma.member.findUnique({
    where: { id },
    include: {
      events: {
        include: {
          event: {
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
          },
        },
        orderBy: {
          event: {
            date: 'desc',
          },
        },
        take: 20,
      },
    },
  });

  if (!member) {
    notFound();
  }

  // 나이 계산
  const age = member.birthDate ? getAge(member.birthDate) : null;

  // 포지션 배열
  const positions = member.positions?.split(',').map((p) => p.trim()) || [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* 프로필 헤더 */}
      <Card className="mb-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* 프로필 이미지 */}
          <div className="flex justify-center sm:justify-start">
            {member.profileImageUrl ? (
              <Image
                src={member.profileImageUrl as string}
                alt={member.stageName}
                width={160}
                height={160}
                className="h-40 w-40 rounded-full object-cover"
                priority
              />
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-full bg-linear-to-br from-blue-400 to-purple-500 text-5xl">
                {member.emoji || '👤'}
              </div>
            )}
          </div>

          {/* 프로필 정보 */}
          <div className="flex-1 space-y-4">
            {/* 이름 */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {member.stageName}
              </h1>
              {member.name && (
                <p className="mt-1 text-lg text-gray-600">{member.name}</p>
              )}
              {member.nameEn && (
                <p className="text-sm text-gray-500">{member.nameEn}</p>
              )}
            </div>

            {/* 포지션 배지 */}
            {positions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {positions.map((pos) => (
                  <Badge key={pos} variant="primary">
                    {pos}
                  </Badge>
                ))}
              </div>
            )}

            {/* 상세 정보 그리드 */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {member.birthDate && (
                <div>
                  <span className="text-sm font-medium text-gray-700">생년월일</span>
                  <p className="text-gray-900">
                    {new Date(member.birthDate).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                    {age !== null && (
                      <span className="ml-2 text-sm text-gray-600">
                        (만 {age}세)
                      </span>
                    )}
                  </p>
                </div>
              )}

              {member.nationality && (
                <div>
                  <span className="text-sm font-medium text-gray-700">국적</span>
                  <p className="text-gray-900">{member.nationality}</p>
                </div>
              )}

              {member.bloodType && (
                <div>
                  <span className="text-sm font-medium text-gray-700">혈액형</span>
                  <p className="text-gray-900">{member.bloodType}</p>
                </div>
              )}

              {member.ownNumber !== null && (
                <div>
                  <span className="text-sm font-medium text-gray-700">고유 번호</span>
                  <p className="text-gray-900">{member.ownNumber}</p>
                </div>
              )}

              {member.joinDate && (
                <div>
                  <span className="text-sm font-medium text-gray-700">합류일</span>
                  <p className="text-gray-900">
                    {new Date(member.joinDate).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              )}
            </div>

            {/* 활동 상태 */}
            <div>
              <Badge variant={member.isActive ? 'success' : 'default'}>
                {member.isActive ? '활동 중' : '비활동'}
              </Badge>
            </div>
          </div>
        </div>

        {/* 메모 */}
        {member.note && (
          <div className="mt-6 border-t pt-4">
            <p className="text-sm text-gray-600">{member.note}</p>
          </div>
        )}
      </Card>

      {/* 참여 활동 */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">참여 활동</h2>
          <Link
            href={`/timeline?member=${member.id}`}
            className="text-sm text-blue-600 hover:underline"
          >
            전체 보기 →
          </Link>
        </div>

        {member.events.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500">참여한 활동이 없습니다.</p>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {member.events.map(({ event }) => (
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
            '@type': 'Person',
            name: member.stageName,
            alternateName: member.name,
            birthDate: member.birthDate?.toISOString().split('T')[0],
            nationality: member.nationality,
            memberOf: {
              '@type': 'MusicGroup',
              name: 'NCT WISH',
            },
          }),
        }}
      />
    </div>
  );
}
