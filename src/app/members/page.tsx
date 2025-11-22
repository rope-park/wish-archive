/**
 * 멤버 목록 페이지
 * 
 * - 멤버 그리드 표시
 * - 나이순 정렬
 * - 포지션, 국적 필터
 */

import { prisma } from '@/lib/prisma';
import MemberCard from '@/components/domain/members/MemberCard';
import WindowFrame from '@/components/os/WindowFrame';
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
    <WindowFrame title="MEMBERS PROFILE" icon="👥">
      
      <div className="text-center mb-8">
        <h2 className="font-bagel-fat-one text-3xl text-wish-pink drop-shadow-sm">
          MEET THE WISH
        </h2>
        <p className="font-jua text-gray-600 mt-2">
          NCT WISH의 멤버들을 소개합니다! 클릭해서 자세한 정보를 확인하세요.
        </p>
      </div>

      {/* 기존 멤버 그리드 로직 유지 */}
      <div className="relative z-10">
        {membersWithAge.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-jua text-xl text-gray-500">등록된 멤버가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </WindowFrame>
  );
}
