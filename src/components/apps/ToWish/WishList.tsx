
import { useState, useEffect, useRef } from 'react';
import { Loader2, RefreshCw, X, Minus } from 'lucide-react';
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

interface WishListProps {
    onWriteClick: () => void;
}

export const WishList = ({ onWriteClick }: WishListProps) => {
    const [wishes, setWishes] = useState<WishMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [cursor, setCursor] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState(0); // Optional: if API returns count

    // Infinite scroll ref
    const observerTarget = useRef(null);

    const fetchWishes = async (reset = false) => {
        if (loading) return;
        setLoading(true);
        try {
            const url = new URL('/api/wishes', window.location.origin);
            if (!reset && cursor) url.searchParams.set('cursor', cursor);
            
            const res = await fetch(url.toString());
            const data = await res.json();
            
            if (data.data) {
                if (reset) {
                    setWishes(data.data);
                } else {
                    setWishes(prev => [...prev, ...data.data]);
                }
                setCursor(data.nextCursor);
                // Assume API might return total count or we just count loaded
                setTotalCount(prev => reset ? data.data.length : prev + data.data.length); 
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishes(true);
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
            
             {/* Retro Header */}
             <div className="bg-linear-to-r from-[#db7093] to-[#ff1493] px-2 py-1 flex justify-between items-center border-b border-gray-600 shadow-md z-10">
                <span className="text-white font-bold text-sm font-pixel tracking-wide drop-shadow-md">WISH Archive.txt</span>
                <div className="flex gap-1">
                    <button className="w-4 h-4 bg-[#c0c0c0] border border-white border-r-black border-b-black flex items-center justify-center">
                        <Minus size={10} className="text-black" />
                    </button>
                    <button className="w-4 h-4 bg-[#c0c0c0] border border-white border-r-black border-b-black flex items-center justify-center hover:bg-red-400">
                        <X size={10} className="text-black" />
                    </button>
                </div>
            </div>

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
