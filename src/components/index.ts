/**
 * 컴포넌트 메인 인덱스
 * 
 * 프로젝트의 모든 컴포넌트를 카테고리별로 export
 */

// 공통 UI 컴포넌트
export { default as Tooltip } from './ui/Tooltip';
export type { TooltipProps } from './ui/Tooltip';

export { default as Scrollbar } from './ui/Scrollbar';
export type { ScrollbarProps } from './ui/Scrollbar';

export { default as Spinner } from './ui/Spinner';
export type { SpinnerProps } from './ui/Spinner';

// OS 컴포넌트
export { default as WindowFrame } from './os/WindowFrame';
export { default as DesktopIcon } from './os/DesktopIcon';

export * from './ui';
export * from './os';
export * from './widgets';
