'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import NextImage from 'next/image';

const COLOR_MAP: Record<string, string> = {
    '#FFB6C1': 'Pink',   // LightPink
    '#87CEFA': 'Blue',   // LightSkyBlue
    '#98FB98': 'Green',  // PaleGreen
    '#F0E68C': 'Yellow', // Khaki
    '#DDA0DD': 'Purple', // Plum
    '#FF6B6B': 'Red',    // Custom Red
};

const getCraneSrc = (color: string) => {
    const colorName = COLOR_MAP[color] || 'Pink';
    return `/system/widgets/WishJar/Origami_Crane_${colorName}.svg`;
};

export const PaperCrane = ({ 
    color = '#FFB6C1', 
    className = "w-12 h-12",
    animate = true 
}: { 
    color?: string, 
    className?: string,
    animate?: boolean 
}) => {
    const [animation, setAnimation] = useState({ duration: 3, delay: 0 });

    useEffect(() => {
        if (!animate) return; // Skip if no animation needed

        const timer = setTimeout(() => {
            setAnimation({
                duration: 3 + Math.random(),
                delay: Math.random() * 2
            });
        }, 0);
        return () => clearTimeout(timer);
    }, [animate]);

    return (
        <motion.div 
            className={`${className} relative select-none`}
            animate={animate ? { 
                y: [-3, 3, -3],
                rotate: [-2, 2, -2]
            } : undefined}
            transition={animate ? {
                duration: animation.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: animation.delay
            } : undefined}
        >
            <NextImage 
                src={getCraneSrc(color)} 
                alt="Paper Crane" 
                width={48}
                height={48}
                className="w-full h-full object-contain drop-shadow-md"
                draggable={false}
            />
        </motion.div>
    );
};
