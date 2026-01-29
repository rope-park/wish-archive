// prisma/seeds/05-events-2025.ts
import { EventType, ContentType, Platform, ExternalLinkType } from '@prisma/client';
import type { EventInput } from '../types-event';

export const events202502: EventInput[] = [
  // ==========================================
  // FEBRUARY 2025
  // ==========================================
  {
    date: '2025-02-03',
    type: EventType.ANNOUNCEMENT,
    title: '[Announcement] NCT 리쿠 건강 상태 및 활동 복귀',
    description: 'NCT 리쿠의 건강 상태와 향후 활동 복귀에 대한 공식 발표',
  },
  /* SMTOWN 30주년 앨범 발매 데이터 추가 */
  {
    date: '2025-02-16',
    type: EventType.AWARD_SHOW,
    title: '[Awards] 32주년 한터뮤직어워즈 2024',
    location: '장충체육관',
    country: 'KR',
    city: '서울 (Seoul)',
    appearance: {
      programName: '한터뮤직어워즈',
    },
  },
  {
    date: '2025-02-21',
    type: EventType.ANNIVERSARY,
    milestone: true,
    title: '[Anniversary] NCT WISH 데뷔 1주년',
  },
  {
    date: '2025-02-22',
    time: '18:00',
    type: EventType.AWARD_SHOW,
    title: '[Awards] 제1회 디 어워즈',
    location: '고려대학교 화정체육관',
    country: 'KR',
    city: '서울 (Seoul)',
  },
];