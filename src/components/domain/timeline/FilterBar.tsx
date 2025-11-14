/**
 * FilterBar 컴포넌트
 * 
 * 타임라인 필터링 바
 * - 이벤트 타입, 날짜 범위 등 필터 제공
 */

'use client';

import { type EventType } from '@prisma/client';
import Select, { type SelectOption } from '@/components/ui/Select';
import SearchBar from '@/components/ui/SerachBar';
import DatePicker from '@/components/ui/DatePicker';

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onTypeFilter?: (type: EventType | 'ALL') => void;
  onDateRangeFilter?: (start: string, end: string) => void;
  className?: string;
}

const EVENT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'ALL', label: '전체' },
  { value: 'RELEASE', label: '발매' },
  { value: 'MUSIC_SHOW', label: '음악방송' },
  { value: 'CONCERT', label: '콘서트' },
  { value: 'TOUR', label: '투어' },
  { value: 'FANMEETING', label: '팬미팅' },
  { value: 'SHOWCASE', label: '쇼케이스' },
  { value: 'VARIETY_SHOW', label: '예능' },
  { value: 'POPUP_STORE', label: '팝업스토어' },
  { value: 'AWARD_SHOW', label: '시상식' },
  { value: 'CF_AD', label: '광고' },
  { value: 'MAGAZINE', label: '화보' },
  { value: 'ONLINE_CONTENT', label: '온라인콘텐츠' },
  { value: 'MERCH_DROP', label: '굿즈' },
  { value: 'OTHER', label: '기타' },
];

export default function FilterBar({
  onSearch,
  onTypeFilter,
  onDateRangeFilter,
  className = '',
}: FilterBarProps) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-lg border bg-white p-4 md:flex-row md:items-end ${className}`}
    >
      {/* 검색 */}
      <div className="flex-1">
        <SearchBar
          placeholder="이벤트 검색..."
          onSearch={onSearch}
          fullWidth
        />
      </div>

      {/* 타입 필터 */}
      <div className="w-full md:w-48">
        <Select
          options={EVENT_TYPE_OPTIONS}
          placeholder="이벤트 타입"
          onChange={(e) => onTypeFilter?.(e.target.value as EventType | 'ALL')}
          defaultValue="ALL"
          fullWidth
        />
      </div>

      {/* 날짜 범위 */}
      <div className="flex gap-2">
        <DatePicker
          placeholder="시작일"
          onChange={(e) => {
            // 간단한 구현 - 실제로는 상태 관리 필요
            const start = e.target.value;
            const endInput = e.target.parentElement?.nextElementSibling
              ?.querySelector('input') as HTMLInputElement;
            if (start && endInput?.value) {
              onDateRangeFilter?.(start, endInput.value);
            }
          }}
        />
        <DatePicker
          placeholder="종료일"
          onChange={(e) => {
            const end = e.target.value;
            const startInput = e.target.parentElement?.previousElementSibling
              ?.querySelector('input') as HTMLInputElement;
            if (startInput?.value && end) {
              onDateRangeFilter?.(startInput.value, end);
            }
          }}
        />
      </div>
    </div>
  );
}
