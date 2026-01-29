/**
 * Calendar 컴포넌트
 * 
 * - 달력 UI를 제공
 * - 월간 뷰로 날짜 선택 가능
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
  showTodayButton?: boolean;
  datesWithData?: Set<string>; // 'YYYY-MM-DD' 형식의 날짜 Set
}

export default function Calendar({
  value = new Date(),
  onChange,
  className = '',
  showTodayButton = true,
  datesWithData = new Set(),
}: CalendarProps) {
  const [viewDate, setViewDate] = useState(value);
  const [viewMode, setViewMode] = useState<'day' | 'month' | 'year'>('day');

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
  const handlePrevMonth = () => {
    if (viewMode === 'day') setViewDate(new Date(year, month - 1, 1));
    else if (viewMode === 'month') setViewDate(new Date(year - 1, month, 1));
    else setViewDate(new Date(year - 10, month, 1));
  };
  
  const handleNextMonth = () => {
    if (viewMode === 'day') setViewDate(new Date(year, month + 1, 1));
    else if (viewMode === 'month') setViewDate(new Date(year + 1, month, 1));
    else setViewDate(new Date(year + 10, month, 1));
  };

  const handleDateClick = (d: number, type: 'prev' | 'curr' | 'next' = 'curr') => {
    let newMonth = month;
    if (type === 'prev') newMonth = month - 1;
    if (type === 'next') newMonth = month + 1;

    const newDate = new Date(year, newMonth, d);
    setViewDate(newDate);
    onChange?.(newDate);
  };

  const handleMonthClick = (monthIndex: number) => {
    setViewDate(new Date(year, monthIndex, 1));
    setViewMode('day');
  };

  const handleYearClick = (selectedYear: number) => {
    setViewDate(new Date(selectedYear, month, 1));
    setViewMode('month');
  };

  const handleHeaderClick = () => {
    if (viewMode === 'day') setViewMode('month');
    else if (viewMode === 'month') setViewMode('year');
    else setViewMode('day');
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
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // 년도 범위 계산 (10년 단위)
  const yearRangeStart = Math.floor(year / 10) * 10;
  const yearRangeEnd = yearRangeStart + 9;

  // 헤더 텍스트
  const getHeaderText = () => {
    if (viewMode === 'day') return viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (viewMode === 'month') return year.toString();
    return `${yearRangeStart} - ${yearRangeEnd}`;
  };

  return (
    <div
      className={`
        bg-white border-2 border-gray-400 shadow-lg rounded-sm
        ${className}
      `}
      style={{ width: '100%', maxWidth: '400px' }}
    >
      {/* 1. 헤더 (월/년도 + 네비게이션) */}
      <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-b-2 border-gray-400">
        <button 
          onClick={handlePrevMonth}
          className="p-2 hover:bg-white/20 rounded transition-colors"
          aria-label={viewMode === 'day' ? 'Previous month' : viewMode === 'month' ? 'Previous year' : 'Previous decade'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={handleHeaderClick}
          className="text-lg font-bold hover:bg-white/20 px-4 py-1 rounded transition-colors cursor-pointer"
        >
          {getHeaderText()}
        </button>

        <button 
          onClick={handleNextMonth}
          className="p-2 hover:bg-white/20 rounded transition-colors"
          aria-label={viewMode === 'day' ? 'Next month' : viewMode === 'month' ? 'Next year' : 'Next decade'}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 2. 달력 본체 */}
      <div className="bg-gray-50 p-3">

        {/* DAY VIEW: 일별 캘린더 */}
        {viewMode === 'day' && (
          <>
            {/* 요일 헤더 */}
            <div className="grid grid-cols-7 text-center mb-2">
              {weekDays.map((day) => (
                <div key={day} className="text-xs font-bold text-gray-600 py-2">
                  {day.substring(0, 3)}
                </div>
              ))}
            </div>

            {/* 날짜 그리드 */}
            <div className="grid grid-cols-7 gap-1">

              {/* A. 지난 달 날짜 (Prev) */}
              {Array.from({ length: firstDayObj }).map((_, i) => {
                const day = prevMonthDays - firstDayObj + 1 + i;
                const selected = isSelected(day, 'prev');
                return (
                  <button
                    key={`prev-${day}`}
                    onClick={() => handleDateClick(day, 'prev')}
                    className={`
                      h-10 w-full flex items-center justify-center text-sm font-medium text-gray-400 rounded-md
                      hover:bg-gray-200 hover:text-gray-700 transition-colors
                      ${selected ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : ''}
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
                
                // 해당 날짜에 데이터가 있는지 확인 (YYYY-MM-DD 형식)
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const hasData = datesWithData.has(dateStr);

                return (
                  <button
                    key={`curr-${day}`}
                    onClick={() => handleDateClick(day, 'curr')}
                    className={`
                      h-6 w-full flex flex-col items-center justify-center font-pixel text-xs relative
                      
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
                    <span>{day}</span>
                    {/* NCT 공식 색상 점 표시 */}
                    {hasData && (
                      <div className="w-1 h-1 rounded-full bg-[#B6FF00] mt-0.5" aria-hidden="true"></div>
                    )}
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
                      h-10 w-full flex items-center justify-center text-sm font-medium text-gray-400 rounded-md
                      hover:bg-gray-200 hover:text-gray-700 transition-colors
                      ${selected ? 'bg-blue-600 text-white hover:bg-blue-700 hover:text-white' : ''}
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {/* MONTH VIEW: 월 선택 (3x4 그리드) */}
        {viewMode === 'month' && (
          <div className="grid grid-cols-3 gap-2">
            {monthNames.map((monthName, idx) => {
              const isCurrentMonth = idx === month && year === new Date().getFullYear();
              const isSelectedMonth = idx === month;
              
              return (
                <button
                  key={monthName}
                  onClick={() => handleMonthClick(idx)}
                  className={`
                    py-4 px-3 text-sm font-medium rounded-md transition-colors
                    ${isSelectedMonth
                      ? 'bg-[#000080] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                    }
                    ${isCurrentMonth && !isSelectedMonth ? 'border-2 border-red-500 font-bold' : ''}
                  `}
                >
                  {monthName}
                </button>
              );
            })}
          </div>
        )}

        {/* YEAR VIEW: 년도 선택 (4x3 그리드, 10년 단위) */}
        {viewMode === 'year' && (
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, idx) => {
              const displayYear = yearRangeStart + idx;
              const isCurrentYear = displayYear === new Date().getFullYear();
              const isSelectedYear = displayYear === year;
              
              return (
                <button
                  key={displayYear}
                  onClick={() => handleYearClick(displayYear)}
                  className={`
                    py-3 px-2 text-sm font-medium rounded-md transition-colors
                    ${isSelectedYear
                      ? 'bg-[#000080] text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                    }
                    ${isCurrentYear && !isSelectedYear ? 'border-2 border-red-500 font-bold' : ''}
                  `}
                >
                  {displayYear}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. 하단 오늘 날짜 표시 */}
      {showTodayButton && (
        <div className="p-3 bg-gray-100 border-t-2 border-gray-300">
          <button
            onClick={handleTodayClick}
            className="w-full py-2 px-3 bg-gradient-to-b from-white to-gray-100 border-2 border-gray-400 hover:border-blue-500 hover:bg-blue-50 rounded-md text-sm font-medium transition-colors shadow-sm flex items-center justify-center gap-2"
          >
            <CalendarDaysIcon className="w-4 h-4" />
            Today: {new Date().toLocaleDateString()}
          </button>
        </div>
      )}
    </div>
  );
}