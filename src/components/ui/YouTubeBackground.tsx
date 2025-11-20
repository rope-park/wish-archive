/**
 * YouTubeBackground Component
 * 
 * YouTube 뮤직비디오를 배경으로 재생
 * - 반투명 오버레이로 콘텐츠 가독성 확보
 * - 자동 재생, 무음, 반복 재생
 * - 컨트롤 숨김
 * - 최적화: preconnect, 미리 로드, 낮은 품질
 */

'use client';

import { useEffect, useRef } from 'react';

interface YouTubeBackgroundProps {
  videoUrl: string;
  opacity?: number;
}

// YouTube URL에서 비디오 ID 추출
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/,
    /youtube\.com\/watch\?.*v=([^&\?\/]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

// URL에서 시작 시간(초) 추출
function getStartTime(url: string): number {
  const match = url.match(/[?&]t=(\d+)/);
  return match ? parseInt(match[1]) : 0;
}

export default function YouTubeBackground({ videoUrl, opacity = 0.3 }: YouTubeBackgroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const videoId = getYouTubeVideoId(videoUrl);
  const startTime = getStartTime(videoUrl);
  
  // YouTube 도메인 미리 연결 (DNS prefetch)
  useEffect(() => {
    const links = [
      'https://www.youtube.com',
      'https://i.ytimg.com',
      'https://s.ytimg.com',
    ];
    
    links.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);
  
  if (!videoId) {
    return null;
  }

  // YouTube iframe embed URL with optimization parameters
  // vq=small: 낮은 화질로 빠른 로딩
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&start=${startTime}&vq=small&disablekb=1&iv_load_policy=3&cc_load_policy=0&fs=0`;

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* YouTube iframe */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        allow="autoplay; encrypted-media"
        loading="eager"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[177.77777778vh] min-w-full min-h-[56.25vw] h-[177.77777778vh] pointer-events-none"
        style={{ 
          opacity,
          border: 'none',
        }}
        title="Background Music Video"
      />
      
      {/* 어두운 오버레이 (가독성 향상) */}
      <div 
        className="absolute inset-0 bg-black"
        style={{ opacity: 0.2 }}
      />
    </div>
  );
}
