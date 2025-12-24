/**
 * Skeleton 컴포넌트
 * 
 * - 로딩 중인 UI 표시
 * - 다양한 형태 지원: 텍스트, 사각형, 원형
 */

'use client';

import { CSSProperties } from 'react';

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
  className?: string;
  style?: CSSProperties;
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  animation = 'pulse',
  className = '',
  style,
}: SkeletonProps) {
  
  // 모양별 기본 스타일
  const variantStyles = {
    text: 'h-4 w-full rounded-sm my-1',
    
    rectangular: 'w-full h-full rounded-none',
    
    circular: 'rounded-full',
  };

  // 애니메이션 스타일
  const animationStyles = {
    pulse: 'animate-pulse',
    wave: 'animate-wave',
    none: '',
  };

  // 크기 스타일
  const sizeStyle: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    ...style,
  };

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className={`
        /* --- 기본 애니메이션 & 색상 --- */
        bg-gray-300
        
        /* --- 모양 스타일 --- */
        shadow-inner
        border border-gray-400
        border-t-gray-500 border-l-gray-500 border-b-white border-r-white
        
        ${variantStyles[variant]}
        ${animationStyles[animation]}
        ${className}
      `}
      style={sizeStyle}
    />
  );
}