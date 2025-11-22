/**
 * 404 Not Found Page
 */

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="wish-container min-h-screen flex items-center justify-center py-8">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-[15%] left-[10%] text-6xl animate-float opacity-30">😢</span>
        <span className="absolute top-[25%] right-[15%] text-5xl animate-sparkle opacity-25" style={{ animationDelay: '0.5s' }}>💔</span>
        <span className="absolute bottom-[20%] left-[12%] text-4xl animate-float opacity-30" style={{ animationDelay: '1s' }}>🔍</span>
        <span className="absolute bottom-[35%] right-[10%] text-5xl animate-sparkle opacity-25" style={{ animationDelay: '1.5s' }}>❓</span>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 타이틀 */}
        <div className="mb-8">
          <h1 className="font-bagel-fat-one text-9xl md:text-[12rem] text-wish-pink mb-4 leading-none drop-shadow-[6px_6px_0px_rgba(0,0,0,0.2)]">
            404
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-6xl animate-wiggle">😵</span>
            <h2 className="font-bagel-fat-one text-4xl md:text-5xl text-text-dark">
              PAGE NOT FOUND
            </h2>
            <span className="text-6xl animate-wiggle" style={{ animationDelay: '0.2s' }}>🤔</span>
          </div>
        </div>

        {/* 설명 */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-4 border-black shadow-hard-xl p-8 mb-8">
          <p className="font-jua text-xl text-gray-700 mb-4">
            찾으시는 페이지가 없어요! 🙈
          </p>
          <p className="font-jua text-base text-gray-600">
            페이지 주소가 잘못되었거나 삭제된 페이지일 수 있어요.
          </p>
        </div>

        {/* 버튼들 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.back()}
            className="pixel-btn px-8 py-4 text-base bg-wish-sky text-white font-bold hover-lift"
          >
            ← GO BACK
          </button>
          <Link href="/">
            <button className="pixel-btn px-8 py-4 text-base bg-wish-green text-black font-bold hover-lift w-full sm:w-auto">
              🏠 GO HOME
            </button>
          </Link>
        </div>

        {/* 추천 링크 */}
        <div className="mt-12 p-6 bg-wish-lemon/20 rounded-2xl border-2 border-black">
          <p className="font-bagel-fat-one text-lg text-text-dark mb-4">
            이런 페이지는 어때요?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/timeline">
              <span className="inline-block px-4 py-2 bg-wish-sky text-white rounded-full text-sm font-press-start-2p shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
                🕓 TIMELINE
              </span>
            </Link>
            <Link href="/releases">
              <span className="inline-block px-4 py-2 bg-wish-green text-black rounded-full text-sm font-press-start-2p shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
                💿 RELEASES
              </span>
            </Link>
            <Link href="/members">
              <span className="inline-block px-4 py-2 bg-wish-pink text-white rounded-full text-sm font-press-start-2p shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
                👥 MEMBERS
              </span>
            </Link>
            <Link href="/eras">
              <span className="inline-block px-4 py-2 bg-wish-purple text-white rounded-full text-sm font-press-start-2p shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all cursor-pointer">
                ✨ ERAS
              </span>
            </Link>
          </div>
        </div>

        {/* 귀여운 캐릭터 */}
        <div className="mt-10 text-8xl animate-float">
          🌟
        </div>
      </div>
    </div>
  );
}
