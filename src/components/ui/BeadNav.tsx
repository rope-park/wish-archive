/**
 * 📿 BeadNav - 비즈 구슬 네비게이션
 * 
 * 휴대폰 스트랩/비즈 팔찌 느낌의 네비게이션
 * 각 메뉴가 컬러풀한 구슬처럼
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface BeadNavItem {
  label: string;
  href: string;
  color: 'green' | 'sky' | 'pink' | 'purple' | 'lemon';
  icon?: string;
}

const colorClasses = {
  green: 'bg-wish-green text-gray-900 hover:bg-wish-green-soft',
  sky: 'bg-wish-sky text-gray-900 hover:bg-wish-sky/90',
  pink: 'bg-wish-pink text-gray-900 hover:bg-wish-pink/90',
  purple: 'bg-wish-purple text-white hover:bg-wish-purple/90',
  lemon: 'bg-wish-lemon text-gray-900 hover:bg-wish-lemon/90',
};

interface BeadNavProps {
  items: BeadNavItem[];
}

export default function BeadNav({ items }: BeadNavProps) {
  const pathname = usePathname();

  return (
    <nav className="bead-nav-container">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              bead-nav
              ${colorClasses[item.color]}
              ${isActive ? 'ring-4 ring-offset-2 ring-gray-900' : ''}
            `}
          >
            {item.icon && <span className="mr-1">{item.icon}</span>}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
