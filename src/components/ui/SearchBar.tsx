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

import { useState, InputHTMLAttributes, KeyboardEvent, useRef, useEffect, forwardRef } from 'react';
import { Button } from '../ui';

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch?: (value: string) => void; // 엔터/검색버튼 클릭 시 실행
  onChange?: (value: string) => void; // 입력값이 변할 때마다 실행 (실시간 검색용)
  onClear?: () => void;               // 초기화 시 실행
  value?: string;                     // 외부에서 주입하는 값 (제어 컴포넌트용)
  defaultValue?: string;              // 초기값
  placeholder?: string;
  fullWidth?: boolean;
  showButton?: boolean;               // 검색 버튼 표시 여부
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(({
  onSearch,
  onChange,
  onClear,
  value: propValue,
  defaultValue = '',
  placeholder = '검색어를 입력하세요...',
  fullWidth = false,
  showButton = true,
  className = '',
  autoFocus,
  ...props
}, ref) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const isControlled = propValue !== undefined;
  const currentValue = isControlled ? propValue : internalValue;

  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(inputRef.current);
      } else {
        ref.current = inputRef.current;
      }
    }
  }, [ref]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(currentValue);
    }
    if (e.key === 'Escape') {
      handleClear();
    }
  };

  const handleSearchClick = () => {
    onSearch?.(currentValue);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    onChange?.(''); // 빈 값으로 변경 알림
    onClear?.();
    inputRef.current?.focus();
  };

return (
    <div className={`flex items-center gap-1 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}>
      
      {/* 입력창 컨테이너 */}
      <div className="relative flex-1">
        {/* 돋보기 아이콘 */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none select-none">
          🔍
        </div>

        <input
          ref={inputRef}
          type="text"
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={`
            w-full h-8 pl-8 pr-8 py-1
            
            bg-white text-black font-gothic text-sm
            border-2 border-t-gray-600 border-l-gray-600 border-r-white border-b-white
            outline-none
            shadow-[inset_1px_1px_0px_#000]
            
            placeholder:text-gray-400
            selection:bg-brand-retro-navy selection:text-white
          `}
          {...props}
        />

        {/* 지우기 버튼 (X) - 값이 있을 때만 표시 */}
        {currentValue && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute right-1 top-1/2 -translate-y-1/2 
              w-5 h-5 flex items-center justify-center 
              text-gray-400 hover:text-red-500 hover:bg-gray-200 
              rounded-sm transition-colors
            "
            aria-label="Clear search"
          >
            <span className="font-pixel text-[10px] pb-0.5">✕</span>
          </button>
        )}
      </div>

      {/* 검색 버튼 */}
      {showButton && (
        <Button
          onClick={handleSearchClick}
          size="sm"
          className="h-8 px-3 min-w-[50px] font-pixel"
        >
          검색
        </Button>
      )}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar;