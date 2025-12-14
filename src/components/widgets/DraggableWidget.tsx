/**
 * DraggableWidget 컴포넌트
 * 
 * - 특정 영역을 잡고 끌 수 있는 드래그 가능 위젯
 * - react-draggable 라이브러리 사용
 * - 부모 영역 내에서만 이동 가능
 * - 클릭 시 최상위로 올라오도록 지원
 */

'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';
import Draggable from 'react-draggable';

interface DraggableWidgetProps {
  children: ReactNode;
  defaultPosition?: { x: number; y: number }; // 초기 위치
  zIndex?: number;                            // 현재 층위
  onFocus?: () => void;                       // 클릭 시 맨 앞으로 가져오는 함수
  className?: string;
  dragHandle?: string;                        // 특정 부분만 잡고 끌게 할 때 (CSS 클래스명)
}

export default function DraggableWidget({
  children,
  defaultPosition = { x: 0, y: 0 },
  zIndex = 1,
  onFocus,
  className = '',
  dragHandle,
}: DraggableWidgetProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 마운트 시점에만 드래그 가능하도록 설정 (서버사이드 렌더링 이슈 방지)
  useEffect(() => {
    // ESLint 경고 무시 주석
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={defaultPosition}
      handle={dragHandle} // 특정 핸들만 잡고 끌 수 있게 설정
      bounds="parent"     // 부모(바탕화면) 밖으로 못 나가게 제한
      cancel='.no-drag'   // 이 클래스명이 붙은 요소는 드래그 방지
      onStart={() => {
        setIsDragging(true);
        onFocus?.(); // 드래그 시작하면 맨 앞으로
      }}
      onStop={() => {
        setIsDragging(false);
      }}
      onMouseDown={onFocus}
    >
      <div
        ref={nodeRef}
        className={`
          absolute inline-block
          ${dragHandle ? '' : (isDragging ? 'cursor-grabbing' : 'cursor-grab')}
          ${className}
        `}
        style={{
          zIndex: isDragging ? 9999 : zIndex
        }}
      >
        {children}
      </div>
    </Draggable>
  );
}