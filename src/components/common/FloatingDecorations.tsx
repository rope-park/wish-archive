/**
 * ✨ FloatingDecorations - 둥둥 떠다니는 장식 요소
 * 
 * 별, 음표, 깃털 등이 배경에서 천천히 움직임
 * Parallax Scroll 효과
 */

'use client';

import { useState } from 'react';

interface Decoration {
  id: number;
  emoji: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

const emojis = ['⭐', '✨', '🎵', '🎶', '🪶', '💚', '💙', '💖', '🌟', '💫'];

export default function FloatingDecorations() {
  // 초기 장식 요소를 useState 초기값으로 생성
  const [decorations] = useState<Decoration[]>(() => 
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2,
    }))
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((deco) => (
        <div
          key={deco.id}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${deco.x}%`,
            top: `${deco.y}%`,
            animation: `float ${deco.duration}s ease-in-out infinite`,
            animationDelay: `${deco.delay}s`,
          }}
        >
          {deco.emoji}
        </div>
      ))}
    </div>
  );
}
