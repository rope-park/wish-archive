/**
 * 🎨 StickerCard - 다꾸 스티커 카드
 * 
 * 폴라로이드 사진처럼 살짝 회전된 카드
 * 호버 시 정면으로 돌아오며 확대
 */

'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

interface StickerCardProps {
  children?: ReactNode;
  imageUrl?: string;
  imageAlt?: string;
  caption?: string;
  className?: string;
  rotate?: number;
  style?: React.CSSProperties;
}

export default function StickerCard({
  children,
  imageUrl,
  imageAlt = '',
  caption,
  className = '',
  rotate,
  style,
}: StickerCardProps) {
  const rotationClass = rotate ? `rotate-[${rotate}deg]` : '';
  
  return (
    <div className={`sticker-card ${rotationClass} ${className}`} style={style}>
      {imageUrl && (
        <div className="relative w-full aspect-square overflow-hidden rounded-md">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
          />
        </div>
      )}
      {children}
      {caption && (
        <p className="mt-2 text-center text-sm font-handwriting text-gray-700">
          {caption}
        </p>
      )}
    </div>
  );
}
