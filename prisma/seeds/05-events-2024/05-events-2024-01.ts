// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202401: EventInput[] = [
  // ==========================================
  // JANUARY 2024
  // ==========================================
  {
    date: "2024-01-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Choreography] Akanen Choreography Workshop",
    description: "Lola Brooke - Just Relax & keshi - GET IT 안무 워크숍.",
    participants: { type: "ONLY", memberNames: ["시온", "리쿠", "유우시"] },
    linkedContents: [
      {
        title: "Akanen Choreography Workshop",
        url: "https://youtu.be/bdd-8pSzy14",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-18",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 팀명 'NCT WISH' 공식 발표",
    description:
      "그룹명 'NCT WISH' 공식 발표. 'WISH for Our WISH'라는 캐치프레이즈 공개. 멤버들과 팬들의 간절한 소망이 맞닿아 탄생한 팀을 의미.",
  },
  {
    date: "2024-01-18",
    type: EventType.RELEASE,
    title: "[Concept Film] NCT WISH : WISH for Our WISH",
    description: "NCT WISH 세계관 영상",
    linkedContents: [
      {
        title: "NCT WISH : WISH for Our WISH",
        url: "https://youtu.be/E8AQO8-ih30",
        type: ContentType.CONCEPT_FILM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-19",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] Now #NCTWISH is here",
    description: "NCT WISH 로고 모션 숏폼 공개",
    linkedContents: [
      {
        title: "Now #NCTWISH is here",
        url: "https://www.youtube.com/watch?v=5YpFHGZYCLI",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-22",
    type: EventType.RELEASE,
    title: "[Teaser] NCT : Dream Contact 'Our WISH' Teaser",
    description: "NCT 세계관(꿈) 합류 스토리 티저 영상",
    linkedContents: [
      {
        title: "NCT : Dream Contact 'Our WISH' Teaser",
        url: "https://youtu.be/VGpahj-nSBs",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-23",
    type: EventType.RELEASE,
    title: "[Concept Film] NCT : Dream Contact 'Our WISH'",
    description: "NCT 세계관(꿈) 합류 스토리 본편 영상",
    linkedContents: [
      {
        title: "NCT : Dream Contact 'Our WISH'",
        url: "https://youtu.be/f8Q9Cop0Tgo",
        type: ContentType.CONCEPT_FILM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-28",
    type: EventType.RELEASE,
    title: "[Teaser] NASA",
    description:
      "프리 데뷔 기간과 정식 데뷔를 잇는 브릿지 트랙 'NASA' 티저 및 숏폼 공개.",
    linkedContents: [
      {
        title: "We goin’ up like NASA 🛰 TONIGHT 0AM (KST)",
        url: "https://www.youtube.com/watch?v=kbA9BRdNMpg",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
      {
        title: "3, 2, 1 Let’s go! 🚀 #NCTWISH #NASA",
        url: "https://www.youtube.com/watch?v=qKS3DmnHhyU",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-29",
    time: "00:00",
    type: EventType.RELEASE,
    title: "[Performance] NASA Performance Video",
    description:
      "프리 데뷔 기간과 정식 데뷔를 잇는 브릿지 트랙. 데뷔를 향한 NCT WISH의 열정과 포부를 담은 곡.",
    linkedContents: [
      {
        title: "NCT WISH 엔시티 위시 'NASA' Performance Video",
        url: "https://youtu.be/SzMU3RUGvEQ",
        type: ContentType.PERFORMANCE_VIDEO,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-29",
    type: EventType.RELEASE,
    title: "[Dance Practice] NASA Dance Practice (Moving Ver.)",
    linkedContents: [
      {
        title: "NCT WISH 엔시티 위시 'NASA' Dance Practice (Moving Ver.)",
        url: "https://youtu.be/A-NgmnHRSwk",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-30",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 도쿄돔 데뷔 무대 확정",
    description: "2월 SMTOWN LIVE를 통한 데뷔 무대 공식화",
    relatedUrl: "https://nct-jp.net/ko/news/detail.php?id=1114009",
  },
  {
    date: "2024-01-31",
    type: EventType.RELEASE,
    title: "[Teaser] WISH BAKERY",
    appearance: {
      programName: "WISH BAKERY",
      episode: "Teaser",
    },
    linkedContents: [
      {
        title: "WISH BAKERY🧁 #NCTWISH #WISHBAKERY",
        url: "https://www.youtube.com/watch?v=qw31oW5aW_w",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
];
