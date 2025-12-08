/**
 * Scrollbar 컴포넌트
 * 
 * - 방향: 수직/수평
 * - 썸 위치 및 크기 조절 가능
 * - 윈도우 98 스타일 디자인
 */
'use client';

import { CSSProperties } from 'react';

export interface ScrollbarProps {
  orientation?: 'vertical' | 'horizontal'; // 방향
  thumbPosition?: number; // 썸 위치 (0~100%)
  thumbSize?: number;     // 썸 크기 (px)
  className?: string;     // 추가 스타일
  style?: CSSProperties;  // 위치 잡아줄 때 사용
}

export default function Scrollbar({
  orientation = 'vertical',
  thumbPosition = 0,
  thumbSize = 40,
  className = '',
  style,
}: ScrollbarProps) {
  
  const isVertical = orientation === 'vertical';

  // 방향에 따른 컨테이너 스타일
  const containerBase = isVertical
    ? 'w-4 h-full flex-col' // 세로: 너비 16px 고정, 높이 가변
    : 'h-4 w-full flex-row'; // 가로: 높이 16px 고정, 너비 가변

  // 화살표 아이콘 (윈도우 98 스타일)
  const startIcon = isVertical ? '▲' : '◀';
  const endIcon = isVertical ? '▼' : '▶';

  // 공통 버튼 스타일 (Stepper)
  const buttonClass = `
    flex items-center justify-center
    w-4 h-4 shrink-0
    bg-gray-200
    border border-gray-400 
    shadow-outset active:shadow-inset active:border-black
    font-pixel text-[8px] text-black leading-none
    cursor-pointer
  `;

  return (
    <div 
      className={`flex bg-gray-200 ${containerBase} ${className}`} 
      style={style}
    >
      {/* 시작 버튼 (위/왼쪽) */}
      <button className={buttonClass} aria-label="Scroll Back">
        <span className={isVertical ? '-mt-[2px]' : '-ml-[1px]'}>{startIcon}</span>
      </button>

      {/* 트랙 (Track) */}
      {/* shadow-inset: 푹 파인 느낌 */}
      <div className="relative flex-1 bg-white shadow-inset border border-gray-400 overflow-hidden">
        
        {/* 썸 (Thumb - 손잡이) */}
        <div
          className="absolute bg-gray-200 shadow-outset border border-white box-border"
          style={{
            // 방향에 따라 크기와 위치 계산
            width: isVertical ? '100%' : `${thumbSize}px`,
            height: isVertical ? `${thumbSize}px` : '100%',
            top: isVertical ? `${thumbPosition}%` : 0,
            left: isVertical ? 0 : `${thumbPosition}%`,
            // 중앙 정렬 보정 (선택 사항)
            transform: isVertical ? 'translateY(0)' : 'translateX(0)',
            cursor: 'default',
          }}
        >
          {/* 썸 디테일: 미끄럼 방지 빗살무늬 (Grip) */}
          {/* 크기가 작을 땐 숨김 */}
          {thumbSize > 20 && (
             <div className={`
               absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               flex gap-[2px] opacity-50
               ${isVertical ? 'flex-col' : 'flex-row'}
             `}>
               <div className="w-[2px] h-[2px] bg-black" />
               <div className="w-[2px] h-[2px] bg-black" />
               <div className="w-[2px] h-[2px] bg-black" />
             </div>
          )}
        </div>
      </div>

      {/* 끝 버튼 (아래/오른쪽) */}
      <button className={buttonClass} aria-label="Scroll Forward">
        <span className={isVertical ? '-mt-[1px]' : '-ml-[1px]'}>{endIcon}</span>
      </button>
    </div>
  );
}