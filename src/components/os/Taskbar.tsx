/**
 * Taskbar (작업 표시줄) 컴포넌트
 * 
 * - Colocation(파일 내 분리): 메인 컴포넌트 + 하위 컴포넌트들
 * - 하위 컴포넌트: 시작 버튼 (홈으로 이동), 앱 아이콘 독 (메뉴 이동), 시스템 트레이 (시계)
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { StartMenu } from '@/components/os';
import { Button, Divider, Tooltip } from '@/components/ui';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { useAudioStore } from '@/app/stores/useAudioStore';

// [하위 컴포넌트] 시작 버튼
function StartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="shrink-0 relative h-full flex items-center" ref={buttonRef}>
      {/* 시작 메뉴 (버튼 위에 렌더링) */}
      <StartMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={buttonRef} // 필요하다면 위치 참조용으로 전달
      />

      {/* 시작 버튼 */}
      <Button
        className={`
          h-full
          px-3 md:px-4
          gap-2
          font-bold
          transition-all
          shrink-0
          ${isOpen ? 'bg-dither shadow-inset translate-y-[1px]' : 'bg-gray-200'}
        `}
        onClick={handleToggle}
        onTouchEnd={(e: React.TouchEvent<HTMLButtonElement>) => {
          e.preventDefault();
          handleToggle(e);
        }}
        isActive={isOpen}
        style={{ touchAction: 'manipulation' }}
      >
        <span className="text-brand-retro-navy drop-shadow-md text-xl">★</span>
        <span className="hidden sm:inline font-pixel pt-1 text-sm">START</span>
      </Button>
    </div>
  );
}

// [하위 컴포넌트] 시스템 시계
function SystemClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="
      h-full
      min-w-[100px]
      px-3
      flex items-center justify-center
      bg-gray-300 border border-gray-400 shadow-inset
      shrink-0
    ">
      <span className="font-pixel text-sm pt-0.5 truncate select-none">
        {time || '--:-- --'}
      </span>
    </div>
  );
}

// [하위 컴포넌트] 시스템 트레이 (아이콘 모음)
function SystemTray() {
  // 트레이 아이콘 데이터
  /** TODO: 아이콘 이미지 추가 */

  const { isMuted, volume, toggleMute } = useAudioStore();
  /** TODO: 전역 상태로 관리 */
  const [hasNewMail, setHasNewMail] = useState(true);

  const handleIconClick = (handler: () => void) => (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handler();
  }

  return (
    <div className="
      hidden md:flex items-center gap-1 px-2 h-full
      bg-gray-200 shadow-inset border border-gray-400
      select-none shrink-0
    ">

      {/* Vaccine: 지루함 방지 시스템 */}
      <Tooltip content="Anti-Boredom 가동 중..." position="top">
        <div className="
          w-8 h-8 md:w-7 md:h-7 flex items-center justify-center 
          cursor-help hover:scale-110 transition-transform
          active:scale-95
        ">
          <span className="text-base md:text-sm filter drop-shadow-sm">🛡️</span>
        </div>
      </Tooltip>

      {/* Mail: 새 소식 알림 */}
      {/* 메일이 있을 때만 깜빡거리는 애니메이션 추가 */}
      {/* TODO: 실제 방명록 데이터와 연동 */}
      <Tooltip content={hasNewMail ? "새로운 방명록이 도착했습니다!" : "새로운 메시지가 없습니다."}>
        <div
          onClick={handleIconClick(() => setHasNewMail(false))}
          onTouchEnd={handleIconClick(() => setHasNewMail(false))}
          className={`
            w-7 h-7 flex items-center justify-center cursor-pointer
            active:scale-95 transition-transform
            ${hasNewMail ? 'animate-bounce' : 'opacity-50 grayscale'}
          `}
          style={{
            minWidth: '36px',
            minHeight: '36px',
            touchAction: 'manipulation',
          }}
        >
          <span className="text-sm">📩</span>
        </div>
      </Tooltip>

      {/* Heart: 위츄 체력 상태 */}
      <Tooltip content="WICHU HP: 100%">
        <div className="
          w-8 h-8 md:w-7 md:h-7 flex items-center justify-center 
          cursor-default animate-pulse
        ">
          <span className="text-sm md:text-xs text-green-400 drop-shadow-[1px_1px_0_#000]">❤</span>
        </div>
      </Tooltip>

      {/* Network: 연결 상태 */}
      <Tooltip content="WISH World와 연결됨">
        <div className="w-8 h-8 md:w-7 md:h-7 flex items-center justify-center cursor-help">
          <span className="text-base md:text-sm">📶</span>
        </div>
      </Tooltip>

      {/* Volume: 음소거 토글 */}
      {/* 실제 오디오 볼륨과 연동됨 */}
      <Tooltip content={isMuted ? "음소거 켜짐" : `볼륨: ${volume}%`}>
        <button
          onClick={handleIconClick(toggleMute)}
          onTouchEnd={handleIconClick(toggleMute)}
          className="
            w-8 h-8 md:w-7 md:h-7 flex items-center justify-center 
            hover:bg-gray-300 active:translate-y-[1px] active:scale-95 rounded-sm
            transition-transform
          "
          style={{
            touchAction: 'manipulation',
          }}
        >
          <span className="text-base md:text-sm">{isMuted ? '🔇' : '🔊'}</span>
        </button>
      </Tooltip>
    </div>
  );
}

