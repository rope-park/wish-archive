/**
 * StartMenu 컴포넌트
 * 
 * - 시작 메뉴 UI 및 기능 구현
 * - 테마 변경 기능 추가 (클래식, 다크, WISH 모드)  TODO: 추후 추가 
 */

'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Card, Divider, Modal } from '../ui';

// TODO: 테마 모드 타입 정의 (추후 구현 예정)
type ThemeMode = 'classic' | 'dark' | 'wish';

interface StartMenuProps {
  onClose: () => void;
  isOpen: boolean;
  anchorRef?: React.RefObject<HTMLDivElement | null>;
}

export default function StartMenu({ onClose, isOpen }: StartMenuProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [shutdownModalOpen, setShutdownModalOpen] = useState(false);
  
  // 테마 상태 관리 (TODO: 전역 상태/Context로 교체 필요)
  //const [theme, setTheme] = useState<ThemeMode>('classic');

  // 외부 클릭 닫기 로직
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  // Shutdown 확인 함수
  const handleShutdownConfirm = () => {
    setShutdownModalOpen(false);
    onClose();
    
    // 브라우저 탭 닫기 시도
    window.close();
    
    // window.close()가 작동하지 않는 경우를 위한 fallback
    // (사용자가 직접 연 탭은 스크립트로 닫을 수 없음)
    setTimeout(() => {
      // 종료 화면 표시 (검은 화면 + 메시지)
      document.body.innerHTML = `
        <div style="
          position: fixed;
          inset: 0;
          background: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-family: 'DungGeunMo', monospace;
          z-index: 9999;
        ">
          <div style="text-align: center;">
            <div style="font-size: 48px; margin-bottom: 20px;">🍀</div>
            <div style="font-size: 24px; margin-bottom: 10px;">WISH OS 98</div>
            <div style="font-size: 14px; opacity: 0.7;">시스템이 안전하게 종료되었습니다.</div>
            <div style="font-size: 12px; opacity: 0.5; margin-top: 20px;">이제 브라우저 탭을 닫으셔도 됩니다.</div>
          </div>
        </div>
      `;
    }, 100);
  };

  // TODO: 테마 변경 핸들러 (추후 구현 예정)
  /*
  const toggleTheme = () => {
    const nextTheme: Record<ThemeMode, ThemeMode> = {
      classic: 'dark',
      dark: 'wish',
      wish: 'classic',
    };
    const newTheme = nextTheme[theme];
    
    setTheme(newTheme);
    // 실제 적용: document.documentElement.classList.add(newTheme)...
    console.log(`Theme changed to: ${newTheme}`); 
  };

  // TODO: 현재 테마에 따른 라벨 및 아이콘 설정 (추후 구현 예정)
  const themeConfig = {
    classic: { label: 'Theme: Classic', icon: '☀' }, // 윈도우 98 기본
    dark:    { label: 'Theme: Dark',    icon: '🌙' }, // 다크 모드
    wish:    { label: 'Theme: WISH',    icon: '🍀' }, // 위시 시그니처 컬러
  };
  */

  return (
    <div 
      ref={menuRef}
      className="fixed bottom-[52px] left-1 z-[999] origin-bottom-left animate-pop-in"
    >
      <Card 
        variant="window" 
        padding="none"
        className="flex flex-row w-60 shadow-[4px_4px_10px_rgba(0,0,0,0.3)]"
      >
        {/* [A] 좌측 사이드바 (Brand Strip) */}
        <div className="
          w-8 bg-brand-retro-navy 
          flex items-end justify-center pb-3
          bg-linear-to-b from-brand-deep to-[#000080]
        ">
          <span className="
            text-white font-bold font-pixel text-lg tracking-widest whitespace-nowrap
            -rotate-90 mb-2 drop-shadow-[1px_1px_0px_#000]
          ">
            WISH OS 98
          </span>
        </div>

        {/* [B] 우측 메뉴 리스트 */}
        <div className="flex-1 bg-gray-200 p-1 flex flex-col gap-0.5">
          
          <div className="px-2 py-1 mb-1 bg-gray-300 border-b border-white">
             <span className="font-pixel text-xs font-bold text-gray-600">
               NCT WISH System
             </span>
          </div>

          <StartMenuItem 
            icon="📂" 
            label="WISH Archive" 
            arrow 
            onClick={() => handleNavigate('/archive')} 
          />
          <StartMenuItem 
            icon="💿" 
            label="Discography" 
            onClick={() => handleNavigate('/releases')} 
          />
          
          <div className="my-1 px-1">
            <Divider orientation="horizontal" />
          </div>

          {/* TODO: [Future] 테마 변경 메뉴 (추후 구현 예정) */}
          {/* 
          <StartMenuItem 
            icon="☀" 
            label="Theme: Classic" 
            arrow={false}
            onClick={toggleTheme} 
          />
          */}

          <StartMenuItem 
            icon="🛠️" 
            label="Settings" 
            onClick={() => handleNavigate('/settings')} 
          />

          <div className="mt-auto">
            <Divider orientation="horizontal" className="mb-1" />
            <StartMenuItem 
              icon="🔌" 
              label="Shut Down..." 
              onClick={() => setShutdownModalOpen(true)}
            />
          </div>

        </div>
      </Card>

      {/* Shutdown 확인 Modal */}
      <Modal
        isOpen={shutdownModalOpen}
        onClose={() => setShutdownModalOpen(false)}
        title="Shut Down"
        variant="question"
        message="시스템을 종료하시겠습니까?"
        onConfirm={handleShutdownConfirm}
        confirmText="종료"
        cancelText="취소"
      />
    </div>
  );
}

// [내부용] 메뉴 아이템
function StartMenuItem({ 
  icon, 
  label, 
  onClick, 
  arrow = false 
}: { 
  icon: string; 
  label: string; 
  onClick?: () => void; 
  arrow?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="
        group flex items-center gap-2 px-2 py-1.5 w-full
        text-left select-none
        hover:bg-brand-retro-navy hover:text-white
        active:bg-brand-retro-navy active:text-white
        transition-none
      "
    >
      <span className="text-lg filter drop-shadow-sm group-hover:drop-shadow-none w-6 flex justify-center">
        {icon}
      </span>
      <span className="font-pixel text-sm pt-0.5 flex-1 truncate">
        {label}
      </span>
      {arrow && (
        <span className="font-pixel text-[8px] text-black group-hover:text-white">▶</span>
      )}
    </button>
  );
}