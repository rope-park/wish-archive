/**
 * Divider 컴포넌트
 * 
 * - 가로 또는 세로 구분선 제공
 * - 방향, 추가 스타일, 위치 조정 가능
 */

'use client';

import { forwardRef, HTMLAttributes, CSSProperties } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'; // 방향 (가로/세로)
  className?: string;                      // 추가 스타일
  style?: CSSProperties;                   // 인라인 스타일 (위치 조정 등)
}

const Divider = forwardRef<HTMLDivElement, DividerProps>(
  ({ orientation = 'horizontal', className = '', style, ...props }, ref) => {
    const isHorizontal = orientation === 'horizontal';

    // 방향에 따른 컨테이너 레이아웃
    const containerClass = isHorizontal
      ? 'w-full h-[2px] flex-col my-1'
      : 'h-full w-[2px] flex-row mx-1';

    // 선(Line) 자체의 크기 설정
    const lineBase = isHorizontal
      ? 'w-full h-[1px]'
      : 'h-full w-[1px]';

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={`
          flex shrink-0
          
          /* 방향별 레이아웃 적용 */
          ${isHorizontal
            ? 'w-full h-[2px] flex-col my-1 py-[1px]'
            : 'h-full w-[2px] flex-row mx-1 px-[1px]'
          }

          ${className}
        `}
        style={style}
        {...props}
      >
        {/* 그림자 선 (Dark Shadow) - 위쪽 또는 왼쪽 */}
        <div 
          className={`
            bg-gray-500
            ${isHorizontal ? 'w-full h-[1px]' : 'h-full w-[1px]'}
          `}
        />

        {/* 하이라이트 선 (Highlight) - 아래쪽 또는 오른쪽 */}
        <div
          className={`
            ${isHorizontal ? 'w-full h-[1px]' : 'h-full w-[1px]'}
            bg-white
          `}
        />
      </div>
    );
  }
);

Divider.displayName = 'Divider';

export default Divider;