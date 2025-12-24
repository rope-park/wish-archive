// prisma/seeds/08-charts.ts
import type { PrismaClient, Chart } from '@prisma/client'
import { logger, ProgressTracker } from './utils'

/**
 * 차트 정보 시드
 */
export async function seedCharts(prisma: PrismaClient) {
  // 차트 정의
  const charts = [
    {
      name: 'Circle Album Chart',
      provider: 'Circle Chart (Gaon)',
      country: 'KR',
      periodType: 'WEEKLY',
      notes: '한국 공식 음반 차트 (구 가온차트)',
      logoUrl: '/content/charts/circle_chart.png',
    },
    {
      name: 'Circle Digital Chart',
      provider: 'Circle Chart (Gaon)',
      country: 'KR',
      periodType: 'DAILY',
      notes: '한국 공식 음원 차트',
      logoUrl: '/content/charts/circle_chart.png',
    },
    {
      name: 'Melon TOP 100',
      provider: 'Melon',
      country: 'KR',
      periodType: 'REALTIME',
      notes: '멜론 실시간 차트',
      logoUrl: '/content/charts/melon.png',
    },
    {
      name: 'Bugs Chart',
      provider: 'Bugs',
      country: 'KR',
      periodType: 'REALTIME',
      notes: '벅스 실시간 차트',
      logoUrl: '/content/charts/bugs.png',
    },
    {
      name: 'Apple Music Top 100',
      provider: 'Apple Music',
      country: 'KR',
      periodType: 'DAILY',
      notes: '애플뮤직 한국 Top 100',
      logoUrl: '/content/charts/apple_music.png',
    },
    {
      name: 'Oricon Weekly Singles Chart',
      provider: 'Oricon',
      country: 'JP',
      periodType: 'WEEKLY',
      notes: '일본 오리콘 싱글 차트',
      logoUrl: '/content/charts/oricon.png',
    },
    {
      name: 'Oricon Weekly Albums Chart',
      provider: 'Oricon',
      country: 'JP',
      periodType: 'WEEKLY',
      notes: '일본 오리콘 앨범 차트',
      logoUrl: '/content/charts/oricon.png',
    },
    {
      name: 'Billboard Japan Hot 100',
      provider: 'Billboard Japan',
      country: 'JP',
      periodType: 'WEEKLY',
      notes: '빌보드 재팬 Hot 100',
      logoUrl: '/content/charts/billboard_japan.png',
    },
  ]

  const createdCharts = []
  const progress = new ProgressTracker('Charts seeding', charts.length)

  for (const chartData of charts) {
    const chart = await prisma.chart.upsert({
      where: {
        name_provider_periodType: {
          name: chartData.name,
          provider: chartData.provider || '',
          periodType: chartData.periodType,
        },
      },
      update: chartData,
      create: chartData,
    })
    createdCharts.push(chart)
    progress.increment()
  }

  progress.complete()
  logger.success(`Charts seeded: ${createdCharts.length} charts`)

  // 2. 차트 엔트리 (실제 성적) 추가
  await seedChartEntries(prisma, createdCharts)

  return createdCharts
}

async function seedChartEntries(prisma: PrismaClient, charts: Chart[]) {
  // 앨범 조회
  const albums = await prisma.album.findMany();
  const getAlbum = (title: string) => albums.find(a => a.title === title);

  const wishAlbum = getAlbum('WISH');
  const steadyAlbum = getAlbum('Steady');
  const poppopAlbum = getAlbum('poppop');
  const songbirdAlbum = getAlbum('Songbird');


  // 트랙 조회
  const tracks = await prisma.track.findMany();
  const getTrack = (title: string) => tracks.find(t => t.title === title);

  const wishTrack = getTrack('WISH (Korean Ver.)');
  const steadyTrack = getTrack('Steady');
  const poppopTrack = getTrack('poppop');

  // Circle Album Chart
  const circleAlbum = charts.find((c) => c.name === 'Circle Album Chart')
  if (circleAlbum && wishAlbum) {
    await prisma.chartEntry.upsert({
      where: {
        id: `${circleAlbum.id}-${wishAlbum.id}-2024-03-04`,
      },
      update: {},
      create: {
        chartId: circleAlbum.id,
        albumId: wishAlbum.id,
        date: new Date('2024-03-04'),
        rank: 1,
        isNew: true,
      },
    })
  }

  if (circleAlbum && steadyAlbum) {
    await prisma.chartEntry.upsert({
      where: {
        id: `${circleAlbum.id}-${steadyAlbum.id}-2024-09-30`,
      },
      update: {},
      create: {
        chartId: circleAlbum.id,
        albumId: steadyAlbum.id,
        date: new Date('2024-09-30'),
        rank: 1,
        isNew: true,
      },
    })
  }

  if (circleAlbum && poppopAlbum) {
    await prisma.chartEntry.upsert({
      where: {
        id: `${circleAlbum.id}-${poppopAlbum.id}-2025-04-21`,
      },
      update: {},
      create: {
        chartId: circleAlbum.id,
        albumId: poppopAlbum.id,
        date: new Date('2025-04-21'),
        rank: 1,
        isNew: true,
      },
    })
  }

  // Apple Music
  const appleMusic = charts.find((c) => c.name === 'Apple Music Top 100')
  if (appleMusic && poppopTrack) {
    await prisma.chartEntry.upsert({
      where: {
        id: `${appleMusic.id}-${poppopTrack.id}-2025-04-21`,
      },
      update: {},
      create: {
        chartId: appleMusic.id,
        trackId: poppopTrack.id,
        date: new Date('2025-04-21'),
        rank: 1,
        isNew: false,
      },
    })
  }

  // Oricon Weekly
  const oriconSingles = charts.find((c) => c.name === 'Oricon Weekly Singles Chart')
  if (oriconSingles && songbirdAlbum) {
    await prisma.chartEntry.upsert({
      where: {
        id: `${oriconSingles.id}-${songbirdAlbum.id}-2024-07-08`,
      },
      update: {},
      create: {
        chartId: oriconSingles.id,
        albumId: songbirdAlbum.id,
        date: new Date('2024-07-08'),
        rank: 2,
        isNew: true,
      },
    })
  }

  logger.success('Chart entries seeded')
}
