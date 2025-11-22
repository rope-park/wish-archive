/**
 * Root 레이아웃 컴포넌트
 * 
 * 전체 애플리케이션의 공통 레이아웃 정의
 * 헤더, 푸터 포함
 */
import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
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
        <link href="https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Bitcount+Prop+Double:wght@100..900&family=Bungee&family=Dela+Gothic+One&family=Freckle+Face&family=Jersey+10&family=Jua&family=Just+Me+Again+Down+Here&family=Kavivanar&family=Press+Start+2P&family=Racing+Sans+One&family=Rubik+Bubbles&family=Shrikhand&family=Special+Gothic+Expanded+One&family=Sriracha&display=swap" rel="stylesheet" />
      </head>
      <body>
        {/* 상단 공통 헤더 */}
        <Header />
        
        {/* 메인 컨텐츠 영역 */}
        <main className="min-h-screen">
          {children}
        </main>
        
        {/* 하단 푸터 */}
        <Footer />
      </body>
    </html>
  );
}
