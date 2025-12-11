/**
 * MembersQuoteWidget 컴포넌트
 * 
 * - 멤버 캐릭터와 어록을 인터랙티브하게 보여줌
 */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MemberData {
  id: string;
  name: string;
  image: string; // 캐릭터 이미지 경로
  color: string; // 멤버 상징색 (말풍선 배경 등)
  quotes: string[]; // 어록 리스트
}

/* TODO: 실제 멤버 데이터로 교체 필요 */
const MEMBERS: MemberData[] = [
  {
    id: 'sion',
    name: 'Sion',
    image: '',
    color: 'bg-[#FFB7B2]',
    quotes: [
      "음... 배고파.",
      "리쿠야 저거 봐!",
      "오늘 연습도 화이팅!",
      "시즈니 밥 먹었어?"
    ]
  },
  {
    id: 'riku',
    name: 'Riku',
    image: '',
    color: 'bg-[#E2F0CB]',
    quotes: [
      "에?",
      "쾡! 누가 우리 누나보고 엄마래? 엄마라고 그랬어?",
      "나 귀여워?",
      "내 인생처럼 천천~히"
    ]
  },
  {
    id: 'sakuya',
    name: 'Sakuya',
    image: '/images/characters/Sakuya_wishdoll.png',
    color: 'bg-[#FF9AA2]',
    quotes: [
      "크루아상 좋아해요!",
      "뿌뿌~",
      "잠깐만여!",
      "쨔가워여",
    ]
  },
  // ... 나머지 멤버들 추가 (Yushi, Jaehee, Ryo)
];

export default function MembersQuoteWidget() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuote, setCurrentQuote] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const member = MEMBERS[currentIndex];

  // 🎲 캐릭터 랜덤 변경 핸들러
  const handleCharacterClick = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    // 현재 멤버 제외하고 랜덤 선택
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * MEMBERS.length);
    } while (nextIndex === currentIndex && MEMBERS.length > 1);

    setCurrentIndex(nextIndex);
    setCurrentQuote(null); // 어록 리셋 ('?')
    
    setTimeout(() => setIsAnimating(false), 300);
  };

  // 💬 어록 뽑기 핸들러
  const handleBubbleClick = () => {
    // 어록 랜덤 선택 (같은 어록 연속 방지 로직 추가 가능)
    const randomQuote = member.quotes[Math.floor(Math.random() * member.quotes.length)];
    setCurrentQuote(randomQuote);
  };

  return (
    <div className="
      relative w-[340px] h-[400px] 
      flex flex-col justify-end items-center gap-6 pb-10
      select-none
    ">
      
      {/* 말풍선 영역 (클릭 시 어록 등장) */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBubbleClick}
        className="
          relative w-[300px] min-h-[120px] 
          flex justify-center items-center p-6
          bg-white 
          shadow-[2px_2px_0px_0px_rgba(0,0,0,0.40),inset_1px_1px_0px_0px_rgba(255,255,255,1.00)] 
          outline outline-2 outline-offset-[-2px] outline-black
          cursor-pointer z-20
        "
      >
        <AnimatePresence mode="wait">
          {currentQuote ? (
            // A. 어록 텍스트
            <motion.p
              key={currentQuote} // 키가 바뀌면 애니메이션 다시 실행
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center text-black text-lg font-pixel leading-relaxed break-keep"
            >
              {currentQuote}
            </motion.p>
          ) : (
            // B. 물음표 (초기 상태)
            <motion.div
              key="question"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ type: "spring", stiffness: 300 }}
              className="
                text-[64px] font-pixel text-gray-300 
                drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]
              "
            >
              ?
            </motion.div>
          )}
        </AnimatePresence>

        {/* 말풍선 꼬리 (CSS로 삼각형 만들기) */}
        <div className="
          absolute -bottom-[18px] left-1/2 -translate-x-1/2
          w-0 h-0 
          border-l-[15px] border-l-transparent
          border-r-[15px] border-r-transparent
          border-t-[20px] border-t-white
          filter drop-shadow-[0_2px_0_rgba(0,0,0,1)] /* 테두리 흉내 */
        " />
        {/* 꼬리 내부 흰색 덧칠 (테두리 겹침 방지) */}
        <div className="
          absolute -bottom-[14px] left-1/2 -translate-x-1/2
          w-0 h-0 
          border-l-[12px] border-l-transparent
          border-r-[12px] border-r-transparent
          border-t-[17px] border-t-white
        " />
      </motion.div>

      {/* 캐릭터 영역 (클릭 시 멤버 교체) */}
      <motion.div
        animate={isAnimating ? { scale: 0.8, opacity: 0.5 } : { scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        onClick={handleCharacterClick}
        className="relative w-[150px] h-[150px] cursor-pointer group"
      >
        {/* 멤버별 배경 오라 (선택사항) */}
        <div className={`
          absolute inset-4 rounded-full opacity-0 group-hover:opacity-50 blur-xl transition-opacity
          ${member.color}
        `} />

        {/* 캐릭터 이미지 */}
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-contain drop-shadow-lg transition-transform group-hover:-translate-y-2"
          draggable={false}
        />
        
        {/* 클릭 유도 힌트 (호버 시 표시) */}
        <span className="
          absolute -bottom-6 left-1/2 -translate-x-1/2 
          opacity-0 group-hover:opacity-100 transition-opacity
          font-pixel text-xs text-gray-500 whitespace-nowrap bg-white/80 px-2 py-0.5 rounded-full
        ">
          Click to Change!
        </span>
      </motion.div>

    </div>
  );
}