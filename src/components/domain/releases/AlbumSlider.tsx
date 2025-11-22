/**
 * AlbumSlider Component
 * 
 * 풀스크린 슬라이더 + Shared Element Transition
 * - 앨범 클릭 시 상세 페이지로 부드럽게 확장
 * - 각 앨범의 뮤직비디오가 배경에 자동재생
 * - 영상 레퍼런스 스타일: 하단 네비게이션, 배경 컬러 전환
 * - Framer Motion layoutId를 활용한 자연스러운 전환
 * - Y2K/키치 감성
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import YouTubeBackground from '@/components/domain/releases/YouTubeBackground';
import type { Album, ReleaseType, Track } from '@prisma/client';

interface AlbumWithTracks extends Album {
  tracks?: Track[];
}

interface AlbumSliderProps {
  albums: AlbumWithTracks[];
}

// 앨범 타입별 한글 표기
const TYPE_LABELS: Record<ReleaseType, string> = {
  STUDIO_ALBUM: 'STUDIO ALBUM',
  MINI_ALBUM: 'MINI ALBUM',
  SINGLE_ALBUM: 'SINGLE',
  DIGITAL_SINGLE: 'DIGITAL SINGLE',
  PARTICIPATION: 'PARTICIPATION',
};

// 앨범별 테마 컬러 + 뮤직비디오 URL
const getAlbumTheme = (album: Album): { bg: string; text: string; icon: string; mvUrl?: string } => {
  const title = album.title.toLowerCase();
  
  // 타이틀 기반 테마 + MV URL
  if (title.match('wish')) {
    return { 
      bg: '#BFFF00', 
      text: '#000000', 
      icon: '💚',
      mvUrl: 'https://youtu.be/hvQZs3k6Ytk?si=VsbSFNYf1IdUTn04&t=50'
    };
  }
  if (title.match('songbird')) {
    return { 
      bg: '#8EE3F5', 
      text: '#004466', 
      icon: '🐦',
      mvUrl: 'https://youtu.be/2XqVNFBtVo4?si=y-aefZXFXeC-XLsH&t=2'
    };
  }
  if (title.match('steady')) {
    return { 
      bg: '#FFB6D9', 
      text: '#660033', 
      icon: '💖',
      mvUrl: 'https://youtu.be/IKlkZZv76Ho?si=PWRiLpqTfyuX6nE4'
    };
  }
  if (title.match('school')) {
    return { bg: '#C6B2FF', text: '#330066', icon: '🏫' };
  }
  
  // 시장 기반
  if (album.market === 'JAPAN') {
    return { bg: '#FFB6D9', text: '#660033', icon: '🌸' };
  }
  
  // 타입 기반
  switch (album.type) {
    case 'STUDIO_ALBUM':
      return { bg: '#BFFF00', text: '#000000', icon: '💿' };
    case 'MINI_ALBUM':
      return { bg: '#8EE3F5', text: '#004466', icon: '💎' };
    case 'SINGLE_ALBUM':
      return { bg: '#C6B2FF', text: '#330066', icon: '⭐' };
    case 'DIGITAL_SINGLE':
      return { bg: '#FFF89A', text: '#666600', icon: '✨' };
    default:
      return { bg: '#A8E6CF', text: '#006644', icon: '🎵' };
  }
};

export default function AlbumSlider({ albums }: AlbumSliderProps) {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumWithTracks | null>(null);
  
  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 상세 페이지가 열려있으면 키보드 네비게이션 비활성화
      if (selectedAlbum) {
        if (e.key === 'Escape') {
          setSelectedAlbum(null);
        }
        return;
      }
      
      if (e.key === 'ArrowLeft') {
        setIndex((prev) => (prev - 1 + albums.length) % albums.length);
      }
      if (e.key === 'ArrowRight') {
        setIndex((prev) => (prev + 1) % albums.length);
      }
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setSelectedAlbum(albums[index]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [albums, index, selectedAlbum]);
  
  if (albums.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-paper-bg">
        <p className="font-jua text-xl text-gray-500">앨범 데이터가 없습니다 😢</p>
      </div>
    );
  }

  const currentAlbum = albums[index];
  const theme = getAlbumTheme(currentAlbum);
  const typeLabel = TYPE_LABELS[currentAlbum.type];
  
  const formattedDate = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
  }).format(new Date(currentAlbum.releaseDate));

  // 다음/이전 슬라이드
  const nextSlide = () => setIndex((prev) => (prev + 1) % albums.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + albums.length) % albums.length);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* YouTube 뮤직비디오 배경 (MV가 있으면 MV, 없으면 배경색) */}
      {theme.mvUrl ? (
        <YouTubeBackground videoUrl={theme.mvUrl} opacity={0.4} />
      ) : (
        <>
          {/* 배경색 애니메이션 (MV가 없는 앨범용) */}
          <motion.div
            animate={{ backgroundColor: theme.bg }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 -z-10"
          >
            {/* 모눈종이 패턴 */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-size-[24px_24px]" />
          </motion.div>
          
          {/* 배경 장식 텍스트 (MV가 없는 앨범용) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden opacity-5 pointer-events-none z-0">
            <motion.div 
              className="whitespace-nowrap text-[12rem] md:text-[20rem] font-bagel-fat-one text-black leading-none"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
            >
              NCT WISH ARCHIVE • NCT WISH ARCHIVE • NCT WISH ARCHIVE •
            </motion.div>
          </div>
        </>
      )}

      {/* 메인 콘텐츠 영역 */}
      <div className="relative z-10 flex flex-col h-full justify-center px-6 md:px-20 pb-32">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentAlbum.id}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-24 w-full max-w-7xl mx-auto"
          >
            
            {/* 왼쪽: 텍스트 정보 */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="flex-1 text-center md:text-left"
            >
              {/* 상단 라벨 (Y2K 스타일) */}
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 border-2 border-black bg-white rounded-full shadow-[3px_3px_0px_rgba(0,0,0,0.3)]">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-press-start-2p text-[8px] font-bold tracking-widest">
                  {formattedDate} • {typeLabel}
                </span>
              </div>

              {/* 타이틀 (거대하게) */}
              <h1 
                className="text-5xl md:text-8xl lg:text-9xl font-bagel-fat-one mb-6 leading-none tracking-tighter drop-shadow-[4px_4px_0px_rgba(255,255,255,0.3)]"
                style={{ color: theme.text }}
              >
                {currentAlbum.title}
              </h1>

              {/* 설명글 */}
              <p 
                className="text-base md:text-xl lg:text-2xl font-jua max-w-lg leading-relaxed opacity-90"
                style={{ color: theme.text }}
              >
                {currentAlbum.description || `${currentAlbum.title}의 청량함을 가득 담은 ${typeLabel.toLowerCase()}.`}
              </p>

              {/* 트랙 정보 */}
              {currentAlbum.trackCount && (
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-white/80 border-2 border-black rounded-full">
                  <span className="font-press-start-2p text-[8px]" style={{ color: theme.text }}>
                    {currentAlbum.trackCount} TRACKS
                  </span>
                </div>
              )}
            </motion.div>

            {/* 오른쪽: 앨범 커버 (클릭 가능) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="flex-1 relative cursor-pointer group"
              onClick={() => setSelectedAlbum(currentAlbum)}
            >
              <div className="relative aspect-square w-64 md:w-96 lg:w-[500px] mx-auto">
                {/* 앨범 커버 프레임 (하드 섀도우) - layoutId로 연결 */}
                <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-2xl transition-transform group-hover:translate-x-2 group-hover:translate-y-2" />
                <motion.div 
                  layoutId={`album-cover-${currentAlbum.id}`}
                  className="relative border-4 border-black bg-white rounded-2xl overflow-hidden shadow-2xl transition-transform group-hover:scale-105"
                >
                  {currentAlbum.coverUrl ? (
                    <Image
                      src={currentAlbum.coverUrl}
                      alt={currentAlbum.title}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div 
                      className="w-full aspect-square flex items-center justify-center text-9xl"
                      style={{ color: theme.text }}
                    >
                      {theme.icon}
                    </div>
                  )}
                  
                  {/* 클릭 유도 오버레이 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity font-press-start-2p text-[10px] text-white bg-black/80 px-4 py-2 rounded-full">
                      CLICK TO VIEW
                    </span>
                  </div>
                </motion.div>
                
                {/* 장식 요소 */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-8 -right-8 text-5xl md:text-6xl drop-shadow-lg"
                >
                  ✨
                </motion.div>
                
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-8 -left-8 text-5xl md:text-6xl drop-shadow-lg"
                >
                  {theme.icon}
                </motion.div>
              </div>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* 하단 네비게이션 */}
      <div className="absolute bottom-0 left-0 w-full bg-white/20 backdrop-blur-md border-t-2 border-black z-20">
        <div className="flex items-center justify-between px-3 md:px-12 py-3 max-w-7xl mx-auto">
          
          {/* 이전 버튼 */}
          <button 
            onClick={prevSlide}
            className="p-2 rounded-full border-2 border-black bg-white hover:bg-gray-100 transition-transform active:scale-95 shadow-[2px_2px_0px_rgba(0,0,0,0.3)] shrink-0"
            aria-label="이전 앨범"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* 앨범 리스트 (아이콘들) */}
          <div className="flex gap-1.5 md:gap-2 px-2 flex-1 justify-center items-center overflow-hidden">
            {albums.map((album, i) => {
              const albumTheme = getAlbumTheme(album);
              return (
                <button
                  key={album.id}
                  onClick={() => setIndex(i)}
                  className={`
                    relative group transition-all duration-300 shrink-0
                    ${index === i ? 'scale-110 opacity-100' : 'opacity-50 hover:opacity-80'}
                  `}
                  aria-label={album.title}
                  title={album.title}
                >
                  {/* 썸네일 박스 */}
                  <div 
                    className={`
                      w-12 h-12 md:w-14 md:h-14 rounded-lg border-2 border-black flex items-center justify-center text-lg md:text-xl bg-white transition-all
                      ${index === i ? 'shadow-[3px_3px_0px_#000]' : 'shadow-none'}
                    `}
                    style={{ backgroundColor: index === i ? albumTheme.bg : 'white' }}
                  >
                    {albumTheme.icon}
                  </div>
                  
                  {/* 활성화 표시바 */}
                  {index === i && (
                    <motion.div 
                      layoutId="activeBar" 
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-black rounded-full" 
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* 다음 버튼 */}
          <button 
            onClick={nextSlide}
            className="p-2 rounded-full border-2 border-black bg-white hover:bg-gray-100 transition-transform active:scale-95 shadow-[2px_2px_0px_rgba(0,0,0,0.3)] shrink-0"
            aria-label="다음 앨범"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* 키보드 네비게이션 안내 */}
      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm border-2 border-black rounded-lg px-4 py-2 shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
        <p className="font-press-start-2p text-[8px] text-black">
          ← → NAVIGATE • ENTER VIEW
        </p>
      </div>

      {/* 상세 페이지 모달 (Shared Element Transition) */}
      <AnimatePresence>
        {selectedAlbum && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* 배경 블러 처리 (클릭 시 닫힘) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAlbum(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            {/* 확장된 앨범 상세 카드 */}
            <motion.div
              layoutId={`album-cover-${selectedAlbum.id}`}
              className="relative w-full max-w-5xl h-[90vh] bg-white rounded-4xl border-4 border-black shadow-[12px_12px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col md:flex-row z-10"
            >
              {/* 왼쪽: 앨범 커버 (크게 확장) */}
              <div 
                className="w-full md:w-1/2 h-1/3 md:h-full relative p-8 md:p-12 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: getAlbumTheme(selectedAlbum).bg }}
              >
                {/* 턴테이블 베이스 */}
                <div className="relative">
                  {/* 턴테이블 플래터 (회색 금속 느낌) */}
                  <div className="absolute inset-0 w-52 h-52 md:w-80 md:h-80 rounded-full bg-linear-to-br from-gray-800 via-gray-700 to-gray-900 -z-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" style={{ transform: 'translate(-50%, -50%)', top: '50%', left: '50%' }}>
                    {/* 턴테이블 링 디테일 */}
                    <div className="absolute inset-4 rounded-full border-2 border-gray-600/50" />
                    <div className="absolute inset-8 rounded-full border border-gray-500/30" />
                  </div>

                  {/* CD 회전 애니메이션 + 그림자 */}
                  <motion.div 
                    className="relative w-48 h-48 md:w-72 md:h-72 z-10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  >
                    {/* CD 실제 그림자 (바닥에 떨어지는 부드러운 그림자) */}
                    <div className="absolute inset-0 rounded-full blur-2xl bg-black/40 scale-95 -z-10" style={{ transform: 'translateY(8px)' }} />
                    
                    {/* WISH 앨범이면 실제 CD 이미지, 아니면 앨범 커버 */}
                    {selectedAlbum.title.toLowerCase().includes('wish') && selectedAlbum.type === 'SINGLE_ALBUM' ? (
                      <div className="relative w-full h-full">
                        <Image
                          src="/images/albums/01_wish/wish_cd.png"
                          alt="WISH CD"
                          fill
                          className="rounded-full object-cover"
                          priority
                        />
                        {/* CD 홀로그램 효과 (무지개빛 반사) */}
                        <motion.div 
                          className="absolute inset-0 rounded-full opacity-60 mix-blend-overlay pointer-events-none"
                          style={{
                            background: 'conic-gradient(from 0deg, rgba(255,0,255,0.3), rgba(0,255,255,0.3), rgba(255,255,0,0.3), rgba(255,0,255,0.3))'
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        {/* 광택 하이라이트 */}
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : selectedAlbum.coverUrl ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={selectedAlbum.coverUrl}
                          alt={selectedAlbum.title}
                          fill
                          className="rounded-full object-cover border-4 border-white"
                        />
                        {/* CD 홀로그램 효과 */}
                        <motion.div 
                          className="absolute inset-0 rounded-full opacity-40 mix-blend-overlay pointer-events-none"
                          style={{
                            background: 'conic-gradient(from 0deg, rgba(255,0,255,0.2), rgba(0,255,255,0.2), rgba(255,255,0,0.2), rgba(255,0,255,0.2))'
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        {/* 광택 하이라이트 */}
                        <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/30 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ) : (
                      <div className="relative w-full h-full rounded-full border-4 border-white bg-white/20 flex items-center justify-center text-6xl">
                        {getAlbumTheme(selectedAlbum).icon}
                        {/* 홀로그램 효과 */}
                        <motion.div 
                          className="absolute inset-0 rounded-full opacity-30 mix-blend-overlay pointer-events-none"
                          style={{
                            background: 'conic-gradient(from 0deg, rgba(255,0,255,0.3), rgba(0,255,255,0.3), rgba(255,255,0,0.3), rgba(255,0,255,0.3))'
                          }}
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      </div>
                    )}
                    
                    {/* CD 가장자리 광택 (입체감) */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_0_2px_8px_rgba(255,255,255,0.3),inset_0_-2px_8px_rgba(0,0,0,0.3)] pointer-events-none" />
                  </motion.div>

                  {/* 턴테이블 스핀들 (CD 중앙) */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-linear-to-br from-gray-400 via-gray-500 to-gray-600 shadow-[0_4px_12px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.3)] border-4 border-gray-700 z-20">
                    {/* 스핀들 디테일 */}
                    <div className="absolute inset-3 rounded-full bg-linear-to-br from-gray-600 to-gray-800 shadow-inner" />
                  </div>
                </div>
                
                {/* 닫기 버튼 */}
                <button 
                  onClick={() => setSelectedAlbum(null)}
                  className="absolute top-4 left-4 md:top-6 md:left-6 bg-white p-2 md:p-3 rounded-full border-2 border-black hover:bg-gray-100 transition-transform active:scale-95 shadow-[3px_3px_0px_rgba(0,0,0,0.3)]"
                  aria-label="닫기"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 오른쪽: 앨범 상세 정보 */}
              <motion.div 
                className="w-full md:w-1/2 p-6 md:p-12 flex flex-col overflow-y-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {/* 앨범 타입 배지 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span 
                    className="inline-block px-3 py-1 rounded-full border-2 border-black text-xs font-press-start-2p shadow-[2px_2px_0px_rgba(0,0,0,0.3)]"
                    style={{ backgroundColor: getAlbumTheme(selectedAlbum).bg }}
                  >
                    {TYPE_LABELS[selectedAlbum.type]}
                  </span>
                  <span className="inline-block px-3 py-1 rounded-full border-2 border-black text-xs font-press-start-2p bg-white shadow-[2px_2px_0px_rgba(0,0,0,0.3)]">
                    {new Intl.DateTimeFormat('ko-KR', { year: 'numeric', month: '2-digit' }).format(new Date(selectedAlbum.releaseDate))}
                  </span>
                </div>

                {/* 앨범 제목 */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bagel-fat-one mb-4 leading-tight tracking-tight text-black">
                  {selectedAlbum.title}
                </h2>

                {/* 앨범 설명 */}
                <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 font-jua">
                  {selectedAlbum.description || `${selectedAlbum.title}의 청량함을 가득 담은 ${TYPE_LABELS[selectedAlbum.type].toLowerCase()}.`}
                </p>

                {/* 앨범 정보 */}
                <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
                  {selectedAlbum.trackCount && (
                    <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                      <span className="text-gray-500 font-press-start-2p text-[8px] block mb-1">TRACKS</span>
                      <span className="text-black font-bold">{selectedAlbum.trackCount}곡</span>
                    </div>
                  )}
                  {selectedAlbum.label && (
                    <div className="bg-gray-50 p-3 rounded-lg border-2 border-gray-200">
                      <span className="text-gray-500 font-press-start-2p text-[8px] block mb-1">LABEL</span>
                      <span className="text-black font-bold text-xs">{selectedAlbum.label}</span>
                    </div>
                  )}
                </div>

                {/* 트랙리스트 */}
                {selectedAlbum.tracks && selectedAlbum.tracks.length > 0 && (
                  <div className="bg-gray-50 p-4 md:p-6 rounded-xl border-2 border-dashed border-gray-300">
                    <h4 className="font-press-start-2p text-[10px] text-gray-500 mb-4 uppercase">Tracklist</h4>
                    <ul className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedAlbum.tracks.map((track) => (
                        <li key={track.id} className="flex items-center gap-3 text-sm md:text-base font-bold group hover:bg-white hover:px-2 hover:py-1 hover:rounded transition-all">
                          <span 
                            className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-xs font-press-start-2p shrink-0 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: getAlbumTheme(selectedAlbum).bg }}
                          >
                            {String(track.trackNumber).padStart(2, '0')}
                          </span>
                          <span className="flex-1 truncate">{track.title}</span>
                          {track.isTitle && (
                            <span className="text-[8px] font-press-start-2p text-red-500 shrink-0">★ TITLE</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA 버튼 */}
                <div className="mt-auto pt-6 flex gap-3">
                  {/* 모든 앨범에 상세 페이지 버튼 표시 */}
                  <button 
                    className="flex-1 px-4 py-3 text-black font-press-start-2p text-[10px] rounded-lg border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_rgba(0,0,0,1)] transition-all relative overflow-hidden group/btn"
                    style={{ backgroundColor: getAlbumTheme(selectedAlbum).bg }}
                    onClick={() => {
                      // WISH 앨범은 전용 스크랩북 페이지로
                      if (selectedAlbum.title.toLowerCase().includes('wish') && selectedAlbum.type === 'SINGLE_ALBUM') {
                        router.push('/releases/wish');
                      } else {
                        // 다른 앨범들은 [id] 동적 라우트로
                        router.push(`/releases/${selectedAlbum.id}`);
                      }
                    }}
                  >
                    <motion.span
                      className="absolute inset-0 bg-black/10"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      ★ CLICK FOR DETAIL
                    </span>
                  </button>
                  <button 
                    className="flex-1 px-4 py-3 bg-black text-white font-press-start-2p text-[10px] rounded-lg border-2 border-black shadow-[3px_3px_0px_rgba(0,0,0,0.3)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_rgba(0,0,0,0.3)] transition-all"
                    onClick={() => setSelectedAlbum(null)}
                  >
                    CLOSE
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
