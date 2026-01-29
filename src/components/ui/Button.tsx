/**
 * Button 컴포넌트
 * 
 * - 다양한 변형(variant)과 크기(size) 지원
 * - 아이콘 삽입 가능 (왼쪽/오른쪽)
 * - 활성화 상태 지원 (탭 등에서 사용)
 */

'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

// 버튼의 변형(Variant) 타입 정의
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost' | 'danger'; // 버튼 종류
  size?: 'sm' | 'md' | 'lg' | 'icon';        // 버튼 크기
  leftIcon?: ReactNode;                      // 왼쪽 아이콘 (옵션)
  rightIcon?: ReactNode;                     // 오른쪽 아이콘 (옵션)
  isActive?: boolean;                        // 강제로 눌린 상태 (탭 등에서 사용)
  isLoading?: boolean;                       // 로딩 상태
  fullWidth?: boolean;                       // 가로 꽉 채우기
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      isActive = false,
      isLoading = false,
      fullWidth = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {

    // 공통 베이스 스타일 (폰트, 정렬, 트랜지션)
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-pixel leading-none
      transition-all duration-75
      select-none cursor-pointer

      /* --- 접근성 --- */
      focus-visible:outline-none
      focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2

      /* --- 비활성 상태 --- */
      disabled:cursor-not-allowed
      disabled:opacity-60
      disabled:active:translate-y-0
      disabled:active:shadow-outset
    `;

    // 종류별 스타일 (색상, 그림자)
    const variantStyles = {
      default: `
        bg-gray-200 text-gray-900
        border-2
        border-t-white border-l-white
        border-b-black border-r-black
        active:border-t-black active:border-l-black active:border-b-white active:border-r-white
        active:bg-gray-300

        ${isActive ? 'border-t-black border-l-black border-r-white border-b-white bg-gray-300' : ''} 
      `,
      primary: `
        bg-brand-retro-navy text-white font-bold
        border-2 
        border-t-blue-300 border-l-blue-300 
        border-r-black border-b-black

        active:border-t-black active:border-l-black active:border-r-blue-300 active:border-b-blue-300
        active:bg-brand-retro-navy
      `,
      ghost: `
        bg-transparent text-gray-900
        border-2 border-transparent
        hover:bg-gray-200 hover:border-t-white hover:border-l-white hover:border-r-black hover:border-b-black
        active:border-t-black active:border-l-black active:border-r-white active:border-b-white
      `,
      danger: `
        bg-system-error text-white font-bold
        border-2
        border-t-red-300 border-l-red-300
        border-r-black border-b-black

        active:border-t-black active:border-l-black active:border-r-red-300 active:border-b-red-300
      `,
    };

    // 크기별 스타일 (패딩, 폰트 크기)
    const sizeStyles = {
      xs: 'h-4 px-2 text-xs',       // 매우 작은 버튼
      sm: 'h-6 px-2 text-xs',       // 윈도우 타이틀바 버튼용
      md: 'h-8 px-3 text-sm',       // 일반 버튼 (표준)
      lg: 'h-10 px-5 text-base',    // 시작 버튼용
      icon: 'h-8 w-8 p-0',          // 아이콘 전용 버튼
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        {...props}
      >
        {/* 로딩 중일 때 표시 */}
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
        )}

        {/* 콘텐츠 */}
        <span className={`flex items-center gap-2 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          {/* 왼쪽 아이콘이 있으면 렌더링 */}
          {leftIcon && <span className="flex items-center justify-center">{leftIcon}</span>}

          {/* 텍스트 내용 */}
          {children && <span className="pt-[2px]">{children}</span>}

          {/* 오른쪽 아이콘이 있으면 렌더링 */}
          {rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;