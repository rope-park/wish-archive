/**
 * 🎨 Era Card - 젤리 액자 카드
 * 
 * 시안의 "FEATURED ERAS" 섹션
 * 투명 젤리 프레임 안에 Era 정보
 */

'use client';

import Link from 'next/link';

interface EraCardProps {
  title: string;
  period: string;
  concept: string;
  bgColor: string; // wish-green/80, wish-purple/80 등
  iconEmoji?: string; // 🐦, ⭐, 🎤 등
  href?: string;
}

export default function EraCard({
  title,
  period,
  concept,
  bgColor,
  iconEmoji = '✨',
  href = '#',
}: EraCardProps) {
  return (
    <div className={`era-card ${bgColor} h-64 md:h-72 p-6 flex flex-col items-center justify-center text-center`}>
      {/* 아이콘 */}
      <div className="text-5xl mb-3 animate-float opacity-70">
        {iconEmoji}
      </div>

      {/* 타이틀 */}
      <h3 className="font-bagel-fat-one text-2xl lg:text-3xl text-white leading-tight uppercase">
        {title}
      </h3>
      <p className="font-press-start-2p text-xs lg:text-sm text-text-dark/80 mt-1 uppercase">
        {period}
      </p>
      <p className="font-jua text-base lg:text-lg text-text-dark/90 mt-2">
        {concept}
      </p>

      {/* 버튼 */}
      <Link
        href={href}
        className="mt-4 px-4 py-2 font-press-start-2p text-sm text-white bg-text-dark rounded-full
                   border-2 border-text-dark
                   shadow-[2px_2px_0px_#000]
                   hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5
                   transition-all duration-150 uppercase"
      >
        VIEW TIMELINE →
      </Link>
    </div>
  );
}
