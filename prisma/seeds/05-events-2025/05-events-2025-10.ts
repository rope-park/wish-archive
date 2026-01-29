// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202510: EventInput[] = [
  // ==========================================
  // OCTOBER 2025
  // ==========================================
  {
    date: "2025-10-01",
    time: "20:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 디어마이뮤즈",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-10-06",
    startDate: "2025-10-06",
    endDate: "2025-10-08",
    time: "17:10(6일), 17:50(7일), 17:50(8일)",
    type: EventType.VARIETY_SHOW,
    title: "[MBC] 2025 추석특집 아이돌스타 선수권대회 (아육대)",
    description: "8/25 녹화분",
    country: "KR",
    appearance: {
      programName: "아육대",
    },
  },
  {
    date: "2025-10-10",
    time: "18:00",
    type: EventType.FESTIVAL,
    title: "[Festival] 2025 APEC 뮤직 페스타 (APEC Music Festa)",
    location: "경주시민운동장",
    country: "KR",
    city: "경주 (Gyeongju)",
  },
  {
    date: "2025-10-11",
    time: "13:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 사인회 - 애플뮤직",
    description: "발매 기념 대면 팬사인회 진행",
  },
  {
    date: "2025-10-17",
    time: "18:00",
    type: EventType.RELEASE,
    title: "[OST] 우주메리미 OST PART.3 '이 세상 끝까지' 음원 공개",
    country: "KR",
  },
  {
    date: "2025-10-31",
    time: "19:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in INCHEON (Day 1)',
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
];
