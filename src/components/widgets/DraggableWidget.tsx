'use client';

import { ReactNode, useRef, useState } from 'react';
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
  dragHandle, // 예: '.window-header' (이게 없으면 전체가 드래그 영역)
}: DraggableWidgetProps) {
  const nodeRef = useRef<HTMLDivElement>(null); // Strict Mode 오류 방지용 Ref
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Draggable
      nodeRef={nodeRef}
      defaultPosition={defaultPosition}
      handle={dragHandle} // 특정 핸들만 잡고 끌 수 있게 설정
      bounds="parent"     // 부모(바탕화면) 밖으로 못 나가게 제한
      onStart={() => {
        setIsDragging(true);
        onFocus?.(); // 드래그 시작하면 맨 앞으로
      }}
      onStop={() => {
        setIsDragging(false);
      }}
    >
      <div
        ref={nodeRef}
        className={`
          absolute inline-block
          ${isDragging ? 'cursor-grabbing z-[9999]' : 'cursor-grab'} 
          /* 드래그 중엔 잠깐 최상위로, 평소엔 지정된 zIndex */
          ${className}
        `}
        style={{ zIndex }}
        onMouseDown={onFocus} // 클릭만 해도 맨 앞으로
      >
        {children}
      </div>
    </Draggable>
  );
}