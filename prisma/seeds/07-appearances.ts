// prisma/seeds/07-appearances.ts
import type { PrismaClient } from '@prisma/client'
import { logger, ProgressTracker } from './utils'

/**
 * 방송 출연 기록 시드
 */
export async function seedAppearances(prisma: PrismaClient) {
  // 프로그램 조회
  const mcountdown = await prisma.program.findFirst({
    where: { name: 'M COUNTDOWN' },
  })
  const musicBank = await prisma.program.findFirst({
    where: { name: 'Music Bank' },
  })
  const musicCore = await prisma.program.findFirst({
    where: { name: 'Show! Music Core' },
  })
  const inkigayo = await prisma.program.findFirst({
    where: { name: 'SBS 인기가요' },
  })
  const theShow = await prisma.program.findFirst({
    where: { name: 'The Show' },
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
  const colorTrack = await prisma.track.findFirst({
    where: { title: 'COLOR' },
  })

  if (!mcountdown || !musicBank || !musicCore || !inkigayo || !theShow) {
    logger.error('프로그램 데이터를 찾을 수 없습니다. Appearances 시드를 건너뜁니다.')
    return []
  }

  const appearances = [
    // ==================== WISH 활동 ====================
    // M COUNTDOWN
    ...(mcountdown && wishTrack
      ? [
          {
            programId: mcountdown.id,
            trackId: wishTrack.id,
            date: new Date('2024-02-29'),
            title: 'WISH 데뷔 무대',
            isPerformance: true,
            note: '데뷔 첫 무대',
          },
          {
            programId: mcountdown.id,
            trackId: wishTrack.id,
            date: new Date('2024-03-07'),
            title: 'WISH',
            isPerformance: true,
          },
          {
            programId: mcountdown.id,
            trackId: wishTrack.id,
            date: new Date('2024-03-14'),
            title: 'WISH',
            isPerformance: true,
          },
        ]
      : []),

    // Music Bank
    ...(musicBank && wishTrack
      ? [
          {
            programId: musicBank.id,
            trackId: wishTrack.id,
            date: new Date('2024-03-01'),
            title: 'WISH 데뷔 무대',
            isPerformance: true,
          },
          {
            programId: musicBank.id,
            trackId: wishTrack.id,
            date: new Date('2024-03-08'),
            title: 'WISH',
            isPerformance: true,
          },
          {
            programId: musicBank.id,
            trackId: wishTrack.id,
            date: new Date('2024-03-15'),
            title: 'WISH',
            isPerformance: true,
          },
        ]
      : []),

    // The Show 첫 1위
    ...(theShow && wishTrack
      ? [
          {
            programId: theShow.id,
            trackId: wishTrack.id,
            date: new Date('2024-03-12'),
            title: 'WISH - 첫 1위',
            isPerformance: true,
            note: '데뷔 20일 만에 첫 1위',
          },
        ]
      : []),

    // ==================== Steady 활동 ====================
    // M COUNTDOWN
    ...(mcountdown && steadyTrack
      ? [
          {
            programId: mcountdown.id,
            trackId: steadyTrack.id,
            date: new Date('2024-09-26'),
            title: 'Steady 컴백 무대',
            isPerformance: true,
            note: '1st 미니앨범 컴백',
          },
          {
            programId: mcountdown.id,
            trackId: steadyTrack.id,
            date: new Date('2024-10-03'),
            title: 'Steady',
            isPerformance: true,
          },
          {
            programId: mcountdown.id,
            trackId: steadyTrack.id,
            date: new Date('2024-10-10'),
            title: 'Steady',
            isPerformance: true,
          },
        ]
      : []),

    // Music Bank
    ...(musicBank && steadyTrack
      ? [
          {
            programId: musicBank.id,
            trackId: steadyTrack.id,
            date: new Date('2024-09-27'),
            title: 'Steady 컴백',
            isPerformance: true,
          },
          {
            programId: musicBank.id,
            trackId: steadyTrack.id,
            date: new Date('2024-10-04'),
            title: 'Steady - 첫 지상파 1위',
            isPerformance: true,
            note: '10월 4일 (1004=천사) 첫 지상파 1위',
          },
          {
            programId: musicBank.id,
            trackId: steadyTrack.id,
            date: new Date('2024-10-11'),
            title: 'Steady',
            isPerformance: true,
          },
        ]
      : []),

    // Music Core
    ...(musicCore && steadyTrack
      ? [
          {
            programId: musicCore.id,
            trackId: steadyTrack.id,
            date: new Date('2024-09-28'),
            title: 'Steady 컴백',
            isPerformance: true,
          },
          {
            programId: musicCore.id,
            trackId: steadyTrack.id,
            date: new Date('2024-10-05'),
            title: 'Steady',
            isPerformance: true,
          },
        ]
      : []),

    // ==================== poppop 활동 ====================
    // M COUNTDOWN
    ...(mcountdown && poppopTrack
      ? [
          {
            programId: mcountdown.id,
            trackId: poppopTrack.id,
            date: new Date('2025-04-17'),
            title: 'poppop 컴백 무대',
            isPerformance: true,
            note: '2nd 미니앨범 컴백',
          },
          {
            programId: mcountdown.id,
            trackId: poppopTrack.id,
            date: new Date('2025-04-24'),
            title: 'poppop - 첫 엠카 1위',
            isPerformance: true,
            note: '데뷔 후 첫 M COUNTDOWN 1위',
          },
          {
            programId: mcountdown.id,
            trackId: poppopTrack.id,
            date: new Date('2025-05-01'),
            title: 'poppop',
            isPerformance: true,
          },
        ]
      : []),

    // Music Bank
    ...(musicBank && poppopTrack
      ? [
          {
            programId: musicBank.id,
            trackId: poppopTrack.id,
            date: new Date('2025-04-18'),
            title: 'poppop 컴백',
            isPerformance: true,
          },
          {
            programId: musicBank.id,
            trackId: poppopTrack.id,
            date: new Date('2025-04-25'),
            title: 'poppop - 1위',
            isPerformance: true,
          },
        ]
      : []),

    // Music Core
    ...(musicCore && poppopTrack
      ? [
          {
            programId: musicCore.id,
            trackId: poppopTrack.id,
            date: new Date('2025-04-19'),
            title: 'poppop 컴백',
            isPerformance: true,
          },
          {
            programId: musicCore.id,
            trackId: poppopTrack.id,
            date: new Date('2025-04-26'),
            title: 'poppop - 첫 음중 1위',
            isPerformance: true,
            note: '데뷔 후 첫 Show Music Core 1위',
          },
        ]
      : []),

    // Inkigayo
    ...(inkigayo && poppopTrack
      ? [
          {
            programId: inkigayo.id,
            trackId: poppopTrack.id,
            date: new Date('2025-04-20'),
            title: 'poppop 컴백 (시온 스페셜 MC)',
            isPerformance: true,
            role: 'Special MC (시온)',
            note: '시온 스페셜 MC 출연',
          },
        ]
      : []),

    // ==================== COLOR 활동 ====================
    // M COUNTDOWN
    ...(mcountdown && colorTrack
      ? [
          {
            programId: mcountdown.id,
            trackId: colorTrack.id,
            date: new Date('2025-09-05'),
            title: 'COLOR 컴백 무대',
            isPerformance: true,
            note: '3rd 미니앨범 컴백',
          },
          {
            programId: mcountdown.id,
            trackId: colorTrack.id,
            date: new Date('2025-09-12'),
            title: 'COLOR',
            isPerformance: true,
          },
        ]
      : []),

    // Music Bank
    ...(musicBank && colorTrack
      ? [
          {
            programId: musicBank.id,
            trackId: colorTrack.id,
            date: new Date('2025-09-06'),
            title: 'COLOR 컴백',
            isPerformance: true,
          },
        ]
      : []),
  ]

  const createdAppearances = []
  const progress = new ProgressTracker('Appearances seeding', appearances.length)

  for (const appearanceData of appearances) {
    try {
      const appearance = await prisma.appearance.upsert({
        where: {
          id: `${appearanceData.programId}-${appearanceData.date.toISOString()}-${appearanceData.trackId}`,
        },
        update: appearanceData,
        create: appearanceData,
      })

      createdAppearances.push(appearance)
      progress.increment()
    } catch (error) {
      const existing = await prisma.appearance.findFirst({
        where: {
          programId: appearanceData.programId,
          date: appearanceData.date,
          trackId: appearanceData.trackId,
        },
      })

      if (existing) {
        await prisma.appearance.update({
          where: { id: existing.id },
          data: appearanceData,
        })
        createdAppearances.push(existing)
      } else {
        const newAppearance = await prisma.appearance.create({
          data: appearanceData,
        })
        createdAppearances.push(newAppearance)
      }

      progress.increment()
    }
  }

  progress.complete()
  logger.success(`Appearances seeded: ${createdAppearances.length} appearances`)
  return createdAppearances
}
