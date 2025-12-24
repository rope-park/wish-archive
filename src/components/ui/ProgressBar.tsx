/**
 * ProgressBar 컴포넌트
 * 
 * - 진행 상태 시각적 표시
 * - 매끄러운 바 또는 윈도우 98 스타일 벽돌 모드 지원
 * - 상단 라벨 및 우측 값 표시 기능
 * - 내부에 광택 효과 포함
 */

'use client';

export interface ProgressBarProps {
  value: number;       // 현재 값
  max?: number;        // 최대 값 (기본 100)
  label?: string;      // 상단 라벨
  showValueLabel?: boolean; // 우측에 % 또는 수치 표시 여부
  size?: 'sm' | 'md' | 'lg';
  color?: 'red' | 'yellow' | 'green' | 'blue' | 'pink' | 'purple' | 'lime';
  variant?: 'smooth' | 'blocks'; // 매끄러운 바, 윈도우 98 벽돌
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  label,
  showValueLabel = false,
  size = 'md',
  color = 'green',
  variant = 'smooth',
  className = '',
}: ProgressBarProps) {

  // 퍼센트 계산 (0~100)
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  // 색상 매핑
  const colorMap = {
    red: 'bg-brand-character-riku',     // #E14766
    yellow: 'bg-brand-character-ryo',   // #FADD4E 
    green: 'bg-brand-character-jaehee', // #38A96A   
    blue: 'bg-brand-character-yushi',   // #93D6F9      
    pink: 'bg-brand-character-sakuya',  // #E669A4      
    purple: 'bg-brand-character-sion',  // #9B419B
    lime: 'bg-accent-neon-lime',        // #CCFF00
  };

  // 크기 설정 (높이)
  const heightClass = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
  };

  // 'Blocks' 모드일 때 벽돌 개수 계산 및 렌더링
  const renderBlocks = () => {
    const totalBlocks = 30;
    const activeBlocks = Math.round((percentage / 100) * totalBlocks);

    return (
      <div className="flex w-full h-full gap-[2px] px-[2px] items-center">
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <div
            key={i}
            className={`
              flex-1 h-[70%] 
              ${i < activeBlocks ? colorMap[color] : 'bg-transparent'}
              ${i < activeBlocks ? 'shadow-[inset_1px_1px_0px_rgba(255,255,255,0.4)]' : ''}
            `}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`w-full flex flex-col gap-1 ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label || 'Progress Bar'}
    >

      {/* 라벨 영역 (옵션) */}
      {(label || showValueLabel) && (
        <div className="flex justify-between items-end font-pixel text-xs text-gray-900 px-0.5 select-none">
          {label ? <span>{label}</span> : <span />}
          {showValueLabel && <span>{Math.round(percentage)}%</span>}
        </div>
      )}

      {/* 트랙 (Track) - 푹 파인 배경 */}
      <div className={`
        relative w-full overflow-hidden
        bg-white
        border-2
        border-t-gray-600 border-l-gray-600
        border-r-white border-b-white

        ${heightClass[size]}
      `}>

        {variant === 'smooth' ? (
          // A. Smooth 모드 (일반 막대)
          <div className="w-full h-full p-[2px]">
            <div
              className={`
                h-full transition-all duration-300 ease-out 
                ${colorMap[color]}
                relative
              `}
              style={{ width: `${percentage}%` }}
            >
              {/* 광택 효과 (상단 하이라이트) */}
              <div className="absolute top-0 left-0 w-full h-[40%] bg-white/30" />
            </div>
          </div>
        ) : (
          // B. Blocks 모드 (벽돌)
          renderBlocks()
        )}

      </div>
    </div>
  );
}