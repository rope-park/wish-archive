/**
 * 버튼 컴포넌트
 * 
 * - 다양한 변형(variant)과 크기(size) 지원
 * - 아이콘 삽입 가능 (왼쪽/오른쪽)
 * - 활성화 상태 지원 (탭 등에서 사용)
 */
'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

// 버튼의 변형(Variant) 타입 정의
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost'; // 버튼 종류
  size?: 'sm' | 'md' | 'lg';                 // 버튼 크기
  leftIcon?: ReactNode;                      // 왼쪽 아이콘 (옵션)
  rightIcon?: ReactNode;                     // 오른쪽 아이콘 (옵션)
  isActive?: boolean;                        // 강제로 눌린 상태 (탭 등에서 사용)
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
      disabled,
      children,
      ...props
    },
    ref
  ) => {

    // 스타일 정의
    // A. 공통 베이스 스타일 (폰트, 정렬, 트랜지션)
    const baseStyles = `
      inline-flex items-center justify-center gap-2
      font-pixel leading-none
      transition-all duration-75
      select-none cursor-pointer
      active:translate-y-[1px] active:translate-x-[1px]
      disabled:cursor-not-allowed disabled:opacity-50 disabled:active:translate-y-0
    `;

    // B. 종류별 스타일 (색상, 그림자)
    const variantStyles = {
      default: `
        bg-gray-200 text-gray-900
        border border-transparent
        shadow-outset
        active:shadow-inset
        ${isActive ? 'shadow-inset translate-y-[1px] translate-x-[1px] bg-dither' : ''} 
      `,
      primary: `
        bg-brand-primary text-gray-900 font-bold
        border border-transparent
        shadow-outset
        active:shadow-inset
        hover:shadow-glow-green
      `,
      ghost: `
        bg-transparent text-gray-900
        hover:bg-gray-200 hover:shadow-outset
        active:shadow-inset
      `,
    };

    // C. 크기별 스타일 (패딩, 폰트 크기)
    const sizeStyles = {
      sm: 'h-6 px-2 text-xs',       // 윈도우 타이틀바 버튼용
      md: 'h-8 px-3 text-sm',       // 일반 버튼 (표준)
      lg: 'h-10 px-4 text-base',    // 시작 버튼용
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          ${baseStyles}
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {/* 왼쪽 아이콘이 있으면 렌더링 */}
        {leftIcon && <span className="flex items-center justify-center">{leftIcon}</span>}

        {/* 텍스트 내용 */}
        <span className="pt-[2px]">{children}</span>

        {/* 오른쪽 아이콘이 있으면 렌더링 */}
        {rightIcon && <span className="flex items-center justify-center">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;