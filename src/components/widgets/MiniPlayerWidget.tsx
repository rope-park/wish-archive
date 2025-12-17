'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 플레이리스트 아이템 타입
interface PlaylistItem {
  id: string;
  trackId: string;
  title: string;
  album: string;
  themeColor?: string | null;
}

export default function MiniPlayer() {
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [playerKey, setPlayerKey] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // API에서 플레이리스트 로드
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        console.log('🎵 Fetching playlist...');
        const res = await fetch('/api/widgets/tracks', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!res.ok) {
          const errorText = await res.text();
          console.warn('⚠️ API returned error:', res.status, errorText);
          throw new Error(`API error: ${res.status}`);
        }

        const data: PlaylistItem[] = await res.json();
        
        if (!data || data.length === 0) {
          console.warn('⚠️ No tracks returned from API, using fallback');
          throw new Error('Empty playlist');
        }
        
        console.log('✅ Playlist loaded:', data.length, 'tracks');
        setPlaylist(data);
      } catch (error) {
        console.warn('⚠️ Using fallback playlist:', error instanceof Error ? error.message : 'Unknown error');
        // 폴백 데이터
        const fallbackData = [
          { id: 'hvQZs3k6Ytk', trackId: 'fallback-1', title: 'WISH (Korean Ver.)', album: 'WISH', themeColor: '#BFFF00' },
          { id: '2XqVNFBtVo4', trackId: 'fallback-2', title: 'Songbird', album: 'Songbird', themeColor: '#8EE3F5' },
          { id: 'Pqm6KO2y2pw', trackId: 'fallback-3', title: 'Dunk Shot', album: 'Dunk Shot', themeColor: '#FF6B6B' },
        ];
        setPlaylist(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaylist();
  }, []);

  const currentSong = playlist[currentIndex];

  // 곡이 변경되면 3초 후 강제로 ready 상태로 전환 (로딩 커버 제거)
  useEffect(() => {
    if (currentSong) {
      setIsReady(false);
      const timeout = setTimeout(() => {
        setIsReady(true);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentSong]);

  // ▶ 재생/일시정지 토글
  const togglePlay = () => {
    if (!isReady || !currentSong || !playerRef.current) return;
    if (typeof playerRef.current.playVideo !== 'function') return;
    
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  // ⏮️ 이전 곡 재생
  const playPreviousSong = () => {
    if (playlist.length === 0) return;

    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length; // 첫 곡에서 마지막 곡으로

    setIsPlaying(false);
    setIsReady(false);
    
    setTimeout(() => {
      setCurrentIndex(prevIndex);
      setPlayerKey(prev => prev + 1);
    }, 100);
  };

  // ⏭️ 다음 곡 재생 (순차)
  const playNextSong = () => {
    if (playlist.length === 0) return;

    const nextIndex = (currentIndex + 1) % playlist.length; // 마지막 곡 후 첫 곡으로

    setIsPlaying(false);
    setIsReady(false);
    
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setPlayerKey(prev => prev + 1);
    }, 100);
  };

  // YouTube Player API 초기화
  useEffect(() => {
    if (!currentSong) return;

    // YouTube IFrame API 로드
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    // API 준비 완료 시 플레이어 생성
    const initPlayer = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (iframeRef.current && (window as any).YT) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        new (window as any).YT.Player(iframeRef.current, {
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              playerRef.current = event.target;
              setIsReady(true);
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              // 0 = 종료, 자동으로 다음 곡 재생
              if (event.data === 0) {
                playNextSong();
              }
            },
          },
        });
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).YT && (window as any).YT.Player) {
      initPlayer();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onYouTubeIframeAPIReady = initPlayer;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSong, playerKey]);

  // 곡 변경 시 자동 재생
  useEffect(() => {
    if (isReady && currentSong && playerRef.current) {
      if (typeof playerRef.current.playVideo === 'function') {
        setTimeout(() => {
          playerRef.current.playVideo();
          setIsPlaying(true);
        }, 500);
      }
    }
  }, [isReady, currentSong]);

  return (
    <div className="relative">

      {/* --- [1] MP3 플레이어 본체 (iPod 클래식 스타일) --- */}
      <div className="
        w-[320px] h-[150px] p-4
        bg-gradient-to-br from-[#e8e8e8] via-[#f5f5f5] to-[#e0e0e0]
        rounded-[20px]
        shadow-[0_8px_16px_rgba(0,0,0,0.2),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.1)]
        border border-[#d0d0d0]
        flex flex-row items-center gap-3
        select-none
      ">

        {/* [왼쪽] 클릭휠 영역 */}
        <div className="w-[120px] h-full flex flex-col items-center justify-center gap-2">


          {/* 클릭휠 (iPod 스타일) */}
          <div className="relative w-[100px] h-[100px]">
            {/* 외부 링 */}
            <div className="
              absolute inset-0 rounded-full
              bg-gradient-to-br from-white via-gray-100 to-gray-200
              shadow-[inset_0_2px_4px_rgba(0,0,0,0.15),0_2px_6px_rgba(0,0,0,0.1)]
              border border-gray-300
            ">
              {/* 상단 버튼 (메뉴) */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="
                  absolute top-0 left-1/2 -translate-x-1/2
                  w-8 h-8 flex items-center justify-center
                  text-gray-600 hover:text-gray-800 transition-colors
                  text-[10px] font-bold tracking-wider mb-1
                "
              >
                MUSIC
              </button>

              {/* 왼쪽 버튼 (이전곡) */}
              <button
                onClick={playPreviousSong}
                disabled={isLoading || playlist.length === 0}
                className="
                  absolute left-0 top-1/2 -translate-y-1/2
                  w-8 h-8 flex items-center justify-center
                  text-gray-600 hover:text-gray-800 transition-colors
                  text-[10px] disabled:opacity-30
                "
              >
                ⏮
              </button>

              {/* 오른쪽 버튼 (다음곡) */}
              <button
                onClick={playNextSong}
                disabled={isLoading || playlist.length === 0}
                className="
                  absolute right-0 top-1/2 -translate-y-1/2
                  w-8 h-8 flex items-center justify-center
                  text-gray-600 hover:text-gray-800 transition-colors
                  text-[10px] disabled:opacity-30
                "
              >
                ⏭
              </button>

              {/* 하단 버튼 (재생/일시정지) */}
              <button
                onClick={togglePlay}
                disabled={isLoading || !currentSong}
                className="
                  absolute bottom-0 left-1/2 -translate-x-1/2
                  w-8 h-8 flex items-center justify-center
                  text-gray-600 hover:text-gray-800 transition-colors
                  text-[10px] disabled:opacity-30
                "
              >
                {isPlaying ? '❚❚' : '▶'}
              </button>

              {/* 중앙 선택 버튼 */}
              <button
                onClick={togglePlay}
                disabled={isLoading || !currentSong}
                className="
                  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                  w-12 h-12 rounded-full
                  bg-gradient-to-br from-gray-50 to-gray-200
                  shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)]
                  border border-gray-300
                  active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] active:scale-95
                  transition-all disabled:opacity-50
                "
              >
              </button>
            </div>
          </div>
        </div>

        {/* [오른쪽] 스크린 영역 (유튜브) */}
        <div className="
          flex-1 h-full relative
          bg-gradient-to-br from-[#1a1a1a] to-black
          rounded-lg 
          shadow-[inset_0_3px_8px_rgba(0,0,0,0.6),0_2px_4px_rgba(0,0,0,0.3)]
          border-2 border-[#0a0a0a]
          overflow-hidden
        ">
          {/* 스크린 베젤 효과 */}
          <div className="absolute inset-0 rounded-lg border-2 border-white/5 pointer-events-none z-20" />

          {/* 유튜브 플레이어 - YouTube Player API */}
          {currentSong && (
            <iframe
              ref={iframeRef}
              key={playerKey}
              id={`youtube-player-${playerKey}`}
              src={`https://www.youtube.com/embed/${currentSong.id}?enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0&fs=0&iv_load_policy=3&playsinline=1&origin=${typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''}`}
              className="absolute inset-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}

          {/* 로딩 커버 */}
          {isLoading && (
            <div className="absolute inset-0 bg-black flex items-center justify-center z-10">
              <span className="font-pixel text-[8px] text-brand-wichu-green animate-pulse">
                LOADING...
              </span>
            </div>
          )}

          {/* 스캔라인 효과 */}
          <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none z-30" />

          {/* 현재 곡 정보 오버레이 */}
          {currentSong && (
            <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-[2px] flex items-center overflow-hidden px-2 z-40 pointer-events-none">
              <div className="whitespace-nowrap font-pixel text-[8px] text-white animate-marquee">
                ♪ {currentSong.title} - {currentSong.album}
              </div>
            </div>
          )}
        </div>

      </div>

      {/* --- [2] 재생 목록 (아래로 열리는 메뉴) --- */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="
              absolute top-[150px] left-0 z-50
              w-[340px] bg-gray-100 
              border border-gray-400 shadow-retro-hard
              rounded-sm p-1
            "
          >
            <div className="bg-[#000080] text-white px-2 py-1 text-xs font-bold font-pixel mb-1 flex justify-between">
              <span>NCT WISH PLAYLIST</span>
              <span onClick={() => setIsMenuOpen(false)} className="cursor-pointer">x</span>
            </div>

            <ul className="flex flex-col gap-px max-h-[150px] overflow-y-auto custom-scrollbar">
              {playlist.map((song, idx) => (
                <li key={song.trackId}>
                  <button
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsPlaying(true);
                      setIsMenuOpen(false);
                    }}
                    className={`
                      w-full text-left px-2 py-1.5 text-xs font-pixel truncate
                      ${idx === currentIndex
                        ? 'bg-brand-retro-navy text-white'
                        : 'hover:bg-gray-200 text-black'
                      }
                    `}
                  >
                    {idx + 1}. {song.title}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
