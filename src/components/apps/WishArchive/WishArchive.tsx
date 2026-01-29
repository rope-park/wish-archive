/**
 * WishArchive 컴포넌트
 * - Windows 탐색기 스타일의 UI로 구성
 * - 좌측 사이드바, 중앙 콘텐츠 영역, 우측 인스펙터 패널로 구성
 * - 상단 툴바에는 메뉴 및 주소 표시줄, 뷰 모드 전환 버튼 포함
 * - 하단 상태 표시줄 포함
 * - 반응형 디자인 및 키보드 접근성 지원
 */

'use client';

import { useState, useEffect } from 'react';
import { useArchiveStore } from '@/app/stores/useArchiveStore';
import { AppHeader } from '@/components/ui/AppHeader';
import ArchiveSidebar from './ArchiveSidebar';
import ArchiveContent from './ArchiveContent';
import Inspector from './Inspector';
import { 
  Squares2X2Icon, 
  ListBulletIcon, 
  CalendarIcon, 
  ClockIcon,
  ChevronLeftIcon,
  Bars3Icon,
  FunnelIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// --- [메인 컴포넌트] ---

export default function WishArchive() {
  const { viewMode, setViewMode, selectedEventId, resetFilters } = useArchiveStore();
  const [showSidebar, setShowSidebar] = useState(false);
  const [showInspector, setShowInspector] = useState(false);

  // 선택된 아이템이 있으면 인스펙터 자동 열기 (모든 디바이스에서)
  useEffect(() => {
    if (selectedEventId) {
      // 상태 업데이트를 비동기로 처리
      const timer = setTimeout(() => setShowInspector(true), 0);
      return () => clearTimeout(timer);
    }
  }, [selectedEventId]);

  return (
    <div className="h-full flex flex-col bg-white font-sans text-black select-none" role="application" aria-label="WISH Archive Explorer" style={{ isolation: 'isolate' }}>
      
      {/* 통일된 헤더 */}
      <AppHeader
        menuItems={[
          {
            label: 'File',
            items: [
              { label: 'Print...', onClick: () => window.print(), shortcut: 'Ctrl+P' },
              { divider: true },
              { label: 'Close', onClick: () => {}, disabled: true, shortcut: 'Alt+F4' }
            ]
          },
          {
            label: 'Edit',
            items: [
              { label: 'Select All', onClick: () => resetFilters(), shortcut: 'Ctrl+A' },
              { divider: true },
              { label: 'Cut', onClick: () => {}, disabled: true, shortcut: 'Ctrl+X' },
              { label: 'Copy', onClick: () => {}, disabled: true, shortcut: 'Ctrl+C' },
              { label: 'Paste', onClick: () => {}, disabled: true, shortcut: 'Ctrl+V' }
            ]
          },
          {
            label: 'View',
            items: [
              { label: 'Thumbnails', onClick: () => setViewMode('GRID'), shortcut: 'Ctrl+1' },
              { label: 'Details', onClick: () => setViewMode('LIST'), shortcut: 'Ctrl+2' },
              { label: 'Timeline', onClick: () => setViewMode('TIMELINE'), shortcut: 'Ctrl+3' },
              { label: 'Calendar', onClick: () => setViewMode('CALENDAR'), shortcut: 'Ctrl+4' },
              { divider: true },
              { label: 'Refresh', onClick: () => resetFilters(), shortcut: 'F5' }
            ]
          },
          {
            label: 'Favorites',
            items: [
              { label: 'No favorites yet', onClick: () => {}, disabled: true }
            ]
          },
          {
            label: 'Help',
            items: [
              { label: 'Help Topics', onClick: () => alert('WISH Archive v1.0\nNCT WISH Content Explorer'), shortcut: 'F1' },
              { divider: true },
              { label: 'About', onClick: () => alert('WISH Archive v1.0\n© 2024-2026') }
            ]
          }
        ]}
        toolbarButtons={[
          {
            icon: <ChevronLeftIcon className="w-4 h-4" />,
            label: 'Back',
            onClick: () => {}
          },
          {
            icon: <Squares2X2Icon className="w-4 h-4" />,
            label: 'Grid',
            onClick: () => setViewMode('GRID'),
            active: viewMode === 'GRID'
          },
          {
            icon: <ListBulletIcon className="w-4 h-4" />,
            label: 'List',
            onClick: () => setViewMode('LIST'),
            active: viewMode === 'LIST'
          },
          {
            icon: <ClockIcon className="w-4 h-4" />,
            label: 'Timeline',
            onClick: () => setViewMode('TIMELINE'),
            active: viewMode === 'TIMELINE'
          },
          {
            icon: <CalendarIcon className="w-4 h-4" />,
            label: 'Calendar',
            onClick: () => setViewMode('CALENDAR'),
            active: viewMode === 'CALENDAR'
          }
        ]}
        addressBar={{
          value: 'C:\\NCT WISH\\Archive',
          readOnly: true,
          placeholder: 'Address'
        }}
        actionButtons={[
          {
            icon: <FunnelIcon className="w-4 h-4" />,
            label: 'Filter',
            onClick: () => setShowSidebar(!showSidebar),
            active: showSidebar
          },
          {
            icon: <ArrowPathIcon className="w-4 h-4" />,
            label: 'Refresh',
            onClick: () => resetFilters()
          },
          {
            icon: <Bars3Icon className="w-4 h-4" />,
            label: 'Inspector',
            onClick: () => setShowInspector(!showInspector),
            active: showInspector
          }
        ]}
      />

      {/* 2. Body Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - 모바일에서는 오버레이 */}
        <aside 
          className={`
            w-64 flex-shrink-0 bg-white border-r border-gray-400 transition-transform duration-300 ease-in-out
            md:translate-x-0 md:static md:z-0
            ${
              showSidebar 
                ? 'translate-x-0 absolute inset-y-0 left-0 z-30 shadow-2xl' 
                : '-translate-x-full absolute inset-y-0 left-0 z-30'
            }
          `}
          aria-label="Navigation sidebar"
        >
          <ArchiveSidebar />
        </aside>

        {/* 모바일 사이드바 오버레이 */}
        {showSidebar && (
          <div 
            className="md:hidden fixed inset-0 bg-black/30 z-20"
            onClick={() => setShowSidebar(false)}
            aria-hidden="true"
          />
        )}
        
        {/* Main Content */}
        <ArchiveContent />
        
        {/* Inspector - 데스크톱에서만 자동 표시, 모바일에서는 오버레이 */}
        {selectedEventId && (
          <aside 
            className={`
              w-80 flex-shrink-0 transition-transform duration-300 ease-in-out
              lg:translate-x-0 lg:static lg:z-0
              ${
                showInspector 
                  ? 'translate-x-0 absolute inset-y-0 right-0 z-30 shadow-2xl' 
                  : 'translate-x-full lg:translate-x-0 absolute inset-y-0 right-0 z-30'
              }
            `}
            aria-label="Properties panel"
            style={{ contain: 'none' }}
          >
            <Inspector onClose={() => setShowInspector(false)} />
          </aside>
        )}

        {/* 모바일 인스펙터 오버레이 */}
        {selectedEventId && showInspector && (
          <div 
            className="lg:hidden fixed inset-0 bg-black/30 z-20"
            onClick={() => setShowInspector(false)}
            aria-hidden="true"
          />
        )}

        {/* 모바일: Inspector 열기 버튼 (선택된 아이템이 있을 때만) */}
        {selectedEventId && !showInspector && (
          <button
            onClick={() => setShowInspector(true)}
            className="lg:hidden fixed right-4 z-40 text-white px-4 py-2 rounded shadow-lg border-2 border-white active:scale-95 transition-transform font-bold text-sm"
            style={{ 
              minHeight: '44px',
              backgroundColor: 'var(--color-brand-secondary, #FF2E93)',
              bottom: typeof window !== 'undefined' ? `${(window.innerWidth < 768 ? 64 : window.innerWidth < 1024 ? 56 : 48) + 16}px` : '80px'
            }}
          >
            View Details
          </button>
        )}
      </div>

      {/* 3. Status Bar */}
      <footer className="h-6 bg-[#ece9d8] border-t border-white flex items-center px-3 text-xs gap-4 text-gray-600 shadow-[inset_0_1px_0_rgba(0,0,0,0.1)]" role="status" aria-live="polite">
        <span>{selectedEventId ? '1 object selected' : '0 objects selected'}</span>
        <div className="h-4 w-px bg-gray-400 mx-1"></div>
        <span className="hidden sm:inline">My Computer</span>
      </footer>
    </div>
  );
}