// [메인 컴포넌트] Taskbar 컴포넌트
export default function Taskbar() {
  // Store 구독: 열린 창 목록과 현재 활성 창 ID 가져오기
  const { windows, activeWindowId, focusWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  // 탭 클릭 핸들러
  const handleTabClick = (id: string, isMinimized: boolean) => (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (activeWindowId === id && !isMinimized) {
      minimizeWindow(id);
    } else {
      focusWindow(id);
    }
  };

  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      z-[var(--z-taskbar)]
      h-16 md:h-14 lg:h-12
      min-h-[64px] md:min-h-[56px] lg:min-h-[48px]
      pb-safe
      bg-[#c0c0c0]
      border-t-2 border-white
      shadow-[0_-4px_10px_rgba(0,0,0,0.1)]
      pointer-events-auto

      flex items-center px-1 md:px-2 gap-1 md:gap-2
    ">

      <StartButton />

      <Divider orientation="vertical" />

      {/* 윈도우 태스크 탭 영역 */}
      <div className="flex-1 flex items-center gap-0.5 md:gap-1 lg:gap-2 overflow-x-auto overflow-y-hidden no-scrollbar h-full">
        {windows.map((win) => {
          const isActive = activeWindowId === win.id && !win.isMinimized;

          return (
            <button
              key={win.id}
              onClick={handleTabClick(win.id, win.isMinimized)}
              onTouchEnd={handleTabClick(win.id, win.isMinimized)}
              className={`
                h-full
                w-12 sm:w-auto sm:min-w-[100px] md:max-w-[180px] sm:flex-1
                flex items-center justify-center sm:justify-start gap-2 px-2 sm:px-3
                border rounded-sm
                transition-all select-none
                pointer-events-auto
                active:scale-95
                shrink-0

                ${isActive
                  ? 'bg-white shadow-inset border-gray-600 font-bold -translate-y-[1px]'
                  : 'bg-gray-200 shadow-outset hover:bg-gray-100 text-gray-700 border-gray-400'
                }
              `}
              style={{
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {/* 아이콘 */}
              <div className={`
                relative flex items-center justify-center
                w-6 h-6 md:w-5 md:h-5
                ${isActive ? 'opacity-100' : 'opacity-80 grayscale-[0.3]'}
              `}>
                {win.icon.startsWith('/') ? (
                  <Image src={win.icon} alt="" fill className="object-contain" />
                ) : (
                  <span className="text-lg md:text-base leading-none">{win.icon}</span>
                )}
              </div>

              {/* 제목 */}
              <span className={`
                font-pixel text-xs md:text-sm pt-0.5 truncate flex-1 text-left
                ${isActive ? 'text-black' : 'text-gray-700'}
                hidden sm:inline
              `}>
                {win.title}
              </span>
            </button>
          );
        })}
      </div>

      <Divider orientation="vertical" />

      {/* 트레이 & 시계 영역 */}
      <div className="flex gap-2 shrink-0 items-center h-full">
        <SystemTray />
        <SystemClock />
      </div>

    </nav>
  );
}