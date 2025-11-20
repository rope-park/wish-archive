// prisma/seeds/07-appearances.ts
import type { PrismaClient } from '@prisma/client'

/**
 * 방송 출연 기록 시드
 */
export async function seedAppearances(prisma: PrismaClient) {
  // 프로그램 조회
  const mcountdown = await prisma.program.findFirst({
    where: { name: 'M COUNTDOWN' },
  })

  if (!mcountdown) {
    console.log('⚠️  Program not found, skipping appearances')
    return []
  }

  const appearances = [
    {
      date: new Date('2024-02-22'),
      episode: 'EP.799',
      notes: 'WISH 무대',
    },
    {
      date: new Date('2024-02-29'),
      episode: 'EP.800',
      notes: 'WISH 무대',
    },
  ]

  const createdAppearances = []

  for (const appearanceData of appearances) {
    const existing = await prisma.appearance.findFirst({
      where: {
        programId: mcountdown.id,
        date: appearanceData.date,
      },
    })

    let appearance
    if (existing) {
      appearance = await prisma.appearance.update({
        where: { id: existing.id },
        data: appearanceData,
      })
    } else {
      appearance = await prisma.appearance.create({
        data: { ...appearanceData, programId: mcountdown.id },
      })
    }
    createdAppearances.push(appearance)
  }

  console.log(`✓ Appearances seeded: ${createdAppearances.length} appearances`)
  return createdAppearances
}
