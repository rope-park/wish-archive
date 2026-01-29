/**
 * Z-Index 계층 관리
 * 
 * WISH OS의 모든 z-index 값을 중앙에서 관리합니다.
 * 일관된 레이어링을 통해 UI 요소 간 겹침 문제를 방지합니다.
 */

export const Z_INDEX = {
  // 최상위 레이어 (시스템 UI)
  VIEWPORT_WARNING: 10000,    // 화면 크기 경고 (최우선)
  MODAL_OVERLAY: 9500,        // 모달 오버레이
  MODAL_CONTENT: 9600,        // 모달 콘텐츠
  
  // 창 관리 시스템
  WINDOW_MAX: 9000,           // 윈도우 최대 z-index
  WINDOW_BASE: 1000,          // 윈도우 기본 시작 z-index
  
  // OS 시스템 UI
  TASKBAR: 8000,              // 작업 표시줄 (항상 상단)
  START_MENU: 8500,           // 시작 메뉴
  MINI_PLAYER: 7500,          // 미니 플레이어 (플로팅)
  
  // 위젯 & 데스크톱
  WIDGET: 100,                // 드래그 가능한 위젯
  DESKTOP_ICON: 50,           // 바탕화면 아이콘
  DESKTOP_BG: 1,              // 바탕화면 배경
  
  // 기타
  TOOLTIP: 9900,              // 툴팁 (모달 제외 최상위)
  DROPDOWN: 500,              // 드롭다운 메뉴
  
  // 음수 레이어 (배경)
  BG_NOISE: -10,              // 노이즈 텍스처
  BG_GRADIENT: -20,           // 그라데이션 배경
} as const;

export type ZIndexKey = keyof typeof Z_INDEX;

/**
 * z-index 값을 안전하게 가져옵니다.
 * @param key - Z_INDEX 키
 * @returns z-index 숫자 값
 */
export function getZIndex(key: ZIndexKey): number {
  return Z_INDEX[key];
}

/**
 * 창의 z-index를 계산합니다.
 * @param order - 창의 순서 (0부터 시작)
 * @returns 계산된 z-index 값
 */
export function getWindowZIndex(order: number): number {
  return Z_INDEX.WINDOW_BASE + order;
}
