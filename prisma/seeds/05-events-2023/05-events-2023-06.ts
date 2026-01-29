// prisma/seeds/05-events-2023.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202306: EventInput[] = [
  // ==========================================
  // JUNE 2023
  // ==========================================
  {
    date: "2023-06-28",
    type: EventType.RELEASE,
    title: "[SMROOKIES] 시온, 유우시 공개",
    description: "SR23B 시온(SION), 유우시(YUSHI)의 프로필 및 티저 영상 공개.",
    linkedContents: [
      {
        title: "SMROOKIES: SION 시온",
        url: "https://youtu.be/pjdaQUlI-zc",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
      {
        title: "SMROOKIES: YUSHI 유우시",
        url: "https://youtu.be/ybNm9aXVVjs",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
    ],
  },
  {
    date: "2023-06-30",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] NCT Universe : LASTART 런칭 및 출연진 안내",
    description:
      "NCT의 마지막 팀 선발 과정을 담은 서바이벌 프로그램 7월 26일 첫 방송 공지. 보아/은혁 디렉터 참여 및 데뷔 인원(4명 선발) 공개",
    relatedUrl: "https://nct-jp.net/ko/news/detail.php?id=1109310",
    externalLinks: [
      {
        url: "https://www.ntv.co.jp/nctuniverse-lastart/",
        type: ExternalLinkType.OFFICIAL,
        label: "NTV 공식 사이트",
      },
      {
        url: "https://x.com/SM_NCTUniverse",
        type: ExternalLinkType.SNS,
        label: "NCT Universe 공식 X",
      },
      {
        url: "https://www.instagram.com/sm_nctuniverse/",
        type: ExternalLinkType.SNS,
        label: "NCT Universe 공식 Instagram",
      },
      {
        url: "https://www.tiktok.com/@sm_nctuniverse",
        type: ExternalLinkType.SNS,
        label: "NCT Universe 공식 TikTok",
      },
      {
        url: "https://www.hulu.jp/nct-universe-lastart",
        type: ExternalLinkType.STREAMING,
        label: "Hulu Japan 공식 사이트",
      },
    ],
    linkedContents: [
      {
        title: "NCT Universe : LASTART 공식 클립 영상 및 무대 등 모음 재생목록",
        url: "https://www.youtube.com/playlist?list=PLA91TLEzZINtF4_JdXdklKkTQEaX2KNXS",
        type: ContentType.VARIETY_CLIP,
        platform: Platform.YOUTUBE,
      },
    ],
  },
];
