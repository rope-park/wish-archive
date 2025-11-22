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
    <div className="wish-container min-h-screen py-8">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-[10%] left-[8%] text-4xl animate-float opacity-20">💚</span>
        <span className="absolute top-[20%] right-[12%] text-3xl animate-sparkle opacity-20" style={{ animationDelay: '0.5s' }}>⭐</span>
        <span className="absolute bottom-[15%] left-[15%] text-5xl animate-float opacity-15" style={{ animationDelay: '1s' }}>✨</span>
        <span className="absolute bottom-[30%] right-[10%] text-4xl animate-sparkle opacity-20" style={{ animationDelay: '1.5s' }}>🎤</span>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* 프로필 헤더 */}
        <div className="jelly-frame bg-white/90 backdrop-blur-md mb-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            {/* 프로필 이미지 */}
            <div className="flex justify-center sm:justify-start">
              {member.profileImageUrl ? (
                <Image
                  src={member.profileImageUrl as string}
                  alt={member.stageName}
                  width={160}
                  height={160}
                  className="h-40 w-40 rounded-full object-cover border-4 border-black shadow-hard-lg"
                  priority
                />
              ) : (
                <div className="flex h-40 w-40 items-center justify-center rounded-full bg-linear-to-br from-wish-sky to-wish-purple text-6xl border-4 border-black shadow-hard-lg">
                  {member.emoji || '👤'}
                </div>
              )}
            </div>

          {/* 프로필 정보 */}
          <div className="flex-1 space-y-4">
            {/* 이름 */}
            <div>
              <h1 className="font-bagel-fat-one text-4xl text-text-dark drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
                {member.stageName}
              </h1>
              {member.name && (
                <p className="mt-2 font-jua text-xl text-gray-600">{member.name}</p>
              )}
              {member.nameEn && (
                <p className="font-jua text-base text-gray-500">{member.nameEn}</p>
              )}
            </div>

            {/* 포지션 배지 */}
            {positions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {positions.map((pos) => (
                  <span key={pos} className="bg-wish-pink text-white px-4 py-1.5 rounded-full font-bold text-sm border-2 border-black shadow-hard">
                    {pos}
                  </span>
                ))}
              </div>
            )}

            {/* 상세 정보 그리드 */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {member.birthDate && (
                <div className="bg-wish-lemon/30 rounded-2xl p-3 border-2 border-black">
                  <span className="font-press-start-2p text-[10px] text-gray-600">🎂 생년월일</span>
                  <p className="font-jua text-base text-gray-900 mt-1">
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
                <div className="bg-wish-sky/30 rounded-2xl p-3 border-2 border-black">
                  <span className="font-press-start-2p text-[10px] text-gray-600">🌍 국적</span>
                  <p className="font-jua text-base text-gray-900 mt-1">{member.nationality}</p>
                </div>
              )}

              {member.bloodType && (
                <div className="bg-wish-pink/30 rounded-2xl p-3 border-2 border-black">
                  <span className="font-press-start-2p text-[10px] text-gray-600">💉 혈액형</span>
                  <p className="font-jua text-base text-gray-900 mt-1">{member.bloodType}</p>
                </div>
              )}

              {member.ownNumber !== null && (
                <div className="bg-wish-purple/30 rounded-2xl p-3 border-2 border-black">
                  <span className="font-press-start-2p text-[10px] text-gray-600">🔢 고유 번호</span>
                  <p className="font-jua text-base text-gray-900 mt-1">{member.ownNumber}</p>
                </div>
              )}

              {member.joinDate && (
                <div className="bg-wish-green/30 rounded-2xl p-3 border-2 border-black">
                  <span className="font-press-start-2p text-[10px] text-gray-600">📅 합류일</span>
                  <p className="font-jua text-base text-gray-900 mt-1">
                    {new Date(member.joinDate).toLocaleDateString('ko-KR')}
                  </p>
                </div>
              )}
            </div>

            {/* 활동 상태 */}
            <div>
              <span className={`inline-block px-5 py-2 rounded-full font-bold text-sm border-2 border-black shadow-hard ${member.isActive ? 'bg-wish-green text-black' : 'bg-gray-300 text-gray-700'}`}>
                {member.isActive ? '✅ 활동 중' : '⏸️ 비활동'}
              </span>
            </div>
          </div>
        </div>

        {/* 메모 */}
        {member.note && (
          <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-300">
            <div className="bg-wish-lemon/20 rounded-2xl p-4 border-2 border-black">
              <p className="font-nanum-pen text-lg text-gray-700">{member.note}</p>
            </div>
          </div>
        )}
      </div>

      {/* 참여 활동 */}
      <section className="mt-10">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-bagel-fat-one text-3xl text-text-dark drop-shadow-[3px_3px_0px_rgba(0,0,0,0.1)]">
            💚 참여 활동
          </h2>
          <Link
            href={`/timeline?member=${member.id}`}
            className="pixel-btn px-4 py-2 text-sm bg-wish-sky text-white font-bold hover-lift"
          >
            전체 보기 →
          </Link>
        </div>

        {member.events.length === 0 ? (
          <div className="jelly-frame bg-white/90 backdrop-blur-md text-center py-12">
            <p className="text-5xl mb-4">📭</p>
            <p className="font-jua text-lg text-gray-500">참여한 활동이 없습니다.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {member.events.map(({ event }, idx) => (
              <div key={event.id} className="animate-pop-in" style={{ animationDelay: `${idx * 0.05}s` }}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        )}
      </section>
      </div>

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
