/**
 * Album Detail Component
 * 
 * 앨범 상세 정보 페이지
 */

'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Play, Heart, Download, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import WishPlayer from './MusicPlayer';
import type { Album, Track } from '@prisma/client';

interface WishScrapbookProps {
  album: Album & { tracks: Track[] };
}

export default function WishScrapbook({ album }: WishScrapbookProps) {
  const router = useRouter();
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <div className="min-h-screen bg-[#F8F8F8] relative overflow-hidden">
      {/* 배경 패턴: 모눈종이 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none opacity-50" />

      {/* 배경 장식: 흩뿌려진 별 스티커들 */}
      <div className="absolute top-20 left-10 text-5xl text-[#DFFF00] drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] -rotate-12 animate-float">★</div>
      <div className="absolute top-40 right-20 text-4xl text-wish-sky drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-12 animate-float" style={{ animationDelay: '0.5s' }}>★</div>
      <div className="absolute bottom-40 left-1/4 text-3xl text-wish-pink drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] rotate-45 animate-float" style={{ animationDelay: '1s' }}>★</div>
      <div className="absolute top-1/2 right-10 text-4xl text-wish-purple drop-shadow-[3px_3px_0px_rgba(0,0,0,1)] -rotate-45 animate-float" style={{ animationDelay: '1.5s' }}>★</div>

      {/* 뒤로가기 버튼 */}
      <motion.button
        onClick={() => router.back()}
        className="fixed top-8 left-8 z-50 bg-white p-3 rounded-full border-4 border-black shadow-hard hover:shadow-hard-lg hover:-translate-y-1 transition-all"
        whileHover={{ rotate: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={24} />
      </motion.button>

      {/* 메인 컨텐츠 */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* 상단: 데뷔 배지 & 날짜 */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="bg-black text-[#DFFF00] px-4 py-2 rounded-lg font-bold text-sm font-['Press_Start_2P'] tracking-wide shadow-hard">
              DEBUT SINGLE
            </span>
            <span className="font-['Nanum_Pen_Script'] text-gray-600 text-2xl rotate-[-2deg]">
              {new Date(album.releaseDate).toLocaleDateString('ko-KR')} Release!
            </span>
          </div>

          {/* 거대한 WISH 타이포그래피 */}
          <motion.h1
            className="text-8xl md:text-9xl font-black text-[#DFFF00] mb-4 leading-none tracking-tighter"
            style={{
              WebkitTextStroke: '3px black',
              textShadow: '6px 6px 0px #000',
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            WISH
          </motion.h1>

          <motion.p
            className="text-2xl font-bold text-gray-700 mb-12 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            NCT WISH의 시작을 알리는 소원 <br />
            <span className="bg-[#DFFF00]/70 px-2 py-1 rounded">
              &quot;Fly high with our WISH!&quot;
            </span>
          </motion.p>

          {/* 메인 레이아웃: 2단 구성 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* 왼쪽: CD 플레이어 */}
            <WishPlayer album={album} />

            {/* 오른쪽: 트랙리스트 & 정보 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* 트랙리스트 메모지 */}
              <div className="bg-[#FFFEE0] p-8 rounded-tl-3xl rounded-br-3xl border-4 border-black shadow-hard-lg rotate-1 mb-8">
                <div className="flex items-center justify-between mb-6 border-b-4 border-black/10 pb-3">
                  <h3 className="font-black text-3xl uppercase flex items-center gap-3">
                    <span className="text-[#DFFF00] text-4xl">★</span> Track List
                  </h3>
                  <motion.span
                    className="text-3xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  >
                    ⭐
                  </motion.span>
                </div>

                <ul className="space-y-5">
                  {album.tracks.map((track, idx) => (
                    <motion.li
                      key={track.id}
                      className="group cursor-pointer"
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedTrack(track)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-['Press_Start_2P'] text-sm transition-all ${
                            idx === 0
                              ? 'bg-black text-white group-hover:bg-[#DFFF00] group-hover:text-black'
                              : 'bg-white border-4 border-black text-black group-hover:bg-[#FFB6D9]'
                          }`}>
                            {String(track.trackNumber).padStart(2, '0')}
                          </span>
                          <div className="flex-1">
                            <p className="font-black text-xl md:text-2xl group-hover:text-[#0088CC] transition-colors">
                              {track.title}
                            </p>
                            <p className="text-xs text-gray-500 font-mono mt-1">
                              {track.durationSec ? `${Math.floor(track.durationSec / 60)}:${String(track.durationSec % 60).padStart(2, '0')}` : '3:30'} • {idx === 0 ? 'Title Track' : 'B-side'}
                            </p>
                          </div>
                        </div>
                        <button className="w-12 h-12 rounded-full border-4 border-black flex items-center justify-center hover:bg-[#DFFF00] hover:scale-110 transition-all flex-shrink-0 ml-2">
                          {idx === 0 ? (
                            <Play size={18} fill="currentColor" />
                          ) : (
                            <Heart size={18} />
                          )}
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* 앨범 정보 카드 */}
              <motion.div
                className="bg-white p-6 rounded-2xl border-4 border-black shadow-hard -rotate-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h4 className="font-black text-xl mb-4 flex items-center gap-2">
                  📀 Album Info
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Release</span>
                    <span className="font-bold">{new Date(album.releaseDate).toLocaleDateString('ko-KR')}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Type</span>
                    <span className="font-bold">{album.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 pb-2">
                    <span className="text-gray-500">Tracks</span>
                    <span className="font-bold">{album.tracks.length} songs</span>
                  </div>
                </div>

                {/* 액션 버튼들 */}
                <div className="flex gap-3 mt-6">
                  <button className="flex-1 bg-black text-white py-3 rounded-xl font-bold hover:bg-[#DFFF00] hover:text-black transition-colors border-4 border-black flex items-center justify-center gap-2">
                    <Download size={18} />
                    Save
                  </button>
                  <button className="flex-1 bg-white text-black py-3 rounded-xl font-bold hover:bg-wish-sky transition-colors border-4 border-black flex items-center justify-center gap-2">
                    <Share2 size={18} />
                    Share
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 트랙 상세 모달 (선택 시) */}
      {selectedTrack && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedTrack(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl border-4 border-black shadow-hard-xl p-8 max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-black text-3xl mb-2">{selectedTrack.title}</h3>
            <p className="text-gray-500 mb-6">Track {selectedTrack.trackNumber}</p>
            
            {/* 여기에 추가 정보나 플레이어 UI 등 */}
            <button
              onClick={() => setSelectedTrack(null)}
              className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-[#DFFF00] hover:text-black transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
