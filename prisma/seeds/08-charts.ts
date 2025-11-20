// prisma/seeds/08-charts.ts
import type { PrismaClient } from '@prisma/client'

/**
 * 차트 정보 시드
 */
export async function seedCharts(prisma: PrismaClient) {
  const charts = [
    {
      name: 'Circle Album Chart',
      provider: 'Circle Chart (Gaon)',
      country: 'KR',
      notes: '한국 공식 음반 차트',
    },
    {
      name: 'Oricon Weekly Singles Chart',
      provider: 'Oricon',
      country: 'JP',
      notes: '일본 오리콘 싱글 차트',
    },
  ]

  const createdCharts = []

  for (const chartData of charts) {
    const existing = await prisma.chart.findFirst({
      where: {
        name: chartData.name,
        provider: chartData.provider,
      },
    })

    let chart
    if (existing) {
      chart = await prisma.chart.update({
        where: { id: existing.id },
        data: chartData,
      })
    } else {
      chart = await prisma.chart.create({
        data: chartData,
      })
    }
    createdCharts.push(chart)
  }

  console.log(`✓ Charts seeded: ${createdCharts.length} charts`)
  return createdCharts
}
