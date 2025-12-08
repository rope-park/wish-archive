/**
 * Input 컴포넌트
 * 
 * - 윈도우 98 스타일의 입력창
 * - 레이블, 에러 메시지, 아이콘 지원
 * - 포커스 및 에러 상태 스타일링
 */
'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;         // 상단 레이블 (옵션)
  error?: string;         // 에러 메시지 (옵션)
  leftIcon?: ReactNode;   // 왼쪽에 들어갈 아이콘 (돋보기 등)
  rightIcon?: ReactNode;  // 오른쪽에 들어갈 아이콘 (지우기 버튼 등)
  fullWidth?: boolean;    // 가로 꽉 채울지 여부
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : 'w-auto'}`}>
        
        {/* 1. 레이블 (있을 경우에만 표시) */}
        {label && (
          <label 
            className="font-pixel text-xs text-gray-900 ml-1"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}

        {/* 2. 입력창 컨테이너 (아이콘 배치를 위해 relative 사용) */}
        <div className="relative group">
          
          {/* 좌측 아이콘 */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          {/* 실제 Input 요소 */}
          <input
            ref={ref}
            disabled={disabled}
            className={`
              /* --- 기본 레이아웃 & 폰트 --- */
              block w-full h-10 px-3 py-2.5
              bg-white text-gray-900 font-body text-base
              
              /* --- 아이콘 여백 확보 --- */
              ${leftIcon ? 'pl-10' : ''}
              ${rightIcon ? 'pr-10' : ''}

              /* --- 윈도우 98 스타일 (Default) --- */
              rounded-none  /* 직각 모서리 */
              border border-gray-400
              shadow-inset  /* 푹 파인 효과 */
              placeholder:text-gray-500

              /* --- 포커스 스타일 (Focus) --- */
              focus:outline-none
              focus:border-black
              focus:shadow-glow-green  /* 입력할 때 네온 빛 */
              focus:bg-white

              /* --- 에러 상태 --- */
              ${error ? 'border-system-error focus:border-system-error focus:shadow-none bg-red-50' : ''}

              /* --- 비활성 상태 --- */
              disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed

              /* --- 트랜지션 --- */
              transition-all duration-200
              ${className}
            `}
            {...props}
          />

          {/* 우측 아이콘 */}
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 3. 에러 메시지 */}
        {error && (
          <p className="text-[10px] text-system-error font-pixel ml-1 mt-0.5">
            *{error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;