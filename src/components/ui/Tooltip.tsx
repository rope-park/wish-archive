/**
 * Tooltip 컴포넌트
 * 
 * - 윈도우 98 스타일의 툴팁을 구현
 * - 호버 시 툴팁 내용이 표시됨
 */
'use client';

import { ReactNode } from 'react';

export interface TooltipProps {
  children: ReactNode;      // 툴팁을 띄울 대상 (아이콘, 텍스트 등)
  content: string;          // 툴팁 내용
  position?: 'top' | 'bottom' | 'left' | 'right'; // 위치 (기본: top)
  className?: string;       // 추가 스타일
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  className = '',
}: TooltipProps) {
  
  // 위치별 스타일링
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1',
  };

  return (
    <div className={`group relative inline-flex ${className}`}>
      {/* Trigger (마우스 올릴 대상) */}
      {children}

      {/* Tooltip Content (평소엔 숨김 -> 호버 시 등잡) */}
      <div
        role="tooltip"
        className={`
          absolute z-50 whitespace-nowrap
          hidden group-hover:block
          
          /* --- 윈도우 98 스타일 --- */
          bg-[#FFFFE1] text-black font-pixel text-xs
          border border-black
          px-1 py-0.5
          shadow-[2px_2px_0px_rgba(0,0,0,1)]
          
          ${positionClasses[position]}
        `}
      >
        {content}
      </div>
    </div>
  );
}