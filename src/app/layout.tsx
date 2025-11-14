import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import "./styles/globals.css"

export const metadata: Metadata = {
  title: {
    default: "NCT WISH Archive",
    template: "%s · NCT WISH Archive"
  },
  description: "NCT WISH의 모든 활동을 기록하는 아카이브 - 타임라인, 음반, 멤버, 공연 정보",
  keywords: ["NCT WISH", "NCT", "K-pop", "아카이브", "타임라인", "음반", "멤버"],
  openGraph: {
    title: "NCT WISH Archive",
    description: "NCT WISH의 모든 활동을 기록하는 아카이브",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-gray-900">
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
