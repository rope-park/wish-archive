/**
 * 🎨 Polaroid Card - 폴라로이드 스크랩북 카드
 * 
 * 시안의 "RECENT ACTIVITIES" 섹션처럼
 * 겹쳐진 폴라로이드 사진 느낌
 */

'use client';

import Image from 'next/image';
import { CSSProperties } from 'react';

interface PolaroidCardProps {
  title: string;
  date: string;
  description: string;
  imageSrc?: string;
  bgColor?: string; // Tailwind 클래스
  rotation?: string; // rotate-2, -rotate-3 등
  translateX?: string;
  translateY?: string;
  style?: CSSProperties;
  className?: string;
}

export default function PolaroidCard({
  title,
  date,
  description,
  imageSrc,
  bgColor = 'bg-wish-yellow/70',
  rotation = 'rotate-2',
  translateX = '',
  translateY = '',
  style,
  className = '',
}: PolaroidCardProps) {
  return (
    <div
      className={`
        polaroid-card
        ${bgColor} ${rotation} ${translateX} ${translateY}
        w-64 md:w-72 group
        ${className}
      `}
      style={style}
    >
      {/* 마스킹 테이프 */}
      <div className="tape"></div>

      {/* 이미지 (옵션) */}
      {imageSrc && (
        <div className="relative aspect-square w-full bg-gray-100 rounded-md mb-2 overflow-hidden border border-gray-200">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* 텍스트 */}
      <p className="font-press-start-2p text-xs text-text-dark/70 mb-1">{date}</p>
      <h3 className="font-jua text-lg text-text-dark leading-tight mb-1">{title}</h3>
      <p className="font-jersey-10 text-sm text-text-dark/80 line-clamp-2">{description}</p>

      {/* 장식 별 스티커 */}
      <span className="absolute -bottom-2 -right-2 text-2xl rotate-12 group-hover:rotate-0 transition-transform">
        ⭐
      </span>
    </div>
  );
}
