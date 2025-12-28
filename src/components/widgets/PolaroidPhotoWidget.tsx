/**
 * PolaroidPhotoWidget 컴포넌트
 * 
 * - 폴라로이드 사진 느낌의 위젯
 * - 사진, 손글씨 멘트, 테이프 장식 포함
 * - hover 시 확대 효과 포함
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { CSSProperties } from 'react';

// ----------------------------------------------------------------------
// Types & Constants
// ----------------------------------------------------------------------

// 1. API에서 받아오는 원본 데이터 타입
interface APIGalleryItem {
  id: string;
  name: string;
  src: string;
  tags?: string[];
  caption?: string; // Cloudinary Context
}

// 2. 화면에 보여줄 폴라로이드 상태 타입
interface PolaroidPhotoState {
  id: string;
  src: string;
  caption: string;
  rotate: number; // 회전 각도 (랜덤)
}

const DEFAULT_POLAROID: PolaroidPhotoState = {
  id: 'default',
  // 기본 이미지가 없으면 빈 문자열 (또는 로컬 placeholder 경로)
  src: '', 
  caption: 'Welcome to Wish OS!',
  rotate: -2,
};

export default function PolaroidPhotoWidget({ scale = 1 }: { scale?: number }) {
  // 상태 관리
  const [currentPhoto, setCurrentPhoto] = useState<PolaroidPhotoState>(DEFAULT_POLAROID);
  
  // 데이터 캐싱
  const [photoList, setPhotoList] = useState<APIGalleryItem[]>([]);
  
  // UI 상태
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // ----------------------------------------------------------------------
  // 1. Data Fetching
  // ----------------------------------------------------------------------
  useEffect(() => {
    const initData = async () => {
      try {
        setIsLoading(true);
        
        // 'widget-polaroid' 태그가 있는 이미지 가져오기
        const res = await fetch('/api/gallery?mode=widget&tag=widget-polaroid');
        const data = await res.json();

        if (data.items && data.items.length > 0) {
          setPhotoList(data.items);
          pickRandomPhoto(data.items);
        }
      } catch (error) {
        console.error('Failed to fetch polaroid:', error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    setIsMounted(true);
    initData();
  }, []);

  // ----------------------------------------------------------------------
  // 2. Logic
  // ----------------------------------------------------------------------

  const pickRandomPhoto = (items: APIGalleryItem[]) => {
    if (!items || items.length === 0) return;

    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];

    // -3도 ~ +3도 사이의 자연스러운 랜덤 회전
    const randomRotate = Math.random() * 6 - 3;

    setCurrentPhoto({
      id: item.id,
      src: item.src,
      caption: item.caption || 'NCT WISH', // 캡션 없으면 기본 멘트
      rotate: randomRotate,
    });
  };

  // ----------------------------------------------------------------------
  // 3. Interaction Handlers
  // ----------------------------------------------------------------------

  const handleClick = () => {
    if (isLoading || photoList.length === 0) return;

    setIsLoading(true);
    
    // 로딩 연출 후 데이터 교체
    setTimeout(() => {
      pickRandomPhoto(photoList);
      setIsLoading(false);
    }, 400);
  };

  if (!isMounted) return null;

  const baseWidth = 256;
  const baseHeight = 360;
  const containerWidth = baseWidth * scale;
  const containerHeight = baseHeight * scale;
  const padding = (scale >= 1 ? 16 : 12) * scale;
  const paddingBottom = (scale >= 1 ? 48 : 32) * scale;

  return (
    <div
      className="relative flex flex-col items-center bg-white shadow-[2px_4px_15px_rgba(0,0,0,0.15)] cursor-pointer transition-all duration-300 ease-out hover:scale-105 hover:z-50 hover:shadow-2xl hover:rotate-0 select-none"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        padding: `${padding}px`,
        paddingBottom: `${paddingBottom}px`,
        borderRadius: `${2 * scale}px`,
        transform: `rotate(${currentPhoto.rotate}deg)`,
      }}
      onClick={handleClick}
    >
      {/* ------------------------------------------------- */}
      {/* 테이프 장식 (CSS Only) */}
      {/* ------------------------------------------------- */}
      
      {/* 왼쪽 상단 테이프 */}
      <div 
        className="absolute z-20 bg-white/50 backdrop-blur-[1px] shadow-[1px_1px_3px_rgba(0,0,0,0.1)] -rotate-[15deg] pointer-events-none border-l border-r border-white/30"
        style={{
          top: `${-20 * scale}px`,
          left: `${4 * scale}px`,
          width: `${(scale >= 1 ? 40 : 32) * scale}px`,
          height: `${(scale >= 1 ? 48 : 40) * scale}px`,
        }}
      />

      {/* 오른쪽 상단 테이프 */}
      <div 
        className="absolute z-20 bg-white/40 backdrop-blur-[1px] shadow-[1px_1px_3px_rgba(0,0,0,0.1)] rotate-[5deg] pointer-events-none border-l border-r border-white/30"
        style={{
          top: `${-12 * scale}px`,
          right: `${8 * scale}px`,
          width: `${(scale >= 1 ? 64 : 48) * scale}px`,
          height: `${(scale >= 1 ? 32 : 24) * scale}px`,
        }}
      />

      {/* ------------------------------------------------- */}
      {/* 사진 영역 */}
      {/* ------------------------------------------------- */}
      <div className="
        relative w-full aspect-square shrink-0
        bg-gray-100
        border border-gray-200
        shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]
        overflow-hidden
        z-10
      ">
        {(isLoading || !currentPhoto.src) ? (
          // 로딩 중 / 이미지 없음
          <div 
            className="w-full h-full flex flex-col items-center justify-center bg-gray-50"
            style={{ gap: `${8 * scale}px` }}
          >
            <div 
              className="border-gray-300 border-t-brand-wish-blue rounded-full animate-spin"
              style={{
                width: `${32 * scale}px`,
                height: `${32 * scale}px`,
                borderWidth: `${4 * scale}px`,
              }}
            />
            <span 
              className="font-pixel text-gray-400"
              style={{ fontSize: `${10 * scale}px` }}
            >
              Loading...
            </span>
          </div>
        ) : (
          // 사진 렌더링
          <>
            <Image
              src={currentPhoto.src}
              alt={currentPhoto.caption}
              fill
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover filter contrast-[1.05] brightness-[1.02]"
              draggable={false}
            />

            {/* 사진 위 비네팅/질감 효과 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/10 via-transparent to-blue-900/5 pointer-events-none mix-blend-overlay" />
            {/* 노이즈 텍스처 (파일이 없다면 무시됨) */}
            <div className="absolute inset-0 bg-[url('/system/wallpapers/noise.png')] opacity-[0.03] pointer-events-none" />
          </>
        )}
      </div>

      {/* ------------------------------------------------- */}
      {/* 캡션 영역 (손글씨) */}
      {/* ------------------------------------------------- */}
      <div className="
        mt-4 md:mt-5 w-full
        min-h-[1.5em]
        font-hand text-gray-800 text-center
        text-lg md:text-xl leading-tight
        -rotate-1
        flex items-center justify-center
      "
      // tailwind.config.js에 font-hand가 정의되어 있다고 가정, 없을 경우 대비해 cursive 폴백
      style={{ fontFamily: 'var(--font-hand), cursive' }}
      >
        {isLoading ? (
          <span className="bg-gray-200 text-transparent rounded animate-pulse">
            Loading...
          </span>
        ) : (
          <span>{currentPhoto.caption}</span>
        )}
      </div>

      {/* ------------------------------------------------- */}
      {/* 툴팁 (Hover 시 안내) */}
      {/* ------------------------------------------------- */}
      <div className="
        absolute -bottom-8 left-1/2 -translate-x-1/2
        text-[10px] font-pixel text-white bg-black/50 px-2 py-1 rounded-2xl
        opacity-0 group-hover:opacity-100 hover:opacity-100 
        transition-opacity pointer-events-none whitespace-nowrap
        hidden md:block
      ">
        Click to change photo
      </div>
    </div>
  );
}