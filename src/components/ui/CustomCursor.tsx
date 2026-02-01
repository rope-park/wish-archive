'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  
  // Mouse position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animation for smooth trailing
  const springConfig = { damping: 30, stiffness: 500 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device has a fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    
    const handlePointerChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsVisible(e.matches);
    };

    // Initial check
    handlePointerChange(mediaQuery);

    // Listen for changes (e.g., detaching keyboard/mouse on tablet)
    mediaQuery.addEventListener('change', handlePointerChange);

    const moveCursor = (e: MouseEvent) => {
      // Offset: Bottom-Right diagonal (e.g., x + 24, y + 24)
      cursorX.set(e.clientX + 10);
      cursorY.set(e.clientY + 10);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      mediaQuery.removeEventListener('change', handlePointerChange);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <img 
        src="/system/cursors/wichu.svg" 
        alt="Custom Cursor" 
        width={32}
        height={32}
        className="drop-shadow-md"
      />
    </motion.div>
  );
}
