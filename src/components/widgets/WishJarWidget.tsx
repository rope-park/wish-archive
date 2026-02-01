/**
 * WishJarWidget 컴포넌트
 * 
 * - SVG 기반의 별 병 위젯
 * - Matter.js 물리 엔진 적용 (중력, 관성, 충돌)
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useWindowStore } from '@/app/stores/useWindowStore';
import { useWishStore } from '@/app/stores/useWishStore';
import { PaperCrane } from '@/components/apps/ToWish/PaperCrane';
import Matter from 'matter-js';

interface WishJarWidgetProps {
  rotation?: number;
}

export default function WishJarWidget({ rotation = 0 }: WishJarWidgetProps) {
  const { openWindow } = useWindowStore();
  const { wishes, fetchWishes } = useWishStore();
  const [isHovered, setIsHovered] = useState(false);

  // Physics Refs
  const containerRef = useRef<HTMLDivElement>(null);
  
  interface PhysicsScene {
    engine: Matter.Engine;
    runner: Matter.Runner;
    bodies: Record<string, Matter.Body>;
  }
  const sceneRef = useRef<PhysicsScene | null>(null);
  const craneRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  
  // Drag Inertia Refs (Used for calculating delta)
  const lastPosRef = useRef({ x: 0, y: 0 });

  // 1. Initial Data Fetch
  useEffect(() => {
      if (wishes.length === 0) {
          fetchWishes(true);
      }
  }, [wishes.length, fetchWishes]);

  // 2. Physics Engine Setup & Sync
  useEffect(() => {
    // ---- Setup Matter.js ----
    const Engine = Matter.Engine,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite;

    const engine = Engine.create();
    const world = engine.world;
    
    // Engine config
    engine.gravity.y = 1; // Standard gravity

    // -- Boundaries (Jar Shape Approximation) --
    const walls = [
        // Bottom Floor
        Bodies.rectangle(140, 270, 160, 20, { 
            isStatic: true, 
            render: { visible: false },
            label: 'Floor' 
        }),
        // Left Wall
        Bodies.rectangle(60, 200, 20, 200, { 
            isStatic: true, 
             angle: -0.3,
            render: { visible: false } 
        }),
        // Right Wall
        Bodies.rectangle(220, 200, 20, 200, { 
            isStatic: true, 
            angle: 0.3,
            render: { visible: false } 
        }),
        // Shoulder Left
        Bodies.rectangle(90, 110, 80, 20, { 
            isStatic: true, 
            angle: 0.8,
            render: { visible: false } 
        }),
         // Shoulder Right
         Bodies.rectangle(190, 110, 80, 20, { 
            isStatic: true, 
            angle: -0.8,
            render: { visible: false } 
        }),
    ];
    Composite.add(world, walls);

    // -- Runner --
    const runner = Runner.create();
    Runner.run(runner, engine);

    sceneRef.current = { engine, runner, bodies: {} };

    // Cleanup
    return () => {
        Runner.stop(runner);
        Engine.clear(engine);
    };
  }, []);

  // 2.5 Sync Gravity with Rotation
  useEffect(() => {
    if (!sceneRef.current) return;
    const { engine } = sceneRef.current;
    
    
    const rad = (rotation * Math.PI) / 180;
    engine.gravity.x = Math.sin(rad);
    engine.gravity.y = Math.cos(rad);
    
  }, [rotation]);


  // 3. Sync Wishes to Physics Bodies
  useEffect(() => {
    if (!sceneRef.current) return;
    const { engine, bodies } = sceneRef.current;
    // Remove unused World import
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;

    // Add new wishes
    wishes.slice(0, 30).forEach((wish, i) => {
        if (!bodies[wish.id]) {
            // Random spawn position at top
            const x = 120 + (Math.random() * 40 - 20);
            const y = 50 - (i * 20);

            // Crane Body
            const body = Bodies.circle(x, y, 12, {
                restitution: 0.2,
                friction: 0.5,
                density: 0.002,
                label: `crane-${wish.id}`
            });
            
            bodies[wish.id] = body;
            Composite.add(engine.world, body);
        }
    });
  }, [wishes]);


  // 4. Animation Loop (Sync Physics -> DOM & Inertia)
  useEffect(() => {
    let animationFrameId: number;

    const loop = () => {
        if (!sceneRef.current || !containerRef.current) return;
        const { bodies } = sceneRef.current; // engine not used directly here

        // -- Inertia Logic --
        const rect = containerRef.current.getBoundingClientRect();
        const currentX = rect.left;
        const currentY = rect.top;

        // Calculate delta (velocity of container)
        if (lastPosRef.current.x === 0 && lastPosRef.current.y === 0) {
            lastPosRef.current = { x: currentX, y: currentY };
        }

        const dx = currentX - lastPosRef.current.x;
        const dy = currentY - lastPosRef.current.y;

        // Apply force if moving
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            const forceX = -dx * 0.00015; // Counter-force
            const forceY = -dy * 0.00015;

            Object.values(bodies).forEach((body) => {
                 if (!body.isStatic) {
                     Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
                 }
            });
        }

        lastPosRef.current = { x: currentX, y: currentY };


        // -- Update DOM Positions --
        Object.keys(bodies).forEach(wishId => {
            const body = bodies[wishId];
            const domNode = craneRefs.current[wishId];
            
            if (domNode && body) {
                const { x, y } = body.position;
                const angle = body.angle;

                domNode.style.transform = `translate(${x}px, ${y}px) rotate(${angle}rad)`;
            }
        });

        animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);


  return (
    <div ref={containerRef} className="relative w-[300px] h-[300px] flex items-center justify-center">
      
      {/* 1. 유리병 본체 */}
      <motion.div 
        className="relative w-full h-full group flex items-center justify-center"
        onDoubleClick={() => {
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
                className="w-full h-full object-contain drop-shadow-xl pointer-events-none select-none"
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
            
            {/* Physics Layer (Cranes) */}
            <div className="absolute inset-0 z-0 overflow-hidden" 
                 // Removing clipPath for now to see if physics bounds work well, usually better to keep it visually clipped
                 style={{ clipPath: 'path("M74.5,60 C74.5,60 110,90 140,90 C170,90 205.5,60 205.5,60 L220,100 C220,100 280,110 270,160 C260,210 220,240 200,280 L140,260 L80,280 C60,240 20,210 10,160 C0,110 60,100 60,100 Z")' }}
            > 
                 {/* 
                    Direct render of cranes. 
                    Positions are 0,0 initially, updated by loop via ref transform.
                    Origin should be center for rotation.
                 */}
                 {wishes.slice(0, 30).map((wish) => (
                    <div
                        key={wish.id}
                        ref={el => { craneRefs.current[wish.id] = el; }} // No return, void function
                        className="absolute top-0 left-0 w-8 h-8 flex items-center justify-center will-change-transform"
                        style={{
                            // Start invisible or at top? Physics spawns them.
                            // We center the element on the physics body position (which is center of mass)
                            marginTop: '-16px', // Half size
                            marginLeft: '-16px'
                        }}
                    >
                        <PaperCrane color={wish.craneColor} className="w-8 h-8 drop-shadow-sm" animate={false} />
                    </div>
                 ))}
                 
                 {/* Fallback empty message or just empty */}
            </div>
        </div>
      </motion.div>

      {/* 2. Side Item: Sticky Notes / Paper Stack */}
      <motion.button
         className="absolute -right-4 bottom-4 w-16 h-16 cursor-pointer no-drag hover:scale-110 transition-transform z-20"
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
