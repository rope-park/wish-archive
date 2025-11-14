/**
 * SearchBar 컴포넌트
 * 
 * 검색 입력 필드
 * - 검색 아이콘 포함
 * - 클리어 버튼 옵션
 */

'use client';

import { useState, type InputHTMLAttributes } from 'react';

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'> {
  onSearch?: (value: string) => void;
  onClear?: () => void;
  showClearButton?: boolean;
  fullWidth?: boolean;
}

export default function SearchBar({
  onSearch,
  onClear,
  showClearButton = true,
  fullWidth = false,
  placeholder = 'Search...',
  className = '',
  ...props
}: SearchBarProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch?.(newValue);
  };

  const handleClear = () => {
    setValue('');
    onSearch?.('');
    onClear?.();
  };

  return (
    <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
      {/* 검색 아이콘 */}
      <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {/* 입력 필드 */}
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className={[
          'block w-full rounded-lg border border-gray-300 py-2 pl-10 pr-10 text-sm transition-colors',
          'placeholder:text-gray-400',
          'focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      />

      {/* 클리어 버튼 */}
      {showClearButton && value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          aria-label="Clear search"
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
