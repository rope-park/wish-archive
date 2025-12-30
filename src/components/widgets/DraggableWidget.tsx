/**
 * DraggableWidget 컴포넌트
 * 
 * - 특정 영역을 잡고 끌 수 있는 드래그 가능 위젯
 * - react-draggable 라이브러리 사용
 * - 부모 영역 내에서만 이동 가능
 * - 클릭 시 최상위로 올라오도록 지원
 */

'use client';

import React, { ReactNode, useRef, useState, useEffect } from 'react';
import Draggable, { DraggableBounds } from 'react-draggable';
import { LAYOUT_CONSTANTS } from '@/lib/costants';
import { Taskbar } from '../os';

interface DraggableWidgetProps {
  children: ReactNode;
  defaultPosition?: { x: number; y: number }; // 초기 위치
  defaultRotation?: number;                   // 초기 회전 각도 (degrees)
  scale?: number;                             // 크기 비율 (0.5 ~ 1.5 등)
  zIndex?: number;                            // 현재 층위
  onFocus?: () => void;                       // 클릭 시 맨 앞으로 가져오는 함수
  className?: string;
  dragHandle?: string;                        // 특정 부분만 잡고 끌게 할 때 (CSS 클래스명)
  enableRotation?: boolean;                   // 회전 기능 활성화 여부
}

