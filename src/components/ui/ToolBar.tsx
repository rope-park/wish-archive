/**
 * ToolBar 컴포넌트
 * 
 * - 상단 툴바를 구현
 * - 손잡이(Gripper) 표시 옵션 제공
 * - 내부에 다양한 툴바 요소들(MenuBar, AddressBar 등)을 포함할 수 있음
 */

'use client';

import { ReactNode } from 'react';

export interface ToolbarProps {
  children: ReactNode;  // 안에 들어갈 내용 (MenuBar, AddressBar 등)
  hasGripper?: boolean; // 왼쪽 손잡이 표시 여부 (보통 첫 번째 줄엔 있고, 주소창엔 없음)
  className?: string;
}

export default function Toolbar({
  children,
  hasGripper = true,
  className = '',
}: ToolbarProps) {
  return (
    <div 
      className={`
        /* --- 레이아웃 & 크기 --- */
        w-full h-10 px-1 
        flex items-center gap-1
        shrink-0
        
        bg-gray-200
        /* 상단: 흰색 하이라이트 */
        border-t border-white
        /* 하단: 어두운 그림자 (#808080) */
        border-b border-gray-400
        select-none
        
        ${className}
      `}
      role="toolbar"
    >
      {/* 손잡이 (Gripper) */}
      {/* 윈도우 창을 드래그해서 위치를 옮길 수 있을 것 같은 '핸들' 디자인 */}
      {hasGripper && (
        <div 
          className="
            w-[3px] h-[60%] mx-1
            border-l border-white      /* 왼쪽: 하이라이트 */
            border-r border-gray-500   /* 오른쪽: 그림자 */
          " 
          aria-hidden="true"
        />
      )}

      {/* 내용물 컨테이너 */}
      <div className="
        flex-1 flex items-center h-full gap-2
        px-1
        overflow-x-auto overflow-y-hidden
        no-scrollbar
      ">
        {children}
      </div>
    </div>
  );
}