// prisma/seeds/00-group.ts
import type { PrismaClient } from '@prisma/client'
import { createExternalLinks, logger } from './utils'
import fs from 'fs'
import path from 'path'

/**
 * NCT WISH 그룹 정보 시드
 */
// TODO: 실제 로고/아이콘 이미지 경로 업데이트 필요
export async function seedGroup(prisma: PrismaClient) {
  
  // 그룹 설명 파일 읽기
  const descriptionPath = path.join(process.cwd(), 'content/group/description.html');
  let description = '';

  try {
    description = fs.readFileSync(descriptionPath, 'utf-8');
  } catch (error) {
    logger.error(`✗ Failed to read group description file: ${error}`);
    description = 'Description not available.';
  }

  const groupData = {
    slug: 'nct-wish',

    // [1] 기본 정보
    name: 'NCT WISH',
    nameKo: '엔시티 위시',
    nameJa: 'エヌシーティー・ウィッシュ',

    // [2] 기념일
    debutDate: new Date('2024-02-21'),
    formationDate: new Date('2023-09-07'),

    // [3] 팬덤 & 테마
    fandomName: 'NCTzen WISH',
    officialColor: '#BBE309', // PEARL NEO CHAMPAGNE

    // [4] 비주얼 에셋
    logoUrl: '/content/group/logo_main.png',
    iconUrl: '/content/group/icon_symbol.png',

    // [5] 상세 정보
    agency: 'SM Entertainment',
    label: 'SM Entertainment (Korea) / Avex Trax (Japan)',
    description: description
  }

  // 1. 그룹 정보 생성/업데이트
  const group = await prisma.group.upsert({
    where: { slug: groupData.slug },
    update: groupData,
    create: groupData,
  })

  logger.success(`✓ Group created/updated: ${group.name}`);


  // 2. 그룹 외부 링크 추가 (순서 지정)
  await createExternalLinks(prisma, group.id, 'groupId', [
    {
      type: 'OFFICIAL_SITE' as const,
      title: 'SMTOWN NCT WISH',
      url: 'https://www.smtown.com/artist/musician/14367',
      order: 1,
    },
    {
      type: 'WEVERSE' as const,
      title: 'NCT WISH Official Weverse',
      url: 'https://www.weverse.io/nctwish',
      order: 2,
    },
    {
      type: 'YOUTUBE' as const,
      title: 'NCT WISH Official YouTube',
      url: 'https://www.youtube.com/@NCTWISH',
      order: 3,
    },
    {
      type: 'X_TWITTER' as const,
      title: 'NCT WISH Official X',
      url: 'https://x.com/NCTsmtown_WISH',
      order: 4,
    },
    {
      type: 'INSTAGRAM' as const,
      title: 'NCT WISH Official Instagram',
      url: 'https://www.instagram.com/nctwish_official',
      order: 5,
    },
    {
      type: 'TIKTOK' as const,
      title: 'NCT WISH Official TikTok',
      url: 'https://www.tiktok.com/@nctwish_official',
      order: 6,
    },
    {
      type: 'WEIBO' as const,
      title: 'NCT WISH Official Weibo',
      url: 'https://www.weibo.com/nctwish',
      order: 7,
    },
    {
      type: 'SPOTIFY' as const,
      title: 'NCT WISH on Spotify',
      url: 'https://open.spotify.com/artist/4FqmqIspLaUGtxAFFLsZxc',
      order: 8,
    },
  ]);

  return group
}