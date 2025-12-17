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

import { useEffect, ReactNode } from 'react';
import { Button } from '@/components/ui';

export interface ModalProps {
  isOpen: boolean;            // 열림 여부
  onClose: () => void;        // 닫기 함수
  title?: string;             // 창 제목
  message?: ReactNode;        // 내용 (텍스트 또는 컴포넌트)
  variant?: 'info' | 'success' | 'error' | 'question'; // 알림창 타입
  onConfirm?: () => void;     // 확인 버튼 클릭 시 실행 (question 타입용)
  confirmText?: string;       // 확인 버튼 텍스트
  cancelText?: string;        // 취소 버튼 텍스트
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
}: ModalProps) {

  // ESC 키로 닫기 & 스크롤 방지
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden'; // 뒷배경 스크롤 막기

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 타입별 스타일 설정 (아이콘, 헤더색상)
  const typeConfig = {
    success: {
      headerGradient: 'from-blue-600 to-blue-400', // 파란색 (윈도우 98 성공)
      icon: '✅', /* TODO: image 아이콘으로 교체 */
      defaultTitle: 'Success',
    },
    info: {
      headerGradient: 'from-brand-deep to-brand-secondary', // Navy -> Sky
      icon: 'ℹ️', /* TODO: image 아이콘으로 교체 */
      defaultTitle: 'Information',
    },
    error: {
      headerGradient: 'from-system-error to-red-600', // 빨간색
      icon: '❌', /* TODO: image 아이콘으로 교체 */
      defaultTitle: 'Error',
    },
    question: {
      headerGradient: 'from-brand-primary to-green-600', // 초록색
      icon: '❓', /* TODO: image 아이콘으로 교체 */
      defaultTitle: 'Question',
    },
  };

  const config = typeConfig[variant];
  const displayTitle = title || config.defaultTitle;

  return (
    // [1] 배경 오버레이 (Dimmed)
    <div className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-pop-in">
      
      {/* [2] 모달 윈도우 본체 */}
      <div 
        className="
          w-[90vw] max-w-[320px] md:max-w-[360px] flex flex-col
          bg-gray-200 rounded-none
          shadow-outset outline outline-1 outline-black
          mx-4
        "
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫힘 방지
      >
        
        {/* [3] 헤더 (Title Bar) */}
        <div className={`
          h-8 px-2 flex items-center justify-between shrink-0
          bg-linear-to-r ${config.headerGradient}
          text-white font-pixel text-sm select-none cursor-default
        `}>
          <span className="drop-shadow-md pt-[2px] tracking-wide truncate">
            {displayTitle}
          </span>
          
          {/* 닫기 버튼 (X) */}
          <button 
            onClick={onClose}
            className="
              w-5 h-5 flex items-center justify-center
              bg-gray-200 text-black border border-white/50
              shadow-outset active:shadow-inset active:translate-y-[1px]
            "
          >
            <span className="font-pixel text-[10px] mb-1">X</span>
          </button>
        </div>

        {/* [4] 컨텐츠 영역 */}
        <div className="p-5 flex flex-col gap-6">
          
          {/* 아이콘 + 메시지 */}
          <div className="flex items-start gap-4">
            <div className="text-4xl filter drop-shadow-md select-none shrink-0">
              {config.icon}
            </div>
            <div className="pt-1 text-sm font-body text-gray-900 leading-relaxed break-keep">
              {message}
            </div>
          </div>

          {/* 버튼 그룹 (중앙 정렬) */}
          <div className="flex justify-center gap-3 mt-2">
            {/* 확인 버튼 (Question 타입일 땐 '예' 역할) */}
            <Button 
              size="sm" 
              onClick={() => {
                if (onConfirm) onConfirm();
                else onClose();
              }}
              className="min-w-[80px]"
              autoFocus
            >
              {confirmText}
            </Button>

            {/* 취소 버튼 (Question 타입일 때만 표시) */}
            {variant === 'question' && (
              <Button 
                size="sm" 
                variant="ghost"
                onClick={onClose}
                className="min-w-[80px] border border-black"
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