/**
 * MembersQuoteWidget 컴포넌트
 * 
 * - 멤버 캐릭터와 어록을 인터랙티브하게 보여줌
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface QuoteData {
  id: string;
  content: string;
  member: {
    stageName: string;
    characterUrl: string;
    colorCode?: string;
  };
}

export default function MembersQuoteWidget() {
  // 상태 관리
  const [data, setData] = useState<QuoteData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // 랜덤 어록 가져오기
  const fetchRandomQuote = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    setShowQuote(false); // 말풍선 닫기 (새로운 캐릭터 등장 효과)

    try {
      const res = await fetch('/api/widgets/quotes/random');
      if (res.ok) {
        const newData = await res.json();
        // 짧은 딜레이 후에 데이터 설정 및 말풍선 열기
        setTimeout(() => {
          setData(newData);
          setIsLoading(false);
          setShowQuote(true);
        }, 400);
      } else {
        throw new Error('Failed to fetch quote');
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
      setIsLoading(false);
    }
  }, [isLoading]);

  // 초기 로드 시 어록 가져오기
  useEffect(() => {
    setIsMounted(true);
    fetchRandomQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBubbleClick = () => {
    setShowQuote(prev => !prev);
  };

  if (!isMounted) return null;

  if (!data && isLoading) {
    return (
      <div className="
        w-full max-m-[340px] aspect-[17/20] flex items-end justify-center pb-10">
        <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="
      relative
      w-56 md:w-72 aspect-[17/20]
      flex flex-col justify-end items-center
      gap-4 md:gap-6 
      pb-4 md:pb-5
      select-none
    ">

      {/* 말풍선 영역 (클릭 시 어록 등장) */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBubbleClick}
        className="
          relative w-full min-h-[100px] md:min-h-[120px]
          flex justify-center items-center
          p-4 sm:p-5
          bg-white 
          shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2),inset_2px_2px_0px_0px_rgba(255,255,255,1)] 
          border-2 border-black
          cursor-pointer z-20
        "
      >
        <AnimatePresence mode="wait">
          {showQuote ? (
            <motion.p
              key="quote"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="
                text-center text-black font-pixel leading-relaxed break-keep
                text-sm md:text-base
                "
            >
              {data.content}
            </motion.p>
          ) : (
            <motion.div
              key="question"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-5xl font-pixel text-gray-300"
            >
              ?
            </motion.div>
          )}
        </AnimatePresence>

        {/* 말풍선 꼬리 */}
        <div className="
          absolute -bottom-[14px] left-1/2 -translate-x-1/2
          w-0 h-0 
          border-l-[10px] border-l-transparent
          border-r-[10px] border-r-transparent
          border-t-[14px] border-t-black
        " />
        <div className="
          absolute -bottom-[10px] left-1/2 -translate-x-1/2
          w-0 h-0
          border-l-[8px] border-l-transparent
          border-r-[8px] border-r-transparent
          border-t-[12px] border-t-white
        " />
      </motion.div>

      {/* 캐릭터 영역 (클릭 시 다른 멤버/어록으로 교체) */}
      <motion.div
        animate={isLoading ? { scale: 0.9, opacity: 0.7, y: 5 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={fetchRandomQuote}
        className="
          relative
          w-28 h-28 md:w-36 md:h-36
          cursor-pointer group
          "
      >
        {/* 멤버 상징색 오라 */}
        <div
          className="
            absolute inset-2 rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500
            "
          style={{ backgroundColor: data.member.colorCode || '#ddd' }}
        />

        {/* 캐릭터 이미지 (없으면 이니셜) */}
        {data.member.characterUrl ? (
          <Image
            src={data.member.characterUrl}
            alt={data.member.stageName}
            fill
            className="object-contain drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1"
            draggable={false}
          />
        ) : (
          <div className="
            absolute inset-0 flex items-center justify-center
            bg-gradient-to-br from-gray-100 to-gray-200
            rounded-full border-2 border-dashed border-gray-300
            group-hover:border-gray-400 transition-colors
          ">
            <span className="font-pixel text-4xl text-gray-400">
              {data.member.stageName[0]}
            </span>
          </div>
        )}

        <span className="
          absolute -bottom-4 left-1/2 -translate-x-1/2 
          opacity-0 group-hover:opacity-100 transition-opacity
          font-pixel text-[10px] text-gray-500 whitespace-nowrap
          bg-white/90 px-2 py-0.5 rounded-full border border-gray-200
          shadow-sm
        ">
          Next Member ↻
        </span>
      </motion.div>
    </div>
  );
}