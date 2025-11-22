/**
 * WindowFrame 컴포넌트
 * 
 * 윈도우 스타일의 프레임을 제공하는 컴포넌트.
 * 타이틀 바, 컨텐츠 영역, 상태바로 구성.
 * 닫기 버튼 클릭 시 홈(바탕화면) 이동.
 */
'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface WindowFrameProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
}

export default function WindowFrame({ title, icon = '📂', children, className = '' }: WindowFrameProps) {
  const router = useRouter();

  return (
    // [1] 화면 중앙에 창 배치 (flex layout)
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4 animate-pop-in">
      
      {/* [2] 윈도우 창 본체 (젤리 프레임 스타일 적용) */}
      <div className={`relative w-full max-w-5xl bg-white/80 backdrop-blur-xl border-[3px] border-white/50 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col max-h-[85vh] ${className}`}>
        
        {/* [3] 윈도우 타이틀 바 (드래그 핸들 역할) */}
        <div className="bg-gradient-to-r from-wish-pink/20 to-wish-sky/20 border-b-2 border-white/50 p-3 flex items-center justify-between shrink-0 select-none">
          
          {/* 좌측: 제목 */}
          <div className="flex items-center gap-2 px-2">
            <span className="text-xl filter drop-shadow-sm">{icon}</span>
            <span className="font-bagel-fat-one text-gray-700 text-lg pt-1">{title}</span>
          </div>

          {/* 우측: 윈도우 제어 버튼 (장식용 + 닫기 기능) */}
          <div className="flex items-center gap-2">
            <button className="w-4 h-4 rounded-full bg-yellow-400 border border-yellow-600 hover:bg-yellow-300" title="최소화 (장식)" />
            <button className="w-4 h-4 rounded-full bg-green-400 border border-green-600 hover:bg-green-300" title="최대화 (장식)" />
            <button 
              onClick={() => router.push('/')} // 닫으면 홈(바탕화면)으로 이동
              className="w-4 h-4 rounded-full bg-red-400 border border-red-600 hover:bg-red-300 group flex items-center justify-center" 
              title="닫기"
            >
              <span className="hidden group-hover:block text-[10px] font-bold text-red-900 leading-none">×</span>
            </button>
          </div>
        </div>

        {/* [4] 컨텐츠 영역 (스크롤 가능) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar bg-white/40">
          {children}
        </div>

        {/* [5] 하단 상태바 (디테일) */}
        <div className="bg-white/60 border-t border-white/50 px-4 py-1 flex justify-between items-center text-[10px] font-press-start-2p text-gray-500 shrink-0">
          <span>{title}.exe</span>
          <span>READY</span>
        </div>

      </div>
    </div>
  );
}