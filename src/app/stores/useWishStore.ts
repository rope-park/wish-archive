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

    // List State
    wishes: WishMessage[];
    setWishes: (wishes: WishMessage[] | ((prev: WishMessage[]) => WishMessage[])) => void;
    cursor: string | null;
    setCursor: (cursor: string | null) => void;
    scrollPosition: number;
    setScrollPosition: (pos: number) => void;
}

export const useWishStore = create<WishStore>((set) => ({
    formData: DEFAULT_FORM_DATA,
    setFormData: (input) => set((state) => ({
        formData: typeof input === 'function' ? input(state.formData) : input
    })),
    resetFormData: () => set({ formData: DEFAULT_FORM_DATA }),

    wishes: [],
    setWishes: (input) => set((state) => ({
        wishes: typeof input === 'function' ? input(state.wishes) : input
    })),
    cursor: null,
    setCursor: (cursor) => set({ cursor }),
    scrollPosition: 0,
    setScrollPosition: (pos) => set({ scrollPosition: pos })
}));
