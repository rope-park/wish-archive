/**
 * DesktopIcon 컴포넌트
 * 
 * 데스크탑 아이콘을 렌더링하는 컴포넌트
 */
'use client';

import Link from 'next/link';

interface DesktopIconProps {
  name: string;     // 아이콘 이름
  icon: string;     // 이모지 또는 이미지 경로
  href: string;     // 이동할 경로
  isExternal?: boolean; // 외부 링크 여부
}

/**
 * DesktopIcon 컴포넌트
 * @param param0 프로퍼티 객체
 * @returns JSX.Element
 */
export default function DesktopIcon({ name, icon, href, isExternal }: DesktopIconProps) {
  const Content = (
    <div className="group flex flex-col items-center gap-2 p-2 w-[100px] cursor-pointer rounded-lg hover:bg-white/10 transition-colors active:scale-95">
      {/* 아이콘 박스 */}
      <div className="w-14 h-14 md:w-16 md:h-16 bg-linear-to-br from-white/40 to-white/10 backdrop-blur-md border border-white/50 rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-200">
        {icon}
      </div>
      
      {/* 이름표 */}
      <span className="text-sm font-jua text-gray-800 bg-white/40 px-3 py-1 rounded-full shadow-sm backdrop-blur-sm group-hover:bg-white/80 transition-colors whitespace-nowrap">
        {name}
      </span>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {Content}
      </a>
    );
  }

  return <Link href={href}>{Content}</Link>;
}