'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

// ReactPlayer는 클라이언트 사이드에서만 로드

const ReactPlayer = dynamic(
  () => import('react-player'),
  { ssr: false }// eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any;

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

  // API에서 플레이리스트 로드
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        console.log('🎵 Fetching playlist...');
        const res = await fetch('/api/widgets/tracks');
        if (!res.ok) throw new Error('Failed to fetch playlist');

        const data: PlaylistItem[] = await res.json();
        console.log('✅ Playlist loaded:', data.length, 'tracks');
        console.log('First track:', data[0]);
        setPlaylist(data);
      } catch (error) {
        console.error('❌ Error loading playlist:', error);
        // 폴백 데이터
        const fallbackData = [
          { id: 'hvQZs3k6Ytk', trackId: 'fallback-1', title: 'WISH (Korean Ver.)', album: 'WISH', themeColor: '#BFFF00' },
          { id: '2XqVNFBtVo4', trackId: 'fallback-2', title: 'Songbird', album: 'Songbird', themeColor: '#8EE3F5' },
        ];
        console.log('Using fallback data:', fallbackData);
        setPlaylist(fallbackData);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlaylist();
  }, []);

  const currentSong = playlist[currentIndex];

  useEffect(() => {
    console.log('💿 Current song:', currentSong);
    console.log('🎬 Is playing:', isPlaying);
    console.log('✅ Is ready:', isReady);
  }, [currentSong, isPlaying, isReady]);

  // ▶ 재생/일시정지 토글
  const togglePlay = () => {
    if (!isReady || !currentSong) return;
    setIsPlaying(!isPlaying);
  };

  // 🎲 랜덤 곡 변경
  const changeRandomSong = () => {
    if (playlist.length === 0) return;

    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } while (nextIndex === currentIndex && playlist.length > 1);

    setCurrentIndex(nextIndex);
    setIsPlaying(false);
    setIsReady(false);
    setPlayerKey(prev => prev + 1); // 플레이어 리셋
  };

  // 곡 변경 시 자동 재생
  useEffect(() => {
    if (isReady && currentSong) {
      setIsPlaying(true);
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

              {/* 왼쪽 버튼 (이전/랜덤) */}
              <button
                onClick={changeRandomSong}
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

              {/* 오른쪽 버튼 (다음/랜덤) */}
              <button
                onClick={changeRandomSong}
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
          <div className="absolute inset-0 rounded-lg border-2 border-white/5 pointer-events-none" />

          {/* 유튜브 플레이어 */}
          {currentSong && (
            <div className="absolute inset-0 pointer-events-none scale-[1.1]">
              <ReactPlayer
                key={playerKey}
                url={`https://www.youtube.com/watch?v=${currentSong.id}`}
                playing={isPlaying && isReady}
                width="100%"
                height="100%"
                controls={false}
                light={false}
                onReady={() => {
                  console.log('✅ Player ready for:', currentSong.title);
                  setIsReady(true);
                }}
                onEnded={changeRandomSong}
                onError={() => {
                  console.error('❌ Player error occurred');
                  setIsReady(false);
                }}
              />
            </div>
          )}

          {/* 로딩 커버 */}
          {(isLoading || !isReady || !currentSong) && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <span className="font-pixel text-[8px] text-brand-wichu-green animate-pulse">
                {isLoading ? 'LOADING...' : !currentSong ? 'NO TRACK' : 'BUFFERING...'}
              </span>
            </div>
          )}

          {/* 스캔라인 효과 */}
          <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />

          {/* 현재 곡 정보 오버레이 */}
          {currentSong && (
            <div className="absolute bottom-0 left-0 w-full h-5 bg-gradient-to-t from-black/80 to-transparent backdrop-blur-[2px] flex items-center overflow-hidden px-2">
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