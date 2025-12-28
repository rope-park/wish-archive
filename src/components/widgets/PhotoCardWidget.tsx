/**
 * PhotoCardWidget 컴포넌트
 * 
 * - 포토카드 랜덤 뽑기 위젯
 * - 클릭 시 랜덤 이미지 교체
 */

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// ----------------------------------------------------------------------
// Types & Constants
// ----------------------------------------------------------------------

// 1. API에서 받아오는 원본 데이터 타입 (API 응답 구조에 맞춤)
interface APIGalleryItem {
  id: string;
  name: string;
  src: string;
  tags?: string[];    // 핵심: tags가 있어야 멤버 식별 가능
  caption?: string;   // Context에서 가져온 캡션
}

// 2. 화면에 보여줄 포토카드 상태 타입
interface PhotoCard {
  id: string;
  member: string;     // 멤버 이름 (태그 분석 결과)
  caption: string;    // 버전/출처
  color: string;      // 멤버 상징색
  src: string;        // 이미지 URL
}

const DEFAULT_CARD: PhotoCard = {
  id: 'default',
  member: 'NCT WISH',
  caption: 'Welcome!',
  color: '#88C9F9', // Brand Blue (기본값)
  src: '',          
};

export default function PhotoCardWidget() {
  // 상태 관리
  const [currentCard, setCurrentCard] = useState<PhotoCard>(DEFAULT_CARD);
  
  // 데이터 캐싱
  const [cardList, setCardList] = useState<APIGalleryItem[]>([]);
  const [colorMap, setColorMap] = useState<Record<string, string>>({});
  
  // UI 상태
  const [isFlipped, setIsFlipped] = useState(false); // false: 뒷면(대기), true: 앞면(카드)
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ----------------------------------------------------------------------
  // 1. Data Fetching
  // ----------------------------------------------------------------------
  
  useEffect(() => {
    const initData = async () => {
      try {
        setIsLoading(true);

        const [galleryRes, membersRes] = await Promise.all([
          fetch('/api/gallery?mode=widget&tag=widget-photocard'),
          fetch('/api/members')
        ]);

        const galleryData = await galleryRes.json();
        const membersData = await membersRes.json();

        // 멤버 색상 맵핑 (DB 데이터 활용)
        const newColorMap: Record<string, string> = {};
        if (Array.isArray(membersData)) {
          membersData.forEach((m: { nameEn: string; colorCode: string }) => {
            if (m.nameEn && m.colorCode) {
              newColorMap[m.nameEn.toLowerCase()] = m.colorCode;
            }
          });
        }
        setColorMap(newColorMap);

        // 첫 카드 뽑기
        if (galleryData.items && galleryData.items.length > 0) {
          setCardList(galleryData.items);
          // 데이터 로드 직후 첫 카드 세팅
          pickRandomCard(galleryData.items, newColorMap);
          
          // 0.5초 뒤에 카드를 뒤집어서 보여줌 (등장 효과)
          setTimeout(() => setIsFlipped(true), 500);
        } else {
          // 데이터가 없어도 일단 앞면(기본값) 보여줌
          setIsFlipped(true); 
        }

      } catch (error) {
        console.error('Failed to init widget:', error);
        setIsFlipped(true);
      } finally {
        setIsLoading(false);
      }
    };

    setIsMounted(true);
    initData();
  }, []);

  // ----------------------------------------------------------------------
  // 2. Logic (Random Picker)
  // ----------------------------------------------------------------------

  const pickRandomCard = (items: APIGalleryItem[], colors: Record<string, string>) => {
    if (!items || items.length === 0) return;

    // 랜덤 선택
    const randomIndex = Math.floor(Math.random() * items.length);
    const item = items[randomIndex];

    // 태그 분석: DB에 있는 멤버 이름과 매칭되는 태그 찾기
    const tags = item.tags || [];
    const memberTag = tags.find((t: string) => colors[t.toLowerCase()] !== undefined);

    // 멤버 이름 포맷팅 (예: sion -> Sion)
    const memberName = memberTag 
      ? memberTag.charAt(0).toUpperCase() + memberTag.slice(1) 
      : 'NCT WISH';
    
    // 색상 적용 (없으면 기본색)
    const memberColor = memberTag ? colors[memberTag.toLowerCase()] : DEFAULT_CARD.color;

    // 상태 업데이트
    setCurrentCard({
      id: item.id,
      member: memberName,
      caption: item.caption || 'Special Card',
      color: memberColor,
      src: item.src
    });
  };

  // ----------------------------------------------------------------------
  // 3. Interaction Handlers
  // ----------------------------------------------------------------------

  // 클릭 핸들러: 카드 뒤집기 -> 데이터 교체 -> 다시 뒤집기
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    // 로딩 중이거나 데이터가 없으면 무시
    if (isLoading || cardList.length === 0) return;

    // 1. 뒷면으로 돌림 (애니메이션 시작)
    setIsFlipped(false);

    // 2. 카드가 뒤집힌 동안 데이터 교체
    setTimeout(() => {
      setIsLoading(true);
      
      setTimeout(() => {
        pickRandomCard(cardList, colorMap);
        setIsLoading(false);
        
        // 3. 다시 앞면으로 돌림 (새 카드 등장)
        setTimeout(() => setIsFlipped(true), 150);
      }, 400); // 로딩 연출 시간 (딜레이)
    }, 300); // 카드가 완전히 뒤집힐 때까지 대기
  };

  if (!isMounted) return null;

  return (
    <div
      className="group relative cursor-pointer perspective-1000 select-none"
      onClick={handleClick}
    >
      {/* 탑로더/슬리브 디자인 컨테이너 */}
      <div className={`
        relative
        w-40 md:w-52 aspect-[55/85]
        p-3 md:p-4
        bg-white/30 backdrop-blur-sm
        rounded-xl
        shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,0.5),0px_4px_10px_rgba(0,0,0,0.1)]
        border border-white/40
        transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275)
        transform-style-3d
        hover:-translate-y-2 hover:rotate-1 hover:shadow-xl
        ${isFlipped ? 'rotate-y-180' : ''}
      `}>

        {/* ------------------------------------------------- */}
        {/* [뒷면] (Back) - 로딩/대기 화면 */}
        {/* ------------------------------------------------- */}
        <div className="
          absolute inset-3 md:inset-4
          backface-hidden
          bg-brand-wish-blue rounded-lg
          shadow-inner border-2 border-white/80
          flex flex-col items-center justify-center gap-2
          overflow-hidden
        ">
          <div className="absolute inset-0 bg-dither opacity-20 pointer-events-none" />

          {/* 로딩 아이콘 */}
          <div className={`
            z-10 bg-white/20 p-3 rounded-full backdrop-blur-sm
            border border-white/30
            ${isLoading ? 'animate-spin' : 'animate-pulse'}
          `}>
            <span className="text-2xl md:text-3xl filter drop-shadow-md">
              {isLoading ? '⏳' : '⭐'}
            </span>
          </div>

          <div className="z-10 text-center text-white/90 font-pixel px-2">
            <p className="text-[10px] md:text-xs tracking-widest mb-1 opacity-90">NCT WISH</p>
            <p className="text-[8px] md:text-[10px] opacity-70 leading-tight">
              Drawing New Card...
            </p>
          </div>
        </div>

        {/* ------------------------------------------------- */}
        {/* [앞면] (Front) - 포토카드 결과 화면 */}
        {/* ------------------------------------------------- */}
        <div className="
          absolute inset-3 md:inset-4
          backface-hidden rotate-y-180
          bg-white rounded-lg
          shadow-md border-2 border-white 
          flex flex-col overflow-hidden
        ">
          {/* 이미지 영역 */}
          <div
            className="flex-1 w-full flex items-center justify-center relative overflow-hidden bg-gray-100"
            style={{ backgroundColor: currentCard.src ? '#f0f0f0' : currentCard.color }}
          >
            {currentCard.src ? (
              <Image
                src={currentCard.src}
                alt={currentCard.member}
                fill
                className="object-cover"
                draggable={false}
                sizes="(max-width: 768px) 200px, 300px"
              />
            ) : (
              // 이미지가 없을 때 텍스트 표시
              <span className="font-pixel text-white text-2xl md:text-3xl font-bold drop-shadow-md tracking-wider p-2 text-center">
                {currentCard.caption || currentCard.member}
              </span>
            )}

            {/* 홀로그램 효과 레이어 */}
            <div className="
              absolute inset-0 opacity-30 pointer-events-none
              bg-gradient-to-tr from-transparent via-white/40 to-transparent
              bg-[length:200%_200%] animate-shimmer
            " />
            <div className="
              absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500
              bg-gradient-to-tr from-transparent via-white to-transparent
              bg-[length:200%_200%] animate-shimmer
              pointer-events-none
            " />
          </div>

          {/* 하단 정보 (멤버이름 & 캡션) */}
          <div className="
            h-8 md:h-10
            bg-[#1a1a1a]
            flex items-center justify-between px-2 md:px-3
            shrink-0
          ">
            <span 
              className="font-pixel text-[10px] md:text-xs tracking-widest truncate max-w-[50%]"
              style={{ color: currentCard.color }} 
            >
              {currentCard.member}
            </span>

            <span className="
              text-[8px] md:text-[9px] text-gray-300 font-pixel 
              border border-gray-600 px-1.5 py-0.5 rounded-[2px]
              max-w-[45%] truncate
            ">
              {currentCard.caption}
            </span>
          </div>
        </div>

      </div>

      {/* 툴팁 (마우스 호버 시 안내) */}
      <div className="
        hidden md:block
        absolute -bottom-8 left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100 transition-opacity duration-300
        pointer-events-none z-50
      ">
        <div className="
          bg-gray-900/90 text-white text-[10px] font-pixel 
          px-2 py-1 rounded shadow-md whitespace-nowrap
          backdrop-blur-sm border-gray-700
        ">
          Click to Draw New Card
        </div>
      </div>
    </div >
  );
}