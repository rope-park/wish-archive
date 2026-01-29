// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202407: EventInput[] = [
  // =================================
  // JULY 2024
  // =================================
  {
    date: "2024-07-01",
    type: EventType.RELEASE,
    title: "[Album] 2nd Single Album 《Songbird》발매",
    country: "KR",
    albumTitle: "Songbird",
    milestone: true,
    relatedUrl: "https://nct-jp.net/discography/detail.php?id=1020436",
    linkedContents: [
      {
        title: "NCT WISH 'Songbird (Korean Ver.)' MV",
        url: "https://youtu.be/m9o0L7cOskc",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-04",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish★ EP.2",
    appearance: {
      programName: "WISH's Wish",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "저녁도 만들고🍳 게임도 해요🎯 | 晩御飯を作って🍴ゲームもしましょう❣️ | WISH’s Wish★ EP. 2",
        url: "https://youtu.be/wbKJXSJh908?si=g-UDQXNlmzsLqUu7",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish★ EP.3",
    appearance: {
      programName: "WISH's Wish",
      episode: "3화",
    },
    linkedContents: [
      {
        title:
          "우리의 첫 파자마 토크와🛌💤 물놀이까지〰🏖 | 僕たちの初めてのパジャマトークと😪水遊び🤿 | WISH’s Wish★ EP. 3",
        url: "https://youtu.be/tPK0ApAh9IU?si=xADL-IBykHN75sEC",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-01",
    type: EventType.ONLINE_CONTENT,
    title: "[Live] Songbird Countdown Live",
    description: "앨범 발매 기념 유튜브/위버스 라이브.",
    albumTitle: "Songbird",
    linkedContents: [
      {
        title: "Wishfull Day Replay",
        url: "https://weverse.io/nctwish/live/4-168365739", // [확인 필요]
        type: ContentType.LIVE_STREAM,
        platform: Platform.WEVERSE,
      },
      {
        title: "Wishfull Day Replay",
        url: "https://youtu.be/dummy_countdown_live", // [확인 필요]
        type: ContentType.LIVE_STREAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-01",
    type: EventType.VARIETY_SHOW,
    title: "[Fuji TV] K-POP HOUSE",
    country: "JP",
    description:
      '후지TV "K-POP HOUSE" 방송 출연. K-POP 아이돌 게스트를 초대해 토크와 퍼포먼스를 진행하는 프로그램. 멤버들의 친근한 일상 이야기와 "Songbird" 무대 공개.',
    appearance: {
      programName: "케이팝 하우스",
    },
  },
  {
    date: "2024-07-04",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    albumTitle: "Songbird",
    country: "KR",
    description:
      'Mnet "엠카운트다운" 851회 방송 출연 (오후 6시 생방송). Songbird 한국어 버전 첫 음악방송 무대. 신곡 공개 무대 및 멤버 인터뷰. 대국민 첫 선보임.',
    appearance: {
      programName: "엠카운트다운",
      episode: "EP.851",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    linkedContents: [
      {
        title:
          "'최초 공개' NCT WISH - Songbird (Korean Ver.) #엠카운트다운 EP.851 | Mnet 240704 방송",
        url: "https://www.youtube.com/watch?v=Y_V3wplzVZs",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-05",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    albumTitle: "Songbird",
    country: "KR",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Songbird",
    },
  },
  {
    date: "2024-07-06",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    albumTitle: "Songbird",
    country: "KR",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Songbird",
    },
  },
  {
    date: "2024-07-09",
    type: EventType.MUSIC_SHOW,
    title: "[SBS M] 더 쇼",
    albumTitle: "Songbird",
    country: "KR",
    appearance: {
      programName: "더 쇼",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    musicShowResult: {
      rank: 1,
      note: "Songbird 신곡 발매 후 첫 음악방송 1위",
    },
  },
  /* TODO: https://nct-jp.net/ko/schedule/detail.php?id=1107088 */
  {
    date: "2024-07-10",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    albumTitle: "Songbird",
    country: "KR",
    appearance: {
      programName: "엠카운트다운",
      episode: "EP.852",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    relatedUrl: "https://www.youtube.com/watch?v=JxCvV8LXkXs",
  },
  {
    date: "2024-07-12",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    albumTitle: "Songbird",
    country: "KR",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    linkedContents: [
      {
        title:
          "Songbird (Korean Ver.) - NCT WISH エヌシーティー ウィッシュ 엔시티위시 [Music Bank] | KBS WORLD TV 240712",
        url: "https://youtu.be/bMG3u-qYL6A",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-12",
    type: EventType.ANNOUNCEMENT,
    title:
      "[Announcement] NCT WISH “7/21 (일) 2024 SBS 가요대전 Summer 생방송” 참여 안내",
    description: "NCT WISH “2024 SBS 가요대전 Summer” 생방송 참여 관련 공지.",
    country: "KR",
    relatedUrl: "https://weverse.io/nctwish/notice/20987",
  },
  {
    date: "2024-07-14",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    albumTitle: "Songbird",
    country: "KR",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Songbird",
    },
  },
  {
    date: "2024-07-14",
    type: EventType.VARIETY_SHOW,
    title: "[KBS1] 열린음악회",
    albumTitle: "Songbird",
    country: "KR",
    appearance: {
      programName: "열린음악회",
      isPerformance: true,
      performedTrack: "Songbird",
    },
  },
  {
    date: "2024-07-16",
    type: EventType.VARIETY_SHOW,
    title: "SBS 파워FM <두시탈출 컬투쇼>",
    country: "KR",
    description: "특선 라이브 코너 게스트.",
  },
  {
    date: "2024-07-17",
    type: EventType.FESTIVAL,
    title: "Show! Music Core in JAPAN",
    description: "6월 말 일본 베루나 돔에서 녹화된 상반기 결산 특집 방송.",
    country: "KR", // 방송은 한국 채널
    linkedContents: [
      {
        title: "NCT WISH - Songbird (Korean Ver.) @Music Core in JAPAN",
        url: "https://youtu.be/dummy_music_core_japan",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-19",
    type: EventType.AWARD_SHOW,
    title:
      "[Awards] 텐센트 뮤직 엔터테인먼트 어워즈 2024 (Tencent Music Entertainment Awards 2024)",
    location: "갤럭시 아레나 (Macau Galaxy Arena)",
    country: "CN",
    city: "마카오 (Macau)",
    description:
      '마카오에서 개최되는 중국 최대 음악 시상식 "텐센트 뮤직 엔터테인먼트 어워즈 2024" 출연. Songbird 무대 공연 및 아시아 신인상 관련 무대 참여. K-POP의 중국 시장 영향력 증명.',
    relatedUrl: "https://www.sedaily.com/NewsView/2DBSVSIRAT",
    linkedContents: [
      {
        title:
          "[4K]240719 NCT WISH - Sail away(시온 focus cam) 2024 TMEA music festival",
        url: "https://www.youtube.com/watch?v=raVveOfkSog",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
    ],
  },
  {
    date: "2024-07-21",
    type: EventType.FESTIVAL,
    title: "[SBS] 2024 SBS 가요대전 Summer",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    description:
      "SBS 가요대전 하계 특집 공연 및 시상식. 오후 3시 레드 카펫 부터 오후 6시 30분 생방송 개시.",
    relatedUrl: "https://weverse.io/nctwish/notice/20987?hl=ko",
  },
  {
    date: "2024-07-21",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Missing Bird in Cupid Museum Behind the Scenes",
    linkedContents: [
      {
        title:
          "어서 와💗 너 내 후배로 들어올래?👀 | おいでよ👼僕の後輩になる？💕 | Missing Bird in Cupid Museum Behind the Scenes",
        url: "https://youtu.be/z6KoLIER_I8?si=wAI2nKord_zxDqvc",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-22",
    type: EventType.FESTIVAL,
    title: "[Festival] 오다이바 보켄왕 2024 (Odaiba Bouken-ou 2024)",
    location: "오다이바 공연장",
    country: "JP",
    city: "도쿄 (Tokyo)",
    description:
      '도쿄 오다이바에서 개최되는 여름 축제 "보켄왕 2024" 뮤직 스테이지 출연. Songbird 신곡 무대 공연.',
  },
  {
    date: "2024-07-22",
    type: EventType.RADIO,
    title: "[FM NACK5] ALL The Feels",
    country: "JP",
    description: '일본 라디오 "ALL The Feels" 출연.',
    appearance: {
      programName: "올 더 필즈",
    },
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "유우시", "재희"],
    },
    relatedUrl: "https://www.nack5.co.jp/blog/allthefeels/14683",
  },
  {
    date: "2024-07-23",
    type: EventType.RADIO,
    title: "[FM NACK5] ALL The Feels",
    country: "JP",
    description: '일본 라디오 "ALL The Feels" 출연.',
    appearance: {
      programName: "올 더 필즈",
    },
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "유우시", "재희"],
    },
    relatedUrl: "https://www.nack5.co.jp/blog/allthefeels/14683",
  },
  {
    date: "2024-07-24",
    type: EventType.RADIO,
    title: "[FM NACK5] ALL The Feels",
    country: "JP",
    description: '일본 라디오 "ALL The Feels" 출연.',
    appearance: {
      programName: "올 더 필즈",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "료", "사쿠야"],
    },
    relatedUrl: "https://www.nack5.co.jp/blog/allthefeels/14683",
  },
  {
    date: "2024-07-25",
    type: EventType.RADIO,
    title: "[FM NACK5] ALL The Feels",
    country: "JP",
    description: '일본 라디오 "ALL The Feels" 출연.',
    appearance: {
      programName: "올 더 필즈",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "료", "사쿠야"],
    },
    relatedUrl: "https://www.nack5.co.jp/blog/allthefeels/14683",
  },
  {
    date: "2024-07-24",
    type: EventType.RADIO,
    title: "[M-ON!-TV] NCT WISH Special",
    country: "JP",
    description: '일본 뮤직 채널 "M-ON!-TV NCT WISH Special" 특집 방송 출연.',
    appearance: {
      programName: "M-ON!-TV NCT WISH Special",
      isPerformance: true,
      performedTrack: "Songbird",
      role: "특집 출연",
    },
  },
  {
    date: "2024-07-29",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 팬사인회 이벤트 - 메이크스타",
    description: "발매 기념 대면 팬사인회 진행",
  },
  {
    date: "2024-07-29",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 VIDEO CALL EVENT - 이즈위",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2024-07-30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 VIDEO CALL EVENT - 인터아시아",
    description: "발매 기념 화상 팬사인회 진행",
  },

  // ==========================================
  // 화보 및 매거진 (2024)
  // ==========================================
  {
    date: "2024-07-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 나일론 7월호 (커버)",
    description: "나일론 7월호 커버 및 화보",
  },
  {
    date: "2024-07-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 엘르 7월호 (커버)",
    description: "엘르 7월호 커버 및 화보",
  },
];
