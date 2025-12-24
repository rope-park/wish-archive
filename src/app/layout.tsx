/**
 * Root Layout (WISH OS Shell)
 * * - 폰트 로드 및 변수 설정
 * - 전역 배경화면 (Gradient + Noise)
 * - 전역 태스크바 (Taskbar) 고정
 * - 메타데이터 설정
 */

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Taskbar } from "@/components/os"
import "./styles/globals.css";

// ----------------------------------------------------------------------
// 1. 로컬 폰트 설정
// ----------------------------------------------------------------------
// 픽셀 폰트 (제목, UI 요소)
const neodunggeunmo = localFont({
  src: './fonts/NeoDunggeunmoPro-Regular.ttf',
  display: 'swap',
  variable: '--font-pixel',
});

// 고딕 폰트 (본문, 가독성 필요 시)
const pyeongjin = localFont({
  src: [
    { path: './fonts/PyeojinGothic-Light.ttf', weight: '300', style: 'normal' },
    { path: './fonts/PyeojinGothic-Regular.ttf', weight: '400', style: 'normal' },
    { path: './fonts/PyeojinGothic-Medium.ttf', weight: '500', style: 'normal' },
    { path: './fonts/PyeojinGothic-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: './fonts/PyeojinGothic-Bold.ttf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-gothic',
});

// 손글씨 폰트 (메모장, 폴라로이드)
const ssshinbi = localFont({
  src: './fonts/SSShinb7Regular.ttf',
  display: 'swap',
  variable: '--font-hand',
});

// 코드 폰트 (터미널 등)
const d2coding = localFont({
  src: './fonts/D2Coding.ttf',
  display: 'swap',
  variable: '--font-code',
});

// ----------------------------------------------------------------------
// 2. 메타데이터 설정
// ----------------------------------------------------------------------
export const metadata: Metadata = {
  title: {
    default: "Wish for Our Wish",
    template: "%s · WISH OS"
  },
  description: "NCT WISH Fan-made Archive & OS",
  keywords: ["NCT WISH", "NCT", "엔시티 위시", "아카이브", "WISH OS"],
  icons: {
    icon: '/system/icons/favicon.ico', 
  },
  openGraph: {
    title: "Wish for Our Wish",
    description: "NCT WISH Fan-made Archive",
    type: "website",
    locale: "ko_KR",
  },
};

// ----------------------------------------------------------------------
// 3. Root Layout 컴포넌트
// ----------------------------------------------------------------------
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html 
      lang="ko" 
      // 폰트 변수들을 최상위에 주입
      className={`${neodunggeunmo.variable} ${pyeongjin.variable} ${ssshinbi.variable} ${d2coding.variable}`}
    >
      <body className="relative w-screen h-screen overflow-hidden select-none bg-[#bfdef0]">
        
        {/* [A] 전역 배경화면 레이어 (Z-Index: -20) */}
        {/* layout에 두어야 페이지 이동 시에도 배경이 깜빡이지 않음 */}
        <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#E0F7FA] via-[#bfdef0] to-[#A7C7E7]" />
        
        {/* [B] 노이즈 텍스처 레이어 (Z-Index: -10) */}
        <div className="fixed inset-0 -z-10 opacity-30 bg-noise-texture mix-blend-overlay pointer-events-none" />

        {/* [C] 메인 콘텐츠 영역 */}
        {/* 하단 Taskbar 높이(50px)만큼 패딩을 주어 가려짐 방지 */}
        <main className="w-full h-full relative z-[var(--z-desktop)]">
          {children}
        </main>

        {/* [D] 전역 태스크바 (항상 최상위 고정) */}
        <Taskbar />

      </body>
    </html>
  );
}