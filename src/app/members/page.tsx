/**
 * 멤버 목록 페이지
 * 
 * - 멤버 그리드 표시
 * - 나이순 정렬
 * - 포지션, 국적 필터
 */

import { prisma } from '@/lib/prisma';
import MemberCard from '@/components/domain/members/MemberCard';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Members',
  description: 'NCT WISH 멤버 프로필',
};
  
/**
 * 나이 계산 헬퍼
 * @param birthDate - 생년월일
 * @returns 나이 (만 나이)
 */
function getAge(birthDate?: Date | string | null): number | null {
  if (!birthDate) return null;
  const b = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - b.getFullYear();
  const m = today.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
  return age;
}

/**
 * 멤버 목록 페이지 컴포넌트
 * @returns 멤버 목록 페이지 JSX
 */
export default async function MembersPage() {
  const members = await prisma.member.findMany({
    where: { isActive: true },
    orderBy: { birthDate: 'asc' },
  });

  // 나이 계산
  const membersWithAge = members.map((m) => ({
    ...m,
    age: getAge(m.birthDate),
  }));

  return (
    <div className="wish-container min-h-screen py-8">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-[15%] right-[10%] text-4xl animate-sparkle opacity-40" style={{ animationDelay: '0.5s' }}>⭐</span>
        <span className="absolute bottom-[20%] left-[8%] text-5xl animate-float opacity-30" style={{ animationDelay: '1s' }}>💚</span>
        <span className="absolute top-[40%] left-[15%] text-3xl animate-sparkle opacity-35" style={{ animationDelay: '1.5s' }}>✨</span>
        <span className="absolute bottom-[35%] right-[12%] text-4xl animate-float opacity-40" style={{ animationDelay: '2s' }}>💖</span>
      </div>

      {/* 헤더 */}
      <header className="mb-12 text-center relative z-10">
        <h1 className="font-bagel-fat-one text-5xl md:text-6xl text-wish-pink mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative inline-block">
          MEMBERS
          <span className="absolute -top-6 -right-8 text-4xl animate-sparkle">✨</span>
          <span className="absolute -bottom-4 -left-6 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>💚</span>
        </h1>
        <p className="text-lg font-jua text-text-dark mt-2">
          NCT WISH의 빛나는 멤버들을 만나보세요!
        </p>
      </header>

      {/* 멤버 그리드 */}
      <div className="relative z-10">
        {membersWithAge.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border-4 border-black shadow-hard-xl p-12 text-center">
            <p className="font-jua text-xl text-gray-500">등록된 멤버가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {membersWithAge.map((member, idx) => (
              <div
                key={member.id}
                className="animate-pop-in"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <MemberCard
                  member={member}
                  showDetails={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>

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
