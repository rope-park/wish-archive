// prisma/seeds/05-events-2023.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202311: EventInput[] = [
  // ==========================================
  // NOVEMBER 2023
  // ==========================================
  /*
    ## 📺 **2023년 11월 활동 관련 링크 종합**

### **🎬 핵심 페이지**

| 콘텐츠 | URL | 설명 |
|--------|-----|------|
| **프리 데뷔 투어** | https://namu.wiki/w/NCT%20Universe%20:%20LASTART%20PRE-DEBUT%20TOUR | 11월 아이치, 오사카, 이시카와 공연 일정 |
| **NCT 일본 공식 웹사이트** | https://nct-jp.net/ko/live/tour.php?id=1002368 | 투어 정보, 티켓 예매 |
| **MTV VMAJ 2023 공식** | https://www.vmaj.jp/ | VMAJ 시상식 정보 |

***

### **📋 11월 주요 일정**

| 날짜 | 행사 | 장소 | 특이사항 |
|------|------|------|---------|
| **11.09~10** | 투어 아이치 | 나고야 국제회의장 센추리 홀 | 2회 공연 |
| **11.16~17** | 투어 오사카 | 오릭스 극장 | ⭐ **Hulu 생중계** (11/17) |
| **11.22** | **MTV VMAJ Pre-Show** | 피아 아레나 MM | ⭐⭐⭐ **오프닝 액트** |
| **11.23** | **MTV VMAJ -THE LIVE-** | K-아레나 요코하마 | ⭐⭐⭐ **오프닝 액트** |
| **11.25~26** | 투어 이시카와 | 혼다노모리 호쿠텐 홀 | 4회 공연 |

***

### **🏆 MTV VMAJ 2023 출연**

#### Pre-Show (11월 22일)
| 정보 | 내용 |
|------|------|
| **공연장** | 피아 아레나 MM, 요코하마 |
| **시간** | 개장 16:30 / 공연 18:00 |
| **역할** | **오프닝 액트** |
| **곡** | "Hands Up" (프리 데뷔 싱글) |
| **영상** | https://www.youtube.com/watch?v=vfrpZjN6U_o (3분 20초) |

#### THE LIVE (11월 23일)
| 정보 | 내용 |
|------|------|
| **공연장** | K-아레나 요코하마 |
| **시간** | 개장 12:30 / 공연 14:00 |
| **역할** | **본행사 오프닝 액트** |
| **특징** | 대규모 K-아레나 무대 |

***

### **🎬 공식 영상**

| 제목 | URL | 길이 | 설명 |
|------|-----|------|------|
| **Pre-Show 클립** | https://www.youtube.com/watch?v=vfrpZjN6U_o | 3:20 | Hands Up 무대 |
| **Pre-Show 풀버전** | https://www.youtube.com/watch?v=TV7ecCR_MuY | 7:45 | 인터뷰 포함 |
| **오사카 공연 풀버전** | https://www.youtube.com/watch?v=CqA4Gcq6SNo | 43분 | 멤버 인터뷰 포함 |

***

### **📰 관련 기사**

| 날짜 | 제목 | URL |
|------|------|-----|
| **2023.10.27** | NCT NEW TEAM 출연 공식 발표 | https://www.reddit.com/r/NCT/comments/17hgwcp/231027_nct_new_team_will_appear_as_the_opening/ |
| **2023.10.27** | NCT 공식 공지 | https://nct-jp.net/news/detail.php?id=1112126 |
| **2023.12.21** | 투어 성료 기사 | https://www.newsis.com/view/NISX20231221_0002567303 |

***

### **🎟️ 생중계 & 스트리밍**

| 채널 | 날짜 | 내용 |
|------|------|------|
| **Hulu 스토어** | 11/17 18:00 | 오사카 공연 독점 생중계 |
| **YouTube** | 상시 | MTV VMAJ 무대 영상 |

***

### **📊 11월 투어 진행 현황**

- **누적 도시**: 4개 (도쿄 → 고베 → 아이치 → 오사카 + 이시카와)
- **누적 공연**: 약 12회 (전체 24회 중 50% 달성)
- **다음**: 12월 최종 3개 도시(후쿠오카, 히로시마, 오카야마, 홋카이도) 완성

***
*/
  {
    date: "2023-11-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] 'Hands Up' MV Behind the Scene",
    description: "'Hands Up' 뮤직비디오 촬영 비하인드",
    albumTitle: "Hands Up",
    linkedContents: [
      {
        title:
          "初めてのMV撮影⚾️ 緊張😖 ワクワク💗 | 첫 뮤비 촬영🎥 긴장되고 설레요😝 | ‘Hands Up’ MV Behind the Scene",
        url: "https://www.youtube.com/watch?v=VYAUcccFkuM",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-11-07",
    type: EventType.ONLINE_CONTENT,
    title: "[Vlog] NCT NEW TEAM in KOBE",
    description: "NCT NEW TEAM의 고베 브이로그",
    country: "JP",
    city: "고베 (Kobe)",
    linkedContents: [
      {
        title:
          "神戸牛モッパン🍖 とってもおいしいです😋 | 고베규 먹방🍖 완전 맛있어요💛 | NCT NEW TEAM in KOBE",
        url: "https://www.youtube.com/watch?v=Xvgylx950lE",
        type: ContentType.VLOG,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-11-09",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 아이치 (Day 1)",
    description: "프리 데뷔 투어 일본 공연",
    location: "나고야 국제회의장 센추리 홀",
    country: "JP",
    city: "아이치 (Aichi)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-11-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Behind the scene in #NAGOYA 👀",
    description: "아이치 공연 비하인드",
    country: "JP",
    city: "아이치 (Aichi)",
    linkedContents: [
      {
        title: "Behind the scene in #NAGOYA 👀",
        url: "https://x.com/nct_newteam/status/1722600189100486688",
        type: ContentType.BEHIND,
        platform: Platform.X_TWITTER,
      },
      {
        title: "Behind the scene in #NAGOYA 👀",
        url: "https://www.instagram.com/reel/CzbRaH9rzlM",
        type: ContentType.BEHIND,
        platform: Platform.INSTAGRAM,
      },
    ],
  },
  {
    date: "2023-11-10",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 아이치 (Day 2)",
    description: "프리 데뷔 투어 일본 공연",
    location: "나고야 국제회의장 센추리 홀",
    country: "JP",
    city: "아이치 (Aichi)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-11-11",
    time: "02:55",
    type: EventType.MUSIC_SHOW,
    title: "[ytv] 카미오토 밤 (カミオト夜)",
    description: "방송표기: 11/10(금) 26:55~ (심야 방송).",
    country: "JP",
    relatedUrl: "https://www.ytv.co.jp/kamioto-yoru/",
    appearance: {
      programName: "카미오토 밤",
    },
  },
  {
    date: "2023-11-12",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WE GO! WE FLY! EP.1",
    appearance: {
      programName: "WE GO! WE FLY!",
      episode: "1회",
    },
    linkedContents: [
      {
        title:
          "サッカーとゲームをして⚽️ ご飯はいつ？👀 | 축구하고 게임하고⛳ 밥은 언제 먹지?🤔 | WE GO! WE FLY! EP. 1",
        url: "https://www.youtube.com/watch?v=YeoDK2ZSuBc",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-11-15",
    time: "11:55",
    type: EventType.VARIETY_SHOW,
    title: "[NTV] 히루난데스! (Hirunandesu!!)",
    description: "시온, 리쿠 생방송 게스트 출연.",
    country: "JP",
    relatedUrl: "https://www.ntv.co.jp/hirunan/",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠"],
      role: "Guest",
    },
    appearance: {
      programName: "히루난데스!",
      role: "Guest",
    },
  },
  {
    date: "2023-11-16",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오사카 (Day 1)",
    description: "프리 데뷔 투어 일본 공연",
    location: "오릭스 극장",
    country: "JP",
    city: "오사카 (Osaka)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-11-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Behind the scene in #OSAKA 💥",
    description: "오사카 공연 비하인드",
    country: "JP",
    city: "오사카 (Osaka)",
    linkedContents: [
      {
        title: "Behind the scene in #OSAKA 💥",
        url: "https://x.com/nct_newteam/status/1725154820535841132",
        type: ContentType.BEHIND,
        platform: Platform.X_TWITTER,
      },
      {
        title: "Behind the scene in #OSAKA 💥",
        url: "https://www.instagram.com/reel/CztbJO9rC8C",
        type: ContentType.BEHIND,
        platform: Platform.INSTAGRAM,
      },
    ],
  },
  {
    date: "2023-11-17",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오사카 (Day 2)",
    description: "프리 데뷔 투어 일본 공연. Hulu 스토어 독점 생중계 진행.",
    location: "오릭스 극장",
    country: "JP",
    city: "오사카 (Osaka)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
    relatedUrl: "https://x.com/hulu_japan/status/1722886815127089594",
  },
  {
    date: "2023-11-18",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 사쿠야 생일",
    description: "Happy SAKUYA Day🩷",
  },
  {
    date: "2023-11-22",
    type: EventType.AWARD_SHOW,
    title: "[Awards] MTV VMAJ 2023 Pre-Show",
    description: "레드카펫 행사 참석 및 오프닝 무대 출연.",
    location: "피아 아레나 MM",
    country: "JP",
    city: "요코하마 (Yokohama)",
    linkedContents: [
      {
        title: "Hands Up @ MTV VMAJ 2023 Pre-Show",
        url: "https://www.youtube.com/watch?v=vfrpZjN6U_o",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH MTV VMAJ 2023 Red Carpet",
        url: "https://x.com/nctwishofficial/status/1727247882699596126",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.X_TWITTER,
      },
    ],
  },
  {
    date: "2023-11-23",
    type: EventType.AWARD_SHOW,
    title: "[Awards] MTV VMAJ 2023 -THE LIVE-",
    description: "본 행사 무대 오프닝 액트(Opening Act) 공연 출연.",
    location: "K-아레나 요코하마",
    country: "JP",
    city: "요코하마 (Yokohama)",
    linkedContents: [
      {
        title: "NCT WISH MTV VMAJ 2023 Red Carpet",
        url: "https://x.com/mtv_japan/status/1727593695191744784",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.X_TWITTER,
      },
    ],
  },
  {
    date: "2023-11-24",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WE GO! WE FLY! EP.2",
    appearance: {
      programName: "WE GO! WE FLY!",
      episode: "2회",
    },
    linkedContents: [
      {
        title:
          "おいしい夕ご飯🍖 幸せなキャンプファイヤー🪵| 맛있는 저녁 식사🍽️ 행복한 캠프파이어🔥| WE GO! WE FLY! EP. 2",
        url: "https://www.youtube.com/watch?v=1SqkKQdUgYM",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-11-25",
    time: "15:00",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 이시카와 (Day 1) (1회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-11-25",
    time: "18:30",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 이시카와 (Day 1) (2회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-11-26",
    time: "13:30",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 이시카와 (Day 2) (1회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-11-26",
    time: "17:00",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 이시카와 (Day 2) (2회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-11-27",
    type: EventType.ONLINE_CONTENT,
    title: "[Vlog] NCT NEW TEAM in NAGOYA",
    description: "NCT NEW TEAM의 나고야 브이로그",
    country: "JP",
    city: "나고야 (Nagoya)",
    linkedContents: [
      {
        title:
          "外はサクサクヤな🥐 ひつまぶし🥢🤩 | 겉은 바삭쿠야한🥐 히츠마부시😝 | NCT NEW TEAM in NAGOYA",
        url: "https://www.youtube.com/watch?v=sMew82jFdMQ",
        type: ContentType.VLOG,
        platform: Platform.YOUTUBE,
      },
    ],
  },
];
