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
  scale?: number; // 동적 크기 조정
  className?: string;
}

export default function DesktopIcon({
  label,
  iconSrc,
  isSelected = false,
  onClick,
  onDoubleClick,
  size = 'desktop', // 기본은 바탕화면용
  scale = 1,
  className = '',
}: DesktopIconProps) {

  // Taskbar나 Window Title용 작은 아이콘 (16x16)
  if (size === 'app') {
    return (
      <div 
        className={`relative flex items-center justify-center ${className}`}
        style={{
          width: `${16 * scale}px`,
          height: `${16 * scale}px`,
        }}
      >
        <Image 
          src={iconSrc} 
          alt={label} 
          fill 
          className="object-contain" 
        />
      </div>
    );
  }

  const iconSize = (scale >= 1 ? 48 : 40) * scale;
  const containerWidth = (scale >= 1 ? 72 : 60) * scale;
  const containerHeight = (scale >= 1 ? 90 : 80) * scale; // 고정 높이 추가
  const fontSize = (scale >= 1 ? 14 : 12) * scale;

  // 바탕화면용 큰 아이콘 (48x48 + 텍스트)
  return (
    <div
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`group flex flex-col items-center justify-start cursor-pointer select-none ${className}`}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        gap: `${4 * scale}px`,
      }}
    >
      {/* 아이콘 이미지 영역 */}
      <div 
        className={`relative ${isSelected ? 'brightness-75' : 'brightness-100'}`}
        style={{
          width: `${iconSize}px`,
          height: `${iconSize}px`,
        }}
      >
        <Image
          src={iconSrc}
          alt={label}
          fill
          className="object-contain drop-shadow-md"
          draggable={false} // 이미지 드래그 방지
        />
      </div>

      {/* 텍스트 라벨 영역 */}
      <div 
        className={`text-center font-pixel leading-tight tracking-tight break-words line-clamp-2 max-w-full ${
          isSelected
            ? 'bg-[#000080] text-white outline outline-1 outline-dashed outline-white'
            : 'text-white [text-shadow:_1px_1px_1px_rgba(0,0,0,0.8)]'
        }`}
        style={{
          paddingLeft: `${4 * scale}px`,
          paddingRight: `${4 * scale}px`,
          paddingTop: `${1 * scale}px`,
          paddingBottom: `${1 * scale}px`,
          fontSize: `${fontSize}px`,
        }}
      >
        {label}
      </div>
    </div>
  );
}