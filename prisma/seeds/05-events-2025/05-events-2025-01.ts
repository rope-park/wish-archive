// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202501: EventInput[] = [
  // ==========================================
  // JANUARY 2025
  // ==========================================
  {
    date: "2025-01-05",
    time: "18:00",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 제39회 골든디스크 어워즈",
    location: "미즈호 PayPay 돔 후쿠오카",
    country: "JP",
    city: "후쿠오카 (Fukuoka)",
    appearance: {
      programName: "Golden Disc Awards",
      episode: "39회",
      isPerformance: true,
      performedTrack: "Steady", // 수정 필요
      role: "수상자",
    },
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
    musicShowResult: {
      rank: 1,
      score: 0,
      note: "Rookie Artist of the Year (신인상) 수상 🏆",
    },
    linkedContents: [
      {
        title:
          "[Golden Disk] 엔시티 위시 (NCT WISH)｜The 39th Golden Disc Awards",
        url: "https://www.youtube.com/watch?v=5raMZkv_gXE",
        type: ContentType.INTERVIEW,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-01-11",
    time: "17:00",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in SEOUL : SMCU PALACE (Day 1)",
    description: "SM 30주년 기념 콘서트 (Day 1)",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
    location: "고척 스카이돔",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-01-12",
    time: "17:00",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in SEOUL : SMCU PALACE (Day 2)",
    description: "SM 30주년 기념 콘서트 (Day 2)",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
    location: "고척 스카이돔",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-01-22",
    time: "18:00",
    type: EventType.RELEASE,
    title: "[Album] 선공개 싱글 《Miracle》 음원 공개",
    country: "KR",
    albumTitle: "Miracle",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2025-01-22",
    time: "18:30",
    type: EventType.EVENT,
    title: "[Event] 멜론뮤직 MUSIC WAVE 채팅 이벤트",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2025-01-23",
    time: "18:00",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    country: "KR",
    albumTitle: "Miracle",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
    appearance: {
      programName: "엠카운트다운",
      isPerformance: true,
      performedTrack: "Miracle",
    },
  },
  {
    date: "2025-01-24",
    time: "17:05",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    country: "KR",
    albumTitle: "Miracle",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "Miracle",
    },
  },
  {
    date: "2025-01-25",
    time: "15:15",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    country: "KR",
    albumTitle: "Miracle",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Miracle",
    },
  },
  {
    date: "2025-01-25",
    time: "18:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISHFUL' 발매 기념 VIDEO CALL EVENT - 위드뮤",
    description: "발매 기념 화상 팬사인회 진행",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2025-01-25",
    time: "20:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISHFUL' 발매 기념 VIDEO CALL EVENT - 애플뮤직",
    description: "발매 기념 화상 팬사인회 진행",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2025-01-26",
    time: "15:20",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    country: "KR",
    albumTitle: "Miracle",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Miracle",
    },
  },
  {
    date: "2025-01-26",
    time: "15:20",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요 스페셜 MC - 시온",
    country: "KR",
    albumTitle: "Miracle",
    participants: {
      type: "ONLY",
      memberNames: ["시온"],
    },
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Miracle",
      role: "스페셜 MC",
    },
  },
  {
    date: "2025-01-29",
    time: "17:25",
    type: EventType.FESTIVAL,
    title: "[Festival] 2024 MBC 가요대제전: WANNABE",
    description: "2024/12/31 녹화분",
    location:
      "MBC 일산 드림센터 D6 스튜디오 / 글로벌미디어센터 방송센터 A스튜디오",
    country: "KR",
    city: "고양 (Goyang)",
    appearance: {
      programName: "가요대제전",
      isPerformance: true,
    },
  },
];
