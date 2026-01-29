// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202411: EventInput[] = [
  // =================================
  // NOVEMBER 2024
  // =================================
  {
    date: "2024-11-03",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - ISHIKAWA (Day 1)",
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    relatedUrl: "https://nct-jp.net/en/live/tour.php?id=1002619",
    linkedContents: [
      {
        title: "LOG in JAPAN Ishikawa Day 1 - Behind",
        url: "https://www.youtube.com/watch?v=4gne3A7MV0c",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-11-04",
    time: "16:00",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - ISHIKAWA (Day 2)",
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-11-09",
    time: "17:00",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - KYOTO (Day 1)",
    location: "롬시어터 교토 (Rohm Theatre Kyoto)",
    country: "JP",
    city: "교토 (Kyoto)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-11-10",
    time: "16:00",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - KYOTO (Day 2)",
    location: "롬시어터 교토 (Rohm Theatre Kyoto)",
    country: "JP",
    city: "교토 (Kyoto)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-11-17",
    time: "18:00",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2024 코리아 그랜드 뮤직 어워즈 (2024 KGMA)",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    musicShowResult: {
      rank: 0,
      note: "IS RISING STAR Award",
    },
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-11-18",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 사쿠야 생일",
    description: "Happy SAKUYA Day🩷",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
  },
  {
    date: "2024-11-27",
    time: "18:30",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - KANAGAWA (Day 1)",
    location:
      "파시피코 요코하마 국립대홀 (Pacifico Yokohama National Convention Hall)",
    country: "JP",
    city: "요코하마 (Yokohama)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-11-28",
    time: "18:30",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - KANAGAWA (Day 2)",
    location:
      "파시피코 요코하마 국립대홀 (Pacifico Yokohama National Convention Hall)",
    country: "JP",
    city: "요코하마 (Yokohama)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-11-30",
    time: "17:30",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - HYOGO (Day 1)",
    location: "아마가사키 문화 센터 (Amagasaki Amashin Archaic Hall)",
    country: "JP",
    city: "효고 (Hyogo)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
];
