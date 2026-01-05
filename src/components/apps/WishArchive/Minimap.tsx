/**
 * Timeline Minimap Component
 * Shows overview of entire timeline with current position indicator
 */

'use client';

import { useMemo } from 'react';
import { EventType } from '@prisma/client';

interface TimelineEvent {
  id: string;
  date: string;
  type: EventType;
  title: string;
}

interface MinimapProps {
  events: TimelineEvent[];
  currentMonth: string | null;
  onMonthClick: (month: string) => void;
  categoryConfig: Record<EventType, { color: string }>;
}

export function Minimap({ events, currentMonth, onMonthClick }: MinimapProps) {
  // Group events by month
  const monthlyData = useMemo(() => {
    const grouped: Record<string, TimelineEvent[]> = {};
    
    events.forEach((event) => {
      const month = event.date.substring(0, 7); // YYYY-MM
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(event);
    });

    return grouped;
  }, [events]);

  const sortedMonths = useMemo(() => {
    return Object.keys(monthlyData).sort();
  }, [monthlyData]);

  if (sortedMonths.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 bg-white dark:bg-gray-900 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-4 w-80 hidden lg:block">
      {/* Header - Retro Style */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b-4 border-black dark:border-white">
        <div className="text-lg font-black text-black dark:text-white flex items-center gap-2 uppercase tracking-tight">
          🗺️ 타임라인 맵
        </div>
        <div className="text-xs font-bold text-black dark:text-white bg-yellow-300 px-2 py-1 border-2 border-black">
          {sortedMonths.length}개월
        </div>
      </div>

      {/* Minimap Grid - Retro Button Style */}
      <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar pr-2">
        {sortedMonths.map((month) => {
          const monthEvents = monthlyData[month];
          const isCurrent = month === currentMonth;
          const monthDate = new Date(month + '-01');
          const monthLabel = monthDate.toLocaleDateString('ko-KR', { 
            year: '2-digit', 
            month: 'short' 
          });

          return (
            <button
              key={month}
              onClick={() => onMonthClick(month)}
              className={`
                w-full flex items-center justify-between gap-3 p-3 border-4 border-black dark:border-white transition-all font-black
                ${isCurrent 
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] translate-x-[2px] translate-y-[2px]' 
                  : 'bg-white dark:bg-gray-800 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                }
              `}
              title={`${month} (${monthEvents.length}개 이벤트)`}
            >
              {/* Month Label */}
              <div className={`
                text-sm font-black uppercase
                ${isCurrent ? 'text-black' : 'text-black dark:text-white'}
              `}>
                {monthLabel}
              </div>

              {/* Event Count Badge */}
              <div className={`
                text-base font-black px-3 py-1 border-2 border-black min-w-[60px] text-center
                ${isCurrent ? 'bg-yellow-300 text-black' : 'bg-pink-300 dark:bg-pink-400 text-black'}
              `}>
                {monthEvents.length}개
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend - Retro Style */}
      <div className="mt-4 pt-3 border-t-4 border-black dark:border-white text-xs font-black text-black dark:text-white text-center uppercase bg-gray-100 dark:bg-gray-800 p-2">
        클릭해서 이동하기
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #000;
          border: 2px solid #fff;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #333;
        }
      `}</style>
    </div>
  );
}
