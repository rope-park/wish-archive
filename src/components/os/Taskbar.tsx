/**
 * Taskbar (작업 표시줄) 컴포넌트
 * 
 * - Colocation(파일 내 분리): 메인 컴포넌트 + 하위 컴포넌트들
 * - 하위 컴포넌트: 시작 버튼 (홈으로 이동), 앱 아이콘 독 (메뉴 이동), 시스템 트레이 (시계)
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { StartMenu } from '../os';
import { Button, Divider, Tooltip } from '../ui';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { useAudioStore } from '@/app/stores/useAudioStore';

// [하위 컴포넌트] 시작 버튼
function StartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {    
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
          h-full max-h-[32px] md:max-h-[38px]
          px-3 md:px-4
          gap-1 md:gap-2
          font-bold text-lg md:text-xl
          transition-all
          ${isOpen ? 'bg-dither shadow-inset translate-y-[1px]' : 'bg-gray-200'} // 열리면 눌린 상태
        `}
        onClick={() => setIsOpen(!isOpen)}
        isActive={isOpen}
      >
        <span className="text-brand-retro-navy drop-shadow-md text-base md:text-lg">★</span>
        <span className="hidden md:inline font-pixel pt-1 text-sm md:text-base">START</span>
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
      h-[28px] md:h-[36px]
      min-w-[70px] md:min-w-[110px]
      px-1 md:px-2
      flex items-center justify-center
      bg-gray-300 border border-gray-400 shadow-inset
    ">
      <span className="font-pixel text-[10px] md:text-sm pt-0.5 truncate select-none">
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

  return (
    <div className="
      hidden md:flex items-center gap-1 px-2 h-[36px] 
      bg-gray-200 shadow-inset border border-gray-400
      select-none
    ">

      {/* Vaccine: 지루함 방지 시스템 */}
      <Tooltip content="Anti-Boredom 가동 중..." position="top">
        <div className="
          w-6 h-6 flex items-center justify-center 
          cursor-help hover:scale-110 transition-transform
        ">
          <span className="text-sm filter drop-shadow-sm">🛡️</span>
        </div>
      </Tooltip>

      {/* Mail: 새 소식 알림 */}
      {/* 메일이 있을 때만 깜빡거리는 애니메이션 추가 */}
      {/* TODO: 실제 방명록 데이터와 연동 */}
      <Tooltip content={hasNewMail ? "새로운 방명록이 도착했습니다!" : "새로운 메시지가 없습니다."}>
        <div
          onClick={() => setHasNewMail(false)} // 클릭하면 읽음 처리
          className={`
            w-6 h-6 flex items-center justify-center cursor-pointer
            ${hasNewMail ? 'animate-bounce' : 'opacity-50 grayscale'}
          `}
        >
          <span className="text-sm">📩</span>
        </div>
      </Tooltip>

      {/* Heart: 위츄 체력 상태 */}
      <Tooltip content="WICHU HP: 100%">
        <div className="
          w-6 h-6 flex items-center justify-center 
          cursor-default animate-pulse
        ">
          <span className="text-xs text-green-400 drop-shadow-[1px_1px_0_#000]">
            ❤
          </span>
        </div>
      </Tooltip>

      {/* Network: 연결 상태 */}
      <Tooltip content="WISH World와 연결됨">
        <div className="w-6 h-6 flex items-center justify-center cursor-help">
          <span className="text-sm">📶</span>
        </div>
      </Tooltip>

      {/* Volume: 음소거 토글 */}
      {/* 실제 오디오 볼륨과 연동됨 */}
      <Tooltip content={isMuted ? "음소거 켜짐" : `볼륨: ${volume}%`}>
        <button
          onClick={toggleMute}
          className="
            w-6 h-6 flex items-center justify-center 
            hover:bg-gray-300 active:translate-y-[1px] rounded-sm
          "
        >
          <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
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
  const handleTabClick = (id: string, isMinimized: boolean) => {
    if (activeWindowId === id && !isMinimized) {
      minimizeWindow(id); // 활성 창이면 최소화
    } else {
      focusWindow(id); // 아니면 포커스
    }
  };

  return (
    <nav className="
      fixed bottom-0 left-0 right-0
      z-[var(--z-taskbar)]
      h-11 md:h-12
      pb-safe
      bg-[#c0c0c0]
      border-t-2 border-white
      shadow-[0_-4px_10px_rgba(0,0,0,0.1)]

      flex items-center px-1 gap-1 md:gap-2
    ">

      {/* [좌측] 시작 버튼 영역 */}
      <StartButton />

      <div className="h-[28px] md:h-[36px]"><Divider orientation="vertical" /></div>

      {/* [중앙] 윈도우 태스크 탭 영역 (열린 창 목록 렌더링) */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar h-full py-1 pl-1">
        {windows.map((win) => {
          // 활성 상태 조건: 현재 ID와 일치하고, 최소화 상태가 아닌 경우
          const isActive = activeWindowId === win.id && !win.isMinimized;
          const isFocused = activeWindowId === win.id; // 포커스 여부 (최소화 상태 무관)

          return (
            <button
              key={win.id}
              onClick={() => handleTabClick(win.id, win.isMinimized)}
              className={`
                h-full max-h-[32px] md:max-h-[36px]
                w-9 md:w-auto md:min-w-[40px] md:max-w-[180px] md:flex-1
                flex items-center justify-center md:justify-start gap-2 px-1 md:px-2
                border rounded-sm
                transition-all select-none

                /* 상태에 따른 스타일 분기 */
                ${isActive
                  ? 'bg-white shadow-inset border-gray-500 translate-y-[1px] font-bold' // 활성: 눌린 상태, 흰색 배경
                  : isFocused 
                    ? 'bg-gray-300 shadow-outset border-gray-400 hover:bg-gray-200' // 포커스(최소화): 회색, 약간 어두운 테두리
                    : 'bg-gray-200 shadow-outset hover:bg-gray-100 active:shadow-inset text-gray-700 border-gray-100' // 비활성: 기본 상태
                }
              `}
            >
              {/* 아이콘 */}
              <div className={`
                relative flex items-center justify-center
                w-5 h-5 md:w-4 md:h-4
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
                ${isActive ? 'text-black': 'text-gray-700'}
                hidden sm:inline
              `}>
                {win.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="h-[28px] md:h-[36px]"><Divider orientation="vertical" /></div>

      {/* [우측] 트레이 & 시계 영역 */}
      <div className="flex gap-1 md:gap-2 shrink-0 items-center h-full py-1">
        <SystemTray />
        <SystemClock />
      </div>

    </nav >
  );
}
