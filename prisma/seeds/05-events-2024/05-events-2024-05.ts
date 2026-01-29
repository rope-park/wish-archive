// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202405: EventInput[] = [
  // =================================
  // MAY 2024
  // =================================
  {
    date: "2024-05-01",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] ASEA 2024 시상식 비하인드",
    linkedContents: [
      {
        title:
          "첫 시상식👏 그리고 첫 신인상〰️🏆 | 初の授賞式🥹そして初の新人賞〰️💗 | ASEA 2024 Behind the Scenes",
        url: "https://youtu.be/ppIFyCvhY6o?si=d38PHGjTcgJqIUhx",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-05-03",
    type: EventType.FESTIVAL,
    title: "[Festival] Rakuten GirlsAward 2024 S/S",
    location:
      "국립 요요기 경기장 제1체육관 (National Yoyogi Stadium First Gymnasium)",
    country: "JP",
    city: "도쿄 (Tokyo)",
    description:
      '라쿠텐 주최 "GirlsAward" 2024 봄/여름 시즌. 뮤직 스테이지 공연. 최신 패션과 K-POP이 어우러지는 대규모 축제. 일본 내 높은 영향력 있는 대중 매체 노출.',
  },
  {
    date: "2024-05-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 위시네 한강 나들이 (Part 1)",
    description: "한강에서 먹방과 피크닉",
    appearance: {
      programName: "위시네 한강 나들이",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "한강에선🌊 먹방이지😏 | 漢江ではモッパンだよね👅 | 위시네 한강 나들이",
        url: "https://youtu.be/TbHJNUM7EHA?si=UQayNyD9NN098Mha",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-05-07",
    type: EventType.FESTIVAL,
    title: "[Festival] THE 2ND CATALLENA FESTIVAL (카탈레나 페스티벌)",
    location: "파주 공설운동장",
    country: "KR",
    city: "파주 (Paju)",
    albumTitle: "WISH",
  },
  {
    date: "2024-05-11",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 시온 생일",
    description: "Happy SION Day💜",
    participants: {
      type: "ONLY",
      memberNames: ["시온"],
    },
  },
  {
    date: "2024-05-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 위시네 한강 나들이 (Part 2)",
    appearance: {
      programName: "위시네 한강 나들이",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "한강 피크닉🌿 그리고 팬터마임 버스킹🤹🏻‍♂️ | 漢江ピクニック😋そしてパントマイムバスキン🙌 | 위시네 한강 나들이",
        url: "https://youtu.be/QOBodPfUE_g?si=cwaFkFBVuR1qgRLk",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-05-11",
    type: EventType.CONCERT,
    title: "[Concert] KCON JAPAN 2024 (Day 2 - Showcase)",
    description: "KCON STAGE 및 SHOWCASE 출연.",
    location: "마쿠하리 멧세",
    country: "JP",
    city: "치바 (Chiba)",
    seriesName: "KCON",
  },
  {
    date: "2024-05-12",
    type: EventType.CONCERT,
    title: "[Concert] KCON JAPAN 2024 (Day 3 - M COUNTDOWN STAGE)",
    description: "ZOZO 마린 스타디움 메인 스테이지 출연.",
    location: "ZOZO 마린 스타디움",
    country: "JP",
    city: "치바 (Chiba)",
    seriesName: "KCON",
    albumTitle: "WISH",
  },
  {
    date: "2024-05-16",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] SCHOOL of WISH 팬미팅 부산 공연 추가 정보 공지",
    description:
      "6월 1일(토) 부산 드림씨어터에서 진행될 팬미팅 부산 공연 상세 정보 공개. 오후 2시, 저녁 7시 2회 공연 진행.",
    country: "KR",
  },
  {
    date: "2024-05-18",
    type: EventType.FESTIVAL,
    title: "[Festival] IKONYX Concert 2024 in Bangkok",
    location: "썬더돔 스타디움 (Thunderdome Stadium)",
    country: "TH",
    city: "방콕 (Bangkok)",
    description:
      "IKONYX Concert 2024 in Bangkok. 태국 최대규모 실내 경기장에서의 공연. K-POP 아티스트들의 대규모 음악 축제. NCT WISH의 첫 동남아시아 주요 공연 무대.",
  },
  {
    date: "2024-05-19",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 사꾸DAY in Dongdaemun",
    linkedContents: [
      {
        title:
          "#사쿠야 귀걸이 대공개🎀 동대문시장 쇼핑&멤버들 선물 만들어보기 | サクヤのピアスを大公開💞 東大門市場でショッピング&メンバーへのプレゼント作り | 사꾸DAY in Dongdaemun",
        url: "https://youtu.be/sQgE-jCuwwg?si=Qul9P_15bCKmza4z",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-05-24",
    time: "14:00",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 서울 (Day 1)",
    description: "서울 팬미팅 1회차",
    location: "명화 라이브 홀",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "NCT WISH : SCHOOL of WISH",
    linkedContents: [
      {
        title:
          "240525 NCT WISH 팬미팅 1회차 - 과학시간 (멤버 신체 일부 맞추기 게임😮) Full cam.",
        url: "https://www.youtube.com/watch?v=h7eXab5LSFA",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-05-25",
    time: "19:00",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 서울 (Day 2)",
    description: "서울 팬미팅 2회차",
    location: "명화 라이브 홀",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "NCT WISH : SCHOOL of WISH",
    linkedContents: [
      {
        title:
          "240525 NCT WISH - Sail Away RYO 직캠 서울 팬미팅 밤공 #RYO #リョウ #히로세료 #료 #NCTWISH #엔시티위시 #직캠 #엔시티료",
        url: "https://www.youtube.com/watch?v=lESgndeKe50",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["료"],
      },
    ],
  },
  {
    date: "2024-05-26",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 서울 (Day 3)",
    description:
      "서울 팬미팅 마지막 날 (14:00 / 19:00 2회 공연). Beyond LIVE 생중계.",
    location: "명화 라이브 홀",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "NCT WISH : SCHOOL of WISH",
  },
];
