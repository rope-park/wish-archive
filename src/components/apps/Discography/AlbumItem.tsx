/**
 * Album Item Component
 */

import Image from 'next/image';
import { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui';
import { Album, Track, Group } from '@prisma/client';

export interface AlbumWithTracks extends Album {
    tracks: Track[];
    group: Group;
}

interface AlbumItemProps {
    album: AlbumWithTracks;
    onClick: () => void;
}

export const AlbumItem = ({ album, onClick }: AlbumItemProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const formattedDate = album.releaseDate
        ? new Date(album.releaseDate).toLocaleDateString('ko-KR', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\./g, '.').slice(0, -1)
        : '';

    return (
        <div
            className="group relative flex flex-col items-center cursor-pointer w-[160px] md:w-[180px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            {/* CD Disk Layer (Animated) */}
            <div
                className={`
                    absolute top-2 left-2 w-[140px] h-[140px] md:w-[160px] md:h-[160px] 
                    rounded-full bg-black shadow-lg z-0 flex items-center justify-center
                    transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${isHovered ? 'translate-x-[50%] rotate-[180deg]' : 'translate-x-0 rotate-0'}
                `}
            >
                {/* CD Texture */}
                <div className="absolute inset-0 rounded-full border-[6px] border-gray-800 opacity-50" />
                <div className="w-1/3 h-1/3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20" />
            </div>

            {/* Album Cover Layer */}
            <div className="relative z-10 w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-md shadow-lg transition-transform duration-300 group-hover:-translate-y-2 group-hover:shadow-xl bg-gray-100 border border-gray-200/50">
                {album.coverImageUrl ? (
                    <Image
                        src={album.coverImageUrl}
                        alt={album.title}
                        fill
                        className="object-cover rounded-md"
                        sizes="(max-width: 768px) 140px, 160px"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-xs text-gray-300 font-bold bg-gray-50 rounded-md">
                        NO COVER
                    </div>
                )}

                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 rounded-md pointer-events-none" />

                {/* New Badge (Optional: released within 30 days) */}
                {/* {isNew && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold shadow-sm">NEW</div>} */}
            </div>

            {/* Album Info */}
            <div className="mt-5 text-center z-20 w-full px-1">
                <h3 className="font-bold text-sm text-gray-900 leading-tight line-clamp-2 h-[2.5em] group-hover:text-blue-600 transition-colors">
                    {album.title}
                </h3>

                <div className="flex items-center justify-center gap-2 mt-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold border border-gray-300 rounded px-1 text-gray-500">
                        {album.type === 'STUDIO_ALBUM' ? 'ALBUM' : (album.type === 'MINI_ALBUM' ? 'EP' : 'SINGLE')}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                        {formattedDate}
                    </span>
                </div>
            </div>
        </div>
    );
};