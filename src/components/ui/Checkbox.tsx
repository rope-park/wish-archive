/**
 * Checkbox 컴포넌트
 * 
 * - 윈도우 98 스타일의 체크박스
 * - 레이블 텍스트 지원
 * - ref 전달 가능
 */
'use client';

import { forwardRef, InputHTMLAttributes } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string; // 옆에 표시할 텍스트
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className={`inline-flex items-center gap-2 cursor-pointer group ${className}`}>
        
        {/* 실제 Input (숨김 처리) */}
        <input
          ref={ref}
          type="checkbox"
          className="peer sr-only"
          {...props}
        />

        {/* 커스텀 디자인 (Checkbox Box) */}
        <div className="
          relative w-4 h-4 shrink-0
          bg-white
          
          /* --- 윈도우 98 스타일 --- */
          /* 1. 테두리 */
          border border-gray-900
          
          /* 2. 그림자 (푹 파인 느낌 + 하단 하이라이트) */
          shadow-inset
          /* shadow-[1px_1px_0px_0px_rgba(255,255,255,1.00)] (필요시 추가) */
          
          /* 3. 상태별 스타일 */
          peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
          peer-focus:outline-none
          
          /* 4. 체크 표시 정렬 */
          flex items-center justify-center
        ">
          
          {/* 체크 아이콘 (✔) - 체크되면 나타남 */}
          <span className="
            font-pixel text-[10px] text-black leading-none
            opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100
            transition-all duration-75
          ">
            ✔
          </span>
          
        </div>

        {/* 라벨 텍스트 */}
        {label && (
          <span className="font-pixel text-sm text-gray-900 select-none group-active:translate-y-[1px]">
            {label}
          </span>
        )}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;