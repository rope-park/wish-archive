// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202505: EventInput[] = [
  // ==========================================
  // MAY 2025
  // ==========================================
  {
    date: "2025-05-01",
    time: "18:00",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    description: "4/24 녹화분",
    country: "KR",
    albumTitle: "poppop",
    appearance: {
      programName: "엠카운트다운",
    },
  },
  {
    date: "2025-05-02",
    time: "17:05",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    description: "4/25 녹화분",
    country: "KR",
    albumTitle: "poppop",
    appearance: {
      programName: "뮤직뱅크",
    },
  },
  {
    date: "2025-05-02",
    time: "21:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in HONG KONG (Day 1)",
    location: "AsiaWorld-Expo ARENA, Hall 10",
    country: "HK",
    city: "홍콩 (Hong Kong)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-05-03",
    time: "20:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in HONG KONG (Day 2)",
    location: "AsiaWorld-Expo ARENA, Hall 10",
    country: "HK",
    city: "홍콩 (Hong Kong)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-05-04",
    time: "15:20",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    description: "4/20 녹화분",
    country: "KR",
    albumTitle: "poppop",
    appearance: {
      programName: "인기가요",
    },
  },
  {
    date: "2025-05-05",
    time: "15:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 사인회 - 비트로드",
    description: "발매 기념 대면 팬사인회 진행",
  },
  {
    date: "2025-05-06",
    time: "15:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 VIDEO CALL EVENT - 점프업이엔티",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-05-10",
    time: "11:00",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in MEXICO CITY",
    description: "SM 30주년 기념 글로벌 콘서트 멕시코 공연",
    location: "에스타디오 GNP 세구로스 (Estadio GNP Seguros)",
    country: "MX",
    city: "멕시코시티 (Mexico City)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-05-11",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 시온 생일",
    description: "Happy SION Day💜",
    participants: {
      type: "ONLY",
      memberNames: ["시온"],
    },
  },
  {
    date: "2025-05-14",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 VIDEO CALL EVENT - 뮤브",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-05-15",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 VIDEO CALL EVENT - 메이크스타",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-05-17",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in SINGAPORE",
    location: "아레나 @ 엑스포 (ARENA @ EXPO)",
    country: "SG",
    city: "싱가포르 (Singapore)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-05-19",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'popppop' 발매 기념 VIDEO CALL EVENT - 헬로라이브",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-05-22",
    type: EventType.FESTIVAL,
    title: '[Festival] 2025 숭실대학교 동아리 봄축제 "위량제"',
    location: "숭실대학교",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2025-05-24",
    time: "19:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in TAIPEI",
    location: "타이베이 뮤직 센터 (Taipei Music Center)",
    country: "TW",
    city: "타이베이 (Taipei)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://tmc.taipei/events",
        label: "공연장 정보",
      },
    ],
  },
  {
    date: "2025-05-28",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 아시아 스타 엔터테이너 어워즈 2025 (ASEA 2025)",
    location: "K-아레나 요코하마 (K-Arena Yokohama)",
    country: "JP",
    city: "요코하마 (Yokohama)",
  },
  {
    date: "2025-05-31",
    time: "17:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in JAKARTA",
    location: "테니스 인도어 스니얀 (Tenis Indoor Senayan)",
    country: "ID",
    city: "자카르타 (Jakarta)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },

  // ==========================================
  // 화보 및 매거진 (2025)
  // ==========================================
  {
    date: "2025-05-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 아레나 옴므 플러스 5월호",
    description: "아레나 옴므 플러스 5월호 화보",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠", "유우시"],
    },
  },

  // ==========================================
  // 팝업 스토어 (2025)
  // ==========================================
  {
    date: "2025-05-15",
    startDate: "2025-05-15",
    endDate: "2025-06-01",
    type: EventType.POPUP_STORE,
    title: "[Pop-up] ONE SUMMER WISH",
    description: "ONE SUMMER WISH 팝업 스토어",
    location: "꼴라보하우스 한남(Ccollabohaus Hannam)",
    country: "KR",
    city: "서울 (Seoul)",
  },
];
