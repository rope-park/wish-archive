'use client';

import { useEffect, useState } from 'react';
import { useArchiveStore } from '@/app/stores/useArchiveStore';
import { useWindowStore } from '@/app/stores/useWindowStore';
import Image from 'next/image';
import { 
  XMarkIcon, 
  LinkIcon, 
  InformationCircleIcon,
  TagIcon,
  PhotoIcon 
} from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { Content, ExternalLink, EventType } from '@prisma/client';

// API 응답 타입 확장
interface ContentDetail extends Content {
  event?: { 
    id: string; 
    title: string; 
    type: EventType; 
    date: Date | string; // JSON Date string
    era?: { name: string };
    _count: { galleryPosts: number };
  } | null;
  album?: { title: string } | null;
  program?: { name: string } | null;
  members: { member: { stageName: string; colorCode: string | null; iconUrl: string | null } }[];
  externalLinks: ExternalLink[];
}

// 유튜브 썸네일 URL 생성 함수
const getYoutubeThumbnail = (url: string): string | null => {
  try {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/ |.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
    if (videoIdMatch && videoIdMatch[1]) {
      return `https://img.youtube.com/vi/${videoIdMatch[1]}/maxresdefault.jpg`;
    }
  } catch (e) {
    console.error('Failed to extract YouTube thumbnail', e);
  }
  return null;
}

// 유튜브 비디오 ID 추출
const getYoutubeVideoId = (url: string): string | null => {
  try {
    const videoIdMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/ |.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/);
    return videoIdMatch ? videoIdMatch[1] : null;
  } catch (e) {
    console.error('Failed to extract YouTube video ID', e);
    return null;
  }
}

// 플랫폼별 썸네일 URL 가져오기
const getThumbnailUrl = (item: ContentDetail): string | null => {
  if (item.thumbnailUrl) return item.thumbnailUrl;
  if (item.platform === 'YOUTUBE' && item.url) {
    return getYoutubeThumbnail(item.url);
  }
  return null;
};

// 플랫폼별 버튼 텍스트 및 아이콘
const getPlatformInfo = (platform: string) => {
  switch (platform) {
    case 'YOUTUBE':
      return { text: 'Open on YouTube', emoji: '▶️', color: 'hover:bg-red-500 hover:text-white' };
    case 'X':
    case 'TWITTER':
      return { text: 'Open on X', emoji: '𝕏', color: 'hover:bg-black hover:text-white' };
    case 'INSTAGRAM':
      return { text: 'Open on Instagram', emoji: '📸', color: 'hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white' };
    case 'TIKTOK':
      return { text: 'Open on TikTok', emoji: '🎵', color: 'hover:bg-black hover:text-white' };
    case 'WEVERSE':
      return { text: 'Open on Weverse', emoji: '💜', color: 'hover:bg-purple-600 hover:text-white' };
    default:
      return { text: 'Open Source', emoji: '🔗', color: 'hover:border-blue-500 hover:text-blue-600' };
  }
};

interface InspectorProps {
  onClose?: () => void;
}

