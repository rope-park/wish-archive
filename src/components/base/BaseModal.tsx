/**
 * 기본 모달 컴포넌트
 */

'use client';
import { useEffect, type ReactNode } from 'react';

/**
 * 기본 모달 속성 타입
 */
export interface BaseModalProps {
    isOpen: boolean; // 모달 열림 여부
    onClose: () => void; // 모달 닫기 함수
    children: ReactNode; // 모달 내용
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'; // 모달 크기
    closeOnBackdropClick?: boolean; // 배경 클릭 시 닫기 여부
    closeOnEsc?: boolean; // ESC 키로 닫기 여부
}

/**
 * 기본 모달 컴포넌트
 * @param param0 - 모달 속성
 * @returns 모달 JSX 요소
 */
export default function BaseModal({
  isOpen,
  onClose,
  children,
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEsc = true,
}: BaseModalProps) {
  
    // ESC 키 핸들러
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose, closeOnEsc])
  
  // body 스크롤 방지
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizeMap = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full m-4',
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <div
        className={`relative w-full ${sizeMap[size]} rounded-xl bg-white p-6`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않게
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}