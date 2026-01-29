/**
 * Wish Archive 상태 관리 스토어
 */

import { create } from 'zustand';
import { EventType, ContentType } from '@prisma/client';

export type ViewMode = 'GRID' | 'LIST' | 'TIMELINE' | 'CALENDAR';

// 아카이브 데이터 필터 구조
export interface ArchiveFilters {
  eraId: string | null;
  memberIds: string[];
  categories: (EventType | ContentType)[];
  year: string | null; // 'YYYY' 형식
}

interface ArchiveState {
  // 뷰 모드 (기본값: 그리드)
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  // 현재 선택된 아이템 (우측 패널용)
  selectedEventId: string | null;
  setSelectedEvent: (id: string | null) => void;

  // 좌측 사이드바 확장 여부
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  // 필터 상태
  filters: ArchiveFilters;

  // 필터 액션
  setEra: (eraId: string | null) => void;
  toggleMember: (memberId: string) => void;
  toggleCategory: (category: EventType | ContentType) => void;
  setYear: (year: string | null) => void;
  resetFilters: () => void;
}

export const useArchiveStore = create<ArchiveState>((set) => ({
  viewMode: 'GRID',
  setViewMode: (mode) => set({ viewMode: mode }),

  selectedEventId: null,
  setSelectedEvent: (id) => set({ selectedEventId: id }),

  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

  filters: {
    eraId: null,
    memberIds: [],
    categories: [],
    year: null,
  },

  setEra: (eraId) => set((state) => ({
    filters: { ...state.filters, eraId },
  })),

  toggleMember: (memberId) => set((state) => {
    const current = state.filters.memberIds;
    const next = current.includes(memberId)
      ? current.filter((id) => id !== memberId)
      : [...current, memberId];
    return {
      filters: { ...state.filters, memberIds: next },
    };
  }),

  toggleCategory: (category) => set((state) => {
    const current = state.filters.categories;
    const next = current.includes(category)
      ? current.filter((cat) => cat !== category)
      : [...current, category];
    return {
      filters: { ...state.filters, categories: next },
    };
  }),

  setYear: (year) => set((state) => ({
    filters: { ...state.filters, year },
  })),

  resetFilters: () => set({
    filters: {
      eraId: null,
      memberIds: [],
      categories: [],
      year: null,
    },
    selectedEventId: null,
  }),
}));