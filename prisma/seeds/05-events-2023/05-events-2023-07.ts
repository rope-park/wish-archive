// prisma/seeds/05-events-2023.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202307: EventInput[] = [
  // ==========================================
  // JULY 2023
  // ==========================================
  {
    date: "2023-07-19",
    type: EventType.RELEASE,
    title: "[Teaser] NCT Universe : LASTART (Main Trailer)",
    description: "NCT Universe : LASTART 프로그램의 메인 트레일러 영상 공개.",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART",
      episode: "Trailer",
    },
    linkedContents: [
      {
        title: "[#라스타트] NCT Universe : LASTART | MAIN TRAILER 💫 [EN/JP]",
        url: "https://youtu.be/NX25eMLdkKY",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-07-27",
    type: EventType.VARIETY_SHOW,
    title: "[ENA] NCT Universe : LASTART (Ep.1)",
    description:
      "연습생 10인 최초 공개 및 첫 번째 관문 <2인 무대> 미션 시작.\n스페셜 디렉터: KEY (SHINee)",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (KR)",
      episode: "1회",
    },
    linkedContents: [
      {
        title: "시온 & 유우시 'Afrolex' 무대 다시 보기",
        url: "https://youtu.be/1Oi_qc5cMEc",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["시온", "유우시"],
      },
      {
        title: "하루타 & 앤더슨 'Believer' 무대 다시 보기",
        url: "https://youtu.be/IT6Bm1fcGyY",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
];
