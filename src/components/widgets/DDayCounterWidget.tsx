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
  targetDate?: string | Date;
  label?: string;
  className?: string;
  scale?: number;
}

export default function DDayCounterWidget({
  targetDate,
  label,
  className = '',
  scale = 1,
}: DDayCounterProps) {
  // 상태 관리
  const [data, setData] = useState<DDayData | null>(null);
  const [dDayString, setDDayString] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. 데이터 로드 (Props 우선 -> 없으면 API에서 불러오기)
  useEffect(() => {
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

  return (
    <div 
      className={`relative select-none cursor-default ${className}`}
      style={{
        width: `${160 * scale}px`,
        height: `${70 * scale}px`,
      }}
    >
      {/* 외관 (회색 플라스틱 케이스) */}
      <div className="
        absolute inset-0 
        bg-[#c9bebe] rounded-full
        shadow-[0px_4px_6px_rgba(0,0,0,0.15),inset_0px_2px_2px_rgba(255,255,255,0.9),inset_0px_-2px_4px_rgba(0,0,0,0.05)]
        border border-gray-400
      " />

      {/* 내부 블랙 스크린 (LED 패널) */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 bg-[#1A1A1A] rounded-full border-2 border-gray-400 overflow-hidden flex items-center justify-center shadow-inner"
        style={{
          top: `${14 * scale}px`,
          width: `${124 * scale}px`,
          height: `${42 * scale}px`,
        }}
      >
        {/* 스크린 내부의 어두운 배경 (깊이감) */}
        <div 
          className="absolute bg-[#0F140F] rounded-sm shadow-[inset_0px_0px_6px_rgba(0,0,0,0.8)]"
          style={{
            top: `${6 * scale}px`,
            left: `${15 * scale}px`,
            right: `${15 * scale}px`,
            bottom: `${6 * scale}px`,
          }}
        />

        {/* 텍스트 (네온 효과) */}
        <div 
          className="relative z-10 flex flex-col items-center justify-center leading-none w-full"
          style={{
            paddingLeft: `${16 * scale}px`,
            paddingRight: `${16 * scale}px`,
          }}
        >
          {isLoading ? (
            // 로딩 상태
            <span 
              className="font-pixel text-gray-500 animate-pulse tracking-widest"
              style={{ fontSize: `${10 * scale}px` }}
            >
              LOADING...
            </span>
          ) : (
            // 결과 표시
            <>
              <span 
                className="font-pixel text-[#BBE309] opacity-80 tracking-wider uppercase truncate w-full text-center"
                style={{ 
                  fontSize: `${8 * scale}px`,
                  marginBottom: `${2 * scale}px`,
                }}
              >
                {data?.label}
              </span>

              <span 
                className="font-pixel text-[#BBE309] font-bold tracking-widest drop-shadow-[0_0_8px_rgba(187,227,9,0.6)]"
                style={{ fontSize: `${(scale >= 1 ? 20 : 18) * scale}px` }}
              >
                {dDayString}
              </span>
            </>
          )}
        </div>

        {/* 도트 매트릭스 장식 (배경 디테일) */}
        <div 
          className="absolute inset-0 grid grid-cols-[repeat(25,minmax(0,1fr))] opacity-10 pointer-events-none"
          style={{
            gap: `${2 * scale}px`,
            padding: `${4 * scale}px`,
          }}
        >
          {Array.from({ length: 100 }).map((_, i) => (
            <div 
              key={i} 
              className="bg-white/40 rounded-full"
              style={{
                width: `${1 * scale}px`,
                height: `${1 * scale}px`,
              }}
            />
          ))}
        </div>

        {/* 스크린 유리광 반사 효과 */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-xl pointer-events-none" />
      </div>

      {/* 하단 버튼 장식 */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 flex"
        style={{
          bottom: `${6 * scale}px`,
          gap: `${8 * scale}px`,
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`rounded-full bg-[#BBE309] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.8),1px_1px_2px_rgba(0,0,0,0.3)] ${i == 2 ? 'animate-pulse' : 'opacity-80'}`}
            style={{
              width: `${8 * scale}px`,
              height: `${8 * scale}px`,
            }}
          />
        ))}
      </div>

      {/* 상단 그라데이션 효과 */}
      <div 
        className="absolute left-4 right-4 bg-gradient-to-b from-white/40 to-transparent rounded-full pointer-events-none"
        style={{
          top: `${4 * scale}px`,
          height: `${12 * scale}px`,
        }}
      />

    </div>
  );
}