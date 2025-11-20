// prisma/seeds/02-eras.ts
import type { PrismaClient } from '@prisma/client'

/**
 * Era/활동 시기 시드
 */
export async function seedEras(prisma: PrismaClient, groupId: string) {
  const eras = [
    {
      name: 'Pre-Debut Era',
      startDate: new Date('2023-09-07'),
      endDate: new Date('2024-02-20'),
      description: 'NCT NEW TEAM 프리데뷔 활동 (LASTART ~ Hands Up)',
      color: '#A8DADC', // 연한 청록
      groupId,
    },
    {
      name: 'WISH Era',
      startDate: new Date('2024-02-21'),
      endDate: new Date('2024-09-23'),
      description: '데뷔 싱글 WISH 활동',
      color: '#457B9D', // 청색
      groupId,
    },
    {
      name: 'Steady Era',
      startDate: new Date('2024-09-24'),
      endDate: new Date('2025-04-13'),
      description: '1st Mini Album Steady 활동',
      color: '#1D3557', // 네이비
      groupId,
    },
    {
      name: 'poppop Era',
      startDate: new Date('2025-04-14'),
      endDate: new Date('2025-08-31'),
      description: '2nd Mini Album poppop 활동',
      color: '#F1FAEE', // 크림
      groupId,
    },
    {
      name: 'COLOR Era',
      startDate: new Date('2025-09-01'),
      endDate: null, // 진행 중
      description: '3rd Mini Album COLOR 활동',
      color: '#E63946', // 레드
      groupId,
    },
  ]

  // 슬러그 생성 함수
  function slugify(text: string) {
    return text
      .toString()
      .normalize('NFKD')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .toLowerCase();
  }

  const createdEras = []
  for (const era of eras) {
    const id = `${groupId}-${slugify(era.name)}`;
    const result = await prisma.era.upsert({
      where: { id },
      update: {},
      create: { ...era, id },
    })
    createdEras.push(result)
  }

  console.log(`   ✓ Created ${eras.length} eras`)
  return createdEras
}