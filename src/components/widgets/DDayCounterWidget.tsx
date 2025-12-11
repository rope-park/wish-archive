/**
 * D-Day Counter 컴포넌트
 * 
 * - 목표 날짜까지 남거나 지난 일수를 계산하여 표시
 * - 사용자 정의 라벨과 날짜 설정 가능
 */

'use client';

interface DdayCounterProps {
  targetDate?: string; // 목표 날짜 (YYYY-MM-DD)
  label?: string;      // 라벨 (예: Debut)
  className?: string;  // 위치 조정용
}

export default function DdayCounterWidget({
  targetDate = '2024-02-21', // NCT WISH 데뷔일 (기본값)
  label = 'Debut',
  className = '',
}: DdayCounterProps) {
  // D-Day 계산 로직 (useMemo로 최적화)
  const dDay = (() => {
    const target = new Date(targetDate);
    const today = new Date();
    
    // 시간차 제거 (날짜만 비교)
    target.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffTime = today.getTime() - target.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // 포맷팅 (D+100, D-5, D-Day)
    if (diffDays > 0) return `+${diffDays}`;
    if (diffDays < 0) return `${diffDays}`; // 이미 음수이므로 '-' 포함됨
    return '-Day';
  })();

  return (
    <div className={`relative w-40 h-[70px] select-none ${className}`}>
      
      {/* 외관 (회색 플라스틱 케이스) */}
      <div className="
        absolute inset-0 
        bg-white/80 rounded-full
        shadow-[0px_4px_6px_rgba(0,0,0,0.2),inset_0px_2px_2px_rgba(255,255,255,0.8),inset_0px_-4px_4px_rgba(0,0,0,0.1)]
        border border-gray-300
      " />

      {/* 내부 블랙 스크린 (LED 패널) */}
      <div className="
        absolute top-[15px] left-5 
        w-[120px] h-10 
        bg-[#111111] rounded-full 
        outline-2 outline-gray-400
        overflow-hidden
      ">
        {/* 스크린 내부의 어두운 배경 (깊이감) */}
        <div className="
          absolute top-2 left-[15px] 
          w-[90px] h-6 
          bg-[#1a2418] 
          shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]
        " />

        {/* 텍스트 (네온 효과) */}
        <div className="
          absolute inset-0 flex items-center justify-center pt-1
          font-pixel text-base text-[#bbe309] 
          drop-shadow-[0_0_2px_#bbe309] tracking-wide
          z-10
        ">
          {label} {dDay}
        </div>

        {/* 도트 매트릭스 장식 (배경 디테일) */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-3 gap-0.5 opacity-20 pointer-events-none p-1">
          {Array.from({ length: 36 }).map((_, i) => (
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

    </div>
  );
}