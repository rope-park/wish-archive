/**
 * WindowFrame 컴포넌트
 * 
 * - 윈도우 스타일의 프레임 제공
 * - 드래그 가능한 헤더
 * - 반응형 크기 조절
 */

'use client';

import { ReactNode, useEffect, useState } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { motion, AnimatePresence } from 'framer-motion';

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
  // Store에서 윈도우 상태 및 액션 가져오기
  const { windows, activeWindowId, closeWindow, focusWindow, minimizeWindow, maximizeWindow, updateWindowPosition, updateWindowSize } = useWindowStore();

  const windowState = windows.find(w => w.id === id);
  const isFocused = activeWindowId === id;

  // 반응형 상태
  const [isMobileView, setIsMobileView] = useState(false);
  const [isTouchCapable, setIsTouchCapable] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 1. 마운트 및 터치 디바이스 감지
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const checkDevice = () => {
      const width = window.innerWidth;
      const hasTouchScreen = 'ontouchstart' in window || 
                             navigator.maxTouchPoints > 0;
      
      // 작은 화면 또는 터치 지원 기기
      setIsMobileView(width < 768);
      setIsTouchCapable(hasTouchScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
    };
  }, []);

  if (!isMounted || !windowState) return null;

  const displayStyle = windowState.isMinimized ? 'none' : 'flex';

  // 2. [Mobile View] 최대화 상태로 고정
  if (isMobileView) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}

        className="fixed top-0 left-0 right-0 flex flex-col bg-[#c0c0c0] border-0 shadow-2xl pt-safe"
        style={{
          height: 'calc(100dvh - 48px)',
          zIndex: windowState.zIndex,
          display: displayStyle,
          touchAction: 'pan-y',
        }}
        onClick={() => focusWindow(id)}
        onTouchStart={() => focusWindow(id)}
      >
        {/* 헤더 */}
        <div className="
          h-12 min-h-[48px] shrink-0
          bg-linear-to-r from-[#ff2e93] to-[#ff8fab]
          flex items-center justify-between px-3
          border-b-2 border-white border-t-2 border-t-white/50
          shadow-md
        ">
          <div className="flex items-center gap-2 overflow-hidden">
            {iconSrc && (
              <img src={iconSrc} alt="" className="w-6 h-6 object-contain filter drop-shadow-sm" />
            )}
            <span className="text-white font-bold font-pixel text-base truncate drop-shadow-md">
              {title}.exe
            </span>
          </div>

          <div className="flex gap-2 pointer-events-auto">
            <WindowControlBtn 
              type="minimize" 
              onClick={() => minimizeWindow(id)} 
            />
            <WindowControlBtn 
              type="close" 
              onClick={() => closeWindow(id)} 
            />
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white custom-scrollbar relative"
             style={{ WebkitOverflowScrolling: 'touch' }}>
          {children}
        </div>

        {/* 상태바 */}
        <div className="
          h-6 px-3 shrink-0
          flex justify-between items-center
          bg-[#e0e0e0]
          border-t-2 border-gray-400
          shadow-inset
          text-[10px] font-pixel text-gray-600 select-none
        ">
          <span className="truncate max-w-[150px]">Running on WISH OS Mobile</span>
          <div className="flex gap-2">
            <span>Mem: 221MB</span>
            <span className="text-green-600 font-bold">● Online</span>
          </div>
        </div>
      </motion.div>
    );
  }

  // 3. [Desktop/Tablet view] 드래그 윈도우
  return (
    <Rnd
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
        if (!windowState.isMaximized)
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
      onTouchStart={() => focusWindow(id)}

      style={{
        zIndex: windowState.zIndex,
        display: displayStyle,
        touchAction: 'none',
      }}

      className={`
        flex-col bg-[#c0c0c0] 
        border-2 border-[#dfdfdf] border-r-black border-b-black
        shadow-[4px_4px_10px_rgba(0,0,0,0.3)]
        ${className}
        ${windowState.isMaximized 
          ? '!fixed !top-0 !left-0 !right-0 !bottom-12 !w-auto !h-auto !transform-none' 
          : ''
        }
      `}
      dragHandleClassName="window-header"
    >
      {/* 헤더 */}
      <div
        onDoubleClick={() => maximizeWindow(id)}
        className={`
          window-header h-10 min-h-[44px] px-2 shrink-0
          flex items-center justify-between 
          cursor-default select-none border-b-2 border-[#808080]
          transition-colors duration-150 touch-none
          ${isFocused
            ? 'bg-linear-to-r from-[#ff2e93] to-[#ff8fab]'
            : 'bg-gray-400'}
        `}
      >
        <div className="flex items-center gap-2">
          {iconSrc && (
            <img src={iconSrc} alt="" className="w-4 h-4 object-contain filter drop-shadow-sm" />
          )}
          <span className="text-white font-bold font-pixel text-sm tracking-wide drop-shadow-sm">
            {title}.exe
          </span>
        </div>

        {/* 윈도우 컨트롤 버튼 그룹 */}
        <div 
          className="flex gap-1 pointer-events-auto" 
          onMouseDown={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          <WindowControlBtn 
            type="minimize" 
            onClick={() => minimizeWindow(id)} 
          />
          <WindowControlBtn
            type={windowState.isMaximized ? "restore" : "maximize"}
            onClick={() => maximizeWindow(id)}
          />
          <WindowControlBtn 
            type="close" 
            onClick={() => closeWindow(id)} 
          />
        </div>
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex-1 overflow-auto custom-scrollbar bg-white relative"
           style={{ WebkitOverflowScrolling: 'touch' }}>
        {children}
      </div>
 
      {/* 상태바 */}
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
          <span>Mem: 221MB</span>
          <span className="text-green-600 font-bold">● Online</span>
        </div>
      </div>
    </Rnd>
  );
}

// 윈도우 컨트롤 버튼 컴포넌트
interface WindowControlBtnProps {
  type: 'minimize' | 'maximize' | 'restore' | 'close';
  onClick: () => void;
}

function WindowControlBtn({ type, onClick }: WindowControlBtnProps) {
  // 버튼 타입별 라벨 및 스타일
  const isClose = type === 'close';

  let label = '';
  switch (type) {
    case 'minimize': label = '_'; break;
    case 'maximize': label = '□'; break;
    case 'restore': label = '❐'; break;
    case 'close': label = '✕'; break;
  }

  // 터치 디바이스 감지
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  useEffect(() => {
    const checkTouch = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(window.innerWidth < 768 || hasTouchScreen);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const sizeClasses = isTouchDevice
    ? "w-9 h-9 text-sm"
    : "w-6 h-6 md:w-7 md:h-7 text-[10px] md:text-xs";

  const minTouchSize = isTouchDevice ? 36 : 28;

  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      onTouchEnd={(e) => { e.stopPropagation(); e.preventDefault(); onClick(); }}
      className={`
        ${sizeClasses}
        flex items-center justify-center
        bg-[#c0c0c0] shadow-outset
        border border-white
        active:shadow-inset active:translate-y-[1px] active:scale-95
        transition-all
        font-pixel text-black leading-none font-bold
        ${isClose ? 'hover:bg-red-500/80 hover:text-white' : 'hover:bg-white/80'}
        pointer-events-auto
      `}
      aria-label={type}
      style={{
        minWidth: `${minTouchSize}px`,
        minHeight: `${minTouchSize}px`,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {label}
    </button>
  );
}