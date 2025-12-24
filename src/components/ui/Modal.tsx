/**
 * Modal 컴포넌트
 * 
 * - 다양한 알림창 (정보, 성공, 오류, 질문)
 * - ESC 키로 닫기 지원
 * - 뒷배경 스크롤 방지
 * - 확인/취소 버튼 지원 (사용자가 닫거나 버튼 눌러야 사라짐)
 * - 사용자 집중도 높음 (모달 이외 다른 부분 클릭 불가)
 */

'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { Button } from '../ui';

export interface ModalProps {
  isOpen: boolean;            // 열림 여부
  onClose: () => void;        // 닫기 함수
  title?: string;             // 창 제목
  message?: ReactNode;        // 내용 (텍스트 또는 컴포넌트)
  variant?: 'info' | 'success' | 'error' | 'question'; // 알림창 타입
  onConfirm?: () => void;     // 확인 버튼 클릭 시 실행 (question 타입용)
  confirmText?: string;       // 확인 버튼 텍스트
  cancelText?: string;        // 취소 버튼 텍스트
  className?: string;         // 추가 클래스명
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
}: ModalProps) {

  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // ESC 키로 닫기 & 스크롤 방지
  useEffect(() => {
    if (!isOpen) return;

    // 현재 포커스 저장
    previousFocusRef.current = document.activeElement as HTMLElement;

    // 모달 내부로 포커스 이동
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusableElements && focusableElements.length > 0) {
      (focusableElements[0] as HTMLElement).focus();
    } else {
      modalRef.current?.focus();
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();

      // Focus Trap
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0] as HTMLElement;
        const last = focusable[focusable.length - 1] as HTMLElement;

        if (e.shiftKey) { // Shift + Tab
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else { // Tab
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // 스크롤 방지

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      previousFocusRef.current?.focus(); // 이전 포커스 복원
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 타입별 스타일 설정 (아이콘, 헤더색상)
  const typeConfig = {
    success: {
      headerGradient: 'from-blue-600 to-blue-400', // 파란색
      icon: '✅', /* TODO: image 아이콘으로 교체 */
      defaultTitle: 'Success',
    },
    info: {
      headerGradient: 'from-brand-retro-navy to-brand-wish-blue', // Navy -> Sky
      icon: 'ℹ️', /* TODO: image 아이콘으로 교체 */
      defaultTitle: 'Information',
    },
    error: {
      headerGradient: 'from-system-error to-red-600', // 빨간색
      icon: '❌', /* TODO: image 아이콘으로 교체 */
      defaultTitle: 'Error',
    },
    question: {
      headerGradient: 'from-green-600 to-green-400', // 초록색
      icon: '❓', /* TODO: image 아이콘으로 교체 */
      defaultTitle: 'Question',
    },
  };

  const config = typeConfig[variant];
  const displayTitle = title || config.defaultTitle;

  return (
    // [1] 배경 오버레이 (Dimmed)
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-[2px] animate-pop-in"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      
      {/* [2] 모달 윈도우 본체 */}
      <div 
        ref={modalRef}
        tabIndex={-1}
        className={`
          w-[90vw] max-w-[340px] md:max-w-[400px] flex flex-col
          bg-gray-200 
          shadow-[4px_4px_10px_rgba(0,0,0,0.5)]
          border-2 border-white border-r-black border-b-black
          outline outline-1 outline-black
          ${className}
        `}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        
        {/* [3] 헤더 (Title Bar) */}
        <div className={`
          h-8 px-2 flex items-center justify-between shrink-0
          bg-gradient-to-r ${config.headerGradient}
          text-white select-none cursor-default
        `}>
          <span 
            id="modal-title"
            className="font-pixel text-sm font-bold pt-[2px] tracking-wide truncate drop-shadow-md"
          >
            {displayTitle}
          </span>
          
          {/* 닫기 버튼 (X) */}
          <button 
            onClick={onClose}
            className="
              w-5 h-5 flex items-center justify-center
              bg-gray-200 text-black 
              border-t-white border-l-white border-r-black border-b-black border
              active:border-t-black active:border-l-black active:border-r-white active:border-b-white
              hover:bg-red-500 hover:text-white group
            "
            aria-label="Close modal"
          >
            <span className="font-pixel text-[10px] -mt-[2px] group-hover:text-white">✕</span>
          </button>
        </div>

        {/* [4] 컨텐츠 영역 */}
        <div className="p-5 flex flex-col gap-6 bg-gray-200">
          
          {/* 아이콘 + 메시지 */}
          <div className="flex items-start gap-4">
            <div className="shrink-0 filter drop-shadow-sm select-none pt-1">
              {config.icon}
            </div>
            <div className="pt-1 text-sm font-body text-gray-900 leading-relaxed break-keep">
              {message}
            </div>
          </div>

          {/* 버튼 그룹 (중앙 정렬) */}
          <div className="flex justify-center gap-3 mt-2">
            {/* 확인 버튼 */}
            <Button 
              size="sm" 
              onClick={() => {
                if (onConfirm) onConfirm();
                else onClose();
              }}
              className="min-w-[80px] font-pixel"
              autoFocus // 모달 열리면 기본 포커스
            >
              {confirmText}
            </Button>

            {/* 취소 버튼 (Question 타입일 때만 표시) */}
            {variant === 'question' && (
              <Button 
                size="sm" 
                variant="ghost"
                onClick={onClose}
                className="min-w-[80px] border border-black font-pixel"
              >
                {cancelText}
              </Button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}