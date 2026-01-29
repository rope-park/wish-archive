// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202409: EventInput[] = [
  // =================================
  // SEPTEMBER 2024
  // =================================
  /* TODO: https://nct-jp.net/ko/schedule/detail.php?id=1108143 */
  {
    date: "2024-09-01",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] TMEA 2024 Behind",
    linkedContents: [
      {
        title:
          "마카오에서의✈️ 떨리는 첫 무대❕(feat. 에그타르트, 훠궈 먹방) | マカオで緊張の初ステージ 💗 (feat. エッグタルト、火鍋モッパン🥢) | TMEA 2024 Behind",
        url: "https://youtu.be/svpE2joFVR8?si=W0wKs6ueTbA5QF0C",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-01",
    time: "12:30",
    type: EventType.FESTIVAL,
    title: "[Festival] a-nation 2024 in TOKYO (Day 1)",
    location: "아지노모토 스타디움",
    country: "JP",
    city: "도쿄 (Tokyo)",
  },
  {
    date: "2024-09-23",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 3분까진 필요 없는 WISH 라면 가게 EP.1",
    appearance: {
      programName: "3분까진 필요 없는 WISH 라면 가게",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "라면을 탱탱하게 끓여보자⸝⸝ʚ̴̶̷̆ˬʚ̴̶̷̆⸝⸝🌟 | ラーメンをぷりぷりに作ってみよう🍜 | 3분까진 필요 없는 WISH 라면 가게 EP.1",
        url: "https://youtu.be/NqQUpr2rpyg?si=PVBBeg1wFpsVWUYM",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-02",
    type: EventType.RELEASE,
    title: "[Pre-order] Steady 앨범 예약 판매",
    description:
      '첫 정규 미니앨범 "Steady"의 공식 예약 판매 시작 (9월 2일 온/오프라인 동시). 사전 주문 현황: 이틀 만에 100,000장, 최종 800,000장 돌파 (자체 최고 기록).',
    country: "KR",
    albumTitle: "Steady",
    relatedUrl: "https://weverse.io/nctwish/notice",
  },
  {
    date: "2024-09-07",
    type: EventType.FESTIVAL,
    title: "[Festival] Star Nest Music Festival 2024",
    location: "AXA x WONDERLAND",
    country: "HK",
    city: "홍콩 (Hong Kong)",
  },
  {
    date: "2024-09-08",
    type: EventType.RELEASE,
    title: "'Dunk Shot' MV Teaser",
    description: "첫 번째 선공개곡 덩크슛 뮤직비디오 티저.",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "Dunk Shot MV Teaser",
        url: "https://youtu.be/dummy_dunkshot_teaser",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-08",
    type: EventType.FESTIVAL,
    title: "[Awards] 2024 더팩트 뮤직 어워즈 (The Fact Music Awards)",
    location: "교세라 돔 오사카 (Kyocera Dome Osaka)",
    country: "JP",
    city: "오사카 (Osaka)",
  },
  {
    date: "2024-09-09",
    type: EventType.RELEASE,
    title: "[Pre-release] 'Dunk Shot' 음원/MV 선공개",
    description:
      '첫 미니앨범 선공개곡 "Dunk Shot" 발매. 농구 콘셉트의 청량한 퍼포먼스.',
    albumTitle: "Steady",
  },
  {
    date: "2024-09-16",
    type: EventType.RELEASE,
    title: "[Pre-release] '3분까진 필요 없어 (3 Minutes)' 선공개",
    description: "두 번째 선공개곡. 몽환적이고 키치한 매력의 곡.",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "NCT WISH '3분까진 필요 없어 (3 Minutes)' MV",
        url: "https://youtu.be/dummy_3minutes_mv",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-24",
    type: EventType.RELEASE,
    title: "[Album] The 1st Mini Album《Steady》발매",
    description:
      'NCT WISH의 첫 번째 미니앨범. 선주문 80만 장 돌파, 타이틀곡 "Steady" 포함 총 7곡 수록.',
    country: "KR",
    albumTitle: "Steady",
    relatedUrl: "https://nct-jp.net/discography/detail.php?id=1020584",
  },
  {
    date: "2024-09-26",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "엠카운트다운",
      isPerformance: true,
      performedTrack: "Steady",
    },
  },
  {
    date: "2024-09-27",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "Steady",
    },
  },
  {
    date: "2024-09-28",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Steady",
    },
  },
  {
    date: "2024-09-29",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Steady",
    },
  },
  {
    date: "2024-09-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] GQ KOREA Photoshoot Behind the Scenes",
    linkedContents: [
      {
        title:
          "내 빵 오디가쏘?!🍩💨 위시의 연기 도전🎥 | ぼくのパンどこいった?!🥐 WISHの演技チャレンジ✨ | GQ KOREA Photoshoot Behind",
        url: "https://youtu.be/Xbjjrggxt1g?si=VsnHt0Aob-gfH00o",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },

  // ==========================================
  // 화보 및 매거진 (2024)
  // ==========================================
  {
    date: "2024-09-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] non-no 9월호",
    description: "non-no 9월호 화보 (일본)",
    country: "JP",
  },

  // ==========================================
  // 팝업 스토어 (2024)
  // ==========================================
  {
    date: "2024-09-25",
    startDate: "2024-09-25",
    endDate: "2024-10-13",
    type: EventType.POPUP_STORE,
    title: "[Pop-up] LET'S GO STEADY",
    description: "LET'S GO STEADY 팝업 스토어",
    location: "서울시 성동구 왕십리로 63 언더스탠드 에비뉴",
    country: "KR",
    city: "서울 (Seoul)",
  },
];
