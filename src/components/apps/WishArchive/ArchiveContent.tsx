'use client';

import React, { useEffect, useState } from 'react';
import { useArchiveStore } from '@/app/stores/useArchiveStore';
import Image from 'next/image';
import { 
  PlayCircleIcon, 
  PhotoIcon, 
  CalendarDaysIcon 
} from '@heroicons/react/24/solid';
import { format, isSameMonth } from 'date-fns';
import Calendar from '@/components/ui/Calendar';

// Content 타입 정의 (API 응답 기반)
interface ContentItem {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string | null;
  cType: string;
  platform: string;
  publishedAt: string;
  event?: { title: string; type: string };
  members: { member: { stageName: string; colorCode: string | null } }[];
}

// 유튜브 썸네일 URL 생성 함수
const getYoutubeThumbnail = (url: string): string | null => {
  try {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`;
    }
  } catch (e) {
    console.error('Failed to extract YouTube thumbnail', e);
  }
  return null;
}

// 플랫폼별 썸네일 URL 가져오기
const getThumbnailUrl = (item: ContentItem): string | null => {
  // 기존 썸네일이 있으면 사용
  if (item.thumbnailUrl) return item.thumbnailUrl;
  
  // 유튜브면 URL에서 썸네일 추출
  if (item.platform === 'YOUTUBE' && item.url) {
    return getYoutubeThumbnail(item.url);
  }
  
  return null;
};

export default function ArchiveContent() {
  const { filters, viewMode, setSelectedEvent } = useArchiveStore();
  
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [calendarMonthData, setCalendarMonthData] = useState<Set<string>>(new Set());

  // 필터가 바뀌면 초기화 후 다시 로딩
  useEffect(() => {
    setPage(1);
    setContents([]);
    setHasMore(true);
    fetchContents(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]); // filters 객체 안의 값이 바뀔 때마다 실행

  // 캘린더 뷰일 때 선택된 달의 데이터 미리 로드
  useEffect(() => {
    if (viewMode === 'CALENDAR') {
      fetchCalendarMonthData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate, viewMode, filters]);

  const fetchContents = async (pageNum: number, isReset: boolean) => {
    if (!hasMore && !isReset) return;
    
    setLoading(true);
    try {
      // 쿼리 스트링 생성
      const params = new URLSearchParams();
      if (filters.eraId) params.set('eraId', filters.eraId);
      if (filters.memberIds.length > 0) params.set('memberIds', filters.memberIds.join(','));
      if (filters.categories.length > 0) params.set('categories', filters.categories.join(','));
      
      params.set('page', pageNum.toString());
      params.set('limit', '20');

      const res = await fetch(`/api/archive/contents?${params.toString()}`);
      const result = await res.json();

      if (result.data) {
        if (isReset) {
          setContents(result.data);
        } else {
          setContents(prev => [...prev, ...result.data]);
        }
        
        // 더 가져올 게 있는지 확인
        if (result.meta.page >= result.meta.lastPage) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to load contents", error);
    } finally {
      setLoading(false);
    }
  };

  // 캘린더 뷰에서 해당 월의 모든 날짜 데이터 가져오기
  const fetchCalendarMonthData = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.eraId) params.set('eraId', filters.eraId);
      if (filters.memberIds.length > 0) params.set('memberIds', filters.memberIds.join(','));
      if (filters.categories.length > 0) params.set('categories', filters.categories.join(','));
      
      // 선택된 달의 시작일과 종료일
      const startOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
      const endOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
      
      params.set('startDate', startOfMonth.toISOString());
      params.set('endDate', endOfMonth.toISOString());
      params.set('limit', '1000'); // 한 달치 전체 데이터

      const res = await fetch(`/api/archive/contents?${params.toString()}`);
      const result = await res.json();

      if (result.data) {
        // 날짜 Set 생성
        const dateSet = new Set<string>(
          result.data.map((item: ContentItem) => 
            format(new Date(item.publishedAt), 'yyyy-MM-dd')
          )
        );
        setCalendarMonthData(dateSet);
        
        // contents도 업데이트 (오른쪽 영역 표시용)
        setContents(result.data);
      }
    } catch (error) {
      console.error("Failed to load calendar month data", error);
    }
  };

  // 무한 스크롤 (간단 구현)
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchContents(nextPage, false);
    }
  };

  return (
    <main 
      className="flex-1 bg-white p-2 sm:p-4 md:p-5 overflow-y-auto overflow-x-hidden scroll-smooth"
      onScroll={handleScroll}
      role="main"
      aria-label="Content archive"
      style={{
        scrollbarWidth: 'thin',
        scrollbarColor: '#9ca3af #f3f4f6',
      }}
    >
      {/* 로딩 상태 (초기) */}
      {loading && contents.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-6 animate-fade-in">
          <div className="relative">
            <div className="w-16 h-16 border-8 border-gray-200 border-t-blue-500 rounded-full animate-spin shadow-lg" aria-label="Loading"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <PhotoIcon className="w-8 h-8 text-gray-300" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-bold text-lg mb-1">Loading Archive...</p>
            <p className="font-mono text-sm text-gray-500">Searching database</p>
          </div>
        </div>
      )}

      {/* 데이터 없음 */}
      {!loading && contents.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4 p-8 animate-fade-in">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-[inset_2px_2px_8px_rgba(0,0,0,0.1)] border-4 border-white flex items-center justify-center">
              <PhotoIcon className="w-12 h-12 opacity-30" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-2 shadow-lg border-2 border-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="text-center max-w-sm">
            <p className="font-bold text-xl mb-2 text-gray-600">No Items Found</p>
            <p className="text-sm text-gray-500 mb-4">Try adjusting your filters or search in different era</p>
            <div className="flex gap-2 justify-center text-xs">
              <span className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-full">💡 Tip: Clear filters</span>
            </div>
          </div>
        </div>
      )}

      {/* GRID 뷰 */}
      {viewMode === 'GRID' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 pb-10">
          {contents.map((item) => (
            <article 
              key={item.id} 
              className="group cursor-pointer flex flex-col gap-2.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 rounded-lg p-2 -m-2 transition-transform active:scale-[0.98] touch-manipulation"
              onClick={() => setSelectedEvent(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedEvent(item.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${item.title}`}
            >
              {/* 1. 액자 프레임 (이미지) */}
              <div className="relative w-full bg-gradient-to-br from-gray-200 to-gray-300 border-4 border-white shadow-[4px_4px_0px_rgba(0,0,0,0.25),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] overflow-hidden group-hover:shadow-[4px_4px_0px_rgba(59,130,246,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] group-focus-within:shadow-[4px_4px_0px_rgba(59,130,246,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-sm" style={{ aspectRatio: '4/3' }}>
                {getThumbnailUrl(item) ? (
                  <Image 
                    src={getThumbnailUrl(item)!} 
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                    loading="lazy"
                    quality={85}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                    <PhotoIcon className="w-12 h-12 sm:w-16 sm:h-16 opacity-30" />
                  </div>
                )}

                {/* 타입 뱃지 (우측 상단) */}
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3" aria-hidden="true">
                   {item.platform === 'YOUTUBE' ? (
                     <div className="bg-red-600 text-white p-1.5 sm:p-2 rounded shadow-lg border-2 border-white">
                       <PlayCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                     </div>
                   ) : (
                     <div className="bg-blue-500 text-white p-1.5 sm:p-2 rounded shadow-lg border-2 border-white">
                       <PhotoIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                     </div>
                   )}
                </div>

                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* 2. 메타 정보 */}
              <div className="px-1 space-y-1.5">
                <h4 className="font-bold text-sm sm:text-base leading-snug text-gray-800 font-sans group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[2.5rem]">
                  {item.title}
                </h4>
                
                <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500 font-mono">
                  <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 border border-gray-300 rounded-sm shadow-sm">
                    <CalendarDaysIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">{format(new Date(item.publishedAt), 'yy-MM-dd')}</span>
                    <span className="sm:hidden">{format(new Date(item.publishedAt), 'MM/dd')}</span>
                  </span>
                  
                  {item.event && (
                    <span className="truncate max-w-[70px] sm:max-w-[100px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-sm border border-gray-200">
                      {item.event.type}
                    </span>
                  )}
                </div>

                {/* 멤버 태그 */}
                {item.members.length > 0 && (
                  <div className="flex flex-wrap gap-1.5" aria-label="Tagged members">
                    {item.members.slice(0, 4).map(({ member }) => (
                      <span 
                        key={member.stageName}
                        className="text-[10px] sm:text-xs px-2 py-0.5 rounded-full border border-gray-300 bg-gradient-to-b from-white to-gray-50 text-gray-700 font-medium shadow-sm"
                      >
                        #{member.stageName}
                      </span>
                    ))}
                    {item.members.length > 4 && (
                      <span className="text-[10px] sm:text-xs text-gray-400 px-2 py-0.5">+{item.members.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* LIST 뷰 */}
      {viewMode === 'LIST' && (
        <div className="flex flex-col gap-1 pb-10">
          {/* 헤더 */}
          <div className="sticky top-0 bg-[#c0c0c0] border-2 border-gray-400 px-4 py-2 flex gap-4 text-xs font-bold text-gray-700 shadow-sm z-10">
            <div className="w-12">Type</div>
            <div className="flex-1">Title</div>
            <div className="w-24 hidden sm:block">Date</div>
            <div className="w-32 hidden md:block">Members</div>
            <div className="w-20 hidden lg:block">Platform</div>
          </div>
          
          {contents.map((item) => (
            <article
              key={item.id}
              className="group cursor-pointer border-2 border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-400 active:bg-blue-100 transition-colors px-4 py-2.5 flex items-center gap-4 touch-manipulation"
              onClick={() => setSelectedEvent(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedEvent(item.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${item.title}`}
            >
              {/* 아이콘 */}
              <div className="w-12 flex-shrink-0">
                {item.platform === 'YOUTUBE' ? (
                  <div className="bg-red-600 text-white p-2 rounded shadow-md border-2 border-white inline-flex">
                    <PlayCircleIcon className="w-5 h-5" />
                  </div>
                ) : (
                  <div className="bg-blue-500 text-white p-2 rounded shadow-md border-2 border-white inline-flex">
                    <PhotoIcon className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              {/* 제목 */}
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-sm truncate group-hover:text-blue-600">
                  {item.title}
                </h4>
                {item.event && (
                  <p className="text-xs text-gray-500 truncate mt-0.5">{item.event.title}</p>
                )}
              </div>
              
              {/* 날짜 */}
              <div className="w-24 hidden sm:block text-xs text-gray-600 font-mono">
                {format(new Date(item.publishedAt), 'yyyy-MM-dd')}
              </div>
              
              {/* 멤버 */}
              <div className="w-32 hidden md:flex gap-1 flex-wrap">
                {item.members.slice(0, 2).map(({ member }) => (
                  <span 
                    key={member.stageName}
                    className="text-[10px] px-1.5 py-0.5 rounded-full border border-gray-300 bg-gray-50 text-gray-700"
                  >
                    {member.stageName}
                  </span>
                ))}
                {item.members.length > 2 && (
                  <span className="text-[10px] text-gray-400">+{item.members.length - 2}</span>
                )}
              </div>
              
              {/* 플랫폼 */}
              <div className="w-20 hidden lg:block text-xs text-gray-500">
                {item.platform}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* TIMELINE 뷰 */}
      {viewMode === 'TIMELINE' && (
        <div className="relative pb-10">
          {/* 타임라인 중앙선 */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 shadow-lg" />
          
          <div className="space-y-8 md:space-y-12">
            {contents.map((item, index) => {
              const isLeft = index % 2 === 0;
              
              return (
                <article
                  key={item.id}
                  className={`relative flex items-center gap-4 md:gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* 타임라인 점 */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 -ml-3 bg-white border-4 border-blue-500 rounded-full shadow-lg z-10" />
                  
                  {/* 날짜 뱃지 (모바일은 상단, 데스크톱은 반대편) */}
                  <div className={`absolute top-0 left-16 md:static md:w-1/2 ${isLeft ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className={`inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1.5 rounded-full shadow-lg text-xs md:text-sm font-bold border-2 border-white`}>
                      <CalendarDaysIcon className="w-4 h-4" />
                      {format(new Date(item.publishedAt), 'MMM dd, yyyy')}
                    </div>
                  </div>
                  
                  {/* 콘텐츠 카드 */}
                  <div className={`w-full md:w-1/2 mt-8 md:mt-0 ml-16 md:ml-0 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`}>
                    <div
                      className="group cursor-pointer bg-white border-4 border-gray-300 rounded-lg shadow-[4px_4px_0px_rgba(0,0,0,0.2)] hover:shadow-[4px_4px_0px_rgba(59,130,246,0.5)] hover:border-blue-400 transition-all p-4 touch-manipulation"
                      onClick={() => setSelectedEvent(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedEvent(item.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${item.title}`}
                    >
                      <div className="flex gap-3">
                        {/* 썸네일 */}
                        {getThumbnailUrl(item) && (
                          <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0 border-2 border-gray-200 rounded overflow-hidden">
                            <Image 
                              src={getThumbnailUrl(item)!} 
                              alt={item.title}
                              fill
                              className="object-cover"
                              sizes="96px"
                              loading="lazy"
                            />
                          </div>
                        )}
                        
                        {/* 정보 */}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm md:text-base mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          
                          {item.event && (
                            <p className="text-xs text-gray-600 mb-2">
                              📌 {item.event.title}
                            </p>
                          )}
                          
                          {/* 멤버 */}
                          {item.members.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.members.slice(0, 3).map(({ member }) => (
                                <span 
                                  key={member.stageName}
                                  className="text-[10px] px-2 py-0.5 rounded-full border border-gray-300 bg-gray-50 text-gray-700"
                                >
                                  {member.stageName}
                                </span>
                              ))}
                              {item.members.length > 3 && (
                                <span className="text-[10px] text-gray-400 px-1">+{item.members.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        {/* 플랫폼 아이콘 */}
                        <div className="flex-shrink-0">
                          {item.platform === 'YOUTUBE' ? (
                            <div className="bg-red-600 text-white p-1.5 rounded">
                              <PlayCircleIcon className="w-5 h-5" />
                            </div>
                          ) : (
                            <div className="bg-blue-500 text-white p-1.5 rounded">
                              <PhotoIcon className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}

      {/* CALENDAR 뷰 */}
      {viewMode === 'CALENDAR' && (
        <div className="pb-10 flex flex-col lg:flex-row gap-6">
          {/* 왼쪽: 캘린더 */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-4">
              <Calendar 
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                showTodayButton={true}
                className="w-full"
                datesWithData={calendarMonthData}
              />
            </div>
          </div>
          
          {/* 오른쪽: 선택된 날짜의 콘텐츠 */}
          <div className="flex-1">
            {(() => {
              // 선택된 날짜의 콘텐츠 필터링
              const selectedDateContents = contents.filter(item => {
                const itemDate = new Date(item.publishedAt);
                return (
                  itemDate.getFullYear() === selectedDate.getFullYear() &&
                  itemDate.getMonth() === selectedDate.getMonth() &&
                  itemDate.getDate() === selectedDate.getDate()
                );
              });
              
              return (
                <div className="space-y-6">
                  {/* 선택된 날짜 헤더 */}
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 border-4 border-white shadow-lg rounded-lg">
                    <div className="flex items-center gap-3">
                      <CalendarDaysIcon className="w-6 h-6" />
                      <h3 className="text-lg font-bold">
                        {format(selectedDate, 'EEEE, MMMM dd, yyyy')}
                      </h3>
                      <span className="ml-auto bg-white/20 px-3 py-1 rounded-full text-sm">
                        {selectedDateContents.length} items
                      </span>
                    </div>
                  </div>
                  
                  {selectedDateContents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                      {selectedDateContents.map((item: ContentItem) => (
                        <article
                          key={item.id}
                          className="group cursor-pointer bg-white border-3 border-gray-300 rounded-lg shadow-md hover:shadow-xl hover:border-blue-400 transition-all p-3 touch-manipulation"
                          onClick={() => setSelectedEvent(item.id)}
                          onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedEvent(item.id);
                            }
                          }}
                          tabIndex={0}
                          role="button"
                          aria-label={`View details for ${item.title}`}
                        >
                          {/* 썸네일 */}
                          {getThumbnailUrl(item) && (
                            <div className="relative w-full h-32 mb-2 border-2 border-gray-200 rounded overflow-hidden">
                              <Image 
                                src={getThumbnailUrl(item)!} 
                                alt={item.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                loading="lazy"
                              />
                              
                              {/* 플랫폼 뱃지 */}
                              <div className="absolute top-2 right-2">
                                {item.platform === 'YOUTUBE' ? (
                                  <div className="bg-red-600 text-white p-1 rounded">
                                    <PlayCircleIcon className="w-4 h-4" />
                                  </div>
                                ) : (
                                  <div className="bg-blue-500 text-white p-1 rounded">
                                    <PhotoIcon className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                          
                          {/* 제목 */}
                          <h4 className="font-bold text-sm mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h4>
                          
                          {/* 시간 */}
                          <p className="text-xs text-gray-500 font-mono mb-2">
                            🕐 {format(new Date(item.publishedAt), 'HH:mm')}
                          </p>
                          
                          {/* 멤버 */}
                          {item.members.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {item.members.slice(0, 3).map(({ member }) => (
                                <span 
                                  key={member.stageName}
                                  className="text-[9px] px-1.5 py-0.5 rounded-full border border-gray-300 bg-gray-50 text-gray-700"
                                >
                                  {member.stageName}
                                </span>
                              ))}
                              {item.members.length > 3 && (
                                <span className="text-[9px] text-gray-400">+{item.members.length - 3}</span>
                              )}
                            </div>
                          )}
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 border-2 border-gray-300 rounded-lg">
                      <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 font-medium">No content on this date</p>
                      <p className="text-gray-400 text-sm mt-1">Select another date from the calendar</p>
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        </div>
      )}
      
      {/* 추가 로딩 인디케이터 */}
      {loading && contents.length > 0 && (
         <div className="py-8 text-center">
           <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg shadow-lg">
             <div className="w-5 h-5 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
             <span className="text-sm font-medium text-gray-600">Loading more...</span>
           </div>
         </div>
      )}
    </main>
  );
}