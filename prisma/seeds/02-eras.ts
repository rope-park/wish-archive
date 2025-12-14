// prisma/seeds/02-eras.ts
import type { PrismaClient } from '@prisma/client'
import { logger, slugify, ProgressTracker } from './utils'

/**
 * Era/활동 시기 시드
 */
// TODO: 실제 이미지 경로 업데이트 필요
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
      backgroundUrl: null,
      iconUrl: '/icons/folders/folder_predebut.png',
      logoUrl: null,
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
- 초동 판매량 45만 장
- Circle Album Chart 1위
- 한국어/일본어 2개 버전 동시 발매`,
      isCurrent: false,
      themeColor: '#BFFF00', 
      backgroundUrl: null,
      iconUrl: '/icons/folders/folder_wish.png',
      logoUrl: null,
    },
    {
      name: 'Songbird',
      title: 'Songbird: Let\'s ride',
      startDate: new Date('2024-06-25'),
      endDate: new Date('2024-09-23'),
      description: `청량하고 시원한 여름 분위기의 2nd 싱글 활동 시기. 일본 시장을 겨냥한 곡으로 신나는 비트와 상쾌한 멜로디가 특징이다.

주요 성과:
- 초동 판매량 53만 장 (2024년 데뷔 아티스트 중 최고 기록)
- Oricon Weekly Singles Chart 2위
- RIAJ Gold 인증`,
      isCurrent: false,
      themeColor: '#8EE3F5', 
      backgroundUrl: null,
      iconUrl: '/icons/folders/folder_songbird.png',
      logoUrl: null,
    },
    {
      name: 'Steady',
      title: 'Steady: Let\'s go Steady',
      startDate: new Date('2024-09-24'),
      endDate: new Date('2024-11-26'),
      description: `첫 미니앨범 활동 시기. "꾸준함(Steady)"이라는 메시지를 담아 다양한 장르를 소화하며 음악적 스펙트럼을 확장했다.

선공개 곡 "Dunk Shot"부터 타이틀 "Steady", 그리고 "3분까진 필요없어", "Supercute" 등 개성 있는 수록곡들로 구성되어 있다.

주요 성과:
- 선주문 80만 장 돌파
- Music Bank 1위 (10월 4일 = 1004 = 천사)
- 데뷔 후 첫 지상파 음악방송 1위
- Circle Album Chart 1위
- KMCA Double Platinum 인증`,
      isCurrent: false,
      themeColor: '#FFB6D9', 
      backgroundUrl: null,
      iconUrl: '/icons/folders/folder_steady.png',
      logoUrl: null,
    },
    {
      name: 'WISHFUL',
      title: 'WISHFUL: Wishes come true',
      startDate: new Date('2024-11-27'),
      endDate: new Date('2025-04-13'),
      description: `일본 첫 정규 앨범 활동 시기. 크리스마스 시즌에 맞춰 발매된 앨범으로, 팝 발라드 타이틀곡 "Wishful Winter"를 포함해 신곡 6곡과 기존 곡들의 일본어 버전으로 구성되어 NCT WISH의 모든 매력을 집대성했다.

음원은 11월 27일 공개, 피지컬은 12월 25일 크리스마스에 발매되었다.

특징:
- 13곡 수록의 풍성한 구성
- 일본 시장 공략을 위한 전략적 발매
- 겨울 감성의 따뜻한 사운드`,
      isCurrent: false,
      themeColor: '#FFF89A',
      backgroundUrl: null,
      iconUrl: '/icons/folders/folder_wishful.png',
      logoUrl: null,
    },
    {
      name: 'poppop',
      title: 'poppop: Feeling go pop',
      startDate: new Date('2025-04-14'),
      endDate: new Date('2025-08-31'),
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
      backgroundUrl: null,
      iconUrl: null,
      logoUrl: null,
    },
    {
      name: 'COLOR',
      title: 'Color: Bring out the color',
      startDate: new Date('2025-09-01'),
      endDate: null, 
      description:  `다채로운 색깔과 개성을 담은 3rd 미니앨범 활동 시기 (현재 진행 중).

선공개곡 "Surf", 뮤직비디오 선공개곡 "Baby Blue", 타이틀곡 "COLOR"까지 총 3편의 뮤직비디오가 공개되었다. 

비디오 게임을 테마로 한 수록곡 "Cheat Code"는 리그 오브 레전드 레퍼런스("Ninjas hide on bush")로 화제가 되었다.

특별 활동:
- COEX 광장 공연형 쇼케이스 WISH ON STAGE 개최
- 3곡 뮤직비디오 공개 (Surf, Baby Blue, COLOR)
- 게임/컬러풀한 콘셉트`,
      isCurrent: true, // 현재 진행 중
      themeColor: '#FDF628', 
      backgroundUrl: null,
      iconUrl: null,
      logoUrl: null,
    },
  ]

  const createdEras = []
  const progressTracker = new ProgressTracker('Eras Seeding', eras.length)

  for (const eraData of eras) {
    const id = `${groupId}-${slugify(eraData.name)}`;

    const era = await prisma.era.upsert({
      where: { id: id },
      update: eraData,
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
