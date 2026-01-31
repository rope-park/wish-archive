/**
 * WishJarWidget 컴포넌트
 * 
 * - SVG 기반의 별 병 위젯
 * - WishForm/List 앱 실행 트리거
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { useWishStore } from '@/app/stores/useWishStore';
import { PaperCrane } from '@/components/apps/ToWish/PaperCrane';

export default function WishJarWidget() {
  const { openWindow } = useWindowStore();
  const { wishes, fetchWishes } = useWishStore(); // Get shared wishes
  const [isHovered, setIsHovered] = useState(false); // Retain for cork animation logic in render (line 81 uses it)

  // Fetch initial if empty so the jar is not empty
  useEffect(() => {
      if (wishes.length === 0) {
          fetchWishes(true);
      }
  }, [wishes.length, fetchWishes]);

  // Generate visual cranes from real wishes or valid dummy if empty (to avoid empty jar initially?)
  // User wants "wish를 작성하면 ... 추가되어야해". So we should show real wishes.
  // If empty, maybe show nothing or keep dummy? Let's use real wishes mixed with dummy if < 5?
  // Let's stick to real wishes. Upon first load, wishes might be empty if not fetched.
  // Maybe we should fetch initial wishes here too? Or let the list do it?
  // Ideally, the widget should just reflect the store.
  
  // We need stable positions for the cranes so they don't jump on every render.
  // In a real app we'd seed the random position by ID.
  
  const visualWishes = wishes.slice(0, 20).map((wish) => {
      // Simple pseudo-random based on ID string chars
      const seed = wish.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const x = (seed * 17) % 60 + 20; // 20% to 80%
      const y = (seed * 31) % 40 + 50; // 50% to 90%
      const r = (seed * 13) % 90 - 45; // -45 to 45 deg
      return { ...wish, x, y, r };
  });

  return (
    <div className="relative w-[300px] h-[300px] flex items-center justify-center">
      
      {/* 1. 유리병 본체 (클릭 시 앱 실행 -> Read Only Mode) */}
      <motion.div 
        className="relative w-full h-full cursor-pointer group no-drag flex items-center justify-center"
        onClick={() => {
            const { windows, focusWindow } = useWindowStore.getState();
            if (windows.find(w => w.id === 'towish')) {
                focusWindow('towish');
                return;
            }
            openWindow({
                id: 'wish_list_viewer',
                type: 'TO_WISH',
                title: 'Wish_list',
                icon: '/system/icons/apps/towish.png',
                defaultSize: { width: 400, height: 600 },
                props: { mode: 'read_only' }
            });
        }}
        onTouchEnd={(e) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            openWindow({
                id: 'wish_list_viewer',
                type: 'TO_WISH',
                title: 'Wish_list',
                icon: '/system/icons/apps/towish.png',
                defaultSize: { width: 400, height: 600 },
                props: { mode: 'read_only' }
            });
        }}
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
                 <div className="absolute bottom-[20%] left-[15%] right-[15%] h-[120px] flex flex-wrap justify-center content-end gap-1 opacity-90">
                    <AnimatePresence>
                    {visualWishes.map((wish) => (
                        <motion.div
                            key={wish.id}
                            initial={{ scale: 0, y: -100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            className="absolute"
                            style={{ 
                                left: `${wish.x}%`, 
                                top: `${wish.y}%`,
                                rotate: wish.r 
                            }}
                        >
                             <PaperCrane color={wish.craneColor} className="w-8 h-8" />
                        </motion.div>
                    ))}
                    </AnimatePresence>
                 </div>
            </div>
        </div>
      </motion.div>

      {/* 2. Side Item: Sticky Notes / Paper Stack (클릭 시 앱 실행 -> Write Only Mode) */}
      <motion.button
         className="absolute -right-4 bottom-4 w-16 h-16 cursor-pointer no-drag hover:scale-110 transition-transform"
         onClick={(e) => { 
             e.stopPropagation(); 
             const { windows, focusWindow } = useWindowStore.getState();
             if (windows.find(w => w.id === 'towish')) {
                 focusWindow('towish');
                 return;
             }
             openWindow({
                id: 'wish_maker',
                type: 'TO_WISH',
                title: 'Make_a_wish',
                icon: '/system/icons/apps/towish.png',
                defaultSize: { width: 400, height: 600 },
                props: { mode: 'write_only' }
             });
         }}
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
