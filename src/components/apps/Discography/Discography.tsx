/**
 * APP: Discography
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Album, Track } from '@prisma/client';
import { useAudioStore } from '@/app/stores/useAudioStore';
import Image from 'next/image';
import {
    Play, Pause, SkipBack, SkipForward, Maximize2, Minimize2,
    Music, ChevronLeft, ChevronRight, Volume2, Shuffle, Repeat, Repeat1, Loader2, Search, Filter,
    Heart, Share2, BarChart2, List
} from 'lucide-react';

// ------------------------------------------------------------------
// 타입 정의
// ------------------------------------------------------------------
interface ExtendedAlbum extends Album {
    tracks: Track[];
}

interface DiscographyProps { 
    onClose?: () => void;
}

// ------------------------------------------------------------------
// YouTube API용 컴포넌트
// ------------------------------------------------------------------
function YouTubeBackground({
    videoId,
    isFullscreen
}: {
    videoId: string | null,
    isFullscreen: boolean
}) {
    const { setPlayerRef, isPlaying, volume, isMuted, setLoading } = useAudioStore();
    const playerInstanceRef = useRef<YT.Player | null>(null); // YT.Player 인스턴스
    const containerRef = useRef<HTMLDivElement>(null);

    // 1. YouTube IFrame API 로드 및 플레이어 초기화
    useEffect(() => {
        if (!videoId) {
            // videoId가 없으면 플레이어 정리
            if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
                playerInstanceRef.current.destroy();
                playerInstanceRef.current = null;
            }
            return;
        }

        // API 스크립트가 없으면 로드
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        const initPlayer = () => {
            if (!containerRef.current || !window.YT) return;

            // 이미 플레이어가 있으면 곡만 로드
            if (playerInstanceRef.current && typeof playerInstanceRef.current.loadVideoById === 'function') {
                try {
                    playerInstanceRef.current.loadVideoById(videoId);
                    return;
                } catch (e) {
                    // 플레이어가 손상된 경우 재생성
                    console.log('Player error, recreating...', e);
                    if (typeof playerInstanceRef.current.destroy === 'function') {
                        playerInstanceRef.current.destroy();
                    }
                    playerInstanceRef.current = null;
                }
            }

            // 새 플레이어 생성
            playerInstanceRef.current = new window.YT.Player(containerRef.current, {
                videoId: videoId,
                playerVars: {
                    autoplay: 1, // 자동 재생
                    controls: 0, // 컨트롤러 숨김 (커스텀 UI 사용)
                    disablekb: 1,
                    fs: 0,
                    loop: 1,
                    playlist: videoId, // 루프를 위해 필요
                    modestbranding: 1,
                    playsinline: 1,
                    rel: 0,
                    vq: 'hd1080', // 화질 설정: hd1080 우선
                },
                events: {
                    onReady: (event: YT.OnReadyEvent) => {
                        const player = event.target;
                        setPlayerRef(player); // Store에 제어 권한 위임
                        setLoading(false); // 로딩 완료
                        if (typeof player.setVolume === 'function') {
                            player.setVolume(isMuted ? 0 : volume);
                        }
                        // 화질 설정 (hd1080 우선, 없으면 hd720)
                        if (typeof player.setPlaybackQuality === 'function') {
                            player.setPlaybackQuality('hd1080');
                        }
                        if (isPlaying && typeof player.playVideo === 'function') {
                            player.playVideo();
                        }
                    },
                    onStateChange: (event: YT.OnReadyEvent | YT.OnStateChangeEvent) => {
                        // State 0: 종료, 1: 재생 중, 2: 일시정지, 3: 버퍼링, 5: 큐잉
                        if ('getPlayerState' in event.target) {
                            const state = event.target.getPlayerState();
                            if (state === 3) {
                                setLoading(true); // 버퍼링 중
                            } else if (state === 1 || state === 2) {
                                setLoading(false); // 재생 중 또는 일시정지
                            }
                        }
                    },
                    onError: (event: { data: number }) => {
                        console.error('YouTube Player Error:', event.data);
                        // 2: Invalid parameter (잘못된 비디오 ID)
                        // 5: HTML5 player error
                        // 100: 비디오를 찾을 수 없음
                        // 101/150: 임베드 허용되지 않음
                        setLoading(false);
                    }
                }
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        // 클린업: 컴포넌트 언마운트 시 플레이어 정리
        return () => {
            if (playerInstanceRef.current && typeof playerInstanceRef.current.destroy === 'function') {
                playerInstanceRef.current.destroy();
                playerInstanceRef.current = null;
            }
        };

    }, [videoId, setPlayerRef]);

    // 2. 스토어 상태(isPlaying) 변경에 따른 반응
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

    // videoId가 없어도 컨테이너는 유지 (플레이어 재초기화를 위해)
    return (
        <div className={`absolute inset-0 w-full h-full transition-all duration-700 pointer-events-none overflow-hidden
      ${isFullscreen ? 'z-50 opacity-100 bg-black' : 'z-0 opacity-60 blur-md scale-110'}`}
        >
            {/* 실제 YouTube Iframe이 마운트될 컨테이너 */}
            <div
                ref={containerRef}
                className="w-full h-full"
                style={{ 
                    pointerEvents: isFullscreen ? 'auto' : 'none',
                    display: videoId ? 'block' : 'none' // videoId가 없으면 숨김
                }}
            />
        </div>
    );
}


