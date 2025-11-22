/**
 * Music Player Component
 * 
 * 앨범 CD 플레이어
 * - 회전하는 CD 애니메이션
 * - 앨범 커버 위에 마스킹 테이프 장식
 * - 위츄 캐릭터 등장 애니메이션
 */

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { Album } from '@prisma/client';

interface WishPlayerProps {
  album: Album;
}

export default function WishPlayer({ album }: WishPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      className="relative h-[600px] bg-linear-to-br from-[#F2F2F2] to-[#E8E8E8] rounded-3xl border-4 border-black shadow-hard-xl p-8 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* 배경 장식: 별 스티커들 */}
      <div className="absolute top-10 left-10 text-4xl text-[#DFFF00] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] -rotate-12 animate-pulse">★</div>
      <div className="absolute bottom-20 right-10 text-3xl text-wish-sky drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] rotate-12 animate-pulse" style={{ animationDelay: '0.3s' }}>★</div>
      <div className="absolute top-1/2 right-6 text-2xl text-wish-pink drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] animate-pulse" style={{ animationDelay: '0.6s' }}>★</div>

      {/* 돌아가는 CD */}
      <motion.div
        className="w-72 h-72 rounded-full shadow-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: isPlaying ? 360 : 0 }}
        transition={{
          duration: 8,
          repeat: isPlaying ? Infinity : 0,
          ease: 'linear',
        }}
      >
        {/* 실제 CD 이미지 */}
        <div className="w-full h-full rounded-full relative overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <Image
            src="/images/albums/01_wish/wish_cd.jpg"
            alt="WISH CD"
            fill
            className="object-cover"
            priority
          />
          {/* CD 홀로그램 효과 오버레이 */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/20 via-transparent to-black/10 mix-blend-overlay" />
        </div>
      </motion.div>

      {/* 앨범 커버 (CD 위에 얹어짐) */}
      <motion.div
        className="relative z-20 w-64 h-64 rounded-2xl border-4 border-white shadow-2xl cursor-pointer"
        style={{ rotate: -5 }}
        whileHover={{ rotate: 0, scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* 앨범 커버 이미지 */}
        <div className="w-full h-full bg-linear-to-br from-[#DFFF00] to-[#8EE3F5] rounded-xl overflow-hidden relative">
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-black text-white" style={{ WebkitTextStroke: '2px black' }}>
              WISH
            </span>
          </div>
        </div>

        {/* 마스킹 테이프 장식 */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-10 bg-[#DFFF00]/90 rotate-2 shadow-md backdrop-blur-sm border-2 border-black/10" />
        <div className="absolute -bottom-4 right-4 w-24 h-10 bg-wish-pink/90 -rotate-3 shadow-md backdrop-blur-sm border-2 border-black/10" />

        {/* 재생 버튼 오버레이 */}
        <motion.div
          className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
          whileHover={{ opacity: 1 }}
        >
          <motion.div
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-1.5 h-6 bg-black rounded-full" />
                <div className="w-1.5 h-6 bg-black rounded-full" />
              </div>
            ) : (
              <div className="w-0 h-0 border-t-12 border-t-transparent border-l-20 border-l-black border-b-12 border-b-transparent ml-1" />
            )}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 위츄 캐릭터 (깨알 등장) */}
      <motion.div
        className="absolute bottom-6 left-6 w-24 h-24 cursor-pointer z-30"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', bounce: 0.5 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* 위츄 이미지가 있으면 사용, 없으면 이모지 */}
        <div className="w-full h-full bg-white rounded-full border-4 border-black shadow-hard flex items-center justify-center text-5xl">
          🌟
        </div>
        <motion.div
          className="absolute -top-2 -right-2 bg-[#DFFF00] text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-black shadow-hard"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          WICHU
        </motion.div>
      </motion.div>

      {/* 플레이어 상태 표시 */}
      {isPlaying && (
        <motion.div
          className="absolute bottom-6 right-6 bg-black text-[#DFFF00] px-4 py-2 rounded-full border-2 border-[#DFFF00] font-['Press_Start_2P'] text-xs shadow-hard z-30"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          ♪ NOW PLAYING
        </motion.div>
      )}
    </motion.div>
  );
}
