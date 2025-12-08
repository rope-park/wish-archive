/**
 * Tabs 컴포넌트
 * 
 * - 탭 인터페이스를 제공하여 여러 섹션 간 전환
 * - 각 탭은 아이콘과 라벨을 가질 수 있음
 * - 활성 탭은 시각적으로 강조됨
 */
'use client';

import { useState, ReactNode } from 'react';

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
  onChange?: (tabId: string) => void;
  className?: string;
}

export default function Tabs({
  items,
  defaultTab,
  onChange,
  className = '',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || items[0]?.id);

  const handleTabChange = (tabId: string) => {
    if (activeTab === tabId) return;
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  // 현재 활성화된 탭의 내용 찾기
  const activeContent = items.find((t) => t.id === activeTab)?.content;

  return (
    <div className={`w-full ${className}`}>
      
      {/* 탭 헤더 영역 (폴더 인덱스) */}
      <div 
        role="tablist"
        className="flex items-end gap-[2px] px-2 border-b-2 border-black"
      >
        {items.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              disabled={tab.disabled}
              onClick={() => handleTabChange(tab.id)}
              className={`
                /* --- 공통 스타일 --- */
                relative flex items-center justify-center gap-2
                px-4 rounded-t-lg border-t-2 border-l-2 border-r-2 border-black
                font-pixel text-sm transition-all duration-200
                
                /* --- 상태별 스타일 (높이 & 색상 차이) --- */
                ${isActive 
                  ? 'h-10 bg-white -mb-[2px] pb-1 z-10' // 활성: 키 크고, 하단 선 덮음
                  : 'h-8 bg-gray-200 text-gray-500 hover:bg-gray-100 hover:text-black mt-2' // 비활성: 키 작음
                }
                
                ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {/* 아이콘 */}
              {tab.icon && (
                <span className="text-base">{tab.icon}</span>
              )}
              
              {/* 라벨 */}
              <span>{tab.label}</span>

              {/* 활성 탭: 오른쪽 그림자 디테일 (선택사항) */}
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black/10 pointer-events-none" />
              )}
            </button>
          );
        })}
        
        {/* 빈 공간 채우기 (선택사항: 탭 뒤로 이어지는 선) */}
        <div className="flex-1" />
      </div>

      {/* 탭 컨텐츠 영역 */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        className="
          bg-white border-2 border-t-0 border-black 
          p-6 rounded-b-xl shadow-hard
          min-h-[200px]
        "
      >
        {activeContent}
      </div>
    </div>
  );
}