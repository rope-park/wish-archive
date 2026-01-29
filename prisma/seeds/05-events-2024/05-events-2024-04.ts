// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202404: EventInput[] = [
  // =================================
  // APRIL 2024
  // =================================
  {
    date: "2024-04-04",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] 음악방송 대기실 #03",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "1위가 되면 이런 기분일까🥺🥇 | 1位になるとこんな気持ちなのかな🏆✨ | ‘WISH’ 음악방송 대기실 비하인드 #03",
        url: "https://youtu.be/za5sdxENHc0",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-04-05",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 유우시 생일",
    description: "Happy YUSHI Day💙",
    participants: {
      type: "ONLY",
      memberNames: ["유우시"],
    },
    linkedContents: [
      {
        title:
          "#HAPPYYUSHIDAY 난 WISH 시절 유우시 놀리기 전공했단 사실 | 実はWISH時代にユウシいたずら学科を専攻した",
        url: "https://youtu.be/RBidSEYqfV4?si=4tWXcw-iqBvs4Yln",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-04-08",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] 음악방송 대기실 #04",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "가쿠란을 입고〰 담겨있던 사탕마술쇼 펼쳐보내💓 | 学ランをきて〰 キャンディマジックショーを届ける🍬 | ‘WISH’ 음악방송 대기실 비하인드 #04",
        url: "https://youtu.be/9SuHlafJ9GI",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-04-10",
    type: EventType.AWARD_SHOW,
    title: "[Awards] ASEA 2024 (Asia Star Entertainer Awards)",
    description: "데뷔 후 첫 신인상 수상.",
    location: "K-아레나 요코하마",
    country: "JP",
    city: "요코하마 (Yokohama)",
    musicShowResult: {
      rank: 0,
      note: "The Best New Artist (신인상) 수상",
    },
    linkedContents: [
      {
        title:
          "240410 NCT WISH Interview with billlie's TSUKI @ ASIA STAR ENTERTAINER AWARDS (ASEA 2024)",
        url: "https://www.youtube.com/watch?v=a5yd6ZCblq4",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-04-10",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Singles 매거진 커버 촬영 비하인드",
    linkedContents: [
      {
        title:
          "재밌고🤩 멋있게🎇 매거진 커버 촬영 | 楽しく😄かっこよく🔥マガジンカバー撮影 | Singles Photoshoot Behind",
        url: "https://youtu.be/g3V7U3EiWnE?si=aldR_ghcR86gV3V",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-04-11",
    type: EventType.ANNOUNCEMENT,
    title: "[Pre-order] NCT WISH : SCHOOL of WISH 팬클럽 선예매 신청 시작",
    description: '"NCT WISH : SCHOOL of WISH" 팬클럽 선예매 신청 오픈. ',
    country: "KR",
    seriesName: "NCT WISH : SCHOOL of WISH",
    relatedUrl: "https://weverse.io/nctwish/notice/18719",
  },
  {
    date: "2024-04-15",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 💬 HOTEL ROOMMATE CAM 📹",
    linkedContents: [
      {
        title: "NCT WISH 💬 HOTEL ROOMMATE CAM 📹",
        url: "https://youtu.be/Ji6GG3xCHdA?si=D_Rh95OJSLnV80dX",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-04-17",
    type: EventType.ANNOUNCEMENT,
    title: "팬미팅 투어 팬클럽 선예매 인증 시작",
    description:
      "팬클럽 선예매 신청자 본인확인 기간 시작 (4월 17일 10:00 AM ~ 4월 18일 11:59 PM). 인터파크 티켓 사이트에서 예매 인증 진행.",
    country: "KR",
  },
  {
    date: "2024-04-19",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 팬미팅 투어 일반 예매 오픈",
    description:
      "첫 전국 팬미팅 투어 일반 예매 오픈 (4월 19일 오후 8시). 인터파크 티켓에서 예매 시작. 예매 직후 15분 만에 4회 공연 모두 매진되어 화제가 됨.",
    country: "KR",
  },
  {
    date: "2024-04-21",
    type: EventType.FESTIVAL,
    title: "[Festival] UTO FEST 2024 in Fukuoka",
    description: "한일 수교 60주년 기념 K-POP 페스티벌",
    location: "마린 메세 후쿠오카 A관",
    country: "JP",
    city: "후쿠오카 (Fukuoka)",
    linkedContents: [
      {
        title: "NCT WISH - WISH @UTO FEST 2024",
        url: "https://youtu.be/dummy_uto_fest", // [확인 필요] 직캠 혹은 공식 영상
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-04-24",
    type: EventType.VARIETY_SHOW,
    title: "[TV Tokyo] 스포어트 마킹 (SportsMasking)",
    country: "JP",
    description: "일본 TV 도쿄 프로그램 출연.",
  },
  {
    date: "2024-04-25",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 팬미팅 투어 서울 공연 추가 오픈 공지",
    description:
      "첫 팬미팅 투어 서울 공연 높은 수요로 인해 1회 추가 오픈 공지. 5월 24일 1회 추가로 총 5회 공연 진행.",
    country: "KR",
  },
  {
    date: "2024-04-26",
    title: "[Behind] NCT WISH 대기실 탐방",
    type: EventType.ONLINE_CONTENT,
    linkedContents: [
      {
        title:
          "NCT WISHの楽屋探訪📸 | NCT WISH의 대기실 탐방👀 | NCT WISH in Japan Behind",
        url: "https://youtu.be/-Xll2uw2Nm4?si=7a9eKMQOk6zrNf99",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },

  // ==========================================
  // 화보 및 매거진 (2024)
  // ==========================================
  {
    date: "2024-04-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 마리끌레르 코리아 4월호",
    description: "마리끌레르 코리아 4월호 화보",
  },
];
