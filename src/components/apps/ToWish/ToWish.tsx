'use client';

import { useState } from 'react';
import { WishForm } from './WishForm';
import { WishList } from './WishList';

import { useWindowStore } from '@/app/stores/useWindowStore';

export interface ToWishProps {
    mode?: 'full' | 'write_only' | 'read_only';
    windowId?: string;
}

export default function ToWish({ mode = 'full', windowId }: ToWishProps) {
    // Shared state to trigger list refresh when new wish is added
    const [refreshKey, setRefreshKey] = useState(0);
    const { openWindow, closeWindow, windows, focusWindow } = useWindowStore();

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };
    
    // Helper to switch modes by opening/focusing appropriate windows
    const switchToMode = (targetMode: 'write_only' | 'read_only') => {
        const targetId = targetMode === 'write_only' ? 'wish_maker' : 'wish_list_viewer';
        
        // If target window already exists, focus it
        if (windows.find(w => w.id === targetId)) {
            focusWindow(targetId);
        } else {
            // Otherwise open it
            if (targetMode === 'write_only') {
                 openWindow({
                    id: 'wish_maker',
                    type: 'TO_WISH',
                    title: 'Make_a_wish.exe',
                    icon: '/system/icons/apps/towish.png',
                    defaultSize: { width: 400, height: 600 },
                    props: { mode: 'write_only' }
                 });
            } else {
                openWindow({
                    id: 'wish_list_viewer',
                    type: 'TO_WISH',
                    title: 'Wish_list.txt',
                    icon: '/system/icons/apps/towish.png',
                    defaultSize: { width: 400, height: 600 },
                    props: { mode: 'read_only' }
                });
            }
            
            // Close current window ONLY if we opened a new one (i.e., we are transforming)
            // If we just focused an existing one, we keep both open.
            if (windowId && (windowId === 'wish_maker' || windowId === 'wish_list_viewer')) {
                closeWindow(windowId);
            }
        }
    };

    const isWriteVisible = mode === 'full' || mode === 'write_only';
    const isListVisible = mode === 'full' || mode === 'read_only';

    return (
        <div className="w-full h-full flex flex-col md:flex-row bg-[#1a1a1a] text-white overflow-hidden font-pixel relative">
            
            {/* Write Section */}
            {isWriteVisible && (
                <div className={`${mode === 'full' ? 'w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-600' : 'w-full h-full'} p-4 flex items-center justify-center relative bg-[url('/system/wallpapers/grid_pattern.png')] bg-repeat`}>
                    <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    <div className="z-10 w-full max-w-md relative">
                        <WishForm onSuccess={handleSuccess} />
                         {/* Navigation for Write-only mode */}
                        {mode === 'write_only' && (
                            <button 
                                onClick={() => switchToMode('read_only')}
                                className="absolute -bottom-10 right-0 text-xs text-gray-400 hover:text-white underline decoration-dashed underline-offset-4"
                            >
                                다른 친구들 소원 보기 &rarr;
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* List Section */}
            {isListVisible && (
                <div className={`${mode === 'full' ? 'w-full md:w-1/2 h-1/2 md:h-full' : 'w-full h-full'} bg-gray-200 text-black relative`}>
                    <WishList key={refreshKey} onWriteClick={() => {}} />
                     {/* Navigation for Read-only mode */}
                     {mode === 'read_only' && (
                        <button 
                            onClick={() => switchToMode('write_only')}
                            className="absolute bottom-4 right-6 z-20 bg-black text-white px-3 py-1.5 text-xs rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                            <span>✎</span> 나도 소원 적기
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
