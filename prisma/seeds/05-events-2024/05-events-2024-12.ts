// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202412: EventInput[] = [
  // ===========================================
  // DECEMBER 2024
  // ===========================================
  {
    date: "2024-12-01",
    time: "17:30",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - HYOGO (Day 2)",
    location: "아마가사키 문화 센터 (Amagasaki Amashin Archaic Hall)",
    country: "JP",
    city: "효고 (Hyogo)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WIS(H)PORTS EP.1",
    appearance: {
      programName: "WIS(H)PORTS",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "듀듀듀듀듀? (우리 체육관에 놀러올래?) | デュデュデュデュデュ？(僕たちの体育館に遊びに来ない?) | WIS(H)PORTS EP.1🏐ᯓ★",
        url: "https://youtu.be/wwusQYWXfxA?si=7m9dIaoz4GntVuGv",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-12-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WIS(H)SPORTS EP.2",
    appearance: {
      programName: "WIS(H)PORTS",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "사실 위시는 유명한 체육인들임🚴=💨 | 実はWISHは有名なアスリートたちです。| WIS(H)PORTS EP.2🎳ᯓ★",
        url: "https://youtu.be/-iAjzTFu5_Y?si=mLKzK-qUBvnFNeRu",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-12-12",
    time: "18:30",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - AICHI (Day 1)",
    location: "아이치 시민 홀",
    country: "JP",
    city: "아이치 (Aichi)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-13",
    time: "18:30",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - AICHI (Day 2)",
    location: "아이치 시민 홀",
    country: "JP",
    city: "아이치 (Aichi)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-15",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] PARIS BAGUETTE Behind",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
    linkedContents: [
      {
        title:
          "위시랑 빵 드실래여? /ᐠ. .ᐟ\ฅ 🥐✨ | WISHと一緒にパン食べませんか？🥖 | PARIS BAGUETTE Behind",
        url: "https://youtu.be/UqO0-lygVQQ?si=NOYnYPHMArevkToQ",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-12-19",
    type: EventType.FESTIVAL,
    title: "[KBS] 2024 뮤직뱅크 글로벌 페스티벌 in JAPAN",
    country: "JP",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-22",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] XBlush Magazine Photoshoot Behind",
    linkedContents: [
      {
        title:
          "화보 위시 좋은 이유…💭 다 예뻐서 감동이 심함➰🫢 | 画報ウィッシュが良い理由… みんな綺麗で超感動🫠 | XBlush Magazine Photoshoot Behind",
        url: "https://youtu.be/VRcIEyGNmJ8?si=vHp8wPDMjpM6PHeI",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-24",
    type: EventType.ONLINE_CONTENT,
    title: "[Christmas] WISHFUL CHRISTMAS",
    linkedContents: [
      {
        title:
          "크리스마스 하나도 기대 안된다 징글징글 𝓙𝓲𝓷𝓰𝓵𝓮 𝓑𝓮𝓵𝓵 𝓡𝓸𝓬𝓴 ִׂ ٭🔔 | クリスマスなんて全然楽しみじゃない (?)🎄 | WISHFUL CHRISTMAS❄️",
        url: "https://youtu.be/OMbQlLCmw84?si=uPCMZnRqHm1ztbrt",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-12-25",
    type: EventType.RELEASE,
    title: "[Physical] Japan 1st Album 'WISHFUL' 음반 발매",
    description:
      'NCT WISH의 일본 정규 1집. 크리스마스 선물 같은 앨범. 타이틀곡 "Wishful Winter".',
    country: "JP",
    albumTitle: "WISHFUL",
    relatedUrl: "https://nct-jp.net/discography/detail.php?id=1020650",
  },
  {
    date: "2024-12-25",
    time: "17:10",
    type: EventType.FESTIVAL,
    title: "[SBS] 2024 SBS 가요대전: Merry Music",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    albumTitle: "Steady",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-27",
    time: "19:00",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2024 아시아 아티스트 어워즈 in BANGKOK (2024 AAA)",
    location: "임팩트 챌린저 홀 1-2",
    country: "TH",
    city: "방콕 (Bangkok)",
    albumTitle: "Steady",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-30",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 제66회 일본 레코드 대상 (The Japan Record Awards)",
    description: "일본 TBS 생방송. 신인상 수상의 영예.",
    location: "신국립극장",
    country: "JP",
    city: "도쿄 (Tokyo)",
    musicShowResult: {
      rank: 0,
      note: "The 66th Japan Record Awards - New Artist Award",
    },
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-31",
    type: EventType.FESTIVAL,
    title: "[MBC] 2024 MBC 가요대제전",
    location: "상암 MBC 프리즘타워",
    country: "KR",
    city: "서울 (Seoul)",
    albumTitle: "Steady",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-31",
    type: EventType.MUSIC_SHOW,
    title:
      "[TBS] CDTV 라이브! 라이브! 스페셜! 2024→2025 (ＣＤＴＶライブ！ライブ！年越しスペシャル！２０２４→ ２０２５)",
    country: "JP",
    description: "TBS 연말 음악 프로그램 출연.",
    appearance: {
      programName: "CDTV 라이브! 라이브!",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1109786",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },

  // ==========================================
  // 화보 및 매거진 (2024)
  // ==========================================
  {
    date: "2024-12-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] XBlush 겨울호",
    description: "XBlush 겨울호 화보 (리쿠 제외)",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-12-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 엘르걸 12월호",
    description: "엘르걸 12월호 화보",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
];
