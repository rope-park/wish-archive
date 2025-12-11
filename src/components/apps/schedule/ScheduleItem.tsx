/**
 * ScheduleItem 컴포넌트
 * 
 * - 스케줄 항목 표시
 * - 시간, 제목, 종류(방송, 라디오 등) 표시
 * - 강조 표시 (오늘 일정 등)
 * - 클릭 이벤트 연결 가능 (상세보기 모달 등)
 */

'use client';

import { MouseEventHandler } from 'react';
import { Badge } from '../../ui';

export type ScheduleType = 'BROADCAST' | 'RADIO' | 'EVENT' | 'RELEASE' | 'ETC';

interface ScheduleItemProps {
  time: string;
  title: string;
  type: ScheduleType;
  isHighlighted?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  className?: string;
}

export default function ScheduleItem({
  time,
  title,
  type,
  isHighlighted = false,
  onClick,
  className = '',
}: ScheduleItemProps) {

  // 카테고리별 스타일 설정
  /** TODO: 카테고리화 다시하기 */
  const typeConfig: Record<ScheduleType, { label: string; className: string }> = {
    BROADCAST: { label: '방송',   className: 'bg-[#b8e986] text-black' }, // 연두색
    RADIO:     { label: '라디오', className: 'bg-[#bfdef0] text-black' }, // 하늘색
    RELEASE:   { label: '발매',   className: 'bg-[#ff9aa2] text-white' }, // 핑크색
    EVENT:     { label: '행사',   className: 'bg-[#fff89a] text-black' }, // 노란색
    ETC:       { label: '기타',   className: 'bg-gray-200 text-gray-600' },
  };

  const config = typeConfig[type] || typeConfig.ETC;

  return (
    <div 
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      className={`
        w-full flex items-center gap-3 p-3
        border-b border-[#b4d4f1]
        transition-all duration-200
        
        ${isHighlighted ? 'bg-[#fff89a]/30' : 'bg-transparent'}
        ${onClick ? 'cursor-pointer hover:bg-white/50 active:bg-[#b4d4f1]/50' : ''}
        
        ${className}
      `}
    >
      {/* 시간 */}
      <div className="w-[65px] flex justify-center shrink-0">
        <span className="text-gray-600 text-base font-bold font-['Pyeojin_Gothic']">
          {time}
        </span>
      </div>

      {/* 카테고리 뱃지 */}
      <Badge
        variant="capsule"
        className={`
          shrink-0 font-normal outline outline-1 outline-black 
          ${config.className} /* 타입별 색상 주입 */
        `}
      >
        {config.label}
      </Badge>

      {/* 내용 */}
      <div className="flex-1 text-black text-sm font-normal font-['Pyeojin_Gothic'] line-clamp-1">
        {title}
      </div>

    </div>
  );
}