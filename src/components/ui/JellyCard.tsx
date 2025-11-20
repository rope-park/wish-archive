/**
 * 🍬 JellyCard - 젤리/플라스틱 파우치 느낌의 카드
 * 
 * WISH POP 테마의 핵심 컨테이너
 * 투명 파우치, 아크릴 키링 느낌
 */

'use client';

import { ReactNode } from 'react';

interface JellyCardProps {
  children: ReactNode;
  color?: 'green' | 'sky' | 'pink' | 'purple' | 'white';
  className?: string;
  withTape?: boolean;
  sparkle?: boolean;
}

const borderColors = {
  green: 'border-wish-green',
  sky: 'border-wish-sky',
  pink: 'border-wish-pink',
  purple: 'border-wish-purple',
  white: 'border-white',
};

export default function JellyCard({
  children,
  color = 'white',
  className = '',
  withTape = false,
  sparkle = false,
}: JellyCardProps) {
  return (
    <div className={`jelly-container ${borderColors[color]} ${className} ${sparkle ? 'sparkle' : ''}`}>
      {withTape && <div className="tape" />}
      {children}
    </div>
  );
}
