import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { PolaroidCard, EraCard } from '@/components/ui';
import { CSSProperties } from 'react';

interface RecentEvent {
  id: string;
  title: string;
  date: Date;
  description?: string | null;
  type?: string | null;
  era?: unknown;
  series?: unknown;
}

export default async function Home() {
  // 최신 앨범 5개
  const albums = await prisma.album.findMany({
    orderBy: { releaseDate: 'desc' },
    take: 5,
  });

  // 최근 이벤트
  const recentEvents = await prisma.event.findMany({
    orderBy: { date: 'desc' },
    take: 10,
    include: {
      era: true,
      series: true,
    },
  });

  // Era 데이터
  const eras = await prisma.era.findMany({
    orderBy: { startDate: 'asc' },
  });

  return (
    <div className="wish-container min-h-screen py-8">
      {/* 배경 장식 요소 - 둥둥 떠다니는 이모지 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 구름 */}
        <span className="absolute top-[10%] left-[5%] text-5xl animate-float opacity-40" style={{ animationDelay: '0s' }}>☁️</span>
        <span className="absolute top-[15%] right-[8%] text-4xl animate-float opacity-50" style={{ animationDelay: '1s' }}>☁️</span>
        
        {/* 별 */}
        <span className="absolute top-[20%] left-[15%] text-3xl animate-sparkle opacity-40" style={{ animationDelay: '0.5s' }}>⭐</span>
        <span className="absolute top-[50%] left-[10%] text-4xl animate-float opacity-30" style={{ animationDelay: '1.5s' }}>⭐</span>
        <span className="absolute bottom-[25%] right-[15%] text-3xl animate-sparkle opacity-50" style={{ animationDelay: '2.5s' }}>⭐</span>
        
        {/* 반짝이 */}
        <span className="absolute bottom-[20%] right-[10%] text-4xl animate-sparkle opacity-50" style={{ animationDelay: '0.5s' }}>✨</span>
        <span className="absolute top-[25%] right-[20%] text-3xl animate-float opacity-40" style={{ animationDelay: '0.8s' }}>✨</span>
        <span className="absolute bottom-[40%] left-[8%] text-3xl animate-sparkle opacity-40" style={{ animationDelay: '1.8s' }}>✨</span>
        
        {/* 하트 */}
        <span className="absolute top-[35%] left-[8%] text-4xl animate-float opacity-40" style={{ animationDelay: '1.2s' }}>💖</span>
        <span className="absolute bottom-[30%] left-[5%] text-3xl animate-sparkle opacity-35" style={{ animationDelay: '2s' }}>💚</span>
        <span className="absolute top-[60%] right-[12%] text-3xl animate-float opacity-40" style={{ animationDelay: '1.6s' }}>💙</span>
        
        {/* 작은 별 */}
        <span className="absolute top-[45%] right-[25%] text-2xl animate-sparkle opacity-30" style={{ animationDelay: '1.1s' }}>✦</span>
        <span className="absolute bottom-[50%] left-[20%] text-2xl animate-float opacity-30" style={{ animationDelay: '2.2s' }}>✦</span>
      </div>

      {/* 메인 컨텐츠 - z-10으로 배경 위에 */}
      <div className="relative z-10">
        {/* Hero Section - "WELCOME TO OUR WISH ARCHIVE" */}
        <section className="text-center mb-16 relative">
          {/* 메인 타이틀 */}
          <h1 className="font-bagel-fat-one text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-wish-pink leading-none mb-8 relative inline-block drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)]">
            <span className="block">
              WELCOME TO OUR
            </span>
            <span className="block mt-2">
              WISH ARCHIVE
            </span>

            {/* 타이틀 주변 장식 */}
            <span className="absolute -top-8 -left-10 sm:-left-12 text-5xl sm:text-6xl animate-float" style={{ animationDelay: '0.3s' }}>
              💚
            </span>
            <span className="absolute -bottom-10 -right-8 sm:-right-12 text-6xl sm:text-7xl animate-sparkle" style={{ animationDelay: '0.8s' }}>
              💖
            </span>
            <span className="absolute top-2 right-[15%] text-4xl animate-sparkle" style={{ animationDelay: '1.2s' }}>
              ✨
            </span>
            <span className="absolute -top-4 right-[5%] text-3xl animate-float" style={{ animationDelay: '0.5s' }}>
              ⭐
            </span>
          </h1>

          {/* NCT WISH 멤버 사진 - 젤리 프레임 */}
          <div className="jelly-frame w-full max-w-md mx-auto p-4 md:p-6 group hover:scale-105 transition-transform duration-300">
            {/* 실제 멤버 사진 (public/images/nct_wish_group.jpg 추가 필요) */}
            <div className="relative w-full aspect-4/3 rounded-3xl overflow-hidden border-2 border-white/50">
              <Image
                src="/placeholder-album.png"
                alt="NCT WISH Members"
                fill
                className="object-cover rounded-3xl"
              />
            </div>

            {/* 주변 작은 별 장식 */}
            <span className="absolute -top-3 -right-3 text-4xl animate-sparkle" style={{ animationDelay: '0.2s' }}>
              ✨
            </span>
            <span className="absolute bottom-5 left-5 text-2xl animate-float" style={{ animationDelay: '1s' }}>
              ⭐
            </span>
          </div>

          {/* CTA 버튼 */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <Link href="/timeline">
              <button className="pixel-btn px-8 py-3 text-base lg:text-lg bg-wish-green text-text-dark font-bold hover-lift">
                VIEW ALL EVENTS
              </button>
            </Link>
            <Link href="/eras">
              <button className="pixel-btn px-8 py-3 text-base lg:text-lg bg-wish-pink text-white font-bold hover-lift">
                EXPLORE ERAS
              </button>
            </Link>
          </div>
        </section>

        {/* 구분선 */}
        <div className="w-full h-px bg-gray-300 my-12"></div>

        {/* Recent Activities + Featured Eras 2단 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* 왼쪽: Recent Activities - 폴라로이드 스크랩북 */}
          <section className="relative">
            <h2 className="font-bagel-fat-one text-3xl lg:text-4xl text-text-dark mb-8 uppercase">
              RECENT ACTIVITIES
            </h2>

            {/* 폴라로이드 카드들 - absolute로 겹치게 배치 */}
            <div className="relative h-[500px] md:h-[600px]">
              {recentEvents.slice(0, 5).map((event: RecentEvent, idx: number) => (
                <PolaroidCard
                  key={event.id}
                  title={event.title}
                  date={event.date.toLocaleDateString('ko-KR')}
                  description={String(event.description ?? event.type ?? '')}
                  bgColor={
                    idx === 0 ? 'bg-wish-yellow/70' :
                    idx === 1 ? 'bg-wish-pink/70' :
                    idx === 2 ? 'bg-wish-sky/70' :
                    idx === 3 ? 'bg-wish-mint/70' :
                    'bg-wish-purple/70'
                  }
                  rotation={idx % 2 === 0 ? 'rotate-2' : '-rotate-3'}
                  translateX={idx === 0 ? '' : idx === 1 ? 'translate-x-12' : idx === 2 ? '-translate-x-8' : idx === 3 ? 'translate-x-16' : 'translate-x-4'}
                  translateY={idx === 0 ? '' : `translate-y-${idx * 20}`}
                  style={{
                    position: 'absolute',
                    top: `${idx * 60}px`,
                    left: `${idx * 20}px`,
                    zIndex: idx,
                  } as CSSProperties}
                  className="animate-pop-in"
                />
              ))}
            </div>
          </section>

          {/* 오른쪽: Featured Eras - 젤리 박스 카드 */}
          <section>
            <h2 className="font-bagel-fat-one text-3xl lg:text-4xl text-text-dark mb-8 uppercase">
              FEATURED ERAS
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <EraCard
                title="WISH ERA"
                period="(2024 - PRESENT)"
                concept="Debut & Color"
                bgColor="bg-wish-green/80"
                iconEmoji="✨"
                href="/eras"
              />
              <EraCard
                title="WISH ERA"
                period="(2024 - PRESENT)"
                concept="LOM FORMD"
                bgColor="bg-wish-sky/80"
                iconEmoji="✨"
                href="/eras"
              />
              <EraCard
                title="WISH ERA"
                period="(2024 - PRESENT)"
                concept="CONCERT"
                bgColor="bg-wish-mint/80"
                iconEmoji="✨"
                href="/eras"
              />
              <EraCard
                title="WISH ERA"
                period="(2024 - PRESENT)"
                concept="VIEW TIMELINE"
                bgColor="bg-wish-purple/80"
                iconEmoji="✨"
                href="/timeline"
              />
            </div>
          </section>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="text-center py-8 mt-12">
        <p className="font-press-start-2p text-xs text-text-dark/60">
          © 2025 NCT WISH Archive. Fan-made Project.
        </p>
      </footer>
    </div>
  );
}
