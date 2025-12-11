/**
 * MenuBar 컴포넌트
 * 
 * - 상단 메뉴 바를 구현
 * - Dropdown 컴포넌트를 활용하여 메뉴 항목을 드롭다운 형식으로 표시
 * - 각 메뉴 항목은 key, label, disabled 상태, 하위 내용 등을 가질 수 있음
 */

'use client';

import { ReactNode } from 'react';
import Dropdown from '@/components/ui/Dropdown';


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
    return (
        <nav
            className={`flex items-center h-full ${className}`}
            aria-label="Application Menu"
        >
            {items.map((item) => (
                <Dropdown key={item.key}>
                    {/* Dropdown.Trigger: 메뉴 버튼 */}
                    <Dropdown.Trigger>
                        <MenuButton disabled={item.disabled}>
                            {/* 첫 글자에 밑줄 (단축키 느낌) */}
                            <span className="first-letter:underline">{item.label}</span>
                        </MenuButton>
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
  onClick?: () => void;
  // Dropdown에서 자동으로 주입해주는 isOpen props를 받을 수 있게 설정
  isOpen?: boolean; 
}

function MenuButton({ children, disabled, onClick, isOpen }: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        h-6 px-2 mx-[1px]
        flex items-center justify-center
        rounded-none
        font-pixel text-sm leading-none select-none
        transition-colors duration-0
        
        /* --- 상태별 스타일 --- */
        ${disabled 
          ? 'text-gray-400 cursor-default' 
          : isOpen
            ? 'bg-brand-retro-navy text-white shadow-none' // 열려있을 때
            : 'text-black hover:bg-brand-retro-navy hover:text-white' // 평소 & 호버
        }
      `}
    >
      {children}
    </button>
  );
}