// ------------------------------------------------------------------
// 메인 Discography 컴포넌트
// ------------------------------------------------------------------
export default function Discography({ onClose }: DiscographyProps) {
    const [albums, setAlbums] = useState<ExtendedAlbum[]>([]);
    const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedYear, setSelectedYear] = useState<string>('all');
    const [selectedType, setSelectedType] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'date-desc' | 'date-asc' | 'title-asc' | 'title-desc'>('date-desc');
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [playHistory, setPlayHistory] = useState<Array<{trackId: string, timestamp: number}>>([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => {
        fetch('/api/discography')
            .then((res) => res.json())
            .then((data) => {
                setAlbums(data);
                setLoading(false);
            });

        // localStorage에서 즐겨찾기와 재생 기록 로드
        const savedFavorites = localStorage.getItem('discography_favorites');
        if (savedFavorites) {
            // eslint-disable-next-line
            setFavorites(new Set(JSON.parse(savedFavorites)));
        }
        const savedHistory = localStorage.getItem('discography_history');
        if (savedHistory) {
            setPlayHistory(JSON.parse(savedHistory));
        }
    }, []);

    // 즐겨찾기 토글
    const toggleFavorite = (trackId: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(trackId)) {
                newFavorites.delete(trackId);
            } else {
                newFavorites.add(trackId);
            }
            localStorage.setItem('discography_favorites', JSON.stringify(Array.from(newFavorites)));
            return newFavorites;
        });
    };

    // 재생 기록 추가
    const addToHistory = (trackId: string) => {
        setPlayHistory(prev => {
            const newHistory = [{ trackId, timestamp: Date.now() }, ...prev.slice(0, 49)]; // 최대 50개
            localStorage.setItem('discography_history', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    // 공유 기능
    const shareTrack = async (track: Track) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: track.title,
                    text: `Check out "${track.title}" by NCT WISH!`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            // Fallback: 클립보드에 복사
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    // 검색 및 필터링
    const filteredAlbums = albums.filter(album => {
        // 검색어 필터
        const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            album.tracks.some(track => track.title.toLowerCase().includes(searchQuery.toLowerCase()));
        
        // 연도 필터
        const albumYear = new Date(album.releaseDate).getFullYear().toString();
        const matchesYear = selectedYear === 'all' || albumYear === selectedYear;
        
        // 타입 필터
        const matchesType = selectedType === 'all' || album.type === selectedType;
        
        return matchesSearch && matchesYear && matchesType;
    }).sort((a, b) => {
        // 정렬
        switch(sortBy) {
            case 'date-desc':
                return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
            case 'date-asc':
                return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'title-desc':
                return b.title.localeCompare(a.title);
            default:
                return 0;
        }
    });

    // 사용 가능한 연도 추출
    const availableYears = Array.from(new Set(albums.map(a => new Date(a.releaseDate).getFullYear())))
        .sort((a, b) => b - a);
    
    // 사용 가능한 타입 추출
    const availableTypes = Array.from(new Set(albums.map(a => a.type).filter(Boolean)));

    if (loading) return <div className="flex h-full items-center justify-center text-white">Loading...</div>;

    if (selectedAlbumIndex !== null) {
        return (
            <AlbumDetailView
                albums={albums}
                currentIndex={selectedAlbumIndex}
                onBack={() => setSelectedAlbumIndex(null)}
                onNavigate={(index) => setSelectedAlbumIndex(index)}
            />
        );
    }

    return (
        <div className="h-full flex flex-col">
            {/* 검색 바 및 필터 */}
            <div className="flex-none p-4 sm:p-6 pb-3">
                <div className="max-w-4xl mx-auto space-y-3">
                    {/* 검색 바 */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search albums or tracks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-wish-green/50 focus:border-wish-green/50 transition"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition text-xl leading-none"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    {/* 필터 */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Filter size={16} className="text-gray-400 flex-shrink-0" />
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc')}
                            className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-wish-green/50 focus:border-wish-green/50 transition"
                        >
                            <option value="date-desc" className="bg-gray-900">Newest First</option>
                            <option value="date-asc" className="bg-gray-900">Oldest First</option>
                            <option value="title-asc" className="bg-gray-900">Title A-Z</option>
                            <option value="title-desc" className="bg-gray-900">Title Z-A</option>
                        </select>
                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-wish-green/50 focus:border-wish-green/50 transition"
                        >
                            <option value="all" className="bg-gray-900">All Years</option>
                            {availableYears.map(year => (
                                <option key={year} value={year} className="bg-gray-900">{year}</option>
                            ))}
                        </select>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="flex-1 px-3 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-wish-green/50 focus:border-wish-green/50 transition"
                        >
                            <option value="all" className="bg-gray-900">All Types</option>
                            {availableTypes.map(type => (
                                <option key={type} value={type} className="bg-gray-900">{type}</option>
                            ))}
                        </select>
                        {(selectedYear !== 'all' || selectedType !== 'all' || sortBy !== 'date-desc') && (
                            <button
                                onClick={() => {
                                    setSelectedYear('all');
                                    setSelectedType('all');
                                    setSortBy('date-desc');
                                }}
                                className="px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-white text-xs transition whitespace-nowrap"
                            >
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* 앨범 그리드 */}
            <div className="flex-1 overflow-y-auto">
                {filteredAlbums.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                        <Search size={48} className="mb-3 opacity-30" />
                        <p className="text-lg">No results found</p>
                        <p className="text-sm">Try a different search term</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 p-4 sm:p-6 md:p-8 pt-2 content-start custom-scrollbar">
                        {filteredAlbums.map((album) => {
                            // 원본 albums 배열에서의 인덱스 찾기
                            const originalIdx = albums.findIndex(a => a.id === album.id);
                            return (
                                <div
                                    key={album.id}
                                    className="group cursor-pointer flex flex-col items-center gap-2 sm:gap-3 active:scale-95 transition-transform"
                                    onClick={() => setSelectedAlbumIndex(originalIdx)}
                                    style={{ touchAction: 'manipulation' }}
                                >
                                    <div className="relative w-full aspect-square max-w-[200px] mx-auto rounded-lg shadow-lg overflow-hidden transition-all group-hover:scale-105 group-hover:shadow-2xl group-active:scale-100">
                                        {album.coverImageUrl ? (
                                            <Image
                                                src={album.coverImageUrl}
                                                alt={album.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                                                priority={originalIdx < 5}
                                                quality={85}
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                        {/* 즐겨찾기 앨범 배지 */}
                                        {album.tracks.some(t => favorites.has(t.id)) && (
                                            <div className="absolute top-2 right-2 bg-red-500/90 backdrop-blur-sm p-1.5 rounded-full shadow-lg">
                                                <Heart size={12} fill="white" className="text-white" />
                                            </div>
                                        )}
                                        {/* 비닐 디스크 효과 */}
                                        <div className="absolute top-1/2 -right-6 sm:-right-8 w-32 h-32 sm:w-40 sm:h-40 -translate-y-1/2 bg-gradient-to-br from-black via-gray-900 to-black rounded-full -z-10 group-hover:-right-10 sm:group-hover:-right-12 transition-all duration-500 flex items-center justify-center shadow-2xl">
                                            <div className="absolute inset-0 rounded-full" style={{
                                                background: 'repeating-radial-gradient(circle at center, transparent 0%, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 6px)'
                                            }} />
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-2 border-gray-600 shadow-inner" />
                                        </div>
                                    </div>
                                    <div className="text-center w-full px-2">
                                        <h3 className="text-white font-bold text-xs sm:text-sm truncate">{album.title}</h3>
                                        <p className="text-gray-400 text-[10px] sm:text-xs">{new Date(album.releaseDate).getFullYear()}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}


// ------------------------------------------------------------------
// 상세 보기 컴포넌트
// ------------------------------------------------------------------
function AlbumDetailView({
    albums,
    currentIndex,
    onBack,
    onNavigate
}: {
    albums: ExtendedAlbum[],
    currentIndex: number,
    onBack: () => void,
    onNavigate: (index: number) => void
}) {
    const currentAlbum = albums[currentIndex];
    // 트랙 정렬
    const sortedTracks = [...currentAlbum.tracks].sort((a, b) => a.trackNumber - b.trackNumber);

    const { 
        currentTrack, isPlaying, playTrack, togglePlay, setPlaylist, playlist, 
        playerRef, setCurrentTime, setDuration, seekTo, currentTime, duration, 
        volume, isMuted, setVolume, setMuted,
        playMode, setPlayMode, playNext, playPrev, isLoading
    } = useAudioStore();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const [showLyrics, setShowLyrics] = useState(false);

    // localStorage에서 즐겨찾기 로드
    useEffect(() => {
        const savedFavorites = localStorage.getItem('discography_favorites');
        if (savedFavorites) {
            // eslint-disable-next-line
            setFavorites(new Set(JSON.parse(savedFavorites)));
        }
    }, []);

    // 즐겨찾기 토글
    const toggleFavorite = (trackId: string) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(trackId)) {
                newFavorites.delete(trackId);
            } else {
                newFavorites.add(trackId);
            }
            localStorage.setItem('discography_favorites', JSON.stringify(Array.from(newFavorites)));
            return newFavorites;
        });
    };

    // 공유 기능
    const shareTrack = async (track: Track) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: track.title,
                    text: `Check out "${track.title}" by NCT WISH!`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    };

    // 재생 시간 추적 및 Store 업데이트
    useEffect(() => {
        const interval = setInterval(() => {
            if (playerRef && isPlaying) {
                try {
                    const curr = playerRef.getCurrentTime();
                    const total = playerRef.getDuration();
                    if (curr !== undefined && total !== undefined) {
                        setCurrentTime(curr);
                        setDuration(total);
                    }
                } catch (e) {
                    // Player not ready
                }
            }
        }, 500);
        return () => clearInterval(interval);
    }, [playerRef, isPlaying, setCurrentTime, setDuration]);

    // 키보드 단축키
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // input, textarea에서는 단축키 무시
            if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
                return;
            }
            
            switch(e.code) {
                case 'Space':
                    e.preventDefault();
                    togglePlay();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    playPrev();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    playNext();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [togglePlay, playNext, playPrev]);

    // 자동 재생 및 동기화 로직
    useEffect(() => {
        if (sortedTracks.length === 0) return;

        // 현재 재생 중인 트랙이 이 앨범의 곡인지 확인
        const isCurrentAlbumPlaying = sortedTracks.some(t => t.id === currentTrack?.id);

        // 1. 앨범 진입 시: 다른 앨범을 듣고 있었거나 재생 중이 아니면 1번 트랙 자동 재생
        if (!isCurrentAlbumPlaying) {
            playTrack(sortedTracks[0]); // 상태 업데이트 -> isPlaying: true
            setPlaylist(sortedTracks);
        }
        // 2. 같은 앨범이면 플레이리스트만 갱신 (끊김 방지)
        else {
            // 이미 같은 플레이리스트라면 굳이 업데이트 안 함 (무한 렌더링 방지)
            const isPlaylistSame = playlist.length === sortedTracks.length && playlist[0]?.albumId === currentAlbum.id;
            if (!isPlaylistSame) {
                setPlaylist(sortedTracks);
            }
        }
    }, [currentAlbum.id]); // 앨범 변경 시에만 실행

    // YouTube ID 추출
    const getYoutubeId = (url: string | null | undefined) => {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    // 현재 재생 곡의 뮤비 우선, 없으면 1번 트랙 뮤비
    const targetTrack = currentTrack && currentAlbum.tracks.some(t => t.id === currentTrack.id)
        ? currentTrack
        : sortedTracks[0];
    const currentYoutubeId = getYoutubeId(targetTrack?.mvUrl);

    const formatTime = (seconds: number | null) => {
        if (!seconds) return "0:00";
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    };

    return (
        <div className="relative w-full h-full overflow-hidden flex flex-col md:flex-row">

            {/* 1. Background Player (Controlled via Store) */}
            <YouTubeBackground videoId={currentYoutubeId} isFullscreen={isFullscreen} />

            {/* Fallback Background if no video */}
            {!currentYoutubeId && (
                <div className="absolute inset-0 z-0">
                    {currentAlbum.coverImageUrl && (
                        <>
                            <Image
                                src={currentAlbum.coverImageUrl}
                                alt="Background"
                                fill
                                className="object-cover blur-2xl opacity-40"
                            />
                            {/* 그라데이션 오버레이 */}
                            <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60" />
                        </>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-48 h-48 sm:w-64 sm:h-64 bg-white/10 rounded-full animate-pulse flex items-center justify-center backdrop-blur-sm shadow-2xl">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 bg-white/5 rounded-full animate-pulse flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
                                <Music size={64} className="text-white/50" />
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen Close Button */}
            {isFullscreen && (
                <button
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-4 right-4 z-[60] p-2 bg-black/50 hover:bg-black/80 active:bg-black/90 text-white rounded-full transition-colors active:scale-95"
                    style={{ minWidth: '44px', minHeight: '44px' }}
                >
                    <Minimize2 size={24} className="mx-auto" />
                </button>
            )}

            {/* 2. Left Side Panels (3 Cards) */}
            <div className={`relative z-10 w-full md:w-[360px] lg:w-[400px] xl:w-[440px] h-full p-3 sm:p-4 flex flex-col gap-3 sm:gap-4 transition-transform duration-500 ${isFullscreen ? '-translate-x-full' : 'translate-x-0'}`}>

                {/* Card 1: Player Control */}
                <div className="flex-none h-[220px] sm:h-[240px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-5 flex flex-col justify-between shadow-xl">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <div className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-black flex-shrink-0 border-3 sm:border-4 border-gray-900 shadow-xl shadow-black/50 ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`}>
                            {/* 비닐 표면 그루브 */}
                            <div className="absolute inset-0 rounded-full" style={{
                                background: 'repeating-radial-gradient(circle at center, transparent 0%, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
                            }} />
                            {/* 레이블 (Orange) */}
                            <div className="absolute inset-[32%] bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 rounded-full border border-red-700 opacity-90 shadow-lg shadow-orange-500/30" />
                            {/* 중앙 구멍 */}
                            <div className="absolute inset-[46%] bg-black rounded-full border border-gray-800" />
                            {/* 반사 효과 */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                            {/* 글로우 */}
                            {isPlaying && (
                                <div className="absolute -inset-1 rounded-full bg-orange-500/20 blur-md animate-pulse" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                            <div className="mb-1 sm:mb-2">
                                <h2 className="text-white font-bold text-base sm:text-lg truncate leading-tight">{currentTrack?.title || "Select a track"}</h2>
                                <p className="text-gray-300 text-xs sm:text-sm truncate">NCT WISH</p>
                            </div>

                            <div className="flex items-center gap-2 sm:gap-4">
                                {/* 재생 모드 버튼 */}
                                <button 
                                    onClick={() => {
                                        const modes: Array<'normal' | 'shuffle' | 'repeat-all' | 'repeat-one'> = ['normal', 'shuffle', 'repeat-all', 'repeat-one'];
                                        const currentIdx = modes.indexOf(playMode);
                                        const nextMode = modes[(currentIdx + 1) % modes.length];
                                        setPlayMode(nextMode);
                                    }}
                                    className="text-gray-300 hover:text-white transition active:scale-95 p-2 -m-2"
                                    style={{ minWidth: '44px', minHeight: '44px' }}
                                    title={playMode === 'normal' ? 'Normal' : playMode === 'shuffle' ? 'Shuffle' : playMode === 'repeat-all' ? 'Repeat All' : 'Repeat One'}
                                >
                                    {playMode === 'shuffle' && <Shuffle size={16} className="sm:w-[18px] sm:h-[18px] mx-auto text-orange-400" />}
                                    {playMode === 'repeat-all' && <Repeat size={16} className="sm:w-[18px] sm:h-[18px] mx-auto text-orange-400" />}
                                    {playMode === 'repeat-one' && <Repeat1 size={16} className="sm:w-[18px] sm:h-[18px] mx-auto text-orange-400" />}
                                    {playMode === 'normal' && <Shuffle size={16} className="sm:w-[18px] sm:h-[18px] mx-auto opacity-30" />}
                                </button>
                                
                                <button 
                                    onClick={() => playPrev()}
                                    className="text-gray-300 hover:text-white transition active:scale-95 p-2 -m-2"
                                    style={{ minWidth: '44px', minHeight: '44px' }}
                                >
                                    <SkipBack size={18} className="sm:w-5 sm:h-5 mx-auto" />
                                </button>
                                <button
                                    onClick={togglePlay}
                                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white text-black rounded-full flex items-center justify-center hover:scale-110 active:scale-100 transition shadow-lg shadow-white/20"
                                    style={{ minWidth: '44px', minHeight: '44px' }}
                                >
                                    {isLoading ? (
                                        <Loader2 size={16} className="sm:w-[18px] sm:h-[18px] animate-spin" />
                                    ) : isPlaying ? (
                                        <Pause size={16} className="sm:w-[18px] sm:h-[18px]" fill="black" />
                                    ) : (
                                        <Play size={16} className="sm:w-[18px] sm:h-[18px] ml-0.5" fill="black" />
                                    )}
                                </button>
                                <button 
                                    onClick={() => playNext()}
                                    className="text-gray-300 hover:text-white transition active:scale-95 p-2 -m-2"
                                    style={{ minWidth: '44px', minHeight: '44px' }}
                                >
                                    <SkipForward size={18} className="sm:w-5 sm:h-5 mx-auto" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 재생 진행 바 */}
                    <div className="mt-auto">
                        {/* 시간 표시 */}
                        <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
                            <span className="font-mono">{formatTime(Math.floor(currentTime))}</span>
                            <span className="font-mono">-{formatTime(Math.floor(duration - currentTime))}</span>
                        </div>
                        
                        {/* 프로그레스 바 */}
                        <div 
                            className="relative w-full h-1.5 bg-white/10 rounded-full cursor-pointer group"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percentage = x / rect.width;
                                const newTime = percentage * duration;
                                seekTo(newTime);
                            }}
                            onTouchStart={(e) => {
                                const touch = e.touches[0];
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = touch.clientX - rect.left;
                                const percentage = Math.max(0, Math.min(1, x / rect.width));
                                const newTime = percentage * duration;
                                seekTo(newTime);
                            }}
                        >
                            {/* 진행된 부분 */}
                            <div 
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-wish-green to-blue-400 rounded-full transition-all duration-200 shadow-lg shadow-wish-green/30"
                                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                            >
                                {/* 드래그 핸들 */}
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </div>

                    {/* 볼륨 컨트롤 */}
                    <div className="flex items-center gap-2">
                        <Volume2 size={14} className="text-white/50 flex-shrink-0" />
                        <div 
                            className="flex-1 relative h-1.5 bg-white/10 rounded-full cursor-pointer group"
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const percentage = Math.max(0, Math.min(1, x / rect.width));
                                const newVolume = Math.round(percentage * 100);
                                setVolume(newVolume);
                                if (newVolume > 0) setMuted(false);
                            }}
                            onTouchStart={(e) => {
                                const touch = e.touches[0];
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = touch.clientX - rect.left;
                                const percentage = Math.max(0, Math.min(1, x / rect.width));
                                const newVolume = Math.round(percentage * 100);
                                setVolume(newVolume);
                                if (newVolume > 0) setMuted(false);
                            }}
                        >
                            <div 
                                className="absolute left-0 top-0 h-full bg-white/60 rounded-full transition-all duration-100"
                                style={{ width: `${volume}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                        <span className="text-[10px] text-white/50 font-mono w-8 text-right flex-shrink-0">{volume}</span>
                    </div>

                    {/* 가사/이퀄라이저 토글 버튼 */}
                    <div className="flex gap-2">
                        <button
                            onClick={() => setShowLyrics(!showLyrics)}
                            className={`flex-1 py-2 ${showLyrics ? 'bg-wish-green/30 border-wish-green/50' : 'bg-black/40 border-white/5'} hover:bg-black/60 active:bg-black/70 text-white/90 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition border active:scale-[0.98]`}
                            style={{ minHeight: '44px' }}
                        >
                            <List size={14} />
                            LYRICS
                        </button>
                        <button
                            className="flex-1 py-2 bg-black/40 hover:bg-black/60 active:bg-black/70 text-white/90 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition border border-white/5 active:scale-[0.98] relative overflow-hidden"
                            style={{ minHeight: '44px' }}
                        >
                            {/* 간단한 이퀄라이저 애니메이션 */}
                            {isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-0.5 bg-wish-green rounded-full animate-pulse"
                                            style={{
                                                height: '40%',
                                                animationDelay: `${i * 0.1}s`,
                                                animationDuration: '0.6s'
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                            <BarChart2 size={14} className={isPlaying ? 'opacity-0' : ''} />
                            <span className={isPlaying ? 'opacity-0' : ''}>EQ</span>
                        </button>
                    </div>

                    <button
                        onClick={() => setIsFullscreen(true)}
                        disabled={!currentYoutubeId}
                        className="w-full py-2 bg-black/40 hover:bg-black/60 active:bg-black/70 text-white/90 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed border border-white/5 active:scale-[0.98]"
                        style={{ minHeight: '44px' }}
                    >
                        <Maximize2 size={14} />
                        {currentYoutubeId ? 'WATCH OFFICIAL MV' : 'NO MV AVAILABLE'}
                    </button>
                </div>

                {/* Card 2: Tracklist / Lyrics */}
                <div className="flex-1 min-h-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-0 flex flex-col shadow-xl overflow-hidden">
                    <div className="p-3 sm:p-4 pb-2 flex items-center gap-3 sm:gap-4 border-b border-white/10">
                        <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 group">
                            {/* 비닐 디스크 */}
                            <div className="absolute top-0 right-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-black via-gray-900 to-black rounded-full ml-6 mt-1 transition-transform group-hover:translate-x-2 shadow-xl">
                                <div className="absolute inset-0 rounded-full" style={{
                                    background: 'repeating-radial-gradient(circle at center, transparent 0%, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
                                }} />
                                <div className="absolute inset-[35%] bg-gray-700 rounded-full border border-gray-600" />
                            </div>
                            {/* 앨범 커버 */}
                            {currentAlbum.coverImageUrl && (
                                <Image src={currentAlbum.coverImageUrl} alt="cover" fill className="relative z-10 rounded-md shadow-lg object-cover" />
                            )}
                        </div>
                        <div className="min-w-0 flex-1 pt-1">
                            <h3 className="text-white font-bold text-sm sm:text-base truncate">{currentAlbum.title}</h3>
                            <div className="flex items-center gap-2 text-[10px] sm:text-xs text-gray-400">
                                <span>{new Date(currentAlbum.releaseDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                <span>•</span>
                                <span>{sortedTracks.length} Songs</span>
                                <span>•</span>
                                <span>{formatTime(sortedTracks.reduce((sum, t) => sum + (t.durationSec || 0), 0))}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                setPlaylist(sortedTracks);
                                playTrack(sortedTracks[0]);
                            }}
                            className="flex-shrink-0 px-3 py-1.5 sm:px-4 sm:py-2 bg-wish-green/20 hover:bg-wish-green/30 active:bg-wish-green/40 text-wish-green border border-wish-green/30 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1.5 transition active:scale-95 shadow-lg shadow-wish-green/10"
                            style={{ minHeight: '36px' }}
                        >
                            <Play size={12} className="sm:w-[14px] sm:h-[14px]" fill="currentColor" />
                            PLAY ALL
                        </button>
                    </div>

                    {/* 트랙리스트 또는 가사 표시 */}
                    <div className="flex-1 overflow-y-auto p-2 custom-scrollbar space-y-1">
                        {showLyrics ? (
                            // 가사 표시 모드
                            <div className="p-4 text-center">
                                <h3 className="text-white font-bold mb-4">{currentTrack?.title || "No track selected"}</h3>
                                <div className="text-gray-300 text-sm leading-relaxed space-y-3">
                                    <p className="text-gray-500 italic">Lyrics coming soon...</p>
                                    <p className="text-xs text-gray-600 mt-6">
                                        가사는 향후 업데이트될 예정입니다.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // 트랙리스트
                            sortedTracks.map((track, idx) => {
                                const isActive = currentTrack?.id === track.id;
                                const isFavorite = favorites.has(track.id);
                                return (
                                    <div
                                        key={track.id}
                                        className={`flex items-center gap-3 p-2.5 rounded-lg cursor-pointer transition group hover:bg-white/5 active:bg-white/10 ${isActive ? 'bg-white/10 border border-white/5 shadow-lg shadow-wish-green/10' : ''}`}
                                        style={{ minHeight: '44px', touchAction: 'manipulation' }}
                                    >
                                        <span 
                                            onClick={() => { playTrack(track); setPlaylist(sortedTracks); }}
                                            className={`text-xs w-5 text-center flex justify-center ${isActive ? 'text-wish-green' : 'text-gray-500'}`}
                                        >
                                            {isActive ? <Volume2 size={14} className="animate-pulse" /> : track.trackNumber}
                                        </span>
                                        <div 
                                            onClick={() => { playTrack(track); setPlaylist(sortedTracks); }}
                                            className="flex-1 min-w-0"
                                        >
                                            <p className={`text-sm truncate ${isActive ? 'text-white font-bold' : 'text-gray-300 group-hover:text-white'}`}>
                                                {track.title}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleFavorite(track.id);
                                            }}
                                            className="p-1.5 hover:bg-white/10 rounded-full transition active:scale-95 flex-shrink-0"
                                        >
                                            <Heart 
                                                size={14} 
                                                className={isFavorite ? 'text-red-500 fill-red-500' : 'text-gray-500 hover:text-red-400'} 
                                            />
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                shareTrack(track);
                                            }}
                                            className="p-1.5 hover:bg-white/10 rounded-full transition active:scale-95 flex-shrink-0"
                                        >
                                            <Share2 size={14} className="text-gray-500 hover:text-wish-green" />
                                        </button>
                                        <span 
                                            onClick={() => { playTrack(track); setPlaylist(sortedTracks); }}
                                            className="text-[10px] text-gray-500 font-mono flex-shrink-0"
                                        >
                                            {formatTime(track.durationSec)}
                                        </span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Card 3: Album Navigation */}
                <div className="flex-none h-20 sm:h-24 md:h-28 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1.5 sm:p-2 flex items-center justify-between shadow-xl">
                    <button
                        onClick={() => currentIndex > 0 && onNavigate(currentIndex - 1)}
                        disabled={currentIndex === 0}
                        className="p-2 hover:bg-white/10 active:bg-white/15 rounded-full disabled:opacity-30 transition text-white active:scale-95"
                        style={{ minWidth: '44px', minHeight: '44px' }}
                    >
                        <ChevronLeft size={20} className="mx-auto" />
                    </button>

                    <div className="flex-1 flex items-center justify-center gap-3 sm:gap-4 md:gap-6 overflow-hidden h-full px-1 sm:px-2">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-40 blur-[1px] scale-90 grayscale transition-all">
                            {albums[currentIndex - 1]?.coverImageUrl && (
                                <Image src={albums[currentIndex - 1].coverImageUrl!} alt="prev" fill className="object-cover rounded-md" />
                            )}
                        </div>

                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 z-10 transition-transform duration-300 hover:scale-105">
                            {/* 비닐 디스크 - 크기 및 위치 개선 */}
                            <div className="absolute top-1/2 -right-3 sm:-right-4 w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 -translate-y-1/2 bg-gradient-to-br from-black via-gray-900 to-black rounded-full -z-10 shadow-2xl">
                                <div className="absolute inset-0 rounded-full" style={{
                                    background: 'repeating-radial-gradient(circle at center, transparent 0%, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)'
                                }} />
                                <div className="absolute inset-[35%] bg-gray-700 rounded-full border border-gray-600" />
                            </div>
                            {currentAlbum.coverImageUrl && (
                                <>
                                    <Image src={currentAlbum.coverImageUrl} alt="current" fill className="object-cover rounded-md shadow-xl border border-white/10" />
                                    {/* 글로우 효과 */}
                                    <div className="absolute -inset-1 bg-gradient-to-r from-wish-green/20 to-blue-500/20 rounded-md blur-md -z-10 animate-pulse" />
                                </>
                            )}
                        </div>

                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 opacity-40 blur-[1px] scale-90 grayscale transition-all">
                            {albums[currentIndex + 1]?.coverImageUrl && (
                                <Image src={albums[currentIndex + 1].coverImageUrl!} alt="next" fill className="object-cover rounded-md" />
                            )}
                        </div>
                    </div>

                    <button
                        onClick={() => currentIndex < albums.length - 1 && onNavigate(currentIndex + 1)}
                        disabled={currentIndex === albums.length - 1}
                        className="p-2 hover:bg-white/10 active:bg-white/15 rounded-full disabled:opacity-30 transition text-white active:scale-95"
                        style={{ minWidth: '44px', minHeight: '44px' }}
                    >
                        <ChevronRight size={20} className="mx-auto" />
                    </button>
                </div>
            </div>

            <button
                onClick={onBack}
                className="absolute top-4 left-4 z-20 md:hidden bg-black/50 hover:bg-black/70 active:bg-black/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-md active:scale-95 transition"
                style={{ minHeight: '44px', minWidth: '60px' }}
            >
                ← List
            </button>

        </div>
    );
}

// global window 타입 확장 (TypeScript용)
declare global {
  interface Window {
    YT: typeof YT; 
    onYouTubeIframeAPIReady: () => void;
  }
  
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace YT {
    class Player {
      constructor(element: HTMLElement | string | null, options: PlayerOptions);
      playVideo(): void;
      pauseVideo(): void;
      stopVideo(): void;
      setVolume(volume: number): void;
      getVolume(): number;
      mute(): void;
      unMute(): void;
      isMuted(): boolean;
      loadVideoById(videoId: string): void;
      getIframe(): HTMLIFrameElement;
      destroy(): void;
      setPlaybackQuality(suggestedQuality: string): void;
      getPlaybackQuality(): string;
      getCurrentTime(): number;
      getDuration(): number;
      seekTo(seconds: number, allowSeekAhead: boolean): void;
      getPlayerState(): number;
    }

    interface PlayerOptions {
      width?: string | number;
      height?: string | number;
      videoId?: string;
      playerVars?: PlayerVars;
      events?: Events;
    }

    interface PlayerVars {
      autoplay?: 0 | 1;
      controls?: 0 | 1;
      disablekb?: 0 | 1;
      fs?: 0 | 1;
      loop?: 0 | 1;
      modestbranding?: 0 | 1;
      playsinline?: 0 | 1;
      rel?: 0 | 1;
      playlist?: string;
      [key: string]: string | number | undefined;
    }

    interface Events {
      onReady?: (event: OnReadyEvent) => void;
      onStateChange?: (event: OnStateChangeEvent) => void;
      onError?: (event: OnErrorEvent) => void;
    }

    interface OnReadyEvent {
      target: Player;
    }

    interface OnStateChangeEvent {
      target: Player;
      data: number; // PlayerState
    }

    interface OnErrorEvent {
      target: Player;
      data: number; // Error code
    }
  }
}