import 'server-only';
import { prisma } from '@/lib/prisma';
import type { Member } from '@prisma/client';
import { safeAgeUTC } from '@/lib/date';

export type MemberDTO = Member & { age: number | null };

/**
 * 멤버 목록 조회
 * @returns 멤버 목록
 */
export async function listMembers(): Promise<MemberDTO[]> {
    const members = await prisma.member.findMany();

    const membersWithAge: MemberDTO[] = members.map((m) => ({
        ...m,
        age: safeAgeUTC(m.birthDate),
    }));

    // 나이순 정렬 (나이 많은 순)
    membersWithAge.sort((a, b) => {
        const ageA = a.age ?? 0;
        const ageB = b.age ?? 0;
        return ageB - ageA;
    });

    return membersWithAge;
}

/**
 * 멤버 프로필 및 관련 이벤트 조회
 * @param id 멤버 ID
 * @returns 멤버 프로필 및 관련 이벤트
 */
export async function getMemberProfile(id: string) {
    const member = await prisma.member.findUnique({
        where: { id },
        include: {
            events: {
                include: { event: true },
                orderBy: { event: { date: 'desc' } },
            },
        },
    });

    if (!member) return null;
    return { ...member, age: getAge(member.birthDate) };
}

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