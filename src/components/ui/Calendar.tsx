/**
 * Calendar 컴포넌트
 * 
 * - 달력 UI를 제공
 * - 월간 뷰로 날짜 선택 가능
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui';

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  showTodayButton?: boolean;
}

export default function Calendar({
  value = new Date(),
  onChange,
  className = '',
  showTodayButton = true,
}: CalendarProps) {
  const [viewDate, setViewDate] = useState(value);

  useEffect(() => {
    setViewDate(value);
  }, [value]);

  const [currentDate, setCurrentDate] = useState(value); // 보여지는 달 기준

  // 날짜 계산 로직
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayObj = getFirstDayOfMonth(year, month); // 0(일) ~ 6(토)

  // 이전 달 채우기용
  const prevMonthDays = getDaysInMonth(year, month - 1);

  // 다음 달 채우기용
  const totalSlots = 42;
  const filledSlots = firstDayObj + daysInMonth;
  const nextMonthCount = totalSlots - filledSlots;

  // 핸들러
  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const handleDateClick = (d: number, type: 'prev' | 'curr' | 'next' = 'curr') => {
    let newMonth = month;
    if (type === 'prev') newMonth = month - 1;
    if (type === 'next') newMonth = month + 1;

    const newDate = new Date(year, newMonth, d);
    setViewDate(newDate); // 뷰 이동
    onChange?.(newDate);  // 값 변경 알림
  };

  const handleTodayClick = () => {
    const today = new Date();
    setViewDate(today);
    onChange?.(today);
  };

  // 오늘 날짜 확인 (하이라이트용)
  const isToday = (d: number, m: number, y: number) => {
    const today = new Date();
    return d === today.getDate() && m === today.getMonth() && y === today.getFullYear();
  };

  const isSelected = (d: number, type: 'prev' | 'curr' | 'next') => {
    let checkMonth = month;
    if (type === 'prev') checkMonth = month - 1;
    if (type === 'next') checkMonth = month + 1;

    const target = new Date(year, checkMonth, d);
    const selected = new Date(value);

    return target.toDateString() === selected.toDateString();
  };

  // 요일 헤더
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div
      className={`
        w-[250px] bg-gray-200 p-1
        shadow-outset border border-white
        ${className}
      `}
    >
      {/* 1. 헤더 (월/년도 + 네비게이션) */}
      <div className="flex justify-between items-center mb-2 px-1 pt-1">
        <span className="font-pixel text-sm font-bold ml-1">
          {viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </span>

        <div className="flex gap-0.5">
          <Button size="sm" onClick={handlePrevMonth} className="w-5 h-5 px-0 font-pixel text-[10px]">◀</Button>
          <Button size="sm" onClick={handleNextMonth} className="w-5 h-5 px-0 font-pixel text-[10px]">▶</Button>
        </div>
      </div>

      {/* 2. 달력 본체 (Sunken Container) */}
      <div className="border-2 border-gray-600 border-r-white border-b-white bg-white p-1">

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 text-center mb-1 border-b border-gray-300 pb-1">
          {weekDays.map((day) => (
            <div key={day} className="font-pixel text-[10px] text-gray-600">
              {day.charAt(0)}
            </div>
          ))}
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-y-0.5">

          {/* A. 지난 달 날짜 (Prev) */}
          {Array.from({ length: firstDayObj }).map((_, i) => {
            const day = prevMonthDays - firstDayObj + 1 + i;
            const selected = isSelected(day, 'prev');
            return (
              <button
                key={`prev-${day}`}
                onClick={() => handleDateClick(day, 'prev')}
                className={`
                  h-6 w-full flex items-center justify-center font-pixel text-xs text-gray-400
                  hover:bg-gray-200 hover:text-black
                  ${selected ? 'bg-[#000080] text-white hover:bg-[#000080] hover:text-white' : ''}
                `}
              >
                {day}
              </button>
            );
          })}

          {/* B. 이번 달 날짜 (Current) */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const today = isToday(day, month, year);
            const selected = isSelected(day, 'curr');

            return (
              <button
                key={`curr-${day}`}
                onClick={() => handleDateClick(day, 'curr')}
                className={`
                  h-6 w-full flex items-center justify-center font-pixel text-xs
                  
                  /* 선택된 상태 (Win98 Style: 파란 배경 + 흰 글씨) */
                  ${selected
                    ? 'bg-[#000080] text-white'
                    : 'text-black hover:bg-gray-200'
                  }

                  /* 오늘 날짜 (빨간 테두리 or 볼드) */
                  ${today && !selected ? 'border border-red-500 font-bold text-red-600' : ''}
                  ${today && selected ? 'font-bold border border-white/50' : ''}
                `}
              >
                {day}
              </button>
            );
          })}

          {/* C. 다음 달 날짜 (Next) - 그리드 채우기용 */}
          {nextMonthCount > 0 && nextMonthCount < 14 && Array.from({ length: nextMonthCount }).map((_, i) => {
            const day = i + 1;
            const selected = isSelected(day, 'next');
            return (
              <button
                key={`next-${day}`}
                onClick={() => handleDateClick(day, 'next')}
                className={`
                  h-6 w-full flex items-center justify-center font-pixel text-xs text-gray-400
                  hover:bg-gray-200 hover:text-black
                  ${selected ? 'bg-[#000080] text-white hover:bg-[#000080] hover:text-white' : ''}
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. 하단 오늘 날짜 표시 */}
      {showTodayButton && (
        <div className="mt-2 pt-1 border-t border-white shadow-[0_-1px_0_#808080]">
          <div className="font-pixel text-xs text-gray-700 flex justify-between items-center px-1">
            <span>Today:</span>
            <button
              onClick={handleTodayClick}
              className="text-black font-bold hover:underline cursor-pointer"
            >
              {new Date().toLocaleDateString()}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}