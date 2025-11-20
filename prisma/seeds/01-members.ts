// prisma/seeds/01-members.ts
import type { PrismaClient } from '@prisma/client'

/**
 * NCT WISH 멤버 시드
 */
export async function seedMembers(prisma: PrismaClient, groupId: string) {
  const members = [
    {
      stageName: '시온',
      name: '오시온',
      nameHanja: '吳是溫',
      nameEn: 'SION',
      birthDate: new Date('2002-05-11'),
      nationality: '대한민국',
      hometown: '전라남도 목포시',
      positions: '리더, 댄서, 보컬',
      emoji: '🌷',
      ownNumber: 1,
      bloodType: 'O',
      joinDate: new Date('2024-02-21'),
      isActive: true,
      profileImageUrl: null,
      note: null,
    },
    {
      stageName: '리쿠',
      name: '마에다 리쿠',
      nameHanja: '前田陸',
      nameEn: 'RIKU',
      birthDate: new Date('2003-06-28'),
      nationality: '일본',
      hometown: '후쿠이현',
      positions: '래퍼, 댄서',
      emoji: '🐿️',
      ownNumber: 3,
      bloodType: 'AB',
      joinDate: new Date('2024-02-21'),
      isActive: true,
      profileImageUrl: null,
      note: null,
    },
    {
      stageName: '유우시',
      name: '토쿠노 유우시',
      nameHanja: '得能 勇志',
      nameEn: 'YUSHI',
      birthDate: new Date('2004-04-05'),
      nationality: '일본',
      hometown: '도쿄도 고토구',
      positions: '메인댄서, 보컬',
      emoji: '⭐',
      ownNumber: 45,
      bloodType: 'A',
      joinDate: new Date('2024-02-21'),
      isActive: true,
      profileImageUrl: null,
      note: null,
    },
    {
      stageName: '재희',
      name: '김대영',
      nameHanja: '金垈永',
      nameEn: 'JAEHEE',
      birthDate: new Date('2005-06-21'),
      nationality: '대한민국',
      hometown: '대구광역시 달서구 장기동',
      positions: '메인보컬',
      emoji: '🌳',
      ownNumber: 13,
      bloodType: 'O',
      joinDate: new Date('2024-02-21'),
      isActive: true,
      profileImageUrl: null,
      note: null,
    },
    {
      stageName: '료',
      name: '히로세 료',
      nameHanja: '廣瀬 遼',
      nameEn: 'RYO',
      birthDate: new Date('2007-08-04'),
      nationality: '일본',
      hometown: '교토부',
      positions: '보컬, 댄서',
      emoji: '🦭',
      ownNumber: 21,
      bloodType: 'A',
      joinDate: new Date('2024-02-21'),
      isActive: true,
      profileImageUrl: null,
      note: null,
    },
    {
      stageName: '사쿠야',
      name: '후지나가 사쿠야',
      nameHanja: '藤永 咲哉',
      nameEn: 'SAKUYA',
      birthDate: new Date('2007-11-18'),
      nationality: '일본',
      hometown: '이시카와현',
      positions: '래퍼',
      emoji: '🥐',
      ownNumber: 39,
      bloodType: 'AB',
      joinDate: new Date('2024-02-21'),
      isActive: true,
      profileImageUrl: null,
      note: null,
    },
  ]

  const createdMembers = []

  for (const memberData of members) {
    const existing = await prisma.member.findFirst({
      where: {
        groupId: groupId,
        stageName: memberData.stageName,
      },
    })

    let member
    if (existing) {
      member = await prisma.member.update({
        where: { id: existing.id },
        data: memberData,
      })
      console.log(`  ✓ Updated: ${member.stageName}`)
    } else {
      member = await prisma.member.create({
        data: { ...memberData, groupId },
      })
      console.log(`  ✓ Created: ${member.stageName}`)
    }
    createdMembers.push(member)
  }

  console.log(`✓ Members seeded: ${createdMembers.length} members`)
  return createdMembers
}