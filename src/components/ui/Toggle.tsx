/**
 * Toggle 컴포넌트
 * 
 * - ON/OFF 상태 시각적 표시 및 변경 가능
 */

'use client';

import { ButtonHTMLAttributes, KeyboardEvent } from 'react';

export interface ToggleProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  labelPosition?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
  activeColorClass?: string;
}

export default function Toggle({
  checked,
  onChange,
  label,
  labelPosition = 'right',
  size = 'md',
  activeColorClass = 'bg-brand-retro-navy',
  disabled,
  className = '',
  ...props
}: ToggleProps) {
  
  // 크기별 설정 (너비, 높이, 스위치 크기)
  const sizeConfig = {
    sm: { track: 'w-8 h-4', knob: 'w-3 h-3', translate: 'translate-x-4', padding: 'px-[2px]' },
    md: { track: 'w-11 h-6', knob: 'w-4 h-4', translate: 'translate-x-5', padding: 'px-[3px]' },
    lg: { track: 'w-14 h-7', knob: 'w-6 h-6', translate: 'translate-x-7', padding: 'px-[3px]' },
  };

  const current = sizeConfig[size];

  // 클릭 핸들러
  const handleToggle = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  // 키보드 접근성 (스페이스바 또는 엔터키로 토글)
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <div className={`
      inline-flex items-center gap-2
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      ${className}
    `}
      onClick={handleToggle}
    >

      {/* 라벨 */}
      {label && labelPosition === 'left' && (
        <span className={`font-pixel text-gray-900 select-none pt-[2px] ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {label}
        </span>
      )}

      {/* 스위치 본체 */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        onKeyDown={handleKeyDown}
        className={`
          relative flex items-center transition-colors duration-200 ease-in-out
          ${current.track} ${current.padding}
          
          /* --- Track Design (움푹 파인 슬롯) --- */
          border-2 border-gray-500 rounded-full
          shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4)]

          /*배경색 변경*/
          ${checked ? activeColorClass : 'bg-gray-700'}
        `}
        {...props}
      >
        {/* 스위치 손잡이 (Knob) */}
        <span
          className={`
            block relative ${current.knob}
            bg-gray-200 rounded-full
            
            /* --- Knob Design (튀어나온 입체감) --- */
            shadow-[1px_1px_2px_rgba(0,0,0,0.5),inset_1px_1px_0px_white]
            border border-gray-400
            
            /* 애니메이션 */
            transition-transform duration-200 ease-oug
            ${checked ? current.translate : 'translate-x-0'}
          `}
        >
          {/* (디테일) 미끄럼 방지 돌기 */}
          {size !== 'sm' && (
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-[2px]">
               <span className="w-[1px] h-[6px] bg-gray-400/50"></span>
               <span className="w-[1px] h-[6px] bg-gray-400/50"></span>
            </span>
          )}
        </span>
      </button>

      {/* 라벨 */}
      {label && labelPosition === 'right' && (
        <span className={`font-pixel text-gray-900 select-none pt-[2px] ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {label}
        </span>
      )}
    </div>
  );
}