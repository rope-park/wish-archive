/**
 * Tooltip 컴포넌트
 * 
 * 호버 시 툴팁 표시
 * - CSS only 버전 (간단한 구현)
 */

'use client';

import { type ReactNode } from 'react';

export interface TooltipProps {
  children: ReactNode;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export default function Tooltip({
  children,
  content,
  position = 'top',
  className = '',
}: TooltipProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className={`group relative inline-block ${className}`}>
      {children}
      
      {/* 툴팁 컨텐츠 */}
      <div
        role="tooltip"
        className={[
          'pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg',
          'opacity-0 transition-opacity group-hover:opacity-100',
          positionClasses[position],
        ].join(' ')}
      >
        {content}
        
        {/* 화살표 */}
        <div
          className={[
            'absolute h-2 w-2 rotate-45 bg-gray-900',
            position === 'top' && '-bottom-1 left-1/2 -translate-x-1/2',
            position === 'bottom' && '-top-1 left-1/2 -translate-x-1/2',
            position === 'left' && '-right-1 top-1/2 -translate-y-1/2',
            position === 'right' && '-left-1 top-1/2 -translate-y-1/2',
          ].join(' ')}
        />
      </div>
    </div>
  );
}
