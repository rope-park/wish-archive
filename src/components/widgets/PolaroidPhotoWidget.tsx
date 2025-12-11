/**
 * PolaroidPhoto 컴포넌트
 * 
 * - 폴라로이드 사진 느낌의 위젯
 * - 사진, 손글씨 멘트, 테이프 장식 포함
 * - 드래그 앤 드롭 라이브러리와 연동 가능
 * - hover 시 확대 효과 포함
 */

'use client';

import Image from 'next/image';
import { CSSProperties } from 'react';

interface PolaroidPhotoProps {
  src: string;          // 이미지 경로 (필수)
  alt?: string;         // 접근성 텍스트
  caption?: string;     // 손글씨 멘트
  rotate?: number;      // 회전 각도
  tape?: boolean;       // 테이프 표시 여부
  className?: string;   // 위치 잡기용 (absolute top-10 left-20 등)
  style?: CSSProperties;
}

export default function PolaroidPhoto({
  src,
  alt = 'Polaroid Photo',
  caption = '',
  rotate = 0,
  tape = true,
  className = '',
  style,
}: PolaroidPhotoProps) {

  return (
    <div
      className={`
        relative flex flex-col items-center
        w-[230px] p-[14px] pb-4
        bg-white
        
        /* --- 폴라로이드 종이 질감 & 그림자 --- */
        shadow-[2px_4px_12px_rgba(0,0,0,0.15)]
        rounded-[2px]
        
        /* --- 인터랙션: 호버 시 확대 및 정렬 --- */
        transition-all duration-300 ease-out
        hover:scale-105 hover:z-20 hover:shadow-xl hover:rotate-0
        
        cursor-pointer
        ${className}
      `}
      style={{
        transform: `rotate(${rotate}deg)`,
        ...style,
      }}
    >
      {/* 1. 사진 영역 (Inset Effect) */}
      <div className="
        relative w-full aspect-square shrink-0
        bg-gray-200
        border border-gray-300
        
        /* ⭐️ 핵심: 사진이 종이 안으로 파묻힌 느낌 */
        shadow-[inset_2px_2px_4px_rgba(0,0,0,0.1)]
        overflow-hidden
      ">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="200px"
          className="object-cover"
          draggable={false} // 드래그 방지 (위젯 이동과 충돌 방지)
        />
        
        {/* 사진 위 은은한 광택 (Old Photo Feeling) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent pointer-events-none" />
      </div>

      {/* 2. 캡션 영역 (손글씨) */}
      {caption && (
        <div className="
          mt-3 w-full
          font-hand text-gray-800 text-center text-lg leading-tight
          /* 캡션도 살짝 삐뚤게 써야 제맛 */
          -rotate-1
        ">
          {caption}
        </div>
      )}

      {/* 3. 테이프 장식 (Option) */}
      {tape && (
        <>
          {/* 왼쪽 상단 테이프 */}
          <div className="
            absolute -top-3 left-6
            w-8 h-10
            bg-white/40 backdrop-blur-[2px]
            shadow-[1px_1px_2px_rgba(0,0,0,0.1)]
            -rotate-[15deg]
            pointer-events-none
          " />
          
          {/* 오른쪽 상단 테이프 */}
          <div className="
            absolute -top-2 right-4
            w-10 h-6
            bg-white/40 backdrop-blur-[2px]
            shadow-[1px_1px_2px_rgba(0,0,0,0.1)]
            rotate-[10deg]
            pointer-events-none
          " />
        </>
      )}
    </div>
  );
}