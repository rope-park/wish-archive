/**
 * Tabs 컴포넌트
 * 
 * - 탭 인터페이스를 제공하여 여러 섹션 간 전환
 * - 활성 탭 강조 및 폴더 인덱스 스타일
 */

'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  content?: ReactNode; // 탭 내용
  icon?: ReactNode;    // 탭 아이콘
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  variant?: 'folder' | 'simple';
}

export default function Tabs({
  items,
  defaultTab,
  activeTab: controlledTab,
  onChange,
  className = '',
  variant = 'folder',
}: TabsProps) {
// 1. 내부 상태 (비제어 모드일 때만 사용)
  const [internalTab, setInternalTab] = useState(() => {
    if (defaultTab && items.some(t => t.id === defaultTab)) return defaultTab;
    return items[0]?.id;
  });

  // 2. 제어 모드 여부 확인 (props로 activeTab이 넘어오면 제어 모드)
  const isControlled = controlledTab !== undefined;

  // 3. 현재 보여줄 탭 결정 (제어 모드면 props 우선, 아니면 내부 state)
  const currentTab = isControlled ? controlledTab : internalTab;

  // 탭 변경 핸들러
  const handleTabChange = (tabId: string) => {
    if (currentTab === tabId) return;

    // 비제어 모드일 때만 내부 상태 업데이트
    if (!isControlled) {
      setInternalTab(tabId);
    }
    
    // 부모에게 변경 알림
    onChange?.(tabId);
  };

  // 현재 활성화된 탭의 내용 찾기
  const activeContent = items.find((t) => t.id === currentTab)?.content;

  return (
    <div className={`w-full flex flex-col ${className}`}>

      {/* 탭 헤더 영역 (폴더 인덱스) */}
      <div className="w-full overflow-x-auto no-scrollbar">
        <div
          role="tablist"
          className="flex items-end gap-[2px] px-2 border-b-2 border-black min-w-max"
        >
          {items.map((tab) => {
            const isActive = currentTab === tab.id; // activeTab 대신 currentTab 사용

            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${tab.id}`}
                disabled={tab.disabled}
                onClick={() => !tab.disabled && handleTabChange(tab.id)}
                className={`
                  /* --- 공통 스타일 --- */
                  relative flex items-center justify-center gap-2
                  px-4 rounded-t-lg border-2 border-b-0 border-black
                  font-pixel text-sm transition-all duration-200 select-none whitespace-nowrap
                
                  /* --- 상태별 스타일 (높이 & 색상 차이) --- */
                  ${isActive
                    ? 'h-10 bg-white -mb-[2px] pb-1 z-10 font-bold' // 활성
                    : 'h-8 bg-gray-200 text-gray-500 hover:bg-gray-100 hover:text-black mt-2' // 비활성
                  }
                
                  ${tab.disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : 'cursor-pointer'}
                `}
              >
                {/* 아이콘 */}
                {tab.icon && (
                  <span className="text-base">{tab.icon}</span>
                )}

                {/* 라벨 */}
                <span>{tab.label}</span>
              </button>
            );
          })}

          {/* 빈 공간 채우기 (탭 뒤로 이어지는 선) */}
          <div className="flex-1 border-b-2 border-black min-w-[10px]" />
        </div>
      </div>

      {/* 탭 컨텐츠 영역 */}
      <div
        role="tabpanel"
        id={`panel-${currentTab}`}
        className="
          flex-1
          bg-white border-2 border-t-0 border-black 
          p-4 md:p-6 rounded-b-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]
          min-h-[200px]
          transition-opacity duration-300 ease-in-out
        "
      >
        {/* 콘텐츠 바뀔 때 페이드 효과 (Tailwind Class 사용) */}
        <div key={currentTab} className="animate-pop-in">
          {activeContent}
        </div>
      </div>
    </div>
  );
}