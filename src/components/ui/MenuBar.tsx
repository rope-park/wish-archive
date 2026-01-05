/**
 * MenuBar 컴포넌트
 * 
 * - 상단 메뉴 바를 구현
 * - Dropdown 컴포넌트를 활용하여 메뉴 항목을 드롭다운 형식으로 표시
 * - 각 메뉴 항목은 key, label, disabled 상태, 하위 내용 등을 가질 수 있음
 */

'use client';

import { ReactNode, Fragment } from 'react';
import Dropdown, { useDropdown } from './Dropdown';


export interface MenuItemType {
  key: string;
  label: string;
  disabled?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

interface MenuBarProps {
  items: MenuItemType[];
  className?: string;
}

export default function MenuBar({ items, className = '' }: MenuBarProps) {
  const renderLabel = (label: string) => {
    const parts = label.split('&');
    if (parts.length === 1) return label;

    return (
      <>
        {parts[0]}
        <span className="underline">{parts[1].charAt(0)}</span>
        {parts[1].slice(1)}
      </>
    );
  };

  return (
    <nav
      className={`
        flex items-center w-full h-7 px-1
      bg-gray-200
        border-b border-white shadow-[0_1px_0_#808080]
        select-none z-40
        ${className}
      `}
      aria-label="Application Menu"
    >
      {items.map((item) => (
        <Dropdown key={item.key}>
          {/* Dropdown.Trigger: 메뉴 버튼 */}
          <Dropdown.Trigger as={MenuButton} disabled={item.disabled}>
            {/* 첫 글자에 밑줄 (단축키 느낌) */}
            {renderLabel(item.label)}
          </Dropdown.Trigger>

          {/* Dropdown.Menu: 실제 펼쳐지는 내용 */}
          {item.children}
        </Dropdown>
      ))}
    </nav>
  );
}

// 메뉴 버튼 컴포넌트
interface MenuButtonProps {
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

function MenuButton({ children, disabled, onClick, className = '' }: MenuButtonProps) {
  const { isOpen } = useDropdown();

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      onClick={disabled ? undefined : onClick}
      className={`
        h-5 px-2 mx-[1px]
        flex items-center justify-center
        rounded-none overflow-hidden
        font-pixel text-sm leading-none
        border 
        transition-none cursor-default
        
        ${disabled
          ? 'text-gray-400 border-transparent'
          : isOpen
            ? `
              bg-gray-200 text-black
              border-t-black border-l-black border-r-white border-b-white
              shadow-none
            `
            : `
              /* [Normal 상태] 평소에는 투명, 호버 시 Outset */
              text-black border-transparent
              
              /* Hover: 튀어나온 버튼 효과 (Outset) */
              hover:border-t-white hover:border-l-white hover:border-r-black hover:border-b-black
              hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)]
              
              /* Active (클릭 순간): 움푹 들어간 효과 */
              active:border-t-black active:border-l-black active:border-r-white active:border-b-white
              active:shadow-none
            `
        }
        ${className}
      `}
    >
      <span className={`pt-[2px] whitespace-nowrap ${isOpen ? 'translate-x-[1px] translate-y-[1px]' : ''}`}>
        {children}
      </span>
    </div>
  );
}