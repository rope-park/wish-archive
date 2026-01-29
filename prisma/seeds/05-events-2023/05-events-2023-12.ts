// prisma/seeds/05-events-2023.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202312: EventInput[] = [
  // ==========================================
  // DECEMBER 2023
  // ==========================================
  /*
    ## 📺 **2023년 12월 활동 관련 링크 종합**

### **🎬 핵심 페이지**

| 콘텐츠 | URL | 설명 |
|--------|-----|------|
| **프리 데뷔 투어 공식** | https://namu.wiki/w/NCT%20Universe%20:%20LASTART%20PRE-DEBUT%20TOUR | 12월 공연 일정 및 최종 성과 |

***

### **📋 12월 공연 일정**

| 날짜 | 도시 | 공연장 | 회차 | 특이사항 |
|------|------|--------|------|---------|
| **12.03~04** | 후쿠오카 | 기타큐슈 솔레이유 홀 | 3회 | - |
| **12.07** | 히로시마 | 히로시마 문화학원 HBG 홀 | 1회 | - |
| **12.09~10** | 오카야마 | 구라시키 시민회관 | 4회 | 최다 공연 도시 |
| **12.19~20** | 홋카이도 | 카나모토 홀 | 2회 | ⭐ **FINAL** (12/20) |

***

### **📀 앨범 발매**

| 항목 | 내용 |
|------|------|
| **타이틀** | **《Hands Up》** 실물(Physical) CD |
| **발매일** | 2023년 12월 20일 (최종 공연과 동일) |
| **버전** | A/B 2종 |
| **특전** | 셀카 트레이딩 카드 (랜덤 1종/6종) |
| **공식 공지** | https://nct-jp.net/en/news/detail.php?id=1112965 |

### **🎤 프리 데뷔 투어 최종 성과**

| 구분 | 수치 |
|------|------|
| **기간** | 2023.10.08 ~ 2023.12.20 (약 2.5개월) |
| **도시** | **9개 도시** (도쿄, 고베, 아이치, 오사카, 이시카와, 후쿠오카, 히로시마, 오카야마, 홋카이도) |
| **공연 회차** | **24회** |
| **누적 관객** | 약 54,000명 |
| **최종 공연** | 2023.12.20 홋카이도 카나모토 홀 |

***

### **🎯 12월 주요 성과**

✅ **프리 데뷔 투어 완성**: 9개 도시 24회 공연 성공적 완료  
✅ **앨범 발매**: Hands Up 실물 CD 12월 20일 발매  
✅ **팬 대면**: 약 54,000명 일본 팬과의 만남 완성  
✅ **2024년 준비**: 도쿄돔 정식 데뷔를 향한 완벽한 준비 
*/
  {
    date: "2023-12-03",
    time: "15:00",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 후쿠오카 (Day 1) (1회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "기타큐슈 솔레이유 홀",
    country: "JP",
    city: "후쿠오카 (Fukuoka)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-03",
    time: "18:30",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 후쿠오카 (Day 1) (2회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "기타큐슈 솔레이유 홀",
    country: "JP",
    city: "후쿠오카 (Fukuoka)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-04",
    time: "18:00",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 후쿠오카 (Day 2) (3회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "기타큐슈 솔레이유 홀",
    country: "JP",
    city: "후쿠오카 (Fukuoka)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-06",
    type: EventType.ONLINE_CONTENT,
    title: "[Vlog] NCT NEW TEAM on SHINKANSEN",
    description: "NCT NEW TEAM의 신칸센 브이로그 (이시카와행)",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    linkedContents: [
      {
        title:
          "新幹線に乗って石川へ🚅 | 신칸센 타고 이시카와로 가요💨 | NCT NEW TEAM on SHINKANSEN",
        url: "https://www.youtube.com/watch?v=dTcsSQkFw4A",
        type: ContentType.VLOG,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-12-07",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 히로시마",
    description: "프리 데뷔 투어 일본 공연",
    location: "히로시마 문화학원 HBG 홀",
    country: "JP",
    city: "히로시마 (Hiroshima)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-08",
    type: EventType.MAGAZINE,
    title: "[Magazine] 피아 MUSIC COMPLEX(PMC) 신문 VMAJ 2023호",
    description:
      "NCT NEW TEAM 단독 인터뷰 게재 (타블로이드판 16P). Mrs. GREEN APPLE 인터뷰, VMAJ 시상식 리포트 등 수록.",
    country: "JP",
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1103719",
  },
  {
    date: "2023-12-09",
    time: "15:00",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오카야마 (Day 1) (1회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "구라시키 시민회관",
    country: "JP",
    city: "오카야마 (Okayama)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-09",
    time: "18:30",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오카야마 (Day 1) (2회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "구라시키 시민회관",
    country: "JP",
    city: "오카야마 (Okayama)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-10",
    time: "13:30",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오카야마 (Day 2) (3회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "구라시키 시민회관",
    country: "JP",
    city: "오카야마 (Okayama)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-10",
    time: "17:00",
    type: EventType.TOUR,
    title:
      "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 오카야마 (Day 2) (4회차)",
    description: "프리 데뷔 투어 일본 공연.",
    location: "구라시키 시민회관",
    country: "JP",
    city: "오카야마 (Okayama)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-15",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] VCR Behind the Scenes",
    description: "NCT Universe : LASTART PRE-DEBUT TOUR VCR 촬영 비하인드",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
    linkedContents: [
      {
        title:
          "少しぎこちなくても大丈夫😉 | 조금 서툴러도 괜찮아🫂 | NCT Universe : LASTART PRE-DEBUT TOUR VCR Behind the Scenes",
        url: "https://www.youtube.com/watch?v=rinBf5MRB9w",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-12-19",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 홋카이도 (Day 1)",
    description: "프리 데뷔 투어 일본 공연",
    location: "카나모토 홀",
    country: "JP",
    city: "홋카이도 (Hokkaido)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-20",
    type: EventType.RELEASE,
    title: "[Physical] 프리 데뷔 싱글 《Hands Up》 (CD)",
    description: "일본 현지 발매. A/B 버전 및 특전 포토카드 포함.",
    country: "JP",
    albumTitle: "Hands Up",
    relatedUrl: "https://nct-jp.net/en/news/detail.php?id=1112965",
  },
  {
    date: "2023-12-20",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] NCT Universe : LASTART PRE-DEBUT TOUR - 홋카이도 (Day 2)",
    description: "프리 데뷔 투어 일본 공연 마지막 회.",
    location: "카나모토 홀",
    country: "JP",
    city: "홋카이도 (Hokkaido)",
    seriesName: "NCT Universe : LASTART PRE-DEBUT TOUR",
  },
  {
    date: "2023-12-21",
    type: EventType.ONLINE_CONTENT,
    title: "[Vlog] NCT NEW TEAM @ USJ",
    description:
      "NCT NEW TEAM의 유니버셜 스튜디오 재팬 브이로그 (with 막내 16살 생일)",
    location: "유니버셜 스튜디오 재팬",
    country: "JP",
    city: "오사카 (Osaka)",
    linkedContents: [
      {
        title:
          "16歳になった末っ子と🥐 ユニバーサルスタジオジャパンへ🌏 | 16살이된 막내랑🩷 유니버셜 스튜디오 재팬에🌏 | NCT NEW TEAM @ USJ",
        url: "https://www.youtube.com/watch?v=IXKZXtBhZvM",
        type: ContentType.VLOG,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-12-24",
    type: EventType.ONLINE_CONTENT,
    title: "[Christmas] Merry Christmas with #NCTNEWTEAM",
    description: "크리스마스 메시지 영상",
    linkedContents: [
      {
        title: "Merry Christmas with #NCTNEWTEAM",
        url: "https://www.youtube.com/watch?v=uM6vjCvIMQQ",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.YOUTUBE,
      },
      {
        title: "⋆ ₊❆* Christmas with #SION 💐*❆ ₊⋆",
        url: "https://www.youtube.com/watch?v=5VLyQGd1NNQ",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
      {
        title: "₊❅.✨Have a #RIKU Christmas✨⋆⁺₊❅.",
        url: "https://www.youtube.com/watch?v=8kUKEgJOb4Y",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
      {
        title: "⋆⁺₊✧🧁A Lovely Christmas Day with #SAKUYA🧁⋆⁺₊✧",
        url: "https://www.youtube.com/watch?v=qRDUhrJFBfc",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야"],
      },
      {
        title: "🎄meet #DAEYOUNG under the mistletoe🎄",
        url: "https://www.youtube.com/watch?v=tOPGG_jqxOo",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.YOUTUBE,
        cast: ["재희"],
      },
      {
        title: "﹡˖˟༝🤍 Peace, joy and #YUSHI 🤍˖˟ ༝˖˟",
        url: "https://www.youtube.com/watch?v=YvS8H9H3nu0",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title: "｡*̥❄︎‧˚₊✧⛄️Santa baby #RYO 🦌*:･❄️",
        url: "https://www.youtube.com/watch?v=HIx9Lr4i2j4",
        type: ContentType.ANNOUNCEMENT,
        platform: Platform.YOUTUBE,
        cast: ["료"],
      },
    ],
  },
  {
    date: "2023-12-28",
    type: EventType.ONLINE_CONTENT,
    title: "[Vlog] NCT NEW TEAM @ USJ (Part 2)",
    description:
      "NCT NEW TEAM의 유니버셜 스튜디오 재팬 브이로그 (호그와트 & 롤러코스터)",
    location: "유니버셜 스튜디오 재팬",
    country: "JP",
    city: "오사카 (Osaka)",
    linkedContents: [
      {
        title:
          "ときめくホグワーツと🧙🏻ローラーコースターチャレンジ🎢 | 설레이는 호그와트와🪄  롤러코스터 도전👊 | NCT NEW TEAM @ USJ",
        url: "https://www.youtube.com/watch?v=Nypn2bYdP1s",
        type: ContentType.VLOG,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-12-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Love the way that we go.",
    description: "We Go! 비하인드",
    albumTitle: "Hands Up",
    linkedContents: [
      {
        title: "Love the way that we go.",
        url: "https://www.youtube.com/watch?v=gMxXljBBjI8",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
];
/**https://nct-jp.net/ko/live/tour.php?id=1002368
https://maily.so/kpopmukzzibba/posts/g1o4mjplove
https://x.com/SM_NCTUniverse/status/1693549249202426233
https://www.joynews24.com/view/1736775 */
