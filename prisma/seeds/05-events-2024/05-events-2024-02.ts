// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../../../src/types/event";

export const events202402: EventInput[] = [
  // ==========================================
  // FEBRUARY 2024
  // ==========================================
  {
    date: "2024-02-01",
    type: EventType.ONLINE_CONTENT,
    title: "[Content] WISH BAKERY EP.1",
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
    title: "[Album] 1st Single Album 《WISH》음원 공개",
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
    title: "[Physical] 일본 1st Single Album《WISH》음반 발매",
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
        type: ContentType.CHEERING_GUIDE,
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

  // ==========================================
  // 화보 및 매거진 (2024)
  // ==========================================
  {
    date: "2024-02-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 데이즈드 코리아 2월호",
    description: "데이즈드 코리아 2월호 화보",
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
];
