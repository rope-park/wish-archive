/**
 * Skeleton 컴포넌트
 * 
 * - 로딩 중인 UI 표시
 * - 다양한 형태 지원: 텍스트, 사각형, 원형
 */
'use client';

export interface SkeletonProps {
  variant?: 'text' | 'rectangular' | 'circular'; // 텍스트용, 박스용, 원형
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}: SkeletonProps) {
  
  // 모양별 기본 스타일
  const variantStyles = {
    text: 'h-4 w-full rounded-none',
    
    rectangular: 'w-full h-full rounded-none',
    
    circular: 'rounded-full',
  };

  // 크기 스타일
  const sizeStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
  };

  return (
    <div
      className={`
        /* --- 기본 애니메이션 & 색상 --- */
        animate-pulse bg-gray-200
        
        /* --- 모양 스타일 --- */
        shadow-inset
        border border-gray-400/50
        
        ${variantStyles[variant]}
        ${className}
      `}
      style={sizeStyle}
      aria-hidden="true"
    />
  );
}