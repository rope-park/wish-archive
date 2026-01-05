/**
 * Timeline Component - Ultimate Enhanced Version
 * NCT WISH: Complete Activity Timeline
 * 
 * Features:
 * - Advanced multi-filter system (categories, locations, members)
 * - Timeline minimap with density visualization
 * - Stagger animations and parallax effects
 * - Today in history and highlights
 * - Mobile-optimized with touch gestures
 * - Search with history
 * - Theme/View options (compact/expanded, dark mode)
 * - Calendar view
 * - Sticky headers, scroll-to-top
 * - Skeleton loading
 * - Tags and sharing
 */

'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { Button, Spinner, Badge, Modal } from '@/components/ui';
import { EventType } from '@prisma/client';
import { CalendarView } from './CalendarView';
import { TimelineSkeleton } from './SkeletonLoader';
import { FilterPanel, FilterState } from './FilterPanel';
import { Minimap } from './Minimap';

// Types
interface TimelineEvent {
  id: string;
  date: string;
  type: EventType;
  title: string;
  location?: string | null;
  description?: string | null;
  country?: string | null;
  city?: string | null;
}

type TimelinePeriod = 'all' | 'pre-debut' | 'debut-year' | '2025';
type ViewMode = 'timeline' | 'calendar';
type ViewDensity = 'compact' | 'expanded';
type ThemeMode = 'light' | 'dark';

// Category badge configuration
const CATEGORY_CONFIG: Record<EventType, { label: string; color: 'pink' | 'green' | 'blue' | 'yellow' | 'purple' | 'lime' | 'gray'; icon: string }> = {
  [EventType.CONCERT]: { label: '공연', color: 'pink', icon: '🎤' },
  [EventType.SHOWCASE]: { label: '쇼케이스', color: 'pink', icon: '🎭' },
  [EventType.TOUR]: { label: '투어', color: 'pink', icon: '✈️' },
  [EventType.FANMEETING]: { label: '팬미팅', color: 'pink', icon: '👋' },
  [EventType.AWARD_SHOW]: { label: '시상식', color: 'pink', icon: '🏆' },
  
  [EventType.ONLINE_CONTENT]: { label: '콘텐츠', color: 'green', icon: '📺' },
  [EventType.VARIETY_SHOW]: { label: '예능', color: 'green', icon: '🎬' },
  [EventType.MUSIC_SHOW]: { label: '음악방송', color: 'green', icon: '📡' },
  
  [EventType.RELEASE]: { label: '발매', color: 'blue', icon: '💿' },
  [EventType.ANNOUNCEMENT]: { label: '공지', color: 'yellow', icon: '📢' },
  [EventType.MAGAZINE]: { label: '잡지', color: 'purple', icon: '📰' },
  [EventType.CF_AD]: { label: '광고', color: 'lime', icon: '📺' },
  [EventType.POPUP_STORE]: { label: '팝업', color: 'lime', icon: '🏪' },
  [EventType.MERCH_DROP]: { label: '굿즈', color: 'lime', icon: '🛍️' },
  [EventType.OTHER]: { label: '기타', color: 'gray', icon: '📄' },
};

// Important event types to show in timeline
const IMPORTANT_TYPES: EventType[] = [
  EventType.CONCERT,
  EventType.SHOWCASE,
  EventType.TOUR,
  EventType.FANMEETING,
  EventType.RELEASE,
  EventType.AWARD_SHOW,
  EventType.ANNOUNCEMENT,
];

