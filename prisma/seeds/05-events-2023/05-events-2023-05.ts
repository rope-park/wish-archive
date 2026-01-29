// prisma/seeds/05-events-2023.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202305: EventInput[] = [
  // ==========================================
  // MAY 2023
  // ==========================================
  {
    date: "2023-05-24",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] SM 3.0: NEW IP 2023",
    description:
      "SM 엔터테인먼트 장철혁 대표가 NCT의 마지막 팀 런칭 계획 및 일본인/한국인 멤버 공개 예고.",
    relatedUrl: "https://youtu.be/KqWyfGHc-3M",
  },
];
