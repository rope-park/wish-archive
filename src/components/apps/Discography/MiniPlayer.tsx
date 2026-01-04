'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Album, Track } from '@prisma/client';
import { useAudioStore } from '@/app/stores/useAudioStore';
import { Play, Pause, SkipBack, SkipForward, X, Maximize2, Minimize2, GripVertical } from 'lucide-react';
import Image from 'next/image';

interface ExtendedAlbum extends Album {
    tracks: Track[];
}

interface MiniPlayerProps {
    currentAlbum: ExtendedAlbum;
}

export default function MiniPlayer({ currentAlbum }: MiniPlayerProps) {
    const {
        currentTrack,
        isPlaying,
        togglePlay,
        playNext,
        playPrev,
        toggleMiniPlayer,
        miniPlayerExpanded,
        setMiniPlayerExpanded,
        miniPlayerPosition,
        setMiniPlayerPosition,
        showMiniPlayer,
        playerRef,
        currentTime,
        duration,
        seekTo,
        setPlayerRef,
        volume,
        isMuted,
        setLoading
    } = useAudioStore();

    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const miniPlayerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [isSeeking, setIsSeeking] = useState(false);
    const videoContainerRef = useRef<HTMLDivElement>(null);
    const playerInstanceRef = useRef<YT.Player | null>(null);

    // 초기 위치 설정 (우하단)
    useEffect(() => {
        if (!miniPlayerPosition.x && !miniPlayerPosition.y) {
            setMiniPlayerPosition({
                x: window.innerWidth - (miniPlayerExpanded ? 380 : 280) - 20,
                y: window.innerHeight - (miniPlayerExpanded ? 200 : 80) - 20
            });
        }
    }, []);

    // 드래그 시작 (마우스)
    const handleMouseDown = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) return; // 버튼 클릭 시 드래그 방지
        
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - miniPlayerPosition.x,
            y: e.clientY - miniPlayerPosition.y
        });
    };

    // 드래그 시작 (터치)
    const handleTouchStart = (e: React.TouchEvent) => {
        if ((e.target as HTMLElement).closest('button')) return;
        
        const touch = e.touches[0];
        setIsDragging(true);
        setDragOffset({
            x: touch.clientX - miniPlayerPosition.x,
            y: touch.clientY - miniPlayerPosition.y
        });
    };

    // 드래그 중 (마우스)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return;
            
            const newX = Math.max(0, Math.min(window.innerWidth - (miniPlayerExpanded ? 380 : 280), e.clientX - dragOffset.x));
            const newY = Math.max(0, Math.min(window.innerHeight - (miniPlayerExpanded ? 200 : 80), e.clientY - dragOffset.y));
            
            setMiniPlayerPosition({ x: newX, y: newY });
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
    }, [isDragging, dragOffset, miniPlayerExpanded]);

    // 드래그 중 (터치)
    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            const newX = Math.max(0, Math.min(window.innerWidth - (miniPlayerExpanded ? 380 : 280), touch.clientX - dragOffset.x));
            const newY = Math.max(0, Math.min(window.innerHeight - (miniPlayerExpanded ? 200 : 80), touch.clientY - dragOffset.y));
            
            setMiniPlayerPosition({ x: newX, y: newY });
        };

        const handleTouchEnd = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('touchmove', handleTouchMove);
            document.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, dragOffset, miniPlayerExpanded]);

    // 재생바 클릭/터치 핸들러
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !duration) return;
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newTime = percentage * duration;
        seekTo(newTime);
    };

    const handleProgressTouch = (e: React.TouchEvent<HTMLDivElement>) => {
        if (!progressBarRef.current || !duration) return;
        const touch = e.touches[0];
        const rect = progressBarRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const percentage = Math.max(0, Math.min(1, x / rect.width));
        const newTime = percentage * duration;
        seekTo(newTime);
    };

    // 시간 포맷팅
    const formatTime = (seconds: number) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // YouTube 영상 ID 추출
    const getYoutubeId = () => {
        if (!currentTrack?.mvUrl && !currentTrack?.audioUrl) return null;
        const url = currentTrack.mvUrl || currentTrack.audioUrl;
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
        return match ? match[1] : null;
    };

    const youtubeId = getYoutubeId();

    // YouTube IFrame API player 초기화 (expanded 모드일 때만)
    useEffect(() => {
        if (!miniPlayerExpanded || !youtubeId || !videoContainerRef.current) {
            // Expanded 모드가 아니거나 videoId가 없으면 player 정리
            if (playerInstanceRef.current) {
                try {
                    playerInstanceRef.current.destroy();
                } catch (e) {
                    console.error('Error destroying player:', e);
                }
                playerInstanceRef.current = null;
                setPlayerRef(null);
            }
            return;
        }

        // YouTube API 스크립트 로드
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const initPlayer = () => {
            if (!videoContainerRef.current || !window.YT) return;

            // 기존 player가 있으면 video만 변경
            if (playerInstanceRef.current && typeof playerInstanceRef.current.loadVideoById === 'function') {
                try {
                    playerInstanceRef.current.loadVideoById(youtubeId);
                    return;
                } catch (e) {
                    console.log('Player error, recreating...', e);
                    if (playerInstanceRef.current) {
                        playerInstanceRef.current.destroy();
                    }
                    playerInstanceRef.current = null;
                }
            }

            // 새 player 생성
            playerInstanceRef.current = new window.YT.Player(videoContainerRef.current, {
                videoId: youtubeId,
                width: '100%',
                height: '100%',
                playerVars: {
                    autoplay: 1,
                    controls: 1,
                    modestbranding: 1,
                    rel: 0,
                    playsinline: 1,
                },
                events: {
                    onReady: (event: YT.OnReadyEvent) => {
                        const player = event.target;
                        setPlayerRef(player); // Store에 저장
                        if (typeof player.setVolume === 'function') {
                            player.setVolume(volume);
                        }
                        if (isPlaying && typeof player.playVideo === 'function') {
                            player.playVideo();
                        }
                    },
                }
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (playerInstanceRef.current) {
                try {
                    playerInstanceRef.current.destroy();
                } catch (e) {
                    console.error('Error destroying player:', e);
                }
                playerInstanceRef.current = null;
            }
        };
    }, [miniPlayerExpanded, youtubeId]);

    // isPlaying 상태 동기화
    useEffect(() => {
        const player = playerInstanceRef.current;
        if (player && typeof player.playVideo === 'function') {
            if (isPlaying) {
                player.playVideo();
            } else {
                player.pauseVideo();
            }
        }
    }, [isPlaying]);

    if (!showMiniPlayer || !currentTrack) return null;

    return (
        <div
            ref={miniPlayerRef}
            className={`fixed z-[9999] bg-black/95 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transition-all duration-300 ${
                isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'
            } ${
                miniPlayerExpanded ? 'w-[380px]' : 'w-[280px]'
            }`}
            style={{
                left: `${miniPlayerPosition.x}px`,
                top: `${miniPlayerPosition.y}px`,
                height: miniPlayerExpanded ? '200px' : '80px'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            {/* Header - Drag Handle */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
                <div className="flex items-center gap-2 text-gray-400">
                    <GripVertical size={16} />
                    <span className="text-xs font-medium">Now Playing</span>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMiniPlayerExpanded(!miniPlayerExpanded);
                        }}
                        className="p-1.5 hover:bg-white/10 rounded transition text-gray-400 hover:text-white"
                        title={miniPlayerExpanded ? 'Collapse' : 'Expand'}
                    >
                        {miniPlayerExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleMiniPlayer();
                        }}
                        className="p-1.5 hover:bg-white/10 rounded transition text-gray-400 hover:text-white"
                        title="Close Mini Player"
                    >
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col h-[calc(100%-44px)]">
                {miniPlayerExpanded ? (
                    // Expanded View
                    <div className="flex flex-col gap-2 h-full">
                        {/* YouTube Video */}
                        {youtubeId && (
                            <div 
                                ref={videoContainerRef}
                                className="relative w-full aspect-video rounded-lg overflow-hidden bg-black shrink-0"
                            />
                        )}

                        {/* Track Info */}
                        <div className="flex-1 min-w-0 px-1">
                            <h3 className="text-white font-bold text-sm truncate">{currentTrack.title}</h3>
                            <p className="text-gray-400 text-xs truncate">NCT WISH · {currentAlbum.title}</p>
                        </div>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                            <div 
                                ref={progressBarRef}
                                className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group"
                                onClick={handleProgressClick}
                                onTouchStart={(e) => {
                                    e.stopPropagation();
                                    setIsSeeking(true);
                                }}
                                onTouchMove={(e) => {
                                    if (isSeeking) handleProgressTouch(e);
                                }}
                                onTouchEnd={() => setIsSeeking(false)}
                            >
                                <div 
                                    className="absolute top-0 left-0 h-full bg-wish-green rounded-full transition-all"
                                    style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                                />
                                <div 
                                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                    style={{ left: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`, transform: 'translate(-50%, -50%)' }}
                                />
                            </div>
                            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
                                <span>{formatTime(currentTime)}</span>
                                <span>{formatTime(duration)}</span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4 mt-auto">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playPrev();
                                }}
                                className="p-2 hover:bg-white/10 rounded-full transition text-white active:scale-95"
                            >
                                <SkipBack size={20} fill="currentColor" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    togglePlay();
                                }}
                                className="p-3 bg-wish-green hover:bg-wish-green/80 rounded-full transition text-black active:scale-95 shadow-lg shadow-wish-green/30"
                            >
                                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    playNext();
                                }}
                                className="p-2 hover:bg-white/10 rounded-full transition text-white active:scale-95"
                            >
                                <SkipForward size={20} fill="currentColor" />
                            </button>
                        </div>
                    </div>
                ) : (
                    // Compact View
                    <div className="flex flex-col gap-2 h-full">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white/5">
                                {currentAlbum.coverImageUrl ? (
                                    <Image
                                        src={currentAlbum.coverImageUrl}
                                        alt={currentTrack.title}
                                        fill
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                                        <Play size={20} />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-medium text-sm truncate">{currentTrack.title}</h3>
                                <p className="text-gray-400 text-xs truncate">NCT WISH</p>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playPrev();
                                    }}
                                    className="p-1.5 hover:bg-white/10 rounded transition text-white active:scale-95"
                                >
                                    <SkipBack size={16} fill="currentColor" />
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        togglePlay();
                                    }}
                                    className="p-2 bg-wish-green hover:bg-wish-green/80 rounded-full transition text-black active:scale-95"
                                >
                                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        playNext();
                                    }}
                                    className="p-1.5 hover:bg-white/10 rounded transition text-white active:scale-95"
                                >
                                    <SkipForward size={16} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                        {/* Progress Bar */}
                        <div 
                            ref={progressBarRef}
                            className="relative h-1 bg-white/10 rounded-full cursor-pointer group"
                            onClick={handleProgressClick}
                            onTouchStart={(e) => {
                                e.stopPropagation();
                                setIsSeeking(true);
                            }}
                            onTouchMove={(e) => {
                                if (isSeeking) handleProgressTouch(e);
                            }}
                            onTouchEnd={() => setIsSeeking(false)}
                        >
                            <div 
                                className="absolute top-0 left-0 h-full bg-wish-green rounded-full transition-all"
                                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
