/**
 * 컴포넌트 메인 인덱스
 * 
 * 프로젝트의 모든 컴포넌트를 카테고리별로 export
 */

// Base 컴포넌트
export { default as BaseCard } from './base/BaseCard';
export type { BaseCardProps } from './base/BaseCard';

export { default as BaseList } from './base/BaseList';
export type { BaseListProps } from './base/BaseList';

export { default as BaseModal } from './base/BaseModal';
export type { BaseModalProps } from './base/BaseModal';

// Common 컴포넌트
export { default as FloatingDecorations } from './common/FloatingDecorations';
export { default as Taskbar } from './common/Taskbar';

// Domain 컴포넌트 - Members
export { default as MemberCard } from './domain/members/MemberCard';

// Domain 컴포넌트 - Releases
export { default as AlbumCard } from './domain/releases/AlbumCard';
export { default as TrackTable } from './domain/releases/TrackTable';

// Domain 컴포넌트 - Timeline
export { default as EventCard } from './domain/timeline/EventCard';
export { default as FilterBar } from './domain/timeline/FilterBar';

// UI 컴포넌트 (모두 re-export)
export * from './ui';
