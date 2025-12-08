/**
 * ColorChip 컴포넌트
 * 
 * - 다양한 색상 옵션 제공
 * - 선택 상태에 따른 스타일 변화
 * - 크기 조절 가능
 */
'use client';

import { ButtonHTMLAttributes } from 'react';

export interface ColorChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  color: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink'; // 사용할 색상 팔레트
  selected?: boolean; // 선택 여부
  size?: 'sm' | 'md' | 'lg'; // 크기 조절
}

export default function ColorChip({
  color,
  selected = false,
  size = 'md',
  className = '',
  onClick,
  ...props
}: ColorChipProps) {

  // 색상 매핑
  const colorMap = {
    red: 'bg-[rgba(255,183,178,1)]',    // #FFB7B2
    yellow: 'bg-[rgba(255,249,196,1)]', // #FFF9C4
    green: 'bg-[rgba(143, 208, 172, 1)]',   // #8FD0AC
    blue: 'bg-[rgba(185, 230, 253, 1)]',    // #B9E6FD
    purple: 'bg-[rgba(233, 176, 239, 1)]', // #E9B0EF
    pink: 'bg-[rgba(245, 202, 212, 1)]',    // #F5CAD4
  };

  // 크기 설정
  const sizeClass = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6', // 기본 24px
    lg: 'w-8 h-8',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${sizeClass[size]}
        ${colorMap[color]}
        rounded-[4px] transition-all duration-75
        
        /* --- 상태별 스타일 (핵심!) --- */
        ${selected 
          ? 'border-2 border-black shadow-inset scale-95'  // 선택됨: 테두리 + 눌림 + 살짝 작게
          : 'border border-transparent shadow-outset hover:brightness-110 active:shadow-inset' // 평소: 튀어나옴 + 호버 시 밝게
        }
        
        ${className}
      `}
      aria-label={`Select ${color} color`}
      aria-pressed={selected}
      {...props}
    />
  );
}