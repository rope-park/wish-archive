// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202408: EventInput[] = [
  // =================================
  // AUGUST 2024
  // =================================
  {
    date: "2024-08-01",
    type: EventType.FESTIVAL,
    title: "[Festival] 2024 THE STAR NEXTAGE",
    location: "도쿄 가든 시어터",
    country: "JP",
    city: "도쿄 (Tokyo)",
  },
  {
    date: "2024-08-02",
    type: EventType.FESTIVAL,
    title: "[Festival] 2024 THE STAR NEXTAGE",
    location: "도쿄 가든 시어터",
    country: "JP",
    city: "도쿄 (Tokyo)",
  },
  {
    date: "2024-08-04",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 료 생일",
    description: "Happy RYO Day💛",
    participants: {
      type: "ONLY",
      memberNames: ["료"],
    },
  },
  {
    date: "2024-08-06",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 사인회 - 사운드웨이브",
    description: "발매 기념 대면 팬사인회 진행",
    albumTitle: "Songbird",
  },
  {
    date: "2024-08-06",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 VIDEO CALL EVENT - SMTOWN &STORE",
    description: "발매 기념 화상 팬사인회 진행",
    albumTitle: "Songbird",
  },
  {
    date: "2024-08-09",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 VIDEO CALL EVENT - 디어마이뮤즈",
    description: "발매 기념 화상 팬사인회 진행",
    albumTitle: "Songbird",
  },
  {
    date: "2024-08-10",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] NCT WISH in Japan Behind",
    linkedContents: [
      {
        title:
          "もっと頑張って🤍 もっと楽しく🎵 | 더 열심히✌️ 더 즐겁게💕 | NCT WISH in Japan Behind",
        url: "https://youtu.be/Tl0oU6hy6yo?si=JDYDVVFZV1TuGEgd",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-08-11",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 사인회 - 엠투유레코드",
    description: "발매 기념 대면 팬사인회 진행",
    albumTitle: "Songbird",
  },
  {
    date: "2024-08-14",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 사인회 - 에버라인",
    description: "발매 기념 대면 팬사인회 진행",
    albumTitle: "Songbird",
  },
  {
    date: "2024-08-16",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] #위시가부산에",
    linkedContents: [
      {
        title:
          "#위시가부산에 송정해수욕장🌊 돼지국밥🍚 이게 바로 부산 아이가 😎 | #WISHがプサンに ソンジョン海水浴場🏝 デジクッパ😋 これぞプサン",
        url: "https://youtu.be/P6mO6C8HRnk?si=49aWk2kUmRo_sVoE",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-08-19",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] #위시가전주에",
    linkedContents: [
      {
        title:
          "#위시가전주에 한옥마을에서 한복도 입고😎 비빔밥도 먹어요🍽 | #WISHがチョンジュに 韓屋村で韓服もきて〰️ビビンバも食べます😝",
        url: "https://youtu.be/5BsQnTz6YZ0?si=DjolJSuxincq4kg-",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-08-22",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2024 케이월드 드림 어워즈 (K-WORLD DREAM AWARDS)",
    location: "잠실실내체육관",
    country: "KR",
    city: "서울 (Seoul)",
    musicShowResult: {
      rank: 0,
      note: "K-World Dream Super Rookie Award",
    },
  },
  {
    date: "2024-08-22",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] #위시가대구에",
    linkedContents: [
      {
        title:
          "#위시가대구에 🗣:위시 밥 마이 뭇나❓👼🏻:마이 뭇다❗️| #WISHがテグに 🗣: ご飯たくさん食べる❓👼🏻: たくさん食べる❗️",
        url: "https://youtu.be/DCtKi0xBdsM?si=is9TY_4LJmFzvyl4",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-08-25",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] #위시가청주에",
    linkedContents: [
      {
        title:
          "#위시가청주에 맛있는 고기와🥩 냉면🤍 전국투어 소감 말하기💌 | #WISHがチョンジュに 美味しいお肉と冷麺💜 全国ツアーの感想➿",
        url: "https://youtu.be/AChLwcbi38I?si=M0RN7WtiH8bbLQ58",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-08-26",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 2024 NCT WISH ASIA TOUR LOG in JAPAN 발표",
    description: "첫 아시아 투어 공식 발표. 일본 6개 도시 개최.",
    country: "JP",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    relatedUrl: "https://nct-jp.net/ko/live/tour.php?id=1002619",
  },
];
