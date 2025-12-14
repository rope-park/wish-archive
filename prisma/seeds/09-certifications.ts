// prisma/seeds/09-certifications.ts
import type { PrismaClient } from '@prisma/client'
import { logger } from './utils'

/**
 * 앨범 인증 시드
 */
// TODO: 실제 badge 이미지 경로 업데이트 필요
export async function seedCertifications(prisma: PrismaClient) {
  const certifications = []

  // WISH 앨범 인증
  const wishAlbum = await prisma.album.findFirst({ where: { title: 'WISH' } })
  if (wishAlbum) {
    certifications.push({
      body: 'KMCA' as const,
      level: 'PLATINUM' as const,
      date: new Date('2024-03-15'),
      units: 250000,
      albumId: wishAlbum.id,
      badgeImageUrl: '/badges/kmca_platinum.png',
    })
  }

  // Steady 앨범 인증
  const steadyAlbum = await prisma.album.findFirst({ where: { title: 'Steady' } })
  if (steadyAlbum) {
    certifications.push({
      body: 'KMCA' as const,
      level: 'DOUBLE_PLATINUM' as const,
      date: new Date('2024-10-15'),
      units: 500000,
      albumId: steadyAlbum.id,
      badgeImageUrl: '/badges/kmca_double_platinum.png',
    })
  }

  // poppop 앨범 인증 (밀리언셀러)
  const poppopAlbum = await prisma.album.findFirst({ where: { title: 'poppop' } })
  if (poppopAlbum) {
    certifications.push({
      body: 'KMCA' as const,
      level: 'MILLION' as const,
      date: new Date('2025-05-01'),
      units: 1330000, // 133만 장
      albumId: poppopAlbum.id,
      badgeImageUrl: '/badges/kmca_million.png',
    })
  }

  // Songbird 일본 인증
  const songbirdAlbum = await prisma.album.findFirst({ where: { title: 'Songbird' } })
  if (songbirdAlbum) {
    certifications.push({
      body: 'RIAJ' as const,
      level: 'GOLD' as const,
      date: new Date('2024-07-30'),
      units: 100000,
      albumId: songbirdAlbum.id,
      badgeImageUrl: '/badges/riaj_gold.png',
    })
  }

  for (const certData of certifications) {
    await prisma.certification.upsert({
      where: {
        id: `${certData.albumId}-${certData.body}-${certData.level}`,
      },
      update: certData,
      create: certData,
    })
  }

  logger.success(`Certifications seeded: ${certifications.length} certs`)
  return certifications
}