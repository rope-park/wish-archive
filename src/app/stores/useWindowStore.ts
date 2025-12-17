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
    isMaximized: boolean;     // 최대화 여부
    zIndex: number;           // 레이어 순서 (높을수록 맨 앞)

    position: { x: number; y: number }; // 현재 위치
    size: { width: number; height: number }; // 현재 크기
    
    // 최대화 이전 상태 저장 (복원용)
    beforeMaximize?: {
        position: { x: number; y: number };
        size: { width: number; height: number };
    };
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
    updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
    updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

// Zustand를 사용한 윈도우 스토어 생성
export const useWindowStore = create<WindowStore>((set, get) => ({
    windows: [],
    activeWindowId: null,

    // 1. 창 열기
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
        
        // Cascading 위치 계산
        // 현재 열려있는 창의 개수를 기준으로 오른쪽 아래로 밀어서 배치
        // offset을 40px로 증가하여 더 명확한 cascading 효과
        const cascadeOffset: number = windows.length * 40;
        const baseX = 100;
        const baseY = 50;
        
        // 화면을 벗어나지 않도록 최대 offset 제한 (최대 10개 창까지 cascading)
        const maxOffset = 400;
        const limitedOffset = Math.min(cascadeOffset, maxOffset);
        
        const finalPosition = app.defaultPosition || { 
            x: baseX + limitedOffset, 
            y: baseY + limitedOffset 
        };
        const finalSize = app.defaultSize || { width: 600, height: 400 };

        const newWindow: WindowState = {
            id: app.id,
            appType: app.type,
            title: app.title,
            icon: app.icon,
            isMinimized: false,
            isMaximized: false,
            zIndex: maxZ + 1,
            position: finalPosition,
            size: finalSize,
        };

        set((state) => ({
            windows: [...state.windows, newWindow],
            activeWindowId: app.id,
        }));
    },

    // 2. 창 닫기
    closeWindow: (id) => {
        set((state) => {
            const remainingWindows: WindowState[] = state.windows.filter((w) => w.id !== id);
            
            // 닫은 창이 활성 창이었다면, 남은 창 중 z-index가 가장 높은 창을 활성화
            let nextActiveId = state.activeWindowId;
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

    // 3. 창 최소화
    minimizeWindow: (id) => {
        set((state) => ({
            windows: state.windows.map((w) => 
                w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
            ),
            activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
        }));
    },

    // 4. 창 포커스
    focusWindow: (id) => {
        const { windows } = get();
        const targetWindow = windows.find((w) => w.id === id);

        if (!targetWindow) return;
        
        // 최적화: 이미 맨 앞이고 최소화되지 않았다면 무시
        const maxZ: number = Math.max(0, ...windows.map((w) => w.zIndex));
        if (targetWindow && targetWindow.zIndex === maxZ && !targetWindow.isMinimized && get().activeWindowId === id) {
            return;
        }

        // Window z-index는 최대 500으로 제한 (StartMenu/Modal이 9999로 항상 위에 유지)
        const nextZ = Math.min(maxZ + 1, 500);

        set((state) => ({
            windows: state.windows.map((w) => 
                w.id === id 
                    ? { ...w, zIndex: nextZ, isMinimized: false } 
                    : w
            ),
            activeWindowId: id,
        }));
    },

    // 5. 최대화
    maximizeWindow: (id) => {
        get().focusWindow(id); // 최대화할 때도 포커스
        
        set((state) => ({
            windows: state.windows.map((w) => {
                if (w.id === id) {
                    if (w.isMaximized) {
                        // 복원: 이전 위치/크기로 돌아감
                        return {
                            ...w,
                            isMaximized: false,
                            position: w.beforeMaximize?.position || w.position,
                            size: w.beforeMaximize?.size || w.size,
                            beforeMaximize: undefined,
                        };
                    } else {
                        // 최대화: 현재 위치/크기 저장 후 전체화면
                        return {
                            ...w,
                            isMaximized: true,
                            beforeMaximize: {
                                position: w.position,
                                size: w.size,
                            },
                        };
                    }
                }
                return w;
            }),
        }));
    },

    // 6. 윈도우 위치 업데이트
    updateWindowPosition: (id, position) => {
        set((state) => ({
            windows: state.windows.map((w) => 
                w.id === id && !w.isMaximized ? { ...w, position } : w
            ),
        }));
    },

    // 7. 윈도우 크기 업데이트
    updateWindowSize: (id, size) => {
        set((state) => ({
            windows: state.windows.map((w) => 
                w.id === id && !w.isMaximized ? { ...w, size } : w
            ),
        }));
    },
}));