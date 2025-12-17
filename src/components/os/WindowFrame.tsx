/**
 * WindowFrame 컴포넌트
 * 
 * - 윈도우 스타일의 프레임 제공
 * - 드래그 가능한 헤더 (추후 Draggable 라이브러리 연동 가능)
 * - 반응형 크기 조절
 */

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { motion } from 'framer-motion';

interface WindowFrameProps {
  id: string;           // 윈도우 고유 ID
  title: string;        // 창 제목
  iconSrc?: string;     // 창 아이콘 (이모지 또는 이미지 등)
  children: ReactNode;  // 창 내부 컨텐츠
  className?: string;   // 추가 클래스명
  initialSize?: { width: number; height: number }; // 초기 크기
  initialPosition?: { x: number; y: number }; // 초기 위치
}

export default function WindowFrame({
  id,
  title,
  iconSrc = '',
  children,
  className = '',
  initialSize = { width: 600, height: 400 },
  initialPosition = { x: 50, y: 50 },
}: WindowFrameProps) {
  const { windows, activeWindowId, closeWindow, focusWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize } = useWindowStore();
  const windowState = windows.find(w => w.id === id);
  const isFocused = activeWindowId === id;

  const [isMobile, setIsMobile] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 1. 반응형 처리 (모바일 여부 감지)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!isMounted || !windowState || windowState.isMinimized) return null; // SSR 문제 방지

  // 2. [모바일 뷰] 최대화 상태로 고정
  if (isMobile) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[50] flex flex-col bg-[#c0c0c0] pb-[50px]"
        onClick={() => focusWindow(id)}
      >
        {/* 모바일 헤더 */}
        <div className="
          h-10 shrink-0
          bg-linear-to-r from-[#ff2e93] to-[#ff8fab]
          flex items-center justify-between px-3
          border-b-2 border-white border-t-2 border-t-white/50
          shadow-md
        ">
          <div className="flex items-center gap-2">
            {iconSrc && <img src={iconSrc} alt="" className="w-5 h-5 object-contain filter drop-shadow-sm" />}
            <span className="text-white font-bold font-pixel text-sm truncate max-w-[200px] drop-shadow-md">
              {title}.exe
            </span>
          </div>

          <div className="flex gap-2">
            <WindowControlBtn type="minimize" onClick={() => minimizeWindow(id)} />
            <WindowControlBtn type="close" onClick={() => closeWindow(id)} />
          </div>
        </div>

        {/* 모바일 컨텐츠 */}
        <div className="flex-1 overflow-auto bg-white custom-scrollbar">
          {children}
        </div>

        {/* 모바일 상태바 */}
        <div className="
          h-6 px-2 shrink-0
          flex justify-between items-center
          bg-[#e0e0e0]
          border-t-2 border-gray-400
          shadow-inset
          text-[10px] font-pixel text-gray-600 select-none
        ">
          <span className="truncate">Connected to WISH World...</span>
          <div className="flex gap-2">
            <span>Mem: 128MB</span>
            <span className="text-green-600 font-bold">Online</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // 3. [데스크탑 뷰] 드래그 윈도우 (Desktop Window)
  return (
    <Rnd
      // 최대화 상태일 때는 위치(0,0)와 크기(100%) 고정, 아니면 store의 값 사용
      size={windowState.isMaximized
        ? { width: '100%', height: '100%' }
        : windowState.size
      }
      position={windowState.isMaximized
        ? { x: 0, y: 0 }
        : windowState.position
      }

      minWidth={320}
      minHeight={200}
      bounds="parent"

      disableDragging={windowState.isMaximized}
      enableResizing={!windowState.isMaximized}

      onDragStart={() => focusWindow(id)}
      onDragStop={(e, d) => {
        updateWindowPosition(id, { x: d.x, y: d.y });
      }}

      onResizeStart={() => focusWindow(id)}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateWindowSize(id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
        updateWindowPosition(id, position);
      }}

      onMouseDown={() => focusWindow(id)}

      style={{ 
        zIndex: windowState.zIndex,
        display: 'flex',  // Rnd의 기본 inline-block을 flex로 오버라이드
      }}

      className={`
        flex-col bg-[#c0c0c0] 
        border-2 border-[#dfdfdf] border-r-black border-b-black
        shadow-[4px_4px_10px_rgba(0,0,0,0.3)]
      `}
      dragHandleClassName="window-header"
    >
      {/* 데스크탑 헤더 */}
      <div
        onDoubleClick={() => maximizeWindow(id)} // 더블클릭 시 최대화 토글
        className={`
          window-header h-8 px-2 shrink-0
          flex items-center justify-between 
          cursor-default select-none border-b-2 border-[#808080]
          ${isFocused
            ? 'bg-linear-to-r from-[#ff2e93] to-[#ff8fab]'
            : 'bg-gray-400'}
        `}
      >
        <div className="flex items-center gap-2">
          {iconSrc && <img src={iconSrc} alt="" className="w-4 h-4 object-contain filter drop-shadow-sm" />}
          <span className="text-white font-bold font-pixel text-sm tracking-wide drop-shadow-sm">
            {title}.exe
          </span>
        </div>

        {/* 윈도우 컨트롤 버튼 그룹 */}
        <div className="flex gap-1" onMouseDown={(e) => e.stopPropagation()}>
          <WindowControlBtn type="minimize" onClick={() => minimizeWindow(id)} />
          <WindowControlBtn
            type={windowState.isMaximized ? "restore" : "maximize"}
            onClick={() => maximizeWindow(id)}
          />
          <WindowControlBtn type="close" onClick={() => closeWindow(id)} />
        </div>
      </div>

      {/* 툴바/메뉴바 영역 (옵션 - 필요시 여기에 MenuBar 추가) */}
      {/* <div className="h-7 bg-gray-200 border-b border-white shadow-inset">...</div> */}

      {/* 컨텐츠 영역 (Body) - 흰색 배경으로 꽉 채우기 */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-white">
        {children}
      </div>

      {/* 상태바 (Status Bar) - 창의 맨 아래에 고정 */}
      <div className="
        h-6 px-2 shrink-0
        flex justify-between items-center
        bg-[#e0e0e0]
        border-t-2 border-gray-400
        shadow-inset
        text-[10px] font-pixel text-gray-600 select-none
      ">
        <span className="truncate">Connected to WISH World...</span>
        <div className="flex gap-2">
          <span>Mem: 128MB</span>
          <span className="text-green-600 font-bold">Online</span>
        </div>
      </div>
    </Rnd >
  );
}



// 윈도우 컨트롤 버튼 컴포넌트
function WindowControlBtn({
  type,
  onClick,
}: {
  type: 'minimize' | 'maximize' | 'restore' | 'close';
  onClick: () => void;
}) {
  // 버튼 타입별 라벨 및 스타일
  const isClose = type === 'close';

  let label = '';
  switch (type) {
    case 'minimize': label = '_'; break;
    case 'maximize': label = '□'; break;
    case 'restore': label = '❐'; break; // 복구 아이콘
    case 'close': label = '✕'; break;
  }

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      className={`
        w-5 h-5 md:w-6 md:h-6 
        flex items-center justify-center
        bg-white/20 shadow-outset
        border border-white
        shadow-outset active:shadow-inset active:translate-y-[1px]
        transition-colors
        font-pixel text-[10px] text-white leading-none
        ${isClose ? 'hover:bg-red-500/80' : 'hover:bg-white/80'}
      `}
      aria-label={type}
    >
      <span className={`
        font-bold text-black leading-none
        ${type === 'minimize' ? 'mb-2 text-[10px]' : 'text-[10px] md:text-xs'}
        ${type === 'restore' ? 'text-[8px] md:text-[10px]' : ''}
      `}>
        {label}
      </span>
    </button>
  );
}