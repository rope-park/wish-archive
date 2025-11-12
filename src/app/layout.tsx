import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import "./styles/globals.css"

export const metadata: Metadata = {
  title: "NCT WISH Archive",
  description: "NCT WISH 활동 아카이브 (Fan-made)",
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
        <footer className="border-t mt-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-500">
            © {new Date().getFullYear()} NCT WISH Archive. Fan-made, unofficial.
          </div>
        </footer>
      </body>
    </html>
  );
}
