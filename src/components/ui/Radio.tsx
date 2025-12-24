/**
 * Radio 컴포넌트
 * 
 * - 커스텀 라디오 버튼
 */

'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

export interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 옆에 표시할 텍스트
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, className = '', disabled, ...props }, ref) => {
    return (
      <label className={`
        inline-flex items-center gap-2 group-[
        ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
        ${className}
        `}
      >

        {/* 실제 Input (숨김 처리) */}
        <input
          ref={ref}
          type="radio"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />

        {/* 커스텀 디자인 (Radio Circle) */}
        <div className="
          relative w-4 h-4
          bg-white
          rounded-full
          border border-gray-600
          shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4)]
          
          /* --- 상태별 스타일 --- */
          peer-disabled:bg-gray-200
          
          /* --- 키보드 포커스 (접근성) --- */
          peer-focus-visible:ring-1 
          peer-focus-visible:ring-black 
          peer-focus-visible:ring-offset-1
          peer-focus-visible:ring-offset-gray-200
        ">

          {/* 가운데 검은 점 (Dot) - 체크되면 나타남 */}
          <div className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-2 h-2
            bg-black
            rounded-full
            
            /* 애니메이션 & 표시 여부 */
            scale-0 peer-checked:scale-100
            opacity-0 peer-checked:opacity-100
            transition-transform duration-100 ease-out

            /* 비활성화 시 점 색상 변경 */
            group-hover:peer-disabled:bg-gray-500
          " />

        </div>

        {/* 라벨 텍스트 */}
        {label && (
          <span className="
            font-pixel text-sm text-gray-900 select-none pt-[1px]
            group-active:translate-y-[1px]
          ">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export default Radio;