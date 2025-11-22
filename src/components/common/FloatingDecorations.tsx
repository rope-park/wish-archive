/**
 * ✨ FloatingDecorations - 둥둥 떠다니는 장식 요소
 * 
 * 별, 음표, 깃털 등이 배경에서 천천히 움직임
 * Parallax Scroll 효과
 */

'use client';

import { useState, useEffect } from 'react';

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
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [mounted, setMounted] = useState(false);

  // 클라이언트에서만 장식 생성
  useEffect(() => {
    let rafId: number | null = null;
    rafId = requestAnimationFrame(() => {
      setDecorations(
        Array.from({ length: 15 }, (_, i) => ({
          id: i,
          emoji: emojis[Math.floor(Math.random() * emojis.length)],
          x: Math.random() * 100,
          y: Math.random() * 100,
          delay: Math.random() * 3,
          duration: 3 + Math.random() * 2,
        }))
      );
      setMounted(true);
    });
    return () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  // 마운트 전에는 아무것도 렌더링하지 않음
  if (!mounted) {
    return null;
  }

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
