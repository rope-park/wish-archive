/**
 * Checkbox 컴포넌트
 * 
 * 체크박스 입력 필드
 * - 레이블, 설명 지원
 * - 접근성 고려
 */

import { forwardRef, useId, type InputHTMLAttributes } from 'react';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', id, disabled, ...props }, ref) => {
    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;

    return (
      <div className="flex items-start gap-3">
        {/* 체크박스 */}
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className={[
            'mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 transition-colors',
            'focus:ring-2 focus:ring-blue-200 focus:ring-offset-0',
            disabled && 'cursor-not-allowed opacity-50',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {/* 레이블 & 설명 */}
        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className={[
                  'text-sm font-medium text-gray-700',
                  disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer',
                ].join(' ')}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
