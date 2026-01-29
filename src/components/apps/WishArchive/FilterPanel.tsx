/**
 * Advanced Filter Panel Component
 * Multi-category, location, and member filters
 */

'use client';

import { useState } from 'react';
import { EventType } from '@prisma/client';

export interface FilterState {
  categories: EventType[];
  locations: string[];
  members: string[];
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableLocations: string[];
  availableMembers: string[];
  onClose: () => void;
}

const CATEGORY_OPTIONS = [
  { value: 'CONCERT' as EventType, label: '공연', icon: '🎤', color: 'pink' },
  { value: 'MUSIC_SHOW' as EventType, label: '음악방송', icon: '📺', color: 'blue' },
  { value: 'RELEASE' as EventType, label: '발매', icon: '💿', color: 'purple' },
  { value: 'VARIETY' as EventType, label: '예능', icon: '🎬', color: 'yellow' },
  { value: 'RADIO' as EventType, label: '라디오', icon: '📻', color: 'green' },
  { value: 'AWARD' as EventType, label: '시상식', icon: '🏆', color: 'lime' },
  { value: 'ANNOUNCEMENT' as EventType, label: '공지', icon: '📢', color: 'gray' },
] as const;

const LOCATION_GROUPS = {
  '한국': ['Seoul', 'Busan', 'Incheon', 'Korea'],
  '일본': ['Tokyo', 'Osaka', 'Japan'],
  '해외': ['USA', 'Thailand', 'Taiwan', 'Online'],
};

export function FilterPanel({
  filters,
  onFilterChange,
  availableLocations,
  availableMembers,
  onClose,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const toggleCategory = (category: EventType) => {
    const newCategories = localFilters.categories.includes(category)
      ? localFilters.categories.filter((c) => c !== category)
      : [...localFilters.categories, category];
    setLocalFilters({ ...localFilters, categories: newCategories });
  };

  const toggleLocation = (location: string) => {
    const newLocations = localFilters.locations.includes(location)
      ? localFilters.locations.filter((l) => l !== location)
      : [...localFilters.locations, location];
    setLocalFilters({ ...localFilters, locations: newLocations });
  };

  const toggleMember = (member: string) => {
    const newMembers = localFilters.members.includes(member)
      ? localFilters.members.filter((m) => m !== member)
      : [...localFilters.members, member];
    setLocalFilters({ ...localFilters, members: newMembers });
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const resetFilters = () => {
    const emptyFilters: FilterState = { categories: [], locations: [], members: [] };
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount =
    localFilters.categories.length + localFilters.locations.length + localFilters.members.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-white dark:bg-gray-900 border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header - Retro Style */}
        <div className="flex items-center justify-between p-6 border-b-4 border-black dark:border-white bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-black flex items-center gap-3 tracking-tight">
              🎯 필터 선택
            </h2>
            {activeFilterCount > 0 && (
              <p className="text-base sm:text-lg font-bold text-black mt-2 bg-white px-3 py-1 inline-block border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                ✓ {activeFilterCount}개 활성화 중
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 border-4 border-black bg-red-400 hover:bg-red-500 flex items-center justify-center font-black text-2xl text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            ✕
          </button>
        </div>

        {/* Content - Retro Style */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-gray-50 dark:bg-gray-800">
          {/* Categories */}
          <div>
            <h3 className="text-xl font-black text-black dark:text-white mb-4 flex items-center gap-3 bg-white dark:bg-gray-900 p-3 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              📁 카테고리
              {localFilters.categories.length > 0 && (
                <span className="text-sm font-black bg-blue-400 text-black px-3 py-1 border-2 border-black">
                  {localFilters.categories.length}개
                </span>
              )}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CATEGORY_OPTIONS.map((option) => {
                const isSelected = localFilters.categories.includes(option.value);
                return (
                  <button
                    key={option.value}
                    onClick={() => toggleCategory(option.value)}
                    className={`
                      p-4 border-4 border-black dark:border-white transition-all font-black
                      ${
                        isSelected
                          ? 'bg-gradient-to-br from-yellow-300 to-pink-400 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] translate-x-[2px] translate-y-[2px]'
                          : 'bg-white dark:bg-gray-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]'
                      }
                    `}
                  >
                    <div className="text-3xl mb-2">{option.icon}</div>
                    <div className="text-sm font-black text-black dark:text-white uppercase tracking-tight">
                      {option.label}
                    </div>
                    {isSelected && <div className="text-xl mt-1">✓</div>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-xl font-black text-black dark:text-white mb-4 flex items-center gap-3 bg-white dark:bg-gray-900 p-3 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
              📍 장소
              {localFilters.locations.length > 0 && (
                <span className="text-sm font-black bg-green-400 text-black px-3 py-1 border-2 border-black">
                  {localFilters.locations.length}개
                </span>
              )}
            </h3>
            <div className="space-y-4">
              {Object.entries(LOCATION_GROUPS).map(([group, locations]) => (
                <div key={group} className="bg-white dark:bg-gray-900 p-4 border-4 border-black dark:border-white">
                  <p className="text-base font-black text-black dark:text-white mb-3 uppercase tracking-wide">
                    {group}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {locations
                      .filter((loc) => availableLocations.includes(loc))
                      .map((location) => {
                        const isSelected = localFilters.locations.includes(location);
                        return (
                          <button
                            key={location}
                            onClick={() => toggleLocation(location)}
                            className={`
                              px-4 py-2 border-4 border-black dark:border-white text-sm font-black transition-all uppercase
                              ${
                                isSelected
                                  ? 'bg-green-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-[2px] translate-y-[2px]'
                                  : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                              }
                            `}
                          >
                            {location} {isSelected && '✓'}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Members */}
          {availableMembers.length > 0 && (
            <div>
              <h3 className="text-xl font-black text-black dark:text-white mb-4 flex items-center gap-3 bg-white dark:bg-gray-900 p-3 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                👥 멤버
                {localFilters.members.length > 0 && (
                  <span className="text-sm font-black bg-purple-400 text-black px-3 py-1 border-2 border-black">
                    {localFilters.members.length}개
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {availableMembers.map((member) => {
                  const isSelected = localFilters.members.includes(member);
                  return (
                    <button
                      key={member}
                      onClick={() => toggleMember(member)}
                      className={`
                        px-5 py-3 border-4 border-black dark:border-white text-base font-black transition-all uppercase
                        ${
                          isSelected
                            ? 'bg-purple-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] translate-x-[2px] translate-y-[2px]'
                            : 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                        }
                      `}
                    >
                      {member} {isSelected && '✓'}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer - Retro Action Buttons */}
        <div className="flex items-center justify-between gap-4 p-6 border-t-4 border-black dark:border-white bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300">
          <button
            onClick={resetFilters}
            className="px-6 py-3 text-base font-black border-4 border-black bg-gray-300 hover:bg-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase"
          >
            🔄 초기화
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-3 text-base font-black border-4 border-black bg-white hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase"
            >
              취소
            </button>
            <button
              onClick={applyFilters}
              className="px-8 py-3 text-base font-black border-4 border-black bg-gradient-to-r from-blue-400 to-cyan-400 hover:from-blue-500 hover:to-cyan-500 text-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all uppercase"
            >
              ✓ 적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
