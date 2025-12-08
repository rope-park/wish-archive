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
  ({ label, className = '', ...props }, ref) => {
    return (
      <label className={`inline-flex items-center gap-2 cursor-pointer group ${className}`}>
        
        {/* 실제 Input (숨김 처리) */}
        <input
          ref={ref}
          type="radio"
          className="peer sr-only"
          {...props}
        />

        {/* 커스텀 디자인 (Radio Circle) */}
        <div className="
          relative w-4 h-4
          bg-white
          rounded-full /* 라디오는 무조건 원형 */
          
          /* 테두리 및 입체감 */
          border border-gray-900
          shadow-inset
          
          /* 상태별 스타일 */
          peer-disabled:opacity-50 peer-disabled:cursor-not-allowed
        ">
          
          {/* 가운데 검은 점 (Dot) - 체크되면 나타남 */}
          <div className="
            absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
            w-2 h-2 bg-black rounded-full
            
            /* 애니메이션 & 표시 여부 */
            scale-0 peer-checked:scale-100
            opacity-0 peer-checked:opacity-100
            transition-all duration-100
          " />
          
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

Radio.displayName = 'Radio';

export default Radio;