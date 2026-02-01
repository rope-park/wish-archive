/**
 * useWishStore.ts
 * 
 * To.Wish 페이지 상태 관리
 */
import { create } from 'zustand';

interface WishFormData {
    message: string;
    authorName: string;
    isAnonymous: boolean;
    targetMember: string;
    craneColor: string;
}

interface WishStore {
    formData: WishFormData;
    setFormData: (data: WishFormData | ((prev: WishFormData) => WishFormData)) => void;
    resetFormData: () => void;
}

const DEFAULT_FORM_DATA: WishFormData = {
    message: '',
    authorName: '',
    isAnonymous: false,
    targetMember: 'ALL',
    craneColor: '#FFB6C1' // Pink
};

// Wish Message Type
export interface WishMessage {
    id: string;
    message: string;
    authorName: string | null;
    isAnonymous: boolean;
    targetMember: string | null;
    craneColor: string;
    createdAt: string;
}

interface WishStore {
    formData: WishFormData;
    setFormData: (data: WishFormData | ((prev: WishFormData) => WishFormData)) => void;
    resetFormData: () => void;

    // Loading State
    isLoading: boolean;
    setLoading: (loading: boolean) => void;

    // List State
    wishes: WishMessage[];
    setWishes: (wishes: WishMessage[] | ((prev: WishMessage[]) => WishMessage[])) => void;
    cursor: string | null;
    setCursor: (cursor: string | null) => void;
    scrollPosition: number;
    setScrollPosition: (pos: number) => void;

    // Actions
    fetchWishes: (reset?: boolean) => Promise<void>;
}

export const useWishStore = create<WishStore>((set, get) => ({
    formData: DEFAULT_FORM_DATA,
    setFormData: (input) => set((state) => ({
        formData: typeof input === 'function' ? input(state.formData) : input
    })),
    resetFormData: () => set({ formData: DEFAULT_FORM_DATA }),

    isLoading: false,
    setLoading: (loading) => set({ isLoading: loading }),

    wishes: [],
    setWishes: (input) => set((state) => ({
        wishes: typeof input === 'function' ? input(state.wishes) : input
    })),
    cursor: null,
    setCursor: (cursor) => set({ cursor }),
    scrollPosition: 0,
    setScrollPosition: (pos) => set({ scrollPosition: pos }),

    fetchWishes: async (reset = false) => {
        const { cursor, isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });
        try {
            const url = '/api/wishes';
            const params = new URLSearchParams();

            // If NOT resetting and we have cursor, append it
            // If resetting, we fetching fresh (no cursor)
            if (!reset && cursor) {
                params.set('cursor', cursor);
            }

            const queryString = params.toString() ? `?${params.toString()}` : '';
            const res = await fetch(`${url}${queryString}`);
            const data = await res.json();

            if (data.data) {
                set((state) => ({
                    wishes: reset ? data.data : [...state.wishes, ...data.data],
                    cursor: data.nextCursor
                }));
            }
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    }
}));