export default function Inspector({ onClose }: InspectorProps) {
  const { selectedEventId, setSelectedEvent } = useArchiveStore();
  const { openWindow } = useWindowStore(); // Window Store
  const [data, setData] = useState<ContentDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // 선택된 ID가 바뀔 때마다 상세 정보 로딩
  useEffect(() => {
    if (!selectedEventId) {
      setData(null);
      setIsPlaying(false);
      return;
    }

    async function fetchDetail() {
      setLoading(true);
      setIsPlaying(false);
      try {
        const res = await fetch(`/api/archive/contents/${selectedEventId}`);
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [selectedEventId]);
  
  // 갤러리 열기 핸들러
  const handleOpenGallery = () => {
    if (!data?.event) return;
    
    // data.event.date is string from JSON
    const dateObj = new Date(data.event.date);
    const dateStr = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
    const year = dateStr.split('-')[0];
    const monthDay = dateStr.substring(5).replace('-', '');
    const safeTitle = data.event.title.replace(/[\/\s]/g, "_");
    const folderName = `${monthDay}_${safeTitle}`;
    
    // Path: nct-wish/YEAR/MMDD_Title (Logic must match API route)
    const path = `nct-wish/${year}/${folderName}`;
    
    openWindow({
      id: 'gallery',
      type: 'WISH_GALLERY',
      title: 'WISH Gallery',
      icon: '/system/icons/apps/wishgallery.png',
      props: { initialPath: path }
    });
  };

  if (!selectedEventId) return null; // 선택 없으면 숨김

  return (
    <aside 
      className="w-full h-full flex-shrink-0 bg-[#f0f0f0] border-l-2 border-white flex flex-col shadow-[-2px_0_5px_rgba(0,0,0,0.05)] font-sans z-10 transition-all" 
      role="complementary" 
      aria-label="Properties inspector"
    >
      
      {/* 1. 헤더 (닫기 버튼) */}
      <div className="flex items-center justify-between p-2 border-b border-gray-300 bg-[#ece9d8]">
        <span className="font-bold text-xs text-gray-600 flex items-center gap-1">
          <InformationCircleIcon className="w-4 h-4" /> PROPERTIES
        </span>
        <button 
          onClick={() => {
            setSelectedEvent(null);
            onClose?.();
          }}
          className="p-1 hover:bg-red-500 hover:text-white rounded-sm transition-colors"
          aria-label="Close properties panel"
          tabIndex={0}
          style={{ minWidth: '32px', minHeight: '32px' }}
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>

      {/* 2. 본문 (스크롤) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6" style={{ contain: 'none' }}>
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-48 bg-gray-300 rounded-sm"></div>
            <div className="h-4 bg-gray-300 w-3/4"></div>
            <div className="h-4 bg-gray-300 w-1/2"></div>
          </div>
        ) : data ? (
          <>
            {/* 썸네일 & 기본 정보 */}
            <div className="text-center">
              {/* ... (Existing code for thumbnail) ... */}
              <div className="relative aspect-video bg-black border-2 border-gray-400 mb-3 shadow-md">
                {isPlaying && data.platform === 'YOUTUBE' && getYoutubeVideoId(data.url) ? (
                  // YouTube iframe 플레이어
                  <div className="absolute inset-0 w-full h-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${getYoutubeVideoId(data.url)}?autoplay=1&rel=0&modestbranding=1`}
                      title={data.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                      style={{ border: 'none' }}
                    />
                  </div>
                ) : (
                  // 썸네일 (클릭 가능)
                  <button
                    onClick={() => {
                      if (data.platform === 'YOUTUBE') {
                        setIsPlaying(true);
                      }
                    }}
                    className="relative w-full h-full group cursor-pointer"
                    disabled={data.platform !== 'YOUTUBE'}
                  >
                    {getThumbnailUrl(data) ? (
                      <Image 
                        src={getThumbnailUrl(data)!} 
                        alt={data.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 320px, 320px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">NO PREVIEW</div>
                    )}
                    
                    {/* YouTube일 경우 재생 버튼 오버레이 */}
                    {data.platform === 'YOUTUBE' && getThumbnailUrl(data) && (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-red-600 rounded-full p-4 shadow-2xl transform group-hover:scale-110 transition-transform">
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </button>
                )}
              </div>
              
              <h3 className="font-bold text-lg leading-snug break-keep text-gray-800 font-sans">
                {data.title}
              </h3>
              <p className="text-xs text-gray-500 mt-1 font-mono">
                {format(new Date(data.publishedAt), 'yyyy-MM-dd HH:mm')}
              </p>
              
              {/* Event Link Button (New) */}
              {data.event && data.event._count.galleryPosts > 0 && (
                <button
                  onClick={handleOpenGallery}
                  className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 hover:border-blue-400 text-xs font-bold text-gray-700 transition-colors"
                >
                  <PhotoIcon className="w-4 h-4 text-blue-500" />
                  View Photos ({data.event._count.galleryPosts})
                </button>
              )}
            </div>

            {/* 메타 데이터 테이블 */}
            <div className="bg-white border border-gray-300 p-3 text-sm shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)]">
              <div className="grid grid-cols-[70px_1fr] gap-y-2">
                <span className="text-gray-500 text-xs font-bold">TYPE</span>
                <span className="truncate">{data.cType} / {data.platform}</span>

                <span className="text-gray-500 text-xs font-bold">ERA</span>
                <span className="truncate">{data.event?.era?.name || '-'}</span>

                <span className="text-gray-500 text-xs font-bold">EVENT</span>
                <span className="truncate" title={data.event?.title}>{data.event?.title || '-'}</span>
                
                {data.program && (
                  <>
                    <span className="text-gray-500 text-xs font-bold">PROGRAM</span>
                    <span className="truncate">{data.program.name}</span>
                  </>
                )}
              </div>
            </div>

            {/* 멤버 태그 */}
            {data.members.length > 0 && (
              <div>
                <h4 className="font-bold text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <TagIcon className="w-3 h-3" /> TAGGED MEMBERS
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {data.members.map(({ member }) => (
                    <span 
                      key={member.stageName}
                      className="px-2 py-1 bg-white border border-gray-300 rounded-full text-xs flex items-center gap-1 shadow-sm"
                    >
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: member.colorCode || '#ccc' }} 
                      />
                      {member.stageName}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 설명 (Description) */}
            {data.description && (
              <div>
                <h4 className="font-bold text-xs text-gray-500 mb-2">DESCRIPTION</h4>
                <div className="bg-white border border-gray-300 p-2 text-xs text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto font-mono leading-relaxed">
                  {data.description}
                </div>
              </div>
            )}

            {/* 외부 링크 */}
            {data.externalLinks.length > 0 && (
              <div>
                <h4 className="font-bold text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" /> RELATED LINKS
                </h4>
                <div className="space-y-1">
                  {data.externalLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="block truncate text-xs text-blue-600 hover:underline hover:bg-blue-50 p-1 rounded"
                    >
                      🔗 {link.title || link.url}
                    </a>
                  ))}
                </div>
              </div>
            )}

          </>
        ) : (
          <div className="text-center text-gray-400 text-xs py-10">
            No information available.
          </div>
        )}
      </div>

      {/* 3. 푸터 액션 버튼 */}
      {data && (() => {
        const platformInfo = getPlatformInfo(data.platform);
        return (
          <div className="p-3 border-t border-gray-300 bg-[#ece9d8] flex gap-2">
            <a
              href={data.url}
              target="_blank"
              rel="noreferrer"
              className={`flex-1 py-2.5 bg-gradient-to-b from-white to-gray-100 border-2 border-gray-400 text-center text-xs font-bold shadow-sm active:translate-y-[1px] rounded-sm transition-all flex items-center justify-center gap-2 ${platformInfo.color}`}
            >
              <span className="text-base">{platformInfo.emoji}</span>
              {platformInfo.text}
            </a>
          </div>
        );
      })()}
    </aside>
  );
}