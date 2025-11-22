export default function GoodsPage() {
  return (
    <div className="wish-container min-h-screen py-8">
      {/* 배경 장식 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <span className="absolute top-[12%] right-[10%] text-5xl animate-float opacity-40">🛍️</span>
        <span className="absolute top-[35%] left-[8%] text-4xl animate-sparkle opacity-35" style={{ animationDelay: '1s' }}>🎁</span>
        <span className="absolute bottom-[25%] right-[15%] text-5xl animate-float opacity-40" style={{ animationDelay: '1.5s' }}>👜</span>
        <span className="absolute bottom-[40%] left-[12%] text-3xl animate-sparkle opacity-30" style={{ animationDelay: '2s' }}>✨</span>
      </div>

      {/* 헤더 */}
      <header className="mb-12 text-center relative z-10">
        <h1 className="font-bagel-fat-one text-5xl md:text-6xl text-wish-lemon mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative inline-block">
          GOODS
          <span className="absolute -top-6 -right-10 text-4xl animate-sparkle">🛍️</span>
          <span className="absolute -bottom-4 -left-8 text-3xl animate-float" style={{ animationDelay: '0.6s' }}>🎁</span>
        </h1>
        <p className="text-lg font-jua text-text-dark mt-2">
          NCT WISH 공식 굿즈 컴렉션
        </p>
      </header>

      {/* Coming Soon 섹션 */}
      <div className="relative z-10">
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border-4 border-black shadow-hard-xl p-16 text-center">
          <div className="text-8xl mb-6 animate-float">👜</div>
          <h2 className="font-bagel-fat-one text-4xl text-wish-lemon mb-4">
            COMING SOON!
          </h2>
          <p className="font-jua text-xl text-gray-600 mb-8">
            공식 굿즈 정보가 곳 업데이트될 예정입니다! 🎉
          </p>
          
          {/* 예상 컨텐츠 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-2xl mx-auto">
            <div className="bg-wish-pink/20 rounded-2xl p-6 border-2 border-black">
              <div className="text-4xl mb-2">🎫</div>
              <p className="font-press-start-2p text-[10px] text-gray-700">ALBUMS</p>
            </div>
            <div className="bg-wish-sky/20 rounded-2xl p-6 border-2 border-black">
              <div className="text-4xl mb-2">👚</div>
              <p className="font-press-start-2p text-[10px] text-gray-700">OFFICIAL</p>
            </div>
            <div className="bg-wish-purple/20 rounded-2xl p-6 border-2 border-black">
              <div className="text-4xl mb-2">🧸</div>
              <p className="font-press-start-2p text-[10px] text-gray-700">PLUSH</p>
            </div>
            <div className="bg-wish-green/20 rounded-2xl p-6 border-2 border-black">
              <div className="text-4xl mb-2">✨</div>
              <p className="font-press-start-2p text-[10px] text-gray-700">MORE</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}