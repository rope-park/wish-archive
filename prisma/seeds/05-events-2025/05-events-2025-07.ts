// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202507: EventInput[] = [
  // ==========================================
  // JULY 2025
  // ========================================
  {
    date: "2025-07-06",
    time: "17:30",
    type: EventType.FESTIVAL,
    title: "[MBC] 쇼! 음악중심 in JAPAN",
    location: "베루나 돔 (Belluna Dome)",
    country: "JP",
    city: "사이타마 (Saitama)",
    appearance: {
      programName: "쇼! 음악중심",
    },
  },
  {
    date: "2025-07-20",
    time: "15:00",
    type: EventType.FANMEETING,
    title:
      "[Fanmeeting] NCTzen WISH-JAPAN FANMEETING 2025 ‘WISH祭’ (Day 1) (1회차)",
    location: "도요스 PIT",
    country: "JP",
    city: "고토 (Koto)",
    seriesName: "NCTzen WISH-JAPAN FANMEETING 2025",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://nct-jp.net/news/detail.php?id=1112345",
        label: "개최 공지",
      },
    ],
  },
  {
    date: "2025-07-20",
    time: "18:30",
    type: EventType.FANMEETING,
    title:
      "[Fanmeeting] NCTzen WISH-JAPAN FANMEETING 2025 ‘WISH祭’ (Day 1) (2회차)",
    location: "도요스 PIT",
    country: "JP",
    city: "고토 (Koto)",
    seriesName: "NCTzen WISH-JAPAN FANMEETING 2025",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://nct-jp.net/news/detail.php?id=1112345",
        label: "개최 공지",
      },
    ],
  },
  {
    date: "2025-07-21",
    time: "14:00",
    type: EventType.FANMEETING,
    title:
      "[Fanmeeting] NCTzen WISH-JAPAN FANMEETING 2025 ‘WWISH祭’ (Day 2) (3회차)",
    location: "도요스 PIT",
    country: "JP",
    city: "고토 (Koto)",
    seriesName: "NCTzen WISH-JAPAN FANMEETING 2025",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://nct-jp.net/news/detail.php?id=1112345",
        label: "개최 공지",
      },
    ],
  },
  {
    date: "2025-07-21",
    time: "17:30",
    type: EventType.FANMEETING,
    title:
      "[Fanmeeting] NCTzen WISH-JAPAN FANMEETING 2025 ‘WWISH祭’ (Day 2) (4회차)",
    location: "도요스 PIT",
    country: "JP",
    city: "고토 (Koto)",
    seriesName: "NCTzen WISH-JAPAN FANMEETING 2025",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://nct-jp.net/news/detail.php?id=1112345",
        label: "개최 공지",
      },
    ],
  },
  {
    date: "2025-07-26",
    time: "19:00",
    type: EventType.FESTIVAL,
    title: "[Festival] 2025 NOL 페스티벌 SBS 가요대전: Summer",
    location: "킨텍스(KINTEX) 제1전시장",
    country: "KR",
    city: "고양 (Goyang)",
    appearance: {
      programName: "가요대전",
    },
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://weverse.io/nctwish/notice/28639",
        label: "참여 안내",
      },
    ],
  },
  {
    date: "2025-07-29",
    type: EventType.FESTIVAL,
    title: "[Festival] SUMMER DANCE MUSIC FESTIVAL",
    location: "2025 오사카-간사이 엑스포 아레나",
    country: "JP",
    city: "오사카 (Osaka)",
  },
];
