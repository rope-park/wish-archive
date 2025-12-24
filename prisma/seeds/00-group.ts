// prisma/seeds/00-group.ts
import type { PrismaClient } from '@prisma/client'
import { createExternalLinks, logger } from './utils'

/**
 * NCT WISH 그룹 정보 시드
 */
// TODO: 실제 로고/아이콘 이미지 경로 업데이트 필요
export async function seedGroup(prisma: PrismaClient) {
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
    description: `NCT WISH는 2024년 2월 21일에 데뷔한 SM 엔터테인먼트 소속의 6인조 다국적 보이그룹이자 NCT의 네 번째 서브 유닛이다. WayV에 이은 NCT의 두 번째 해외 현지화 그룹으로, 일본을 중심으로 한국과 일본 양국에서 활동한다.

**그룹명**: 멤버들과 팬들의 간절한 소망(WISH)이 맞닿아 탄생한 팀을 의미하며, 'WISH for Our WISH'라는 캐치프레이즈 아래 NCT WISH의 음악과 사랑으로 모든 이들의 소원과 꿈을 응원하며 함께 이루어 가자는 포부를 담고 있다.

**결성 과정**: 2023년 SM의 자체 서바이벌 프로그램 'NCT Universe : LASTART'를 통해 결성되었다. 총괄 프로듀서는 보아(BoA)가 맡았으며, SM 설립 이래 처음으로 도입한 시스템이다. 본래 6인조 목표였으나 그룹 완성도를 위해 4화에서 재희가 추가 합류, 파이널에서 료가 추가 선발되어 7인조가 되었다. 그러나 2023년 10월 2일 정민이 건강상 이유로 하차하여 최종 6인조로 데뷔했다.

**특징**: 
- NCT의 '무한 확장' 시스템의 마지막 그룹 (이후 무한 확장 종료 선언)
- 남자 아이돌에서 흔히 볼 수 없는 무해하고 귀여운 매력
- '위시 코어'라 불리는 귀여운 날개와 별의 조합이 시그니처
- 레그워머, 레이스 등 여성적 요소를 활용한 독특한 코디
- SM 소속 아이돌답게 탄탄한 보컬 실력
- 시온, 재희를 제외한 인원이 일본인임에도 상당한 랩 실력 보유
- 사투리 수저 그룹 (시온-목포 사투리, 재희-대구 사투리, 리쿠-후쿠이 사투리, 료-교토 사투리)
- NCT 내에서 가장 잘 먹는 유닛 (특히 디저트류)
- 만우절에 굉장히 진심인 그룹

**프로듀서**: 보아 (BoA) - SM 최초 총괄 프로듀서 시스템
**데뷔곡**: WISH (한국어/일본어 2개 버전)
**데뷔 무대**: 2024년 2월 21~22일 도쿄돔 SMTOWN LIVE 2024`
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