// prisma/seeds/06-programs.ts
import type { PrismaClient } from '@prisma/client'

/**
 * 방송 프로그램 시드
 */
export async function seedPrograms(prisma: PrismaClient) {
  const programs = [
    {
      name: 'M COUNTDOWN',
      network: 'Mnet',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      notes: 'CJ ENM 음악 프로그램',
    },
    {
      name: 'Music Bank',
      network: 'KBS2',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      notes: 'KBS 음악 프로그램',
    },
    {
      name: 'Show! Music Core',
      network: 'MBC',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      notes: 'MBC 음악 프로그램',
    },
  ]

  const createdPrograms = []

  for (const programData of programs) {
    const existing = await prisma.program.findFirst({
      where: {
        name: programData.name,
        network: programData.network,
      },
    })

    let program
    if (existing) {
      program = await prisma.program.update({
        where: { id: existing.id },
        data: programData,
      })
    } else {
      program = await prisma.program.create({
        data: programData,
      })
    }
    createdPrograms.push(program)
  }

  console.log(`✓ Programs seeded: ${createdPrograms.length} programs`)
  return createdPrograms
}
