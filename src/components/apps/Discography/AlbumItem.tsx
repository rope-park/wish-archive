/**
 * Album Item Component
 */

import Image from 'next/image';
import { useState } from 'react';
import { differenceInDays } from 'date-fns';
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

// 앨범 타입 라벨
export const getAlbumTypeLabel = (type: string) => {
    switch (type) {
        case 'STUDIO_ALBUM': return 'FULL';
        case 'MINI_ALBUM': return 'EP';
        case 'SINGLE': return 'SINGLE';
        default: return type;
    }
};

export default function AlbumItem({ album, onClick }: AlbumItemProps) {
    const [isHovered, setIsHovered] = useState(false);

    // 발매일 포맷팅 (YYYY.MM.DD)
    const releaseDateObj = new Date(album.releaseDate);
    const formattedDate = album.releaseDate
        ? new Date(album.releaseDate).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        }).replace(/\./g, '.').slice(0, -1)
        : '';


    // New 배지 조건: 발매일로부터 60일 이내
    const isNew = Math.abs(differenceInDays(new Date(), releaseDateObj)) <= 60;

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`${album.title} 앨범 열기`}
            className="group relative flex flex-col items-center cursor-pointer w-[180px] sm:w-[200px] md:w-[220px] select-none pb-8 touch-target"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            style={{
                WebkitTapHighlightColor: 'transparent',
                touchAction: 'manipulation',
            }}
        >
            {/* 1. LP 디스크 레이어 - 앨범 커버 뒤에 완전히 숨어있다가 호버시 오른쪽으로 굴러나옴 */}
            <div
                className={`
                    absolute top-[50%] -translate-y-1/2 left-0
                    w-[180px] h-[180px] md:w-[200px] md:h-[200px]
                    rounded-full bg-black shadow-2xl
                    flex items-center justify-center z-0
                    transition-all duration-700 ease-in-out
                    ${isHovered ? 'translate-x-[140px] md:translate-x-[160px] rotate-[360deg]' : 'translate-x-0 rotate-0'}
                    group-active:translate-x-[140px] md:group-active:translate-x-[160px] group-active:rotate-[360deg]
                `}
                style={{
                    background: 'radial-gradient(circle at 30% 30%, #2a2a2a 0%, #1a1a1a 20%, #0a0a0a 50%, #000000 100%)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.8), inset 0 1px 3px rgba(255,255,255,0.1), inset 0 -2px 8px rgba(0,0,0,0.6)'
                }}
            >
                {/* LP 동심원 홈 텍스처 - 실제 LP판처럼 */}
                <div className="absolute inset-0 rounded-full opacity-40" style={{
                    background: `
                        repeating-radial-gradient(circle at center,
                            transparent 0px,
                            transparent 2px,
                            rgba(255,255,255,0.08) 2px,
                            rgba(255,255,255,0.08) 2.5px,
                            transparent 2.5px,
                            transparent 5px
                        )
                    `
                }} />
                {/* LP 광택 효과 */}
                <div className="absolute inset-0 rounded-full" style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.08) 100%)'
                }} />
                {/* LP 중앙 라벨 - 흰색/회색 */}
                <div className="w-[40%] h-[40%] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-full border-2 border-gray-400 relative z-10 flex items-center justify-center" style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.5)'
                }}>
                    {/* 중앙 구멍 */}
                    <div className="w-[20%] h-[20%] bg-black rounded-full border border-gray-500" style={{
                        boxShadow: '0 1px 3px rgba(0,0,0,0.6) inset'
                    }} />
                </div>
            </div>

            {/* 2. 앨범 커버 레이어 - 선반 위에 세워진 느낌 */}
            <div className="
                relative z-10
                w-[180px] h-[180px] md:w-[200px] md:h-[200px]
                rounded-md
                transition-all duration-300
                group-hover:-translate-y-6 group-hover:scale-[1.03] group-hover:shadow-2xl
                group-active:-translate-y-6
                bg-white
                shadow-[0_15px_35px_rgba(0,0,0,0.5),0_8px_15px_rgba(0,0,0,0.3),0_3px_8px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.4)]
                before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-black/10 before:pointer-events-none before:z-10
                after:absolute after:-bottom-3 after:left-[10%] after:right-[10%] after:h-3 after:bg-black/40 after:blur-xl after:rounded-full
                ">
                <div className='absolute inset-0 rounded-md overflow-hidden border-2 border-black/20'>
                    {album.coverImageUrl ? (
                        <Image
                            src={album.coverImageUrl}
                            alt={album.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 140px, 160px"
                            priority={false}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-xs text-gray-300 font-bold bg-gray-50 rounded-md">
                            <span>NO COVER</span>
                        </div>
                    )}

                    {/* Glossy 오버레이 - 앨범 케이스 반사 효과 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-black/20 rounded-md pointer-events-none" />
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/15 to-transparent rounded-t-md pointer-events-none" />
                    {/* 플라스틱 케이스 반사광 */}
                    <div className="absolute top-[10%] left-[10%] w-1/3 h-1/4 bg-white/20 blur-lg rounded-full pointer-events-none" />
                </div>

                { /* Badge 컴포넌트 - New 배지 */}
                {isNew && (
                    <Badge
                        variant='outline'
                        size='sm'
                        className='
                        absolute -top-2 -right-2 z-20
                        animate-pulse shadow-md border-white
                        px-1.5 py-0.5 text-[9px]
                        '
                    >
                        NEW
                    </Badge>
                )}
            </div>

            {/* 3. 앨범 정보 */}
            <div className="mt-4 text-center z-20 w-full px-1">
                <h3 className="font-bold text-sm text-gray-800 leading-tight line-clamp-2 h-[2.5em] group-hover:text-blue-500 transition-colors font-pixel">
                    {album.title}
                </h3>

                <div className="flex items-center justify-center gap-2 mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-bold border border-gray-400 rounded px-1 text-black bg-white/50">
                        {getAlbumTypeLabel(album.type)}
                    </span>
                    <span className="text-[10px] text-gray-600 font-mono tracking-tight">
                        {formattedDate}
                    </span>
                </div>
            </div>
        </div>
    );
};