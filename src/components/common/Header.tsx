'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'HOME', path: '/', color: 'bg-white', emoji: '🏠' },
    { name: 'TIMELINE', path: '/timeline', color: 'bg-wish-sky', emoji: '🕓' },
    { name: 'RELEASES', path: '/releases', color: 'bg-wish-green', emoji: '💿' },
    { name: 'PERFORMANCES', path: '/performances', color: 'bg-wish-pink', emoji: '🎤' },
    { name: 'GOODS', path: '/goods', color: 'bg-wish-lemon', emoji: '🛍️' },
    { name: 'ERAS', path: '/eras', color: 'bg-wish-purple', emoji: '✨' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b-2 border-black/5 shadow-sm py-3">
      <div className="wish-container">
        <div className="flex justify-between items-center">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2 hover:scale-105 transition-transform">
            <div className="w-12 h-12 bg-linear-to-br from-wish-green to-wish-sky rounded-full flex items-center justify-center text-2xl shadow-hard">
              ⭐
            </div>
            <span className="text-xl font-bagel-fat-one text-wish-pink hidden sm:inline">
              NCT WISH
            </span>
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-3">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`
                    px-4 py-2 
                    font-press-start-2p text-xs lg:text-sm uppercase
                    border-2 border-text-dark rounded-full
                    transition-all duration-150
                    ${item.color}
                    ${isActive 
                      ? 'shadow-none translate-x-1 translate-y-1' 
                      : 'shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                    }
                  `}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* 모바일 햄버거 */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden px-4 py-2 text-lg border-2 border-text-dark rounded-full bg-wish-green shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-[72px] z-40 bg-linear-to-br from-wish-pink/90 via-wish-purple/90 to-wish-sky/90 backdrop-blur-lg md:hidden animate-pop-in">
            <nav className="wish-container flex flex-col space-y-4 pt-8">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    className={`
                      px-6 py-4 text-center text-lg
                      font-press-start-2p uppercase
                      border-2 border-text-dark rounded-full
                      ${item.color}
                      ${isActive ? 'shadow-none translate-x-1 translate-y-1' : 'shadow-hard'}
                      transition-all duration-150
                    `}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="mr-2">{item.emoji}</span>
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
