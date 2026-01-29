// prisma/seeds/05-events-2024.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202403: EventInput[] = [
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
    title: "[Physical] 한국 1st Single Album 《WISH》음반 발매",
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
    time: "19:20",
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
    time: "15:15",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    appearance: {
      programName: "쇼! 음악중심",
    },
    albumTitle: "WISH",
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
    description: "발매 기념 대면 팬사인회 진행",
    albumTitle: "WISH",
  },
  {
    date: "2024-03-16",
    type: EventType.FANMEETING,
    title: "[Fansign] 'WISH' 발매 기념 팬사인회 - 애플뮤직",
    description: "발매 기념 대면 팬사인회 진행",
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
    albumTitle: "WISH",
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
    description: "발매 기념 대면 팬사인회 진행",
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
    description: "발매 기념 대면 팬사인회 진행",
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
    description: "발매 기념 대면 팬사인회 진행",
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
    albumTitle: "WISH",
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
    location: "AsiaWorld-Expo ARENA",
    country: "HK",
    city: "Hong Kong (홍콩)",
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
    city: "Hong Kong (홍콩)",
    seriesName: "KCON",
  },

  // ==========================================
  // 화보 및 매거진 (2024)
  // ==========================================
  {
    date: "2024-03-01",
    type: EventType.MAGAZINE,
    title: "[Magazine] 싱글즈 3월호 (커버)",
    description: "싱글즈 3월호 커버 및 화보",
  },
];
