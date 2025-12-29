/**
 * StartMenu 컴포넌트
 * 
 * - 시작 메뉴 UI 및 기능 구현
 * - 테마 변경 기능 추가 (클래식, 다크, WISH 모드)  TODO: 추후 추가 
 */

'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Card, Divider, Modal } from '../ui';
import { useWindowStore, type AppType } from '@/app/stores/useWindowStore';

// TODO: 테마 모드 타입 정의 (추후 구현 예정)
type ThemeMode = 'classic' | 'dark' | 'wish';

interface StartMenuProps {
  onClose: () => void;
  isOpen: boolean;
  anchorRef?: React.RefObject<HTMLDivElement | null>;
}

export default function StartMenu({ onClose, isOpen, anchorRef }: StartMenuProps) {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [shutdownModalOpen, setShutdownModalOpen] = useState(false);

  // 테마 상태 관리 (TODO: 전역 상태/Context로 교체 필요)
  //const [theme, setTheme] = useState<ThemeMode>('classic');
  // 반응형 상태
  const [isMobile, setIsMobile] = useState(false);

  // 창 관리 기능 (앱 실행 시 사용)
  const { openWindow, recentApps } = useWindowStore();

  // 가장 최근에 실행한 앱
  const latestApp = recentApps.length > 0 ? recentApps[0] : null;

  // 1. 화면 크기 감지
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (anchorRef?.current && anchorRef.current.contains(event.target as Node)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  // 앱 실행 핸들러
  const handleOpenApp = (appId: string, type: AppType, title: string, icon: string) => {
    openWindow({ id: appId, type, title, icon });
    onClose();
  };

  // Shutdown 확인 함수
  const handleShutdownConfirm = () => {
    setShutdownModalOpen(false);
    onClose();

    // 브라우저 탭 닫기 시도
    try {
      window.close();
    } catch (e) {
      console.error('Failed to close window:', e);
    }

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
    <>
      <div
        ref={menuRef}
        className={`
        fixed z-[999] origin-bottom-left animate-pop-in

        /* [Mobile] 하단 꽉 채우기 */
        max-md:bottom-[44px] max-md:left-0 max-md:right-0 max-md:w-full
        max-md:shadow-[0px_-4px_20px_rgba(0,0,0,0.2)]

        /* [Desktop] 좌측 하단 고정 */
        md:bottom-[52px] md:left-1 md:w-64
      `}
      >
        <Card
          variant="window"
          padding="none"
          className="flex flex-col md:flex-row w-full shadow-[4px_4px_10px_rgba(0,0,0,0.3)]"
        >
          {/* [A] 좌측 사이드바 (Brand Strip) */}
          <div className="
          md:w-8 md:bg-linear-to-b md:from-brand-retro-navy md:to-[#000080]
          md:flex md:items-end md:justify-center md:pb-3

          /* [Mobile] 상단 바 */
          max-md:h-10 max-md:w-full max-md:bg-brand-retro-navy
          max-md:flex max-md:items-center max-md:pl-4
          bg-brand-retro-navy
        ">
            <span className="
            text-white font-semibold font-pixel text-lg tracking-widest whitespace-nowrap
            md:-rotate-90 md:mb-2
            drop-shadow-[1px_1px_1px_#000]
          ">
              WISH OS 98
            </span>
          </div>

          {/* [B] 우측 메뉴 리스트 */}
          <div className="flex-1 bg-gray-200 p-1 flex flex-col gap-0.5 max-h-[60vh] overflow-y-auto">

            <div className="px-2 py-1 mb-1 bg-gray-300 border-b border-white flex items-center gap-2">
              <span className="font-pixel text-xs font-bold text-gray-600">
                NCT WISH System
              </span>
            </div>

            {/* TODO: 실제 실행을 위한 로직 변경 필요 */}
            <StartMenuItem
              icon="/system/icons/apps/wisharchive.png"
              label="WISH Archive"
              arrow
              onClick={() => handleOpenApp('archive', 'WISH_ARCHIVE', 'WISH Archive', '/system/icons/apps/wisharchive.png')}
              isMobile={isMobile}
            />
            <StartMenuItem
              icon="/system/icons/apps/discography.png"
              label="Discography"
              onClick={() => handleOpenApp('disco', 'DISCOGRAPHY', 'Discography', '/system/icons/apps/discography.png')}
              isMobile={isMobile}
            />
            {latestApp ? (
              <StartMenuItem
                icon={latestApp.icon}
                label={`Recent: ${latestApp.title}`}
                onClick={() => handleOpenApp(latestApp.id, latestApp.type, latestApp.title, latestApp.icon)}
                isMobile={isMobile}
              />
            ) : (
              <StartMenuItem
                icon="🧩"
                label="Programs"
                onClick={() => handleOpenApp('programs', 'WISH_ARCHIVE', 'Programs', '🧩')}
                isMobile={isMobile}
              />
            )}

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
              onClick={() => handleOpenApp('settings', 'MY_WISH', 'Settings', '🛠️')}
              isMobile={isMobile}
            />
            <StartMenuItem
              icon="❓"
              label="Help & Support"
              onClick={() => handleOpenApp('help', 'README', 'Help & Support', '❓')}
              isMobile={isMobile}
            />

            <div className="mt-auto">
              <Divider orientation="horizontal" className="mb-1" />
              <StartMenuItem
                icon="🔌"
                label="Shut Down..."
                onClick={() => setShutdownModalOpen(true)}
                isMobile={isMobile}
              />
            </div>

          </div>
        </Card>
      </div>

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
    </>
  );
}

// ----------------------------------------------------------------------
// [Sub] 메뉴 아이템 컴포넌트
// ----------------------------------------------------------------------
function StartMenuItem({
  icon,
  label,
  onClick,
  arrow = false,
  isMobile = false,
}: {
  icon: string;
  label: string;
  onClick?: () => void;
  arrow?: boolean;
  isMobile?: boolean;
}) {

  const isImageIcon = icon.startsWith('/') || icon.startsWith('http');

  return (
    <button
      onClick={onClick}
      className={`
        group flex items-center gap-3 w-full
        text-left select-none
        hover:bg-brand-retro-navy hover:text-white
        active:bg-brand-retro-navy active:text-white
        transition-none

        /* [Mobile] 크기 조정 */
        ${isMobile ? 'py-3 px-4 border-b border-gray-300 last:border-0' : 'py-1.5 px-2'}
      `}
    >
      <span className={`
        filter drop-shadow-sm group-hover:drop-shadow-none flex justify-center items-center
        ${isMobile ? 'w-8 h-8' : 'w-6 h-6'}
      `}>
        {isImageIcon ? (
          <div className="relative w-full h-full">
            <Image
              src={icon}
              alt=""
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <span className={isMobile ? 'text-2xl' : 'text-lg'}>{icon}</span>
        )}
      </span>

      <span className={`
        font-pixel flex-1 truncate
        ${isMobile ? 'text-base pt-1 font-bold text-gray-800 group-hover:text-white' : 'text-sm pt-0.5'}
      `}>
        {label}
      </span>

      {arrow && (
        <span className={`
          font-pixel text-black group-hover:text-white
          ${isMobile ? 'text-xs' : 'text-[8px]'}
        `}>
          ▶
        </span>
      )}
    </button>
  );
}