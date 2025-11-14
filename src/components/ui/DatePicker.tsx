/**
 * DatePicker 컴포넌트
 * 
 * 날짜 선택 필드
 * - 네이티브 date input 기반 (간단한 구현)
 * - 고급 기능은 react-datepicker 등 외부 라이브러리 추천
 */

import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export interface DatePickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className = '',
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || `datepicker-${generatedId}`;
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

        {/* Date Input */}
        <input
          ref={ref}
          type="date"
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={[errorId, helperId].filter(Boolean).join(' ') || undefined}
          className={[
            'block w-full rounded-lg border px-3 py-2 text-sm transition-colors',
            'focus:outline-none focus:ring-2',
            error
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200',
            disabled && 'cursor-not-allowed bg-gray-100 text-gray-500',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

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

DatePicker.displayName = 'DatePicker';

export default DatePicker;
