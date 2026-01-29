// prisma/seeds/05-events-2026.ts
import { EventType, ContentType, Platform, ExternalLinkType } from '@prisma/client';
import type { EventInput } from '../types-event';

export const events202601: EventInput[] = [
  // ==========================================
  // JANUARY 2026
  // ==========================================
  {
    date: '2026-01-03',
    time: '18:00',
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH: Our WISH" in HYOGO (Day 1)',
    location: '고베 월드 홀',
    country: 'JP',
    city: '효고 (Hyogo)',
    seriesName: '1st CONCERT TOUR "INTO THE WISH: Our WISH"',
  },
  {
    date: '2026-01-04',
    time: '16:00',
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH: Our WISH" in HYOGO (Day 2)',
    location: '고베 월드 홀',
    country: 'JP',
    city: '효고 (Hyogo)',
    seriesName: '1st CONCERT TOUR "INTO THE WISH: Our WISH"',
  },
  {
    date: '2026-01-07',
    time: '12:00',
    type: EventType.RELEASE,
    title: "[OST] 위시캣 매직카드 OST 'Wishing Star' 음원 공개",
    country: 'KR',
  },
  {
    date: '2026-01-10',
    time: '18:30',
    type: EventType.AWARD_SHOW,
    title: '[Awards] 제40회 골든디스크 어워즈',
    location: '타이페이 돔',
    country: 'TW',
    city: '타이베이 (Taipei)',
    appearance: {
      programName: 'Golden Disc Awards',
      episode: '40회',
      isPerformance: true,
      performedTrack: 'Color', // 수정 필요
      role: '수상자'
    },
  },
  {
    date: '2026-01-17',
    time: '18:00',
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH: Our WISH" in TOKYO (Day 1)',
    location: '요요기 국립 스타디움 제1체육관',
    country: 'JP',
    city: '도쿄 (Tokyo)',
    seriesName: '1st CONCERT TOUR "INTO THE WISH: Our WISH"',
  },
  {
    date: '2026-01-18',
    time: '16:00',
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH: Our WISH" in TOKYO (Day 2)',
    location: '요요기 국립 스타디움 제1체육관',
    country: 'JP',
    city: '도쿄 (Tokyo)',
    seriesName: '1st CONCERT TOUR "INTO THE WISH: Our WISH"',
  },
  {
    date: '2026-01-20',
    time: '20:00',
    type: EventType.VARIETY_SHOW,
    title: '[Mnet Plus Original] ON THE MAP (온 더 맵)',
    country: 'KR',
    appearance: {
      programName: 'ON THE MAP',
      episode: '1화',
    },
  },
  {
    date: '2026-01-24',
    time: '19:00',
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH: Our WISH" in HONG KONG (Day 1)',
    location: 'AsiaWorld-Expo Arena',
    country: 'HK',
    city: '홍콩 (Hong Kong)',
    seriesName: '1st CONCERT TOUR "INTO THE WISH: Our WISH"',
  },
  {
    date: '2026-01-25',
    time: '19:00',
    type: EventType.TOUR,
    title: '[Tour] 1st CONCERT TOUR "INTO THE WISH: Our WISH" in HONG KONG (Day 2)',
    location: 'AsiaWorld-Expo Arena',
    country: 'HK',
    city: '홍콩 (Hong Kong)',
    seriesName: '1st CONCERT TOUR "INTO THE WISH: Our WISH"',
  },
    {
    date: '2026-01-27',
    time: '20:00',
    type: EventType.VARIETY_SHOW,
    title: '[Mnet Plus Original] ON THE MAP (온 더 맵)',
    country: 'KR',
    appearance: {
      programName: 'ON THE MAP',
      episode: '2화',
    },
  },
  {
    date: '2026-01-31',
    time: '17:00',
    type: EventType.CONCERT,
    title: '[Concert] SMTOWN LIVE 2025 in FUKUOKA (Day 1)',
    location: '미즈호 PayPay 돔 후쿠오카',
    country: 'JP',
    city: '후쿠오카 (Fukuoka)',
    seriesName: 'SMTOWN LIVE',
  }
];
