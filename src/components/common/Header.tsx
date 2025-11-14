'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/timeline', label: 'Timeline' },
  { href: '/releases', label: 'Releases' },
  { href: '/performances', label: 'Performances' },
  { href: '/members', label: 'Members' },
  { href: '/goods', label: 'Goods' },
  { href: '/eras', label: 'Eras' },
];

function cx(...list: Array<string | false | null | undefined>) {
  return list.filter(Boolean).join(' ');
}

function isActive(pathname: string, href: string) {
  if (href === '/') {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(href + '/');
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const activeMap = useMemo(() =>
    Object.fromEntries(
      NAV_ITEMS.map((item) => [item.href, isActive(pathname ?? '', item.href)]),
    ) as Record<(typeof NAV_ITEMS)[number]['href'], boolean>,
    [pathname],
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/70 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* 좌측: 로고/타이틀 */}
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold tracking-tight text-gray-900 hover:opacity-90"
        >
          {/* 텍스트 로고 (이미지 로고로 대체 가능) */}
          <span className="select-none">NCT WISH Archive</span>
        </Link>

        {/* 데스크톱 내비게이션 */}
        <nav className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cx(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                activeMap[n.href]
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-700 hover:bg-gray-100',
              )}
              aria-current={activeMap[n.href] ? 'page' : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* 모바일: 햄버거 버튼 */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label="Open main menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {/* 아이콘: 열림/닫힘 */}
          {open ? (
            // X 아이콘
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="block"
            >
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            // 햄버거 아이콘
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="block"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 패널 */}
      <div
        className={cx(
          'border-t bg-white md:hidden',
          open ? 'block' : 'hidden',
        )}
      // role="dialog"로 볼 수도 있으나 단순 네비 영역이므로 nav 유지
      >
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
          {NAV_ITEMS.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={cx(
                'rounded-md px-3 py-2 text-sm',
                activeMap[n.href]
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-800 hover:bg-gray-100',
              )}
              aria-current={activeMap[n.href] ? 'page' : undefined}
              // 모바일에서 누르면 닫히도록
              onClick={() => setOpen(false)}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}     