// src/components/os/ProfileWidget.tsx
'use client';

import Image from 'next/image';

export default function ProfileWidget() {
  return (
    <div className="w-72 bg-white/30 backdrop-blur-xl border-2 border-white/50 rounded-3xl p-6 shadow-hard hover:scale-105 transition-transform duration-300 group cursor-default">
      <div className="flex items-center gap-4 mb-4">
        {/* 프로필 사진 자리 (임시로 이모지) */}
        <div className="w-16 h-16 bg-wish-green rounded-full border-4 border-white flex items-center justify-center text-3xl shadow-md">
          👽
        </div>
        <div>
          <h3 className="font-bagel-fat-one text-xl text-gray-800">WICHU_USER</h3>
          <p className="font-press-start-2p text-[10px] text-wish-pink animate-pulse">● ONLINE</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="bg-white/50 rounded-xl p-3 flex justify-between items-center">
          <span className="font-jua text-sm text-gray-600">오늘의 기분</span>
          <span className="text-xl hover:animate-spin cursor-pointer">🍀</span>
        </div>
        <div className="bg-white/50 rounded-xl p-3">
          <p className="font-jua text-sm text-gray-600 mb-1">최근 재생 목록</p>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-[10px]">💿</span>
            <span className="font-bold text-sm truncate">NASA - NCT WISH</span>
          </div>
        </div>
      </div>

      {/* 장식용 스티커 */}
      <div className="absolute -top-4 -right-4 text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 rotate-12">
        ⭐
      </div>
    </div>
  );
}