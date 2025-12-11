'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import type { ComponentType } from 'react';

// ReactPlayer Props 타입 정의
interface ReactPlayerProps {
  url: string;
  playing: boolean;
  width: string;
  height: string;
  controls: boolean;
  onReady?: () => void;
  onEnded?: () => void;
}

// ReactPlayer는 클라이언트 사이드에서만 로드
const ReactPlayer = dynamic<ReactPlayerProps>(
  () => import('react-player'),
  { ssr: false }
) as ComponentType<ReactPlayerProps>;

// 🎵 플레이리스트 데이터
/** TODO: 실제 유튜브 동영상 ID 및 제목으로 교체 필요 */
const PLAYLIST = [
  { id: 'hr-32y6-2gE', title: 'WISH (Korean Ver.)' },
  { id: 'b88y8-3j6vY', title: 'Songbird (Korean Ver.)' },
  { id: 'Hands-Up-ID', title: 'Hands Up' },
  { id: 'Sail-Away-ID', title: 'Sail Away' },
];

export default function MiniPlayer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const currentSong = PLAYLIST[currentIndex];

  // ▶ 재생/일시정지 토글
  const togglePlay = () => setIsPlaying(!isPlaying);

  // 🎲 랜덤 곡 변경
  const changeRandomSong = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * PLAYLIST.length);
    } while (nextIndex === currentIndex && PLAYLIST.length > 1);
    
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  return (
    <div className="relative">
      
      {/* --- [1] MP3 플레이어 본체 (가로형 원본 디자인) --- */}
      <div className="
        w-[340px] h-[140px] p-3
        bg-white/90 backdrop-blur-sm
        rounded-2xl
        
        shadow-[0px_10px_20px_0px_rgba(0,0,0,0.15),inset_0px_1px_1px_0px_rgba(255,255,255,0.90)] 
        outline-1 -outline-offset-1 outline-[#e8e8e8]/50
        
        flex flex-row items-center gap-4
        select-none
      ">
        
        {/* [왼쪽] 컨트롤 패널 영역 */}
        <div className="w-[100px] h-full flex flex-col justify-between py-1">
          
          {/* 상단 장식 바 */}
          <div className="flex flex-col gap-1 opacity-60">
            <div className="w-full h-2 bg-[#f8f8f8] rounded-full border border-gray-300" />
            <div className="w-3/4 h-1.5 bg-white rounded-full shadow-sm" />
          </div>

          {/* MUSIC 버튼 (메뉴 토글) */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="
              text-center opacity-60 hover:opacity-100 transition-opacity
              text-[#999999] text-[10px] font-arial font-bold tracking-widest
            "
          >
            MUSIC ▼
          </button>

          {/* 컨트롤 버튼 그룹 (작게 배치) */}
          <div className="flex justify-between items-center gap-1">
            {/* Prev (Random) */}
            <ControlButton onClick={changeRandomSong} label="◀" size="sm" />
            
            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="
                w-8 h-8 rounded-full bg-white 
                shadow-[0_1px_2px_rgba(0,0,0,0.15),inset_0_1px_1px_white]
                border border-gray-200
                flex items-center justify-center
                active:shadow-inset active:scale-95 transition-all
              "
            >
              <span className="text-xs ml-0.5 text-gray-600">{isPlaying ? '❚❚' : '▶'}</span>
            </button>

            {/* Next (Random) */}
            <ControlButton onClick={changeRandomSong} label="▶" size="sm" />
          </div>
        </div>

        {/* [오른쪽] 스크린 영역 (유튜브) */}
        <div className="
          flex-1 h-full relative
          bg-black rounded shadow-[inset_2px_2px_6.5px_0px_rgba(0,0,0,0.40)] 
          border-[2.50px] border-black
          overflow-hidden
        ">
          {/* 유튜브 플레이어 */}
          <div className="absolute inset-0 pointer-events-none scale-[1.1]">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${currentSong.id}`}
              playing={isPlaying}
              width="100%"
              height="100%"
              controls={false}
              onReady={() => setIsReady(true)}
              onEnded={changeRandomSong}
            />
          </div>

          {/* 로딩 커버 */}
          {!isReady && (
            <div className="absolute inset-0 bg-black flex items-center justify-center">
              <span className="font-pixel text-[8px] text-brand-wichu-green animate-pulse">
                LOADING...
              </span>
            </div>
          )}
          
          {/* 스캔라인 효과 */}
          <div className="absolute inset-0 bg-scanline opacity-10 pointer-events-none" />

          {/* 현재 곡 정보 오버레이 */}
          <div className="absolute bottom-0 left-0 w-full h-4 bg-black/50 backdrop-blur-sm flex items-center overflow-hidden px-1">
            <div className="whitespace-nowrap font-pixel text-[8px] text-white animate-marquee">
              ♪ {currentSong.title}
            </div>
          </div>
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
              {PLAYLIST.map((song, idx) => (
                <li key={song.id}>
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

// [내부용] 작은 컨트롤 버튼
function ControlButton({ onClick, label, size = 'md' }: { onClick: () => void, label: string, size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'w-6 h-6 text-[8px]' : 'w-8 h-8 text-[10px]';
  return (
    <button
      onClick={onClick}
      className={`
        ${sizeClass}
        rounded-full bg-[#f0f0f0]
        shadow-[0_1px_2px_rgba(0,0,0,0.15)]
        border border-gray-300
        flex items-center justify-center
        text-gray-500
        active:shadow-inset active:scale-95 transition-all
      `}
    >
      {label}
    </button>
  );
}