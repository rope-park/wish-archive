/**
 * 멤버 목록 페이지
 * 
 * - 멤버 그리드 표시
 * - 나이순 정렬 (어린 순)
 * - 포지션, 국적 필터
 */

import { prisma } from '@/lib/prisma';
import MemberCard from '@/components/domain/members/MemberCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members',
  description: 'NCT WISH 멤버 프로필',
};

// 나이 계산 헬퍼
function getAge(birthDate?: Date | string | null): number | null {
  if (!birthDate) return null;
  const b = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - b.getFullYear();
  const m = today.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
  return age;
}

export default async function MembersPage() {
  // 멤버 조회 (birthDate 오름차순 = 나이 어린 순)
  const members = await prisma.member.findMany({
    where: { isActive: true },
    orderBy: { birthDate: 'desc' }, // 최신 생년월일 = 어린 멤버
  });

  // 나이 계산
  const membersWithAge = members.map((m) => ({
    ...m,
    age: getAge(m.birthDate),
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* 헤더 */}
      <header className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold sm:text-3xl">Members</h1>
        <p className="text-sm text-gray-600 sm:text-base">
          NCT WISH 멤버 프로필
        </p>
      </header>

      {/* 멤버 그리드 */}
      {membersWithAge.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center">
          <p className="text-gray-500">등록된 멤버가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {membersWithAge.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              showDetails={true}
            />
          ))}
        </div>
      )}

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: membersWithAge.map((member, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Person',
                name: member.stageName,
                alternateName: member.name || undefined,
                birthDate: member.birthDate?.toISOString().slice(0, 10),
                nationality: member.nationality || undefined,
              },
            })),
          }),
        }}
      />
    </div>
  );
}