export default function DraggableWidget({
  children,
  defaultPosition = { x: 0, y: 0 },
  defaultRotation = 0,
  scale = 1,
  zIndex = 1,
  onFocus,
  className = '',
  dragHandle,
  enableRotation = true,
}: DraggableWidgetProps) {
  const nodeRef = useRef<HTMLElement>(null);

  // 상태 관리
  const [isMounted, setIsMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(defaultPosition);

  const [rotation, setRotation] = useState(defaultRotation);
  const [isRotating, setIsRotating] = useState(false);
  const rotationStartRef = useRef({ angle: 0, mouseAngle: 0 });

  // 태스크바 높이를 고려한 bounds 계산
  const [dragBounds, setDragBounds] = useState<DraggableBounds | 'parent'>('parent');

  // 1. 마운트 및 모바일 감지
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const checkDevice = () => {
      const width = window.innerWidth;
      const hasTouchScreen = 'ontouchstart' in window ||
                              navigator.maxTouchPoints > 0 ||
                              ((navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints ?? 0) > 0;

      // 작은 화면 또는 터치 기능 있으면 터치 디바이스로 간주
      setIsTouchDevice(width < 1024 || hasTouchScreen);
    };

    const updateBounds = () => {
      // 태스크바 높이 48px을 제외한 영역으로 제한
      const taskbarHeight = LAYOUT_CONSTANTS.TASKBAR_HEIGHT; // 48px
      const iconAreaWidth = window.innerWidth < 768 ? 0 : LAYOUT_CONSTANTS.ICON_AREA_WIDTH_DESKTOP;
      const viewportHeight = window.innerHeight;
      const padding = LAYOUT_CONSTANTS.PADDING;
      
      // 모바일에서는 안전영역(safe area) 고려
      const safeAreaBottom = typeof window !== 'undefined' && window.innerHeight 
        ? window.innerHeight - document.documentElement.clientHeight 
        : 0;
      
      setDragBounds({
        left: iconAreaWidth + padding,
        top: padding,
        right: window.innerWidth - padding,
        bottom: viewportHeight - taskbarHeight - padding - safeAreaBottom,
      });
    };

    checkDevice();
    updateBounds();
    
    window.addEventListener('resize', checkDevice);
    window.addEventListener('orientationchange', checkDevice);
    window.addEventListener('resize', updateBounds);
    window.addEventListener('orientationchange', updateBounds);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('orientationchange', checkDevice);
      window.removeEventListener('resize', updateBounds);
      window.removeEventListener('orientationchange', updateBounds);
    };
  }, []);

  // 2. 부모로부터 위치 변경 시 동기화 (반응형 대응)
  const { x, y } = defaultPosition;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosition({ x, y });
  }, [x, y]);

  // 3. 회전 기능: 회전 핸들 드래그
  useEffect(() => {
    if (!isMounted || !enableRotation || isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isRotating || !nodeRef.current) return;

      const rect = nodeRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // 마우스와 중심점 사이의 각도 계산
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
      const deltaAngle = angle - rotationStartRef.current.mouseAngle;
      
      const newRotation = rotationStartRef.current.angle + deltaAngle;
      setRotation(newRotation);
    };

    const handleMouseUp = () => {
      setIsRotating(false);
    };

    if (isRotating) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isRotating, isMounted, enableRotation, isTouchDevice]);

  // 회전 시작 핸들러
  const handleRotateStart = (e: React.MouseEvent) => {
    if (isTouchDevice) return; // 터치 디바이스에서는 회전 비활성화

    e.preventDefault();
    e.stopPropagation();
    
    if (!nodeRef.current) return;
    
    const rect = nodeRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    
    rotationStartRef.current = { angle: rotation, mouseAngle };
    setIsRotating(true);
    onFocus?.();
  };

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    onFocus?.();
  };

  if (!isMounted) {
    return (
      <div
        className={`absolute ${className}`}
        style={{
          left: defaultPosition.x,
          top: defaultPosition.y,
          transform: `scale(${scale}) rotate(${defaultRotation}deg)`,
        }}
      >
        {children}
      </div>
    );
  }

  const currentZIndex = isDragging || isRotating ? 90 : zIndex;

  return (
    <Draggable
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      nodeRef={nodeRef as any}
      position={position}
      scale={scale}
      handle={dragHandle} // 특정 핸들만 잡고 끌 수 있게 설정
      bounds={dragBounds}     // 태스크바를 제외한 영역으로 제한
      cancel='.no-drag, .rotate-handle'   // 이 클래스명이 붙은 요소는 드래그 방지
      disabled={isRotating} // 회전 중일 때만 드래그 비활성화

      enableUserSelectHack={false} // 사용자 선택 방지 해제 (텍스트 선택 가능)
      
      onStart={() => {
        setIsDragging(true);
        onFocus?.(); // 드래그 시작하면 맨 앞으로
      }}
      onDrag={(e, data) => {
        setPosition({ x: data.x, y: data.y });
      }}
      onStop={() => {
        setIsDragging(false);
      }}
    >
      <div
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={nodeRef as any}
        className={`
          absolute flex
          origin-center
          group
          pointer-events-auto
          overflow-visible
          
          ${dragHandle ? '' : (isDragging ? 'cursor-grabbing' : isRotating ? 'cursor-crosshair' : 'cursor-grab')}
          ${isTouchDevice ? 'cursor-default' : ''}

          ${className}
        `}
        style={{
          zIndex: currentZIndex,
          touchAction: isTouchDevice ? 'pan-x pan-y' : 'none',
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
        }}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
      >
        {/* 회전 핸들 - 우측 상단 (호버 시에만 표시) - 회전되지 않도록 밖에 배치 */}
        {!isTouchDevice && enableRotation && (
          <div
            className="rotate-handle absolute -top-3 -right-3 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full cursor-grab active:cursor-grabbing shadow-lg flex items-center justify-center text-white text-sm font-bold z-50 opacity-0 group-hover:opacity-100 transition-opacity"
            onMouseDown={handleRotateStart}
            title="Drag to rotate"
            style={{
              minWidth: '44px',
              minHeight: '44px',
            }}
          >
            ↻
          </div>
        )}
        
        {/* 실제 콘텐츠 */}
        <div 
          style={{ 
            transform: `rotate(${rotation}deg)`,
            transition: isRotating ? 'none' : 'transform 0.1s ease-out',
            width: '100%',
            height: '100%',
            display: 'flex',
            overflow: 'visible',
            pointerEvents: 'auto',
            touchAction: isTouchDevice ? 'auto' : 'none',
          }}
        >
          {children}
        </div>
      </div>
    </Draggable>
  );
}