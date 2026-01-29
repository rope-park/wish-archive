// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events2025: EventInput[] = [
  // ==========================================
  // JANUARY 2025
  // ==========================================
  {
    date: "2025-01-05",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 제39회 골든디스크 어워즈",
    description: "신인상 수상 및 Wish, Steady 무대",
    location: "미즈호 PayPay 돔 후쿠오카",
    country: "JP",
    city: "후쿠오카 (Fukuoka)",
    appearance: {
      programName: "Golden Disc Awards",
      episode: "39회",
      isPerformance: true,
      performedTrack: "Steady",
      role: "수상자",
    },
    musicShowResult: {
      rank: 1,
      score: 0,
      note: "Rookie Artist of the Year (신인상) 수상 🏆",
    },
    linkedContents: [
      {
        title:
          "[골든디스크 백스테이지] 엔시티 위시 (NCT WISH)｜The 39th Golden Disc Awards",
        url: "https://www.youtube.com/watch?v=5raMZkv_gXE",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-01-11",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in SEOUL : SMCU PALACE (Day 1)",
    description: "SM 30주년 기념 콘서트 (Day 1)",
    location: "고척 스카이돔",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-01-12",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in SEOUL : SMCU PALACE (Day 2)",
    description: "SM 30주년 기념 콘서트 (Day 2)",
    location: "고척 스카이돔",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-01-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Teaser] Miracle MV Teaser",
    description: "Miracle 뮤직비디오 티저",
    albumTitle: "Miracle",
  },
  {
    date: "2025-01-22",
    time: "18:00",
    type: EventType.RELEASE,
    title: "[Album] 선공개 싱글 《Miracle》 음원 공개",
    country: "KR",
    albumTitle: "Miracle",
    participants: {
      type: "ABSENT",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2025-01-22",
    time: "18:30",
    type: EventType.EVENT,
    title: "[Event] 멜론뮤직 MUSIC WAVE 채팅 이벤트",
  },
  {
    date: "2025-01-23",
    time: "18:00",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    country: "KR",
    albumTitle: "Miracle",
    appearance: {
      programName: "엠카운트다운",
      isPerformance: true,
      performedTrack: "Miracle",
    },
  },
  {
    date: "2025-01-24",
    time: "17:05",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    country: "KR",
    albumTitle: "Miracle",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "Miracle",
    },
  },
  {
    date: "2025-01-25",
    time: "15:15",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    country: "KR",
    albumTitle: "Miracle",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Miracle",
    },
  },
  {
    date: "2025-01-25",
    time: "18:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISHFUL' 발매 기념 VIDEO CALL EVENT - 위드뮤",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-01-25",
    time: "20:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISHFUL' 발매 기념 VIDEO CALL EVENT - 애플뮤직",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-01-26",
    time: "15:20",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    description: "음악방송 출연",
    country: "KR",
    albumTitle: "Miracle",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Miracle",
    },
  },

  // ==========================================
  // FEBRUARY 2025
  // ==========================================
  {
    date: "2025-02-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH 1st AWARDS",
    description: "위시의 첫 번째 시상식 콘텐츠",
    linkedContents: [
      {
        title: "WISH 1st AWARDS🏆",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-02-23",
    type: EventType.ONLINE_CONTENT,
    title: "[YouTube] [Replay] WISHful Birthday",
    description: "NCT WISH 데뷔 1주년 기념 생일 파티 리플레이",
    linkedContents: [
      {
        title: "[Replay] WISHful Birthday",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-02-03",
    type: EventType.ANNOUNCEMENT,
    title: "[Ticket] LOG in JAKARTA 선예매 (Membership)",
    description: "자카르타 공연 위버스 멤버십 선예매 오픈",
    country: "ID",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://weverse.io/nctwish/notice/24218",
        label: "투어 공지",
      },
    ],
  },
  {
    date: "2025-02-05",
    type: EventType.ANNOUNCEMENT,
    title: "[Ticket] LOG in JAKARTA 일반예매",
    description: "자카르타 공연 일반 예매 오픈",
    country: "ID",
  },
  {
    date: "2025-02-14",
    type: EventType.ANNOUNCEMENT,
    title: "[Ticket] LOG in HONG KONG 티켓 오픈",
    description: "홍콩 공연 티켓 예매 오픈 (Cityline)",
    country: "HK",
  },
  {
    date: "2025-02-15",
    type: EventType.ANNOUNCEMENT,
    title: "[Ticket] LOG in BANGKOK 선예매 (Membership)",
    description: "방콕 공연 위버스 멤버십 선예매 오픈",
    country: "TH",
  },
  {
    date: "2025-02-16",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 32주년 한터뮤직어워즈 2024",
    description: "",
    location: "장충체육관",
    country: "KR",
    city: "서울 (Seoul)",
    appearance: {
      programName: "한터뮤직어워즈",
      episode: "32주년",
    },
  },
  {
    date: "2025-02-21",
    type: EventType.ANNIVERSARY,
    milestone: true,
    title: "[Anniversary] NCT WISH 데뷔 1주년",
  },
  {
    date: "2025-02-22",
    time: "18:00",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 제1회 디 어워즈",
    description: "",
    location: "고려대학교 화정체육관",
    country: "KR",
    city: "서울 (Seoul)",
  },

  // ==========================================
  // MARCH 2025
  // ==========================================
  {
    date: "2025-03-12",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] LOG in SEOUL Concert Behind",
    description: "LOG in SEOUL 콘서트 비하인드",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    linkedContents: [
      {
        title:
          "LOG in SEOUL 콘서트 비하인드🎤💚 | LOG in SEOULコンサートビハインド🎤💚",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-03-20",
    type: EventType.ANNOUNCEMENT,
    title: "[Pre-order] LOG in SEOUL 공식 MD 예약 판매",
    description: "SMTOWN &STORE 온라인 선주문 시작 (15:00 ~)",
    country: "KR",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://shop-smtown.jp/",
        label: "판매처",
      },
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://nct-jp.net/en/news/detail.php?id=1123651",
        label: "공지 확인",
      },
    ],
  },

  {
    date: "2025-03-21",
    time: "20:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in SEOUL (Day 1)",
    description: "NCT WISH ASIA TOUR 첫 서울 공연 / 미니 2집 수록곡 선공개",
    location: "올림픽공원 핸드볼경기장",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    galleryFolderPath: "nct-wish/events/2025/0321_login_seoul_d1",
    linkedContents: [
      {
        title: "LOG in SEOUL Day 1 하이라이트",
        url: "https://www.youtube.com/watch?v=example_d1",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-03-22",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in SEOUL (Day 2)",
    description: "NCT WISH ASIA TOUR 서울 공연 2일차 (Beyond LIVE 동시 생중계)",
    location: "올림픽공원 핸드볼경기장",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://beyondlive.com/",
        label: "Beyond LIVE",
      },
    ],
  },
  {
    date: "2025-03-23",
    time: "16:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in SEOUL (Day 3)",
    description:
      "NCT WISH ASIA TOUR 서울 공연 마지막 날 (Beyond LIVE 동시 생중계)",
    location: "올림픽공원 핸드볼경기장",
    country: "KR",
    city: "서울 (Seoul)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-03-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH STYLE",
    description:
      "찐 사복 체인지! 아이돌 안 한다는데...!? 사복 입는 부끄러운 위시",
    linkedContents: [
      {
        title:
          "찐 사복 체인지💚 아이돌 안 한다는데…!?😏 사복 입는 부끄러운 위시🫶 | リアル私服チェンジ💚 アイドルしないって言うのに…!?😏私服を着る恥ずかしいWISH🫶",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },

  // ==========================================
  // APRIL 2025
  // ==========================================
  {
    date: "2025-04-04",
    time: "20:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in MACAU (Day 1)",
    description: "NCT WISH ASIA TOUR 마카오 공연 (추가 회차)",
    location: "브로드웨이 시어터 (Broadway Theatre)",
    country: "MO",
    city: "마카오 (Macau)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-04-05",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 유우시 생일",
    description: "Happy Yuushi Day💙",
    participants: {
      type: "ONLY",
      memberNames: ["유우시"],
    },
  },
  {
    date: "2025-04-05",
    time: "20:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in MACAU (Day 2)",
    description: "NCT WISH ASIA TOUR 마카오 공연",
    location: "브로드웨이 시어터 (Broadway Theatre)",
    country: "MO",
    city: "마카오 (Macau)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-04-06",
    time: "17:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in MACAU (Day 3)",
    description: "NCT WISH ASIA TOUR 마카오 공연",
    location: "브로드웨이 시어터 (Broadway Theatre)",
    country: "MO",
    city: "마카오 (Macau)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-04-15",
    type: EventType.ONLINE_CONTENT,
    title: "[Opening] poppop Opening Theme",
    description: "poppop 오프닝 테마 영상",
    linkedContents: [
      {
        title: "poppop Opening Theme🍭",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-04-17",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 레모네이드 톡톡 퀘스천",
    description: "레모네이드를 마시며 질문에 답하는 콘텐츠",
    linkedContents: [
      {
        title: "레모네이드 톡톡 퀘스천💛🍋",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-04-12",
    time: "19:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in MANILA",
    description: "NCT WISH ASIA TOUR 마닐라 공연",
    location: "뉴 프론티어 극장 (New Frontier Theater)",
    country: "PH",
    city: "마닐라 (Manila)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-04-06",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] poppop Arcade EP.1",
    appearance: {
      programName: "poppop Arcade",
      episode: "1화",
    },
  },
  {
    date: "2025-04-07",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] poppop Arcade EP.2",
    appearance: {
      programName: "poppop Arcade",
      episode: "2화",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "유우시", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "긴 다리와 강한 검지만 있음🦵, 뭐든지 이길 수 있어⛵️ | 長い足と強い人差し指さえあれば, 無敵だ🥊",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-04-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 🫧poppop 프로덕션🫧 EP.1",
    appearance: {
      programName: "poppop 프로덕션",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "우리가 애니 속 주인공이 된다고? -ˋˏ 몰랐어 ˎˊ- | 僕たちがアニメの主人公に? -ˋˏ 知らなかった ˎˊ-",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-04-15",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 🫧poppop 프로덕션🫧 EP.2",
    appearance: {
      programName: "poppop 프로덕션",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "나밖에 모르던 절친이… 빌런이 되어 나타났다 ψ(ˆ◝ ·̫ ◜ˆ)ψ | 僕しか知らなかった親友が··· 悪党になって現れたψ",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-04-14",
    type: EventType.RELEASE,
    title: "[Album] 두 번째 미니앨범 《poppop》 발매",
    description: "타이틀곡 'poppop' 및 'Silly Dance' 등 6곡 수록",
    country: "KR",
    albumTitle: "poppop",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://nct-jp.net/en/news/detail.php?id=1123651",
        label: "발매 공지",
      },
    ],
  },
  {
    date: "2025-04-30",
    type: EventType.FESTIVAL,
    title: "[Festival] 서울스프링페스타 WONDER SHOW",
    description: "서울스프링페스타 공연 참여",
    location: "서울상암월드컵경기장",
    country: "KR",
    city: "서울 (Seoul)",
  },

  // ==========================================
  // MAY 2025
  // ==========================================
  {
    date: "2025-05-02",
    time: "21:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in HONG KONG (Day 1)",
    description: "NCT WISH ASIA TOUR 홍콩 공연",
    location: "AsiaWorld-Expo ARENA, Hall 10",
    country: "HK",
    city: "홍콩 (Hong Kong)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-04-27",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] Melt Inside My Bag",
    description: "멤버들의 가방 속 소지품 공개",
    linkedContents: [
      {
        title: "Melt Inside My Bag💼",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-04-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Melted WICHU Inside My Pocket Behind",
    description: "앨범 포토카드 촬영 비하인드",
    linkedContents: [
      {
        title: "[poppop] Melted WICHU Inside My Pocket Behind the Scenes",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-05-03",
    time: "20:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in HONG KONG (Day 2)",
    location: "AsiaWorld-Expo ARENA, Hall 10",
    country: "HK",
    city: "홍콩 (Hong Kong)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-05-10",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in MEXICO CITY",
    description: "SM 30주년 기념 글로벌 콘서트 멕시코 공연",
    location: "에스타디오 GNP 세구로스 (Estadio GNP Seguros)",
    country: "MX",
    city: "멕시코시티 (Mexico City)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-05-11",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 시온 생일",
    description: "Happy SION Day💜",
    participants: {
      type: "ONLY",
      memberNames: ["시온"],
    },
  },
  {
    date: "2025-05-11",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in L.A.",
    description: "SM 30주년 기념 글로벌 콘서트 로스앤젤레스 공연",
    location: "디그니티 헬스 스포츠 파크 (Dignity Health Sports Park)",
    country: "US",
    city: "로스앤젤레스 (Los Angeles)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-05-17",
    time: "18:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in SINGAPORE",
    description: "NCT WISH ASIA TOUR 싱가포르 공연",
    location: "아레나 @ 엑스포 (ARENA @ EXPO, Hall 7)",
    country: "SG",
    city: "싱가포르 (Singapore)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },
  {
    date: "2025-05-24",
    time: "19:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in TAIPEI",
    description: "NCT WISH ASIA TOUR 타이베이 공연",
    location: "타이베이 뮤직 센터 (Taipei Music Center)",
    country: "TW",
    city: "타이베이 (Taipei)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://tmc.taipei/events",
        label: "공연장 정보",
      },
    ],
  },
  {
    date: "2025-05-28",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 아시아 스타 엔터테이너 어워즈 2025 (ASEA 2025)",
    description: "제2회 ASEA 시상식 참석",
    location: "K-아레나 요코하마 (K-Arena Yokohama)",
    country: "JP",
    city: "요코하마 (Yokohama)",
  },
  {
    date: "2025-05-27",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] ONE SUMMER WISH Photoshoot Behind",
    description: "ONE SUMMER WISH 화보 촬영 비하인드",
    linkedContents: [
      {
        title: "ONE SUMMER WISH Photoshoot Behind the Scenes🌊",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-05-31",
    time: "17:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in JAKARTA",
    description: "NCT WISH ASIA TOUR 자카르타 공연",
    location: "테니스 인도어 스니얀 (Tenis Indoor Senayan)",
    country: "ID",
    city: "자카르타 (Jakarta)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
  },

  // ==========================================
  // JUNE 2025
  // ==========================================
  {
    date: "2025-06-01",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 사꾸BAG 꾸!꾸! TIME",
    description: "사쿠야의 가방 꾸미기 콘텐츠",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
    linkedContents: [
      {
        title: "사꾸BAG 꾸!꾸! TIME🎀",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-06-07",
    time: "20:00",
    type: EventType.TOUR,
    title: "[Tour] 2025 NCT WISH ASIA TOUR LOG in BANGKOK",
    description: "NCT WISH ASIA TOUR 방콕 공연 (아시아 투어 피날레)",
    location: "썬더 돔 (Thunder Dome)",
    country: "TH",
    city: "방콕 (Bangkok)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://www.thaiticketmajor.com",
        label: "예매처",
      },
    ],
  },
  {
    date: "2025-06-11",
    type: EventType.FESTIVAL,
    title: "[Festival] 2025 부산 원아시아 페스티벌 BIG 콘서트",
    description: "부산 원아시아 페스티벌 메인 콘서트 참여",
    location: "벡스코 (BEXCO) 제1전시장",
    country: "KR",
    city: "부산 (Busan)",
  },
  {
    date: "2025-06-15",
    type: EventType.FESTIVAL,
    title: "[Festival] 유튜브 펜페스트 코리아 2025",
    description: "유튜브 팬페스트 코리아 2025 참여",
    location: "KBS 아레나 (KBS Arena)",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2025-06-21",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 재희 생일",
    description: "Happy Jaehee Day💚",
    participants: {
      type: "ONLY",
      memberNames: ["재희"],
    },
  },
  {
    date: "2025-06-21",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 제34회 서울가요대상 (Seoul Music Awards)",
  },
  {
    date: "2025-06-28",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 리쿠 생일",
    description: "Happy Riku Day❤️",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2025-06-28",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in LONDON",
    description: "SM 30주년 기념 글로벌 콘서트 런던 공연",
    location: "웨스트필드 런던 아레나 (The O2 Arena)",
    country: "GB",
    city: "런던 (London)",
    seriesName: "SMTOWN LIVE",
  },

  // ==========================================
  // JULY 2025
  // ========================================
  {
    date: "2025-07-06",
    time: "17:30",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심 in JAPAN",
    description: "일본 도쿄에서 개최되는 MBC 쇼! 음악중심 특별 공연 참여",
    location: "베루나 돔 (Belluna Dome)",
    country: "JP",
    city: "사이타마 (Saitama)",
    appearance: {
      programName: "쇼! 음악중심",
    },
  },
  {
    date: "2025-07-26",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 위시힐링스파 EP.1",
    appearance: {
      programName: "위시힐링스파",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "계란을 깨자🥚💥 찜질방 이열치열 DAY🫠 | 卵を割ろう〰️チムジル以熱治熱DAY🔥",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-07-20",
    type: EventType.FANMEETING,
    title:
      "[Fanmeeting] NCTzen WISH-JAPAN FANMEETING 2025 ‘WISH Festival’ (Day 1)",
    description: "NCT WISH 일본 첫 공식 팬미팅 (WISH祭)",
    country: "JP",
    seriesName: "NCTzen WISH-JAPAN FANMEETING 2025",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://nct-jp.net/news/detail.php?id=1112345",
        label: "개최 공지",
      },
    ],
  },
  {
    date: "2025-07-21",
    type: EventType.FANMEETING,
    title:
      "[Fanmeeting] NCTzen WISH-JAPAN FANMEETING 2025 ‘WISH Festival’ (Day 2)",
    description:
      "일본 팬미팅 2일차 / 하반기 일본 홀 투어 & 아시아 투어 일정 깜짝 발표 📢",
    country: "JP",
    seriesName: "NCTzen WISH-JAPAN FANMEETING 2025",
    linkedContents: [
      {
        title: "WISH Festival Highlight",
        url: "https://www.youtube.com/watch?v=example_wish_fes",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-07-26",
    time: "19:00",
    type: EventType.FESTIVAL,
    title: "[Festival] 2025 NOL 페스티벌 SBS 가요대전: Summer",
    description: "한여름의 가요 축제! NCT WISH 스페셜 스테이지",
    location: "킨텍스(KINTEX) 제1전시장",
    country: "KR",
    city: "고양 (Goyang)",
    appearance: {
      programName: "가요대전",
    },
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://weverse.io/nctwish/notice/28639",
        label: "참여 안내",
      },
    ],
  },
  {
    date: "2025-07-29",
    type: EventType.FESTIVAL,
    title: "[Festival] SUMMER DANCE MUSIC FESTIVAL",
    description: "여름 댄스 뮤직 페스티벌 출연",
    location: "EXPO 아레나 '마쓰리(MATSURI)'",
    country: "JP",
    city: "오사카 (Osaka)",
  },

  // ==========================================
  // AUGUST 2025
  // ==========================================
  {
    date: "2025-08-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 위시힐링스파 EP.2",
    appearance: {
      programName: "위시힐링스파",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "찜질방 탐방과♨️ 돌아온 마피아게임👀‼️ | チムジルバン探訪と🔍帰ってきたマフィアゲーム🕵️‍♂️",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-08-04",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 료 생일",
    description: "Happy Ryo Day💛",
    participants: {
      type: "ONLY",
      memberNames: ["료"],
    },
  },
  {
    date: "2025-08-06",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] EVER WISH PICNIC",
    linkedContents: [
      {
        title:
          "위시고 학생들의🪽 여름날 에버랜드 체험학습➰☀️ | ウィッシュ高校生たちの❁ 夏のエバーランド体験学習ミ⛧",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-08-13",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish in Jeju EP.1",
    appearance: {
      programName: "WISH's Wish in Jeju",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "맘껏 좀 설레는 건 어때?🍊 우리만의 제주도! | 思いっきりときめいてみない？😚僕たちだけの済州島で！",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-08-19",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish in Jeju EP.2",
    appearance: {
      programName: "WISH's Wish in Jeju",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "이미 난 갇혔어 너라는 라면 안에서🍜 | 僕はもう閉じ込められたよ🌴君というラーメンの中に♫",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-08-24",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish in Jeju EP.3",
    appearance: {
      programName: "WISH's Wish in Jeju",
      episode: "3화",
    },
    linkedContents: [
      {
        title:
          "게임이 빠지면 Surf Surf하지🥴 웃음이 넘치는 좀비게임🧟 | ゲームがなかったら悲しいでしょ🌙 笑いが溢れるゾンビゲーム",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-08-28",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish in Jeju EP.4",
    appearance: {
      programName: "WISH's Wish in Jeju",
      episode: "4화",
    },
    linkedContents: [
      {
        title:
          "친구처럼 가족처럼 가까운 우리 사이는…😌 자쿠지와 기상 미션🛌 | 友達のように家族のように近い僕たちの関係は…💚",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-08-07",
    type: EventType.ANNOUNCEMENT,
    title: "[Ticket] 1st CONCERT TOUR ‘INTO THE WISH’ in JAPAN",
    description:
      "NCT WISH 첫 번째 일본 투어 SMTOWN OFFICIAL JAPAN 선예매 오픈 (15:00 ~)",
    country: "JP",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://smtown-official.jp/news/detail.php?nid=5h+DUh/gBrc=",
        label: "예매 공지",
      },
    ],
  },
  {
    date: "2025-08-09",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in TOKYO (Day 1)",
    description: "SM 30주년 기념 글로벌 콘서트 도쿄 공연",
    location: "도쿄 돔",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-08-10",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2025 in TOKYO (Day 2)",
    description: "SM 30주년 기념 글로벌 콘서트 도쿄 공연",
    location: "도쿄 돔",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "SMTOWN LIVE",
  },
  {
    date: "2025-08-16",
    type: EventType.FESTIVAL,
    title: "[Festival] NCT WISH 썸머 스테이지 (Summer Stage)",
    description: "캐리비안 베이 야외 파도풀 특설 무대 공연",
    location: "에버랜드 캐리비안 베이",
    country: "KR",
    city: "용인 (Yongin)",
  },
  {
    date: "2025-08-21",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2025 케이 월드 드림 어워즈 (K-WORLD DREAM AWARDS)",
    description: "시상식 참석 및 무대",
    location: "잠실실내체육관",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2025-08-23",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2025 텐센트 뮤직 엔터테인먼트 어워즈 (TMEA)",
    description: "중국 최대 음악 시상식 참석",
    location: "갤럭시 아레나",
    country: "MO",
  },
  {
    date: "2025-08-31",
    time: "13:00",
    type: EventType.FESTIVAL,
    title: "[Festival] a-nation 2025",
    description: "일본 최대 여름 음악 축제 에이네이션 출연",
    location: "아지노모토 스타디움",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "a-nation",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://a-nation.net/en/news/detail.php?id=1127452",
        label: "라인업 공지",
      },
    ],
  },

  // ==========================================
  // SEPTEMBER 2025
  // ==========================================
  {
    date: "2025-08-30",
    type: EventType.ONLINE_CONTENT,
    title: "[Teaser] COLOR MV Teaser",
    description: "COLOR 뮤직비디오 티저",
    albumTitle: "COLOR",
    linkedContents: [
      {
        title: "COLOR MV Teaser",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-09-01",
    type: EventType.RELEASE,
    title: "[Album] 세 번째 미니앨범 《COLOR》 발매",
    description: "타이틀곡 및 다채로운 수록곡 공개 / Lucky Draw 이벤트 시작",
    country: "KR",
    albumTitle: "COLOR",
    externalLinks: [
      {
        type: ExternalLinkType.OFFICIAL,
        url: "https://nct-jp.net/news/detail.php?id=1128100",
        label: "발매 공지",
      },
    ],
  },
  {
    date: "2025-09-14",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH COLOR LAB",
    description: "무채색 세상을 구하기 위해 컬러 진단과 서바이벌 실험",
    linkedContents: [
      {
        title:
          "무채색 세상을 구하기 위해‼️ 컬러 진단과 서바이벌 실험🔫જ♥︎★ | モノクロの世界を救うために😤カラーの診断とサバイバル実験🔬",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-09-02",
    type: EventType.EVENT,
    title: "월간 코엑스 아이콘 (Monthly Coex Icon): NCT WISH",
    description:
      "미니 3집 발매 기념 팬 이벤트 (INTO THE PALETTE) 및 스페셜 스테이지 (WISH ON STAGE)",
    location: "코엑스 동측 광장",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2025-09-19",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Baby Blue MV Behind",
    linkedContents: [
      {
        title:
          "영화 같았던 Baby Blue 현장👔🎬 | 映画のようだった『Baby Blue』の撮影現場👔🎬",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
    albumTitle: "COLOR",
  },
  {
    date: "2025-09-20",
    type: EventType.AWARD_SHOW,
    title: "[Award Show] 2025 더팩트 뮤직 어워즈 (THE FACT MUSIC AWARDS)",
    description: "시상식 참석 및 무대",
    location: "마카오 아웃도어 퍼포먼스 베뉴",
    country: "MO",
  },

  // ==========================================
  // OCTOBER 2025
  // ==========================================
  {
    date: "2025-10-16",
    type: EventType.ONLINE_CONTENT,
    title: "[Recording] NCT WISH 'COLOR' Recording Behind the Scenes",
    description: "COLOR 녹음 비하인드",
    albumTitle: "COLOR",
    linkedContents: [
      {
        title: "NCT WISH 'COLOR' Recording Behind the Scenes",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.RECORDING,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 24hr RELAY CAM - 시간 정하기",
    appearance: {
      programName: "NCT WISH 24hr RELAY CAM",
      episode: "시간 정하기",
    },
    linkedContents: [
      {
        title:
          "위시의 온 세상 하루 다 담아버리기🌍🎬 | WISHの1日全部撮っちゃう🌍🎬",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-04",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 24hr RELAY CAM - JAEHEE 6AM-10AM",
    appearance: {
      programName: "NCT WISH 24hr RELAY CAM",
      episode: "JAEHEE 6AM-10AM",
    },
    participants: {
      type: "ONLY",
      memberNames: ["재희"],
    },
    linkedContents: [
      {
        title: "재희의 아침🌅 (6AM-10AM) | JAEHEEの朝🌅",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 24hr RELAY CAM - RIKU 10AM-2PM",
    appearance: {
      programName: "NCT WISH 24hr RELAY CAM",
      episode: "RIKU 10AM-2PM",
    },
    participants: {
      type: "ONLY",
      memberNames: ["리쿠"],
    },
    linkedContents: [
      {
        title: "리쿠의 브런치타임🍽️ (10AM-2PM) | RIKUのブランチタイム🍽️",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-06",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 24hr RELAY CAM - RYO 2PM-4PM",
    appearance: {
      programName: "NCT WISH 24hr RELAY CAM",
      episode: "RYO 2PM-4PM",
    },
    participants: {
      type: "ONLY",
      memberNames: ["료", "사쿠야", "시온"],
    },
    linkedContents: [
      {
        title:
          "료의 오후☀️ (2PM-4PM) with 사쿠야 & 시온 | RYOの午後☀️ with SAKUYA & SION",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-07",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 24hr RELAY CAM - YUSHI 4PM-8PM",
    appearance: {
      programName: "NCT WISH 24hr RELAY CAM",
      episode: "YUSHI 4PM-8PM",
    },
    participants: {
      type: "ONLY",
      memberNames: ["유우시", "리쿠"],
    },
    linkedContents: [
      {
        title: "유우시의 저녁🌆 (4PM-8PM) with 리쿠 | YUSHIの夕方🌆 with RIKU",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-08",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 24hr RELAY CAM - SAKUYA 8PM-12AM",
    appearance: {
      programName: "NCT WISH 24hr RELAY CAM",
      episode: "SAKUYA 8PM-12AM",
    },
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야", "유우시", "료"],
    },
    linkedContents: [
      {
        title:
          "사쿠야의 밤🌙 (8PM-12AM) with 유시 & 료 | SAKUYAの夜🌙 with YUSHI & RYO",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 24hr RELAY CAM - SION 12AM-4AM",
    appearance: {
      programName: "NCT WISH 24hr RELAY CAM",
      episode: "SION 12AM-4AM",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "료"],
    },
    linkedContents: [
      {
        title: "시온의 새벽🌌 (12AM-4AM) with 료 | SIONの深夜🌌 with RYO",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] NCT WISH 24hr RELAY CAM - RYO 4AM-6AM",
    appearance: {
      programName: "NCT WISH 24hr RELAY CAM",
      episode: "RYO 4AM-6AM",
    },
    participants: {
      type: "ONLY",
      memberNames: ["료", "사쿠야"],
    },
    linkedContents: [
      {
        title: "료의 새벽🌄 (4AM-6AM) with 사쿠야 | RYOの早朝🌄 with SAKUYA",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2025-10-10",
    time: "18:00",
    type: EventType.FESTIVAL,
    title: "[Festival] 2025 APEC 뮤직 페스타 (APEC Music Festa)",
    description: "APEC 정상회의 기념 음악 축제 출연",
    location: "경주시민운동장",
    country: "KR",
    city: "경주 (Gyeongju)",
  },
  {
    date: "2025-10-31",
    time: "19:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in INCHEON (Day 1)',
    description: "NCT WISH 첫 번째 콘서트 투어 인천 공연 (Day 1)",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },

  // ==========================================
  // NOVEMBER 2025
  // ==========================================
  {
    date: "2025-11-01",
    time: "17:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in INCHEON (Day 2)',
    description: "NCT WISH 첫 번째 콘서트 투어 인천 공연 (Day 2)",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-02",
    time: "16:00",
    type: EventType.TOUR,
    title:
      '[Tour] 1st CONCERT TOUR "INTO THE WISH : Our WISH" in INCHEON (Day 3)',
    description: "NCT WISH 첫 번째 콘서트 투어 인천 공연 (Day 3)",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    seriesName: '1st CONCERT TOUR "INTO THE WISH"',
  },
  {
    date: "2025-11-18",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 사쿠야 생일",
    description: "Happy SAKUYA Day🩷",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
  },

  // ==========================================
  // 연말 방송 (2025 예정)
  // ==========================================
  {
    date: "2025-12-31",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 2025 SBS 가요대전",
    country: "KR",
  },

  // ==========================================
  // 광고 및 브랜드 콜라보 (2025)
  // ==========================================
  {
    date: "2025-01-01",
    type: EventType.CF_AD,
    title: "[CF] 넘버즈인 (numbuzin)",
    description: "넘버즈인 화장품 광고 모델",
    country: "KR",
  },
  {
    date: "2025-01-01",
    type: EventType.CF_AD,
    title: "[CF] CipiCipi",
    description: "CipiCipi 화장품 광고 모델",
    country: "KR",
  },

  // ==========================================
  // 화보 및 매거진 (2025)
  // ==========================================
  {
    date: "2025-05-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 아레나 옴므 플러스 5월호",
    description: "아레나 옴므 플러스 5월호 화보",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠", "유우시"],
    },
  },
  {
    date: "2025-06-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 엘르맨 6월호 (ISSUE 17)",
    description: "엘르맨 6월호 화보",
  },
  {
    date: "2025-06-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 엘르걸 6월호",
    description: "엘르걸 6월호 화보",
  },
  {
    date: "2025-08-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] DICON VOLUME N°25",
    description: "DICON VOLUME N°25 화보",
  },
  {
    date: "2025-08-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 데이즈드 코리아 8월호 (커버)",
    description: "데이즈드 코리아 8월호 커버 및 화보",
  },

  // ==========================================
  // 팝업 스토어 (2025)
  // ==========================================
  {
    date: "2025-05-15",
    startDate: "2025-05-15",
    endDate: "2025-06-01",
    type: EventType.POPUP_STORE,
    title: "[Pop-up] ONE SUMMER WISH",
    description: "ONE SUMMER WISH 팝업 스토어",
    location: "서울특별시 용산구 한남동 744-19",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2025-09-02",
    startDate: "2025-09-02",
    endDate: "2025-09-09",
    type: EventType.POPUP_STORE,
    title: "[Pop-up] FIND YOUR COLOR",
    description: "FIND YOUR COLOR 팝업 스토어",
    location: "COLOR TOWN & ARCADE (성수동)",
    country: "KR",
    city: "서울 (Seoul)",
  },

  // ==========================================
  // 특별 무대 (Special Stages - 2025)
  // ==========================================
  {
    date: "2025-07-26",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 2025 SBS 가요대전: Summer - 내 얘길 들어봐 (파파야 커버)",
    description: '파파야 "내 얘길 들어봐" 특별 무대',
    country: "KR",
    appearance: {
      isPerformance: true,
    },
  },
  {
    date: "2025-12-25",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 2025 SBS 가요대전: Golden Loop - TT (TWICE 커버)",
    description: 'TWICE "TT" 특별 무대',
    country: "KR",
    appearance: {
      isPerformance: true,
    },
  },
];
