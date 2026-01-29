
'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Color map for hex to SVG filename
// We use rough hex matching or just expect the specific hex codes we set in WishForm
const COLOR_MAP: Record<string, string> = {
    '#FFB6C1': 'Pink',   // LightPink
    '#87CEFA': 'Blue',   // LightSkyBlue
    '#98FB98': 'Green',  // PaleGreen
    '#F0E68C': 'Yellow', // Khaki
    '#DDA0DD': 'Purple', // Plum
    '#FF6B6B': 'Red',    // Custom Red
};

// Fallback if random hex is passed (default to Pink)
const getCraneSrc = (color: string) => {
    const colorName = COLOR_MAP[color] || 'Pink';
    return `/system/widgets/WishJar/Origami_Crane_${colorName}.svg`;
};

export const PaperCrane = ({ color = '#FFB6C1', className = "w-12 h-12" }: { color?: string, className?: string }) => {
    // Randomize float animation (calculated in useEffect to avoid hydration mismatch and pure render errors)
    const [animation, setAnimation] = useState({ duration: 3, delay: 0 });

    useEffect(() => {
        // Use setTimeout to avoid "calling setState synchronously within an effect" warning
        // and ensure the update happens after the initial paint.
        const timer = setTimeout(() => {
            setAnimation({
                duration: 3 + Math.random(),
                delay: Math.random() * 2
            });
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div 
            className={`${className} relative select-none`}
            animate={{ 
                y: [-3, 3, -3],
                rotate: [-2, 2, -2]
            }}
        >
            <img 
                src={getCraneSrc(color)} 
                alt="Paper Crane" 
                className="w-full h-full object-contain drop-shadow-md"
                draggable={false}
            />
        </motion.div>
    );
};
