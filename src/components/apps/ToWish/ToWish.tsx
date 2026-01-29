'use client';

import { useState } from 'react';
import { WishForm } from './WishForm';
import { WishList } from './WishList';

export default function ToWish() {
    // Shared state to trigger list refresh when new wish is added
    const [refreshKey, setRefreshKey] = useState(0);

    const handleSuccess = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <div className="w-full h-full flex flex-col md:flex-row bg-[#1a1a1a] text-white overflow-hidden font-pixel">
            {/* Left Pane: Write Wish */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-gray-600 p-4 flex items-center justify-center relative bg-[url('/system/wallpapers/grid_pattern.png')] bg-repeat">
                <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                <div className="z-10 w-full max-w-md">
                    <WishForm onCancel={() => {}} onSuccess={handleSuccess} />
                </div>
            </div>

            {/* Right Pane: Wish List */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full bg-gray-200 text-black relative">
                <WishList key={refreshKey} onWriteClick={() => {}} />
            </div>
        </div>
    );
};
