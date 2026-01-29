/**
 * UnderConstruction 컴포넌트
 * 
 * - 개발 중인 기능에 표시할 안내 화면
 * - 이전 페이지로 돌아가기 버튼 제공
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

interface UnderConstructionProps {
  onBack?: () => void;
  message?: string;
}

export default function UnderConstruction({ 
  onBack, 
  message = "이 기능은 현재 개발 중이에요.\n조금만 기다려주세요!" 
}: UnderConstructionProps) {
  
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col items-center justify-center h-full min-h-[400px] p-8 bg-white"
    >
      {/* 공사 중 이모지 */}
      <motion.div
        animate={{ 
          rotate: [0, -5, 5, -5, 0],
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="text-8xl mb-6"
      >
        🚧
      </motion.div>

      {/* 제목 */}
      <h2 className="font-pixel text-2xl md:text-3xl mb-4 text-gray-800 text-center">
        개발 중입니다
      </h2>

      {/* 메시지 */}
      <p className="font-gothic text-base md:text-lg text-gray-600 mb-8 text-center whitespace-pre-line max-w-md leading-relaxed">
        {message}
      </p>

      {/* 이전 페이지로 버튼 */}
      <Button
        variant="primary"
        onClick={handleBack}
        className="px-6 py-3 text-base font-pixel"
      >
        ← 이전 페이지로
      </Button>

      {/* 작은 안내 텍스트 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-xs text-gray-400 font-gothic"
      >
        곧 만나요! 🌟
      </motion.p>
    </motion.div>
  );
}
