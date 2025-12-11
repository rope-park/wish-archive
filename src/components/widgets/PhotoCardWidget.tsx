/**
 * PhotoCardWidget 컴포넌트
 * 
 * - 포토카드 랜덤 뽑기 위젯
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';

// 포토카드 데이터 타입
interface PhotoCard {
  id: string;
  src: string;
  member: string; // 접근성(alt) 및 분류용
}

/* TODO: 실제 멤버 포토카드 이미지로 교체 필요 */
/* TODO: 스키마 변경을 통한 이미지 경로 데이터 추가 */
const PHOTOCARD_DATA: PhotoCard[] = [
  { id: '1', member: 'Sakuya', src: '/images/widgets/PhotoCard/Sakuya_poppop_photocard.jpg' },
];

export default function PhotoCardWidget() {
  const [currentCard, setCurrentCard] = useState<PhotoCard>(PHOTOCARD_DATA[0]);
  const [isAnimating, setIsAnimating] = useState(false);

  // 랜덤 뽑기 핸들러
  const handleDraw = () => {
    if (isAnimating) return; // 애니메이션 중 중복 클릭 방지

    setIsAnimating(true);
    
    // 0.3초 뒤(애니메이션 중간)에 이미지 교체
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PHOTOCARD_DATA.length);
      setCurrentCard(PHOTOCARD_DATA[randomIndex]);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div 
      className="group relative cursor-pointer"
      onClick={handleDraw}
    >
      {/* 탑로더/슬리브 컨테이너 */}
      <div className="
        w-60 h-[340px] p-5
        bg-white/20 backdrop-blur-[5px]
        rounded-xl
        
        /* --- 입체감 & 테두리 --- */
        shadow-[inset_1px_1px_0px_0px_rgba(255,255,255,0.80),0px_4px_10px_rgba(0,0,0,0.1)]
        outline outline-1 outline-offset-[-1px] outline-[#bfdef0]/30
        border border-white/40
        
        flex justify-center items-center
        transition-transform duration-300 ease-out
        hover:-translate-y-2 hover:rotate-1 hover:shadow-xl
      ">
        
        {/* 포토카드 이미지 */}
        <div className={`
          relative w-full h-full rounded-lg overflow-hidden shadow-md
          transition-all duration-300
          ${isAnimating ? 'scale-90 opacity-50 blur-sm' : 'scale-100 opacity-100 blur-0'}
        `}>
          <Image 
            src={currentCard.src}
            alt={`${currentCard.member} Photocard`}
            fill
            className="object-cover"
            draggable={false}
          />

          {/* 홀로그램 오버레이 효과 (희귀 카드 느낌) */}
          <div className="
            absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500
            bg-gradient-to-tr from-transparent via-white to-transparent
            bg-[length:200%_200%] animate-shimmer
            pointer-events-none
          " />
          
          {/* 하단 멤버 이름 라벨 (선택 사항) */}
          <div className="absolute bottom-2 left-0 w-full text-center">
             <span className="
               px-2 py-1 rounded-full bg-black/50 text-white 
               font-pixel text-xs backdrop-blur-sm
             ">
               {currentCard.member}
             </span>
          </div>
        </div>

      </div>

      {/* '클릭해서 포토카드 뽑기' 힌트 (호버 시 표시) */}
      <div className="
        absolute -bottom-8 left-1/2 -translate-x-1/2
        opacity-0 group-hover:opacity-100 transition-opacity
        bg-gray-800 text-white text-xs font-pixel px-2 py-1 rounded
        whitespace-nowrap pointer-events-none
      ">
        클릭해서 포토카드 뽑기
      </div>
    </div>
  );
}