/**
 * 오디오 상태 관리 Store
 * 
 * - 전역 음소거, 볼륨 상태 관리
 * - YouTube Player 제어를 위한 참조 저장
 */

import { create } from 'zustand';
import { Track } from '@prisma/client';

// YouTube IFrame Player API 타입 정의
interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
}

interface AudioStore {
  // 상태
  isMuted: boolean;
  volume: number; // 0-100
  playerRef: YouTubePlayer | null; // YouTube Player 참조
  isPlaying: boolean;
  currentTrack: Track | null;
  playlist: Track[];
  
  // 액션
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlayerRef: (ref: YouTubePlayer | null) => void;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setPlaylist: (tracks: Track[]) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  // 초기 상태
  isMuted: false,
  volume: 100,
  playerRef: null,
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  
  // 음소거 설정
  setMuted: (muted) => {
    set({ isMuted: muted });
    const { playerRef, volume } = get();
    if (playerRef && typeof playerRef.setVolume === 'function') {
      playerRef.setVolume(muted ? 0 : volume);
    }
  },
  
  // 볼륨 설정
  setVolume: (volume) => {
    const clampedVolume = Math.max(0, Math.min(100, volume));
    set({ volume: clampedVolume });
    const { playerRef, isMuted } = get();
    if (playerRef && typeof playerRef.setVolume === 'function' && !isMuted) {
      playerRef.setVolume(clampedVolume);
    }
  },
  
  // 음소거 토글
  toggleMute: () => {
    const { isMuted } = get();
    get().setMuted(!isMuted);
  },
  
  // YouTube Player 참조 저장
  setPlayerRef: (ref) => {
    set({ playerRef: ref });
  },

  // 트랙 재생
  playTrack: (track) => {
    set({ currentTrack: track, isPlaying: true });
  },

  // 재생/일시정지 토글
  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  // 재생목록 설정
  setPlaylist: (tracks) => {
    set({ playlist: tracks });
  },
}));
