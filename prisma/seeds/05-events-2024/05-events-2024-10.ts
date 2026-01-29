// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202410: EventInput[] = [
  // =================================
  // OCTOBER 2024
  // =================================
  {
    date: "2024-10-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 3분까진 필요 없는 WISH 라면 가게 EP.2",
    appearance: {
      programName: "3분까진 필요 없는 WISH 라면 가게",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "우리 라면 가게🍜 이대로 가면 돼 ᜊ( ' ⩊ '𖦹) | 僕らのラーメン屋さん🍥このまま行けばいい🕰️ | 3분까진 필요없는 WISH 라면가게 EP.2",
        url: "https://youtu.be/1paiksZ7pUM?si=xw0ymskK5-mTRQJ0",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-10-03",
    time: "19:00",
    type: EventType.FESTIVAL,
    title: "[Festival] 2024 K-뮤직 시즌 : 굿밤 콘서트 - 부산",
    location: "해운대 해수욕장",
    country: "KR",
    city: "부산 (Busan)",
    description:
      '2024 K-뮤직 시즌의 일환으로 부산에서 개최되는 "굿밤 콘서트". 한국 대표 아티스트들과 K-POP 신인들이 모이는 대규모 음악 축제. Steady 신곡으로 부산 팬들을 만남.',
  },
  {
    date: "2024-10-04",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크 (Music Bank) 1위",
    description: "🏆 데뷔 후 첫 지상파 음악방송 1위 (1004 = 천사데이).",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "Steady",
    },
    linkedContents: [
      {
        title: "Steady - NCT WISH  [뮤직뱅크/Music Bank] | KBS 241004 방송",
        url: "https://www.youtube.com/watch?v=lnhn7zdmj8E",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "[4K] 엔시티 위시 'Steady' 뮤직뱅크 1위 앵콜직캠(NCT WISH Encore Facecam) @뮤직뱅크(Music Bank) 241004",
        url: "https://www.youtube.com/watch?v=ZDmG_jZbs-g",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "[얼빡직캠 4K] 엔시티 위시 사쿠야 'Steady'(NCT WISH SAKUYA Facecam) @뮤직뱅크(Music Bank) 241004",
        url: "https://www.youtube.com/watch?v=MoJZQrNIV8c",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야"],
      },
      {
        title:
          "[얼빡직캠 4K] 엔시티 위시 료 'Steady'(NCT WISH RYO Facecam) @뮤직뱅크(Music Bank) 241004",
        url: "https://www.youtube.com/watch?v=9lLgTPg-L6c",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
        cast: ["료"],
      },
      {
        title:
          "[K-Fancam] 엔시티 위시 시온 직캠 'Steady'(NCT WISH SION Fancam) @뮤직뱅크(Music Bank) 241004",
        url: "https://www.youtube.com/watch?v=5CSX_KJqYzc",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
    ],
    musicShowResult: {
      rank: 1,
      score: 5820,
      note: "데뷔 후 첫 지상파 1위 (1004 = 천사데이) 👼",
    },
  },
  {
    date: "2024-10-04",
    time: "21:20",
    type: EventType.VARIETY_SHOW,
    title: "[KBS] 슈퍼맨이 돌아왔다",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠"],
    },
  },
  {
    date: "2024-10-05",
    time: "18:00",
    type: EventType.FESTIVAL,
    title: "[Festival] 2024 K-Link Festival",
    location: "인스파이어 아레나",
    city: "인천 (Incheon)",
    country: "KR",
    linkedContents: [
      {
        title:
          "241005 NCT WISH - Dunk Shot 엔시티 위시 유우시 직캠 YUSHI FANCAM @ K-Link Festival",
        url: "https://www.youtube.com/watch?v=EtF5_pQuVO8",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title:
          "241005 NCT WISH 엔시티 위시 'Dunk Shot' 유우시 직캠 YUSHI FANCAM｜K-Link Festival",
        url: "https://www.youtube.com/watch?v=HD6m4BgzW0k",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title:
          "[4K] 241005 NCT WISH - Songbird (Korean Ver.) YUSHI FOCUS @K-Link Festival",
        url: "https://www.youtube.com/watch?v=BL6CkNomodg",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title: "241005 K-LINK FESTIVAL NCT WISH - DUNK SHOT",
        url: "https://www.youtube.com/watch?v=XOnoNWRJO1w",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, Songbird | 2024 K-Link Festival",
        url: "https://www.youtube.com/watch?v=DMsR_qY7BQs",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, WISH | 2024 K-Link Festival",
        url: "https://www.youtube.com/watch?v=CKQVcB57EQQ",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, Dunk Shot | 2024 K-Link Festival",
        url: "https://www.youtube.com/watch?v=BvAJnKdoo4o",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, Steady | 2024 K-Link Festival",
        url: "https://www.youtube.com/watch?v=ycQtlhJ6S1E",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-10-11",
    time: "21:20",
    type: EventType.VARIETY_SHOW,
    title: "[KBS] 슈퍼맨이 돌아왔다",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠"],
    },
  },
  {
    date: "2024-10-12",
    time: "18:00",
    type: EventType.FESTIVAL,
    title: "[SBS] 2024 SBS 인기가요 LIVE IN JAPAN TOKYO",
    location: "사이타마 슈퍼 아레나",
    country: "JP",
    city: "사이타마 (Saitama)",
  },
  {
    date: "2024-10-15",
    time: "12:00",
    type: EventType.RELEASE,
    title: "[OST] 포켓몬스터: 테라스탈 데뷔 OST 'Make You Shine' 음원 공개",
    country: "KR",
  },
  {
    date: "2024-10-19",
    time: "16:30",
    type: EventType.FESTIVAL,
    title: "[Festival] 제30회 드림콘서트",
    location: "고양종합운동장",
    country: "KR",
    city: "고양 (Goyang)",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-10-22",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 리쿠 건강상 이유로 인한 활동 일시 중단",
  },

  // ==========================================
  // 화보 및 매거진 (2024)
  // ==========================================
  {
    date: "2024-10-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 얼루어 10월호",
    description: "얼루어 10월호 화보",
  },
];
