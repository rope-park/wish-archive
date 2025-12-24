/**
 * DesktopIcon 컴포넌트
 * 
 * - 데스크탑 아이콘을 렌더링하는 컴포넌트
 */

'use client';

import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { useWindowStore } from '@/app/stores/useWindowStore';

interface DesktopIconProps {
  label: string;        // 아이콘 이름 
  iconSrc: string;      // 이미지 경로
  isSelected?: boolean; // 선택된 상태 여부
  onClick?: MouseEventHandler<HTMLDivElement>; // 클릭 이벤트
  onDoubleClick?: MouseEventHandler<HTMLDivElement>; // 더블클릭 (실행)
  size?: 'desktop' | 'app'; // 크기 변형
  className?: string;
}

export default function DesktopIcon({
  label,
  iconSrc,
  isSelected = false,
  onClick,
  onDoubleClick,
  size = 'desktop', // 기본은 바탕화면용
  className = '',
}: DesktopIconProps) {

  // Taskbar나 Window Title용 작은 아이콘 (16x16)
  if (size === 'app') {
    return (
      <div className={`relative w-4 h-4 flex items-center justify-center ${className}`}>
        <Image 
          src={iconSrc} 
          alt={label} 
          fill 
          className="object-contain" 
        />
      </div>
    );
  }

  // 바탕화면용 큰 아이콘 (48x48 + 텍스트)
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`
        group flex flex-col items-center justify-start gap-1
        w-[60px] sm:w-[72px] cursor-pointer select-none
        ${className}
      `}
    >
      {/* 아이콘 이미지 영역 */}
      <div className={`
        relative w-10 h-10 sm:w-12 sm:h-12
        ${isSelected ? 'brightness-75' : 'brightness-100'}
      `}>
        <Image
          src={iconSrc}
          alt={label}
          fill
          className="object-contain drop-shadow-md"
          draggable={false} // 이미지 드래그 방지
        />
      </div>

      {/* 텍스트 라벨 영역 */}
      <div className={`
        px-1 py-[1px]
        text-center font-pixel text-xs sm:text-sm leading-tight tracking-tight
        break-words line-clamp-2 max-w-full
        
        /* --- 상태별 스타일 --- */
        ${isSelected
          ? 'bg-[#000080] text-white outline outline-1 outline-dashed outline-white' // 선택됨 (네이비 배경 + 점선)
          : 'text-white [text-shadow:_1px_1px_1px_rgba(0,0,0,0.8)]' // 평소 (흰 글씨 + 그림자)
        }
      `}>
        {label}
      </div>
    </div>
  );
}