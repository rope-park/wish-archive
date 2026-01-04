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
  setPlaybackQuality: (quality: string) => void;
  getPlaybackQuality: () => string;
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
  queue: Track[]; // 재생 큐
  playbackRate: number; // 재생 속도 (0.5 ~ 2.0)
  sleepTimer: number | null; // 수면 타이머 (milliseconds)
  showQueue: boolean; // 큐 보기 여부
  showMiniPlayer: boolean; // 미니 플레이어 표시 여부
  miniPlayerExpanded: boolean; // 미니 플레이어 확장 상태
  miniPlayerPosition: { x: number; y: number }; // 미니 플레이어 위치
  themeColor: string | null; // 앨범 아트 기반 테마 색상
  
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
  addToQueue: (track: Track) => void;
  addNextInQueue: (track: Track) => void;
  removeFromQueue: (index: number) => void;
  reorderQueue: (fromIndex: number, toIndex: number) => void;
  clearQueue: () => void;
  setQueue: (tracks: Track[]) => void;
  toggleQueue: () => void;
  setPlaybackRate: (rate: number) => void;
  setSleepTimer: (minutes: number | null) => void;
  toggleMiniPlayer: () => void;
  setMiniPlayerExpanded: (expanded: boolean) => void;
  setMiniPlayerPosition: (position: { x: number; y: number }) => void;
  setThemeColor: (color: string | null) => void;
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
  queue: [],
  playbackRate: 1.0,
  sleepTimer: null,
  showQueue: false,
  showMiniPlayer: false,
  miniPlayerExpanded: false,
  miniPlayerPosition: { x: 20, y: 20 },
  themeColor: null,
  
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
    const { playlist, shuffledPlaylist, currentTrack, playMode, queue } = get();
    
    // 1. 큐에 곡이 있으면 큐에서 재생
    if (queue.length > 0) {
      const nextTrack = queue[0];
      get().playTrack(nextTrack);
      get().removeFromQueue(0); // 큐에서 제거
      return;
    }
    
    // 2. 큐가 비어있으면 플레이리스트에서 재생
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

  // 재생 큐 끝에 추가
  addToQueue: (track) => {
    set((state) => ({ queue: [...state.queue, track] }));
  },

  // 다음에 재생 (큐 맨 앞에 추가)
  addNextInQueue: (track) => {
    set((state) => ({ queue: [track, ...state.queue] }));
  },

  // 큐에서 제거
  removeFromQueue: (index) => {
    set((state) => ({
      queue: state.queue.filter((_, i) => i !== index)
    }));
  },

  // 큐 순서 변경
  reorderQueue: (fromIndex, toIndex) => {
    set((state) => {
      const newQueue = [...state.queue];
      const [removed] = newQueue.splice(fromIndex, 1);
      newQueue.splice(toIndex, 0, removed);
      return { queue: newQueue };
    });
  },

  // 큐 비우기
  clearQueue: () => {
    set({ queue: [] });
  },

  // 큐 설정
  setQueue: (tracks) => {
    set({ queue: tracks });
  },

  // 큐 보기 토글
  toggleQueue: () => {
    set((state) => ({ showQueue: !state.showQueue }));
  },

  // 재생 속도 설정
  setPlaybackRate: (rate) => {
    const clampedRate = Math.max(0.5, Math.min(2.0, rate));
    set({ playbackRate: clampedRate });
    const { playerRef } = get();
    if (playerRef && typeof (playerRef as any).setPlaybackRate === 'function') {
      (playerRef as any).setPlaybackRate(clampedRate);
    }
  },

  // 수면 타이머 설정
  setSleepTimer: (minutes) => {
    if (minutes === null) {
      set({ sleepTimer: null });
      return;
    }
    const timer = Date.now() + minutes * 60 * 1000;
    set({ sleepTimer: timer });
    
    setTimeout(() => {
      const { sleepTimer } = get();
      if (sleepTimer && Date.now() >= sleepTimer) {
        get().togglePlay(); // 일시정지
        set({ sleepTimer: null });
      }
    }, minutes * 60 * 1000);
  },

  // 미니 플레이어 토글
  toggleMiniPlayer: () => {
    set((state) => ({ showMiniPlayer: !state.showMiniPlayer }));
  },

  // 미니 플레이어 확장/축소
  setMiniPlayerExpanded: (expanded) => {
    set({ miniPlayerExpanded: expanded });
  },

  // 미니 플레이어 위치 설정
  setMiniPlayerPosition: (position) => {
    set({ miniPlayerPosition: position });
  },

  // 테마 색상 설정
  setThemeColor: (color) => {
    set({ themeColor: color });
  },
}));
