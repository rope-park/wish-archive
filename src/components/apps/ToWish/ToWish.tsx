/**
 * APP: TO_WISH (소원 기록)
 * 
 * - 소원 입력 폼
 * - 소원 목록
 */

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
                <div className={`${mode === 'full' ? 'w-full md:w-1/2 h-auto md:h-full border-b md:border-b-0 md:border-r border-gray-600 shrink-0' : 'w-full h-full'} p-0 flex items-center justify-center relative bg-[url('/system/wallpapers/grid_pattern.png')] bg-repeat`}>
                    <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                    <div className="z-10 w-full h-full relative">
                        <WishForm onSuccess={handleSuccess} />
                         {/* Navigation for Write-only mode */}
                        {mode === 'write_only' && (
                            <button 
                                onClick={() => switchToMode('read_only')}
                                className="absolute -bottom-10 right-0 text-xs text-gray-400 hover:text-white underline decoration-dashed underline-offset-4"
                            >
                                WISH LIST &rarr;
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* List Section */}
            {isListVisible && (
                <div className={`${mode === 'full' ? 'w-full md:w-1/2 flex-1 md:h-full overflow-hidden' : 'w-full h-full'} bg-gray-200 text-black relative`}>
                    <WishList key={refreshKey} onWriteClick={() => {}} />
                     {/* Navigation for Read-only mode */}
                     {mode === 'read_only' && (
                        <button 
                            onClick={() => switchToMode('write_only')}
                            className="absolute bottom-4 right-6 z-20 bg-black text-white px-3 py-1.5 text-xs rounded-full shadow-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                            <span>✎</span> Make a Wish!
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
