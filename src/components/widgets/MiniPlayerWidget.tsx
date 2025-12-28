/**
 * MiniPlayerWidget 컴포넌트
 * 
 * - iPod 클래식 스타일의 미니 플레이어 위젯
 * - YouTube Iframe API를 사용하여 음악 재생
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioStore } from '@/app/stores/useAudioStore';

// 시간 포맷 함수 (초 -> MM:SS)
const formatTime = (seconds: number) => {
  if (!seconds || isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// 플레이리스트 아이템 타입 정의
interface PlaylistItem {
  id: string;
  trackId: string;
  title: string;
  album: string;
  themeColor?: string | null;
}

export default function MiniPlayer({ scale = 1 }: { scale?: number }) {
  // 상태 관리
  const [playlist, setPlaylist] = useState<PlaylistItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const [playerKey, setPlayerKey] = useState(0); // iframe 강제 리렌더링용

  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);

  // 참조 관리
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const isFirstLoadRef = useRef(true);
  const isTrackChangedRef = useRef(false);

  // 전역 상태 관리
  const { isMuted, volume, setPlayerRef } = useAudioStore();
  const currentSong = playlist[currentIndex];

  // 1. 초기 플레이리스트 로드
  useEffect(() => {
    const loadPlaylist = async () => {
      try {
        const res = await fetch('/api/widgets/tracks');
        if (!res.ok) throw new Error('API Error');
        const data = await res.json();
        setPlaylist(data.length > 0 ? data : []);
      } catch (error) {
        console.error('Playlist load failed, using fallback.', error);
        setPlaylist([
          { id: 'hvQZs3k6Ytk', trackId: 'fb1', title: 'WISH (Korean Ver.)', album: 'WISH', themeColor: '#BFFF00' },
          { id: '2XqVNFBtVo4', trackId: 'fb2', title: 'Songbird', album: 'Songbird', themeColor: '#8EE3F5' },
          { id: 'Pqm6KO2y2pw', trackId: 'fb3', title: 'Dunk Shot', album: 'Dunk Shot', themeColor: '#FF6B6B' },
        ]);
      }
    };
    loadPlaylist();
  }, []);

  // 2. 곡 변경 시 로딩 상태 처리 (3초 후 강제 Ready)
  useEffect(() => {
    if (!currentSong) return;
    if (isFirstLoadRef.current) return; // 첫 로드 시는 건너뜀

    setIsPlaying(false);
    setIsReady(false);
    setCurrentTime(0);
    setDuration(0);
    setProgress(0);
    isTrackChangedRef.current = true;

    const timer = setTimeout(() => {
      setIsReady(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentSong]);

  // 3. 볼륨/음소거 동기화
  useEffect(() => {
    if (playerRef.current?.setVolume) {
      playerRef.current.setVolume(isMuted ? 0 : volume);
    }
  }, [isMuted, volume]);

  // 4. 재생 시간 추적
  useEffect(() => {
    const timer = setInterval(() => {
      if (playerRef.current && isPlaying && typeof playerRef.current.getCurrentTime === 'function') {
        const curr = playerRef.current.getCurrentTime();
        const total = playerRef.current.getDuration();

        if (curr && total) {
          setCurrentTime(curr);
          setDuration(total);
          setProgress((curr / total) * 100);
        }
      }
    }, 500);

    return () => clearInterval(timer);
  }, [isPlaying]);

  // 재생/일시정지 토글
  const togglePlay = () => {
    if (!playerRef.current || typeof playerRef.current.playVideo !== 'function') {
      // 플레이어가 아직 로딩 안됐는데 눌렀을 경우를 대비
      console.log("Player not ready, waiting...");
      return;
    }

    // 사용자가 버튼을 눌렀으니 첫 로딩 상태 해제
    if (isFirstLoadRef.current) isFirstLoadRef.current = false;

    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.playVideo();
      setIsPlaying(true);
    }
  };

  const changeTrack = (index: number) => {
    // 사용자가 클릭해서 바꿨으므로 첫 로딩 아님
    isFirstLoadRef.current = false;

    // 상태 초기화
    setIsPlaying(false);

    // 약간의 딜레이 후 인덱스 변경 (React 상태 업데이트 보장)
    setTimeout(() => {
      setCurrentIndex(index);
      setPlayerKey((prev) => prev + 1); // iframe 강제 리로드
    }, 10);
  };

  // 이전/다음 곡 재생
  const playPrev = () => {
    if (playlist.length === 0) return;
    const prevIdx = (currentIndex - 1 + playlist.length) % playlist.length;
    changeTrack(prevIdx);
  };

  const playNext = () => {
    if (playlist.length === 0) return;
    const nextIdx = (currentIndex + 1) % playlist.length;
    changeTrack(nextIdx);
  };

  // 5. YouTube API 초기화
  useEffect(() => {
    if (!currentSong) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(window as any).YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScript = document.getElementsByTagName('script')[0];
      firstScript.parentNode?.insertBefore(tag, firstScript);
    }

    const initPlayer = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!iframeRef.current || !(window as any).YT) return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window as any).YT.Player(iframeRef.current, {
        events: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onReady: (e: any) => {
            playerRef.current = e.target;
            setPlayerRef(e.target);
            e.target.setVolume(isMuted ? 0 : volume);

            // 첫 로딩이면: 준비 완료 상태만(아이콘 표시용) 만들고 재생 안 함
            if (isFirstLoadRef.current) {
              setIsReady(true);
              setIsPlaying(false);
            } else {
              // 곡 변경이나 재로드인 경우: 자동 재생
              setIsReady(true);
              e.target.playVideo();
              setIsPlaying(true);
            }
          },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onStateChange: (e: any) => {
            // 1: 재생중, 2: 일시정지, 0: 끝남
            if (e.data === 1) {
              setIsPlaying(true);
              setIsReady(true); // 혹시 로딩바가 안 꺼졌으면 끔
            }
            if (e.data === 2) setIsPlaying(false);
            if (e.data === 0) playNext();
          },
        },
      });
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

  if (!currentSong) return null;

  const baseWidth = 340;
  const baseHeight = 140;
  const containerWidth = baseWidth * scale;
  const containerHeight = baseHeight * scale;

  return (
    <div className="relative group select-none">

      {/* 메인 몸체 */}
      <div 
        className="relative z-10 bg-gradient-to-b from-[#f0f0f0] via-[#dcdcdc] to-[#b0b0b0] shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.2)] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_5px_10px_-5px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_-1px_0_rgba(0,0,0,0.3),inset_1px_0_1px_rgba(255,255,255,0.1),inset_-1px_0_1px_rgba(0,0,0,0.1)] flex items-center justify-between border border-[#a0a0a0] overflow-hidden"
        style={{
          width: `${containerWidth}px`,
          height: `${containerHeight}px`,
          borderRadius: `${24 * scale}px`,
          paddingLeft: `${24 * scale}px`,
          paddingRight: `${24 * scale}px`,
          paddingTop: `${16 * scale}px`,
          paddingBottom: `${16 * scale}px`,
        }}
      >
        {/* 몸체 표면 노이즈 텍스처 */}
        <div 
          className="absolute inset-0 bg-noise opacity-[0.07] pointer-events-none mix-blend-multiply"
          style={{ borderRadius: `${24 * scale}px` }}
        />
        {/* 표면 그라데이션 코팅 */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none mix-blend-overlay" />

        {/* [왼쪽] 화면 영역 */}
        <div 
          className="relative bg-[#0a0a0a] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),0_1px_2px_rgba(255,255,255,0.2)] border-[#222] overflow-hidden flex flex-col z-20"
          style={{
            width: `${160 * scale}px`,
            height: `${110 * scale}px`,
            borderRadius: `${10 * scale}px`,
            borderWidth: `${3 * scale}px`,
          }}
        >
          {/* YouTube Iframe 레이어 */}
          <div className="relative flex-1 bg-black overflow-hidden group/screen">
            <iframe
              ref={iframeRef}
              key={playerKey}
              id={`Youtubeer-${playerKey}`}
              src={`https://www.youtube.com/embed/${currentSong.id}?enablejsapi=1&controls=0&showinfo=0&modestbranding=1&rel=0&fs=0&iv_load_policy=3&playsinline=1&autoplay=0&origin=${typeof window !== 'undefined' ? encodeURIComponent(window.location.origin) : ''}`}
              className="absolute inset-0 w-full h-full object-cover scale-[1.35] opacity-90 mix-blend-screen"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="YouTube video player"
            />

            {/* 로딩 커버 */}
            {!isReady && (
              <div className="absolute inset-0 bg-black z-20 flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              </div>
            )}

            {/* 유리 반사 효과 */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/5 to-transparent pointer-events-none z-30 mix-blend-overlay" />
          </div>

          <div className="relative z-40 bg-gradient-to-t from-black via-black/95 to-transparent pt-1">
            {/* 상태 진행 바 */}
            <div className="w-full h-[3px] bg-gray-700/50 relative">
              <div
                className="h-full bg-brand-wichu-green shadow-[0_0_4px_rgba(50,255,100,0.6)] transition-all duration-300 ease-linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* 시간 및 제목 정보 */}
            <div className="flex items-center justify-between px-1.5 h-[18px]">
              {/* 현재 시간 */}
              <span className="text-[7px] font-pixel text-gray-300 w-6 text-left">
                {formatTime(currentTime)}
              </span>

              {/* 제목 */}
              <div className="flex-1 overflow-hidden mx-1 relative h-full flex items-center">
                <div className="whitespace-nowrap animate-marquee text-[8px] font-pixel text-white/90 w-full text-center">
                  {currentSong.title} <span className="text-gray-400 mx-1">-</span> {currentSong.album}
                </div>
              </div>

              {/* 총 재생 시간 */}
              <span className="text-[7px] font-pixel text-gray-500 w-6 text-right">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>

        {/* [오른쪽] 클릭 휠 영역 */}
        <div 
          className="relative shrink-0 flex items-center justify-center"
          style={{
            width: `${100 * scale}px`,
            height: `${100 * scale}px`,
          }}
        >

          {/* 휠 배경 (흰색/회색 그라데이션) */}
          <div 
            className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f8f8f8] via-[#eeeeee] to-[#dcdcdc] shadow-[0_4px_8px_rgba(0,0,0,0.15),inset_0_1px_2px_rgba(255,255,255,1)] shadow-[0_4px_10px_rgba(0,0,0,0.3),inset_0_2px_3px_rgba(255,255,255,1),inset_0_-2px_5px_rgba(0,0,0,0.1),0_0_0_1px_#d0d0d0] border-[#ccc]"
            style={{ borderWidth: `${1 * scale}px` }}
          >

            <div className="absolute inset-0 rounded-full bg-noise opacity-[0.05] mix-blend-multiply" />

            {/* MENU 버튼 (상단) */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="absolute left-1/2 -translate-x-1/2 font-bold text-gray-500 hover:text-black transition-colors tracking-tighter"
              style={{
                top: `${8 * scale}px`,
                fontSize: `${9 * scale}px`,
              }}
            >
              MENU
            </button>

            {/* PREV 버튼 (왼쪽) */}
            <button
              onClick={playPrev}
              className="absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              style={{
                left: `${8 * scale}px`,
                fontSize: `${14 * scale}px`,
              }}
            >
              ⏮
            </button>

            {/* NEXT 버튼 (오른쪽) */}
            <button
              onClick={playNext}
              className="absolute top-1/2 -translate-y-1/2 text-gray-500 hover:text-black transition-colors"
              style={{
                right: `${8 * scale}px`,
                fontSize: `${14 * scale}px`,
              }}
            >
              ⏭
            </button>

            {/* PLAY/PAUSE 버튼 (하단) */}
            <button
              onClick={togglePlay}
              className="absolute left-1/2 -translate-x-1/2 text-gray-500 hover:text-black transition-colors"
              style={{
                bottom: `${8 * scale}px`,
                fontSize: `${12 * scale}px`,
                gap: `${2 * scale}px`,
              }}
            >
              {isPlaying ? '❚❚' : '▶'}
            </button>
          </div>

          {/* 중앙 버튼 (선택) */}
          <button
            onClick={togglePlay}
            className="relative z-10 rounded-full bg-[radial-gradient(circle_at_50%_30%,#ffffff_0%,#d0d0d0_60%,#a0a0a0_100%)] shadow-[0_2px_4px_rgba(0,0,0,0.2),inset_0_1px_2px_rgba(255,255,255,0.8)] border-[#b0b0b0] shadow-[0_2px_5px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-1px_1px_rgba(0,0,0,0.3)] active:scale-95 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] transition-transform"
            style={{
              width: `${38 * scale}px`,
              height: `${38 * scale}px`,
              borderWidth: `${1 * scale}px`,
            }}
          />
        </div>
      </div>


      {/* 플레이리스트 드롭다운 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 10 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="
              absolute top-full right-0 z-50 mt-2
              w-[240px]
              bg-white/95 backdrop-blur-md
              border border-gray-300
              rounded-xl shadow-2xl
              overflow-hidden
            "
          >
            {/* 헤더 */}
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-600">Now Playing</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                ✖
              </button>
            </div>

            {/* 리스트 */}
            <ul className="max-h-[200px] overflow-y-auto custom-scrollbar p-1">
              {playlist.map((song, idx) => (
                <li key={song.trackId}>
                  <button
                    onClick={() => {
                      changeTrack(idx);
                      setIsMenuOpen(false);
                    }}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all
                      flex items-center gap-2
                      ${idx === currentIndex
                        ? 'bg-blue-500 text-white shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <span className="opacity-60 w-4 text-center">{idx + 1}</span>
                    <span className="truncate flex-1">{song.title}</span>
                    {idx === currentIndex && (
                      <span className="text-[10px] animate-pulse">Playing</span>
                    )}
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