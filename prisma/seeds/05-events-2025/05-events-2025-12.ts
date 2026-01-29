// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202512: EventInput[] = [
  // ==========================================
  // DECEMBER 2025
  // ==========================================
  {
    date: "2025-12-10",
    time: "20:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 애플뮤직",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-12-11",
    time: "12:00",
    type: EventType.RELEASE,
    title:
      "[OST] 프린세스 캐치! 티니핑 : 프린스핑송 OST '프린스핑송' 음원 공개",
    country: "KR",
  },
  {
    date: "2025-12-14",
    time: "17:00",
    type: EventType.FESTIVAL,
    title: "2025 뮤직뱅크 글로벌 페스티벌 in JAPAN",
    location: "도쿄 국립경기장",
    country: "JP",
    city: "도쿄 (Tokyo)",
  },
  {
    date: "2025-12-18",
    time: "18:30",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in FUKUOKA (Day 1)',
    location: "후쿠오카 선 팰리스",
    country: "JP",
    city: "후쿠오카 (Fukuoka)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-12-19",
    time: "18:30",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in FUKUOKA (Day 2)',
    location: "후쿠오카 선 팰리스",
    country: "JP",
    city: "후쿠오카 (Fukuoka)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-12-20",
    time: "17:00",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2025 멜론 뮤직 어워드 (Melon Music Awards; MMA)",
    location: "고척 스카이돔",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2025-12-21",
    time: "17:30",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in AICHI (Day 1)',
    location: "아이치현 예술 극장 (Aichi Prefectural Art Theater)",
    country: "JP",
    city: "아이치 (Aichi)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-12-22",
    time: "18:30",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in AICHI (Day 2)',
    location: "아이치현 예술 극장 (Aichi Prefectural Art Theater)",
    country: "JP",
    city: "아이치 (Aichi)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-12-23",
    time: "18:30",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in AICHI (Day 3)',
    location: "아이치현 예술 극장 (Aichi Prefectural Art Theater)",
    country: "JP",
    city: "아이치 (Aichi)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-12-25",
    time: "16:50",
    type: EventType.FESTIVAL,
    title: "[SBS] 2025 SBS 가요대전: Golden Loop",
    country: "KR",
    location: "인스파이어 아레나",
    city: "인천 (Incheon)",
  },
  {
    date: "2025-12-27",
    time: "16:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 예스24",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-12-31",
    time: "20:50",
    type: EventType.AWARD_SHOW,
    title: "[SBS] 2025 SBS 연기대상",
    country: "KR",
    location: "상암 SBS 프리즘타워",
    city: "서울 (Seoul)",
    appearance: {
      programName: "2025 SBS 연기대상",
      role: "1부 축하공연",
    },
  },
  {
    date: "2025-12-31",
    time: "20:50",
    type: EventType.FESTIVAL,
    title: "[MBC] 2025 MBC 가요대제전: 멋",
    country: "KR",
    location: "MBC 일산 드림센터 D6 스튜디오",
    city: "고양 (Goyang)",
  },
];
