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

interface PolaroidPhotoProps {
  id: string;
  src: string;          // 이미지 경로
  alt?: string;         // 접근성 텍스트
  caption: string;     // 손글씨 멘트
  rotate?: number;      // 회전 각도
  className?: string;   // 추가 클래스
  style?: CSSProperties;
}

const DEFAULT_POLAROID: PolaroidPhotoProps = {
  id: 'polaroid_default',
  src: '/system/widgets/PolaroidPhoto/wishpolaroid_temp.jpg',
  caption: 'Welcome to Wish OS!',
  rotate: -2,
  className: '',
  style: {},
};


export default function PolaroidPhotoWidget() {
  // 상태 관리
  const [data, setData] = useState<PolaroidPhotoProps>(DEFAULT_POLAROID);
  const [isLoading, setIsLoading] = useState(false);
  const [rotation, setRotation] = useState<number>(data.rotate || 0);

  // API 호출
  const fetchRandomPolaroid = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/widgets/polaroid/random');

      if (!response.ok) {
        throw new Error('Failed to fetch polaroid data');
      }

      const polaroidData: PolaroidPhotoProps = await response.json();
      setData(polaroidData);

      setRotation(Math.random() * 8 - 4); // -4도 ~ +4도 랜덤 회전
    } catch (error) {
      console.error('Error fetching polaroid data:', error);
    } finally {
      setTimeout(() => setIsLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchRandomPolaroid();
  }, []);

  return (
    <div
      className={`
        relative flex flex-col items-center
        w-48 md:w-64
        p-3 pb-8 md:p-4 md:pb-12
        bg-white
        
        /* --- 폴라로이드 종이 질감 & 그림자 --- */
        shadow-[2px_4px_15px_rgba(0,0,0,0.15)]
        rounded-[2px]
        
        /* --- 인터랙션: 호버 시 확대 및 정렬 --- */
        cursor-pointer
        transition-all duration-300 ease-out
        hover:scale-105 hover:z-50 hover:shadow-2xl hover:rotate-0
      `}
      style={{
        transform: `rotate(${rotation}deg)`,
        ...data.style,
      }}
      onClick={fetchRandomPolaroid}
    >
      {/* 테이프 장식 */}
      {/* 왼쪽 상단 테이프 */}
      <div className="
        absolute -top-5 left-1 z-20
        w-8 h-10 md:w-10 md:h-12
      bg-white/50 backdrop-blur-[1px]
        shadow-[1px_1px_3px_rgba(0,0,0,0.1)]
        -rotate-[15deg]
        pointer-events-none
        border-l border-r border-white/30
      " />

      {/* 오른쪽 상단 테이프 */}
      <div className="
        absolute -top-3 right-2 z-20
        w-12 h-6 md:w-16 md:h-8
      bg-white/40 backdrop-blur-[1px]
        shadow-[1px_1px_3px_rgba(0,0,0,0.1)]
        rotate-[5deg]
        pointer-events-none
        border-l border-r border-white/30
      " />

      {/* 사진 영역 (Inset Effect) */}
      <div className="
        relative w-full aspect-square shrink-0
        bg-gray-100
        border border-gray-200
        shadow-[inset_2px_2px_5px_rgba(0,0,0,0.05)]
        overflow-hidden
        z-10
      ">
        {isLoading ? (
          // 로딩 중 스켈레톤
          <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 gap-2">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-brand-retro-navy rounded-full animate-spin" />
            <span className="font-pixel text-[10px] text-gray-400">Loading...</span>
          </div>
        ) : (
          // 사진 이미지
          <>
            <Image
              src={data.src}
              alt={data.alt || 'Polaroid Photo'}
              fill
              sizes="(max-width: 768px) 192px, 256px"
              className="object-cover filter contrast-[1.05] brightness-[1.02]"
              draggable={false} // 드래그 방지 (위젯 이동과 충돌 방지)
            />

            {/* 사진 위 비네팅/질감 효과 */}
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-900/10 via-transparent to-blue-900/5 pointer-events-none mix-blend-overlay" />
            <div className="absolute inset-0 bg-[url('/system/wallpapers/noise.png')] opacity-[0.03] pointer-events-none" />
          </>
        )}
      </div>

      {/* 캡션 영역 (손글씨) */}
      <div className="
        mt-4 md:mt-5 w-full
        min-h-[1.5em]
        font-hand text-gray-800 text-center
        text-lg md:text-xl leading-tight
        -rotate-1
        flex items-center justify-center
      "
        style={{ fontFamily: 'var(--font-hand), cursive' }}
      >
        {isLoading ? (
          <span className="bg-gray-200 text-transparent rounded animate-pulse">
            Loading...
          </span>
        ) : (
          <span>{data.caption}</span>
        )}
      </div>

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