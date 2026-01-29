// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202508: EventInput[] = [
  // ==========================================
  // AUGUST 2025
  // ==========================================
  {
    date: "2025-08-04",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 료 생일",
    description: "Happy RYO Day💛",
    participants: {
      type: "ONLY",
      memberNames: ["료"],
    },
  },
  {
    date: "2025-08-09",
    time: "17:00",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in TOKYO (Day 1)",
    location: "도쿄 돔",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-08-10",
    time: "15:00",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in TOKYO (Day 2)",
    location: "도쿄 돔",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-08-12",
    time: "18:00",
    type: EventType.RELEASE,
    title: "[Pre-Release] 'Surf' 선공개",
    albumTitle: "COLOR",
    description: "'Surf' 음원 및 MV 선공개",
  },
  {
    date: "2025-08-12",
    time: "18:20",
    type: EventType.EVENT,
    title: "[Event] 멜론뮤직 MUSIC WAVE 채팅 이벤트",
    albumTitle: "COLOR",
  },
  {
    date: "2025-08-14",
    time: "18:00",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "엠카운트다운",
      isPerformance: true,
      performedTrack: "Surf",
    },
  },
  {
    date: "2025-08-14",
    time: "18:00",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운 스페셜 MC - 시온",
    country: "KR",
    albumTitle: "COLOR",
    participants: {
      type: "ONLY",
      memberNames: ["시온"],
    },
    appearance: {
      programName: "엠카운트다운",
      isPerformance: true,
      performedTrack: "Surf",
      role: "스페셜 MC",
    },
  },
  {
    date: "2025-08-16",
    time: "15:15",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Surf",
    },
  },
  {
    date: "2025-08-16",
    time: "19:00",
    type: EventType.FESTIVAL,
    title: "[Festival] 캐리비안 베이 워터 뮤직 풀파티",
    location: "에버랜드 캐리비안 베이 야외 파도풀 특설무대",
    country: "KR",
    city: "용인 (Yongin)",
  },
  {
    date: "2025-08-17",
    time: "15:20",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Surf",
    },
  },
  {
    date: "2025-08-21",
    time: "18:30",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2025 케이 월드 드림 어워즈 (K-WORLD DREAM AWARDS)",
    location: "잠실실내체육관",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2025-08-23",
    time: "18:00",
    type: EventType.AWARD_SHOW,
    title:
      "[Awards] 2025 텐센트 뮤직 엔터테인먼트 어워즈 (2025 TMElive International Music Awards; TMEA)",
    location: "갤럭시 아레나 (Galaxy Arena)",
    country: "MO",
    city: "마카오 (Macao)",
  },
  {
    date: "2025-08-26",
    time: "00:00",
    type: EventType.RELEASE,
    title: "[Pre-Release] 'Baby Blue' MV 선공개",
    albumTitle: "COLOR",
  },
  {
    date: "2025-08-31",
    time: "13:00",
    type: EventType.FESTIVAL,
    title: "[Festival] a-nation 2025",
    location: "아지노모토 스타디움",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "a-nation",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://a-nation.net/en/news/detail.php?id=1127452",
        label: "라인업 공지",
      },
    ],
  },
  {
    date: "2025-08-31",
    time: "18:05",
    type: EventType.VARIETY_SHOW,
    title: "[MBC] 복면가왕",
    country: "KR",
    participants: {
      type: "ONLY",
      memberNames: ["재희"],
    },
  },

  // ==========================================
  // 화보 및 매거진 (2025)
  // ==========================================
  {
    date: "2025-08-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] DICON VOLUME N°25",
    description: "DICON VOLUME N°25 화보",
  },
  {
    date: "2025-08-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 데이즈드 코리아 8월호 (커버)",
    description: "데이즈드 코리아 8월호 커버 및 화보",
  },
];
