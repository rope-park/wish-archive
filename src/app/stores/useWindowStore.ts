/**
 * 윈도우(창) 관리 스토어 - Zustand 사용
 * 
 * - 각 창의 상태(열림/닫힘, 최소화, 위치, 크기 등) 관리
 * - 창 열기/닫기, 최소화, 포커스(맨 앞으로) 기능 제공
 */

import { create } from 'zustand';

// 앱 종류 정의
export type AppType =
    | 'MY_WISH'      // 내 컴퓨터 (소개/프로필)
    | 'WISH_ARCHIVE' // 탐색기 (타임라인)
    | 'DISCOGRAPHY'  // 앨범/음악
    | 'WISH_GALLERY' // 사진첩
    | 'WISH_WORLD'   // 인터넷 (외부 링크 모음)
    | 'TO_WISH'      // 방명록/소원함
    | 'RECYCLE_BIN'  // 휴지통
    | 'README';      // README 파일

// 개별 창(Window) 상태 인터페이스
export interface WindowState {
    id: string;               // 고유 ID
    appType: AppType;         // 앱 종류
    title: string;            // 창 제목
    icon: string;             // 창 아이콘 경로

    isMinimized: boolean;     // 최소화 여부
    isMaximized: boolean;    // 최대화 여부
    zIndex: number;           // 레이어 순서 (높을수록 맨 앞)

    defaultPosition?: { x: number; y: number }; // 기본 위치
    defaultSize?: { width: number; height: number }; // 기본 크기
}

// 스토어 상태 및 액션 정의
interface WindowStore {
    windows: WindowState[];         // 열려있는 창들
    activeWindowId: string | null;  // 현재 활성화(포커스)된 창 ID

    // 액션 (기능)
    openWindow: (app: { id: string; type: AppType; title: string; icon: string; defaultPosition?: { x: number; y: number }; defaultSize?: { width: number; height: number }; }) => void;
    closeWindow: (id: string) => void;
    minimizeWindow: (id: string) => void;
    focusWindow: (id: string) => void;  // 창 클릭 시 맨 앞으로 가져오기
    maximizeWindow: (id: string) => void;
}

// Zustand를 사용한 윈도우 스토어 생성
export const useWindowStore = create<WindowStore>((set, get) => ({
    windows: [],
    activeWindowId: null,

    // 창 열기
    openWindow: (app) => {
        const { windows } = get();
        
        // 이미 열려있는지 확인
        const existingWindow = windows.find((w) => w.id === app.id);
        if (existingWindow) {
            get().focusWindow(app.id); // 맨 앞으로
            if (existingWindow.isMinimized) {
                get().minimizeWindow(app.id); // 최소화 해제
            }
            return;
        }

        // 새 창 열기 (가장 높은 z-index + 1)
        const maxZ: number = windows.length > 0 ? Math.max(...windows.map((w) => w.zIndex)) : 10;
        
        // 위치 계산 (Cascading: 창이 많아질수록 오른쪽 아래로 조금씩 밀려서 뜸)
        const cascadeOffset: number = windows.length * 30;
        const finalPosition: { x: number; y: number } = app.defaultPosition || { x: 100 + cascadeOffset, y: 50 + cascadeOffset };

        const newWindow: WindowState = {
            id: app.id,
            appType: app.type,
            title: app.title,
            icon: app.icon,
            isMinimized: false,
            isMaximized: false,
            zIndex: maxZ + 1,
            defaultPosition: finalPosition,
            defaultSize: app.defaultSize,
        };

        set((state) => ({
            windows: [...state.windows, newWindow],
            activeWindowId: app.id,
        }));
    },

    // 창 닫기
    closeWindow: (id) => {
        set((state) => {
            const remainingWindows: WindowState[] = state.windows.filter((w) => w.id !== id);
            
            // 닫은 창이 활성 창이었다면, 남은 창 중 z-index가 가장 높은 창을 활성화
            let nextActiveId: string | null = state.activeWindowId;
            if (state.activeWindowId === id) {
                if (remainingWindows.length > 0) {
                    const topWindow: WindowState = [...remainingWindows].sort((a, b) => b.zIndex - a.zIndex)[0];
                    nextActiveId = topWindow.id;
                } else {
                    nextActiveId = null;
                }
            }

            return {
                windows: remainingWindows,
                activeWindowId: nextActiveId,
            };
        });
    },

    // 창 최소화
    minimizeWindow: (id) => {
        set((state) => ({
            windows: state.windows.map((w) => 
                w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
            ),
            activeWindowId: state.activeWindowId === id ? null : id,
        }));
    },

    // 창 포커스
    focusWindow: (id) => {
        const { windows } = get();
        const targetWindow: WindowState | undefined = windows.find((w) => w.id === id);
        
        // 최적화: 이미 맨 앞이고 최소화되지 않았다면 무시
        const maxZ: number = Math.max(0, ...windows.map((w) => w.zIndex));
        if (targetWindow && targetWindow.zIndex === maxZ && !targetWindow.isMinimized && get().activeWindowId === id) {
            return;
        }

        set((state) => ({
            windows: state.windows.map((w) => 
                w.id === id 
                    ? { ...w, zIndex: maxZ + 1, isMinimized: false } 
                    : w
            ),
            activeWindowId: id,
        }));
    },

    // 최대화
    maximizeWindow: (id) => {
        get().focusWindow(id); // 최대화할 때도 포커스
        
        set((state) => ({
            windows: state.windows.map((w) => 
                w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
            ),
        }));
    },
}));