/**
 * MemberCard 컴포넌트
 * 
 * 멤버 프로필 카드
 * - 프로필 이미지, 이름, 나이, 포지션 등 표시
 */

import type { Member } from '@prisma/client';
import BaseCard, { type BaseCardProps } from '@/components/base/BaseCard';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

interface MemberCardProps extends Omit<BaseCardProps, 'children'> {
  member: Member & { age?: number | null };
  href?: string;
  showDetails?: boolean;
}

export default function MemberCard({
  member,
  href = `/members/${member.id}`,
  showDetails = false,
  ...baseProps
}: MemberCardProps) {
  return (
    <Link href={href}>
      <BaseCard hoverable {...baseProps}>
        {/* 프로필 이미지 */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-linear-to-br from-purple-100 to-blue-100">
          {member.profileImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={member.profileImageUrl}
              alt={member.stageName}
              className="h-full w-full object-cover"
            />
          ) : (
            // 기본 아바타
            <div className="flex h-full w-full items-center justify-center text-4xl text-gray-400">
              {member.emoji || '👤'}
            </div>
          )}

          {/* 활동 상태 뱃지 */}
          {!member.isActive && (
            <div className="absolute right-2 top-2">
              <Badge variant="default" size="sm" rounded>
                Inactive
              </Badge>
            </div>
          )}
        </div>

        {/* 멤버 정보 */}
        <div className="mt-3 space-y-2">
          {/* 이름 & 이모지 */}
          <div className="flex items-center gap-2">
            {member.emoji && <span className="text-lg">{member.emoji}</span>}
            <h3 className="font-semibold text-gray-900">{member.stageName}</h3>
          </div>

          {/* 본명 */}
          {member.name && member.name !== member.stageName && (
            <p className="text-xs text-gray-500">{member.name}</p>
          )}

          {/* 나이 & 생일 */}
          {showDetails && (
            <div className="flex flex-wrap gap-2 text-xs text-gray-600">
              {member.age !== null && member.age !== undefined && (
                <span>만 {member.age}세</span>
              )}
              {member.birthDate && (
                <span>
                  {new Date(member.birthDate).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          )}

          {/* 포지션 */}
          {member.positions && (
            <div className="flex flex-wrap gap-1">
              {member.positions.split(',').map((pos, idx) => (
                <Badge key={idx} variant="primary" size="sm" rounded>
                  {pos.trim()}
                </Badge>
              ))}
            </div>
          )}

          {/* 국적 */}
          {showDetails && member.nationality && (
            <p className="text-xs text-gray-500">🌏 {member.nationality}</p>
          )}
        </div>
      </BaseCard>
    </Link>
  );
}
