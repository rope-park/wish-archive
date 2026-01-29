/**
 * Mini Player Component
 * - 화면 하단에 고정된 작은 플레이어
 * - 드래그로 위치 이동 가능
 * - 확장/축소 가능
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useAudioStore } from '@/app/stores/useAudioStore';
import { Play, Pause, SkipBack, SkipForward, X, Maximize2, Minimize2, Volume2, VolumeX } from 'lucide-react';
import Image from 'next/image';
import { Z_INDEX } from '@/lib/z-index';

export default function MiniPlayer() {
    const {
        showMiniPlayer,
        miniPlayerExpanded,
        miniPlayerPosition,
        currentTrack,
        isPlaying,
        togglePlay,
        playNext,
        playPrev,
        volume,
        isMuted,
        setVolume,
        toggleMute,
        currentTime,
        duration,
        toggleMiniPlayer,
        setMiniPlayerExpanded,
        setMiniPlayerPosition
    } = useAudioStore();

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const playerRef = useRef<HTMLDivElement>(null);

    // 드래그 시작
    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return; // 버튼 클릭 시 드래그 방지
        setIsDragging(true);
        const rect = playerRef.current?.getBoundingClientRect();
        if (rect) {
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    };

    // 드래그 중
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            const newX = e.clientX - dragOffset.x;
            const newY = e.clientY - dragOffset.y;
            
            // 화면 경계 체크
            const maxX = window.innerWidth - (miniPlayerExpanded ? 400 : 300);
            const maxY = window.innerHeight - (miniPlayerExpanded ? 200 : 80);
            
            setMiniPlayerPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY))
            });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragOffset, miniPlayerExpanded, setMiniPlayerPosition]);

    // 시간 포맷
    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    if (!showMiniPlayer || !currentTrack) return null;

    return (
        <div
            ref={playerRef}
            className={`fixed transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'} ${
                miniPlayerExpanded ? 'w-[400px]' : 'w-[300px]'
            }`}
            style={{
                left: `${miniPlayerPosition.x}px`,
                top: `${miniPlayerPosition.y}px`,
                userSelect: isDragging ? 'none' : 'auto',
                zIndex: Z_INDEX.MINI_PLAYER,
            }}
            onMouseDown={handleMouseDown}
        >
            <div className="bg-black/95 backdrop-blur-xl border-2 border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header: Album Art + Info */}
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-white/10 to-transparent">
                    {currentTrack.iconUrl && (
                        <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
                            <Image
                                src={currentTrack.iconUrl}
                                alt={currentTrack.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{currentTrack.title}</p>
                        <p className="text-gray-400 text-xs truncate">Track {currentTrack.trackNumber}</p>
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMiniPlayerExpanded(!miniPlayerExpanded);
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0"
                    >
                        {miniPlayerExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMiniPlayer();
                        }}
                        className="p-2 hover:bg-white/10 rounded-lg transition flex-shrink-0"
                    >
                        <X size={16} className="text-gray-400" />
                    </button>
                </div>

                {/* Controls */}
                <div className="px-4 py-3">
                    <div className="flex items-center justify-center gap-4 mb-3">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                playPrev();
                            }}
                            className="p-2 hover:bg-white/10 rounded-full transition"
                        >
                            <SkipBack size={18} className="text-white" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                togglePlay();
                            }}
                            className="p-3 bg-white hover:bg-gray-200 rounded-full transition shadow-lg"
                        >
                            {isPlaying ? (
                                <Pause size={20} className="text-black" fill="black" />
                            ) : (
                                <Play size={20} className="text-black ml-0.5" fill="black" />
                            )}
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                playNext();
                            }}
                            className="p-2 hover:bg-white/10 rounded-full transition"
                        >
                            <SkipForward size={18} className="text-white" />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                        <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-wish-green transition-all duration-300"
                                style={{ width: `${(currentTime / duration) * 100}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-[10px] text-gray-400">
                            <span>{formatTime(currentTime)}</span>
                            <span>{formatTime(duration)}</span>
                        </div>
                    </div>

                    {/* Expanded: Volume Control */}
                    {miniPlayerExpanded && (
                        <div className="mt-3 flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleMute();
                                }}
                                className="p-1.5 hover:bg-white/10 rounded-lg transition"
                            >
                                {isMuted ? (
                                    <VolumeX size={16} className="text-gray-400" />
                                ) : (
                                    <Volume2 size={16} className="text-white" />
                                )}
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={isMuted ? 0 : volume}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    setVolume(Number(e.target.value));
                                }}
                                className="flex-1 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                                style={{
                                    background: `linear-gradient(to right, rgb(139, 218, 106) 0%, rgb(139, 218, 106) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) ${isMuted ? 0 : volume}%, rgba(255,255,255,0.2) 100%)`
                                }}
                            />
                            <span className="text-xs text-gray-400 w-8 text-right">{isMuted ? 0 : volume}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
