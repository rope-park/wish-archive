/**
 * ColorChip 컴포넌트
 * 
 * - 색상을 표시하는 작은 칩 컴포넌트
 * - 클릭 시 색상 선택 기능
 * - 반응형 크기 지원
 */

'use client';

import React from 'react';

interface ColorChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color: string;
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
}

export default function ColorChip({
  color,
  size = 'md',
  selected = false,
  className = '',
  disabled = false,
  ...props
}: ColorChipProps) {
  // 반응형 크기 계산
  const getSizeClasses = () => {
    // 모바일: 터치 친화적 크기
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
    
    const sizeMap = {
      sm: {
        mobile: 'w-6 h-6',
        tablet: 'w-5 h-5',
        desktop: 'w-4 h-4',
      },
      md: {
        mobile: 'w-10 h-10',
        tablet: 'w-8 h-8',
        desktop: 'w-6 h-6',
      },
      lg: {
        mobile: 'w-14 h-14',
        tablet: 'w-12 h-12',
        desktop: 'w-10 h-10',
      },
    };
    
    if (isMobile) return sizeMap[size].mobile;
    if (isTablet) return sizeMap[size].tablet;
    return sizeMap[size].desktop;
  };

  return (
    <button
      type="button"
      {...props}
      disabled={disabled}
      className={`
        ${getSizeClasses()}
        rounded-full
        border-2
        ${selected ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-400'}
        shadow-outset
        hover:shadow-inset
        active:scale-95
        transition-all
        touch-target
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      style={{ 
        backgroundColor: color,
        minWidth: '44px',  // 터치 영역 보장
        minHeight: '44px', // 터치 영역 보장
        ...props.style
      }}
      aria-label={`색상: ${color}`}
      aria-pressed={selected}
    />
  );
}