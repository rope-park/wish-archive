/**
 * Calendar 컴포넌트
 * 
 * - 달력 UI를 제공
 * - 월간 뷰로 날짜 선택 가능
 */
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

export default function Calendar({
  value = new Date(),
  onChange,
  className = '',
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(value); // 보여지는 달 기준

  // 달력 데이터 계산 함수
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // 현재 달력 정보
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 ~ 11
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  // 이전 달 정보 (빈칸 채우기용)
  const prevMonthDays = getDaysInMonth(year, month - 1);
  const prevMonthStart = prevMonthDays - firstDay + 1;

  // 네비게이션 핸들러
  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    onChange?.(newDate);
  };

  // 오늘 날짜 확인 (하이라이트용)
  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // 요일 헤더
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div 
      className={`
        w-[240px] bg-gray-200 p-3 
        shadow-outset border border-white
        outline outline-1 outline-black
        flex flex-col gap-2
        ${className}
      `}
    >
      {/* 헤더 (월/년도 + 이동 버튼) */}
      <div className="flex justify-between items-center mb-1">
        <Button 
          size="sm" 
          onClick={handlePrevMonth}
          className="w-6 px-0"
        >
          ◀
        </Button>
        
        <span className="font-pixel text-base font-bold">
          {currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </span>
        
        <Button 
          size="sm" 
          onClick={handleNextMonth}
          className="w-6 px-0"
        >
          ▶
        </Button>
      </div>

      {/* 구분선 */}
      <div className="h-[2px] border-b border-white shadow-[0_1px_0_#808080]" />

      {/* 요일 헤더 (Sun ~ Sat) */}
      <div className="grid grid-cols-7 text-center mb-1">
        {weekDays.map((day, idx) => (
          <div 
            key={day} 
            className={`
              font-pixel text-xs
              ${idx === 0 ? 'text-red-600' : idx === 6 ? 'text-blue-600' : 'text-black'}
            `}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="h-[2px] border-b border-white shadow-[0_1px_0_#808080]" />

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-y-1">
        
        {/* A. 지난 달 날짜 (흐리게) */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div 
            key={`prev-${i}`} 
            className="h-8 flex items-center justify-center text-gray-400 font-pixel text-sm"
          >
            {prevMonthStart + i}
          </div>
        ))}

        {/* B. 이번 달 날짜 */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const today = isToday(day);
          const isSelected = value?.getDate() === day && 
                             value?.getMonth() === month && 
                             value?.getFullYear() === year;

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              className={`
                h-8 w-8 mx-auto flex items-center justify-center
                font-pixel text-sm
                border border-transparent
                
                ${today ? 'bg-brand-deep text-white font-bold shadow-outset' : ''}
       
                ${isSelected && !today ? 'border-black border-dashed' : ''}
                
                /* 호버 효과 */
                hover:bg-gray-300 hover:shadow-outset active:shadow-inset
              `}
            >
              {day}
            </button>
          );
        })}

      </div>
    </div>
  );
}