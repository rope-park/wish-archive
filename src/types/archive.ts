// src/types/archive.ts
import { EventType, ContentType } from '@prisma/client';

// API (/api/archive) 응답 구조와 일치해야 함
export interface FileNode {
  id?: string;
  name: string;
  type: 'root' | 'drive' | 'folder' | 'era' | 'album' | 'event';
  description?: string;
  date?: string; // JSON 직렬화 시 Date -> string 변환됨
  cover?: string;
  eventType?: EventType;
  children?: FileNode[];
}

export interface FilterOption {
  label: string;
  value: EventType | ContentType;
  type: 'EVENT' | 'CONTENT';
  color: string;
}

// 필터용 상수 데이터 (DB Enum 매핑)
export const CATEGORY_FILTERS: FilterOption[] = [
  // --- [Event Type] 활동/스케줄 기준 ---
  { label: '발매', value: 'RELEASE', type: 'EVENT', color: 'bg-purple-200' },
  { label: '음악방송', value: 'MUSIC_SHOW', type: 'EVENT', color: 'bg-pink-200' },
  { label: '공연/행사', value: 'CONCERT', type: 'EVENT', color: 'bg-indigo-200' },
  { label: '팬미팅', value: 'FANMEETING', type: 'EVENT', color: 'bg-green-200' },
  { label: '투어', value: 'TOUR', type: 'EVENT', color: 'bg-green-200' },
  { label: '페스티벌', value: 'FESTIVAL', type: 'EVENT', color: 'bg-green-200' },
  { label: '시상식', value: 'AWARD_SHOW', type: 'EVENT', color: 'bg-green-200' },
  { label: '쇼케이스', value: 'SHOWCASE', type: 'EVENT', color: 'bg-green-200' },
  { label: '광고', value: 'CF_AD', type: 'EVENT', color: 'bg-green-200' },
  { label: '화보/잡지 촬영', value: 'MAGAZINE', type: 'EVENT', color: 'bg-green-200' },
  { label: '공식 발표/공지', value: 'ANNOUNCEMENT', type: 'EVENT', color: 'bg-green-200' },
  { label: '이벤트', value: 'EVENT', type: 'EVENT', color: 'bg-green-200' },
  { label: '라디오', value: 'RADIO', type: 'EVENT', color: 'bg-green-200' },
  { label: '생일', value: 'BIRTHDAY', type: 'EVENT', color: 'bg-green-200' },
  { label: '기념일', value: 'ANNIVERSARY', type: 'EVENT', color: 'bg-green-200' },
  { label: '기타', value: 'OTHER', type: 'EVENT', color: 'bg-green-200' },



  // --- [Content Type] 영상/자료 기준 ---
  { label: '자컨', value: 'WEB_VARIETY', type: 'CONTENT', color: 'bg-yellow-200' },
  { label: '비하인드', value: 'BEHIND', type: 'CONTENT', color: 'bg-blue-200' },
  { label: '뮤직비디오', value: 'MV', type: 'CONTENT', color: 'bg-red-200' },
  { label: '라이브', value: 'LIVE_STREAM', type: 'CONTENT', color: 'bg-teal-200' },
  { label: '커버곡', value: 'COVER', type: 'CONTENT', color: 'bg-lime-200' },
  { label: '티저', value: 'TEASER', type: 'CONTENT', color: 'bg-red-200' },
  { label: '퍼포먼스 비디오', value: 'PERFORMANCE_VIDEO', type: 'CONTENT', color: 'bg-orange-200' },
  { label: '안무 연습', value: 'DANCE_PRACTICE', type: 'CONTENT', color: 'bg-orange-200' },
  { label: '컨셉 필름', value: 'CONCEPT_FILM', type: 'CONTENT', color: 'bg-purple-200' },
  { label: '방송 무대', value: 'BROADCAST_STAGE', type: 'CONTENT', color: 'bg-pink-200' },
  { label: '공식 캠', value: 'OFFICIAL_CAM', type: 'CONTENT', color: 'bg-pink-200' },
  { label: '응원법', value: 'CHEERING_GUIDE', type: 'CONTENT', color: 'bg-pink-200' },
  { label: '팬캠', value: 'FANCAM', type: 'CONTENT', color: 'bg-pink-200' },
  { label: '예능 클립', value: 'VARIETY_CLIP', type: 'CONTENT', color: 'bg-yellow-200' },
  { label: '리얼리티', value: 'REALITY', type: 'CONTENT', color: 'bg-yellow-200' },
  { label: '브이로그', value: 'VLOG', type: 'CONTENT', color: 'bg-yellow-200' },
  { label: '레코딩', value: 'RECORDING', type: 'CONTENT', color: 'bg-blue-200' },
  { label: '숏폼', value: 'SHORTS', type: 'CONTENT', color: 'bg-blue-200' },
  { label: '챌린지', value: 'CHALLENGE', type: 'CONTENT', color: 'bg-blue-200' },
  { label: '팬 영상', value: 'FAN_EDIT', type: 'CONTENT', color: 'bg-lime-200' },
  { label: '인터뷰', value: 'INTERVIEW', type: 'CONTENT', color: 'bg-teal-200' },
  { label: '언박싱', value: 'UNBOXING', type: 'CONTENT', color: 'bg-teal-200' },
  { label: '리액션', value: 'REACTION', type: 'CONTENT', color: 'bg-teal-200' },
  { label: '기타', value: 'OTHER', type: 'CONTENT', color: 'bg-teal-200' },
];

// 멤버 데이터 (DB에서 불러와도 되지만, 고정 데이터가 UI 그리기에 빠름)
export const MEMBER_FILTERS = [
  { id: 'sion', name: 'SION', color: 'var(--color-sion)' },
  { id: 'riku', name: 'RIKU', color: 'var(--color-riku)' },
  { id: 'yushi', name: 'YUSHI', color: 'var(--color-yushi)' },
  { id: 'jaehee', name: 'JAEHEE', color: 'var(--color-jaehee)' },
  { id: 'ryo', name: 'RYO', color: 'var(--color-ryo)' },
  { id: 'sakuya', name: 'SAKUYA', color: 'var(--color-sakuya)' },
];