/**
 * Spinner 컴포넌트
 * 
 * - 다양한 스타일의 로딩 스피너
 */

'use client';

export interface SpinnerProps {
  variant?: 'hourglass' | 'star' | 'cd' | 'pixel' | 'dots'; // 스피너 종류
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
  color?: string;
}

export default function Spinner({
  variant = 'pixel',
  size = 'md',
  className = '',
  label,
  color,
}: SpinnerProps) {

  // 크기 설정 (컨테이너 크기, 폰트 크기, 테두리 두께)
  const sizeConfig = {
    sm: {
      dims: 'w-4 h-4',
      text: 'text-sm',
      border: 'border-2',
      emoji: 'text-lg'
    },
    md: {
      dims: 'w-6 h-6',
      text: 'text-base',
      border: 'border-2',
      emoji: 'text-2xl'
    },
    lg: {
      dims: 'w-8 h-8',
      text: 'text-lg',
      border: 'border-4',
      emoji: 'text-4xl'
    },
    xl: {
      dims: 'w-12 h-12',
      text: 'text-xl',
      border: 'border-[6px]',
      emoji: 'text-6xl'
    },
  };

  const currentSize = sizeConfig[size];

  // 아이콘 및 애니메이션 설정
  /** TODO: 아이콘 이미지 추가 */
  const renderIcon = () => {
    switch (variant) {
      case 'hourglass':
        return (
          <div className={`animate-[spin_2s_steps(4)_infinite] cursor-wait ${currentSize.emoji}`}>
            ⏳
          </div>
        );
      case 'cd':
        return (
          <div className={`animate-[spin_1.5s_linear_infinite] ${currentSize.emoji}`}>
            💿
          </div>
        );
      case 'star':
        return (
          <div className={`animate-[spin_3s_linear_infinite] ${currentSize.emoji}`}>
            ⭐
          </div>
        );
      case 'dots':
        return (
          <div className={`flex gap-1 items-end pb-1 ${currentSize.text} font-bold tracking-widest`}>
            <span className="animate-[bounce_1s_infinite] delay-0">.</span>
            <span className="animate-[bounce_1s_infinite] delay-100">.</span>
            <span className="animate-[bounce_1s_infinite] delay-200">.</span>
          </div>
        );
      case 'pixel':
      default:
        return (
          <div className={`relative inline-block ${currentSize.dims}`}>
            <div
              className={`
                w-full h-full
                ${currentSize.border}
                rounded-full
                border-gray-300
                border-t-black
                ${color ? `border-t-[${color}]` : ''} 
                animate-spin
              `}
              style={color ? { borderTopColor: color } : undefined}
            />
          </div>
        );
    }
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      <div className="flex items-center justify-center select-none">
        {renderIcon()}
      </div>
      {label && (
        <span className={`font-pixel text-gray-600 animate-pulse ${currentSize.text}`}>
          {label}
        </span>
      )}

      <span className="sr-only">Loading...</span>
    </div>
  );
}