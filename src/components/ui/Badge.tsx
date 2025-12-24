/**
 * Badge 컴포넌트
 * 
 * - 상태, 태그, 카테고리 등 표시
 * - 다양한 색상과 스타일(알약, 형광펜) 지원
 */

'use client';

import { ReactNode } from 'react';

export interface BadgeProps {
  children: ReactNode;
  variant?: 'capsule' | 'highlight' | 'outline'; // 알약, 형광펜, 외곽선
  color?: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'lime' | 'gray'; // 색상 테마
  size?: 'sm' | 'md';
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Badge({
  children,
  variant = 'capsule',
  color = 'green',
  size = 'md',
  icon,
  className = '',
  onClick,
}: BadgeProps) {
  
  // 색상 매핑
  const colorMap = {
    green:  { bg: 'bg-[#B8E986]', text: 'text-black', border: 'border-[#38A96A]' },
    pink:   { bg: 'bg-[#FFD1DC]', text: 'text-black', border: 'border-[#E669A4]' },
    blue:   { bg: 'bg-[#93D6F9]', text: 'text-black', border: 'border-[#2B5FCE]' },
    yellow: { bg: 'bg-[#FFF89A]', text: 'text-black', border: 'border-[#FADD4E]' },
    red:    { bg: 'bg-[#FF5E57]', text: 'text-white', border: 'border-[#D0021B]' },
    purple: { bg: 'bg-[#C6B2FF]', text: 'text-black', border: 'border-[#9B419B]' },
    lime:   { bg: 'bg-[#CCFF00]', text: 'text-black', border: 'border-[#8CE655]' },
    gray:   { bg: 'bg-gray-200',  text: 'text-gray-800', border: 'border-gray-500' },
  };

  const current = colorMap[color];

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 h-4 gap-1',
    md: 'text-xs px-2 h-5 gap-1.5',
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'highlight':
        return `
          ${current.bg}
          ${color === 'red' ? 'text-white' : 'text-black'}
          rounded-none
        `;
      case 'outline':
        return `
          bg-transparent
          border
          ${current.border}
          ${color === 'gray' ? 'text-gray-600' : 'text-black'}
          rounded-full
        `;
      case 'capsule':
      default:
        return `
          ${current.bg}
          ${color === 'red' ? 'text-white' : 'text-black'}
          border border-black
          rounded-full
          shadow-[1px_1px_0px_rgba(0,0,0,0.1)]
        `;
    }
  };

  return (
    <span
      className={`
        /* --- 기본 레이아웃 --- */
        inline-flex items-center justify-center
        font-pixel leading-none whitespace-nowrap select-none
        transition-all duration-200
        
        /* --- 텍스트 수직 정렬 보정 --- */
        pt-[2px]
        
        /* --- 크기별 스타일 --- */
        ${sizeStyles[size]}
        ${getVariantClasses()}
        
        /* --- 클릭 가능 시 스타일 --- */
        ${onClick ? 'cursor-pointer hover:opacity-80 active:translate-y-[1px] active:shadow-none' : ''}
        
        /* --- 추가 클래스 --- */
        ${className}
      `}
      onClick={onClick}
    >
      {/* 아이콘 (있으면 표시) */}
      {icon && (
        <span className="shrink-0 flex items-center justify-center -mt-[1px]">
          {icon}
        </span>
      )}

      {/* 내용 */}
      <span>{children}</span>
    </span>
  );
}