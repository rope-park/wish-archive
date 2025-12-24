/**
 * Input 컴포넌트
 * 
 * - 레이블, 에러 메시지, 아이콘 지원
 * - 포커스 및 에러 상태 스타일링
 */

'use client';

import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;         // 상단 레이블 (옵션)
  error?: string;         // 에러 메시지 (옵션)
  leftIcon?: ReactNode;   // 왼쪽에 들어갈 아이콘 (돋보기 등)
  rightIcon?: ReactNode;  // 오른쪽에 들어갈 아이콘 (지우기 버튼 등)
  fullWidth?: boolean;    // 가로 꽉 채울지 여부
  helperText?: string;    // 도움말 텍스트
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      helperText,
      className = '',
      disabled,
      id,
      ...props
    },
    ref
  ) => {
    const uniqueId = useId();
    const inputId = id || uniqueId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={`flex flex-col gap-1.5 ${fullWidth ? 'w-full' : 'w-auto'}`}>
        
        {/* 1. 레이블 */}
        {label && (
          <label 
            className="font-pixel text-xs text-gray-900 ml-1 select-none"
            htmlFor={inputId}
          >
            {label}
          </label>
        )}

        {/* 2. 입력창 컨테이너 */}
        <div className="relative group">
          
          {/* 좌측 아이콘 */}
          {leftIcon && (
            <div className="
              absolute left-3 top-1/2 -translate-y-1/2
              text-gray-500 pointer-events-none
              flex items-center justify-center
            ">
              {leftIcon}
            </div>
          )}

          {/* 실제 Input 요소 */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={`
              /* --- 기본 레이아웃 & 폰트 --- */
              block w-full h-10 py-2
              bg-white text-gray-900 font-gothic text-sm
              placeholder:text-gray-400
              
              /* --- 아이콘 여백 확보 --- */
              ${leftIcon ? 'pl-10' : 'pl-3'}
              ${rightIcon ? 'pr-10' : 'pr-3'}

              border-2
              border-t-gray-600 border-l-gray-600
              border-r-white border-b-white
              outline-none
              shadow-[inset_1px_1px_0px_#000]

              /* --- 포커스 스타일 (Focus) --- */
              focus:text-black
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
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 flex items-center">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 3. 에러 메시지 */}
        {error ? (
          <p
            id={errorId}
            className="text-[10px] text-system-error font-pixel ml-1 flex items-center gap-1"
            role="alert"
          >
            <span>⚠️</span> {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-[10px] text-gray-500 font-pixel ml-1">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;