/**
 * WindowFrame 컴포넌트
 * 
 * - 윈도우 스타일의 프레임 제공
 * - 드래그 가능한 헤더 (추후 Draggable 라이브러리 연동 가능)
 * - 반응형 크기 조절
 */

'use client';

import { ReactNode } from 'react';
import { Button } from '@/components/ui';

export interface WindowFrameProps {
  title: string;        // 창 제목
  iconSrc?: string;        // 창 아이콘 (이모지 또는 이미지 등)
  children: ReactNode;  // 창 내부 컨텐츠
  className?: string;   // 추가 커스텀 클래스
  isActive: boolean;   // 활성화 여부 (포커스 상태)
  isMaximized?: boolean; // 최대화 여부

  onClose: () => void; // 닫기 핸들러
  onMinimize: () => void; // 최소화 핸들러
  onMaximize: () => void; // 최대화 핸들러

}

export default function WindowFrame({
  title,
  iconSrc = '',
  children,
  className = '',
  isActive,
  isMaximized = false,
  onClose,
  onMinimize,
  onMaximize,
}: WindowFrameProps) {

  // 닫기 핸들러
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();  // 버튼 클릭 시 이벤트 버블링(창 포커스) 방지
    onClose();
  }

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMinimize();
  }

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMaximize();
  }

  return (
    // [1] 윈도우 프레임 본체
    <div className={`
        relative flex flex-col
        /* 최대화 상태면 꽉 채우고, 아니면 기본 크기 */
        ${isMaximized ? 'w-full h-full' : 'w-full max-w-5xl h-[80vh] md:h-auto md:min-h-[600px]'}
        
        /* --- 배경 및 질감 (Glassmorphism + Noise) --- */
        bg-white/80 backdrop-blur-md
        
        /* --- 테두리 및 그림자 (3D 입체감) --- */
        rounded-sm
        border border-white/50
        outline outline-1 outline-black
        shadow-outset
        
        ${className}
      `}>

      {/* [2] 헤더 (Title Bar) - 드래그 핸들 역할 */}
      <div className={`
        h-8 pl-3 pr-2 py-1 shrink-0
        flex items-center justify-between
        
        /* 활성 상태일 때 핑크색, 비활성일 때 회색 */
        ${isActive ? 'bg-linear-to-r from-[#ff2e93]/80 to-[#ff2e93]' : 'bg-gray-400'}
        border-b border-white/50
        
        select-none cursor-default
      `}>
        {/* 좌측: 아이콘 + 제목 */}
        <div className="flex items-center gap-2 text-white drop-shadow-md">
          {iconSrc && (
            iconSrc.startsWith('/')
              ? <img src={iconSrc} alt="" className="w-4 h-4 object-contain" />
              : <span className="text-sm filter drop-shadow-sm">{iconSrc}</span>
          )}

          <span className="font-pixel text-sm pt-1 tracking-wide truncate max-w-[200px] md:max-w-md">
            {title}.exe
          </span>
        </div>

        {/* 우측: 컨트롤 버튼 그룹 */}
        <div className="flex gap-1">
          <WindowControlBtn type="minimize" onClick={handleMinimize} />
          <WindowControlBtn type="maximize" onClick={handleMaximize} isMaximized={isMaximized} />
          <WindowControlBtn type="close" onClick={handleClose} />
        </div>
      </div>

      {/* [4] 툴바/메뉴바 영역 (옵션 - 필요시 여기에 MenuBar 추가) */}
      {/* <div className="h-7 bg-gray-200 border-b border-white shadow-inset">...</div> */}

      {/* [3] 컨텐츠 영역 (Body) */}
      <div className="
          flex-1 m-1 p-4 md:p-6
          
          /* --- 본문 스타일: 반투명 흰색 + 푹 파인 효과 --- */
          bg-white/60 
          shadow-inset 
          border border-gray-400
          
          /* 스크롤 처리 */
          overflow-y-auto custom-scrollbar
        ">
        {children}
      </div>

      {/* [4] 상태바 (Status Bar) */}
      <div className="
          h-6 mx-1 mb-1 px-2
          flex justify-between items-center shrink-0
          
          bg-gray-200 
          shadow-inset
          text-[10px] font-pixel text-gray-600
        ">
        <span className="truncate">Connected to WISH World...</span>
        <div className="flex gap-2">
          <span>Mem: 128MB</span>
          <span>Online</span>
        </div>
      </div>

    </div>
  );
}

// 윈도우 컨트롤 버튼 컴포넌트
function WindowControlBtn({
  type,
  onClick,
  isMaximized
}: {
  type: 'minimize' | 'maximize' | 'close';
  onClick?: (e: React.MouseEvent) => void;
  isMaximized?: boolean;
}) {
  // 버튼 타입별 라벨 및 스타일
  const isClose = type === 'close';

  let label = '';
  if (type === 'close') label = 'X';
  else if (type === 'minimize') label = '_';
  else if (type === 'maximize') label = isMaximized ? '❐' : '□';

  return (
    <button
      onClick={onClick}
      className={`
        w-[18px] h-[18px] flex items-center justify-center
        
        /* --- 버튼 기본 스타일 --- */
        bg-white/20 
        border border-white
        shadow-outset active:shadow-inset active:translate-y-[1px]
        
        /* --- 폰트 및 색상 --- */
        font-pixel text-[10px] text-white leading-none
        
        /* --- 호버 효과 --- */
        transition-colors
        ${isClose ? 'hover:bg-red-500' : 'hover:bg-white/40'}
      `}
      aria-label={type}
    >
      <span className={type === 'minimize' ? '-mt-[6px]': '-mt-[1px]'}>
        {label}
      </span>
    </button>
  );
}