/**
 * Checkbox 컴포넌트
 * 
 * - 레이블 텍스트 지원
 * - ref 전달 가능
 */

'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 옆에 표시할 텍스트
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', disabled, ...props }, ref) => {
    return (
      <label
        className={`
          inline-flex items-center gap-2 group relative
          ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}
          ${className}
        `}
      >

        {/* 실제 Input (숨김 처리) */}
        <input
          ref={ref}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        {/* 커스텀 디자인 (Checkbox Box) */}
        <div className="
          relative w-4 h-4 shrink-0
          bg-white
          
          /* --- 입체 테두리 --- */
          border-2
          border-t-gray-600 border-l-gray-600
          border-b-white border-r-white
          
          /* --- 안쪽 그림자 --- */
          shadow-[inset_1px_1px_0px_#000]

          /* --- 정렬 --- */
          flex items-center justify-center
          
          /* --- 상태별 스타일 --- */
          peer-disabled:bg-gray-100

          /* --- 포커스 링 --- */
          peer-focus-visible:ring-1
          peer-focus-visible:ring-black
          peer-focus-visible:ring-offset-1
          peer-focus-visible:ring-offset-gray-200
        ">

          {/* 체크 아이콘 (✔) - 체크되면 나타남 */}
          <svg
            className="
              w-3 h-3 text-black
              opacity-0 scale-50 
              peer-checked:opacity-100 peer-checked:scale-100
              transition-all duration-75 ease-out pointer-events-none
              
              /* 비활성화 시 체크 색상 변경 */
              group-hover:peer-disabled:text-gray-500
            "
            viewBox="0 0 12 12"
            fill="currentColor"
          >
            {/* 픽셀 느낌의 체크 모양 Path */}
            <path d="M9.8,2.2 L11.2,3.6 L4.2,10.6 L0.8,7.2 L2.2,5.8 L4.2,7.8 Z" />
          </svg>

        </div>

        {/* 라벨 텍스트 */}
        {label && (
          <span className="
            font-pixel text-sm text-gray-900 select-none pt-[2px]
            group-active:translate-y-[1px]
          ">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;