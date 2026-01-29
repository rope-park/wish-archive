/**
 * DesktopIcon 컴포넌트
 * 
 * - 데스크탑 아이콘을 렌더링하는 컴포넌트
 */

'use client';

import Image from 'next/image';
import { MouseEventHandler, TouchEventHandler, useRef, useState, useEffect } from 'react';

interface DesktopIconProps {
  label: string;        // 아이콘 이름 
  iconSrc: string;      // 이미지 경로
  isSelected?: boolean; // 선택된 상태 여부
  onClick?: MouseEventHandler<HTMLDivElement> | TouchEventHandler<HTMLDivElement>; // 클릭 이벤트
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
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const lastTapRef = useRef<number>(0);

  // 터치 디바이스 감지
  useEffect(() => {
    const checkTouchDevice = () => {
      const hasTouchScreen = 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0;
      setIsTouchDevice(hasTouchScreen);
    };

    checkTouchDevice();
  }, []);

  // 터치 시 더블탭 감지 핸들러
  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (e) => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // 더블탭 감지
      if (onDoubleClick && !isTouchDevice) {
        e.preventDefault();
        onDoubleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
      }
    } else {
      // 싱글 탭
      if (onClick) {
        (onClick as TouchEventHandler<HTMLDivElement>)(e);
      }
    }

    lastTapRef.current = now;
  };

  // 키보드 이벤트 핸들러
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onDoubleClick && onDoubleClick(e as unknown as React.MouseEvent<HTMLDivElement>);
    }
  };

  // 앱 사이즈 (작은 아이콘)
  if (size === 'app') {
    return (
      <div
        role="button"
        tabIndex={0}
        aria-label={`${label} 앱 열기`}
        aria-pressed={isSelected}
        onClick={onClick as MouseEventHandler<HTMLDivElement>}
        onDoubleClick={onDoubleClick}
        onKeyDown={handleKeyDown}
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
  const containerWidth = (scale >= 1 ? 80 : 68) * scale;
  const containerHeight = (scale >= 1 ? 100 : 88) * scale;
  const fontSize = (scale >= 1 ? 13 : 11) * scale;
  const minTouchSize = Math.max(44, containerWidth); // iOS 권장 최소 터치 영역

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${label} 아이콘`}
      aria-pressed={isSelected}
      onClick={onClick as MouseEventHandler<HTMLDivElement>}
      onDoubleClick={onDoubleClick}
      onKeyDown={handleKeyDown}
      onTouchEnd={handleTouchEnd}
      className={`group flex flex-col items-center justify-start cursor-pointer select-none ${className}`}
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        gap: `${4 * scale}px`,
        minWidth: isTouchDevice ? `${minTouchSize}px` : undefined,
        minHeight: isTouchDevice ? `${minTouchSize}px` : undefined,
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* 아이콘 이미지 영역 */}
      <div
        className={`relative ${isSelected ? 'brightness-75' : 'brightness-100'} transition-all active:scale-95`}
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
          draggable={false}
        />
      </div>

      {/* 텍스트 라벨 영역 */}
      <div
        className={`text-center font-pixel leading-tight tracking-tight break-words line-clamp-2 max-w-full transition-all ${isSelected
            ? 'bg-[#000080] text-white outline outline-1 outline-dashed outline-white'
            : 'text-white [text-shadow:_1px_1px_1px_rgba(0,0,0,0.8)]'
          }`}
        style={{
          paddingLeft: `${4 * scale}px`,
          paddingRight: `${4 * scale}px`,
          paddingTop: `${2 * scale}px`,
          paddingBottom: `${2 * scale}px`,
          fontSize: `${fontSize}px`,
        }}
      >
        {label}
      </div>
    </div>
  );
}