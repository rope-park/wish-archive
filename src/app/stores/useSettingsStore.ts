/**
 * Settings Store - 설정 관리
 * 
 * - 배경화면, 커서, 위시돌 파트너, 알림 설정 등 관리
 * - localStorage를 통한 설정 영속화
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 위시돌 캐릭터 타입
export type WichuCharacter = 'sion' | 'riku' | 'yushi' | 'jaehee' | 'ryo' | 'sakuya';

// 알림 빈도 타입
export type NotificationFrequency = 'active' | 'calm' | 'locked';

// 커서 타입
export type CursorType = 'none' | 'magic-wand' | 'wichu'


interface SettingsState {
    // 디스플레이 설정
    cursor: CursorType;

    // 파트너 설정
    wichuPartner: WichuCharacter;
    notificationFrequency: NotificationFrequency;

    // 사용자 정보
    userNickname: string;

    // 액션
    setCursor: (cursor: CursorType) => void;
    setWichuPartner: (partner: WichuCharacter) => void;
    setNotificationFrequency: (frequency: NotificationFrequency) => void;
    setUserNickname: (nickname: string) => void;

    // 커서 적용
    applyCursor: () => void;
}

export const useSettingsStore = create<SettingsState>()(
    persist(
        (set, get) => ({
            // 기본값
            cursor: 'wichu',
            wichuPartner: 'sion',
            notificationFrequency: 'active',
            userNickname: '위즈니',

            setCursor: (cursor) => {
                set({ cursor });
                get().applyCursor();
            },

            setWichuPartner: (partner) => set({ wichuPartner: partner }),

            setNotificationFrequency: (frequency) => set({ notificationFrequency: frequency }),

            setUserNickname: (nickname) => set({ userNickname: nickname }),

            applyCursor: () => {
                const { cursor } = get();
                const cursorMap: Record<CursorType, string> = {
                    'none': 'none',
                    'magic-wand': 'url(/system/cursors/magic-wand.png) 0 0, pointer',
                    'wichu': 'url(/system/cursors/wichu.svg) 0 0, pointer',
                };

                document.body.style.cursor = cursorMap[cursor];
            },
        }),
        {
            name: 'wish-os-settings',
        }
    )
);
