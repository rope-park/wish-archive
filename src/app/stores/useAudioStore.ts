/**
 * 오디오 상태 관리 Store
 * 
 * - 전역 음소거, 볼륨 상태 관리
 * - YouTube Player 제어를 위한 참조 저장
 */

import { create } from 'zustand';
import { Track } from '@prisma/client';

// 재생 모드 타입
type PlayMode = 'normal' | 'shuffle' | 'repeat-one' | 'repeat-all';

// YouTube IFrame Player API 타입 정의
interface YouTubePlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

interface AudioStore {
  // 상태
  isMuted: boolean;
  volume: number; // 0-100
  playerRef: YouTubePlayer | null; // YouTube Player 참조
  isPlaying: boolean;
  currentTrack: Track | null;
  playlist: Track[];
  currentTime: number; // 현재 재생 시간 (초)
  duration: number; // 총 재생 시간 (초)
  playMode: PlayMode; // 재생 모드
  shuffledPlaylist: Track[]; // 셔플된 플레이리스트
  isLoading: boolean; // 로딩 상태
  
  // 액션
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  setPlayerRef: (ref: YouTubePlayer | null) => void;
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  setPlaylist: (tracks: Track[]) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  seekTo: (seconds: number) => void;
  setPlayMode: (mode: PlayMode) => void;
  playNext: () => void;
  playPrev: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAudioStore = create<AudioStore>((set, get) => ({
  // 초기 상태
  isMuted: false,
  volume: 100,
  playerRef: null,
  isPlaying: false,
  currentTrack: null,
  playlist: [],
  currentTime: 0,
  duration: 0,
  playMode: 'normal',
  shuffledPlaylist: [],
  isLoading: false,
  
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
    set({ currentTrack: track, isPlaying: true, isLoading: true });
  },

  // 재생/일시정지 토글
  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  // 재생목록 설정
  setPlaylist: (tracks) => {
    set({ playlist: tracks });
  },

  // 현재 재생 시간 설정
  setCurrentTime: (time) => {
    set({ currentTime: time });
  },

  // 총 재생 시간 설정
  setDuration: (duration) => {
    set({ duration });
  },

  // 특정 시간으로 이동
  seekTo: (seconds) => {
    const { playerRef } = get();
    if (playerRef && typeof playerRef.seekTo === 'function') {
      playerRef.seekTo(seconds, true);
      set({ currentTime: seconds });
    }
  },

  // 재생 모드 설정
  setPlayMode: (mode) => {
    const { playlist } = get();
    if (mode === 'shuffle') {
      // 셔플: 플레이리스트를 무작위로 섬기
      const shuffled = [...playlist].sort(() => Math.random() - 0.5);
      set({ playMode: mode, shuffledPlaylist: shuffled });
    } else {
      set({ playMode: mode, shuffledPlaylist: [] });
    }
  },

  // 다음 곡 재생
  playNext: () => {
    const { playlist, shuffledPlaylist, currentTrack, playMode } = get();
    if (playlist.length === 0) return;

    const activeList = playMode === 'shuffle' ? shuffledPlaylist : playlist;
    const currentIdx = activeList.findIndex(t => t.id === currentTrack?.id);

    if (playMode === 'repeat-one') {
      // 1곡 반복: 현재 곡 다시 재생
      if (currentTrack) get().playTrack(currentTrack);
    } else if (playMode === 'repeat-all') {
      // 전체 반복: 마지막 곡이면 처음으로
      const nextIdx = currentIdx >= activeList.length - 1 ? 0 : currentIdx + 1;
      get().playTrack(activeList[nextIdx]);
    } else {
      // 일반/셔플: 다음 곡 재생 (마지막이면 멈춤)
      if (currentIdx < activeList.length - 1) {
        get().playTrack(activeList[currentIdx + 1]);
      }
    }
  },

  // 이전 곡 재생
  playPrev: () => {
    const { playlist, shuffledPlaylist, currentTrack, playMode } = get();
    if (playlist.length === 0) return;

    const activeList = playMode === 'shuffle' ? shuffledPlaylist : playlist;
    const currentIdx = activeList.findIndex(t => t.id === currentTrack?.id);

    if (currentIdx > 0) {
      get().playTrack(activeList[currentIdx - 1]);
    } else if (playMode === 'repeat-all') {
      // 전체 반복: 처음이면 마지막으로
      get().playTrack(activeList[activeList.length - 1]);
    }
  },

  // 로딩 상태 설정
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));
