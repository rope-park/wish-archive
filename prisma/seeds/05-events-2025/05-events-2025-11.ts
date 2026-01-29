// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202511: EventInput[] = [
  // ==========================================
  // NOVEMBER 2025
  // ==========================================
  {
    date: "2025-11-01",
    time: "17:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in INCHEON (Day 2)',
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-02",
    time: "16:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in INCHEON (Day 3)',
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-04",
    time: "18:30",
    type: EventType.EVENT,
    title: "[Event] 멜론뮤직 MUSIC WAVE 채팅 이벤트",
  },
  {
    date: "2025-11-08",
    time: "18:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in ISHIKAWA (Day 1)',
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-09",
    time: "16:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in ISHIKAWA (Day 2)',
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-15",
    time: "17:00",
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in HIROSHIMA',
    location: "히로시마 문화학원 HBG 홀",
    country: "JP",
    city: "히로시마 (Hiroshima)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-16",
    time: "17:30",
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in KAGAWA',
    location: "선포트 홀 다카마쓰 (Sunport Hall Takamatsu)",
    country: "JP",
    city: "카가와 (Kagawa)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-18",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 사쿠야 생일",
    description: "Happy SAKUYA Day🩷",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
  },
  {
    date: "2025-11-21",
    time: "18:30",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in OSAKA (Day 1)',
    location: "오릭스 극장",
    country: "JP",
    city: "오사카 (Osaka)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-22",
    time: "16:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in OSAKA (Day 2)',
    location: "오릭스 극장",
    country: "JP",
    city: "오사카 (Osaka)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-23",
    time: "16:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in OSAKA (Day 3)',
    location: "오릭스 극장",
    country: "JP",
    city: "오사카 (Osaka)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-28",
    time: "19:30",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2025 MAMA Awards in HONG KONG",
    location: "카이탁 스타디움 (Kai Tak Stadium)",
    country: "HK",
    city: "홍콩 (Hong Kong)",
  },
  {
    date: "2025-11-29",
    time: "18:00",
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in HOKKAIDO',
    location: "카나모토 홀",
    country: "JP",
    city: "홋카이도 (Hokkaido)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
];
