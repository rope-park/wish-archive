/**
 * WishJarWidget 컴포넌트
 * 
 * - SVG 기반의 별 병 위젯
 * - WishForm/List 앱 실행 트리거
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { PaperCrane } from '@/components/apps/ToWish/PaperCrane';

// Dummy Wishes for visualization inside the jar
const DUMMY_WISHES = [
  { id: 1, color: 'var(--color-sion)', x: 20, y: 60, r: 10 },  // Pink
  { id: 2, color: 'var(--color-riku)', x: 50, y: 70, r: -5 },  // Blue
  { id: 3, color: 'var(--color-yushi)', x: 80, y: 65, r: 15 },  // Green
  { id: 4, color: 'var(--color-jaehee)', x: 35, y: 80, r: -10 }, // Yellow
  { id: 5, color: 'var(--color-ryo)', x: 65, y: 85, r: 5 },   // Purple
  { id: 6, color: 'var(--color-sakuya)', x: 45, y: 55, r: 20 },  // Red
];

export default function WishJarWidget() {
  const { openWindow } = useWindowStore();
  const [isHovered, setIsHovered] = useState(false);

  const handleOpenApp = () => {
    openWindow({
      id: 'to_wish_app',
      type: 'TO_WISH',
      title: 'To. WISH',
      icon: '/system/icons/apps/towish.png',
      defaultSize: { width: 900, height: 600 } // Wider for split view
    });
  };

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      
      {/* 1. 유리병 본체 (클릭 시 앱 실행) */}
      <motion.div 
        className="relative w-full h-full cursor-pointer group no-drag flex items-center justify-center"
        onClick={handleOpenApp}
        onTouchEnd={(e) => { e.preventDefault(); e.stopPropagation(); handleOpenApp(); }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Glass Bottle Image */}
        <div className="relative w-[280px] h-full z-10 flex items-center justify-center">
            <Image 
                src="/system/widgets/WishJar/Glass.svg" 
                alt="Wish Jar" 
                width={280}
                height={300}
                className="w-full h-full object-contain drop-shadow-xl"
            />
            
            {/* Cork (Animated) */}
            <motion.div
                animate={{ y: isHovered ? -60 : -15 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[60px] z-[-1]"
            >
                <Image 
                    src="/system/widgets/WishJar/Cork.svg" 
                    alt="Cork" 
                    width={60}
                    height={40}
                    className="w-full rounded-t-sm"
                />
            </motion.div>

            {/* 유리병에 넣은 학종이(소원 메시지) */}
            <div className="absolute inset-0 z-0 overflow-hidden" style={{ clipPath: 'path("M74.5,60 C74.5,60 110,90 140,90 C170,90 205.5,60 205.5,60 L220,100 C220,100 280,110 270,160 C260,210 220,240 200,280 L140,260 L80,280 C60,240 20,210 10,160 C0,110 60,100 60,100 Z")' }}> 
                 {/* Note: Clip path is approximate for star shape, may need fine tuning or use mask image */}
                 <div className="absolute bottom-[20%] left-[15%] right-[15%] h-[120px] flex flex-wrap justify-center content-end gap-1 opacity-90">
                    {/* Render dummy cranes for visual effect */}
                    {DUMMY_WISHES.map((wish) => (
                        <motion.div
                            key={wish.id}
                            className="absolute"
                            style={{ 
                                left: `${wish.x}%`, 
                                top: `${wish.y}%`,
                                rotate: wish.r 
                            }}
                        >
                             <PaperCrane color={wish.color} className="w-8 h-8" />
                        </motion.div>
                    ))}
                 </div>
            </div>
        </div>
      </motion.div>

      {/* 2. Side Item: Sticky Notes / Paper Stack */}
      <motion.button
         className="absolute -right-4 bottom-4 w-16 h-16 cursor-pointer no-drag hover:scale-110 transition-transform"
         onClick={(e) => { e.stopPropagation(); handleOpenApp(); }}
         whileTap={{ scale: 0.95 }}
      >
        <Image 
            src="/system/widgets/WishJar/Origami_Stack.svg" 
            alt="Make a Wish" 
            width={64}
            height={64}
            className="w-full h-full object-contain drop-shadow-md"
        />
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-100 text-[10px] px-1 border border-yellow-300 whitespace-nowrap font-pixel text-yellow-800">
            Write!
        </span>
      </motion.button>

    </div>
  );
}
