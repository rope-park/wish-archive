/**
 * 위치 관련 유틸리티 함수
 * 
 * - 좌표 변환
 * - 거리 계산
 */

export const getRandomSafePosition = (widgetWidth: number, widgetHeight: number) => {
  // 서버 사이드 렌더링(SSR) 중일 때는 기본값 반환
  if (typeof window === 'undefined') return { x: 100, y: 100 };

  const TASKBAR_HEIGHT = 50;   // 하단 태스크바 높이 (여유 있게 50px)
  const ICON_AREA_WIDTH = 120; // 좌측 데스크톱 아이콘 영역 (여유 있게 120px)
  const PADDING = 20;          // 화면 끝에서의 간격

  // X축: [아이콘 영역] ~ [화면 오른쪽 끝 - 위젯 너비] 사이
  const minX = ICON_AREA_WIDTH + PADDING;
  const maxX = window.innerWidth - widgetWidth - PADDING;

  // Y축: [화면 상단] ~ [화면 하단 - 태스크바 - 위젯 높이] 사이
  const minY = PADDING;
  const maxY = window.innerHeight - widgetHeight - TASKBAR_HEIGHT - PADDING;

  // 범위 내에서 랜덤 값 생성
  // (화면이 너무 작아서 min > max가 되는 경우를 대비해 Math.max로 방어)
  const safeMaxX = Math.max(minX, maxX);
  const safeMaxY = Math.max(minY, maxY);

  const x = Math.floor(Math.random() * (safeMaxX - minX + 1)) + minX;
  const y = Math.floor(Math.random() * (safeMaxY - minY + 1)) + minY;

  return { x, y };
};