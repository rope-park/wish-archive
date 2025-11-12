'use client';

import Link from 'next/link';
import { useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/releases', label: 'Releases' },
  { href: '/performances', label: 'Performances' },
  { href: '/goods', label: 'Goods' },
  { href: '/eras', label: 'Eras' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* 로고 / 타이틀 */}
        <Link href="/" className="text-lg font-semibold tracking-tight">
          NCT WISH Archive
        </Link>

        {/* 데스크톱 네비게이션 */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 모바일 메뉴 버튼 */}
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center rounded-md border px-2.5 py-2 text-sm"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">메뉴 열기</span>
          ☰
        </button>
      </div>

      {/* 모바일 드로어 메뉴 */}
      {open && (
        <nav className="md:hidden border-t bg-white">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2 space-y-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-2 py-2 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}     