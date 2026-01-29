// prisma/seeds/05-events-2023.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202310: EventInput[] = [
  // ==========================================
  // OCTOBER 2023
  // ==========================================
  /* TODO: https://nct-jp.net/ko/schedule/detail.php?id=1103062 
## 📺 **2023년 10월 활동 관련 링크 종합**

### **📋 10월 공연 일정**

| 날짜 | 도시 | 공연장 | 회차 | 시간 | 특이사항 |
|------|-----|-------|------|------|---------|
| **10.08 (일)** | 도쿄 | LINE CUBE SHIBUYA | 1~2회 | 15:30 / 19:00 | ⭐ **프리 데뷔 투어 첫 공연** |
| **10.09 (월)** | 도쿄 | LINE CUBE SHIBUYA | 3~4회 | 13:30 / 17:00 | - |
| **10.25 (수)** | 고베(효고) | 고베 국제회관 국제홀 | 5~6회 | 18:00 | - |
| **10.26 (목)** | 고베(효고) | 고베 국제회관 국제홀 | 7~8회 | 18:00 | - |

***

### **📍 10월 공연장**

| 도시 | 공연장 | 특징 |
|------|--------|------|
| **도쿄** | LINE CUBE SHIBUYA | 약 2,700명, 시부야역 근처 |
| **고베** | 고베 국제회관 국제홀 | 중규모 컨벤션 시설 |

***
    */
  {
    date: "2023-10-02",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 멤버 정민 하차 및 6인 체제 확정",
    description:
      "SM 엔터테인먼트 공식 발표. 건강 회복을 최우선으로 하기 위해 연습생 신분으로 돌아가 치료에 전념하기로 결정.",
    relatedUrl: "https://nct-jp.net/ko/news/detail.php?id=1111526",
  },
  {
    date: "2023-10-04",
    type: EventType.ANNOUNCEMENT,
    title: "[Open] NCT NEW TEAM 공식 SNS 채널 개설",
    description: "X, Instagram, YouTube 오픈",
    relatedUrl: "",
  },
  {
    /* TODO: 링크 추가 필요 */
    date: "2023-10-07",
    type: EventType.RELEASE,
    title: "[Teaser] Hands Up (Image)",
    description: "프리 데뷔 싱글 'Hands Up' 이미지 티저 공개.",
    country: "JP",
    albumTitle: "Hands Up",
    relatedUrl: "",
  },
  {
    date: "2023-10-08",
    type: EventType.RELEASE,
    title: "[Album] 프리 데뷔 싱글《Hands Up》",
    description: "타이틀곡 'Hands Up'과 수록곡 'We Go!' 수록.",
    country: "JP",
    albumTitle: "Hands Up",
    relatedUrl: "",
  },
  {
    date: "2023-10-08",
    time: "15:30",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 도쿄 (Day 1) (1회차)",
    description: "프리 데뷔 투어 일본 공연",
    location: "라인 큐브 시부야 (Line Cube Shibuya)",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
    relatedUrl: "https://nct-jp.net/ko/live/tour.php?id=1002368",
  },
  {
    date: "2023-10-08",
    time: "19:00",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 도쿄 (Day 1) (2회차)",
    description: "프리 데뷔 투어 일본 공연",
    location: "라인 큐브 시부야 (Line Cube Shibuya)",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
    relatedUrl: "https://nct-jp.net/ko/live/tour.php?id=1002368",
  },
  {
    date: "2023-10-09",
    time: "13:30",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 도쿄 (Day 2) (1회차 13:30 / 2회차 17:00)",
    description: "프리 데뷔 투어 일본 공연",
    location: "라인 큐브 시부야 (Line Cube Shibuya)",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-10-09",
    time: "17:00",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 도쿄 (Day 2) (2회차 13:30 / 2회차 17:00)",
    description: "프리 데뷔 투어 일본 공연",
    location: "라인 큐브 시부야 (Line Cube Shibuya)",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-10-13",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] NCT NEW TEAM 라디오 코멘트 출연 안내",
    description: "라디오 프로그램 코멘트 출연.",
    country: "JP",
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1103062",
  },
  {
    date: "2023-10-13",
    time: "19:00",
    type: EventType.RADIO,
    title: "[J-WAVE] START LINE (코멘트)",
    description:
      "16:30~20:00 방송 중 19:00경 'MILA'S TOO MUCH K-POP INFORMATION' 코너 코멘트 출연.",
    country: "JP",
    relatedUrl: "https://www.j-wave.co.jp/original/startline/",
    appearance: {
      programName: "스타트 라인",
    },
  },
  {
    date: "2023-10-13",
    time: "23:00",
    type: EventType.RADIO,
    title:
      "[CBC Radio] 츄-모리 금요일 (チュウモリ金曜日) MIX YOUTH RADIO (코멘트)",
    description: "22:00~24:00 방송 중 23:00대 코멘트 출연.",
    country: "JP",
    relatedUrl: "https://hicbc.com/radio/mixyouthradio/",
  },
  {
    date: "2023-10-17",
    time: "09:00",
    type: EventType.RADIO,
    title: "[J-WAVE] STEP ONE (코멘트)",
    description: "09:00~13:00 방송 내 코멘트 출연.",
    country: "JP",
    relatedUrl: "https://www.j-wave.co.jp/original/stepone/",
  },
  {
    date: "2023-10-17",
    time: "23:30",
    type: EventType.RADIO,
    title: "[bayfm] ジェネZZ (GENE ZZ) (코멘트)",
    description: "23:30~23:57 방송 출연.",
    country: "JP",
    relatedUrl: "https://www.bayfm.co.jp/program/genez/",
  },
  {
    date: "2023-10-18",
    time: "20:00",
    type: EventType.RADIO,
    title: "[TOKYO FM] Roomie Roomie! (코멘트)",
    description: "20:00~21:00 방송 출연.",
    country: "JP",
    relatedUrl: "https://www.tfm.co.jp/roomie/",
  },
  {
    date: "2023-10-22",
    time: "02:00",
    type: EventType.RADIO,
    title: "[FM Yokohama] Radio HITS Radio (코멘트)",
    description: "방송표기: 10/21(토) 26:00~28:30 (심야 방송).",
    country: "JP",
    relatedUrl: "https://www.fmyokohama.jp/snu/",
  },
  {
    date: "2023-10-22",
    time: "11:00",
    type: EventType.RADIO,
    title: "[α-STATION] KP CONNECTION (코멘트)",
    description: "11:00~12:00 방송 출연.",
    country: "JP",
    relatedUrl: "https://fm-kyoto.jp/blog/kp_connection/",
  },
  {
    date: "2023-10-19",
    type: EventType.RELEASE,
    title: "[MV] Hands Up",
    description: "프리 데뷔 싱글 타이틀곡 'Hands Up' 뮤직비디오 공개.",
    country: "JP",
    albumTitle: "Hands Up",
    linkedContents: [
      {
        title: "NCT NEW TEAM 'Hands Up' MV",
        url: "https://youtu.be/ZVcy7bQkBhA",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-10-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] Hand Up 쇼츠 #NCTNEWTEAM",
    description: "Hands Up 챌린지",
    albumTitle: "Hands Up",
    linkedContents: [
      {
        title: "🙋‍♂️ 〰 올라 올라 〰 🙋‍♂️ #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=LSPihEbs8so",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "유우시"],
      },
      {
        title: "Bet you wanna du du du du ♫ #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=D9R5eUfWWLM",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "Let’s go #NCTNEWTEAM 🤩",
        url: "https://www.youtube.com/watch?v=9vCQCEN9ZCQ",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "료", "사쿠야"],
      },
      {
        title: "Behind the Scene 👀 #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=pDR7FDPFtRE",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
      {
        title: "🦭 リョウ&サクヤ are ready 🥐 #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=AGfaasRlp5U",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["료", "사쿠야"],
      },
      {
        title: "We fly We fly ⋆｡˚ ☁︎ ˚｡⋆｡ #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=ldPDahq4hPo",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "So let me see you fly 三🚀🪽 #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=MWSOO4CfnQ8",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "some cute #HandsUp crumbs ♡ #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=cmUixtmy3Mk",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
        cast: ["료", "사쿠야"],
      },
      {
        title: "2 BE ☝️ #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=9c0Fv4YCiM8",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-10-23",
    type: EventType.RELEASE,
    title: "[Dance Practice] We Go! (Moving Ver.)",
    description: "NCT NEW TEAM 'We Go!' 안무 연습 영상 (Moving Ver.)",
    albumTitle: "Hands Up",
    linkedContents: [
      {
        title: "NCT NEW TEAM 'We Go!' Dance Practice (Moving Ver.)",
        url: "https://www.youtube.com/watch?v=4jsh9hu7Bng",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-10-24",
    type: EventType.RELEASE,
    title: "[Dance Practice] Hands Up",
    description: "NCT NEW TEAM 'Hands Up' 안무 연습 영상",
    albumTitle: "Hands Up",
    linkedContents: [
      {
        title: "NCT NEW TEAM 'Hands Up' Dance Practice",
        url: "https://www.youtube.com/watch?v=ZiDnpDJ9Z_Y",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-10-25",
    type: EventType.ONLINE_CONTENT,
    title: "[Reaction] 'Hands Up' MV Reaction",
    description: "NCT NEW TEAM 'Hands Up' 뮤직비디오 리액션",
    albumTitle: "Hands Up",
    linkedContents: [
      {
        title: "REACTION to ⚾️’Hands Up’💥 MVㅣNCT NEW TEAM Reaction",
        url: "https://www.youtube.com/watch?v=3Xw1PtOgeWA",
        type: ContentType.REACTION,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-10-25",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 효고 (Day 1)",
    description: "프리 데뷔 투어 일본 공연",
    location: "고베 국제회관 국제홀",
    country: "JP",
    city: "효고 (Hyogo)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },

  {
    date: "2023-10-26",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 효고 (Day 2)",
    description: "프리 데뷔 투어 일본 공연",
    location: "고베 국제회관 국제홀",
    country: "JP",
    city: "효고 (Hyogo)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-10-27",
    type: EventType.OTHER,
    title: "[Etc] 'NCT WISH' 상표권 출원",
    description: "SM 엔터테인먼트, 'NCT WISH' 상표 출원 확인",
  },
  {
    date: "2023-10-28",
    type: EventType.ANNOUNCEMENT,
    title: "[Canceled] NCT Universe : LASTART PRE-DEBUT TOUR - 치바 (Day 1)",
    description: "대형 무대 설비 조정 및 인력 확보의 어려움으로 인한 공연 취소",
    location: "마쿠하리 멧세 이벤트홀",
    country: "JP",
    city: "치바 (Chiba)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
    relatedUrl: "https://nct-jp.net/news/detail.php?id=1111570",
  },
  {
    date: "2023-10-29",
    type: EventType.ANNOUNCEMENT,
    title: "[Canceled] NCT Universe : LASTART PRE-DEBUT TOUR - 치바 (Day 2)",
    description: "대형 무대 설비 조정 및 인력 확보의 어려움으로 인한 공연 취소",
    location: "마쿠하리 멧세 이벤트홀",
    country: "JP",
    city: "치바 (Chiba)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
    relatedUrl: "https://nct-jp.net/news/detail.php?id=1111570",
  },
  {
    date: "2023-10-30",
    type: EventType.ANNOUNCEMENT,
    title: "[Canceled] NCT Universe : LASTART PRE-DEBUT TOUR - 치바 (Day 3)",
    description: "대형 무대 설비 조정 및 인력 확보의 어려움으로 인한 공연 취소",
    location: "마쿠하리 멧세 이벤트홀",
    country: "JP",
    city: "치바 (Chiba)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
    relatedUrl: "https://nct-jp.net/news/detail.php?id=1111570",
  },
];
