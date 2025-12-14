/**
 * PhotoCard 컴포넌트
 * 
 * - 포토카드 랜덤 뽑기 위젯
 * - 클릭 시 카드 뒤집기
 * - 더블 클릭 시 랜덤 이미지 교체
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// 포토카드 데이터 타입
interface PhotoCard {
  id: string;
  member: string;
  album?: string;
  color: string;
  src: string;
}

const DEFAULT_CARD: PhotoCard = {
  id: 'default',
  member: 'NCT WISH',
  src: 'Welcome!',
  color: '#BBE309',
};

export default function PhotoCardWidget() {
  const [currentCard, setCurrentCard] = useState<PhotoCard>(DEFAULT_CARD);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // API 호출 함수
  const fetchRandomPhotoCard = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/widgets/photocards/random');

      if (!res.ok) throw new Error('Failed to fetch photocard');

      const data: PhotoCard = await res.json();
      setCurrentCard(data);
    } catch (error) {
      console.error('Error fetching photocard:', error);
      setCurrentCard(DEFAULT_CARD);
    } finally {
      setIsLoading(false);
    }
  };

  // 마운트 시 플래그 설정 (클라이언트 전용 효과)
  useEffect(() => {
    // ESLint 경고 방지
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    fetchRandomPhotoCard();

    return () => {
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
    };
  }, []);

  // 카드 뒤집기 핸들러
  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  // 랜덤 뽑기 핸들러
  const handleDraw = () => {
    setIsFlipped(false);

    setTimeout(() => {
      fetchRandomPhotoCard().then(() => {
        setIsFlipped(true);
      });
    }, 300);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (clickTimeoutRef.current) {
      // 더블 클릭 감지
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleDraw();
    } else {
      // 싱글 클릭 감지
      clickTimeoutRef.current = setTimeout(() => {
        handleFlip();
        clickTimeoutRef.current = null;
      }, 200);
    }
  };

  if (!isMounted) return null; // 서버 사이드 렌더링 방지

  return (
    <div
      className="group relative cursor-pointer perspective-1000"
      onClick={handleClick}
    >
      {/* 탑로더/슬리브 디자인 */}
      <div className={`
        w-52 h-[300px] p-4
        bg-white/30 backdrop-blur-sm
        rounded-xl
        shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,0.5),0px_4px_10px_rgba(0,0,0,0.1)]
        border border-white/40
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:rotate-1 hover:shadow-xl
        transform-style-3d
        ${isFlipped ? 'rotate-y-180' : ''}
      `}>

        {/* [뒷면] (Back) */}
        <div className="
          absolute inset-4 backface-hidden
          bg-brand-retro-blue rounded-lg shadow-md border-2 border-white
          flex flex-col items-center justify-center gap-2
          overflow-hidden
        ">
          <div className="absolute inset-0 bg-dither opacity-30" />
          <div className={`z-10 bg-white/20 p-3 rounded-full backdrop-blur-sm ${isLoading ? 'animate-spin' : 'animate-pulse'}`}>
            <span className="text-3xl filter drop-shadow-md">
              {isLoading ? '⏳' : '⭐'}
            </span>
          </div>
          <div className="z-10 text-center text-white/90 font-pixel">
            <p className="text-xs tracking-widest mb-1">NCT WISH</p>
            <p className="text-[9px] opacity-70">
              {isLoading ? 'Drawing...' : 'Double Click to Draw'}
            </p>
          </div>
        </div>

        {/* [앞면] (Front) */}
        <div className="
          absolute inset-4 backface-hidden rotate-y-180
          bg-white rounded-lg shadow-md border-2 border-white 
          flex flex-col overflow-hidden
        ">
          {/* 이미지 영역 */}
          <div
            className="flex-1 w-full flex items-center justify-center relative"
            style={{ backgroundColor: currentCard.color }}
          >
            {/* 실제 이미지 (유효한 경로일 때만 렌더링) */}
            {currentCard.src && (currentCard.src.startsWith('/') || currentCard.src.startsWith('http')) && (
              <Image 
                src={currentCard.src} 
                alt={currentCard.member} 
                fill 
                className="object-cover"
                draggable={false} 
              /> 
            )}

            {/* 텍스트 플레이스홀더 (이미지 없거나 유효하지 않을 때) */}
            {(!currentCard.src || (!currentCard.src.startsWith('/') && !currentCard.src.startsWith('http'))) && (
              <span className="font-pixel text-white text-3xl font-bold drop-shadow-md tracking-wider">
                {currentCard.src || currentCard.member}
              </span>
            )}

            {/* 홀로그램 효과 */}
            <div className="
              absolute inset-0 opacity-30 pointer-events-none
              bg-gradient-to-tr from-transparent via-white/60 to-transparent
              bg-[length:200%_200%] animate-shimmer
            " />
          </div>

          {/* 홀로그램 오버레이 효과 (희귀 카드 느낌) */}
          <div className="
            absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500
            bg-gradient-to-tr from-transparent via-white to-transparent
            bg-[length:200%_200%] animate-shimmer
            pointer-events-none
          " />

          {/* 하단 정보 (이름 & 출처) */}
          <div className="h-9 bg-[#1a1a1a] flex items-center justify-between px-3 shrink-0">
            <span className="font-pixel text-xs text-white tracking-widest">
              {currentCard.member}
            </span>
            {/* 출처 라벨 (앨범명 or 이벤트명) */}
            <span className="
              text-[9px] text-[#bbe309] font-pixel 
              border border-[#bbe309]/50 px-1.5 py-0.5 rounded-sm
              max-w-[100px] truncate
            ">
              {currentCard.src}
            </span>
          </div>
        </div>

      </div>

      {/* 힌트 메시지 */}
      <div className="
        absolute -bottom-10 left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none z-50
      ">
        <div className="
          bg-gray-900/90 text-white text-[10px] font-pixel 
          px-2 py-1 rounded shadow-md whitespace-nowrap
          backdrop-blur-sm
        ">
         한 번 클릭: 카드 뒤집기 / 더블 클릭: 랜덤 뽑기
        </div>
      </div>
    </div>
  );
}