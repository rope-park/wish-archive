/**
 * Notifiaction 컴포넌트
 * 
 * - 다양한 알림창 (성공, 오류, 경고, 정보)
 * - 자동 닫힘 지원 (지정 시간 후 사라짐)
 * - 닫기 버튼 지원
 */
'use client';

import { useEffect, useState, useCallback, useRef } from 'react';

export interface NotificationProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number; // 0이면 자동 닫힘 안 함
  onClose?: () => void;
  closable?: boolean;
  className?: string;
}

export default function Notification({
  type = 'info',
  title,
  message,
  duration = 5000, // 기본 5초 후 자동 닫힘
  onClose,
  closable = true,
  className = '',
}: NotificationProps) {
  const [isClosing, setIsClosing] = useState(false); // 퇴장 애니메이션 제어용
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 닫기 핸들러 (애니메이션 -> 부모에게 알림)
  const handleClose = useCallback(() => {
    setIsClosing(true); // 퇴장 애니메이션 시작
    setTimeout(() => {
      onClose?.();
    }, 300); // 애니메이션 시간(0.3s) 뒤에 완전히 닫음
  }, [onClose]);

  // 타이머 시작 함수
  const startTimer = useCallback(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(handleClose, duration);
    }
  }, [duration, handleClose]);

  // 타이머 정지 함수
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 마운트 시 타이머 시작 & 언마운트 시 정리
  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer, clearTimer]);

  //타입별 스타일 매핑
  const typeConfig = {
    success: {
      header: 'bg-gradient-to-r from-blue-700 to-blue-500', // 파란색 (System Success)
      icon: '💾', /** TODO: icon 이미지로 변경 */
      text: 'text-white',
      role: 'status',
    },
    error: {
      header: 'bg-gradient-to-r from-red-700 to-red-500',   // 빨간색 (Critical Error)
      icon: '🚫', /** TODO: icon 이미지로 변경 */
      text: 'text-white',
      role: 'alert',
    },
    warning: {
      header: 'bg-gradient-to-r from-yellow-400 to-yellow-300', // 노란색 (Warning)
      icon: '⚠️', /** TODO: icon 이미지로 변경 */
      text: 'text-black', // 노란 배경엔 검은 글씨가 가독성 좋음
      role: 'alert',
    },
    info: {
      header: 'bg-gradient-to-r from-brand-deep to-brand-secondary', // Navy -> Sky (기본)
      icon: 'ℹ️', /** TODO: icon 이미지로 변경 */
      text: 'text-white',
      role: 'status',
    },
  };

  const config = typeConfig[type];

  return (
    <div
      role={config.role}
      aria-live={type === 'error' || type === 'warning' ? 'assertive' : 'polite'}
      onMouseEnter={clearTimer} // 🐭 마우스 올리면 타이머 정지 (읽는 중)
      onMouseLeave={startTimer} // 🐭 마우스 떼면 타이머 다시 시작
      className={`
        /* --- 레이아웃 & 위치 --- */
        pointer-events-auto 
        w-80 flex flex-col
        
        bg-gray-200 
        shadow-outset       /* 3D 튀어나옴 */
        outline outline-1 outline-black
        
        /* --- 애니메이션 (슬라이드 & 투명도) --- */
        transition-all duration-300 ease-in-out transform
        ${isClosing ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'}
        
        ${className}
      `}
    >
      {/* [헤더] 타이틀 바 */}
      <div className={`
        h-6 px-1.5 flex items-center justify-between shrink-0
        ${config.header}
        ${config.text}
        border-b border-white/30
        select-none cursor-default
      `}>
        {/* 아이콘 + 제목 */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs filter drop-shadow-md">{config.icon}</span>
          <span className="font-pixel text-[10px] font-bold pt-[1px] tracking-wide truncate max-w-[200px]">
            {title}
          </span>
        </div>

        {/* 닫기 버튼 */}
        {closable && (
          <button
            onClick={handleClose}
            className="
              w-3.5 h-3.5 flex items-center justify-center
              bg-gray-200 text-black 
              border border-white/50
              shadow-outset active:shadow-inset active:translate-y-[1px]
              hover:bg-red-500 hover:text-white group
              transition-colors
            "
            aria-label="Close notification"
          >
            <span className="font-pixel text-[8px] leading-none -mt-[1px] group-hover:text-white">×</span>
          </button>
        )}
      </div>

      {/* [바디] 메시지 영역 */}
      <div className="p-3 flex items-start gap-3 bg-gray-200">
        {message && (
          <p className="font-pixel text-xs text-gray-900 leading-relaxed break-keep">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}