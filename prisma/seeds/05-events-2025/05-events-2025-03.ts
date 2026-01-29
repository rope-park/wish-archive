// prisma/seeds/05-events-2025.ts
import { EventType, ContentType, Platform, ExternalLinkType } from '@prisma/client';
import type { EventInput } from '../types-event';

export const events202503: EventInput[] = [
  // ==========================================
  // MARCH 2025
  // ==========================================
  {
    date: '2025-03-21',
    time: '20:00',
    type: EventType.TOUR,
    title: '[Tour] 2025 NCT WISH ASIA TOUR LOG in SEOUL (Day 1)',
    location: '올림픽공원 핸드볼경기장',
    country: 'KR',
    city: '서울 (Seoul)',
    seriesName: 'NCT WISH ASIA TOUR LOG in',
  },
  {
    date: '2025-03-22',
    time: '18:00',
    type: EventType.TOUR,
    title: '[Tour] 2025 NCT WISH ASIA TOUR LOG in SEOUL (Day 2)',
    description: 'NCT WISH ASIA TOUR 서울 공연 2일차 (Beyond LIVE 동시 생중계)',
    location: '올림픽공원 핸드볼경기장',
    country: 'KR',
    city: '서울 (Seoul)',
    seriesName: 'NCT WISH ASIA TOUR LOG in',
  },
  {
    date: '2025-03-23',
    time: '16:00',
    type: EventType.TOUR,
    title: '[Tour] 2025 NCT WISH ASIA TOUR LOG in SEOUL (Day 3)',
    description: 'NCT WISH ASIA TOUR 서울 공연 마지막 날 (Beyond LIVE 동시 생중계)',
    location: '올림픽공원 핸드볼경기장',
    country: 'KR',
    city: '서울 (Seoul)',
    seriesName: 'NCT WISH ASIA TOUR LOG in',
  },
];