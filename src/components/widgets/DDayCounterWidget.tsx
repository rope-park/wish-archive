/**
 * D-Day Counter 컴포넌트
 * 
 * - 목표 날짜까지 남거나 지난 일수를 계산하여 표시
 * - 사용자 정의 라벨과 날짜 설정 가능
 */

'use client';

import { useState, useEffect, use } from 'react';

interface DDayData {
  date: string | Date;
  label: string;
}

interface DdayCounterProps {
  targetDate?: string | Date  // 목표 날짜 (YYYY-MM-DD)
  label?: string;             // 라벨 (예: Debut)
  className?: string;
}

export default function DdayCounterWidget({
  targetDate,
  label,
  className = '',
}: DdayCounterProps) {
  const [data, setData] = useState<DDayData | null>(null);
  const [dDayString, setDDayString] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. 데이터 로드 (Props 우선 -> 없으면 API에서 불러오기)
  useEffect(() => {
    // ESLint 경고 무시 주석
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
          if (!res.ok) throw new Error('Network response was not ok');
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

  return (
    <div className={`relative w-40 h-[70px] select-none ${className}`}>

      {/* 외관 (회색 플라스틱 케이스) */}
      <div className="
        absolute inset-0 
        bg-[#c9bebe] rounded-full
        shadow-[0px_4px_6px_rgba(0,0,0,0.1),inset_0px_2px_2px_rgba(255,255,255,0.9),inset_0px_-2px_4px_rgba(0,0,0,0.05)]
        border border-gray-300
      " />

      {/* 내부 블랙 스크린 (LED 패널) */}
      <div className="
        absolute top-[15px] left-5 
        w-[120px] h-10 
        bg-[#1A1A1A] rounded-full 
        outline-2 outline-gray-400
        overflow-hidden
        flex items-center justify-center
      ">
        {/* 스크린 내부의 어두운 배경 (깊이감) */}
        <div className="
          absolute top-2 left-[15px]
          w-[90px] h-6
          bg-[#0F140F]
          rounded-sm
          shadow-[inset_0px_0px_4px_rgba(0,0,0,0.8)]
        " />

        {/* 텍스트 (네온 효과) */}
        <div className="relative z-10 flex flex-col items-center justify-center leading-none">
          {isLoading ? (
            // 로딩 상태
            <span className="font-pixel text-[10px] text-gray-500 animate-pulse">CALCULATING...</span>
          ) : (
            // 결과 표시
            <>
              <span className="font-pixel text-[8px] text-[#BBE309] opacity-80 mb-1 tracking-wider uppercase">
                {data?.label}
              </span>
              <span className="
                font-pixel text-lg text-[#BBE309] font-bold tracking-widest
                drop-shadow-[0_0_5px_rgba(187,227,9,0.5)]
              ">
                {dDayString}
              </span>
            </>
          )}
        </div>

        {/* 도트 매트릭스 장식 (배경 디테일) */}
        <div className="absolute inset-0 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-0.5 opacity-10 pointer-events-none p-1">
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={i} className="bg-white/30 w-0.5 h-0.5 rounded-full" />
          ))}
        </div>
      </div>

      {/* 하단 버튼 장식 */}
      <div className="absolute top-[59px] left-[59px] flex gap-[9px]">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              w-2 h-2 rounded-full 
              bg-[#99F490] /* Wichu Green */
              shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_2px_rgba(0,0,0,0.3)]
              animate-pulse
            "
          />
        ))}
      </div>

      {/* 상단 그라데이션 효과 */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-xl pointer-events-none" />

    </div >
  );
}