/**
 * Divider 컴포넌트
 * 
 * - 가로 또는 세로 구분선 제공
 * - Windows 98 스타일의 3D 효과 적용
 * - 방향, 추가 스타일, 위치 조정 가능
 */
'use client';

import { CSSProperties } from 'react';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'; // 방향 (가로/세로)
  className?: string;                      // 추가 스타일
  style?: CSSProperties;                   // 인라인 스타일 (위치 조정 등)
}

export default function Divider({
  orientation = 'horizontal',
  className = '',
  style,
}: DividerProps) {
  
  const isHorizontal = orientation === 'horizontal';

  // 방향에 따른 컨테이너 레이아웃
  const containerClass = isHorizontal
    ? 'w-full h-[2px] flex-col my-1'
    : 'h-full w-[2px] flex-row mx-1';

  // 선(Line) 자체의 크기 설정
  const lineBase = isHorizontal
    ? 'w-full h-[1px]'
    : 'h-full w-[1px]';

  return (
    <div 
      className={`flex shrink-0 ${containerClass} ${className}`} 
      style={style}
      role="separator"
      aria-orientation={orientation}
    >
      {/* 그림자 선 (Dark Shadow) - 위쪽 또는 왼쪽 */}
      <div className={`${lineBase} bg-gray-400`} />

      {/* 하이라이트 선 (Highlight) - 아래쪽 또는 오른쪽 */}
      <div className={`${lineBase} bg-white`} />
    </div>
  );
}