'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import Button from './Button';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message?: ReactNode;
  variant?: 'info' | 'success' | 'error' | 'question' | 'default';
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  className?: string;
  children?: ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  message,
  variant = 'info',
  onConfirm,
  confirmText = '확인',
  cancelText = '취소',
  className = '',
  children,
}: ModalProps) {

  const modalRef = useRef<HTMLDivElement>(null);

  // 1. [핵심 로직 이식] 터치 디바이스 및 화면 크기 감지
  // WindowFrame의 WindowControlBtn에 있는 로직과 동일하게 구현
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      // 768px 미만이거나 터치 스크린이 있으면 터치 디바이스(모바일)로 간주
      setIsTouchDevice(window.innerWidth < 768 || hasTouchScreen);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // ESC 키 닫기 및 스크롤 방지
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 스타일 설정
  const typeConfig: Record<string, { headerGradient: string; icon: string; defaultTitle: string }> = {
    success: { headerGradient: 'from-blue-600 to-blue-400', icon: 'system/icons/modal/success.svg', defaultTitle: 'Success' },
    info: { headerGradient: 'from-[#000080] to-[#1084d0]', icon: 'system/icons/modal/info.svg', defaultTitle: 'Information' },
    error: { headerGradient: 'from-[#800000] to-[#ff0000]', icon: 'system/icons/modal/error.svg', defaultTitle: 'Error' },
    question: { headerGradient: 'from-[#008000] to-[#00ff00]', icon: 'system/icons/modal/question.svg', defaultTitle: 'Question' },
    default: { headerGradient: 'from-[#000080] to-[#1084d0]', icon: '', defaultTitle: 'Notice' },
  };

  const config = typeConfig[variant] || typeConfig['info'];
  const displayTitle = title || config.defaultTitle;

  // 2. [동적 스타일 계산] WindowFrame과 동일한 크기 로직 적용
  
  // 헤더 높이: 터치(모바일)일 땐 48px(h-12), 아니면 32px(h-8)
  const headerHeightClass = isTouchDevice ? "h-12 min-h-[48px]" : "h-8";
  
  // 버튼 크기: 터치일 땐 36px(w-9), 아니면 24px(w-6) (WindowFrame과 유사하게 맞춤)
  const buttonSizeClass = isTouchDevice 
    ? "w-9 h-9 text-sm" 
    : "w-6 h-6 text-xs"; // 데스크톱에서는 조금 작게

  // 인라인 스타일로 강제할 최소 크기
  const minBtnSize = isTouchDevice ? 36 : 24;

  return (
    <div
      className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-pop-in px-4"
      role="dialog"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className={`
          flex flex-col
          w-full max-w-[90vw] sm:max-w-[400px]
          max-h-[85dvh]
          bg-[#c0c0c0]
          shadow-[4px_4px_10px_rgba(0,0,0,0.5)]
          border-2 border-[#dfdfdf] border-r-black border-b-black
          ${className}
        `}
        onClick={(e) => e.stopPropagation()}
      >

        {/* [헤더] 동적 높이 클래스 적용 */}
        <div className={`
          ${headerHeightClass} w-full shrink-0
          flex items-center justify-between
          px-2
          bg-linear-to-r ${config.headerGradient}
          text-white select-none
          border-b-2 border-[#808080] /* WindowFrame 스타일 테두리 추가 */
        `}>
          
          {/* 제목 영역 */}
          <div className="flex items-center gap-2 overflow-hidden mr-2">
            <span className="shrink-0 filter drop-shadow-md">{config.icon}</span>
            <span
              id="modal-title"
              className="font-pixel font-bold pt-[2px] shadow-black drop-shadow-md truncate"
            >
              {displayTitle}
            </span>
          </div>

          {/* [닫기 버튼] WindowControlBtn 스타일 및 로직 적용 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            // 모바일 터치 반응성 향상 (WindowFrame 로직)
            onTouchEnd={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onClose();
            }}
            className={`
              ${buttonSizeClass}
              flex items-center justify-center
              bg-[#c0c0c0] text-black font-bold leading-none
              border border-white border-r-black border-b-black shadow-outset
              active:shadow-inset active:translate-y-px active:scale-95
              hover:bg-red-500 hover:text-white
              transition-all
              shrink-0
              cursor-pointer
            `}
            style={{
              minWidth: `${minBtnSize}px`,
              minHeight: `${minBtnSize}px`,
              touchAction: 'manipulation', // 터치 딜레이 제거
            }}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* [컨텐츠] */}
        <div className="p-4 md:p-6 flex-1 gap-4 md:gap-6 bg-[#c0c0c0] text-black overflow-y-auto custom-scrollbar border border-t-white border-l-white border-r-gray-400 border-b-gray-400 m-1">
          {children ? (
            children
          ) : (
            <>
              <div className="flex items-start gap-3 md:gap-4">
                <span className="shrink-0 text-3xl md:text-4xl filter drop-shadow-sm">{config.icon}</span>
                <p className="pt-1 text-sm md:text-base font-body leading-relaxed break-keep">
                  {message}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-3 mt-4">
                <Button
                  size="sm"
                  onClick={() => {
                    if (onConfirm) onConfirm();
                    else onClose();
                  }}
                  className="min-w-[80px] font-pixel touch-manipulation"
                  autoFocus
                >
                  {confirmText}
                </Button>

                {variant === 'question' && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={onClose}
                    className="min-w-[80px] font-pixel touch-manipulation"
                  >
                    {cancelText}
                  </Button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}