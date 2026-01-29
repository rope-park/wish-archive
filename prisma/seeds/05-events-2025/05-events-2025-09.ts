// prisma/seeds/05-events-2025.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202509: EventInput[] = [
  // ==========================================
  // SEPTEMBER 2025
  // ==========================================
  {
    date: "2025-09-01",
    time: "18:00",
    type: EventType.RELEASE,
    title: "[Album] The 3rd Mini Album《COLOR》발매",
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
    date: "2025-09-01",
    time: "18:30",
    type: EventType.EVENT,
    title: "[Event] 멜론뮤직 MUSIC WAVE 채팅 이벤트",
    country: "KR",
    albumTitle: "COLOR",
  },
  {
    date: "2025-09-02",
    time: "20:00",
    type: EventType.SHOWCASE,
    title: "[Showcase] NCT WISH COLOR PALETTE ",
    location: "코엑스 (COEX) 동측 광장",
    country: "KR",
    city: "서울 (Seoul)",
    albumTitle: "COLOR",
  },
  {
    date: "2025-09-03",
    time: "18:30",
    type: EventType.EVENT,
    title: "[Event] 멜론뮤직 MUSIC WAVE 채팅 이벤트",
    country: "KR",
    albumTitle: "COLOR",
  },
  {
    date: "2025-09-03",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 애플뮤직",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-09-04",
    time: "12:00",
    type: EventType.VARIETY_SHOW,
    title: "[Mnet Plus] WiDE K-POP NEWS",
    country: "KR",
    appearance: {
      programName: "WiDE K-POP NEWS",
    },
  },
  {
    date: "2025-09-04",
    time: "18:00",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "엠카운트다운",
    },
  },
  {
    date: "2025-09-04",
    time: "21:30",
    type: EventType.EVENT,
    title: "[Event] 스포티파이 리스닝 파티 (Spotify Listening Party)",
    country: "KR",
    albumTitle: "COLOR",
  },
  {
    date: "2025-09-05",
    time: "17:05",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "뮤직뱅크",
    },
  },
  {
    date: "2025-09-06",
    time: "15:15",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "쇼! 음악중심",
    },
  },
  {
    date: "2025-09-06",
    time: "17:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 사인회 - 예스24",
    description: "발매 기념 대면 팬사인회 진행",
  },
  {
    date: "2025-09-07",
    time: "15:20",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "인기가요",
    },
  },
  {
    date: "2025-09-07",
    time: "17:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 사인회 - 뮤직아트",
    description: "발매 기념 대면 팬사인회 진행",
  },
  {
    date: "2025-09-07",
    time: "18:05",
    type: EventType.VARIETY_SHOW,
    title: "[MBC] 복면가왕",
    country: "KR",
    participants: {
      type: "ONLY",
      memberNames: ["재희"],
    },
  },
  {
    date: "2025-09-08",
    time: "20:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 케이타운포유",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-09-11",
    time: "18:00",
    type: EventType.MUSIC_SHOW,
    title: "[Mnet] 엠카운트다운",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "엠카운트다운",
    },
  },
  {
    date: "2025-09-11",
    time: "20:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 에버라인",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-09-12",
    time: "17:05",
    type: EventType.MUSIC_SHOW,
    title: "[KBS2] 뮤직뱅크",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "뮤직뱅크",
    },
  },
  {
    date: "2025-09-13",
    time: "15:15",
    type: EventType.MUSIC_SHOW,
    title: "[MBC] 쇼! 음악중심",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "쇼! 음악중심",
    },
  },
  {
    date: "2025-09-14",
    time: "15:20",
    type: EventType.MUSIC_SHOW,
    title: "[SBS] 인기가요",
    country: "KR",
    albumTitle: "COLOR",
    appearance: {
      programName: "인기가요",
    },
  },
  {
    date: "2025-09-14",
    time: "17:30",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 사인회 - SMTOWN &STORE",
    description: "발매 기념 대면 팬사인회 진행",
  },
  {
    date: "2025-09-15",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 메이크스타",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-09-18",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 비트로드",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-09-20",
    type: EventType.AWARD_SHOW,
    title: "[Award Show] 2025 더팩트 뮤직 어워즈 (THE FACT MUSIC AWARDS)",
    location: "마카오 아웃도어 퍼포먼스 베뉴 (Macao Outdoor Performance Venue)",
    country: "MO",
    city: "마카오 (Macao)",
  },
  {
    date: "2025-09-29",
    time: "19:00",
    type: EventType.FANSIGN,
    title: "[Fansign] 'COLOR' 발매 기념 VIDEO CALL EVENT - 뮤직아트",
    description: "발매 기념 화상 팬사인회 진행",
  },
  {
    date: "2025-09-30",
    type: EventType.FESTIVAL,
    title: "[Festival] 2025 MASTERPEACE 가을 대동제 : Holiday",
    location: "경희대학교 서울캠퍼스",
    country: "KR",
    city: "서울 (Seoul)",
  },

  // ==========================================
  // 팝업 스토어 (2025)
  // ==========================================
  {
    date: "2025-09-02",
    startDate: "2025-09-02",
    endDate: "2025-09-09",
    type: EventType.POPUP_STORE,
    title: "[Pop-up] FIND YOUR COLOR",
    description: "FIND YOUR COLOR 팝업 스토어",
    albumTitle: "COLOR",
    location: "COLOR TOWN & ARCADE (성수동)",
    country: "KR",
    city: "서울 (Seoul)",
  },
];
