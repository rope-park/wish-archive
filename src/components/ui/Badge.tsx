/**
 * Badge 컴포넌트
 * 
 * - 다양한 색상과 스타일(알약, 형광펜) 지원
 */
'use client';

import { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'capsule' | 'highlight'; // 알약, 형광펜
  color?: 'green' | 'pink' | 'blue' | 'yellow' | 'red' | 'purple' | 'lime'; // 색상 테마
  className?: string;
}

export default function Badge({
  children,
  variant = 'capsule',
  color = 'green',
  className = '',
}: BadgeProps) {
  
  // 색상 매핑
  const colorStyles = {
    green: 'bg-[rgba(184, 233, 134, 1)]',   // #B8E986
    pink: 'bg-[rgba(255, 209, 220, 1)]',    // #FFD1DC
    blue: 'bg-[rgba(147, 214, 249, 1)]',    // #93D6F9
    yellow: 'bg-[rgba(255, 248, 154, 1)]', // #FFF89A
    red: 'bg-[rgba(255, 94, 87, 1)]',      // #FF5E57
    purple: 'bg-[rgba(198, 178, 255, 1)]', // #C6B2FF
    lime: 'bg-brand-pearl-neo-champagne', // #BBE309
  };

  // 스타일 정의
  const baseStyles = "inline-flex items-center justify-center font-pixel text-xs leading-none transition-all select-none";
  
  const variantStyles = {
    //  알약 스타일 (검은 테두리 + 둥근 모서리)
    capsule: `
      rounded-full 
      border border-black 
      px-2 py-0.5 
      text-black
      ${colorStyles[color]} 
      shadow-[2px_2px_0px_rgba(0,0,0,0.1)] // 살짝 뜬 느낌 (선택)
    `,
    
    // 형광펜 스타일 (직각 + 테두리 없음)
    highlight: `
      rounded-none 
      px-1 py-0.5
      text-black 
      ${colorStyles[color]} 
    `
  };

  return (
    <span className={`
      ${baseStyles}
      ${variantStyles[variant]}
      ${className}
    `}>
      {children}
    </span>
  );
}