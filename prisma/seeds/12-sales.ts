// prisma/seeds/12-sales.ts
import type { PrismaClient } from '@prisma/client'
import { logger } from './utils'

/**
 * 앨범 판매량 시드
 */
export async function seedAlbumSales(prisma: PrismaClient) {
  // 앨범 조회
  const wishAlbum = await prisma.album.findFirst({ where: { title: 'WISH' } })
  const songbirdAlbum = await prisma.album.findFirst({ where: { title: 'Songbird' } })
  const steadyAlbum = await prisma.album.findFirst({ where: { title: 'Steady' } })
  const poppopAlbum = await prisma.album.findFirst({ where: { title: 'poppop' } })

  const salesData = []

  // WISH 초동 (발매 후 첫 주)
  if (wishAlbum) {
    salesData.push({
      albumId: wishAlbum.id,
      date: new Date('2024-03-04'),
      units: 453829, // 45만 장
      totalUnits: 453829,
      provider: 'Circle Chart',
      daySequence: 7,
      note: '초동 판매량',
    })
  }

  // Songbird 초동
  if (songbirdAlbum) {
    salesData.push({
      albumId: songbirdAlbum.id,
      date: new Date('2024-07-01'),
      units: 530000, // 53만 장
      totalUnits: 530000,
      provider: 'Circle Chart',
      daySequence: 7,
      note: '2024년 데뷔 아티스트 최고 초동 기록',
    })
  }

  // Steady 초동
  if (steadyAlbum) {
    salesData.push({
      albumId: steadyAlbum.id,
      date: new Date('2024-09-30'),
      units: 720000, // 72만 장 (실제로는 더 높았을 가능성)
      totalUnits: 720000,
      provider: 'Circle Chart',
      daySequence: 7,
      note: '선주문 80만 장 돌파, 키링 버전 출하 지연으로 일부 미반영',
    })
  }

  // poppop 초동 (밀리언셀러)
  if (poppopAlbum) {
    salesData.push({
      albumId: poppopAlbum.id,
      date: new Date('2025-04-21'),
      units: 1330000, // 133만 장
      totalUnits: 1330000,
      provider: 'Circle Chart',
      daySequence: 7,
      note: '데뷔 후 첫 밀리언셀러',
    })
  }

  for (const salesEntry of salesData) {
    await prisma.albumDailySales.upsert({
      where: {
        albumId_date_provider: {
          albumId: salesEntry.albumId,
          date: salesEntry.date,
          provider: salesEntry.provider || 'Unknown',
        },
      },
      update: salesEntry,
      create: salesEntry,
    })
  }

  logger.success(`Album sales seeded: ${salesData.length} entries`)
  return salesData
}