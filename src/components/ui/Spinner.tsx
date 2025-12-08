/**
 * Spinner 컴포넌트
 * 
 * - 다양한 스타일의 로딩 스피너
 */
'use client';

export interface SpinnerProps {
  variant?: 'hourglass' | 'star' | 'cd' | 'pixel'; // 스피너 종류
  size?: 'sm' | 'md' | 'lg' | 'xl';                // 크기
  className?: string;
  label?: string;                                  // 옆에 뜰 텍스트 (옵션)
}

export default function Spinner({
  variant = 'pixel',
  size = 'md',
  className = '',
  label,
}: SpinnerProps) {

  // 크기 설정 (텍스트 크기 기반)
  const sizeClass = {
    sm: 'text-lg',    // 18px
    md: 'text-2xl',   // 24px
    lg: 'text-4xl',   // 36px
    xl: 'text-6xl',   // 60px
  };

  // 아이콘 및 애니메이션 설정
  /** TODO: 아이콘 이미지 추가 */
  const renderIcon = () => {
    switch (variant) {
      case 'hourglass':
        return (
          <div className="animate-spin [animation-duration:2s] [animation-timing-function:steps(2)]">
            ⏳
          </div>
        );
      case 'cd':
        return (
          <div className="animate-spin [animation-duration:1.5s] [animation-timing-function:linear]">
            💿
          </div>
        );
      case 'star':
        return (
          <div className="animate-spin [animation-duration:3s]">
            ⭐
          </div>
        );
      case 'pixel':
      default:
        return (
          <div className={`
            inline-block relative
            ${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-6 h-6' : size === 'lg' ? 'w-8 h-8' : 'w-12 h-12'}
          `}>
            <div className="
              w-full h-full
              border-4 border-gray-300
              border-t-black border-r-gray-300 border-b-gray-300 border-l-gray-300
              rounded-none
              animate-spin
            " />
          </div>
        );
    }
  };

  return (
    <div 
      role="status" 
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <div className={`${sizeClass[size]} select-none`}>
        {renderIcon()}
      </div>
      
      {label && (
        <span className="font-pixel text-sm text-gray-500 animate-pulse">
          {label}
        </span>
      )}
      
      <span className="sr-only">Loading...</span>
    </div>
  );
}