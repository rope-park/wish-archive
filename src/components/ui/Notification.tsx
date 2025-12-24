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
  const [progress, setProgress] = useState(100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const remainingTimeRef = useRef<number>(duration);

  // 닫기 핸들러 (애니메이션 -> 부모에게 알림)
  const handleClose = useCallback(() => {
    setIsClosing(true); // 퇴장 애니메이션 시작
    setTimeout(() => {
      onClose?.();
    }, 300); // 애니메이션 시간(0.3s) 뒤에 완전히 닫음
  }, [onClose]);

  // 타이머 시작 함수
  const startTimer = useCallback(() => {
    if (duration > 0 && remainingTimeRef.current > 0) {
      timerRef.current = setTimeout(handleClose, remainingTimeRef.current);
      startTimeRef.current = Date.now();

      timerRef.current = setTimeout(handleClose, remainingTimeRef.current);
    }
  }, [duration, handleClose]);

  // 타이머 정지 함수
  const pauseTimer = useCallback(() => {
    if (timerRef.current && startTimeRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current -= elapsed;
    }
  }, []);

  // 초기 실행 및 정리
  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTimer]);

  useEffect(() => {
    if (duration > 0) {
      // 100ms마다 프로그래스 업데이트 (간단한 시각적 효과용)
      const interval = setInterval(() => {
        if (!timerRef.current) return; // 일시 정지 상태면 업데이트 안 함
        
        setProgress((prev) => {
          const next = prev - (100 / (duration / 100));
          return next > 0 ? next : 0;
        });
      }, 100);
      
      return () => clearInterval(interval);
    }
  }, [duration]);
  
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
      header: 'bg-gradient-to-r from-brand-retro-navy to-brand-wish-blue', // Navy -> Sky (기본)
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
      onMouseEnter={pauseTimer} // 마우스 오버 시 타이머 일시 정지
      onMouseLeave={startTimer} // 마우스 아웃 시 타이머 재개
      className={`
        pointer-events-auto 
        w-72 md:w-80 flex flex-col
        bg-gray-200 
        shadow-[4px_4px_10px_rgba(0,0,0,0.3)]
        border border-white border-r-black border-b-black
        transition-all duration-300 ease-in-out transform
        ${isClosing ? 'translate-x-[120%] opacity-0' : 'translate-x-0 opacity-100'}
        ${className}
      `}
    >
      {/* 헤더 */}
      <div className={`
        h-6 px-1.5 flex items-center justify-between shrink-0
        ${config.header}
        ${type === 'warning' ? 'text-black' : 'text-white'}
        select-none cursor-default
      `}>
        {/* 아이콘 및 제목 */}
        <div className="flex items-center gap-1.5">
          {config.icon}
          <span className="font-pixel text-xs font-bold pt-[1px] tracking-wide truncate max-w-[180px]">
            {title}
          </span>
        </div>

        {/* 닫기 버튼 */}
        {closable && (
          <button
            onClick={handleClose}
            className="
              w-4 h-4 flex items-center justify-center
              bg-gray-200 text-black 
              border-t-white border-l-white border-r-gray-800 border-b-gray-800 border
              active:border-t-gray-800 active:border-l-gray-800 active:border-r-white active:border-b-white
              hover:bg-red-500 hover:text-white group
            "
            aria-label="Close"
          >
            <span className="font-pixel text-[10px] -mt-[2px]">✕</span>
          </button>
        )}
      </div>

      {/* 내용 */}
      <div className="p-3 bg-gray-200 relative overflow-hidden">
        {message && (
          <p className="font-pixel text-xs text-gray-900 leading-relaxed break-keep">
            {message}
          </p>
        )}
        
        {/* 프로그래스 바 (자동 닫힘일 때만) */}
        {duration > 0 && (
          <div className="absolute bottom-0 left-0 h-1 bg-gray-300 w-full">
            <div 
              className={`h-full ${config.header} transition-all duration-100 ease-linear`}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}