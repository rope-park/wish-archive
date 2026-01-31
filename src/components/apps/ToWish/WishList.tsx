
import { useState, useEffect, useRef } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';
import { PaperCrane } from './PaperCrane';
import { motion, AnimatePresence } from 'framer-motion';

// Type definition (should match API response)
interface WishMessage {
    id: string;
    message: string;
    authorName: string | null;
    isAnonymous: boolean;
    targetMember: string | null;
    craneColor: string;
    createdAt: string;
}

import { useWishStore } from '@/app/stores/useWishStore';

// ... (imports)

// remove local WishMessage interface if imported or keep if compatible

export const WishList = ({ onWriteClick }: { onWriteClick: () => void }) => {
    // Use Store
    const { wishes, setWishes, cursor, setCursor } = useWishStore();
    
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0); 

    // Infinite scroll ref
    const observerTarget = useRef(null);

    const fetchWishes = async (reset = false) => {
        if (loading) return;
        setLoading(true);
        try {
            const url = new URL('/api/wishes', window.location.origin);
            // Use local variable for cursor check if resetting, otherwise store cursor
            const currentCursor = reset ? null : cursor;
            if (currentCursor) url.searchParams.set('cursor', currentCursor);
            
            const res = await fetch(url.toString());
            const data = await res.json();
            
            if (data.data) {
                if (reset) {
                    setWishes(data.data);
                } else {
                    setWishes(prev => [...prev, ...data.data]);
                }
                setCursor(data.nextCursor);
                setTotalCount(prev => reset ? data.data.length : prev + data.data.length); 
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Only fetch if empty to preserve state, OR if we want to refresh on mount?
        // User wants to "preserve state". So if we have wishes, don't auto-fetch.
        if (wishes.length === 0) {
            fetchWishes(true);
        }
    }, []);

    // Infinite Scroll Observer
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && cursor) {
                    fetchWishes(false);
                }
            },
            { threshold: 1.0 }
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [cursor]);

    return (
        <div className="w-full h-full flex flex-col bg-[#d4d4d4] border-l-2 border-white">
            


            {/* Sub-header / Stats */}
            <div className="bg-white border-b border-gray-300 px-4 py-3 flex justify-between items-center">
                 <span className="text-sm font-pixel text-gray-700">
                    {totalCount > 0 ? `${totalCount}개의 소원이 모였어요!` : '로딩 중...'}
                 </span>
                 <button onClick={() => fetchWishes(true)} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                    <RefreshCw size={14} className="text-gray-500" />
                 </button>
            </div>

            {/* List Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#e0e0e0] inner-shadow custom-scrollbar">
                <style jsx>{`
                    .inner-shadow {
                        box-shadow: inset 4px 4px 10px rgba(0,0,0,0.1);
                    }
                `}</style>
                
                <AnimatePresence>
                    {wishes.map((wish, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={wish.id}
                            className="bg-[#dcdcdc] border-2 border-white border-b-gray-400 border-r-gray-400 rounded-lg p-3 flex gap-3 shadow-sm hover:translate-x-1 transition-transform cursor-default group"
                        >
                            {/* Icon */}
                            <div className="shrink-0 pt-1">
                                <PaperCrane color={wish.craneColor} className="w-8 h-8" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-1 text-xs text-gray-500 font-pixel">
                                    <span>
                                        {wish.isAnonymous ? '익명의 시즈니' : wish.authorName} 
                                        <span className="mx-1">|</span>
                                        {new Date(wish.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <p className="text-gray-900 text-sm font-medium leading-normal wrap-break-word font-pixel">
                                    {wish.message}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Loading / Observer Sentinel */}
                <div ref={observerTarget} className="h-10 flex items-center justify-center w-full">
                    {loading && <Loader2 className="animate-spin text-gray-500" />}
                </div>

                 {!loading && !cursor && wishes.length > 0 && (
                    <div className="text-center text-xs text-gray-400 py-4 font-pixel">
                        모든 소원을 불러왔습니다.
                    </div>
                )}
            </div>
        </div>
    );
};
