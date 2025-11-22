/**
 * Taskbar (작업 표시줄)
 * 
 * 메인 네비게이션 바
 * - 시작 버튼 (홈으로 이동)
 * - 앱 아이콘 독 (메뉴 이동)
 * - 시스템 트레이 (시계)
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

/**
 * Taskbar 컴포넌트
 * @returns JSX.Element
 */
export default function Taskbar() {
  const pathname = usePathname();
  const [time, setTime] = useState<string>('');

  // 실시간 시계 기능
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime(); // 초기 실행
    const timer = setInterval(updateTime, 1000); // 1초마다 갱신
    return () => clearInterval(timer);
  }, []);

  // 메뉴 아이템 설정
  const apps = [
    { name: 'HOME', path: '/', icon: '🏠' },
    { name: 'PROFILE', path: '/members', icon: '👥' }, // 멤버 소개
    { name: 'ALBUMS', path: '/releases', icon: '💿' }, // 앨범 목록
    { name: 'TIMELINE', path: '/timeline', icon: '🕓' }, // 활동 타임라인
    { name: 'PERFORMANCE', path: '/performances', icon: '🎤' }, // 방송/무대
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full h-14 md:h-16 bg-[#e0e0e0]/80 backdrop-blur-md border-t-2 border-[#f0f0f0] shadow-[0_-4px_6px_rgba(0,0,0,0.1)] flex items-center justify-between px-4 z-[--z-dock]">
      
      {/* [1] 시작 버튼 (WISH 로고) */}
      <div className="flex items-center shrink-0">
        <Link href="/">
          <button className="group flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-linear-to-r from-wish-green to-wish-sky border-2 border-white shadow-[2px_2px_0px_rgba(0,0,0,0.2)] active:translate-y-0.5 active:shadow-none transition-all rounded-lg hover:brightness-110">
            <span className="text-lg md:text-xl group-hover:rotate-12 transition-transform">🌟</span>
            <span className="hidden md:block font-bagel-fat-one text-white text-sm md:text-base drop-shadow-md tracking-wide">
              START
            </span>
          </button>
        </Link>
      </div>

      {/* [2] 앱 아이콘 독 (중앙 정렬) */}
      <nav className="flex-1 flex justify-center gap-1 md:gap-3 px-2 overflow-x-auto">
        {apps.map((app) => {
          const isActive = pathname === app.path;
          return (
            <Link key={app.name} href={app.path}>
              <div 
                className={`
                  group relative flex flex-col items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl transition-all duration-200 cursor-pointer
                  ${isActive 
                    ? 'bg-white border-2 border-wish-pink shadow-inner -translate-y-1' 
                    : 'hover:bg-white/60 hover:-translate-y-1'
                  }
                `}
                title={app.name}
              >
                <span className="text-xl md:text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
                  {app.icon}
                </span>
                
                {/* 활성 상태일 때 밑에 작은 점 표시 */}
                {isActive && (
                  <span className="absolute bottom-1 w-1.5 h-1.5 bg-wish-pink rounded-full animate-pulse"></span>
                )}
                
                {/* 호버 시 툴팁 (텍스트 이름) */}
                <span className="absolute -top-10 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-press-start-2p whitespace-nowrap">
                  {app.name}
                </span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* [3] 시스템 트레이 (시계) */}
      <div className="flex items-center gap-3 bg-[#fafafa]/50 px-4 py-1.5 rounded-full border border-white/60 shadow-inner shrink-0">
        <div className="flex flex-col items-end">
          <span className="font-press-start-2p text-[10px] md:text-xs text-gray-800">
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}