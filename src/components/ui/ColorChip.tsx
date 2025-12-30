/**
 * ColorChip 컴포넌트
 * 
 * - 다양한 색상 옵션 제공
 * - 선택 상태에 따른 스타일 변화
 * - 크기 조절 가능
 */

'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';

export interface ColorChipProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  color: 'red' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink';
  selected?: boolean; // 선택 여부
  size?: 'sm' | 'md' | 'lg';
}

const ColorChip = forwardRef<HTMLButtonElement, ColorChipProps>(
  ({
    color,
    selected = false,
    size = 'md',
    className = '',
    onClick,
    disabled,
    ...props
  }, ref) => {

    // 색상 매핑
    const colorMap = {
      red: 'bg-[rgba(255,183,178,1)]',    // #FFB7B2
      yellow: 'bg-[rgba(255,249,196,1)]', // #FFF9C4
      green: 'bg-[rgba(143,208,172,1)]',   // #8FD0AC
      blue: 'bg-[rgba(185,230,253,1)]',    // #B9E6FD
      purple: 'bg-[rgba(233,176,239,1)]', // #E9B0EF
      pink: 'bg-[rgba(245,202,212,1)]',    // #F5CAD4
    };

    // 크기 설정
    const sizeClass = {
      sm: 'w-6 h-6 md:w-5 md:h-5',
      md: 'w-8 h-8 md:w-6 md:h-6',
      lg: 'w-10 h-10 md:w-8 md:h-8',
    };

    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-label={`Select ${color} color`}
        aria-pressed={selected}
        className={`
        /* --- 기본 레이아웃 --- */
        relative flex items-center justify-center shrink-0
        rounded-full transition-transform duration-100

        /* --- 크기 설정 --- */
        ${sizeClass[size]}

        /* --- 색상 설정 --- */
        ${colorMap[color]}

        /* --- 테두리 및 입체감 --- */
        border border-gray-500

        /* 선택 안 됨: 튀어나옴 (Outset) */
        ${!selected && !disabled ? 'shadow-[inset_1px_1px_0px_rgba(255,255,255,0.6),1px_1px_2px_rgba(0,0,0,0.2)] hover:brightness-110 active:scale-95' : ''}
          
        /* 선택됨: 움푹 파임 (Inset) + 테두리 진하게 */
        ${selected ? 'shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)] border-black scale-95' : ''}
          
        /* 비활성화 */
        ${disabled ? 'opacity-50 cursor-not-allowed shadow-none' : 'cursor-pointer'}

        /* --- 포커스 (접근성) --- */
        focus-visible:outline-none 
        focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2
          
        ${className}
      `}
        {...props}
      />
    );
  }
);

ColorChip.displayName = 'ColorChip';

export default ColorChip;