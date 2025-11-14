/**
 * Toggle 컴포넌트
 * 
 * 스위치형 토글 버튼
 * - On/Off 상태 전환
 * - 접근성 고려 (aria-checked)
 */

'use client';

import { type ButtonHTMLAttributes } from 'react';

export interface ToggleProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
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
  const sizeClasses = {
    sm: { wrapper: 'h-5 w-9', thumb: 'h-4 w-4', translate: 'translate-x-4' },
    md: { wrapper: 'h-6 w-11', thumb: 'h-5 w-5', translate: 'translate-x-5' },
    lg: { wrapper: 'h-7 w-14', thumb: 'h-6 w-6', translate: 'translate-x-7' },
  };

  const current = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          checked ? 'bg-blue-600' : 'bg-gray-200',
          disabled && 'cursor-not-allowed opacity-50',
          current.wrapper,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {/* Thumb (동그란 버튼) */}
        <span
          aria-hidden="true"
          className={[
            'inline-block rounded-full bg-white shadow transition-transform',
            checked ? current.translate : 'translate-x-0.5',
            current.thumb,
          ].join(' ')}
        />
      </button>

      {/* 레이블 */}
      {label && (
        <span
          className={[
            'text-sm font-medium text-gray-700',
            disabled && 'opacity-50',
          ].join(' ')}
        >
          {label}
        </span>
      )}
    </div>
  );
}
