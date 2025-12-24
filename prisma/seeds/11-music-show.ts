// prisma/seeds/11-music-show.ts
import type { PrismaClient } from '@prisma/client'
import { logger, ProgressTracker } from './utils'

/**
 * 음악방송 1위 트로피 시드
 */
export async function seedMusicShowTrophies(prisma: PrismaClient) {
  // 프로그램 조회
  const mcountdown = await prisma.program.findFirst({
    where: { name: 'M COUNTDOWN' },
  })
  const musicBank = await prisma.program.findFirst({
    where: { name: 'Music Bank' },
  })
  const theShow = await prisma.program.findFirst({
    where: { name: { contains: 'The Show' } },
  })
  const musicCore = await prisma.program.findFirst({
    where: { name: { contains: 'Music Core' } },
  })

  // 트랙 조회
  const wishTrack = await prisma.track.findFirst({
    where: { title: { contains: 'WISH (Korean' } },
  })
  const steadyTrack = await prisma.track.findFirst({
    where: { title: 'Steady' },
  })
  const poppopTrack = await prisma.track.findFirst({
    where: { title: 'poppop' },
  })

  const trophies = []

  // WISH - The Show 1위 (데뷔 20일 만)
  if (theShow && wishTrack) {
    trophies.push({
      programId: theShow.id,
      trackId: wishTrack.id,
      date: new Date('2024-03-12'),
      score: 7500,
      note: '데뷔 20일 만에 첫 음악방송 1위',
    })
  }

  // Steady - Music Bank 1위 (10월 4일 = 1004 = 천사)
  if (musicBank && steadyTrack) {
    trophies.push({
      programId: musicBank.id,
      trackId: steadyTrack.id,
      date: new Date('2024-10-04'),
      score: 5820,
      note: '데뷔 후 첫 지상파 음악방송 1위 (1004 = 천사)',
    })
  }

  // poppop - M COUNTDOWN 1위
  if (mcountdown && poppopTrack) {
    trophies.push({
      programId: mcountdown.id,
      trackId: poppopTrack.id,
      date: new Date('2025-04-24'),
      score: 6800,
      note: '데뷔 후 첫 엠카 1위',
    })
  }

  // poppop - Music Bank 1위
  if (musicBank && poppopTrack) {
    trophies.push({
      programId: musicBank.id,
      trackId: poppopTrack.id,
      date: new Date('2025-04-25'),
      score: 5940,
      note: null,
    })
  }

  // poppop - Show Music Core 1위
  if (musicCore && poppopTrack) {
    trophies.push({
      programId: musicCore.id,
      trackId: poppopTrack.id,
      date: new Date('2025-04-26'),
      score: 8200,
      note: '데뷔 후 첫 음악중심 1위',
    })
  }

  for (const trophyData of trophies) {
    await prisma.musicShowTrophy.upsert({
      where: {
        id: `${trophyData.programId}-${trophyData.trackId}-${trophyData.date.toISOString()}`,
      },
      update: trophyData,
      create: trophyData,
    })
  }

  logger.success(`Music show trophies seeded: ${trophies.length} wins`)
  return trophies
}