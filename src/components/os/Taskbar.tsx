/**
 * Taskbar (작업 표시줄)
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

// [하위 컴포넌트] 시작 버튼
function StartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 바깥 클릭 시 메뉴 닫기
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="shrink-0 relative" ref={buttonRef}>
      {/* 시작 메뉴 (버튼 위에 렌더링) */}
      <StartMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        anchorRef={buttonRef} // 필요하다면 위치 참조용으로 전달
      />

      {/* 시작 버튼 */}
      <Button
        className={`
          h-[38px] px-2 md:px-4 text-lg md:text-xl font-bold gap-2 
          ${isOpen ? 'bg-dither shadow-inset' : 'bg-gray-200'} // 열리면 눌린 상태
        `}
        onClick={() => setIsOpen(!isOpen)}
        isActive={isOpen}
      >
        <span className="text-brand-primary drop-shadow-md">★</span>
        <span className="hidden md:inline font-pixel pt-1">START</span>
      </Button>
    </div>
  );
}

// [하위 컴포넌트] 시계
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
      h-[37px] min-w-[90px] md:min-w-[110px] px-2
      flex items-center justify-center
      bg-gray-300 border border-gray-400 shadow-inset
    ">
      <span className="font-pixel text-sm md:text-xl tracking-wide pt-1 truncate">
        {time}
      </span>
    </div>
  );
}

// [하위 컴포넌트] 시스템 트레이 (아이콘 모음)
function SystemTray() {
  // 트레이 아이콘 데이터
  /** TODO: 아이콘 이미지 추가 */

  // 볼륨 상태 관리
  const [isMuted, setIsMuted] = useState(false);

  // 메일 상태
  /** TODO: 전역 상태로 관리 */
  const [hasNewMail, setHasNewMail] = useState(true);

  return (
    <div className="
      hidden md:flex items-center gap-1 px-2 py-1 h-[37px] 
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
          <span className="text-xs text-red-600 drop-shadow-[1px_1px_0_#000]">
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
      <Tooltip content={isMuted ? "음소거 켜짐" : "볼륨: 100%"}>
        <button
          onClick={() => setIsMuted(!isMuted)}
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
      fixed bottom-0 left-0 z-[100]
      w-full h-[50px] px-1 pb-1
      flex items-center gap-2
      bg-gray-200
      border-t-2 border-white
      shadow-[0_-4px_10px_rgba(0,0,0,0.1)]
    ">

      {/* 시작 버튼 영역 */}
      <StartButton />

      <div className="h-[36px] mx-1"><Divider orientation="vertical" /></div>

      {/* 태스크 탭 영역 (열린 창 목록 렌더링) */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto no-scrollbar px-1 h-full">
        {windows.map((win) => {
          // 활성 상태 조건: 현재 ID와 일치하고, 최소화 상태가 아닌 경우
          const isActive = activeWindowId === win.id && !win.isMinimized;
          const isFocused = activeWindowId === win.id; // 포커스 여부 (최소화 상태 무관)

          return (
            <button
              key={win.id}
              onClick={() => handleTabClick(win.id, win.isMinimized)}
              className={`
                h-[38px] flex-1
                min-w-[40px] max-w-[200px]
                flex items-center justify-center gap-2 px-2
                border rounded-sm
                transition-all select-none

                /* 상태에 따른 스타일 분기 */
                ${isActive
                  ? 'bg-white shadow-inset font-bold translate-y-[1px] border-gray-400' // 활성: 눌린 상태, 흰색 배경
                  : isFocused 
                    ? 'bg-gray-300 shadow-outset border-gray-500 hover:bg-gray-200' // 포커스(최소화): 회색, 약간 어두운 테두리
                    : 'bg-gray-200 shadow-outset hover:bg-gray-100 active:shadow-inset text-gray-700 border-gray-400' // 비활성: 기본 상태
                }
              `}
            >
              {/* 아이콘 + 제목 */}
              {win.icon.startsWith('/') ? (
                <Image
                  src={win.icon}
                  alt=""
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain shrink-0"
                />
              ) : (
                <span className="text-lg shrink-0">{win.icon}</span>
              )}

              <span className="font-pixel text-sm pt-1 truncate flex-1 text-left min-w-0 hidden [@media(min-width:100px)]:inline">
                {win.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden md:block h-[36px] mx-1"><Divider orientation="vertical" /></div>

      {/* 트레이 & 시계 영역 */}
      <div className="flex gap-2 shrink-0">
        <SystemTray />
        <SystemClock />
      </div>

    </nav >
  );
}
