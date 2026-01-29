// prisma/seeds/02-eras.ts
import type { PrismaClient } from '@prisma/client'
import { logger, slugify, ProgressTracker, upsertRecord } from './utils/utils'

/**
 * Era/활동 시기 시드
 */
// TODO: 실제 이미지 경로 업데이트 및 데이터 업데이트 필요
export async function seedEras(prisma: PrismaClient, groupId: string) {
  const eras = [
    {
      name: 'Pre-Debut',
      title: 'NCT NEW TEAM Pre-Debut',
      startDate: new Date('2023-09-07'),
      endDate: new Date('2024-02-20'),
      description: `NCT NEW TEAM으로 활동하던 프리데뷔 시기. 2023년 서바이벌 프로그램 "NCT Universe : LASTART"를 통해 멤버들이 선발되었고, 일본에서 Hands Up으로 프리데뷔했다. 
      
본래 6인조 목표였으나 재희가 4화에서 추가 합류, 파이널에서 료가 추가 선발되어 7인조가 되었다. 그러나 2023년 10월 2일 정민이 건강상 이유로 하차하여 최종 6인조가 확정되었다.

주요 활동: 
- NCT NATION : To The World 사전 무대
- 일본 9개 도시 24회 프리데뷔 투어
- Hands Up 디지털 싱글 발매 (일본)`,
      isCurrent: false,
      themeColor: '#A8DADC',
      iconUrl: '/system/icons/folders/folder_pre-debut.png',
      logoUrl: '/content/eras/pre-debut/logo.png',
      backgroundUrl: '/content/eras/pre-debut/background.jpg',
    },
    {
      name: 'WISH',
      title: 'WISH: Let\'s WISH it up',
      startDate: new Date('2024-02-21'),
      endDate: new Date('2024-06-24'),
      description: `NCT WISH의 공식 데뷔 시기. 2024년 2월 21~22일 도쿄돔 SMTOWN LIVE 2024에서 데뷔곡 WISH 무대를 최초 공개했고, 28일 음원이 발매되었다.

보아가 프로듀싱을 맡았으며, 큐피드 콘셉트가 돋보이는 앨범. 밝고 희망찬 에너지를 담은 타이틀곡으로 데뷔 20일 만에 The Show에서 첫 음악방송 1위를 달성하며 성공적인 데뷔를 알렸다.

주요 성과:
- The Show 1위 (데뷔 20일 만)
- 초동 판매량 45만 장 (한터차트 28만장)
- Circle Album Chart 1위
- 한국어/일본어 2개 버전 동시 발매`,
      isCurrent: false,
      themeColor: '#BFFF00',
      iconUrl: '/system/icons/folders/folder_wish.png',
      logoUrl: '/content/eras/wish/logo.png',
      backgroundUrl: '/content/eras/wish/background.jpg',
    },
    {
      name: 'Songbird',
      title: 'Songbird: Let\'s ride',
      startDate: new Date('2024-06-25'),
      endDate: new Date('2024-09-08'),
      description: `청량하고 시원한 여름 분위기의 2nd 싱글 활동 시기. 일본 시장을 겨냥한 곡으로 신나는 비트와 상쾌한 멜로디가 특징이다.
      
6월 26일 일본 발매 후 7월 1일 한국 발매. 

주요 성과:
- 초동 판매량 53만 장 (하프 밀리언셀러 달성)
- Oricon Weekly Singles Chart 3위
- RIAJ Gold 인증 (10만장 이상 출하)`,
      isCurrent: false,
      themeColor: '#8EE3F5',
      iconUrl: '/system/icons/folders/folder_songbird.png',
      logoUrl: '/content/eras/songbird/logo.png',
      backgroundUrl: '/content/eras/songbird/background.jpg',
    },
    {
      name: 'Steady',
      title: 'Steady: Let\'s go Steady',
      startDate: new Date('2024-09-09'),
      endDate: new Date('2024-11-26'),
      description: `첫 미니앨범 활동 시기. "꾸준함(Steady)"이라는 메시지를 담아 다양한 장르를 소화하며 음악적 스펙트럼을 확장했다.

선공개 곡 "Dunk Shot" (9월 9일)부터 타이틀 "Steady" (9월 24일), 그리고 "3분까진 필요없어", "Supercute" 등 개성 있는 수록곡들로 구성되어 있다.

주요 성과:
- 선주문 80만 장 돌파, 초동 79만 장 기록 (자체 최고 경신)
- Music Bank 1위 (10월 4일 = 1004 = 천사, 데뷔 후 첫 지상파 1위)
- Circle Album Chart 1위
- KMCA Double Platinum 인증`,
      isCurrent: false,
      themeColor: '#FFB6D9',
      iconUrl: '/system/icons/folders/folder_steady.png',
      logoUrl: '/content/eras/steady/logo.png',
      backgroundUrl: '/content/eras/steady/background.jpg',
    },
    {
      name: 'WISHFUL',
      title: 'WISHFUL: Wishes come true',
      startDate: new Date('2024-11-27'),
      endDate: new Date('2025-01-21'),
      description: `일본 첫 정규 앨범 활동 시기. 크리스마스 시즌에 맞춰 발매된 앨범으로, 팝 발라드 타이틀곡 "Wishful Winter"를 포함해 신곡 6곡과 기존 곡들의 일본어 버전으로 구성되어 NCT WISH의 모든 매력을 집대성했다.

음원은 11월 27일 공개, 피지컬은 12월 25일 크리스마스에 발매되었다.

특징:
- 13곡 수록의 풍성한 구성
- 일본 시장 공략을 위한 전략적 발매
- 겨울 감성의 따뜻한 사운드`,
      isCurrent: false,
      themeColor: '#FFF89A',
      iconUrl: '/system/icons/folders/folder_wishful.png',
      logoUrl: '/content/eras/wishful/logo.png',
      backgroundUrl: '/content/eras/wishful/background.jpg',
    },
    {
      name: 'Miracle',
      title: 'Miracle: 2025 SMTOWN',
      startDate: new Date('2025-01-22'),
      endDate: new Date('2025-04-13'),
      description: `SM 창립 30주년 기념 프로젝트 [2025 SMTOWN : THE CULTURE, THE FUTURE]의 일환으로 발매된 선공개 싱글.

슈퍼주니어의 히트곡 'Miracle'을 리메이크했다. KENZIE가 편곡을 맡아 뉴잭스윙 장르로 모던하게 재해석했으며, 청량한 사운드와 멤버들의 영(Young)한 에너지가 돋보인다.`,
      isCurrent: false,
      themeColor: '#FFFFFF',
      iconUrl: '/system/icons/folders/folder_miracle.png',
      logoUrl: '/content/eras/miracle/logo.png',
      backgroundUrl: '/content/eras/miracle/background.jpg',
    },
    {
      name: 'poppop',
      title: 'poppop: Feeling go pop',
      startDate: new Date('2025-04-14'),
      endDate: new Date('2025-08-11'),
      description: `데뷔 후 첫 밀리언셀러를 달성한 2nd 미니앨범 활동 시기. 톡톡 터지는 청량감과 경쾌한 사운드로 가득한 앨범이다.

"Melt Inside My Pocket"을 NCT WISH ASIA TOUR LOG in SEOUL에서 선공개하여 화제를 모았다.

주요 성과:
- 초동 판매량 133만 장 (데뷔 후 첫 밀리언셀러!)
- Apple Music Top 100 1위
- M COUNTDOWN 1위 (데뷔 후 첫 엠카 1위)
- Music Bank 1위
- Show Music Core 1위 (데뷔 후 첫 음악중심 1위)
- KMCA Million 인증`,
      isCurrent: false,
      themeColor: '#0C23BC',
      iconUrl: '/system/icons/folders/folder_poppop.png',
      logoUrl: '/content/eras/poppop/logo.png',
      backgroundUrl: '/content/eras/poppop/background.jpg',
    },
    {
      name: 'COLOR',
      title: 'Color: Bring out the color',
      startDate: new Date('2025-08-12'),
      endDate: new Date('2026-01-13'),
      description: `다채로운 색깔과 개성을 담은 3rd 미니앨범 활동 시기. 9월 1일 발매.

선공개곡 "Surf", 뮤직비디오 선공개곡 "Baby Blue", 타이틀곡 "COLOR"까지 총 3편의 뮤직비디오가 공개되었다. 

수록곡 "Videohood"는 리그 오브 레전드 레퍼런스("Ninjas hide on bush")로 화제가 되었다.

주요 성과:
- 초동 판매량 139만 장 (커리어 하이)
- 멜론 HOT 100 1위, 실시간 4위 등 음원 성적 상승세
- COEX 광장 공연형 쇼케이스 WISH ON STAGE 개최`,
      isCurrent: false,
      themeColor: '#FDF628',
      iconUrl: '/system/icons/folders/folder_color.png',
      logoUrl: '/content/eras/color/logo.png',
      backgroundUrl: '/content/eras/color/background.jpg',
    },
    {
      name: 'WISHLIST',
      title: 'WISHLIST: Hello Mellow',
      startDate: new Date('2026-01-14'),
      endDate: null,
      description: `일본 첫 미니앨범 활동 시기. 2026년 1월 14일 발매.

타이틀곡 "Hello Mellow"는 강렬한 드럼 비트와 유니크한 멜로디 라인이 특징인 곡으로, 사랑에 빠진 소년의 설렘을 표현했다.

특징:
- 일본 오리지널 미니 앨범
- 다채로운 장르의 7곡 수록 ("ZONE", "BUBBLE GUM", "Dreamcatcher" 등)
- NCT WISH의 폭넓은 음악적 스펙트럼`,
      isCurrent: true,
      themeColor: '#FFA500',
      iconUrl: '/system/icons/folders/folder_wishlist.png',
      logoUrl: '/content/eras/wishlist/logo.png',
      backgroundUrl: '/content/eras/wishlist/background.jpg',
    },
  ]

  const createdEras = []
  const progressTracker = new ProgressTracker('Eras Seeding', eras.length)

  for (const eraData of eras) {
    const id = `${groupId}-${slugify(eraData.name)}`;

    const era = await prisma.era.upsert({
      where: { id },
      update: { ...eraData, groupId },
      create: {
        id: id,
        ...eraData,
        groupId,
      },
    });

    createdEras.push(era);
    progressTracker.increment();
  }

  progressTracker.complete();
  logger.success(`   ✓ Era seeded: ${createdEras.length} eras`);
  return createdEras;
}
