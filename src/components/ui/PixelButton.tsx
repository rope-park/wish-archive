/**
 * 🎮 PixelButton - 게임기/다마고치 스타일 버튼
 * 
 * 픽셀 폰트 + 하드 쉐도우 + 3D 눌림 효과
 */

'use client';

import { ReactNode, ButtonHTMLAttributes } from 'react';

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'green' | 'pink' | 'sky' | 'purple';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
}

const variants = {
  green: 'bg-wish-green text-gray-900 shadow-hard-green hover:bg-wish-green-soft',
  pink: 'bg-wish-pink text-gray-900 shadow-hard-pink hover:bg-wish-pink/90',
  sky: 'bg-wish-sky text-gray-900 shadow-hard hover:bg-wish-sky/90',
  purple: 'bg-wish-purple text-white shadow-hard hover:bg-wish-purple/90',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function PixelButton({
  children,
  variant = 'green',
  size = 'md',
  icon,
  className = '',
  ...props
}: PixelButtonProps) {
  return (
    <button
      className={`pixel-button ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="flex items-center gap-2 justify-center">
        {icon && <span className="text-xl">{icon}</span>}
        {children}
      </span>
    </button>
  );
}
