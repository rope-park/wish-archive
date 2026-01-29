// prisma/seeds/05-events-2023.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202308: EventInput[] = [
  // ==========================================
  // AUGUST 2023
  // ==========================================
  /*
    https://www.reddit.com/r/kpop/comments/166pdo7/nct_universe_lastart_nct_tokyo_predebut_reality/
*/
  {
    date: "2023-08-03",
    type: EventType.VARIETY_SHOW,
    title: "[ENA] NCT Universe : LASTART (Ep.2)",
    description:
      "2인 무대 미션 계속, 첫 번째 순위 및 베네핏 공개.\n스페셜 디렉터: KEY (SHINee)",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (KR)",
      episode: "2회",
    },
    linkedContents: [
      {
        title: "캇쇼 & 헤이테츠 'Shawty Fishin' 무대 다시 보기",
        url: "https://youtu.be/CkxNdeRqORA",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
      },
      {
        title: "료 & 사쿠야 'Chewing Gum' 무대 다시 보기",
        url: "https://youtu.be/Ou1johGLhGo",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야", "료"],
      },
      {
        title: "리쿠 & 류 'FIRE' 무대 다시 보기",
        url: "https://youtu.be/Qe5ok1_KQuQ",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
      {
        title: "정민 & 민재 '하늘을 달리다' 무대 다시 보기",
        url: "https://youtu.be/s3j2x7g8ygA",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-08-10",
    type: EventType.VARIETY_SHOW,
    title: "[ENA] NCT Universe : LASTART (Ep.3)",
    description:
      "두 번째 관문 <SM 명곡 그룹 미션> 시작.\n게스트: 려욱, 태민, 동해",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (KR)",
      episode: "3회",
    },
    linkedContents: [
      {
        title: "SM 명곡 그룹 미션 'Lucifer' 무대 다시 보기",
        url: "https://youtu.be/2FeFi2bXud8",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "유우시", "료", "사쿠야"],
      },
    ],
  },
  {
    date: "2023-08-10",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] NCT Universe : LASTART Pre-Debut Event 개최 확정",
    description:
      "프리 데뷔 이벤트 일본 개최 확정 공지. 최종 선발 멤버들의 프리 데뷔 쇼케이스 진행 예정.",
    relatedUrl: "https://nct-jp.net/ko/news/detail.php?id=1110102",
  },
  {
    date: "2023-08-17",
    type: EventType.VARIETY_SHOW,
    title: "[ENA] NCT Universe : LASTART (Ep.4)",
    description:
      "두 번째 미션 순위 발표식 & NEW 연습생 대영(재희) 합류.\n스페셜 디렉터: 려욱, 효연",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (KR)",
      episode: "4회",
    },
    linkedContents: [
      {
        title: "SM 명곡 그룹 미션 'U' 무대 다시 보기",
        url: "https://youtu.be/gRcS_sFiEGA",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "유우시", "사쿠야"],
      },
    ],
  },
  {
    date: "2023-08-24",
    type: EventType.VARIETY_SHOW,
    title: "[ENA] NCT Universe : LASTART (Ep.5)",
    description:
      "세 번째 관문 <SM 명곡 그룹 미션 일본어 Ver>.\n게스트: 효연, 최강창민, 시우민",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (KR)",
      episode: "5회",
    },
    linkedContents: [
      {
        title: "SM 명곡 그룹 미션 'Electric Kiss' 무대 다시 보기",
        url: "https://youtu.be/b9_jGVuBNB8",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["시온", "유우시", "료", "사쿠야"],
      },
    ],
  },
  {
    date: "2023-08-31",
    type: EventType.VARIETY_SHOW,
    title: "[ENA] NCT Universe : LASTART (Ep.6)",
    description:
      "세 번째 순위 발표식 & 최종 관문 <NCT 미션> 시작.\n게스트: 효연, 강타, 이특, 쟈니, 해찬, 텐",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (KR)",
      episode: "6회",
    },
    linkedContents: [
      {
        title: "SM 명곡 그룹 미션 'Why?' 무대 다시 보기",
        url: "https://youtu.be/GK0qmS5H7gI",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "유우시", "재희"],
      },
    ],
  },
];
