/**
 * Tabs 컴포넌트
 * 
 * 탭 네비게이션
 * - 여러 컨텐츠 영역 전환
 * - 접근성 고려 (role="tablist", aria-selected)
 */

'use client';

import { useState, type ReactNode } from 'react';

export interface Tab {
  id: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'default' | 'pills';
  className?: string;
}

export default function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = 'default',
  className = '',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeContent = tabs.find((t) => t.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* 탭 헤더 */}
      <div
        role="tablist"
        className={[
          'flex gap-1',
          variant === 'default' && 'border-b border-gray-200',
          variant === 'pills' && 'rounded-lg bg-gray-100 p-1',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            type="button"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => handleTabChange(tab.id)}
            className={[
              'px-4 py-2 text-sm font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              variant === 'default' &&
                (activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'),
              variant === 'pills' &&
                (activeTab === tab.id
                  ? 'rounded-md bg-white text-gray-900 shadow'
                  : 'text-gray-600 hover:text-gray-900'),
              tab.disabled && 'cursor-not-allowed opacity-50',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={activeTab}
        className="mt-4"
      >
        {activeContent}
      </div>
    </div>
  );
}
