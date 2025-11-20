// prisma/seeds/09-certifications.ts
import type { PrismaClient } from '@prisma/client'

/**
 * 인증 정보 시드
 */
export async function seedCertifications(prisma: PrismaClient) {
  // 앨범 조회
  const wishAlbum = await prisma.album.findFirst({
    where: { title: 'WISH' },
  })

  if (!wishAlbum) {
    console.log('⚠️  Album not found, skipping certifications')
    return []
  }

  const certifications = [
    {
      body: 'KMCA' as const,
      level: 'GOLD' as const,
      date: new Date('2024-03-15'),
      units: 250000,
    },
  ]

  const createdCertifications = []

  for (const certData of certifications) {
    const existing = await prisma.certification.findFirst({
      where: {
        albumId: wishAlbum.id,
        body: certData.body,
        level: certData.level,
      },
    })

    let cert
    if (existing) {
      cert = await prisma.certification.update({
        where: { id: existing.id },
        data: certData,
      })
    } else {
      cert = await prisma.certification.create({
        data: { ...certData, albumId: wishAlbum.id },
      })
    }
    createdCertifications.push(cert)
  }

  console.log(`✓ Certifications seeded: ${createdCertifications.length} certifications`)
  return createdCertifications
}
