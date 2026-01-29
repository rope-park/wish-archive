// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202406: EventInput[] = [
  // =================================
  // JUNE 2024
  // =================================
  {
    date: "2024-06-01",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 부산 (Day 1)",
    description: "전국 팬미팅 투어 부산 공연 (14:00 / 19:00 2회).",
    location: "드림씨어터",
    country: "KR",
    city: "부산 (Busan)",
    seriesName: "NCT WISH : SCHOOL of WISH",
    linkedContents: [
      {
        title:
          "[4K] 240601 NCT WISH RIKU 리쿠 세일어웨이 직캠 | School of wish 부산 | 'Sail away' fan cam",
        url: "https://www.youtube.com/watch?v=tq0il2s1kHM",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
      {
        title:
          "240601 NCT WISH 속마음 토크 | SCHOOL of WISH in BUSAN #엔시티위시 부산 팬미팅 1회차 낮공 직캠 fanmeeting fancam 스쿨오브위시",
        url: "https://www.youtube.com/watch?v=2LJifPizms8",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "[4K] 240601 부산 팬미팅 NCT WISH 유우시(YUSHI) Sail away 세로 직캠 FAN CAM",
        url: "https://www.youtube.com/watch?v=IrCdXhrweq0",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
    ],
  },
  {
    date: "2024-06-04",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] NYLON JAPAN Photoshoot Behind",
    description: "첫 일본 매거진 촬영 비하인드",
    linkedContents: [
      {
        title:
          "기대 만땅🩵 첫 일본 매거진 촬영🤭 | 期待満タン🤍初の日本雑誌撮影📷 | NYLON JAPAN Photoshoot Behind",
        url: "https://youtu.be/G1-khyB06Xs?si=U-YsVItEkwh_KTQ7",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-08",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 전주 (Day 1)",
    description: "전국 팬미팅 투어 전주 공연 (14:00 / 19:00 2회).",
    location: "전북대학교 삼성문화회관",
    country: "KR",
    city: "전주 (Jeonju)",
    seriesName: "NCT WISH : SCHOOL of WISH",
    linkedContents: [
      {
        title:
          "[4K] 240608 NCT WISH - 누난 너무 예뻐 (Replay) 커버 시온 fan cam 직캠 (SION FOCUS) SCHOOL OF WISH 전주 팬미팅",
        url: "https://www.youtube.com/watch?v=UFl4Slj4gUg",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
      {
        title:
          "[4k] 240608 NCT wish - Sail Away 세일 어웨이 엔시티 위시 팬미팅 SCHOOL of WISH Jeonju 시온 sion focus fancam 가로캠 직캠",
        url: "https://www.youtube.com/watch?v=y-riNZNb7RU",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
      {
        title:
          "[4K] 240608 NCT WISH RIKU 리쿠 세일어웨이 직캠 | School of wish 전주 | 'Sail away' fan cam",
        url: "https://www.youtube.com/watch?v=2FyebAQ9e7o",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
    ],
  },
  {
    date: "2024-06-09",
    type: EventType.ONLINE_CONTENT,
    title:
      "[Behind] Rakuten GirlsAward 2024 & KCON JAPAN 2024 Behind the Scenes",
    linkedContents: [
      {
        title:
          "真心いっぱい💓バックステージ | 진심 가득💗 백스테이지 | Rakuten GirlsAward 2024 & KCON JAPAN 2024 Behind the Scenes",
        url: "https://youtu.be/XcMSfcDuwhE?si=Oasw8hQKHQ_Dp6Nx",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-15",
    type: EventType.MUSIC_SHOW,
    title: "[Fuji TV] MUSIC FAIR",
    country: "JP",
    appearance: {
      programName: "MUSIC FAIR",
      isPerformance: true,
      performedTrack: "WISH",
    },
  },
  {
    date: "2024-06-15",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 대구 (Day 1)",
    description: "전국 팬미팅 투어 대구 공연 (14:00 / 19:00 2회).",
    location: "수성아트피아 대극장",
    country: "KR",
    city: "대구 (Daegu)",
    seriesName: "NCT WISH : SCHOOL of WISH",

    linkedContents: [
      {
        title:
          "240615 대구 팬미팅 2회차 Sail Away 재희 직캠 NCT WISH - Sail away focus on JAEHEE",
        url: "https://www.youtube.com/watch?v=M_usfXhNEr4",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["재희"],
      },
      {
        title:
          "240615 NCT WISH Sail Away 재희 대영 직캠 엔시티위시 팬미팅 대구 1회차 I NCT WISH :SCHOOL of WISH (JAEHEE FANCAM)",
        url: "https://www.youtube.com/watch?v=I8pHNstuZgk",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["재희"],
      },
    ],
  },
  {
    date: "2024-06-21",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 재희 생일",
    description: "Happy JAEHEE Day💚",
    participants: {
      type: "ONLY",
      memberNames: ["재희"],
    },
  },
  {
    date: "2024-06-22",
    type: EventType.ONLINE_CONTENT,
    title: "[ELLE KOREA] NCT WISH 불쑥불쑥 튀어나온 TMI에 못 헤어남💙",
    linkedContents: [
      {
        title:
          "[sub] NCT WISH 불쑥불쑥 튀어나온 TMI에 못 헤어남💙  | ELLE KOREA",
        url: "https://www.youtube.com/watch?v=-IsSPayvRp4",
        type: ContentType.INTERVIEW,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  /* {
    title: "【CDTV】 NCT WISH⚡️好きなパン聞いてみたら回答自由すぎか",
    url: "https://www.youtube.com/watch?v=WpQy19wqhhk",
    type: ContentType.YOUTUBE,
    platform: Platform.YOUTUBE,
  },*/
  {
    date: "2024-06-22",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 청주 (Day 1)",
    description:
      "전국 팬미팅 투어 청주 공연 (14:00 / 19:00 2회). 국내 지방 투어 마지막 일정.",
    location: "CJB 미디어센터 에덴아트홀",
    country: "KR",
    city: "청주 (Cheongju)",
    seriesName: "NCT WISH : SCHOOL of WISH",

    linkedContents: [
      {
        title:
          "[4K] 240622 SCHOOL of WISH CHEONGJU RIKU FOCUS 리쿠 직캠 | NASA",
        url: "https://www.youtube.com/watch?v=TUqZLkjgyVA",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },

      {
        title:
          "[4K] 240622 NCT WISH : SCHOOL of WISH in CHEONGJU Sail Away 유우시 직캠 YUSHI FOCUS",
        url: "https://www.youtube.com/watch?v=b9GVB5KNGp4",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title:
          "[4K] 240622 Sail Away - 엔시티 위시 리쿠 직캠 | NCT WISH RIKU FOCUS | SCHOOL of WISH in 청주 2회차 | [FANCAM]",
        url: "https://www.youtube.com/watch?v=AWYcDDLiIyc",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
      {
        title:
          "[4K] 240622 NCT WISH SAIL AWAY 엔시티위시 세일어웨이 사쿠야 직캠 SAKUYA FOCUS @ SCOOL OF WISH 청주 팬미팅",
        url: "https://www.youtube.com/watch?v=rY8_sqF3-SQ",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야"],
      },
      {
        title:
          "[4K] 240622 NCT WISH(엔시티위시) - Sail Away 청주 낮공 / 재희 Focus",
        url: "https://www.youtube.com/watch?v=_ukZP_xJR6k",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["재희"],
      },
    ],
  },
  {
    date: "2024-06-22",
    type: EventType.MUSIC_SHOW,
    title: "[NTV] Buzz Rhythm 02",
    country: "JP",
    appearance: {
      programName: "버즈 리듬",
      isPerformance: true,
      performedTrack: "WISH",
    },
  },
  {
    date: "2024-06-24",
    type: EventType.MUSIC_SHOW,
    title: "[TBS] CDTV LIVE! LIVE!",
    country: "JP",
    description:
      'TBS "CDTV LIVE! LIVE!" 방송 출연. 일본 2nd 싱글 "Songbird" 첫 음악방송 무대. 일본 대표 음악방송 프로그램. 전국 방송.',
    appearance: {
      programName: "CDTV 라이브! 라이브!",
      isPerformance: true,
      performedTrack: "Songbird (Japanese Ver.)",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1106877",
    linkedContents: [
      {
        title: "NCT WISH - Songbird @ CDTV LIVE! LIVE!",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-24",
    type: EventType.VARIETY_SHOW,
    title: "[Fuji TV] K-POP HOUSE",
    country: "JP",
    description:
      '후지TV "K-POP HOUSE" 방송 출연. K-POP 아이돌 게스트를 초대해 토크와 퍼포먼스를 진행하는 프로그램. 멤버들의 친근한 일상 이야기와 "Songbird" 무대 공개.',
    appearance: {
      programName: "케이팝 하우스",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1106878",
    linkedContents: [
      {
        title: "NCT WISH - K-POP HOUSE 출연",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.VARIETY_CLIP,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-26",
    type: EventType.VARIETY_SHOW,
    title: "[NTV] 히루난데스! (ヒルナンデス!)",
    country: "JP",
    description:
      '니혼TV 대표 주간 토크쇼 "히루난데스!" 출연 (정오 11시 55분 ~ 오후 1시 50분). 일본에서 가장 오래되고 영향력 있는 낮 시간대 토크 프로그램. 6명의 멤버가 밝은 에너지를 전달하고, "Songbird" 신곡 소개. 한국 신인 그룹으로서 일본 대중에게 친근한 이미지 구축.',
    appearance: {
      programName: "히루난데스!",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "료", "사쿠야"],
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1107070",
  },
  {
    date: "2024-06-27",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish★ EP.1",
    appearance: {
      programName: "WISH's Wish",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "Lets Ride! 🚗 NCT WISH 첫 번째 여름 여행! 🍉 | Lets Ride! ☀️ NCT WISH 初めての夏旅行! 🐑 | WISH’s Wish★ EP. 1",
        url: "https://youtu.be/vB4E8QJwgh0?si=X_ZxbFShktYM8BBn",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-28",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 리쿠 생일",
    description: "Happy RIKU Day❤️",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-06-29",
    type: EventType.FESTIVAL,
    title: "[MBC] Show! Music Core in JAPAN (Day 1)",
    description: "MBC 쇼! 음악중심 상반기 결산 일본 특집 녹화. (방송은 7월)",
    location: "베루나 돔 (Belluna Dome)",
    country: "JP",
    city: "사이타마 (Saitama)",
    albumTitle: "Songbird",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Songbird (Korean Ver.)", // 한국어 버전 선공개 무대
    },
  },
  {
    date: "2024-06-29",
    type: EventType.MUSIC_SHOW,
    title: "[TV Tokyo] 초음파 (ウルトラサウンド / Ultrasound) 출연",
    country: "JP",
    description:
      '테레비 도쿄 "초음파" 방송 출연 (오전 11시~). 테레비 도쿄 대표 토요 음악 프로그램. "Songbird" 신곡 무대 공연 및 멤버 인터뷰. 전국 시청자들에게 신곡 선보이기.',
    appearance: {
      programName: "초음파",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1107047",
    linkedContents: [
      {
        title: "NCT WISH - Songbird @ Ultrasound",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-29",
    type: EventType.MUSIC_SHOW,
    title: "[NHK] Venue101",
    country: "JP",
    description:
      'NHK "Venue101" 생방송 출연 (토요일 밤 11시~11시 30분). NHK 대표 음악 프로그램으로, 최신 곡을 부르는 아티스트들의 생생한 무대. "Songbird" 신곡 공연 & 멤버 토크. 일본 공영방송 전국 네트워크 출연.',
    appearance: {
      programName: "Venue101",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1107049",

    linkedContents: [
      {
        title: "NCT WISH - Songbird @ NHK Venue101",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-30",
    type: EventType.FESTIVAL,
    title: "쇼! 음악중심 in JAPAN (Day 2)",
    location: "베루나 돔 (Belluna Dome)",
    country: "JP",
    city: "사이타마 (Saitama)",
  },
];
