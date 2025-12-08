/**
 * Toggle 컴포넌트
 * 
 * - ON/OFF 상태 시각적 표시 및 변경 가능
 */
'use client';

import { ButtonHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Toggle({
  checked,
  onChange,
  label,
  size = 'md',
  disabled,
  className = '',
  ...props
}: ToggleProps) {
  
  // 크기별 설정 (너비, 높이, 스위치 크기)
  const sizeConfig = {
    sm: { track: 'w-8 h-4', knob: 'w-3 h-3', translate: 'translate-x-4' },
    md: { track: 'w-10 h-5', knob: 'w-4 h-4', translate: 'translate-x-5' }, // 기본
    lg: { track: 'w-14 h-7', knob: 'w-6 h-6', translate: 'translate-x-7' },
  };

  const current = sizeConfig[size];

  return (
    <div className={`inline-flex items-center gap-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
      
      {/* 스위치 본체 (Button) */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative flex items-center px-[2px]
          ${current.track}
          
          /* --- Track Design (움푹 파인 슬롯) --- */
          border border-gray-600 rounded-none
          shadow-inset
          transition-colors duration-200
          
          /* ON/OFF 색상 */
          ${checked ? 'bg-brand-primary' : 'bg-gray-800'}
        `}
        {...props}
      >
        {/* 스위치 손잡이 (Knob - 튀어나온 버튼) */}
        <span
          className={`
            block ${current.knob}
            bg-gray-200
            
            /* --- Knob Design (튀어나온 입체감) --- */
            border border-white/60
            shadow-outset
            
            /* 애니메이션 */
            transition-transform duration-200 ease-in-out
            ${checked ? current.translate : 'translate-x-0'}
          `}
        >
          {/* (디테일) 미끄럼 방지 돌기 */}
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[1px]">
             <span className="w-[1px] h-[60%] bg-gray-400"></span>
             <span className="w-[1px] h-[60%] bg-gray-400"></span>
          </span>
        </span>
      </button>

      {/* 라벨 (옵션) */}
      {label && (
        <span
          className="font-pixel text-sm text-gray-900 select-none pt-[2px]"
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </span>
      )}
    </div>
  );
}