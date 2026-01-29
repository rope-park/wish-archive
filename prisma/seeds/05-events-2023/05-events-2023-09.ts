// prisma/seeds/05-events-2023.ts
import {
  EventType,
  ContentType,
  Platform,
  ExternalLinkType,
} from "@prisma/client";
import type { EventInput } from "../types-event";

export const events202309: EventInput[] = [
  // ==========================================
  // SEPTEMBER 2023
  // ==========================================
  /*
### **🏆 최종 데뷔 멤버 (6명)**

| 순위 | 이름 | 국가 | 특이사항 |
|------|------|------|---------|
| **1위** | 리쿠(陸生) | 🇯🇵 | 메인댄서, 최종 1위 |
| **확정** | 시온(シオン) | 🇰🇷 | 리더, 리드보컬 (사전 확정) |
| **확정** | 유우시(ユウシ) | 🇯🇵 | 메인댄서 (사전 확정) |
| **2위** | 사쿠야(桜也) | 🇯🇵 | 보컬 |
| **3위** | 료(遼) | 🇯🇵 | 보컬 |
| **(추가)** | 대영(大英) | 🇰🇷 | **Ep.4 추가 합류, 메인보컬** |

✅ **최종 멤버 6명 확정**: 시온, 유우시, 리쿠(1위), 사쿠야, 료, 대영  
✅ **프리 데뷔 투어**: 10월 8일~12월 20일 (9개 도시, 24회)  
***
*/
  {
    date: "2023-09-07",
    type: EventType.VARIETY_SHOW,
    title: "[ENA] NCT Universe : LASTART (Ep.7)",
    description:
      "최종 관문 무대 공개 및 데뷔 멤버 확정.\n게스트: 강타, 이특, 쟈니, 해찬, 태용",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (KR)",
      episode: "7회",
    },
    linkedContents: [
      {
        title: "SM 명곡 그룹 미션 '90's Love' 무대 다시 보기",
        url: "https://youtu.be/OhKD0W3WsTc",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["시온", "유우시", "재희", "료", "사쿠야"],
      },
    ],
  },
  {
    date: "2023-09-07",
    type: EventType.ONLINE_CONTENT,
    title: "[SM C&C STUDIO] NCT NEW TEAM 프리 데뷔 멤버를 소개합니다!",
    description: "NCT NEW TEAM(가칭) 프리 데뷔 멤버 소개 영상 공개.",
    linkedContents: [
      {
        title:
          "[#라스타트] NCT NEW TEAM 프리 데뷔 멤버를 소개합니다! | NCT Universe : LASTART💫",
        url: "https://youtu.be/FjUjpPrUV3Y",
        type: ContentType.OTHER,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-09-09",
    type: EventType.CONCERT,
    title: "[Concert] NCT NATION : To The World-in JAPAN (Day 1)",
    description:
      "NCT 단체 콘서트 일본 공연 오프닝 게스트로 참여. 건강상의 이유로 정민 불참.",
    location: "나가이 육상 경기장 (얀마 스타디움 나가이)",
    country: "JP",
    city: "오사카 (Osaka)",
    linkedContents: [
      {
        title:
          "NCT NEW TEAM 'Hands Up' Opening act @2023 NCT CONCERT - NCT NATION : To The World",
        url: "https://youtu.be/3SWbFIdzAX4",
        type: ContentType.BROADCAST_STAGE,
        platform: Platform.YOUTUBE,
      },
    ],
  },
  {
    date: "2023-09-10",
    type: EventType.CONCERT,
    title: "[Concert] NCT NATION : To The World-in JAPAN (Day 2)",
    description:
      "NCT 단체 콘서트 일본 공연 오프닝 게스트로 참여. 건강상의 이유로 정민 불참.",
    location: "나가이 육상 경기장 (얀마 스타디움 나가이)",
    country: "JP",
    city: "오사카 (Osaka)",
  },
  {
    date: "2023-09-14",
    type: EventType.VARIETY_SHOW,
    title: "[ENA] NCT Universe : LASTART (Ep.8)",
    description: "데뷔 멤버 발표식 이후 & 단합 대회.\n(한국 방영분 최종회)",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (KR)",
      episode: "8회",
    },
    linkedContents: [
      {
        title: "SM 명곡 그룹 미션 'BOSS' 무대 다시 보기",
        url: "https://youtu.be/xvfHSpE_zO8",
        type: ContentType.REALITY,
        platform: Platform.YOUTUBE,
        cast: ["시온", "리쿠", "유우시"],
      },
    ],
  },
  {
    date: "2023-09-16",
    type: EventType.CONCERT,
    title: "[Concert] NCT NATION : To The World-in JAPAN (Day 3)",
    description:
      "NCT 단체 콘서트 일본 공연 오프닝 게스트로 참여. 건강상의 이유로 정민 불참.",
    location: "아지노모토 스타디움",
    country: "JP",
    city: "도쿄 (Tokyo)",
  },
  {
    date: "2023-09-17",
    type: EventType.CONCERT,
    title: "[Concert] NCT NATION : To The World-in JAPAN (Day 4)",
    description:
      "NCT 단체 콘서트 일본 공연 오프닝 게스트로 참여. 건강상의 이유로 정민 불참.",
    location: "아지노모토 스타디움",
    country: "JP",
    city: "도쿄 (Tokyo)",
  },
  {
    date: "2023-09-21",
    type: EventType.ONLINE_CONTENT,
    title: "[NTV] NCT Universe : LASTART (Ep.9) (일본 특별편)",
    description: "일본 NTV 단독 방영분.",
    country: "JP",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (JP)",
      episode: "9회",
    },
  },
  {
    date: "2023-09-28",
    type: EventType.ONLINE_CONTENT,
    title: "[NTV] NCT Universe : LASTART (Ep.10) (일본 특별편)",
    description: "지상파 첫 프리데뷔 Hands Up 무대 및 비하인드. (일본 최종회)",
    country: "JP",
    seriesName: "NCT Universe: LASTART",
    appearance: {
      programName: "NCT Universe : LASTART (JP)",
      episode: "10회",
    },
  },
  /* SMTOWN Friends, 제목없음 UTSM 콘텐츠 링크 추가 필요 */
];
