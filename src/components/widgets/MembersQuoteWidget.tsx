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

export default function MembersQuoteWidget({ scale = 1 }: { scale?: number }) {
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

  const baseWidth = 288;
  const baseHeight = 340;
  const containerWidth = baseWidth * scale;
  const containerHeight = baseHeight * scale;
  const gap = (scale >= 1 ? 24 : 16) * scale;
  const paddingBottom = (scale >= 1 ? 20 : 16) * scale;

  return (
    <div 
      className="relative flex flex-col justify-end items-center select-none"
      style={{
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        gap: `${gap}px`,
        paddingBottom: `${paddingBottom}px`,
      }}
    >

      {/* 말풍선 영역 (클릭 시 어록 등장) */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleBubbleClick}
        className="relative w-full flex justify-center items-center bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2),inset_2px_2px_0px_0px_rgba(255,255,255,1)] border-black cursor-pointer z-20"
        style={{
          minHeight: `${(scale >= 1 ? 120 : 100) * scale}px`,
          padding: `${(scale >= 1 ? 20 : 16) * scale}px`,
          borderWidth: `${2 * scale}px`,
        }}
      >
        <AnimatePresence mode="wait">
          {showQuote ? (
            <motion.p
              key="quote"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-center text-black font-pixel leading-relaxed break-keep"
              style={{ fontSize: `${(scale >= 1 ? 14 : 11) * scale}px` }}
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
              className="font-pixel text-gray-300"
              style={{ fontSize: `${(scale >= 1 ? 40 : 32) * scale}px` }}
            >
              ?
            </motion.div>
          )}
        </AnimatePresence>

        {/* 말풍선 꼬리 */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-transparent border-r-transparent border-t-black"
          style={{
            bottom: `${-14 * scale}px`,
            borderLeftWidth: `${10 * scale}px`,
            borderRightWidth: `${10 * scale}px`,
            borderTopWidth: `${14 * scale}px`,
          }}
        />
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-transparent border-r-transparent border-t-white"
          style={{
            bottom: `${-10 * scale}px`,
            borderLeftWidth: `${8 * scale}px`,
            borderRightWidth: `${8 * scale}px`,
            borderTopWidth: `${12 * scale}px`,
          }}
        />
      </motion.div>

      {/* 캐릭터 영역 (클릭 시 다른 멤버/어록으로 교체) */}
      <motion.div
        animate={isLoading ? { scale: 0.9, opacity: 0.7, y: 5 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        onClick={fetchRandomQuote}
        className="relative cursor-pointer group"
        style={{
          width: `${(scale >= 1 ? 144 : 112) * scale}px`,
          height: `${(scale >= 1 ? 144 : 112) * scale}px`,
        }}
      >
        {/* 멤버 상징색 오라 */}
        <div
          className="absolute rounded-full opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-500"
          style={{ 
            backgroundColor: data.member.colorCode || '#ddd',
            inset: `${8 * scale}px`,
          }}
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
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-full border-dashed border-gray-300 group-hover:border-gray-400 transition-colors"
            style={{ borderWidth: `${2 * scale}px` }}
          >
            <span 
              className="font-pixel text-gray-400"
              style={{ fontSize: `${40 * scale}px` }}
            >
              {data.member.stageName[0]}
            </span>
          </div>
        )}

        <span 
          className="absolute left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-pixel text-gray-500 whitespace-nowrap bg-white/90 rounded-full border border-gray-200 shadow-sm"
          style={{
            bottom: `${-16 * scale}px`,
            fontSize: `${10 * scale}px`,
            paddingLeft: `${8 * scale}px`,
            paddingRight: `${8 * scale}px`,
            paddingTop: `${2 * scale}px`,
            paddingBottom: `${2 * scale}px`,
          }}
        >
          Next Member ↻
        </span>
      </motion.div>
    </div>
  );
}