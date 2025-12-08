/**
 * SearchBar 컴포넌트
 * 
 * - 입력 필드로 검색어 입력 가능
 * - 검색 아이콘 포함
 * - 클리어 버튼 옵션
 * - 전체 너비 옵션
 * - onSearch, onClear 콜백 지원
 */

'use client';

import { useState, InputHTMLAttributes, KeyboardEvent, useRef } from 'react';
import Button from '@/components/ui/Button';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch?: (value: string) => void; // 검색 실행 함수
  onClear?: () => void;               // 초기화 함수
  placeholder?: string;
  fullWidth?: boolean;
  showButton?: boolean;               // 검색 버튼 표시 여부
  autoFocus?: boolean;
}

export default function SearchBar({
  onSearch,
  onClear,
  placeholder = '검색어를 입력하세요...',
  fullWidth = false,
  showButton = true,
  className = '',
  autoFocus,
  ...props
}: SearchBarProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(value);
    }
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const handleSearchClick = () => {
    onSearch?.(value);
  };

  const handleClear = () => {
    setValue('');
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div className={`flex items-center gap-1 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
      
      {/* 입력창 영역 (Inset Box) */}
      <div className="relative flex-1">
        {/* TODO: 아이콘 (돋보기) */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
          🔍
        </div>

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            w-full h-8 pl-9 pr-8 py-1
            bg-white text-gray-900 font-body text-sm
            border border-gray-500
            shadow-inset  /* 푹 파인 효과 */
            rounded-none
            placeholder:text-gray-400
            focus:outline-none focus:bg-white focus:shadow-inset
          `}
          {...props}
        />

        {/* 지우기 버튼 (X) - 입력값이 있을 때만 표시 */}
        {value && (
          <button
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500"
            aria-label="Clear"
          >
            <span className="font-pixel text-[10px]">X</span>
          </button>
        )}
      </div>

      {/* 검색 버튼 (Outset Button) */}
      {showButton && (
        <Button
          onClick={handleSearchClick}
          size="sm"
          className="h-8 px-4 min-w-[60px]"
        >
          검색
        </Button>
      )}
    </div>
  );
}