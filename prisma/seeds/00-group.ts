// prisma/seeds/00-group.ts
import type { PrismaClient } from '@prisma/client'

/**
 * NCT WISH 그룹 정보 시드
 */
export async function seedGroup(prisma: PrismaClient) {
  const groupData = {
    slug: 'nct-wish',
    name: 'NCT WISH',
    nameKo: '엔시티 위시',
    debutDate: new Date('2024-02-21'),
    formationDate: new Date('2023-09-07'),
    fandomName: 'NCTzen WISH',
    officialColor: '#bbe309', // PEARL NEO CHAMPAGNE
    agency: 'SM Entertainment',
    label: 'Avex Trax',
  }

  // 기존 그룹 확인
  const existing = await prisma.group.findFirst({
    where: { slug: groupData.slug },
  })

  let group
  if (existing) {
    group = await prisma.group.update({
      where: { id: existing.id },
      data: groupData,
    })
    console.log(`✓ Group updated: ${group.name}`)
  } else {
    group = await prisma.group.create({
      data: groupData,
    })
    console.log(`✓ Group created: ${group.name}`)
  }

  // 그룹 외부 링크 추가
  const links = [
    {
      type: 'OFFICIAL_SITE' as const,
      title: 'SMTOWN 공식 프로필',
      url: 'https://www.smtown.com/artist/musician/14367',
    },
    {
      type: 'YOUTUBE' as const,
      title: 'NCT WISH YouTube',
      url: 'https://www.youtube.com/@NCTWISH',
    },
    {
      type: 'X_TWITTER' as const,
      title: 'NCT WISH Twitter',
      url: 'https://x.com/NCTsmtown_WISH',
    },
    {
      type: 'INSTAGRAM' as const,
      title: 'NCT WISH Instagram',
      url: 'https://www.instagram.com/nctwish_official',
    },
  ]

  for (const linkData of links) {
    const existingLink = await prisma.externalLink.findUnique({
      where: { url: linkData.url },
    })

    if (!existingLink) {
      await prisma.externalLink.create({
        data: {
          ...linkData,
          groupId: group.id,
        },
      })
    }
  }

  return group
}