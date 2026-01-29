/**
 * AppHeader - 통일된 레트로 Windows 스타일 헤더 컴포넌트
 * 모든 앱에서 일관된 UI/UX 제공
 */

'use client';

import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Menu } from 'lucide-react';

export interface MenuItem {
  label: string;
  items?: Array<{
    label?: string;
    onClick?: () => void;
    shortcut?: string;
    disabled?: boolean;
    divider?: boolean;
  }>;
}

export interface ToolbarButton {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
}

interface AppHeaderProps {
  menuItems?: MenuItem[];
  toolbarButtons?: ToolbarButton[];
  addressBar?: {
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    readOnly?: boolean;
  };
  actionButtons?: ToolbarButton[];
}

export function AppHeader({
  menuItems = [],
  toolbarButtons = [],
  addressBar,
  actionButtons = [],
}: AppHeaderProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.menu-container')) {
        setOpenMenu(null);
      }
    };

    if (openMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [openMenu]);

  const handleMenuClick = (label: string) => {
    setOpenMenu(openMenu === label ? null : label);
  };

  return (
    <div className="flex flex-col bg-[#c0c0c0] border-b-2 border-gray-400 select-none">
      {/* 메뉴바 (데스크톱) */}
      {menuItems.length > 0 && (
        <div className="hidden md:flex items-center h-7 px-1 border-b border-gray-400 bg-linear-to-b from-white/5 to-transparent">
          {menuItems.map((menu) => (
            <div key={menu.label} className="menu-container relative">
              <button
                onClick={() => handleMenuClick(menu.label)}
                className={`
                  px-3 py-1 font-pixel text-xs hover:bg-[#000080] hover:text-white transition-colors
                  ${openMenu === menu.label ? 'bg-[#000080] text-white' : 'text-black'}
                `}
              >
                {menu.label}
              </button>
              
              {openMenu === menu.label && menu.items && (
                <div className="absolute top-full left-0 z-50 min-w-45 bg-[#c0c0c0] border-2 border-white border-r-gray-800 border-b-gray-800 shadow-lg">
                  {menu.items.map((item, idx) => 
                    item.divider ? (
                      <div key={idx} className="h-px bg-gray-600 my-1 mx-2" />
                    ) : item.label ? (
                      <button
                        key={idx}
                        onClick={() => {
                          if (!item.disabled && item.onClick) {
                            item.onClick();
                            setOpenMenu(null);
                          }
                        }}
                        disabled={item.disabled}
                        className={`
                          w-full px-4 py-2 text-left font-pixel text-xs flex items-center justify-between
                          ${item.disabled 
                            ? 'text-gray-500 cursor-not-allowed' 
                            : 'hover:bg-[#000080] hover:text-white cursor-pointer'
                          }
                        `}
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span className="text-gray-600 ml-4">{item.shortcut}</span>
                        )}
                      </button>
                    ) : null
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 툴바 */}
      <div className="flex items-center gap-1 p-1 min-h-11">
        {/* 모바일 햄버거 메뉴 */}
        {menuItems.length > 0 && (
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden p-2 hover:bg-gray-300 active:bg-gray-400 rounded"
          >
            <Menu size={20} />
          </button>
        )}

        {/* 툴바 버튼들 */}
        {toolbarButtons.length > 0 && (
          <div className="flex items-center gap-0.5 pr-1 border-r border-gray-600">
            {toolbarButtons.map((btn, idx) => (
              <Button
                key={idx}
                onClick={btn.onClick}
                disabled={btn.disabled}
                className={`
                  min-w-11 min-h-11 p-2 flex flex-col items-center gap-0.5
                  ${btn.active ? 'bg-gray-400 shadow-inset' : ''}
                `}
                title={btn.label}
              >
                {btn.icon}
                <span className="hidden lg:inline font-pixel text-[9px] pt-0.5">{btn.label}</span>
              </Button>
            ))}
          </div>
        )}

        {/* 주소/경로 바 */}
        {addressBar && (
          <div className="flex-1 flex items-center gap-1 px-1">
            <span className="hidden sm:inline font-pixel text-xs text-gray-700">Path:</span>
            <input
              type="text"
              value={addressBar.value}
              onChange={(e) => addressBar.onChange?.(e.target.value)}
              placeholder={addressBar.placeholder}
              readOnly={addressBar.readOnly}
              className="flex-1 px-2 py-1.5 bg-white border-2 border-gray-600 border-t-gray-800 border-l-gray-800 font-pixel text-xs focus:outline-none focus:border-[#000080] min-h-9"
            />
          </div>
        )}

        {/* 액션 버튼들 */}
        {actionButtons.length > 0 && (
          <div className="flex items-center gap-0.5 pl-1 border-l border-gray-600">
            {actionButtons.map((btn, idx) => (
              <Button
                key={idx}
                onClick={btn.onClick}
                disabled={btn.disabled}
                className={`
                  min-w-11 min-h-11 p-2 flex items-center justify-center
                  ${btn.active ? 'bg-gray-400 shadow-inset' : ''}
                `}
                title={btn.label}
              >
                {btn.icon}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* 모바일 메뉴 */}
      {showMobileMenu && menuItems.length > 0 && (
        <div className="md:hidden bg-white border-t-2 border-gray-400 shadow-lg">
          {menuItems.map((menu) => (
            <div key={menu.label} className="border-b border-gray-300">
              <div className="px-4 py-2 font-pixel text-xs font-bold bg-gray-200">
                {menu.label}
              </div>
              {menu.items?.map((item, idx) =>
                item.divider ? (
                  <div key={idx} className="h-px bg-gray-400 my-1" />
                ) : item.label ? (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!item.disabled && item.onClick) {
                        item.onClick();
                        setShowMobileMenu(false);
                      }
                    }}
                    disabled={item.disabled}
                    className={`
                      w-full px-6 py-3 text-left font-pixel text-xs
                      ${item.disabled 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'hover:bg-blue-100 active:bg-blue-200'
                      }
                    `}
                  >
                    {item.label}
                  </button>
                ) : null
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}