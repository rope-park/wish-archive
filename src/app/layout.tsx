/**
 * Root 레이아웃 컴포넌트
 * 
 * 전체 애플리케이션의 공통 레이아웃 정의
 * taskbar 포함
 */
import type { Metadata } from "next";
import Taskbar from "@/components/common/Taskbar";
import FloatingDecorations from "@/components/common/FloatingDecorations";
import "./styles/globals.css"

/**
 * 메타데이터 설정
 */
export const metadata: Metadata = {
  title: {
    default: "Wish for Our Wish",
    template: "%s · Wish for Our Wish"
  },
  description: "NCT WISH 팬메이드 아카이브",
  keywords: ["NCT WISH", "NCT", "K-pop", "엔시티", "엔시티 위시", "아카이브", "타임라인", "음반", "멤버", "archive"],
  openGraph: {
    title: "Wish for Our Wish",
    description: "NCT WISH Fan-made Archive",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* TODO: 폰트 변경/추가 필요 */}
        <link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Bitcount+Prop+Double:wght@100..900&family=Bungee&family=Dela+Gothic+One&family=Freckle+Face&family=Jersey+10&family=Jua&family=Just+Me+Again+Down+Here&family=Kavivanar&family=Press+Start+2P&family=Racing+Sans+One&family=Rubik+Bubbles&family=Shrikhand&family=Special+Gothic+Expanded+One&family=Sriracha&display=swap" rel="stylesheet" />
      </head>

      <body className="relative overflow-hidden w-screen h-screen">
        {/* 배경화면 레이어 (맨 뒤) */}
        <div className="fixed inset-0 -z-20 bg-linear-to-br from-[#BEE9F9] via-[#E0C3FC] to-[#FFD1DC]">
          {/* TODO: 배경 이미지 또는 애니메이션 추가 가능 */}
        </div>

        {/* 떠다니는 장식들 (배경 바로 앞) */}
        <div className="fixed inset-0 -z-10">
          <FloatingDecorations />
        </div>

        {/* 메인 콘텐츠 영역 */}
        <main className="w-full h-full pb-16 overflow-y-auto overflow-x-hidden p-4 md:p-8">
          {children}
        </main>

        {/* 작업 표시줄 (맨 앞, 고정) */}
        <Taskbar />

      </body>
    </html>
  );
}
