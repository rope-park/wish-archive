/**
 * DDayCounterWidget 컴포넌트
 * 
 * - 목표 날짜까지 남거나 지난 일수를 계산하여 표시
 * - 사용자 정의 라벨과 날짜 설정 가능
 */

'use client';

import { useState, useEffect } from 'react';

interface DDayData {
  date: string | Date;
  label: string;
}

interface DDayCounterProps {
  targetDate?: string | Date  // 목표 날짜 (YYYY-MM-DD)
  label?: string;             // 라벨 (예: Debut)
  className?: string;
}

export default function DDayCounterWidget({
  targetDate,
  label,
  className = '',
}: DDayCounterProps) {
  // 상태 관리
  const [data, setData] = useState<DDayData | null>(null);
  const [dDayString, setDDayString] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // 1. 데이터 로드 (Props 우선 -> 없으면 API에서 불러오기)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    const initData = async () => {
      setIsLoading(true);

      if (targetDate && label) {
        // Props로 받은 경우
        setData({ date: targetDate, label });
        setIsLoading(false);
      } else {
        // API에서 불러오기
        try {
          const res = await fetch('/api/widgets/dday');
          if (!res.ok) throw new Error('Failed to fetch');
          const fetchedData = await res.json();
          setData(fetchedData);
        } catch (error) {
          console.error('Error fetching D-Day data:', error);
          setData({ date: '2024-02-21', label: 'Debut' }); // 기본값
        } finally {
          setIsLoading(false);
        }
      }
    };

    initData();
  }, [targetDate, label]);

  // 2. D-Day 계산
  useEffect(() => {
    if (!data?.date) return;

    const calculateDDay = () => {
      const target = new Date(data.date);
      const today = new Date();

      // 시간차 제거
      target.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);

      const diffTime = today.getTime() - target.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      // 포맷팅
      if (diffDays === 0) return 'D-Day';
      if (diffDays > 0) return `D+${diffDays}`;
      return `D${diffDays}`; // 음수이므로 '-' 포함됨
    };

    setDDayString(calculateDDay());
  }, [data]);

  if (!isMounted) return null;

  return (
    <div className={`
      relative w-40 h-[70px]
      select-none cursor-default
      ${className}`}
    >
      {/* 외관 (회색 플라스틱 케이스) */}
      <div className="
        absolute inset-0 
        bg-[#c9bebe] rounded-full
        shadow-[0px_4px_6px_rgba(0,0,0,0.15),inset_0px_2px_2px_rgba(255,255,255,0.9),inset_0px_-2px_4px_rgba(0,0,0,0.05)]
        border border-gray-400
      " />

      {/* 내부 블랙 스크린 (LED 패널) */}
      <div className="
        absolute top-[14px] left-1/2 -translate-x-1/2
        w-[124px] h-[42px]
        bg-[#1A1A1A] rounded-full 
        border-2 border-gray-400
        overflow-hidden
        flex items-center justify-center
        shadow-inner
      ">
        {/* 스크린 내부의 어두운 배경 (깊이감) */}
        <div className="
          absolute top-1.5 left-[15px] right-[15px] bottom-1.5
          bg-[#0F140F]
          rounded-sm
          shadow-[inset_0px_0px_6px_rgba(0,0,0,0.8)]
        " />

        {/* 텍스트 (네온 효과) */}
        <div className="relative z-10 flex flex-col items-center justify-center leading-none w-full px-4">
          {isLoading ? (
            // 로딩 상태
            <span className="font-pixel text-[10px] text-gray-500 animate-pulse tracking-widest">
              LOADING...
            </span>
          ) : (
            // 결과 표시
            <>
              <span className="
                font-pixel text-[8px] text-[#BBE309] opacity-80 mb-0.5
                tracking-wider uppercase truncate w-full text-center
              ">
                {data?.label}
              </span>

              <span className="
                font-pixel text-lg md:text-xl text-[#BBE309] font-bold tracking-widest
                drop-shadow-[0_0_8px_rgba(187,227,9,0.6)]
              ">
                {dDayString}
              </span>
            </>
          )}
        </div>

        {/* 도트 매트릭스 장식 (배경 디테일) */}
        <div className="absolute inset-0 grid grid-cols-[repeat(25,minmax(0,1fr))] gap-0.5 opacity-10 pointer-events-none p-1">
          {Array.from({ length: 100 }).map((_, i) => (
            <div key={i} className="bg-white/40 w-[1px] h-[1px] rounded-full" />
          ))}
        </div>

        {/* 스크린 유리광 반사 효과 */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />
      </div>

      {/* 하단 버튼 장식 */}
      <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 flex gap-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`
              w-2 h-2 rounded-full 
              bg-[#BBE309]
              shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_2px_rgba(0,0,0,0.3)]
              ${i == 2 ? 'animate-pulse' : 'opacity-80'}
            `}
          />
        ))}
      </div>

      {/* 상단 그라데이션 효과 */}
      <div className="absolute top-1 left-4 right-4 h-3 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none" />

    </div >
  );
}