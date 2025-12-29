/**
 * ScrollBar 컴포넌트
 * 
 * - 방향: 수직/수평
 * - 썸 위치 및 크기 조절 가능
 */

'use client';

import { CSSProperties, useEffect, useRef, useState, useCallback  } from 'react';

export interface ScrollBarProps {
  orientation?: 'vertical' | 'horizontal'; // 방향
  scrollContainerRef?: React.RefObject<HTMLElement | null>; // 스크롤 감지할 컨테이너
  className?: string;     // 추가 스타일
  style?: CSSProperties;  // 위치 잡아줄 때 사용
}

export default function ScrollBar({
  orientation = 'vertical',
  scrollContainerRef,
  className = '',
  style,
}: ScrollBarProps) {
  
  const isVertical = orientation === 'vertical';

  // 상태 관리
  const [thumbSize, setThumbSize] = useState(20);      // 썸 크기 (px or %)
  const [thumbPosition, setThumbPosition] = useState(0); // 썸 위치 (px)
  const [isDragging, setIsDragging] = useState(false);
  
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{ mouse: number; thumb: number } | null>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

// 1. 스크롤 동기화 (컨텐츠 -> 스크롤바)
  const updateScrollBar = useCallback(() => {
    const container = scrollContainerRef?.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = container;
    const { clientHeight: trackHeight, clientWidth: trackWidth } = track;

    // 수직/수평에 따른 변수 선택
    const contentSize = isVertical ? scrollHeight : scrollWidth;
    const viewSize = isVertical ? clientHeight : clientWidth;
    const scrollPos = isVertical ? scrollTop : scrollLeft;
    const trackSize = isVertical ? trackHeight : trackWidth;

    // 컨텐츠가 뷰포트보다 작으면 썸 숨기거나 꽉 채움
    if (contentSize <= viewSize) {
      setThumbSize(trackSize);
      setThumbPosition(0);
      return;
    }

    // 썸 크기 계산 (비율 유지, 최소 20px)
    const ratio = viewSize / contentSize;
    const newThumbSize = Math.max(20, trackSize * ratio);
    setThumbSize(newThumbSize);

    // 썸 위치 계산
    const scrollableContent = contentSize - viewSize;
    const scrollableTrack = trackSize - newThumbSize;
    const scrollRatio = scrollPos / scrollableContent;
    const newThumbPos = scrollableTrack * scrollRatio;

    setThumbPosition(newThumbPos);
  }, [isVertical, scrollContainerRef]);

  // 리사이즈 및 스크롤 이벤트 리스너 등록
  useEffect(() => {
    const container = scrollContainerRef?.current;
    if (!container) return;

    const handleScroll = () => requestAnimationFrame(updateScrollBar);
    
    // ResizeObserver로 컨테이너 크기 변경 감지
    const resizeObserver = new ResizeObserver(() => updateScrollBar());
    resizeObserver.observe(container);

    container.addEventListener('scroll', handleScroll);
    updateScrollBar(); // 초기 실행

    return () => {
      container.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [scrollContainerRef, updateScrollBar]);

  // 2. 썸 드래그 (스크롤바 -> 컨텐츠)
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const clientPos = isVertical ? e.clientY : e.clientX;
    dragStartRef.current = { mouse: clientPos, thumb: thumbPosition };
    document.body.style.userSelect = 'none'; // 드래그 중 텍스트 선택 방지
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !dragStartRef.current || !scrollContainerRef?.current || !trackRef.current) return;

      const container = scrollContainerRef.current;
      const track = trackRef.current;
      const { mouse: startMouse, thumb: startThumb } = dragStartRef.current;
      
      const currentMouse = isVertical ? e.clientY : e.clientX;
      const delta = currentMouse - startMouse;
      
      // 트랙 내 이동 가능 영역
      const trackSize = isVertical ? track.clientHeight : track.clientWidth;
      const scrollableTrack = trackSize - thumbSize;
      
      // 새로운 썸 위치 (범위 제한)
      let newThumbPos = startThumb + delta;
      newThumbPos = Math.max(0, Math.min(newThumbPos, scrollableTrack));

      // 컨텐츠 스크롤 위치로 변환하여 적용
      const contentSize = isVertical ? container.scrollHeight : container.scrollWidth;
      const viewSize = isVertical ? container.clientHeight : container.clientWidth;
      const scrollableContent = contentSize - viewSize;
      
      const scrollRatio = newThumbPos / scrollableTrack;
      const newScrollPos = scrollableContent * scrollRatio;

      if (isVertical) {
        container.scrollTop = newScrollPos;
      } else {
        container.scrollLeft = newScrollPos;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      document.body.style.userSelect = '';
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isVertical, scrollContainerRef, thumbSize, thumbPosition]);

  // 3. 버튼 클릭 스크롤 (Step)
  const scrollStep = (direction: 'start' | 'end') => {
    const container = scrollContainerRef?.current;
    if (!container) return;
    
    const step = 40; // 한 번 클릭 시 이동할 픽셀
    const amount = direction === 'start' ? -step : step;

    if (isVertical) {
      container.scrollBy({ top: amount, behavior: 'auto' });
    } else {
      container.scrollBy({ left: amount, behavior: 'auto' });
    }
  };

  const startScrolling = (direction: 'start' | 'end') => {
    scrollStep(direction); // 즉시 1회 실행
    // 꾹 누르면 연속 실행
    scrollIntervalRef.current = setInterval(() => scrollStep(direction), 100);
  };

  const stopScrolling = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  // 4. 트랙 빈 공간 클릭 (Page Jump)
  const handleTrackClick = (e: React.MouseEvent) => {
    if (e.target !== trackRef.current || !scrollContainerRef?.current) return;
    
    const container = scrollContainerRef.current;
    const rect = trackRef.current.getBoundingClientRect();
    const clickPos = isVertical ? (e.clientY - rect.top) : (e.clientX - rect.left);
    
    // 클릭한 위치가 썸보다 앞인지 뒤인지 확인
    const isBeforeThumb = clickPos < thumbPosition;
    const viewSize = isVertical ? container.clientHeight : container.clientWidth;
    const jumpAmount = isBeforeThumb ? -viewSize : viewSize;

    if (isVertical) {
      container.scrollBy({ top: jumpAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: jumpAmount, behavior: 'smooth' });
    }
  };

  // 스타일 정의
  const containerBase = isVertical
    ? 'w-4 h-full flex-col border-l border-gray-400'
    : 'h-4 w-full flex-row border-t border-gray-400';

  const buttonClass = `
    flex items-center justify-center
    w-4 h-4 shrink-0
    bg-gray-200
    border-2 border-t-white border-l-white border-r-black border-b-black
    active:border-t-black active:border-l-black active:border-r-white active:border-b-white
    font-pixel text-[8px] text-black leading-none
    cursor-pointer select-none
  `;

  return (
    <div 
      className={`flex bg-gray-200 select-none ${containerBase} ${className}`} 
      style={style}
    >
      {/* 시작 버튼 (위/왼쪽) */}
      <button 
        className={buttonClass} 
        onMouseDown={() => startScrolling('start')}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
        tabIndex={-1}
      >
        <span className={isVertical ? '-mt-[1px]' : '-ml-[1px]'}>
          {isVertical ? '▲' : '◀'}
        </span>
      </button>

      {/* 트랙 (Track) */}
      <div 
        ref={trackRef}
        onMouseDown={handleTrackClick}
        className="relative flex-1 bg-[url('/system/patterns/checkerboard.png')] bg-[length:2px_2px] bg-white shadow-[inset_1px_1px_0px_#000]"
      >
        {/* 썸 (Thumb - 손잡이) */}
        <div
          onMouseDown={handleDragStart}
          className={`
            absolute bg-gray-200 box-border
            border-2 border-t-white border-l-white border-r-black border-b-black
            ${isDragging ? 'bg-gray-300' : ''}
          `}
          style={{
            width: isVertical ? '100%' : `${thumbSize}px`,
            height: isVertical ? `${thumbSize}px` : '100%',
            top: isVertical ? `${thumbPosition}px` : 0,
            left: isVertical ? 0 : `${thumbPosition}px`,
            cursor: 'default',
          }}
        >
          {/* 썸 디테일: 미끄럼 방지 그립 (크기가 충분할 때만 표시) */}
          {thumbSize > 20 && (
             // 
             <div className={`
               absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
               flex gap-[2px] opacity-50
               ${isVertical ? 'flex-col' : 'flex-row'}
             `}>
               <div className="w-[1px] h-[1px] bg-black shadow-[1px_1px_0_white]" />
               <div className="w-[1px] h-[1px] bg-black shadow-[1px_1px_0_white]" />
               <div className="w-[1px] h-[1px] bg-black shadow-[1px_1px_0_white]" />
             </div>
          )}
        </div>
      </div>

      {/* 끝 버튼 (아래/오른쪽) */}
      <button 
        className={buttonClass}
        onMouseDown={() => startScrolling('end')}
        onMouseUp={stopScrolling}
        onMouseLeave={stopScrolling}
        tabIndex={-1}
      >
        <span className={isVertical ? '-mt-[1px]' : '-ml-[1px]'}>
          {isVertical ? '▼' : '▶'}
        </span>
      </button>
    </div>
  );
}