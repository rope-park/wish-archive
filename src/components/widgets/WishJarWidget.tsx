/**
 * WishJarWidget 컴포넌트
 * 
 */

'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
//import { WritingModal } from '@/components/widgets';
import { Modal } from '../ui';

// 소원 데이터 타입
interface Wish {
    id: number;     // 사용자 ID (등록 순서대로 오름차순 부여)
    text: string;   // 소원 내용
    color: 'pink' | 'blue' | 'green' | 'yellow' | 'purple' | 'red'; // 소원 색종이 색상
    date: string;   // 작성 날짜
    x: number;      // 유리병 내 가로 위치
    y: number;      // 유리병 내 세로 위치
    rotation: number; // 회전 각도
}

export default function WishJarWidget() {
  const [wishes, setWishes] = useState<Wish[]>([]); // 저장된 소원들
  const [isWriting, setIsWriting] = useState(false); // 글쓰기 모달 상태
  const [isViewing, setIsViewing] = useState(false); // 목록 보기 상태
  const [isAnimating, setIsAnimating] = useState(false); // 종이학 날아가는 중
  const [flyingCrane, setFlyingCrane] = useState<{ color: 'pink' | 'blue' | 'yellow' | 'green' | 'purple' | 'red' } | null>(null);

  // 소원 추가 핸들러 (애니메이션 시작)
  const handleAddWish = async (text: string, color: 'pink' | 'blue' | 'yellow' | 'green' | 'purple' | 'red') => {
    setIsWriting(false); // 1. 모달 닫기
    setFlyingCrane({ color }); // 2. 날아가는 학 생성
    setIsAnimating(true); // 3. 병뚜껑 열기 신호

    // 4. 애니메이션 타이밍 조절 (1.5초 뒤에 병에 들어감)
    setTimeout(() => {
      const newWish: Wish = {
        id: wishes.length + 1,
        date: new Date().toISOString(),
        text,
        color,
        // 유리병 안쪽 영역 내 랜덤 위치 계산
        x: 30 + Math.random() * 100, 
        y: 180 + Math.random() * 40,
        rotation: Math.random() * 360,
      };
      setWishes((prev) => [...prev, newWish]); // 5. 데이터 추가
      setFlyingCrane(null); // 6. 날아가는 학 제거
      setIsAnimating(false); // 7. 병뚜껑 닫기
    }, 1500);
  };

  return (
    <div className="relative w-[300px] h-[350px]">
      
      {/* --- [1] 글쓰기 트리거 (색종이) --- */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsWriting(true)}
        className="absolute top-10 -left-4 z-20 cursor-pointer"
      >
        {/* 색종이 */}
        <div className="w-12 h-12 bg-[#FFD1DC] shadow-md border border-white/50 rotate-[-10deg] flex items-center justify-center">
          <span className="font-hand text-[10px] text-gray-600">Wish!</span>
        </div>
      </motion.button>

      {/* --- [2] 유리병 본체 (클릭 시 목록 보기) --- */}
      <div 
        className="absolute left-[50px] top-[50px] w-[242px] h-60 cursor-pointer group"
        onClick={() => !isAnimating && setIsViewing(true)}
      >
        {/* 2-1. 코르크 마개 (애니메이션 적용) */}
        <motion.div
          animate={{ 
            y: isAnimating ? -30 : 0, 
            rotate: isAnimating ? 10 : 0 
          }}
          transition={{ duration: 0.5 }}
          className="absolute left-[74px] -top-2 z-10"
        >
           {/* 코르크 이미지 */}
           <img 
             src="https://placehold.co/58x24" // 실제 코르크 이미지로 교체 필요
             className="w-[58px] h-6 rounded shadow-[0px_2px_3px_rgba(0,0,0,0.3)] bg-[#8B4513]" 
             alt="Cork"
           />
        </motion.div>

        {/* 2-2. 유리병 몸통 (앞부분 반사광 + 뒷배경) */}
        <div className="w-full h-full relative">
          {/* 유리병 쉐이프 */}
          <div className="
            absolute inset-0 
            bg-white/20 backdrop-blur-[2px] 
            rounded-xl border border-white/40
            shadow-[-5px_14px_6px_rgba(0,0,0,0.1)]
            overflow-hidden
          ">
            
            {/* [쌓인 종이학들 렌더링] */}
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="absolute w-8 h-6 transition-all"
                style={{
                  left: wish.x,
                  top: wish.y,
                  transform: `rotate(${wish.rotation}deg)`,
                }}
              >
                {/* 종이학 아이콘 (색상별 분기) */}
                <CraneIcon color={wish.color} />
              </div>
            ))}

          </div>
          
          {/* 유리병 입구 링 */}
          <div className="absolute left-[80px] top-[21px] w-[47px] h-8 bg-black/5 rounded-full border border-white/30" />
        </div>
      </div>

      {/* --- [3] 날아가는 종이학 애니메이션 --- */}
      <AnimatePresence>
        {flyingCrane && (
          <motion.div
            initial={{ x: -100, y: 0, scale: 2, opacity: 0 }} // 왼쪽(글쓰기 버튼)에서 시작
            animate={{ 
              x: 100, // 병 입구 쪽으로 이동
              y: 50, 
              scale: 0.5, 
              opacity: 1, 
              rotate: 360 
            }} 
            exit={{ y: 200, opacity: 0 }} // 병 안으로 쏙 사라짐
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-0 top-0 z-50 pointer-events-none"
          >
            <CraneIcon color={flyingCrane.color} />
          </motion.div>
        )}
      </AnimatePresence>
      
      { /** TODO: 모달 추가 필요 */}
      {/* --- [4] 모달들 --- */}
      {/* 글쓰기 모달 */}
      {/*
      <WritingModal 
        isOpen={isWriting} 
        onClose={() => setIsWriting(false)} 
        onSubmit={handleAddWish} 
      />
      */}

      {/* 목록 보기 모달 */}
      {/*
      <Modal 
        isOpen={isViewing} 
        onClose={() => setIsViewing(false)} 
        title="Wishes in the Jar"
        variant="info"
      >
        <div className="grid grid-cols-2 gap-4 max-h-[300px] overflow-y-auto p-2">
          {wishes.length === 0 ? (
            <p className="col-span-2 text-center text-gray-500 font-pixel">아직 소원이 없어요!</p>
          ) : (
            wishes.map((wish) => (
              <div key={wish.id} className={`p-2 rounded font-hand text-sm ${getColorClass(wish.color)}`}>
                {wish.text}
              </div>
            ))
          )}
        </div>
      </Modal>
      */}

    </div>
  );
}

// -----------------------------------------------------------
// [Sub Component] 종이학 아이콘 (색상 처리)
// -----------------------------------------------------------
function CraneIcon({ color }: { color: 'pink' | 'blue' | 'green' | 'yellow' | 'purple' | 'red' }) {
  // 색상별 필터 또는 이미지 교체
  const colorMap = {
    pink: 'text-[#FFD1DC]',
    blue: 'text-[#B2EBF2]',
    yellow: 'text-[#FFF9C4]',
    green: 'text-[#C8E6C9]',
    purple: 'text-[#E1BEE7]',
    red: 'text-[#FFCDD2]',
  };

  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className={`drop-shadow-sm ${colorMap[color]} stroke-gray-600 stroke-1`}>
      {/* 종이학 모양 SVG (간략화) */}
      <path d="M12 2L2 12h10l2-2 2 2h6L12 2zm0 0v20" /> 
      <path d="M2 12l10 4 10-4" />
    </svg>
  );
}

// 배경색 유틸
function getColorClass(color: string) {
  switch (color) {
    case 'pink': return 'bg-[#FFD1DC]';
    case 'blue': return 'bg-[#B2EBF2]';
    case 'yellow': return 'bg-[#FFF9C4]';
    default: return 'bg-white';
  }
}