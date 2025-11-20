/**
 * AlbumCard Component
 * 
 * WISH POP 스타일의 앨범 카드
 * - 평소: 앨범 커버만 보임
 * - 호버: 앨범 정보 오버레이 표시
 * - Y2K 감성: 굵은 테두리, 하드 섀도우
 */

import Link from 'next/link';
import Image from 'next/image';
import type { ReleaseType, Market } from '@prisma/client';

interface AlbumCardProps {
  id: string;
  slug: string;
  title: string;
  type: ReleaseType;
  market?: Market;
  releaseDate: Date;
  coverUrl?: string | null;
}

// 앨범 타입별 한글 표기
const TYPE_LABELS: Record<ReleaseType, string> = {
  STUDIO_ALBUM: 'Studio Album',
  MINI_ALBUM: 'Mini Album',
  SINGLE_ALBUM: 'Single',
  DIGITAL_SINGLE: 'Digital Single',
  PARTICIPATION: 'Participation',
};

// 앨범 타입/시장별 테마 컬러
const getAlbumColor = (type: ReleaseType, market?: Market): string => {
  // 시장별 우선 적용
  if (market === 'JAPAN') return 'bg-wish-pink';
  
  // 타입별 컬러
  switch (type) {
    case 'STUDIO_ALBUM':
      return 'bg-wish-green';
    case 'MINI_ALBUM':
      return 'bg-wish-sky';
    case 'SINGLE_ALBUM':
      return 'bg-wish-purple';
    case 'DIGITAL_SINGLE':
      return 'bg-wish-lemon';
    default:
      return 'bg-wish-mint';
  }
};

export default function AlbumCard({
  slug,
  title,
  type,
  market,
  releaseDate,
  coverUrl,
}: AlbumCardProps) {
  const themeColor = getAlbumColor(type, market);
  const typeLabel = TYPE_LABELS[type];
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(releaseDate));

  return (
    <Link 
      href={`/releases/${slug}`} 
      className="group relative block"
    >
      {/* 카드 컨테이너 - Y2K 스타일 (굵은 테두리 + 하드 섀도우) */}
      <div className="
        relative aspect-square w-full overflow-hidden rounded-2xl 
        border-[3px] border-black
        shadow-[6px_6px_0px_rgba(0,0,0,1)] 
        transition-all duration-300 
        group-hover:translate-x-0.5 group-hover:translate-y-0.5
        group-hover:shadow-[2px_2px_0px_rgba(0,0,0,1)]
        bg-gray-200
      ">
        
        {/* 앨범 커버 이미지 */}
        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-wish-sky to-wish-purple">
            <span className="text-6xl">💿</span>
          </div>
        )}

        {/* 호버 시 나타나는 오버레이 */}
        <div className={`
          absolute inset-0 
          flex flex-col items-center justify-center text-center p-4
          ${themeColor} bg-opacity-95 backdrop-blur-sm
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        `}>
          {/* 앨범 타입 배지 */}
          <span className="
            font-press-start-2p text-[8px] text-black/80 mb-3
            uppercase tracking-wider 
            border-2 border-black px-3 py-1 rounded-full bg-white
            shadow-[2px_2px_0px_rgba(0,0,0,0.3)]
          ">
            {typeLabel}
          </span>
          
          {/* 앨범 제목 */}
          <h3 className="
            font-bagel-fat-one text-2xl sm:text-3xl text-black 
            drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]
            mb-2
          ">
            {title}
          </h3>

          {/* 발매일 */}
          <p className="font-jua text-sm text-black/70 mb-4">
            {formattedDate}
          </p>
          
          {/* CTA */}
          <p className="
            font-press-start-2p text-[8px] 
            underline decoration-wavy decoration-2 underline-offset-4
            animate-pulse
          ">
            CLICK TO VIEW ➜
          </p>
        </div>

        {/* 스티커 장식 (랜덤 위치) */}
        <div className="
          absolute top-2 right-2
          opacity-0 group-hover:opacity-100
          transition-all duration-300
          rotate-12 group-hover:rotate-24
        ">
          <span className="text-2xl drop-shadow-lg">✨</span>
        </div>
      </div>
    </Link>
  );
}
