/**
 * Calendar View Component
 * Monthly calendar visualization of events
 */

'use client';

import { useMemo } from 'react';
import { Badge } from '@/components/ui';
import { EventType } from '@prisma/client';

interface TimelineEvent {
  id: string;
  date: string;
  type: EventType;
  title: string;
  location?: string | null;
  description?: string | null;
}

interface CalendarViewProps {
  events: TimelineEvent[];
  onEventClick: (event: TimelineEvent) => void;
  categoryConfig: Record<EventType, { label: string; color: string; icon: string }>;
}

export function CalendarView({ events, onEventClick, categoryConfig }: CalendarViewProps) {
  const calendar = useMemo(() => {
    // Group by year-month
    const byMonth: Record<string, TimelineEvent[]> = {};
    events.forEach(event => {
      const date = new Date(event.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!byMonth[key]) byMonth[key] = [];
      byMonth[key].push(event);
    });

    return Object.keys(byMonth)
      .sort()
      .map(monthKey => {
        const [year, month] = monthKey.split('-').map(Number);
        const firstDay = new Date(year, month - 1, 1);
        const lastDay = new Date(year, month, 0);
        const startPadding = firstDay.getDay();
        const daysInMonth = lastDay.getDate();

        return {
          year,
          month,
          monthKey,
          startPadding,
          daysInMonth,
          events: byMonth[monthKey],
        };
      });
  }, [events]);

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {calendar.map(({ year, month, monthKey, startPadding, daysInMonth, events: monthEvents }) => {
        const eventsByDay: Record<number, TimelineEvent[]> = {};
        monthEvents.forEach(event => {
          const day = new Date(event.date).getDate();
          if (!eventsByDay[day]) eventsByDay[day] = [];
          eventsByDay[day].push(event);
        });

        return (
          <div key={monthKey} className="bg-white rounded-xl border-2 border-gray-200 shadow-lg overflow-hidden">
            {/* Month Header */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4">
              <h3 className="text-xl font-bold">
                {year}년 {month}월
              </h3>
              <p className="text-sm opacity-90">{monthEvents.length}개 활동</p>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Weekday headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
                  <div
                    key={day}
                    className={`text-center text-xs sm:text-sm font-bold py-2 ${
                      idx === 0 ? 'text-red-500' : idx === 6 ? 'text-blue-500' : 'text-gray-700'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Padding */}
                {Array.from({ length: startPadding }).map((_, idx) => (
                  <div key={`pad-${idx}`} className="aspect-square" />
                ))}

                {/* Days */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const day = idx + 1;
                  const dayEvents = eventsByDay[day] || [];
                  const hasEvents = dayEvents.length > 0;

                  return (
                    <div
                      key={day}
                      className={`
                        aspect-square border rounded-lg p-1 sm:p-2
                        ${hasEvents ? 'bg-blue-50 border-blue-300 cursor-pointer hover:bg-blue-100' : 'bg-white border-gray-200'}
                        transition-colors
                      `}
                    >
                      <div className="text-xs sm:text-sm font-bold text-gray-700">{day}</div>
                      {dayEvents.length > 0 && (
                        <div className="mt-1 space-y-0.5">
                          {dayEvents.slice(0, 2).map(event => (
                            <button
                              key={event.id}
                              onClick={() => onEventClick(event)}
                              className="w-full text-left"
                            >
                              <Badge
                                variant="capsule"
                                color={categoryConfig[event.type].color as "red" | "yellow" | "green" | "blue" | "purple" | "pink" | "lime" | "gray" | undefined}
                                size="sm"
                                className="text-[8px] w-full truncate"
                              >
                                {categoryConfig[event.type].icon}
                              </Badge>
                            </button>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[8px] text-gray-500 text-center">
                              +{dayEvents.length - 2}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
