// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202506: EventInput[] = [
  // ==========================================
  // JUNE 2025
  // ==========================================
  {
    date: "2025-06-07",
    time: "20:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in BANGKOK",
    location: "썬더 돔 (Thunder Dome)",
    country: "TH",
    city: "방콕 (Bangkok)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-06-10",
    time: "19:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 사인회 - 뮤직아트",
    description: "발매 기념 대면 팬사인회 진행",
    country: "KR",
    city: "부산 (Busan)",
  },
  {
    date: "2025-06-11",
    time: "19:00",
    type: EventType.FESTIVAL,
    title: "[Festival] 2025 부산 원아시아 페스티벌",
    location: "벡스코 (BEXCO) 제1전시장",
    country: "KR",
    city: "부산 (Busan)",
  },
  {
    date: "2025-06-12",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 VIDEO CALL EVENT - 케이타운포유",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-06-15",
    type: EventType.FESTIVAL,
    title: "[Festival] 유튜브 펜페스트 코리아 2025",
    location: "KBS 아레나 (KBS Arena)",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2025-06-16",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 VIDEO CALL EVENT - 애플뮤직",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-06-21",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 재희 생일",
    description: "Happy JAEHEE Day💚",
    participants: {
      type: "ONLY",
      memberNames: ["재희"],
    },
  },
  {
    date: "2025-06-21",
    time: "18:30",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 제34회 서울가요대상 (Seoul Music Awards)",
    location: "인스파이어 아레나 (Inspire Arena)",
    country: "KR",
    city: "인천 (Incheon)",
  },
  {
    date: "2025-06-22",
    time: "14:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 사인회 - NY MUSIC",
    description: "발매 기념 대면 팬사인회 진행",
  },
  {
    date: "2025-06-28",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 리쿠 생일",
    description: "Happy RIKU Day❤️",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2025-06-28",
    time: "18:00 (현지 시각)",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in LONDON",
    location: "The O2 Arena",
    country: "GB",
    city: "런던 (London)",
    seriesName: "SMTOWN LIVE",
  },

  // ==========================================
  // 화보 및 매거진 (2025)
  // ==========================================
  {
    date: "2025-06-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 엘르맨 6월호 (ISSUE 17)",
    description: "엘르맨 6월호 화보",
  },
  {
    date: "2025-06-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 엘르걸 6월호",
    description: "엘르걸 6월호 화보",
  },

  // ==========================================
  // 팝업 스토어 (2025)
  // ==========================================
  {
    date: "2025-06-28",
    startDate: "2025-06-28",
    endDate: "2025-07-13",
    type: EventType.POPUP_STORE,
    title: "[Pop-up] ONE SUMMER WISH",
    description: "ONE SUMMER WISH 팝업 스토어",
    location: "LIGHT BOX STUDIO (ライトボックススタジオ)",
    country: "JP",
    city: "도쿄 (Tokyo)",
  },
];
