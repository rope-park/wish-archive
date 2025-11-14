/**
 * Input 컴포넌트
 * 
 * 텍스트 입력 필드
 * - 레이블, 에러 메시지, 헬퍼 텍스트 지원
 * - 접근성 고려 (aria-invalid, aria-describedby)
 */

import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || `input-${generatedId}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {/* 레이블 */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        )}

        {/* 입력 필드 래퍼 */}
        <div className="relative">
          {/* 좌측 아이콘 */}
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}

          {/* 실제 input */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
            className={[
              'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
              'placeholder:text-gray-400',
              'focus:outline-none focus:ring-2',
              error
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
              disabled && 'cursor-not-allowed bg-gray-100 text-gray-500',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            ]
              .filter(Boolean)
              .join(' ')}
            {...props}
          />

          {/* 우측 아이콘 */}
          {rightIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>

        {/* 에러 메시지 */}
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-red-600">
            {error}
          </p>
        )}

        {/* 헬퍼 텍스트 */}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-xs text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