export function PreDebutTimeline() {
  // State
  const [period, setPeriod] = useState<TimelinePeriod>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('timeline');
  const [viewDensity, setViewDensity] = useState<ViewDensity>('expanded');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [stickyMonth, setStickyMonth] = useState<string | null>(null);
  
  // Advanced filters
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    locations: [],
    members: [],
  });
  
  // Touch gestures
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isPullingToRefresh, setIsPullingToRefresh] = useState(false);
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Fetch events based on period
  useEffect(() => {
    async function fetchEvents() {
      try {
        setLoading(true);
        
        let url = '/api/events';
        if (period === 'pre-debut') {
          url = '/api/events?isPreDebut=true';
        } else if (period === 'debut-year') {
          url = '/api/events?month=2024';
        } else if (period === '2025') {
          url = '/api/events?month=2025';
        }
        
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to fetch events`);
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, [period]);

  // Scroll tracking for sticky header and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const scrollTop = timelineRef.current.scrollTop;
      setShowScrollTop(scrollTop > 500);
      
      // Find current month in view
      const monthElements = timelineRef.current.querySelectorAll('[data-month-key]');
      for (const el of Array.from(monthElements)) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom > 100) {
          setStickyMonth(el.getAttribute('data-month-key'));
          break;
        }
      }
    };

    const container = timelineRef.current;
    container?.addEventListener('scroll', handleScroll);
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  // Search history management
  const addToSearchHistory = (query: string) => {
    if (!query.trim() || searchHistory.includes(query)) return;
    const newHistory = [query, ...searchHistory].slice(0, 5);
    setSearchHistory(newHistory);
    localStorage.setItem('timeline-search-history', JSON.stringify(newHistory));
  };

  useEffect(() => {
    const saved = localStorage.getItem('timeline-search-history');
    if (saved) setSearchHistory(JSON.parse(saved));
  }, []);

  // Load theme preference
  useEffect(() => {
    const saved = localStorage.getItem('timeline-theme');
    if (saved) setThemeMode(saved as ThemeMode);
    
    const savedDensity = localStorage.getItem('timeline-density');
    if (savedDensity) setViewDensity(savedDensity as ViewDensity);
  }, []);

  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('timeline-theme', newTheme);
  };

  const toggleDensity = () => {
    const newDensity = viewDensity === 'compact' ? 'expanded' : 'compact';
    setViewDensity(newDensity);
    localStorage.setItem('timeline-density', newDensity);
  };

  // Filter important events and group by month with search and advanced filters
  const timelineData = useMemo(() => {
    let filtered = events.filter(e => IMPORTANT_TYPES.includes(e.type));
    
    // Apply category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(e => filters.categories.includes(e.type));
    }
    
    // Apply location filter
    if (filters.locations.length > 0) {
      filtered = filtered.filter(e => {
        const eventLoc = [e.location, e.city, e.country].filter(Boolean).join(' ');
        return filters.locations.some(loc => eventLoc.includes(loc));
      });
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.description?.toLowerCase().includes(q) ||
        e.location?.toLowerCase().includes(q) ||
        e.city?.toLowerCase().includes(q) ||
        e.country?.toLowerCase().includes(q)
      );
    }
    
    // Group by year-month
    const grouped: Record<string, TimelineEvent[]> = {};
    filtered.forEach(event => {
      const date = new Date(event.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!grouped[key]) grouped[key] = [];
      grouped[key].push(event);
    });
    
    // Sort by date within each month
    Object.keys(grouped).forEach(key => {
      grouped[key].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
    
    return grouped;
  }, [events, searchQuery, filters]);

  // Auto-generate tags for events
  const getEventTags = (event: TimelineEvent): string[] => {
    const tags: string[] = [];
    
    if (event.title.includes('첫') || event.title.includes('First')) tags.push('첫공연');
    if (event.title.includes('발매') || event.title.includes('Release')) tags.push('앨범발매');
    if (event.title.includes('데뷔') || event.title.includes('Debut')) tags.push('데뷔');
    if (event.title.includes('1위') || event.title.includes('Win')) tags.push('1위');
    if (event.title.includes('투어') || event.title.includes('Tour')) tags.push('월드투어');
    if (event.country && event.country !== '대한민국') tags.push('해외활동');
    
    return tags;
  };

  // Share functionality
  const shareEvent = async (event: TimelineEvent) => {
    const text = `${event.title} - ${new Date(event.date).toLocaleDateString('ko-KR')}`;
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: event.title, text, url });
      } catch {
        // Fallback to clipboard
        copyToClipboard(`${text}\n${url}`);
      }
    } else {
      copyToClipboard(`${text}\n${url}`);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('클립보드에 복사되었습니다!');
    });
  };

  // Get related events (same type or same month)
  const getRelatedEvents = (event: TimelineEvent, allEvents: TimelineEvent[]): TimelineEvent[] => {
    const eventDate = new Date(event.date);
    const eventMonth = `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, '0')}`;
    
    return allEvents
      .filter(e => 
        e.id !== event.id && 
        (e.type === event.type || e.date.startsWith(eventMonth))
      )
      .slice(0, 3);
  };

  // Scroll to top
  const scrollToTop = () => {
    timelineRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Jump to specific month (for minimap)
  const jumpToMonth = useCallback((month: string) => {
    const element = timelineRef.current?.querySelector(`[data-month="${month}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setStickyMonth(month);
    }
  }, []);

  // Touch gesture handlers for mobile swipe navigation
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    
    // Pull to refresh detection
    if (timelineRef.current && timelineRef.current.scrollTop === 0) {
      setIsPullingToRefresh(true);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    const sortedKeys = Object.keys(timelineData).sort();
    const currentIndex = sortedKeys.indexOf(stickyMonth || sortedKeys[0]);
    
    if (isLeftSwipe && currentIndex < sortedKeys.length - 1) {
      jumpToMonth(sortedKeys[currentIndex + 1]);
      // Haptic feedback
      if ('vibrate' in navigator) navigator.vibrate(10);
    } else if (isRightSwipe && currentIndex > 0) {
      jumpToMonth(sortedKeys[currentIndex - 1]);
      if ('vibrate' in navigator) navigator.vibrate(10);
    }
    
    setIsPullingToRefresh(false);
  };

  // Get sorted month keys
  const sortedMonths = useMemo(() => {
    return Object.keys(timelineData).sort();
  }, [timelineData]);

  // Get today in history
  const todayInHistory = useMemo(() => {
    const today = new Date();
    const todayMD = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    
    return events.filter((event) => {
      const eventMD = event.date.substring(5, 10);
      return eventMD === todayMD && new Date(event.date).getFullYear() !== today.getFullYear();
    });
  }, [events]);

  // Get upcoming events (next 7 days from current date)
  const upcomingEvents = useMemo(() => {
    const now = new Date();
    const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return events
      .filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate >= now && eventDate <= weekFromNow;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 3);
  }, [events]);

  // Get available locations for filters
  const availableLocations = useMemo(() => {
    const locations = new Set<string>();
    events.forEach((event) => {
      if (event.location) locations.add(event.location);
      if (event.city) locations.add(event.city);
      if (event.country) locations.add(event.country);
    });
    return Array.from(locations);
  }, [events]);

  const availableMembers = useMemo(() => {
    return ['SION', 'RIKU', 'YUSHI', 'JAEHEE', 'RYO', 'SAKUYA'];
  }, []);

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Spinner size="lg" />
        <p className="mt-4 text-xs text-gray-500">Loading Timeline...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 text-red-600">
        <div className="text-4xl mb-2">⚠️</div>
        <p className="text-sm">Error: {error}</p>
      </div>
    );
  }

  const totalEvents = sortedMonths.reduce((sum, month) => sum + timelineData[month].length, 0);

  const bgColor = themeMode === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-br from-gray-50 to-gray-100';
  const textColor = themeMode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const cardBg = themeMode === 'dark' ? 'bg-gray-800' : 'bg-white';
  const borderColor = themeMode === 'dark' ? 'border-gray-700' : 'border-gray-200';

  if (loading) {
    return (
      <div className={`h-full flex flex-col ${bgColor}`}>
        <TimelineSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`h-full flex flex-col items-center justify-center ${bgColor} ${textColor}`}>
        <div className="text-4xl mb-2">⚠️</div>
        <p className="text-sm">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className={`h-full flex flex-col ${bgColor} ${textColor} transition-colors duration-300`}>
      {/* Today in History Alert - Retro Banner */}
      {todayInHistory.length > 0 && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 border-b-4 border-black dark:border-white shadow-[0_8px_0_0_rgba(0,0,0,1)] dark:shadow-[0_8px_0_0_rgba(255,255,255,1)]">
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl sm:text-3xl">🎉</div>
              <div className="flex-1">
                <div className="text-base sm:text-xl font-black text-black uppercase tracking-tight">
                  오늘의 역사
                </div>
                <div className="text-xs sm:text-sm font-bold text-black mt-1">
                  {todayInHistory[0].title} ({new Date(todayInHistory[0].date).getFullYear()}년)
                  {todayInHistory.length > 1 && ` 외 ${todayInHistory.length - 1}건`}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedEvent(todayInHistory[0]);
                  setIsModalOpen(true);
                }}
                className="text-sm font-black bg-black text-white px-4 py-2 border-3 border-white shadow-[3px_3px_0_0_rgba(255,255,255,1)] hover:shadow-[1px_1px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase"
              >
                보기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upcoming Events Alert - Retro Banner */}
      {upcomingEvents.length > 0 && (
        <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 border-b-4 border-black dark:border-white shadow-[0_8px_0_0_rgba(0,0,0,1)] dark:shadow-[0_8px_0_0_rgba(255,255,255,1)]">
          <div className="p-4 sm:p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-2xl sm:text-3xl">⏰</div>
              <div className="flex-1">
                <div className="text-base sm:text-xl font-black text-black uppercase tracking-tight">
                  다가오는 이벤트
                </div>
                <div className="text-xs sm:text-sm font-bold text-black mt-1">
                  {upcomingEvents[0].title} (
                  {new Date(upcomingEvents[0].date).toLocaleDateString('ko-KR', { month: 'short', day: 'numeric' })})
                  {upcomingEvents.length > 1 && ` 외 ${upcomingEvents.length - 1}건`}
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedEvent(upcomingEvents[0]);
                  setIsModalOpen(true);
                }}
                className="text-sm font-black bg-black text-white px-4 py-2 border-3 border-white shadow-[3px_3px_0_0_rgba(255,255,255,1)] hover:shadow-[1px_1px_0_0_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase"
              >
                보기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pull to Refresh Indicator */}
      {isPullingToRefresh && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-gray-800 rounded-full shadow-lg px-4 py-2 flex items-center gap-2">
          <div className="animate-spin">🔄</div>
          <span className="text-sm font-medium">새로고침 중...</span>
        </div>
      )}

      {/* Enhanced Toolbar */}
      <div className={`shrink-0 border-b-2 ${borderColor} ${cardBg} shadow-sm transition-colors`}>
        <div className="p-3 sm:p-4 space-y-3">
          {/* Row 1: Period + View Mode + Theme + Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Period Filters */}
            <div className="flex gap-1">
              {[
                { key: 'all', label: '전체' },
                { key: 'pre-debut', label: '프리데뷔' },
                { key: 'debut-year', label: '2024' },
                { key: '2025', label: '2025' },
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  size="sm"
                  onClick={() => setPeriod(key as TimelinePeriod)}
                  className={`text-xs sm:text-sm transition-all ${
                    period === key ? 'font-bold shadow-inner scale-95' : 'hover:scale-105'
                  }`}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="h-5 w-px bg-gray-300" />

            {/* View Mode Toggle */}
            <div className="flex gap-1">
              <Button
                size="sm"
                onClick={() => setViewMode('timeline')}
                className={`text-xs ${viewMode === 'timeline' ? 'font-bold' : ''}`}
                title="타임라인 뷰"
              >
                📋
              </Button>
              <Button
                size="sm"
                onClick={() => setViewMode('calendar')}
                className={`text-xs ${viewMode === 'calendar' ? 'font-bold' : ''}`}
                title="캘린더 뷰"
              >
                📅
              </Button>
            </div>

            {/* Density Toggle */}
            {viewMode === 'timeline' && (
              <Button
                size="sm"
                onClick={toggleDensity}
                className="text-xs"
                title={viewDensity === 'compact' ? '확장 뷰' : '컴팩트 뷰'}
              >
                {viewDensity === 'compact' ? '⊟' : '⊞'}
              </Button>
            )}

            {/* Theme Toggle */}
            <Button
              size="sm"
              onClick={toggleTheme}
              className="text-xs"
              title={themeMode === 'dark' ? '라이트 모드' : '다크 모드'}
            >
              {themeMode === 'dark' ? '☀️' : '🌙'}
            </Button>

            {/* Advanced Filter Button - Retro Style with Label */}
            <button
              onClick={() => setShowFilterPanel(true)}
              className={`
                px-4 py-2 border-4 border-black dark:border-white text-sm font-black transition-all flex items-center gap-2 uppercase
                ${filters.categories.length + filters.locations.length > 0 
                  ? 'bg-gradient-to-r from-blue-400 to-cyan-400 text-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] translate-x-[1px] translate-y-[1px]' 
                  : 'bg-white dark:bg-gray-700 text-black dark:text-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                }
              `}
              title="고급 필터"
            >
              <span>🎯</span>
              <span className="hidden sm:inline">필터</span>
              {(filters.categories.length + filters.locations.length > 0) && (
                <span className="text-xs bg-black text-white px-2 py-0.5 border-2 border-white font-black">
                  {filters.categories.length + filters.locations.length}
                </span>
              )}
            </button>

            <div className="ml-auto text-xs sm:text-sm font-bold opacity-70">
              {totalEvents}개
            </div>
          </div>

          {/* Row 2: Search */}
          <div className="relative">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSearchHistory(true)}
                onBlur={() => setTimeout(() => setShowSearchHistory(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    addToSearchHistory(searchQuery);
                  }
                }}
                placeholder="🔍 제목, 설명, 장소로 검색..."
                className={`
                  w-full px-3 py-2 pr-20 rounded-lg border-2 text-sm
                  ${themeMode === 'dark' ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300'}
                  focus:outline-none focus:border-blue-500 transition-colors
                `}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Search History Dropdown */}
            {showSearchHistory && searchHistory.length > 0 && !searchQuery && (
              <div className={`absolute top-full left-0 right-0 mt-1 ${cardBg} border-2 ${borderColor} rounded-lg shadow-lg z-50 overflow-hidden`}>
                <div className="p-2 text-xs opacity-70 border-b ${borderColor}">최근 검색</div>
                {searchHistory.map((query, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(query)}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                  >
                    🕒 {query}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <p className="text-[10px] sm:text-xs opacity-60">
            💡 {viewMode === 'calendar' ? '날짜를 클릭하여 이벤트를 확인하세요' : '중요한 활동만 표시됩니다'}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        ref={timelineRef} 
        className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 relative"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <CalendarView
            events={Object.values(timelineData).flat()}
            onEventClick={(event) => {
              setSelectedEvent(event);
              setIsModalOpen(true);
            }}
            categoryConfig={CATEGORY_CONFIG}
          />
        )}

        {/* Timeline View */}
        {viewMode === 'timeline' && (
          <div className="max-w-4xl mx-auto relative">
            {/* Sticky Month Header */}
            {stickyMonth && (
              <div className={`sticky top-0 z-30 ${cardBg} border-b-2 ${borderColor} px-4 py-2 mb-4 shadow-md animate-fade-in`}>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-black">
                      {new Date(stickyMonth + '-01').getMonth() + 1}월
                    </span>
                  </div>
                  <h3 className="text-sm font-bold">
                    {new Date(stickyMonth + '-01').toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                  </h3>
                </div>
              </div>
            )}

            {/* Vertical Line */}
            <div className="absolute left-3 sm:left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300" />

            {/* Timeline Events */}
            <div className="space-y-4 sm:space-y-6">
              {sortedMonths.map((monthKey) => {
                const monthEvents = timelineData[monthKey];
                if (monthEvents.length === 0) return null;

                return (
                  <div key={monthKey} className="relative" data-month={monthKey}>
                    {/* Month Header */}
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 pl-8 sm:pl-10">
                      <div className="absolute left-0 w-7 h-7 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white dark:ring-gray-800 z-10">
                        <span className="text-white text-xs sm:text-sm font-black">
                          {new Date(monthKey + '-01').getMonth() + 1}월
                        </span>
                      </div>
                      <h3 className={`text-base sm:text-lg font-bold ${textColor}`}>
                        {new Date(monthKey + '-01').toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                      </h3>
                      <div className="text-xs sm:text-sm opacity-60">
                        ({monthEvents.length}개)
                      </div>
                    </div>

                    {/* Events for this month */}
                    <div className={`space-y-2 ${viewDensity === 'compact' ? 'sm:space-y-2' : 'sm:space-y-3'}`}>
                      {monthEvents.map((event, idx) => {
                        const config = CATEGORY_CONFIG[event.type];
                        const tags = getEventTags(event);
                        const isCompact = viewDensity === 'compact';
                        const eventDate = new Date(event.date);
                        
                        return (
                          <div
                            key={event.id}
                            className="ml-8 sm:ml-10 group cursor-pointer animate-stagger-fade-in"
                            style={{
                              animationDelay: `${idx * 50}ms`,
                              animationFillMode: 'backwards',
                            }}
                            onClick={() => {
                              setSelectedEvent(event);
                              setIsModalOpen(true);
                            }}
                          >
                            <div className={`
                              relative ${cardBg} rounded-lg shadow-md hover:shadow-xl 
                              transition-all duration-300 border-l-4
                              ${isCompact ? 'p-2 sm:p-3' : 'p-3 sm:p-4'}
                              hover:scale-[1.02] hover:-translate-y-0.5
                              group-hover:rotate-[0.5deg]
                            `}
                              style={{ borderLeftColor: config.color }}
                            >
                              {/* Event Card Content */}
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <Badge color={config.color} className="text-xs">
                                      {config.icon} {config.label}
                                    </Badge>
                                    <span className="text-xs sm:text-sm opacity-60">
                                      {eventDate.toLocaleDateString('ko-KR', {
                                        month: 'numeric',
                                        day: 'numeric',
                                      })}
                                    </span>
                                  </div>
                                  
                                  <h4 className={`
                                    font-bold text-gray-800 dark:text-gray-100 mb-1 
                                    group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors
                                    ${isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base'}
                                  `}>
                                    {event.title}
                                  </h4>
                                  
                                  {!isCompact && event.description && (
                                    <p className="text-xs sm:text-sm opacity-70 line-clamp-2 mb-2">
                                      {event.description}
                                    </p>
                                  )}
                                  
                                  {event.location && (
                                    <div className="flex items-center gap-1 mt-1 text-xs opacity-60">
                                      <span>📍</span>
                                      <span className="truncate">{event.location}</span>
                                    </div>
                                  )}

                                  {/* Tags */}
                                  {tags.length > 0 && !isCompact && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {tags.map((tag, i) => (
                                        <span key={i} className="text-[10px] px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex flex-col items-center gap-2">
                                  <div className="text-2xl group-hover:scale-110 transition-transform">
                                    {config.icon}
                                  </div>
                                  {!isCompact && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        shareEvent(event);
                                      }}
                                      className="text-sm opacity-50 hover:opacity-100 transition-opacity"
                                      title="공유"
                                    >
                                      🔗
                                    </button>
                                  )}
                                </div>
                              </div>

              {/* Hover Indicator */}
                              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs">
                                상세보기 →
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {sortedMonths.length === 0 && (
                <div className="text-center py-12 opacity-60">
                  <div className="text-4xl mb-2">
                    {searchQuery ? '🔍' : '📭'}
                  </div>
                  <p className="text-sm">
                    {searchQuery ? `"${searchQuery}"에 대한 검색 결과가 없습니다` : '해당 기간에 이벤트가 없습니다'}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className={`
              fixed bottom-6 right-6 w-12 h-12 
              ${cardBg} ${borderColor} border-2
              rounded-full shadow-lg 
              flex items-center justify-center
              hover:scale-110 transition-all
              z-40 animate-fade-in
            `}
            title="맨 위로"
          >
            <span className="text-xl">⬆️</span>
          </button>
        )}
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedEvent(null);
          }}
          title={selectedEvent.title}
          variant="info"
          className="!max-w-2xl !max-h-[90vh]"
        >
          <div className="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
            {/* Header */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-gray-200">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge color={CATEGORY_CONFIG[selectedEvent.type].color} className="text-xs">
                  {CATEGORY_CONFIG[selectedEvent.type].icon} {CATEGORY_CONFIG[selectedEvent.type].label}
                </Badge>
                <span className="text-sm text-gray-600">
                  {new Date(selectedEvent.date).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                  })}
                </span>
              </div>
              <button
                onClick={() => shareEvent(selectedEvent)}
                className="text-sm px-3 py-1 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
              >
                🔗 공유
              </button>
            </div>

            {/* Tags */}
            {getEventTags(selectedEvent).length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">🏷️ 태그</p>
                <div className="flex flex-wrap gap-2">
                  {getEventTags(selectedEvent).map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full border border-blue-200 dark:border-blue-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {selectedEvent.location && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-bold text-gray-500 mb-1">📍 장소</p>
                <p className="text-sm text-gray-900">
                  {selectedEvent.location}
                  {selectedEvent.city && `, ${selectedEvent.city}`}
                  {selectedEvent.country && ` (${selectedEvent.country})`}
                </p>
              </div>
            )}

            {/* Description */}
            {selectedEvent.description && (
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs font-bold text-gray-500 mb-1">📝 상세 정보</p>
                <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                  {selectedEvent.description}
                </p>
              </div>
            )}

            {/* Related Events */}
            {getRelatedEvents(selectedEvent, Object.values(timelineData).flat()).length > 0 && (
              <div>
                <p className="text-xs font-bold text-gray-500 mb-2">🔗 관련 이벤트</p>
                <div className="space-y-2">
                  {getRelatedEvents(selectedEvent, Object.values(timelineData).flat())
                    .slice(0, 3)
                    .map((related, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setSelectedEvent(related);
                        }}
                        className="w-full text-left p-2 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{CATEGORY_CONFIG[related.type].icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {related.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(related.date).toLocaleDateString('ko-KR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Minimap */}
      <Minimap
        events={events}
        currentMonth={stickyMonth}
        onMonthClick={jumpToMonth}
        categoryConfig={CATEGORY_CONFIG}
      />

      {/* Filter Panel */}
      {showFilterPanel && (
        <FilterPanel
          filters={filters}
          onFilterChange={setFilters}
          availableLocations={availableLocations}
          availableMembers={availableMembers}
          onClose={() => setShowFilterPanel(false)}
        />
      )}    </div>
  );
}