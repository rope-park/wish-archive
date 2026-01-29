// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events2024: EventInput[] = [
  // ==========================================
  // JANUARY 2024
  // ==========================================
  {
    date: "2024-01-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Choreography] Akanen Choreography Workshop",
    description: "Lola Brooke - Just Relax & keshi - GET IT 안무 워크숍.",
    participants: { type: "ONLY", memberNames: ["시온", "리쿠", "유우시"] },
    linkedContents: [
      {
        title: "Akanen Choreography Workshop",
        url: "https://youtu.be/bdd-8pSzy14",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-18",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 팀명 'NCT WISH' 공식 발표",
    description:
      "그룹명 'NCT WISH' 공식 발표. 'WISH for Our WISH'라는 캐치프레이즈 공개. 멤버들과 팬들의 간절한 소망이 맞닿아 탄생한 팀을 의미.",
  },
  {
    date: "2024-01-18",
    type: EventType.RELEASE,
    title: "[Concept Film] NCT WISH : WISH for Our WISH",
    description: "NCT WISH 세계관 영상",
    linkedContents: [
      {
        title: "NCT WISH : WISH for Our WISH",
        url: "https://youtu.be/E8AQO8-ih30",
        type: ContentType.CONCEPT_FILM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-19",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] Now #NCTWISH is here",
    description: "NCT WISH 로고 모션 숏폼 공개",
    linkedContents: [
      {
        title: "Now #NCTWISH is here",
        url: "https://www.youtube.com/watch?v=5YpFHGZYCLI",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-22",
    type: EventType.RELEASE,
    title: "[Teaser] NCT : Dream Contact 'Our WISH' Teaser",
    description: "NCT 세계관(꿈) 합류 스토리 티저 영상",
    linkedContents: [
      {
        title: "NCT : Dream Contact 'Our WISH' Teaser",
        url: "https://youtu.be/VGpahj-nSBs",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-23",
    type: EventType.RELEASE,
    title: "[Concept Film] NCT : Dream Contact 'Our WISH'",
    description: "NCT 세계관(꿈) 합류 스토리 본편 영상",
    linkedContents: [
      {
        title: "NCT : Dream Contact 'Our WISH'",
        url: "https://youtu.be/f8Q9Cop0Tgo",
        type: ContentType.CONCEPT_FILM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-28",
    type: EventType.RELEASE,
    title: "[Teaser] NASA",
    description:
      "프리 데뷔 기간과 정식 데뷔를 잇는 브릿지 트랙 'NASA' 티저 및 숏폼 공개.",
    linkedContents: [
      {
        title: "We goin’ up like NASA 🛰 TONIGHT 0AM (KST)",
        url: "https://www.youtube.com/watch?v=kbA9BRdNMpg",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
      {
        title: "3, 2, 1 Let’s go! 🚀 #NCTWISH #NASA",
        url: "https://www.youtube.com/watch?v=qKS3DmnHhyU",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-29",
    time: "00:00",
    type: EventType.RELEASE,
    title: "[Performance] NASA Performance Video",
    description:
      "프리 데뷔 기간과 정식 데뷔를 잇는 브릿지 트랙. 데뷔를 향한 NCT WISH의 열정과 포부를 담은 곡.",
    linkedContents: [
      {
        title: "NCT WISH 엔시티 위시 'NASA' Performance Video",
        url: "https://youtu.be/SzMU3RUGvEQ",
        type: ContentType.PERFORMANCE_VIDEO,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-29",
    type: EventType.RELEASE,
    title: "[Dance Practice] NASA Dance Practice (Moving Ver.)",
    linkedContents: [
      {
        title: "NCT WISH 엔시티 위시 'NASA' Dance Practice (Moving Ver.)",
        url: "https://youtu.be/A-NgmnHRSwk",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-01-30",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 도쿄돔 데뷔 무대 확정",
    description: "2월 SMTOWN LIVE를 통한 데뷔 무대 공식화",
    relatedUrl: "https://nct-jp.net/ko/news/detail.php?id=1114009",
  },
  {
    date: "2024-01-31",
    type: EventType.RELEASE,
    title: "[Teaser] WISH BAKERY",
    appearance: {
      programName: "WISH BAKERY",
      episode: "Teaser",
    },
    linkedContents: [
      {
        title: "WISH BAKERY🧁 #NCTWISH #WISHBAKERY",
        url: "https://www.youtube.com/watch?v=qw31oW5aW_w",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },

  // ==========================================
  // FEBRUARY 2024
  // ==========================================
  {
    date: "2024-02-01",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH BAKERY EP.1",
    description: "RIKU & SION | 면접을 보러 왔습니다...👀",
    appearance: {
      programName: "WISH BAKERY",
      episode: "1화",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "🥐 RIKU&SION | 面接を受けに来ました…👀 | 여기 면접 보러 왔는데요..💬 | WISH BAKERY EP.1",
        url: "https://www.youtube.com/watch?v=V536H4yPHGY",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH BAKERY EP.2",
    description: "YUSHI & JAEHEE | 저분 어떠신 것 같아요 사장님?🔍",
    appearance: {
      programName: "WISH BAKERY",
      episode: "2화",
    },
    participants: {
      type: "ONLY",
      memberNames: ["유우시", "재희", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "🍩 YUSHI&JAEHEE | あの方どうでしたか？🔍 | 저분 어떠신 것 같아요 사장님?💁✨ | WISH BAKERY EP.2",
        url: "https://www.youtube.com/watch?v=AqycNBTkr44",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-02",
    time: "19:00",
    type: EventType.RADIO,
    title: "[J-WAVE] START LINE (코멘트)",
    description:
      "16:30~20:00 방송 중 19:00경 'MILA'S TOO MUCH K-POP INFORMATION' 코너 코멘트 출연.",
    country: "JP",
    appearance: {
      programName: "스타트 라인",
      role: "Comment",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1104519",
    linkedContents: [
      {
        title: "J-WAVE 비하인드 사진",
        url: "https://x.com/nctwishofficial/status/1754128127922737185",
        type: ContentType.BEHIND,
        platform: Platform.X_TWITTER,
      },
    ],
  },
  {
    date: "2024-02-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH BAKERY EP.3",
    description: "RYO & SAKUYA | 빵은 좋아하는 게 아니라 사랑하는 겁니다💗",
    appearance: {
      programName: "WISH BAKERY",
      episode: "3화",
    },
    linkedContents: [
      {
        title:
          "🧁 RYO&SAKUYA | パンは好きなのではなく愛するのです 🥨 | 빵은 좋아하는 게 아니라 사랑하는 겁니다💗 | WISH BAKERY EP.3",
        url: "https://www.youtube.com/watch?v=q_tzcoHWLdE",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-04",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] #loveyoulike I do ❤️‍🔥",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠", "유우시", "료", "사쿠야"],
    },
    linkedContents: [
      {
        title: "#loveyoulike I do ❤️‍🔥 #NCTWISH",
        url: "https://www.youtube.com/watch?v=5Oi_SkiLo-8",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] keep vibin’ in #Barcelona 🔥",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠", "유우시"],
    },
    linkedContents: [
      {
        title: "keep vibin’ in #Barcelona 🔥 #NCTWISH",
        url: "https://www.youtube.com/watch?v=m5iA8P8m2iU",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-07",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] DAZED KOREA Photoshoot",
    description: "DAZED KOREA 화보 촬영 비하인드",
    linkedContents: [
      {
        title:
          "よく合ってると思います, 僕たちの顔が🤜💥🤛 | 잘 맞는 것 같아요 우리 얼굴👥✌️ | DAZED KOREA Photoshoot Behind",
        url: "https://www.youtube.com/watch?v=fUXZrreN2uk",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] Made by SAKUYA",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
    linkedContents: [
      {
        title: "𝙈𝙖𝙙𝙚 𝙗𝙮 #SAKUYA ❀° 🎬#YUSHI",
        url: "https://www.youtube.com/watch?v=wObNfPKNknE",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 𝙨𝙩𝙚𝙥, 𝙨𝙩𝙚𝙥.ᐟ",
    linkedContents: [
      {
        title: "𝙨𝙩𝙚𝙥, 𝙨𝙩𝙚𝙥.ᐟ #NCTWISH",
        url: "https://www.youtube.com/watch?v=rlH-Fqbh8VY",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] so call me maybe ◡̈ #SAKUYA",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
    linkedContents: [
      {
        title: "so call me maybe ◡̈ #SAKUYA #사쿠야 #サクヤ #NCTWISH",
        url: "https://www.youtube.com/watch?v=N71qnCj1BsU",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] WIGGLE˚₊ · »-♡→",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠"],
    },
    linkedContents: [
      {
        title: "WIGGLE˚₊ · »-♡→ #SION #RIKU",
        url: "https://www.youtube.com/watch?v=Sa5WGvrYVXA",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] WISH for Our WISH",
    description: "NCT WISH 세계관 영상 촬영 비하인드",
    linkedContents: [
      {
        title:
          "トムヤムクン😋👍 ワイヤーにも乗ってみたよ💨 | 똠얌꿍 อร่อย😍 와이어 타고 비도 맞고☔️ | NCT WISH : WISH for Our WISH Behind the Scenes",
        url: "https://www.youtube.com/watch?v=m7iEXdTQ2ZU",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-13",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Dream Contact 'Our WISH'",
    description: "NCT : Dream Contact Our WISH 촬영 비하인드",
    linkedContents: [
      {
        title:
          "笑ってしまうほど楽しい撮影🤩 | 웃음이 터질 정도로🤣 재밌는 촬영〰 (feat.시장 구경) | NCT : Dream Contact 'Our WISH' Behind the Scenes",
        url: "https://www.youtube.com/watch?v=qSZ4vcYxYUY",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-13",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🐈🐈‍⬛✮⋆˙",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "유우시"],
    },
    linkedContents: [
      {
        title: "🐈🐈‍⬛✮⋆˙ #RIKU #YUSHI",
        url: "https://www.youtube.com/watch?v=78HRYGIb5tU",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-13",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🫶🏻🫶🏻🫶🏻",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "재희", "료"],
    },
    linkedContents: [
      {
        title:
          "🫶🏻🫶🏻🫶🏻#SION #JAEHEE #RYO #시온 #재희 #료#シオン #ジェヒ #リョウ #NCTWISH",
        url: "https://www.youtube.com/watch?v=Gj7gwiFoCgE",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-14",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 발렌타인 데이 기념 숏폼",
    linkedContents: [
      {
        title: "𝙨𝙞𝙜𝙣을 보내 𝙨𝙞𝙜𝙣𝙖𝙡 보내જ⁀➴💘 #NCTWISH",
        url: "https://www.youtube.com/watch?v=NCHYxPbp2gY",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
        cast: ["유우시", "료", "사쿠야"],
      },
      {
        title: "Where’s ma CUPID 🏹♥️ #NCTWISH",
        url: "https://www.youtube.com/watch?v=9Ms4e8XI15Q",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "재희"],
      },
      {
        title: "6️⃣ sweet cuties just rolled in〰️🍫💘 #NCTWISH",
        url: "https://www.youtube.com/watch?v=nJjY_OBTufw",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-14",
    type: EventType.ANNOUNCEMENT,
    title: "[Pre-order] 싱글 1집 《WISH》",
    description: "싱글 1집 예약 판매 시작 (Photobook / WICHU Ver.)",
    relatedUrl: "" /* TODO: 링크 추가 필요 */,
    albumTitle: "WISH",
  },
  {
    date: "2024-02-15",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] NASA Performance Video",
    description: "NASA 퍼포먼스 비디오 촬영 비하인드",
    linkedContents: [
      {
        title:
          "宇宙人になった気分🚀 爆竹もバンバン☄️ | 우주인이 된 기분👩‍🚀 폭죽도 빵빵💥 | 'NASA' Performance Video Behind the Scenes",
        url: "https://www.youtube.com/watch?v=upBjyIkuQPk",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-18",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🅛♥🅥🅴 🅨♥🅤",
    participants: {
      type: "ONLY",
      memberNames: ["유우시"],
    },
    linkedContents: [
      {
        title: "🅛♥🅥🅴 🅨♥🅤 #YUSHI #유우시 #ユウシ #NCTWISH",
        url: "https://www.youtube.com/watch?v=Z48E8q03Frk",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-18",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] ミ⛦ 𝙒𝙞𝙘𝙠𝙚𝙙x3",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "유우시", "료"],
    },
    linkedContents: [
      {
        title:
          "ミ⛦ 𝙒𝙞𝙘𝙠𝙚𝙙x3 #SION #YUSHI #RYO #시온 #유우시 #료 #シオン #ユウシ #リョウ #NCTWISH",
        url: "https://www.youtube.com/watch?v=SjuzXJlX364",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-18",
    type: EventType.RELEASE,
    title: "[Teaser] Our WISH is in this city",
    description: "데뷔 싱글 WISH 프로모션 티저",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "Our WISH is in this city",
        url: "https://www.youtube.com/watch?v=xtiVrcw-QSo",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🐈🌼vibe",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "유우시"],
    },
    linkedContents: [
      {
        title: "🐈🌼vibe#SION #YUSHI #시온 #유우시#シオン #ユウシ#NCTWISH",
        url: "https://www.youtube.com/watch?v=szIAgp1WdB0",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] Give me all ❤︎",
    linkedContents: [
      {
        title: "Give me all ❤︎ #NCTWISH",
        url: "https://www.youtube.com/watch?v=eM2MDZDXL9Y",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🤍 don’t stand a chance",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "료", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "🤍 don’t stand a chance #RIKU #RYO #SAKUYA #리쿠 #료 #사쿠야#リク #リョウ #サクヤ #NCTWISH",
        url: "https://www.youtube.com/watch?v=EAegPfsRQrE",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🤎💛°•🌷",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠", "유우시"],
    },
    linkedContents: [
      {
        title:
          "🤎💛°•🌷#SION #RIKU #YUSHI #시온 #리쿠 #유우시#シオン #リク #ユウシ#NCTWISH",
        url: "https://www.youtube.com/watch?v=kIwBX4WM9WY",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] Can you come through?",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "유우시"],
    },
    linkedContents: [
      {
        title:
          "Can you come through? #SION #YUSHI #시온 #유우시 #シオン #ユウシ #NCTWISH",
        url: "https://www.youtube.com/watch?v=A_Ua-mByGa4",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-21",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2024 SMCU PALACE @ TOKYO (Day 1)",
    description: "NCT WISH 공식 데뷔 무대. WISH 무대 선공개.",
    location: "도쿄돔",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "SMTOWN LIVE",
    albumTitle: "WISH",
    milestone: true,
    linkedContents: [
      {
        title:
          "NCT WISH 엔시티 위시 'WISH' @SMTOWN LIVE 2024 SMCU PALACE @TOKYO",
        url: "https://www.youtube.com/watch?v=bR8BxxcmxJY",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "NCT WISH 엔시티 위시 'U (by SUPER JUNIOR)' Dance Practice (SMTOWN Ver.)",
        url: "https://www.youtube.com/watch?v=5c5vbB2HQWo",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-21",
    type: EventType.ANNIVERSARY,
    title: "[Anniversary] NCT WISH 데뷔",
    description: "NCT WISH 공식 데뷔일",
    milestone: true,
  },
  {
    date: "2024-02-22",
    type: EventType.CONCERT,
    title: "[Concert] SMTOWN LIVE 2024 SMCU PALACE @ TOKYO (Day 2)",
    description: "SMTOWN LIVE 도쿄 공연 2일차",
    location: "도쿄돔",
    country: "JP",
    city: "도쿄 (Tokyo)",
    seriesName: "SMTOWN LIVE",
    albumTitle: "WISH",
  },
  {
    date: "2024-02-23",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] WISH 챌린지 #NCTWISH_WISH",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "𝙇𝙚𝙩’𝙨 𝙒𝙞𝙨𝙝 𝙞𝙩 𝙪𝙥 𝙗𝙖𝙗𝙮✮⋆˙ #NCTWISH #WISH #NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=TDOoaq0Dk_s",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "Let’s go! Fly high in the air🐈‍⬛🐱🌷✶ ࣪˖࿐ * #SION #RIKU#NCTWISH #WISH #NCTWISH_WISH #TEN#NCT #WayV",
        url: "https://www.youtube.com/watch?v=dlqYNxTDaVc",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠"],
      },
      {
        title:
          "🦭WISH it up, right now🦊#RYO #료 #リョウ #RENJUN #NCTWISH #WISH #NCTWISH_WISH #NCT #NCTDREAM",
        url: "https://www.youtube.com/watch?v=FqevjxcGS2o",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["료"],
      },
      {
        title:
          "#ItsMyWISH 🤍 눈 떠봐, 세계가 변하잖아 ✰⋆｡ #RYO #SAKUYA #NCTWISH #WISH #NCTWISH_WISH #WENDY #JOY #RedVelvet",
        url: "https://www.youtube.com/watch?v=YHbBSKTlkBY",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["료", "사쿠야"],
      },
      {
        title:
          "#ItsMyWISH 눈 떠봐 👀 세계가 변하잖아 🌐#SION #NCTWISH #WISH #NCTWISH_WISH #EUNSEOK #WONBIN #RIIZE",
        url: "https://www.youtube.com/watch?v=eV8Ll5Q7RhI",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
    ],
  },
  {
    date: "2024-02-23",
    type: EventType.ONLINE_CONTENT,
    title: "[Concept Film] Welcome to Cupid Scouting Society!",
    description: "NCT WISH 큐피드 스카우팅 소사이어티 입단식",
    linkedContents: [
      {
        title: "NCT WISH : Welcome to Cupid Scouting Society!",
        url: "https://www.youtube.com/watch?v=9jG8L0C-tSg",
        type: ContentType.CONCEPT_FILM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-24",
    type: EventType.MUSIC_SHOW,
    title: "[NHK] Venue101",
    description:
      '일본 NHK 음악 프로그램 생방송 출연. "WISH (Japanese Ver.)" 일본 음악방송 첫 무대 공개.',
    country: "JP",
    albumTitle: "WISH",
    appearance: {
      programName: "Venue101",
      isPerformance: true,
      performedTrack: "WISH (Japanese Ver.)",
      role: "Guest",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1104832",
  },
  {
    date: "2024-02-24",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] WISH 챌린지 #NCTWISH_WISH with SM 아티스트",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "#ItsMyWISH Let’s go✨Fly high in the air🚀#RYO #SAKUYA #NCTWISH #WISH #EUNHYUK #DONGHAE #SUPERJUNIOR",
        url: "https://www.youtube.com/watch?v=iZrCy-eEEPI",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["료", "사쿠야"],
      },
      {
        title:
          "#ItsMyWISH 風に乗って✿ₒ˚ #YUSHI#NCTWISH #WISH #NCTWISH_WISH #SHOTARO #RIIZE",
        url: "https://www.youtube.com/watch?v=hjKDwwgp2WE",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title:
          "💛🤙💫#SION #YUSHI#시온 #유우시 #シオン #ユウシ#NCTWISH#WISH #NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=TCyCbPElEnE",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
        cast: ["시온", "유우시"],
      },
      {
        title:
          "⋆⁺₊⋆RIKU & SION⋆⁺₊⋆#SION #RIKU #시온 #리쿠#シオン #リク #NCTWISH #WISH #NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=4tK5W25dvcw",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠"],
      },
      {
        title: "Wish it up🏹 #JAEHEE #RYO #NCTWISH #WISH #NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=yfiKh82N0g0",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["재희", "료"],
      },
      {
        title:
          "#ItsMyWISH Let’s Wish it up baby⭐️🐿️🐣!#RIKU #YUSHI #WINWIN #NCTWISH #WISH #NCTWISH_WISH #NCT #WayV",
        url: "https://www.youtube.com/watch?v=yloINsmHOJs",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["리쿠", "유우시"],
      },
      {
        title:
          "#ItsMyWISH 💗눈 떠봐, 세계가 변하잖아💗#SION #NCTWISH #WISH #NCTWISH_WISH #TAEYEON #GirlsGeneration",
        url: "https://www.youtube.com/watch?v=gP01LLQNWS0",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
      {
        title:
          "#ItsMyWISH ☃️눈 떠봐, 세계가 변하잖아🐿️ #RIKU #NCTWISH #WISH #NCTWISH_WISH #WINTER #aespa",
        url: "https://www.youtube.com/watch?v=2tKnla7lG9I",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
    ],
  },
  {
    date: "2024-02-25",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] WISH 챌린지 #NCTWISH_WISH",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "#ItsMyWISH WISH it up, right now♡ #SION #RIKU #TEN #NCTWISH #WISH #NCTWISH_WISH #NCT #WayV",
        url: "https://www.youtube.com/watch?v=ENXbMchToIw",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠"],
      },
      {
        title:
          "#ItsMyWISH Let’s WISH it up❤️🪽 #SION #JAEHEE #NCTWISH #WISH #NCTWISH_WISH #UKNOW #MAXCHANGMIN #TVXQ",
        url: "https://www.youtube.com/watch?v=Rh_x_wmi8TI",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온", "재희"],
      },
      {
        title:
          "#ItsMyWISH 바람을 타고🐹🌷.·˖* #SION#JISUNG #NCTWISH #WISH #NCTWISH_WISH #NCT #NCTDREAM",
        url: "https://www.youtube.com/watch?v=1lGYz8dWNP4",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
      {
        title:
          "#ItsMyWISH Yeah, We’re another one✌️#YUSHI #NCTWISH #WISH  #NCTWISH_WISH #HYO #GirlsGeneration",
        url: "https://www.youtube.com/watch?v=clzM1ldsPpw",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title:
          "#ItsMyWISH 눈 떠봐 세계가 변하잖아 ໒꒱⋆ﾟ#RIKU #YUSHI #TAEYONG #NCTWISH #WISH #NCTWISH_WISH #NCT #NCT127",
        url: "https://www.youtube.com/watch?v=hbKjrhefS8k",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["리쿠", "유우시"],
      },
    ],
  },
  {
    date: "2024-02-26",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] #WICHU 숏폼 모음",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "Finally we met #WICHU #NCTWISH #WISH #NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=bPBTT_E2SrI",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "#WICHU will always be with you ⋆⭒˚｡⋆ #NCTWISH #WISH #NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=X8E_AxnENHA",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야"],
      },
      {
        title: "Did you see that?🗼͙͘͡.  ★🪽 #WICHU #NCTWISH #WISH #NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=NM-IstRHuao",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-27",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🌀 #NCTWISH 🌀" /* TODO: 이름 변경 */,
    linkedContents: [
      {
        title: "🌀 #NCTWISH 🌀",
        url: "https://www.youtube.com/watch?v=qzxK8GWmp1A",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "👤 : Who’s that sexy bread? 🥐 : That’s me🎀#SAKUYA #사쿠야 #サクヤ #NCTWISH",
        url: "https://www.youtube.com/watch?v=Ogpd_XxHXjg",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야"],
      },
      {
        title: "₍₍ ◝( ˘◡˘)◜ ₎₎#SION #RIKU #시온 #리쿠 #シオン #リク #NCTWISH",
        url: "https://www.youtube.com/watch?v=d6YykmQfKrQ",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠"],
      },
      {
        title: "Dancing 🥐 in Harajuku #SAKUYA #사쿠야 #サクヤ #NCTWISH",
        url: "https://www.youtube.com/watch?v=YTkI7c2pkjM",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야"],
      },
      {
        title:
          "OK? #SION #RIKU #YUSHI #시온 #리쿠 #유우시 #シオン #リク #ユウシ #NCTWISH",
        url: "https://www.youtube.com/watch?v=zD0ueWjqNIc",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "유우시"],
      },
      {
        title:
          "#ItsMyWISH Let’s WISH it up 👼🏻💫 #SION #RIKU #YUSHI #NCTWISH #WISH #NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=9lfjNCZtz18",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "유우시"],
      },
    ],
  },
  {
    date: "2024-02-27",
    type: EventType.RELEASE,
    title: "[Teaser] 'WISH' MV Teaser",
    description: "데뷔 싱글 WISH 타이틀곡 MV 티저 공개",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "'WISH' MV Teaser",
        url: "https://youtu.be/sVzdZeHP3X4",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-27",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] Be My Cupid EP.1",
    description: "오늘은 큐피드 트레이닝 심사 날! 🏹",
    appearance: {
      programName: "Be My Cupid",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "今日はキューピッドトレーニング審査の日！ 🏹  | 오늘은 큐피드 트레이닝 심사 날!💘 | Be My Cupid EP.1",
        url: "https://www.youtube.com/watch?v=Wtfn8P8UYLc",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-28",
    time: "18:00",
    type: EventType.RELEASE,
    title: "[Album] 싱글 1집 《WISH》",
    description: "한/일 동시 발매. 타이틀 'WISH', 수록곡 'Sail Away'",
    milestone: true,
    albumTitle: "WISH",
    linkedContents: [
      /* TODO: 링크 추가 및 분리 필요 */
      {
        title: "'WISH (Korean Ver.)' MV",
        url: "https://youtu.be/hvQZs3k6Ytk",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'WISH (Japanese Ver.)' MV",
        url: "https://youtu.be/ZgrEZmAgzM8",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-28",
    type: EventType.RELEASE,
    title: "[Physical] 일본 싱글 1집 《WISH》",
    description: "일본 내 실물 CD 발매",
    country: "JP",
    albumTitle: "WISH",
  },
  {
    date: "2024-02-28",
    type: EventType.EVENT,
    title: "[Live] NCT WISH 'WISH' Countdown Live",
    description: "데뷔 싱글 발매 기념 카운트다운 라이브",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "[Replay] NCT WISH 'WISH' Countdown Live",
        url: "https://www.youtube.com/watch?v=Vtg5OXcwKkY",
        type: ContentType.LIVE_STREAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-28",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] WISH 챌린지 #NCTWISH_WISH",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "｡ ﾟ꒰ა #ItsMyWISH ໒꒱ ༘*.ﾟ #SION #RYO #SAKUYA #시온  #료 #사쿠야 #シオン #リョウ #サクヤ#NCTWISH #WISH#NCTWISH_WISH",
        url: "https://www.youtube.com/watch?v=S1tjmtStmJo",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["시온", "료", "사쿠야"],
      },
      {
        title: "We are #NCTWISH 💗🩵🪽#NCTWISH #WISH#NCTWISH_WISH#ItsMyWISH",
        url: "https://www.youtube.com/watch?v=Tzee-BWEgT0",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "#ItsMyWISH 風に乗って💫🪽 #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=zmP1h7pATAA",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "#ItsMyWISH 𐙚˙⋆ 🐿️ 🫷🏻🥐 🫷🏻 .˚ ᡣ𐭩 #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=Re7qWlXnNqY",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
        cast: ["리쿠", "사쿠야"],
      },
    ],
  },
  {
    date: "2024-02-28",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] Cupids love dancing in chaos",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "Cupids love dancing in chaos 🏹♥️ #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=IupWWpQRM9E",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-28",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] #illbemissingyou",
    linkedContents: [
      {
        title: "#illbemissingyou 🌅🌴 #NCTWISH",
        url: "https://www.youtube.com/watch?v=E-2snmRL17g",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH Get up👆",
    albumTitle: "WISH",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH Get up👆It's us💫It's too loud💥#NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=eBYPywhr-_Y",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] Cupid パン 🥐ྀི",
    albumTitle: "WISH",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
    linkedContents: [
      {
        title: "Cupid パン 🥐ྀི #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=yog_1OXLyn0",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] ❤︎₊ ⊹🐿️₊ ⊹❤︎",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠"],
    },
    linkedContents: [
      {
        title: "❤︎₊ ⊹🐿️₊ ⊹❤︎ #RIKU #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=muW6D77z5Ts",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH Σ―(〃🐈‍⬛🐈〃)♡→",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "유우시"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH Σ―(〃🐈‍⬛🐈〃)♡→#RIKU #YUSHI #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=fZHpxGcRJMA",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Fanchant] WISH 응원법 가이드",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "앞으로만 가 The WISH’s complete ✨ | NCT WISH 'WISH' Fanchant Guide",
        url: "https://www.youtube.com/watch?v=_kDivZ54X-M",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] b̾o̾o̾m̾ ̾s̾h̾a̾k̾a̾l̾a̾k̾a̾",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠"],
    },
    linkedContents: [
      {
        title: "b̾o̾o̾m̾ ̾s̾h̾a̾k̾a̾l̾a̾k̾a̾ #SION #RIKU #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=Ct3EZj2sXq0",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH 🫸🏻🐿️🦭🫷🏻",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "료"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH 🫸🏻🐿️🦭🫷🏻#RIKU #RYO #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=G_e-jSdcC-w",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-02-29",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] NCT WISH 라디오 코멘트 출연 안내",
    country: "JP",
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1105094",
  },

  // =================================
  // MARCH 2024
  // =================================
  {
    date: "2024-03-01",
    type: EventType.RELEASE,
    title: "[Performance] WISH Performance Video",
    description: 'NCT WISH 싱글 1집 "WISH" 퍼포먼스 비디오 공개',
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "NCT WISH 엔시티 위시 'WISH' Performance Video",
        url: "https://www.youtube.com/watch?v=BjthvqL3KpA",
        type: ContentType.PERFORMANCE_VIDEO,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    time: "00:59",
    type: EventType.MUSIC_SHOW,
    title: "[NTV] Buzz Rhythm 02",
    description: "일본 닛폰TV 음악 예능 프로그램 출연",
    country: "JP",
    appearance: {
      programName: "버즈 리듬",
    },
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH Made by YUSHI + SAKUYA",
    participants: {
      type: "ONLY",
      memberNames: ["유우시", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "#ItsMyWISH 𝙈𝙖𝙙𝙚 𝙗𝙮 𝙔𝙐𝙎𝙃𝙄 + 𝙎𝘼𝙆𝙐𝙔𝘼𖤐 #YUSHI #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=N3plgilCqss",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] RIKU is in SION’s hand",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "리쿠"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH #RIKU is in #SION’s hand 〰🤲#NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=Gs0V1u1xBWI",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 💗🫶🏻💗 #SAKUYA",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
    linkedContents: [
      {
        title: "💗🫶🏻💗#SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=PiTbJ2zUo3Q",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] ˚₊‧꒰ა 𝐑𝐈𝐊𝐔 ໒꒱ ‧₊˚",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠"],
    },
    linkedContents: [
      {
        title: "˚₊‧꒰ა 𝐑𝐈𝐊𝐔 ໒꒱ ‧₊˚#RIKU #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=5gAWdclKwm8",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH 꿈 속의 꿈 😴💭🏹",
    linkedContents: [
      {
        title: "#ItsMyWISH 꿈 속의 꿈 😴💭🏹#NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=MX-QwInv5Jc",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH 🐿️🫷🏻🌳🫷🏻",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "재희"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH 🐿️🫷🏻🌳🫷🏻#RIKU #JAEHEE #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=ArMF2xx1u0s",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH 👼🏻˚₊ · »-♡→",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "재희"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH 👼🏻˚₊ · »-♡→#SION #JAEHEE #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=w-6_DDqrD-Y",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] ♡ 𝗯𝗲𝘀𝘁 𝗳𝗿𝗶𝗲𝗻𝗱 𝗳𝗼𝗿𝗲𝘃𝗲𝗿 ♡",
    participants: {
      type: "ONLY",
      memberNames: ["료", "사쿠야"],
    },
    linkedContents: [
      {
        title: "♡ 𝗯𝗲𝘀𝘁 𝗳𝗿𝗶𝗲𝗻𝗱 𝗳𝗼𝗿𝗲𝘃𝗲𝗿 ♡#RYO #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=PtzgPe2PqNI",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] ＬⒶℓί𝓁Ⓐ ✴ 🍧🎀💗",
    participants: {
      type: "ONLY",
      memberNames: ["재희", "료", "사쿠야"],
    },
    linkedContents: [
      {
        title: "ＬⒶℓί𝓁Ⓐ ✴ 🍧🎀💗#JAEHEE #RYO #SAKUYA  #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=wyZY8QzYD18",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH キミなしでは意味すらないんだ",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "#ItsMyWISH キミなしでは意味すらないんだ🌷🥐₊˚ෆ #SION #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=JqQ-KTKoEHM",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-03",
    type: EventType.MUSIC_SHOW,
    title: "[TV Tokyo] 超音波＃ (초음파#)",
    description: "일본 TV 도쿄 음악 예능 프로그램 출연",
    albumTitle: "WISH",
    country: "JP",
    appearance: {
      programName: "초음파",
      isPerformance: true,
      performedTrack: "WISH (Japanese Ver.)",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1105011",
    linkedContents: [
      {
        title: "NCT WISH 超音波＃(Chou Onpa) 출연 클립",
        url: "https://youtu.be/EXAMPLE_URL" /* TODO: 링크 추가 필요 */,
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Dance Practice] WISH",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "NCT WISH 엔시티 위시 'WISH' Dance Practice",
        url: "https://www.youtube.com/watch?v=ixB2Wgh9Iwc",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] Be My Cupid EP.2 & Shorts",
    appearance: {
      programName: "Be My Cupid",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "そろそろ飛ばないと〰️ 僕たちは天使だから👼🏻 | 이제 날아다녀야지〰️ 우리는 천사니까🪽| Be My Cupid EP.2",
        url: "https://www.youtube.com/watch?v=wgy0mFrCM2k",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
      {
        title: "#ItsMyWISH Could you #BeMyCupid tonight? ♥️🏹🪽",
        url: "https://www.youtube.com/watch?v=IUX_R6MnmIE",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
      {
        title: "#ItsMyWISH See you soon at 9PM♥️🏹🪽",
        url: "https://www.youtube.com/watch?v=b6T8cw8pRKo",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] ⋆.˚もしもしまだ I♥︎U⋆.˚",
    participants: {
      type: "ONLY",
      memberNames: ["료", "사쿠야"],
    },
    linkedContents: [
      {
        title: "⋆.˚もしもしまだ I♥︎U⋆.˚#RYO #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=EUw43D0C2ms",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH 🤲🦭〰🥐🤲",
    participants: {
      type: "ONLY",
      memberNames: ["료", "사쿠야"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH 🤲🦭〰🥐🤲 #RYO #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=h74mnQfqqIk",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH ˗ˏˋ ꒰🍭🍭꒱ ˎˊ˗",
    participants: {
      type: "ONLY",
      memberNames: ["료", "사쿠야"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH ˗ˏˋ ꒰🍭🍭꒱ ˎˊ˗#RYO #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=iS0my1MDfYI",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-03",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🥐 𝙔𝙤𝙪 𝙡𝙞𝙠𝙚 𝙢𝙚 𝙖 𝙡𝙞𝙩𝙩𝙡𝙚 𝙗𝙞𝙩",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
    linkedContents: [
      {
        title:
          "🥐 𝙔𝙤𝙪 𝙡𝙞𝙠𝙚 𝙢𝙚 𝙖 𝙡𝙞𝙩𝙩𝙡𝙚 𝙗𝙞𝙩 • SAKUYA ver. #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=hrVN_Btij4Q",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-04",
    type: EventType.RELEASE,
    title: "[Physical] 한국 싱글 1집 《WISH》",
    description: "한국 피지컬 앨범(Photobook/WICHU Ver.) 발매.",
    country: "KR",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-04",
    type: EventType.SHOWCASE,
    title: "[Showcase] NCT WISH's WISHLIST",
    location: "블루스퀘어 마스터카드홀",
    country: "KR",
    city: "서울 (Seoul)",
    description: "NCT WISH 데뷔 싱글 발매 기념 쇼케이스",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "[Replay] NCT WISH’s WISHLIST",
        url: "https://youtu.be/MSgixSN9pcY",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH 'WISH + NASA + Sail Away + We Go! + Hands Up' Stage",
        url: "https://youtu.be/UhTk4yvxDq8",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-04",
    type: EventType.MAGAZINE,
    title: "[Singles Korea] 프로필 다시 쓰기",
    linkedContents: [
      {
        title:
          "프로필이 아니라 서로의 WISH를 적은 건에 대하여✍️ #NCTWISH가 서로 써준 프로필을 공개합니다",
        url: "https://youtu.be/jhIdlyp0J_o",
        type: ContentType.INTERVIEW,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-04",
    type: EventType.ONLINE_CONTENT,
    title: "[Reaction] WISH MV Reaction",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "REACTION to 🏹’WISH’🪽 MVㅣNCT WISH Reaction",
        url: "https://www.youtube.com/watch?v=rx2UcGN6O1w",
        type: ContentType.REACTION,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-05",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 뮤직아트",
    description: "발매 기념 팬사인회 진행",
    location: "타임스퀘어 아트리움",
    country: "KR",
    city: "서울 (Seoul)",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-05",
    type: EventType.ONLINE_CONTENT,
    title: "[hello82] Question Parade",
    linkedContents: [
      {
        title:
          "(CC) 데뷔 후 첫 인터뷰에서 룸메 잠버릇 냅다 공개하는 NCT WISH😴🤳| Question Parade | NCT WISH",
        url: "https://youtu.be/lE5lBAczU2w",
        type: ContentType.INTERVIEW,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] WISH MV Behind",
    description: "바르셀로나 올로케이션 WISH 뮤직비디오 촬영 비하인드",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "ざぶん🏊  バルセロナに現れたキューピッド6人👼🏻 | 풍덩🌊 바르셀로나에 나타난 큐피드 6명🏹♥️ | ’WISH' MV Behind the Scenes",
        url: "https://www.youtube.com/watch?v=j1Uhm06BmTc",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH 6 CUPIDZ",
    linkedContents: [
      {
        title: "#ItsMyWISH 6 CUPIDZ ♥️ #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=iKUu0mcmJQU",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] 🦭〰#BFF〰🥐",
    participants: {
      type: "ONLY",
      memberNames: ["료", "사쿠야"],
    },
    linkedContents: [
      {
        title: "🦭〰#BFF〰🥐#RYO #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=4aFD082n8uc",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] what we doin’?",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "재희"],
    },
    linkedContents: [
      {
        title: "what we doin’?#RIKU #JAEHEE #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=s3RDzJpuGfQ",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] shake it off",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
    linkedContents: [
      {
        title: "shake it off꯱ׁׅ֒hׁׅ֮ɑׁׅ֮ƙׁׅ֑ꫀׁׅܻ ₓ ₃#NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=tS2mTC8d9lw",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-06",
    type: EventType.VARIETY_SHOW,
    title: "[MBC M] 주간 아이돌 (Weekly Idol)",
    description: "MBC M 음악 예능 프로그램 출연",
    appearance: {
      programName: "주간 아이돌",
      episode: "653회",
      role: "Guest",
    },
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "[하이라이트] 귀여운 애 옆에 귀여운애...😍 귀여움 한도초과💚 NCT WISH의 첫 예능 출사표! l #주간아이돌 l EP.653",
        url: "https://youtu.be/zaDysMHeIdY",
        type: ContentType.VARIETY_CLIP,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-06",
    type: EventType.ONLINE_CONTENT,
    title: "[1theK] 원더킬포 (1theKILLPO)",
    description: "WISH 무대 퍼포먼스 비디오 공개",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "NCT WISH (엔시티 위시) _ WISH | 1theKILLPO | 원더킬포 | 시온 리쿠 유우시 재희 료 사쿠야 | 퍼포먼스 | Performance | 4K",
        url: "https://youtu.be/_o7tPaWFAq8",
        type: ContentType.PERFORMANCE_VIDEO,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-07",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH Album Unboxing",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "UNBOXING of NCT WISH ‘WISH-Single’ Album 💗🩵",
        url: "https://www.youtube.com/watch?v=Jl9SQud8k14",
        type: ContentType.UNBOXING,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-07",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH 바람을 타고〰️💚 w/ TAEYONG (NCT 127)",
    linkedContents: [
      {
        title: "#ItsMyWISH 바람을 타고〰️💚 #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=H9TRv_04rmk",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-08",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] 今に世界が変わるよ",
    linkedContents: [
      {
        title: "#ItsMyWISH 今に世界が変わるよ👀🌐🫧#NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=lrjWBPbl9ow",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-08",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH made by YUSHI+RYO",
    participants: {
      type: "ONLY",
      memberNames: ["유우시", "료"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH made by #YUSHI+#RYO #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=--Ya9sUqtss",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-08",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH Keep it up baby",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH 🥐Keep it up baby🫵 #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=SsCtP0Ot924",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] WISH Jacket Photoshoot",
    description: "싱글 1집 자켓 촬영 비하인드",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "新しいヘアスタイル🌟 超可愛いコンセプト🩷 | 새로운 머리🩵 엄청 귀여운 컨셉 💅 | ’WISH' Jacket Behind the Scenes",
        url: "https://www.youtube.com/watch?v=FWSWFuanow0",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH 눈 떠봐 🩵✈️",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "료"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH 눈 떠봐🩵✈️‧₊˚✧#SION #RYO #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=jLZyRLqaEpg",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH ༶･･🥐⭐️💗･･༶",
    participants: {
      type: "ONLY",
      memberNames: ["유우시", "사쿠야"],
    },
    linkedContents: [
      {
        title: "༶･･#ItsMyWISH 🥐⭐️💗･･༶ #YUSHI #SAKUYA #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=Fg9QhZ6ngL0",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH Keep it up 🌳🐿️",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "재희"],
    },
    linkedContents: [
      {
        title: "#ItsMyWISH Keep it up 🌳🐿️!#RIKU #JAEHEE #NCTWISH #WISH",
        url: "https://www.youtube.com/watch?v=OkRVjICHE-g",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-09",
    type: EventType.ONLINE_CONTENT,
    title: "[Shorts] kawaii",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "유우시"],
    },
    linkedContents: [
      {
        title: "-ˋˏ k͎a͎w͎a͎i͎i͎  ˎˊ-#RIKU #YUSHI #NCTWISH",
        url: "https://www.youtube.com/watch?v=NInZ7Qct9bs",
        type: ContentType.SHORTS,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-09",
    type: EventType.ONLINE_CONTENT,
    title: "[스튜디오 오와] 큐레이터",
    linkedContents: [
      {
        title:
          "(sub) 보아누나(?)가 키운 NCT 막내들 마침내 데뷔🌷🐿️⭐️🌳🦭🥐 #큐레이터 #NCTWISH #엔시티위시 #WISH #NCTWISH_WISH",
        url: "https://youtu.be/rUH8Kh_R_lQ",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-10",
    type: EventType.ONLINE_CONTENT,
    title: "[스튜디오 오와] MASTERPIECE : NCT WISH",
    description: "",
    linkedContents: [
      {
        title:
          "[MASTERPIECE : NCT WISH] WISH #큐레이터 #NCTWISH #엔시티위시 #WISH #NCTWISH_WISH",
        url: "https://youtu.be/nCj0SVFqKQE",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-10",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] Which era: New School or Old School?",
    description: "JustMaiko와의 콜라보 숏폼",
    linkedContents: [
      {
        title: "Which era: New School or Old School? @justmaiko #NCTWISH",
        url: "https://www.youtube.com/watch?v=Tm3x8g0RlKw",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-10",
    type: EventType.ONLINE_CONTENT,
    title: "[Challenge] #ItsMyWISH w/ HONG EUNCHAE (LE SSERAFIM)",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "#ItsMyWISH Let's WISH it up🪽✨#SION #SAKUYA #NCTWISH #WISH #LE_SSERAFIM #HONGEUNCHAE",
        url: "https://www.youtube.com/watch?v=4_OanMllqA4",
        type: ContentType.CHALLENGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  /* TODO: https://www.starnewskorea.com/music/2024/04/04/2024040411155492431 */

  /*TODO: https://nct-jp.net/ko/schedule/detail.php?id=1105070*/
  /* TODO: https://www.interfm.co.jp/news/single/wishforyou02272024 */
  {
    date: "2024-03-07",
    type: EventType.MUSIC_SHOW,
    title: "[Fuji TV] K-POP HOUSE",
    description: '일본 후지TV 음악 프로그램 출연. "WISH (Japanese Ver.)" 무대.',
    albumTitle: "WISH",
    country: "JP",
    appearance: {
      programName: "K-POP HOUSE",
      isPerformance: true,
      performedTrack: "WISH (Japanese Ver.)",
    },
  },
  {
    date: "2024-03-07",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운 (한국 첫 방송)",
    albumTitle: "WISH",
    milestone: true,
    appearance: {
      programName: "엠카운트다운",
      isPerformance: true,
      performedTrack: ["WISH (Korean Ver.)", "Sail Away (Korean Ver.)"],
    },
    linkedContents: [
      {
        title: "'Sail Away' Stage",
        url: "https://youtu.be/EafqzM4FtuE",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'Sail Away' Stage",
        url: "https://tv.naver.com/v/47991789",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.NAVER_TV,
      },
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/6DKymll-724",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'WISH' Stage",
        url: "https://tv.naver.com/v/47992249",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.NAVER_TV,
      },
    ],
  },
  {
    date: "2024-03-08",
    type: EventType.VARIETY_SHOW,
    title: "[Fuji TV] 메자마시 TV",
    description: "일본 후지TV 아침 정보 프로그램 출연",
    country: "JP",
    albumTitle: "WISH",
    appearance: {
      programName: "메자마시 TV",
      role: "Guest",
    },
  },
  {
    date: "2024-03-08",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    albumTitle: "WISH",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: ["WISH (Korean Ver.)", "Sail Away (Korean Ver.)"],
    },
    linkedContents: [
      {
        title: "'Sail Away' Stage",
        url: "https://youtu.be/KHP7SExmceQ",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'Sail Away' Stage",
        url: "https://tv.naver.com/v/48042793",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.NAVER_TV,
      },
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/hb0jErr7t1A",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'WISH' Stage",
        url: "https://tv.naver.com/v/48043088",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.NAVER_TV,
      },
    ],
  },
  {
    date: "2024-03-09",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    albumTitle: "WISH",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: ["WISH (Korean Ver.)", "Sail Away (Korean Ver.)"],
    },
    linkedContents: [
      {
        title: "'Sail Away' Stage",
        url: "https://tv.naver.com/v/48070651",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.NAVER_TV,
      },
      {
        title: "'Sail Away' Stage",
        url: "https://youtu.be/4jjbh7oOkMQ",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'WISH' Stage",
        url: "https://tv.naver.com/v/48070827",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.NAVER_TV,
      },
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/nVKMRqFaA_0",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-10",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    albumTitle: "WISH",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: ["WISH (Korean Ver.)", "Sail Away (Korean Ver.)"],
    },
    linkedContents: [
      {
        title: "'Sail Away' Stage",
        url: "https://tv.naver.com/v/48095755",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.NAVER_TV,
      },
      {
        title: "'Sail Away' Stage",
        url: "https://youtu.be/0Vl8_SHMG7Y",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'WISH' Stage",
        url: "hhttps://tv.naver.com/v/48095909",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.NAVER_TV,
      },
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/lCjWwkcNTaw",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-10",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - SMTOWN &STORE",
    description: "발매 기념 팬사인회 진행",
    location: "SMTOWN & STORE 코엑스 라이브플라자",
    country: "KR",
    city: "서울 (Seoul)",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-11",
    type: EventType.ONLINE_CONTENT,
    title: "[M2] 릴레이댄스",
    description: "WISH 릴레이 댄스 영상 공개",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "[릴레이댄스] NCT WISH(엔시티 위시) - WISH (Korean Ver.) (4K)",
        url: "https://youtu.be/GjMzzIbquRU",
        type: ContentType.PERFORMANCE_VIDEO,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-12",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 더쇼 (The Show) 1위",
    description: "🏆 데뷔 20일 만의 첫 음악방송 1위.",
    country: "KR",
    albumTitle: "WISH",
    milestone: true,
    appearance: {
      programName: "더 쇼",
      episode: "342회",
      isPerformance: true,
      performedTrack: ["WISH (Korean Ver.)", "Sail Away (Korean Ver.)"],
    },
    musicShowResult: {
      rank: 1,
      score: 7241,
      note: "NCT WISH 데뷔 첫 1위",
    },
    linkedContents: [
      {
        title: "NCT WISH, THE SHOW CHOICE! [THE SHOW 240312]",
        url: "https://www.youtube.com/watch?v=-ucsvfAC1Fw",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, WISH (Korean Ver.) [THE SHOW 240312]",
        url: "https://www.youtube.com/watch?v=ewRRD01-rl4",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'Sail Away' Stage",
        url: "https://youtu.be/a9WoSIktIJE",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-12",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 메이크스타",
    description: "발매 기념 팬사인회 진행",
    country: "KR",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-13",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼 챔피언 (Show Champion) 1위",
    description: "🏆 음악방송 2관왕 달성.",
    country: "KR",
    albumTitle: "WISH",
    appearance: {
      programName: "Show Champion",
      episode: "509회",
      isPerformance: true,
      performedTrack: "WISH (Korean Ver.)",
    },
    musicShowResult: {
      rank: 1,
      score: 3861,
      note: "음악방송 2관왕",
    },
    linkedContents: [
      {
        title: "'Sail Away' Stage",
        url: "https://youtu.be/-CFkSZtgnjA",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/gIqLEshTAIg",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-13",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 에버라인",
    description: "발매 기념 팬사인회 진행",
    country: "KR",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-13",
    type: EventType.RADIO,
    title: "[MBC M] 아이돌 라디오 시즌4",
    country: "KR",
    description: "EP.162 게스트 출연 (with 템페스트)",
    linkedContents: [
      {
        title: "IDOL RADIO EP.162 Full Ver.",
        url: "https://youtu.be/dummy_idolradio" /* TODO: 링크 추가 필요 */,
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-14",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    albumTitle: "WISH",
    appearance: {
      programName: "엠카운트다운",
      episode: "833회",
      isPerformance: true,
      performedTrack: "WISH (Korean Ver.)",
    },
    linkedContents: [
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/D8II-AJrnlE",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-15",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    albumTitle: "WISH",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "WISH (Korean Ver.)",
    },
    linkedContents: [
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/72jyyHAgiDk",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-15",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - MyMusicTaste",
    description: "발매 기념 팬사인회 진행",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-16",
    type: EventType.FANMEETING,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 애플뮤직",
    description: "발매 기념 팬사인회 진행",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-16",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    albumTitle: "WISH",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "WISH (Korean Ver.)",
    },
    linkedContents: [
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/bT6AGevXM5E",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-16",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Welcome to Cupid Scouting Society Behind the Scenes",
    linkedContents: [
      {
        title:
          "天使たちのドタバタ学校生活🐓 | 천사들의 우당탕탕 학교생활🎯 | NCT WISH : Welcome to Cupid Scouting Society Behind the Scenes",
        url: "https://youtu.be/H7OyjEUykjo?si=WOfPDGyanx20Y1gZ",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-17",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    albumTitle: "WISH",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "WISH (Korean Ver.)",
    },
    linkedContents: [
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/46qUia4Fqao",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-19",
    type: EventType.VARIETY_SHOW,
    title: "[TV TOKYO] 아노쨩의 전전전파♪ (あのちゃんの電電電波♪)",
    location: "TV TOKYO",
    country: "JP",
    description: "일본 TV 도쿄 라디오식 음악 프로그램 출연.",
    appearance: {
      programName: "아노짱의 전전전파",
      isPerformance: true,
      performedTrack: "WISH (Japanese Ver.)",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1105012",
  },
  {
    date: "2024-03-19",
    type: EventType.ONLINE_CONTENT,
    title: "[ootb Studio] 전역자",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "어릴 적 내 위시.. 호그와트 입학💫 (도시마엔역) | 전역자 ep.10 [EN/JP/ID/TH/VI]",
        url: "https://youtu.be/04PsxyViSV0",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-19",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] 음악방송 대기실 #01",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "ドキドキ💓初の韓国音楽番組🪽 | 두근두근😲 첫 한국 음악방송💫 | ‘WISH’ 음악방송 대기실 비하인드 #01",
        url: "https://youtu.be/S4rSLGW3RYw",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] 음악방송 대기실 #02",
    albumTitle: "WISH",
    linkedContents: [
      {
        title:
          "音楽番組 初週おわり！🌟成長するNCT WISH🌱 | 음방 첫 주 끝!💘 성장하는 NCT WISH👼🏻 | ‘WISH’ 음악방송 대기실 비하인드 #02",
        url: "https://youtu.be/vSJHxQNvPAE",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-21",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    albumTitle: "WISH",
    appearance: {
      programName: "엠카운트다운",
      episode: "834회",
      isPerformance: true,
      performedTrack: "WISH (Korean Ver.)",
    },
    linkedContents: [
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/slsMo_yAlF8",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-21",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 뮤직코리아",
    description: "발매 기념 팬사인회 진행",
    country: "KR",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-22",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    country: "KR",
    albumTitle: "WISH",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "WISH (Korean Ver.)",
    },
    linkedContents: [
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/987xQ2hdwFI",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-22",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 사운드웨이브",
    description: "발매 기념 팬사인회 진행",
    country: "KR",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-23",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Dance Practice",
    linkedContents: [
      {
        title: "'WISH' & 'Sail Away' Dance Practice Behind",
        url: "https://youtu.be/FnbTDQWWUww",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-23",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 헬로라이브",
    description: "발매 기념 팬사인회 진행",
    country: "KR",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-24",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    description: "WISH 활동 공식 종료",
    country: "KR",
    albumTitle: "WISH",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "WISH (Korean Ver.)",
    },
    linkedContents: [
      {
        title: "'WISH' Stage",
        url: "https://youtu.be/A_2K3218eqA",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-25",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] WISH 첫 무대 비하인드",
    linkedContents: [
      {
        title:
          "오빠만 믿어💗 한국에서의 첫 WISH 무대🪽 | オッパだけを信じて😎 韓国で初めてのWISHステージ🏹 | NCT WISH’s WISHLIST Behind the Scenes",
        url: "https://youtu.be/ZoMfJ2ieFG0?si=1Ct-h4R7vpsSz8SC",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-25",
    type: EventType.ONLINE_CONTENT,
    title: "[동네친구 강나미] 한판승부",
    description: "인터뷰 및 게임 콘텐츠 공개",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "유우시", "사쿠야"],
    },
    linkedContents: [
      {
        title:
          "NCT WISH(한국 1년차) VS 강나미(한국 13년차) 누가 더 한국어를 잘할까? | 한판승부 EP.02",
        url: "https://youtu.be/19tchItokro",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-26",
    type: EventType.ONLINE_CONTENT,
    title: "[너의 WISH를 알려줘!] EP.1",
    appearance: {
      programName: "너의 WISH를 알려줘!",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "사쿠야 가방에 달린 키링의 개수는❓| サクヤのカバンについてるキーホルダーの数は？🤔 | 너의 WISH를 알려줘! EP.1",
        url: "https://youtu.be/zeG5CVx5fMg?si=_3Y-qzfd6tzMnX7c",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-26",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 VIDEO CALL EVENT - 위드뮤",
    country: "KR",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-30",
    type: EventType.ONLINE_CONTENT,
    title: "[너의 WISH를 알려줘!] EP.2",
    appearance: {
      programName: "너의 WISH를 알려줘!",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "처음 들어보는 멤버들의 TMI🫢 | 初めて聞くメンバーたちのTMI💬 | 너의 WISH를 알려줘! EP 2",
        url: "https://youtu.be/_fIdEgKbukY?si=BpLqTXKdIdFb3tk",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 케이앤팝스",
    country: "KR",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-30",
    type: EventType.CONCERT,
    title: "[Concert] KCON HONG KONG 2024 (Day 1)",
    description: "KCON 첫 출연. MEET & GREET 및 본 공연 참여.",
    location: "AsiaWorld-ARENA",
    country: "HK",
    seriesName: "KCON",
    albumTitle: "WISH",
    linkedContents: [
      {
        title: "NCT WISH - WISH @KCON HONG KONG 2024",
        url: "https://youtu.be/dummy_kcon_stage",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-03-31",
    type: EventType.CONCERT,
    title: "[Concert] KCON HONG KONG 2024 (Day 2)",
    description: "KCON 홍콩 일정 소화.",
    location: "AsiaWorld-Expo ARENA",
    country: "HK",
    seriesName: "KCON",
  },

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
      rank: 0, // 순위제 아님
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
    title: "[Hotel Roommate Cam] NCT WISH",
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
    description: "국내 첫 야외 페스티벌 출연. 파주 공설운동장에서 개최.",
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
    description: "한강 피크닉과 팬터마임 버스킹",
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
    linkedContents: [],
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
    linkedContents: [
      {
        title: "NCT WISH - WISH @KCON JAPAN 2024",
        url: "https://youtu.be/dummy_kcon_main",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-05-16",
    type: EventType.ANNOUNCEMENT,
    title: "SCHOOL of WISH 팬미팅 부산 공연 추가 정보 공지",
    description:
      "6월 1일(토) 부산 드림씨어터에서 진행될 팬미팅 부산 공연 상세 정보 공개. 오후 2시, 저녁 7시 2회 공연 진행.",
    country: "KR",
  },
  {
    date: "2024-05-18",
    type: EventType.FESTIVAL,
    title: "[Festival] IKONYX Concert 2024 in Bangkok (태국)",
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
    linkedContents: [],
  },

  // =================================
  // JUNE 2024
  // =================================
  {
    date: "2024-06-01",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 부산 (Day 1)",
    description: "전국 팬미팅 투어 부산 공연 (14:00 / 19:00 2회).",
    location: "드림씨어터",
    country: "KR",
    city: "부산 (Busan)",
    seriesName: "NCT WISH : SCHOOL of WISH",
    linkedContents: [
      {
        title:
          "[4K] 240601 NCT WISH RIKU 리쿠 세일어웨이 직캠 | School of wish 부산 | 'Sail away' fan cam",
        url: "https://www.youtube.com/watch?v=tq0il2s1kHM",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
      {
        title:
          "240601 NCT WISH 속마음 토크 | SCHOOL of WISH in BUSAN #엔시티위시 부산 팬미팅 1회차 낮공 직캠 fanmeeting fancam 스쿨오브위시",
        url: "https://www.youtube.com/watch?v=2LJifPizms8",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "[4K] 240601 부산 팬미팅 NCT WISH 유우시(YUSHI) Sail away 세로 직캠 FAN CAM",
        url: "https://www.youtube.com/watch?v=IrCdXhrweq0",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
    ],
  },
  {
    date: "2024-06-04",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] NYLON JAPAN Photoshoot Behind",
    description: "첫 일본 매거진 촬영 비하인드",
    linkedContents: [
      {
        title:
          "기대 만땅🩵 첫 일본 매거진 촬영🤭 | 期待満タン🤍初の日本雑誌撮影📷 | NYLON JAPAN Photoshoot Behind",
        url: "https://youtu.be/G1-khyB06Xs?si=U-YsVItEkwh_KTQ7",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-08",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 전주 (Day 1)",
    description: "전국 팬미팅 투어 전주 공연 (14:00 / 19:00 2회).",
    location: "전북대학교 삼성문화회관",
    country: "KR",
    city: "전주 (Jeonju)",
    seriesName: "NCT WISH : SCHOOL of WISH",
    linkedContents: [
      {
        title:
          "[4K] 240608 NCT WISH - 누난 너무 예뻐 (Replay) 커버 시온 fan cam 직캠 (SION FOCUS) SCHOOL OF WISH 전주 팬미팅",
        url: "https://www.youtube.com/watch?v=UFl4Slj4gUg",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
      {
        title:
          "[4k] 240608 NCT wish - Sail Away 세일 어웨이 엔시티 위시 팬미팅 SCHOOL of WISH Jeonju 시온 sion focus fancam 가로캠 직캠",
        url: "https://www.youtube.com/watch?v=y-riNZNb7RU",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
      {
        title:
          "[4K] 240608 NCT WISH RIKU 리쿠 세일어웨이 직캠 | School of wish 전주 | 'Sail away' fan cam",
        url: "https://www.youtube.com/watch?v=2FyebAQ9e7o",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
    ],
  },
  {
    date: "2024-06-09",
    type: EventType.ONLINE_CONTENT,
    title:
      "[Behind] Rakuten GirlsAward 2024 & KCON JAPAN 2024 Behind the Scenes",
    linkedContents: [
      {
        title:
          "真心いっぱい💓バックステージ | 진심 가득💗 백스테이지 | Rakuten GirlsAward 2024 & KCON JAPAN 2024 Behind the Scenes",
        url: "https://youtu.be/XcMSfcDuwhE?si=Oasw8hQKHQ_Dp6Nx",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-15",
    type: EventType.MUSIC_SHOW,
    title: "[Fuji TV] MUSIC FAIR",
    country: "JP",
    description: "일본 대표 음악방송 출연.",
    appearance: {
      programName: "MUSIC FAIR",
      isPerformance: true,
      performedTrack: "WISH",
    },
  },
  {
    date: "2024-06-15",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 대구 (Day 1)",
    description: "전국 팬미팅 투어 대구 공연 (14:00 / 19:00 2회).",
    location: "수성아트피아 대극장",
    country: "KR",
    city: "대구 (Daegu)",
    seriesName: "NCT WISH : SCHOOL of WISH",

    linkedContents: [
      {
        title:
          "240615 대구 팬미팅 2회차 Sail Away 재희 직캠 NCT WISH - Sail away focus on JAEHEE",
        url: "https://www.youtube.com/watch?v=M_usfXhNEr4",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["재희"],
      },
      {
        title:
          "240615 NCT WISH Sail Away 재희 대영 직캠 엔시티위시 팬미팅 대구 1회차 I NCT WISH :SCHOOL of WISH (JAEHEE FANCAM)",
        url: "https://www.youtube.com/watch?v=I8pHNstuZgk",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["재희"],
      },
    ],
  },
  {
    date: "2024-06-21",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 재희 생일",
    description: "Happy JAEHEE Day💚",
    participants: {
      type: "ONLY",
      memberNames: ["재희"],
    },
  },
  {
    date: "2024-06-22",
    type: EventType.ONLINE_CONTENT,
    title: "[ELLE KOREA] NCT WISH 불쑥불쑥 튀어나온 TMI에 못 헤어남💙",
    linkedContents: [
      {
        title:
          "[sub] NCT WISH 불쑥불쑥 튀어나온 TMI에 못 헤어남💙  | ELLE KOREA",
        url: "https://www.youtube.com/watch?v=-IsSPayvRp4",
        type: ContentType.INTERVIEW,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    title: "【CDTV】 NCT WISH⚡️好きなパン聞いてみたら回答自由すぎか",
    url: "https://www.youtube.com/watch?v=WpQy19wqhhk",
    type: ContentType.YOUTUBE,
    platform: Platform.YOUTUBE,
  },
  {
    date: "2024-06-22",
    type: EventType.FANMEETING,
    title: "[Fanmeeting] NCT WISH : SCHOOL of WISH - 청주 (Day 1)",
    description:
      "전국 팬미팅 투어 청주 공연 (14:00 / 19:00 2회). 국내 지방 투어 마지막 일정.",
    location: "CJB 미디어센터 에덴아트홀",
    country: "KR",
    city: "청주 (Cheongju)",
    seriesName: "NCT WISH : SCHOOL of WISH",

    linkedContents: [
      {
        title:
          "[4K] 240622 SCHOOL of WISH CHEONGJU RIKU FOCUS 리쿠 직캠 | NASA",
        url: "https://www.youtube.com/watch?v=TUqZLkjgyVA",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },

      {
        title:
          "[4K] 240622 NCT WISH : SCHOOL of WISH in CHEONGJU Sail Away 유우시 직캠 YUSHI FOCUS",
        url: "https://www.youtube.com/watch?v=b9GVB5KNGp4",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title:
          "[4K] 240622 Sail Away - 엔시티 위시 리쿠 직캠 | NCT WISH RIKU FOCUS | SCHOOL of WISH in 청주 2회차 | [FANCAM]",
        url: "https://www.youtube.com/watch?v=AWYcDDLiIyc",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["리쿠"],
      },
      {
        title:
          "[4K] 240622 NCT WISH SAIL AWAY 엔시티위시 세일어웨이 사쿠야 직캠 SAKUYA FOCUS @ SCOOL OF WISH 청주 팬미팅",
        url: "https://www.youtube.com/watch?v=rY8_sqF3-SQ",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야"],
      },
      {
        title:
          "[4K] 240622 NCT WISH(엔시티위시) - Sail Away 청주 낮공 / 재희 Focus",
        url: "https://www.youtube.com/watch?v=_ukZP_xJR6k",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["재희"],
      },
    ],
  },
  {
    date: "2024-06-22",
    type: EventType.MUSIC_SHOW,
    title: "[NTV] Buzz Rhythm 02",
    country: "JP",
    appearance: {
      programName: "버즈 리듬",
      isPerformance: true,
      performedTrack: "WISH",
    },
  },
  {
    date: "2024-06-24",
    type: EventType.MUSIC_SHOW,
    title: "[TBS] CDTV LIVE! LIVE!",
    country: "JP",
    description:
      'TBS "CDTV LIVE! LIVE!" 방송 출연. 일본 2nd 싱글 "Songbird" 첫 음악방송 무대. 일본 대표 음악방송 프로그램. 전국 방송.',
    appearance: {
      programName: "CDTV 라이브! 라이브!",
      isPerformance: true,
      performedTrack: "Songbird (Japanese Ver.)",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1106877",
    linkedContents: [
      {
        title: "NCT WISH - Songbird @ CDTV LIVE! LIVE!",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-24",
    type: EventType.VARIETY_SHOW,
    title: "[Fuji TV] K-POP HOUSE",
    country: "JP",
    description:
      '후지TV "K-POP HOUSE" 방송 출연. K-POP 아이돌 게스트를 초대해 토크와 퍼포먼스를 진행하는 프로그램. 멤버들의 친근한 일상 이야기와 "Songbird" 무대 공개.',
    appearance: {
      programName: "케이팝 하우스",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1106878",
    linkedContents: [
      {
        title: "NCT WISH - K-POP HOUSE 출연",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.VARIETY_CLIP,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-26",
    type: EventType.VARIETY_SHOW,
    title: "[NTV] 히루난데스! (ヒルナンデス!)",
    country: "JP",
    description:
      '니혼TV 대표 주간 토크쇼 "히루난데스!" 출연 (정오 11시 55분 ~ 오후 1시 50분). 일본에서 가장 오래되고 영향력 있는 낮 시간대 토크 프로그램. 6명의 멤버가 밝은 에너지를 전달하고, "Songbird" 신곡 소개. 한국 신인 그룹으로서 일본 대중에게 친근한 이미지 구축.',
    appearance: {
      programName: "히루난데스!",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "료", "사쿠야"],
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1107070",
  },
  {
    date: "2024-06-27",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish★ EP.1",
    appearance: {
      programName: "WISH's Wish",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "Lets Ride! 🚗 NCT WISH 첫 번째 여름 여행! 🍉 | Lets Ride! ☀️ NCT WISH 初めての夏旅行! 🐑 | WISH’s Wish★ EP. 1",
        url: "https://youtu.be/vB4E8QJwgh0?si=X_ZxbFShktYM8BBn",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-28",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 리쿠 생일",
    description: "Happy Riku Day❤️",
    participants: {
      type: "ONLY",
      memberNames: ["리쿠"],
    },
  },
  {
    date: "2024-06-29",
    type: EventType.CONCERT,
    title: "[MBC] Show! Music Core in JAPAN (Day 1)",
    description: "MBC 쇼! 음악중심 상반기 결산 일본 특집 녹화. (방송은 7월)",
    location: "베루나 돔 (Belluna Dome)",
    country: "JP",
    city: "사이타마 (Saitama)",
    albumTitle: "Songbird",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Songbird (Korean Ver.)", // 한국어 버전 선공개 무대
    },
  },
  {
    date: "2024-06-29",
    type: EventType.MUSIC_SHOW,
    title: "[TV Tokyo] 초음파 (ウルトラサウンド / Ultrasound) 출연",
    country: "JP",
    description:
      '테레비 도쿄 "초음파" 방송 출연 (오전 11시~). 테레비 도쿄 대표 토요 음악 프로그램. "Songbird" 신곡 무대 공연 및 멤버 인터뷰. 전국 시청자들에게 신곡 선보이기.',
    appearance: {
      programName: "초음파",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1107047",
    linkedContents: [
      {
        title: "NCT WISH - Songbird @ Ultrasound",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-29",
    type: EventType.MUSIC_SHOW,
    title: "[NHK] Venue101",
    country: "JP",
    description:
      'NHK "Venue101" 생방송 출연 (토요일 밤 11시~11시 30분). NHK 대표 음악 프로그램으로, 최신 곡을 부르는 아티스트들의 생생한 무대. "Songbird" 신곡 공연 & 멤버 토크. 일본 공영방송 전국 네트워크 출연.',
    appearance: {
      programName: "Venue101",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    relatedUrl: "https://nct-jp.net/ko/schedule/detail.php?id=1107049",

    linkedContents: [
      {
        title: "NCT WISH - Songbird @ NHK Venue101",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-06-30",
    type: EventType.CONCERT,
    title: "쇼! 음악중심 in JAPAN (Day 2)",
    location: "베루나 돔 (Belluna Dome)",
    country: "JP",
    city: "사이타마 (Saitama)",
  },

  // =================================
  // JULY 2024
  // =================================
  {
    date: "2024-07-01",
    type: EventType.RELEASE,
    title: "Single 'Songbird' (Korean Ver.) 발매",
    description:
      "싱글 2집 한국어 버전 발매. 타이틀곡 Songbird, 수록곡 Tears Are Falling (Korean Ver.) 포함.",
    country: "KR",
    albumTitle: "Songbird",
    milestone: true,
    relatedUrl: "https://nct-jp.net/discography/detail.php?id=1020436",
    linkedContents: [
      {
        title: "NCT WISH 'Songbird (Korean Ver.)' MV",
        url: "https://youtu.be/m9o0L7cOskc",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-04",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish★ EP.2",
    description: "저녁도 만들고 게임도 해요",
    appearance: {
      programName: "WISH's Wish",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "저녁도 만들고🍳 게임도 해요🎯 | 晩御飯を作って🍴ゲームもしましょう❣️ | WISH’s Wish★ EP. 2",
        url: "https://youtu.be/wbKJXSJh908?si=g-UDQXNlmzsLqUu7",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Reaction] Songbird MV Reaction",
    description: "Songbird 뮤직비디오 리액션",
    albumTitle: "Songbird",
    linkedContents: [
      {
        title: "REACTION to 'Songbird' MVㅣNCT WISH Reaction",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.REACTION,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-06",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] Songbird Album Unboxing",
    description: "Songbird 앨범 언박싱",
    albumTitle: "Songbird",
    linkedContents: [
      {
        title: "Songbird Album Unboxing with NCT WISH",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-07",
    type: EventType.ONLINE_CONTENT,
    title: "[Fanchant] Songbird 응원법 가이드",
    description: "Songbird 응원법 공개",
    albumTitle: "Songbird",
    linkedContents: [
      {
        title: "NCT WISH 'Songbird' Fanchant Guide",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-08",
    type: EventType.ONLINE_CONTENT,
    title: "[YouTube] KBS Kpop Special Interview",
    description: "KBS Kpop 채널 특별 인터뷰",
    linkedContents: [
      {
        title: "NCT WISH KBS Kpop Interview",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-10",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] FIND YOU! SONGBIRD",
    description: "소원의 주인을 찾고~ 또 찾고!",
    linkedContents: [
      {
        title:
          "소원의 주인을 💌 찾고~ 또 찾고! 👀 | 願いの主人を✏️探して~また探して🔭",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-11",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH's Wish★ EP.3",
    appearance: {
      programName: "WISH's Wish",
      episode: "3화",
    },
    linkedContents: [
      {
        title:
          "우리의 첫 파자마 토크와🛌💤 물놀이까지〰🏖 | 僕たちの初めてのパジャマトークと😪水遊び🤿 | WISH’s Wish★ EP. 3",
        url: "https://youtu.be/tPK0ApAh9IU?si=xADL-IBykHN75sEC",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-05",
    type: EventType.ONLINE_CONTENT,
    title: "[Dance Practice] Songbird",
    description: "Songbird 안무 영상",
    albumTitle: "Songbird",
    linkedContents: [
      {
        title: "NCT WISH 엔시티 위시 'Songbird' Dance Practice",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.DANCE_PRACTICE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-01",
    type: EventType.ONLINE_CONTENT,
    title: "[Live] Songbird Countdown Live",
    description: "앨범 발매 기념 유튜브/위버스 라이브.",
    albumTitle: "Songbird",
    linkedContents: [
      {
        title: "Wishfull Day Replay",
        url: "https://weverse.io/nctwish/live/4-168365739", // [확인 필요]
        type: ContentType.LIVE_STREAM,
        platform: Platform.WEVERSE,
      },
      {
        title: "Wishfull Day Replay",
        url: "https://youtu.be/dummy_countdown_live", // [확인 필요]
        type: ContentType.LIVE_STREAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-01",
    type: EventType.VARIETY_SHOW,
    title: "[Fuji TV] K-POP HOUSE",
    country: "JP",
    description:
      '후지TV "K-POP HOUSE" 방송 출연. K-POP 아이돌 게스트를 초대해 토크와 퍼포먼스를 진행하는 프로그램. 멤버들의 친근한 일상 이야기와 "Songbird" 무대 공개.',
    appearance: {
      programName: "케이팝 하우스",
    },
  },
  {
    date: "2024-07-04",
    type: EventType.MUSIC_SHOW,
    title: '[Mnet] "엠카운트다운" EP.851 (최초 공개 무대)',
    country: "KR",
    description:
      'Mnet "엠카운트다운" 851회 방송 출연 (오후 6시 생방송). Songbird 한국어 버전 첫 음악방송 무대. 신곡 공개 무대 및 멤버 인터뷰. 대국민 첫 선보임.',
    appearance: {
      programName: "엠카운트다운",
      episode: "EP.851",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    linkedContents: [
      {
        title:
          "'최초 공개' NCT WISH - Songbird (Korean Ver.) #엠카운트다운 EP.851 | Mnet 240704 방송",
        url: "https://www.youtube.com/watch?v=Y_V3wplzVZs",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-05",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    country: "KR",
    description:
      'SBS "인기가요" 방송 출연 (금요일 저녁). Songbird 신곡 무대 공연 및 차트 경쟁.',
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Songbird",
    },
  },
  {
    date: "2024-07-06",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    country: "KR",
    description: 'MBC "쇼! 음악중심" 토요 방송 출연. Songbird 신곡 공연.',
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Songbird",
    },
  },
  {
    date: "2024-07-09",
    type: EventType.MUSIC_SHOW,
    title: "[SBS M] 더 쇼 (Songbird 1위 달성)",
    country: "KR",
    description:
      '【음악방송 1위】SBS M "더 쇼" 방송 출연. Songbird 신곡으로 더 쇼 차트 1위 달성. 한국 본격 활동 시작 후 두 번째 음악방송 1위 수상.',
    appearance: {
      programName: "더 쇼",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    musicShowResult: {
      rank: 1,
      note: "Songbird 신곡 발매 후 첫 음악방송 1위",
    },
  },
  /* TODO: https://nct-jp.net/ko/schedule/detail.php?id=1107088 */
  {
    date: "2024-07-10",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운 EP.852 (2주차)",
    country: "KR",
    description:
      "【음악방송 2주차】Mnet 엠카운트다운 852회 방송 출연. Songbird 2주차 무대.",
    appearance: {
      programName: "엠카운트다운",
      episode: "EP.852",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    relatedUrl: "https://www.youtube.com/watch?v=JxCvV8LXkXs",
  },
  {
    date: "2024-07-12",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    country: "KR",
    description: "Songbird 신곡 무대. 한국 지상파 주요 음악방송 출연.",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    linkedContents: [
      {
        title:
          "Songbird (Korean Ver.) - NCT WISH エヌシーティー ウィッシュ 엔시티위시 [Music Bank] | KBS WORLD TV 240712",
        url: "https://youtu.be/bMG3u-qYL6A",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-12",
    type: EventType.ANNOUNCEMENT,
    title:
      "[Announcement] NCT WISH “7/21 (일) 2024 SBS 가요대전 Summer 생방송” 참여 안내",
    description: "NCT WISH “2024 SBS 가요대전 Summer” 생방송 참여 관련 공지.",
    country: "KR",
    relatedUrl: "https://weverse.io/nctwish/notice/20987",
  },
  {
    date: "2024-07-14",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    country: "KR",
    description: "SBS 인기가요 방송 출연. Songbird 2주차 무대.",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Songbird",
    },
  },
  {
    date: "2024-07-14",
    type: EventType.VARIETY_SHOW,
    title: "[KBS1] 열린음악회",
    description: "Songbird 무대 방영.",
    country: "KR",
    appearance: {
      programName: "열린음악회",
      isPerformance: true,
      performedTrack: "Songbird",
    },
    linkedContents: [
      {
        title: "NCT WISH - Songbird @Open Concert",
        url: "https://youtu.be/dummy_open_concert",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-16",
    type: EventType.VARIETY_SHOW,
    title: "SBS 파워FM <두시탈출 컬투쇼>",
    country: "KR",
    description: "특선 라이브 코너 게스트.",
    linkedContents: [
      {
        title: "컬투쇼 특선 라이브 풀버전",
        url: "https://youtu.be/dummy_cultwo_july",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-17",
    type: EventType.MUSIC_SHOW, // 또는 CONCERT
    title: "Show! Music Core in JAPAN (방송)",
    description: "6월 말 일본 베루나 돔에서 녹화된 상반기 결산 특집 방송.",
    country: "KR", // 방송은 한국 채널
    linkedContents: [
      {
        title: "NCT WISH - Songbird (Korean Ver.) @Music Core in JAPAN",
        url: "https://youtu.be/dummy_music_core_japan",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-19",
    type: EventType.AWARD_SHOW,
    title:
      "[Awards] 텐센트 뮤직 엔터테인먼트 어워즈 2024 (Tencent Music Entertainment Awards 2024)",
    location: "갤럭시 아레나 (Macau Galaxy Arena)",
    country: "CN",
    city: "마카오 (Macau)",
    description:
      '마카오에서 개최되는 중국 최대 음악 시상식 "텐센트 뮤직 엔터테인먼트 어워즈 2024" 출연. Songbird 무대 공연 및 아시아 신인상 관련 무대 참여. K-POP의 중국 시장 영향력 증명.',
    relatedUrl: "https://www.sedaily.com/NewsView/2DBSVSIRAT",
    linkedContents: [
      {
        title:
          "[4K]240719 NCT WISH - Sail away(시온 focus cam) 2024 TMEA music festival",
        url: "https://www.youtube.com/watch?v=raVveOfkSog",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
    ],
  },
  {
    date: "2024-07-21",
    type: EventType.AWARD_SHOW,
    title: "2024 SBS 가요대전 Summer",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    description:
      "SBS 가요대전 하계 특집 공연 및 시상식. 오후 3시 레드 카펫 부터 오후 6시 30분 생방송 개시.",
    relatedUrl: "https://weverse.io/nctwish/notice/20987?hl=ko",
  },
  {
    date: "2024-07-21",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] Missing Bird in Cupid Museum Behind the Scenes",
    linkedContents: [
      {
        title:
          "어서 와💗 너 내 후배로 들어올래?👀 | おいでよ👼僕の後輩になる？💕 | Missing Bird in Cupid Museum Behind the Scenes",
        url: "https://youtu.be/z6KoLIER_I8?si=wAI2nKord_zxDqvc",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-22",
    type: EventType.FESTIVAL,
    title: '일본 "오다이바 보켄왕 2024" (Odaiba Bouken-ou 2024)',
    location: "오다이바 공연장",
    country: "JP",
    city: "도쿄 (Tokyo)",
    description:
      '도쿄 오다이바에서 개최되는 여름 축제 "보켄왕 2024" 뮤직 스테이지 출연. Songbird 신곡 무대 공연.',
  },
  {
    date: "2024-07-22",
    type: EventType.RADIO,
    title: "[FM NACK5] ALL The Feels",
    country: "JP",
    description: '일본 라디오 "ALL The Feels" 출연.',
    appearance: {
      programName: "올 더 필즈",
    },
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "유우시", "재희"],
    },
    relatedUrl: "https://www.nack5.co.jp/blog/allthefeels/14683",
  },
  {
    date: "2024-07-23",
    type: EventType.RADIO,
    title: "[FM NACK5] ALL The Feels",
    country: "JP",
    description: '일본 라디오 "ALL The Feels" 출연.',
    appearance: {
      programName: "올 더 필즈",
    },
    participants: {
      type: "ONLY",
      memberNames: ["리쿠", "유우시", "재희"],
    },
    relatedUrl: "https://www.nack5.co.jp/blog/allthefeels/14683",
  },
  {
    date: "2024-07-24",
    type: EventType.RADIO,
    title: "[FM NACK5] ALL The Feels",
    country: "JP",
    description: '일본 라디오 "ALL The Feels" 출연.',
    appearance: {
      programName: "올 더 필즈",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "료", "사쿠야"],
    },
    relatedUrl: "https://www.nack5.co.jp/blog/allthefeels/14683",
  },
  {
    date: "2024-07-25",
    type: EventType.RADIO,
    title: "[FM NACK5] ALL The Feels",
    country: "JP",
    description: '일본 라디오 "ALL The Feels" 출연.',
    appearance: {
      programName: "올 더 필즈",
    },
    participants: {
      type: "ONLY",
      memberNames: ["시온", "료", "사쿠야"],
    },
    relatedUrl: "https://www.nack5.co.jp/blog/allthefeels/14683",
  },
  {
    date: "2024-07-24",
    type: EventType.RADIO,
    title: "[M-ON!-TV] NCT WISH Special",
    country: "JP",
    description: '일본 뮤직 채널 "M-ON!-TV NCT WISH Special" 특집 방송 출연.',
    appearance: {
      programName: "M-ON!-TV NCT WISH Special",
      isPerformance: true,
      performedTrack: "Songbird",
      role: "특집 출연",
    },
  },
  {
    date: "2024-07-29",
    type: EventType.FANSIGN,
    title:
      "[Fansign] 'Songbird' 발매 기념 오프라인 팬사인회 이벤트 - 메이크스타",
    description: "발매 기념 대면 팬사인회 진행",
  },
  {
    date: "2024-07-29",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 VIDEO CALL EVENT - 이즈위",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2024-07-30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 VIDEO CALL EVENT - 인터아시아",
    description: "발매 기념 화상 팬사인회 진행",
  },

  // =================================
  // AUGUST 2024
  // =================================
  {
    date: "2024-08-04",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 료 생일",
    description: "Happy Ryo Day💛",
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
  },
  {
    date: "2024-08-06",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 VIDEO CALL EVENT - SMTOWN &STORE",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2024-08-09",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 VIDEO CALL EVENT - 디어마이뮤즈",
    description: "발매 기념 화상 팬사인회 진행",
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
  },
  {
    date: "2024-08-14",
    type: EventType.FANSIGN,
    title: "[Fansign] 'Songbird' 발매 기념 사인회 - 에버라인",
    description: "발매 기념 대면 팬사인회 진행",
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
    title: "[Awards] 2024 K-WORLD DREAM AWARDS",
    description:
      "잠실실내체육관에서 개최된 시상식. K-월드 드림 슈퍼루키상 수상.",
    location: "잠실실내체육관",
    country: "KR",
    city: "서울 (Seoul)",
    musicShowResult: {
      rank: 0,
      note: "K-World Dream Super Rookie Award",
    },
    linkedContents: [
      {
        title: "NCT WISH - Songbird @2024 K-WORLD DREAM AWARDS",
        url: "https://youtu.be/dummy_kworld_dream",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "Award Acceptance Speech",
        url: "https://youtu.be/dummy_speech",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
    ],
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
    title: "2024 NCT WISH ASIA TOUR LOG in JAPAN 발표",
    description: "첫 아시아 투어 공식 발표. 일본 6개 도시 개최.",
    country: "JP",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    relatedUrl: "https://nct-jp.net/ko/live/tour.php?id=1002619",
  },

  // =================================
  // SEPTEMBER 2024
  // =================================
  /* TODO: https://nct-jp.net/ko/schedule/detail.php?id=1108143 */
  {
    date: "2024-09-01",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] TMEA 2024 Behind",
    linkedContents: [
      {
        title:
          "마카오에서의✈️ 떨리는 첫 무대❕(feat. 에그타르트, 훠궈 먹방) | マカオで緊張の初ステージ 💗 (feat. エッグタルト、火鍋モッパン🥢) | TMEA 2024 Behind",
        url: "https://youtu.be/svpE2joFVR8?si=W0wKs6ueTbA5QF0C",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-01",
    type: EventType.FESTIVAL,
    title: "[Festival] a-nation 2024 - Day 1",
    location: "아지노모토 스타디움",
    country: "JP",
    city: "도쿄 (Tokyo)",
    description:
      'TV Asahi의 대표 여름 음악 페스티벌 "a-nation 2024" Day 1. 일본의 인기 가수와 K-POP 아티스트들이 한 무대에 모이는 것으로 유명. NCT WISH는 오후 타임에 출연. Songbird, We Go!, Wish 등 히트곡 무대.',
    linkedContents: [],
  },
  {
    date: "2024-09-20",
    type: EventType.ONLINE_CONTENT,
    title: "[Reaction] Steady MV Reaction",
    description: "Steady 뮤직비디오 리액션",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "REACTION to 'Steady' MVㅣNCT WISH Reaction",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.REACTION,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-22",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] Steady Album Unboxing",
    description: "Steady 앨범 언박싱",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "Steady Album Unboxing with NCT WISH",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-23",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 3분까진 필요 없는 WISH 라면 가게 EP.1",
    appearance: {
      programName: "3분까진 필요 없는 WISH 라면 가게",
      episode: "1화",
    },
    linkedContents: [
      {
        title:
          "라면을 탱탱하게 끓여보자⸝⸝ʚ̴̶̷̆ˬʚ̴̶̷̆⸝⸝🌟 | ラーメンをぷりぷりに作ってみよう🍜 | 3분까진 필요 없는 WISH 라면 가게 EP.1",
        url: "https://youtu.be/NqQUpr2rpyg?si=PVBBeg1wFpsVWUYM",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-02",
    type: EventType.ANNOUNCEMENT,
    title: "The 1st Mini Album 'Steady' 스케줄 포스터 공개",
    description: "첫 미니앨범 컴백 프로모션 타임테이블 공개.",
    albumTitle: "Steady", // 앨범 자동 연결
    relatedUrl: "https://twitter.com/nctwishofficial",
  },
  {
    date: "2024-09-02",
    type: EventType.RELEASE,
    title: "[Pre-order] Steady 앨범 예약 판매",
    description:
      '첫 정규 미니앨범 "Steady"의 공식 예약 판매 시작 (9월 2일 온/오프라인 동시). 사전 주문 현황: 이틀 만에 100,000장, 최종 800,000장 돌파 (자체 최고 기록).',
    country: "KR",
    albumTitle: "Steady",
    relatedUrl: "https://weverse.io/nctwish/notice",
  },
  {
    date: "2024-09-08",
    type: EventType.RELEASE,
    title: "'Dunk Shot' MV Teaser",
    description: "첫 번째 선공개곡 덩크슛 뮤직비디오 티저.",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "Dunk Shot MV Teaser",
        url: "https://youtu.be/dummy_dunkshot_teaser",
        type: ContentType.TEASER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-08",
    type: EventType.FESTIVAL,
    title: "[Awards] The Fact Music Awards 2024",
    location: "Big-X (오사카)",
    country: "JP",
    city: "오사카 (Osaka)",
    description:
      '일본에서 개최되는 "The Fact Music Awards 2024". K-POP과 J-POP을 아우르는 음악 시상식. NCT WISH의 활약상 인정.',
  },
  {
    date: "2024-09-09",
    type: EventType.RELEASE,
    title: "Pre-release 'Dunk Shot' 음원/MV 공개",
    description:
      '첫 미니앨범 선공개곡 "Dunk Shot" 발매. 농구 콘셉트의 청량한 퍼포먼스.',
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "NCT WISH 'Dunk Shot' MV",
        url: "https://youtu.be/dummy_dunkshot_mv", // [확인 필요]
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
      {
        title: "Dunk Shot Performance Video",
        url: "https://youtu.be/dummy_dunkshot_perf",
        type: ContentType.PERFORMANCE_VIDEO,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-16",
    type: EventType.RELEASE,
    title: "[Pre-release] '3분까진 필요 없어 (3 Minutes)' 공개",
    description: "두 번째 선공개곡. 몽환적이고 키치한 매력의 곡.",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "NCT WISH '3분까진 필요 없어 (3 Minutes)' MV",
        url: "https://youtu.be/dummy_3minutes_mv",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-24",
    type: EventType.RELEASE,
    title: "1st Mini Album 'Steady' 발매",
    description:
      'NCT WISH의 첫 번째 미니앨범. 선주문 80만 장 돌파, 타이틀곡 "Steady" 포함 총 7곡 수록.',
    country: "KR",
    albumTitle: "Steady",
    relatedUrl: "https://nct-jp.net/discography/detail.php?id=1020584",
    linkedContents: [
      {
        title: "NCT WISH 'Steady' MV",
        url: "https://youtu.be/dummy_steady_mv",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
      {
        title: "Steady Cheering Guide",
        url: "https://youtu.be/dummy_fanchant",
        type: ContentType.OTHER, // 응원법
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-10",
    type: EventType.ONLINE_CONTENT,
    title: "[Fanchant] Dunk Shot 응원법 가이드",
    description: "Dunk Shot 응원법 공개",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "NCT WISH 'Dunk Shot' Fanchant Guide",
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-26",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "엠카운트다운",
      isPerformance: true,
      performedTrack: "Steady",
    },
    linkedContents: [
      {
        title: "Steady - M COUNTDOWN Comeback Stage",
        url: "https://youtu.be/dummy_mcd_steady",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-27",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "Steady",
    },
  },
  {
    date: "2024-09-28",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
      performedTrack: "Steady",
    },
  },
  {
    date: "2024-09-28",
    type: EventType.VARIETY_SHOW,
    title: "아이돌 인간극장 (Idol Human Theater)",
    description: 'NCT WISH 편 출연. "젠Z 아이돌의 기강 잡기?"',
    linkedContents: [
      {
        title: "[아이돌 인간극장] NCT WISH 편",
        url: "https://youtu.be/dummy_human_theater",
        type: ContentType.VARIETY_CLIP,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-09-29",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "인기가요",
      isPerformance: true,
      performedTrack: "Steady",
    },
  },
  {
    date: "2024-09-29",
    type: EventType.ONLINE_CONTENT,
    title: "[Behind] GQ KOREA Photoshoot Behind the Scenes",
    linkedContents: [
      {
        title:
          "내 빵 오디가쏘?!🍩💨 위시의 연기 도전🎥 | ぼくのパンどこいった?!🥐 WISHの演技チャレンジ✨ | GQ KOREA Photoshoot Behind",
        url: "https://youtu.be/Xbjjrggxt1g?si=VsnHt0Aob-gfH00o",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },

  // =================================
  // OCTOBER 2024
  // =================================
  {
    date: "2024-10-02",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] 3분까진 필요 없는 WISH 라면 가게 EP.2",
    appearance: {
      programName: "3분까진 필요 없는 WISH 라면 가게",
      episode: "2화",
    },
    linkedContents: [
      {
        title:
          "우리 라면 가게🍜 이대로 가면 돼 ᜊ( ' ⩊ '𖦹) | 僕らのラーメン屋さん🍥このまま行けばいい🕰️ | 3분까진 필요없는 WISH 라면가게 EP.2",
        url: "https://youtu.be/1paiksZ7pUM?si=xw0ymskK5-mTRQJ0",
        type: ContentType.WEB_VARIETY,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-10-03",
    type: EventType.FESTIVAL,
    title: "[Festival] 2024 K-뮤직 시즌 : 굿밤 콘서트 - 부산",
    location: "부산 야외 공연장",
    country: "KR",
    city: "부산 (Busan)",
    description:
      '2024 K-뮤직 시즌의 일환으로 부산에서 개최되는 "굿밤 콘서트". 한국 대표 아티스트들과 K-POP 신인들이 모이는 대규모 음악 축제. Steady 신곡으로 부산 팬들을 만남.',
  },
  {
    date: "2024-10-04",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크 (Music Bank) 1위",
    description: "🏆 데뷔 후 첫 지상파 음악방송 1위 (1004 = 천사데이).",
    country: "KR",
    albumTitle: "Steady",
    appearance: {
      programName: "뮤직뱅크",
      isPerformance: true,
      performedTrack: "Steady",
    },
    linkedContents: [
      {
        title: "Steady - NCT WISH  [뮤직뱅크/Music Bank] | KBS 241004 방송",
        url: "https://www.youtube.com/watch?v=lnhn7zdmj8E",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "[4K] 엔시티 위시 'Steady' 뮤직뱅크 1위 앵콜직캠(NCT WISH Encore Facecam) @뮤직뱅크(Music Bank) 241004",
        url: "https://www.youtube.com/watch?v=ZDmG_jZbs-g",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
      },
      {
        title:
          "[얼빡직캠 4K] 엔시티 위시 사쿠야 'Steady'(NCT WISH SAKUYA Facecam) @뮤직뱅크(Music Bank) 241004",
        url: "https://www.youtube.com/watch?v=MoJZQrNIV8c",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
        cast: ["사쿠야"],
      },
      {
        title:
          "[얼빡직캠 4K] 엔시티 위시 료 'Steady'(NCT WISH RYO Facecam) @뮤직뱅크(Music Bank) 241004",
        url: "https://www.youtube.com/watch?v=9lLgTPg-L6c",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
        cast: ["료"],
      },
      {
        title:
          "[K-Fancam] 엔시티 위시 시온 직캠 'Steady'(NCT WISH SION Fancam) @뮤직뱅크(Music Bank) 241004",
        url: "https://www.youtube.com/watch?v=5CSX_KJqYzc",
        type: ContentType.OFFICIAL_CAM,
        platform: Platform.YOUTUBE,
        cast: ["시온"],
      },
    ],
    musicShowResult: {
      rank: 1,
      score: 5820,
      note: "데뷔 후 첫 지상파 1위 (1004 = 천사데이) 👼",
    },
  },
  {
    date: "2024-10-05",
    type: EventType.FESTIVAL,
    title: "[Festival] 2024 K-Link Festival",
    location: "공연장",
    country: "KR",
    description:
      "2024 K-Link Festival 출연. 한국 최고 인기 아티스트들과 함께 무대.",

    linkedContents: [
      {
        title:
          "241005 NCT WISH - Dunk Shot 엔시티 위시 유우시 직캠 YUSHI FANCAM @ K-Link Festival",
        url: "https://www.youtube.com/watch?v=EtF5_pQuVO8",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title:
          "241005 NCT WISH 엔시티 위시 'Dunk Shot' 유우시 직캠 YUSHI FANCAM｜K-Link Festival",
        url: "https://www.youtube.com/watch?v=HD6m4BgzW0k",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title:
          "[4K] 241005 NCT WISH - Songbird (Korean Ver.) YUSHI FOCUS @K-Link Festival",
        url: "https://www.youtube.com/watch?v=BL6CkNomodg",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
        cast: ["유우시"],
      },
      {
        title: "241005 K-LINK FESTIVAL NCT WISH - DUNK SHOT",
        url: "https://www.youtube.com/watch?v=XOnoNWRJO1w",
        type: ContentType.FANCAM,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, Songbird | 2024 K-Link Festival",
        url: "https://www.youtube.com/watch?v=DMsR_qY7BQs",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, WISH | 2024 K-Link Festival",
        url: "https://www.youtube.com/watch?v=CKQVcB57EQQ",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, Dunk Shot | 2024 K-Link Festival",
        url: "https://www.youtube.com/watch?v=BvAJnKdoo4o",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
      {
        title: "NCT WISH, Steady | 2024 K-Link Festival",
        url: "https://www.youtube.com/watch?v=ycQtlhJ6S1E",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-10-12",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] SBS Inkigayo LIVE in Tokyo (일본 특집)",
    location: "사이타마 슈퍼 아레나",
    country: "JP",
    city: "사이타마 (Saitama)",
    description:
      'SBS "Inkigayo"의 일본 특집 공연 버전이 사이타마 슈퍼 아레나에서 개최. 한국 최고 인기 아티스트들과 함께 일본 팬들을 위한 특별 공연. Steady 신곡 첫 일본 공연.',
    appearance: {
      programName: "SBS Inkigayo LIVE in Tokyo",
      isPerformance: true,
      performedTrack: ["Steady"],
    },
    linkedContents: [],
  },
  {
    date: "2024-10-15",
    type: EventType.RELEASE,
    title: "포켓몬스터: 테라스탈 데뷔 OST 참여",
    description:
      "포켓몬스터: 테라스탈 데뷔 오리지널 사운드트랙에 NCT WISH의 곡이 수록. 글로벌 게임과의 첫 콜라보레이션.",
    country: "KR",
    linkedContents: [
      {
        title: "Pokémon Scarlet & Violet OST",
        url: "https://youtu.be/example",
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-10-19",
    type: EventType.FESTIVAL,
    title: "Dream Concert 2024",
    location: "고양 스타디움",
    country: "KR",
    city: "고양 (Goyang)",
    description:
      'MBC 주최 "Dream Concert 2024" 출연. 한국 최대 규모의 가을 음악제. 약 30분 분량의 무대 공연.',
    linkedContents: [],
  },
  {
    date: "2024-10-22",
    type: EventType.ANNOUNCEMENT,
    title: "[Announcement] 리쿠 건강상 이유로 인한 활동 일시 중단",
  },

  // =================================
  // NOVEMBER 2024
  // =================================
  {
    date: "2024-11-03",
    type: EventType.TOUR,
    title: "NCT WISH ASIA TOUR LOG in - 이시카와 (Day 1)",
    description: "첫 아시아 투어 일본 공연의 시작.",
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
    relatedUrl: "https://nct-jp.net/en/live/tour.php?id=1002619",
    linkedContents: [
      {
        title: "LOG in JAPAN Ishikawa Day 1 - Behind",
        url: "https://www.youtube.com/watch?v=4gne3A7MV0c",
        type: ContentType.BEHIND,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-11-04",
    type: EventType.TOUR,
    title: "2024 NCT WISH ASIA TOUR LOG in JAPAN - Ishikawa (Day 2)",
    location: "혼다노모리 호쿠덴 홀",
    country: "JP",
    city: "이시카와 (Ishikawa)",
    description:
      "이시카와 투어 2일차 (공휴일). 오픈: 15:00 / 스타트: 16:00. 첫 ASIA TOUR의 기대감을 이어가는 공연.",
    seriesName: "2024 NCT WISH ASIA TOUR LOG in JAPAN",
  },
  {
    date: "2024-11-09",
    type: EventType.TOUR,
    title: "2024 NCT WISH ASIA TOUR LOG in JAPAN - Kyoto (Day 1)",
    location: "Rohm Theatre Kyoto (롬시어터 교토)",
    country: "JP",
    city: "교토 (Kyoto)",
    description: "교토의 롬시어터에서 2회 공연. 오픈: 16:00 / 스타트: 17:00.",
    seriesName: "2024 NCT WISH ASIA TOUR LOG in JAPAN",
  },
  {
    date: "2024-11-10",
    type: EventType.TOUR,
    title: "2024 NCT WISH ASIA TOUR LOG in JAPAN - Kyoto (Day 2)",
    location: "Rohm Theatre Kyoto (롬시어터 교토)",
    country: "JP",
    city: "교토 (Kyoto)",
    description: "교토 투어 2일차. 오픈: 15:00 / 스타트: 16:00.",
    seriesName: "2024 NCT WISH ASIA TOUR LOG in JAPAN",
  },
  {
    date: "2024-11-17",
    type: EventType.AWARD_SHOW,
    title: "[Awards] 2024 KGMA (Korea Grand Music Awards)",
    description: "인천 인스파이어 아레나에서 개최된 제1회 KGMA 참석.",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    musicShowResult: {
      rank: 0,
      note: "IS RISING STAR Award",
    },
    linkedContents: [
      {
        title: "NCT WISH - Steady @2024 KGMA",
        url: "https://youtu.be/dummy_kgma_stage",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-11-18",
    type: EventType.BIRTHDAY,
    title: "[Birthday] 사쿠야 생일",
    description: "Happy Sakuya Day🩷",
    participants: {
      type: "ONLY",
      memberNames: ["사쿠야"],
    },
  },
  {
    date: "2024-11-27",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - Kanagawa (Day 1)",
    location:
      "Pacifico Yokohama Kokuritsu Daihall (파시피코 요코하마 국립대호)",
    country: "JP",
    city: "요코하마 (Yokohama)",
    description:
      "오픈: 17:30 / 스타트: 18:30. 이시카와, 교토에 이어 세 번째 투어 도시.",
    seriesName: "2024 NCT WISH ASIA TOUR LOG in JAPAN",
  },
  {
    date: "2024-11-28",
    type: EventType.TOUR,
    title: "[Tour] 2024 NCT WISH ASIA TOUR LOG in JAPAN - Kanagawa (Day 2)",
    location:
      "Pacifico Yokohama Kokuritsu Daihall (파시피코 요코하마 국립대호)",
    country: "JP",
    city: "요코하마 (Yokohama)",
    description: "요코하마 투어 2일차. 오픈: 17:30 / 스타트: 18:30.",
    seriesName: "2024 NCT WISH ASIA TOUR LOG in JAPAN",
  },

  // ===========================================
  // DECEMBER 2024
  // ===========================================
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
    date: "2024-12-13",
    type: EventType.TOUR,
    title: "NCT WISH ASIA TOUR LOG in - Aichi (Day 1)",
    location: "아이치 시민 홀",
    country: "JP",
    city: "아이치 (Aichi)",
    seriesName: "NCT WISH ASIA TOUR LOG in",
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
    type: EventType.MUSIC_SHOW,
    title: "KBS 2024 뮤직뱅크 글로벌 페스티벌 in 재팬",
    country: "JP",
    description:
      'KBS "뮤직뱅크" 2024년 글로벌 페스티벌 특집 방송. 일본에서 수행되는 한국 대표 음악방송 특집 공연. NCT WISH의 글로벌 위상을 보여주는 출연.',
    appearance: {
      programName: "Music Bank Global Festival in Japan",
      isPerformance: true,
      performedTrack: ["Steady"],
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
    title: "Japan 1st Album 'WISHFUL' 발매",
    description:
      'NCT WISH의 일본 정규 1집. 크리스마스 선물 같은 앨범. 타이틀곡 "Wishful Winter".',
    country: "JP",
    albumTitle: "WISHFUL",
    relatedUrl: "https://nct-jp.net/discography/detail.php?id=1020650",
    linkedContents: [
      {
        title: "NCT WISH 'Wishful Winter' MV",
        url: "https://youtu.be/dummy_wishful_winter_mv", // [확인 필요]
        type: ContentType.MV,
        platform: Platform.YOUTUBE,
      },
      {
        title: "Wishful Winter Cheering Guide",
        url: "https://youtu.be/dummy_winter_fanchant",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-12-25",
    type: EventType.CONCERT,
    title: "2024 SBS 가요대전 (Gayo Daejeon)",
    description: "크리스마스 특집 연말 무대. 인스파이어 아레나.",
    location: "인스파이어 아레나",
    country: "KR",
    city: "인천 (Incheon)",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "NCT WISH - Steady + Wishful Winter @SBS Gayo Daejeon",
        url: "https://youtu.be/dummy_gayo_daejeon",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
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
    linkedContents: [
      {
        title: "NCT WISH - Songbird (Japanese Ver.) @Japan Record Awards",
        url: "https://youtu.be/dummy_jra_stage",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-12-31",
    type: EventType.CONCERT,
    title: "2024 MBC 가요대제전 (Gayo Daejejeon)",
    location: "상암 MBC",
    country: "KR",
    city: "서울 (Seoul)",
    albumTitle: "Steady",
    linkedContents: [
      {
        title: "NCT WISH - Year-end Special Stage",
        url: "https://youtu.be/dummy_mbc_gayo",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
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
  },

  // ==========================================
  // 광고 및 브랜드 콜라보 (2024)
  // ==========================================
  {
    date: "2024-01-01",
    type: EventType.CF_AD,
    title: "[CF] 韓国グルメ大集合 (한국 구르메 대집합)",
    description: "일본 식품 광고 모델",
    country: "JP",
  },
  {
    date: "2024-01-01",
    type: EventType.CF_AD,
    title: "[CF] 맥도날드 - 온 우주가 널 응원해",
    description: "맥도날드 광고 모델 (리쿠 제외)",
    country: "KR",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "유우시", "재희", "료", "사쿠야"],
    },
  },
  {
    date: "2024-01-01",
    type: EventType.CF_AD,
    title: "[CF] 뚜레쥬르 - Wish you a Happy Holiday",
    description: "뚜레쥬르 2025 소원성취 캠페인 모델",
    country: "KR",
  },

  // ==========================================
  // 화보 및 매거진 (2024)
  // ==========================================
  {
    date: "2024-02-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 데이즈드 코리아 2월호",
    description: "데이즈드 코리아 2월호 화보",
  },
  {
    date: "2024-03-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 싱글즈 3월호 (커버)",
    description: "싱글즈 3월호 커버 및 화보",
  },
  {
    date: "2024-04-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 마리끌레르 코리아 4월호",
    description: "마리끌레르 코리아 4월호 화보",
  },
  {
    date: "2024-07-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 나일론 7월호 (커버)",
    description: "나일론 7월호 커버 및 화보",
  },
  {
    date: "2024-07-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 엘르 7월호 (커버)",
    description: "엘르 7월호 커버 및 화보",
  },
  {
    date: "2024-09-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] non-no 9월호",
    description: "non-no 9월호 화보 (일본)",
    country: "JP",
  },
  {
    date: "2024-10-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 얼루어 10월호",
    description: "얼루어 10월호 화보",
  },
  {
    date: "2024-12-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] XBlush 겨울호",
    description: "XBlush 겨울호 화보 (리쿠 제외)",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "유우시", "재희", "료", "사쿠야"],
    },
  },
  {
    date: "2024-12-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 엘르걸 12월호",
    description: "엘르걸 12월호 화보",
  },

  // ==========================================
  // 팝업 스토어 (2024)
  // ==========================================
  {
    date: "2024-02-08",
    startDate: "2024-02-08",
    endDate: "2024-02-21",
    type: EventType.POPUP_STORE,
    title: "[Pop-up] WISH STATION",
    description: "WISH STATION 팝업 스토어",
    location: "더현대 서울 지하 2층 아이코닉 스퀘어",
    country: "KR",
    city: "서울 (Seoul)",
  },
  {
    date: "2024-09-25",
    startDate: "2024-09-25",
    endDate: "2024-10-13",
    type: EventType.POPUP_STORE,
    title: "[Pop-up] LET'S GO STEADY",
    description: "LET'S GO STEADY 팝업 스토어",
    location: "서울시 성동구 왕십리로 63 언더스탠드 에비뉴",
    country: "KR",
    city: "서울 (Seoul)",
  },

  // ==========================================
  // 특별 무대 (Special Stages - 2024)
  // ==========================================
  {
    date: "2024-07-21",
    type: EventType.ONLINE_CONTENT,
    title: '[Cover] 신화 "으싸! 으쌰!" Cover Video',
    description: "SBS 가요대전 Summer에서 선보인 신화 커버 무대 영상",
    linkedContents: [
      {
        title: 'NCT WISH - 신화 "으싸! 으쌰!" Cover',
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.COVER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-28",
    type: EventType.ONLINE_CONTENT,
    title: '[Cover] NCT DREAM "TAP + Smoothie" Cover Video',
    description: "쇼! 음악중심 in JAPAN에서 선보인 NCT DREAM 커버 무대 영상",
    linkedContents: [
      {
        title: 'NCT WISH - NCT DREAM "TAP + Smoothie" Cover',
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.COVER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2024-07-28",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심 in JAPAN - TAP + Smoothie (NCT DREAM 커버)",
    description: 'NCT DREAM "TAP + Smoothie" 특별 무대 (퍼포먼스 위주)',
    country: "JP",
    appearance: {
      programName: "쇼! 음악중심",
      isPerformance: true,
    },
  },
  {
    date: "2024-12-31",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 2024 MBC 가요대제전: WANNABE - Kissing You (소녀시대 커버)",
    description: '소녀시대 "Kissing You" 특별 무대 (리쿠 제외)',
    country: "KR",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "유우시", "재희", "료", "사쿠야"],
    },
    appearance: {
      isPerformance: true,
    },
  },
  {
    date: "2024-12-31",
    type: EventType.ONLINE_CONTENT,
    title: '[Cover] 소녀시대 "Kissing You" Cover Video',
    description: "MBC 가요대제전에서 선보인 소녀시대 커버 무대 영상",
    participants: {
      type: "ONLY",
      memberNames: ["시온", "유우시", "재희", "료", "사쿠야"],
    },
    linkedContents: [
      {
        title: 'NCT WISH - 소녀시대 "Kissing You" Cover',
        url: "https://www.youtube.com/watch?v=example",
        type: ContentType.COVER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
];
/** https://open.spotify.com/playlist/37i9dQZF1DWW5unMLFzqYY?si=5p1DXoX3TvWq0sD86catww
https://swtvnews.com/news/newsview.php?ncode=1065553892825050
https://news.nate.com/view/20240416n40847
https://youtu.be/tlzNcoQp9kE
https://youtu.be/YYDnICK2etk */
