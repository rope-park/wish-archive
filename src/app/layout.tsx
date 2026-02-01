/**
 * Root Layout (WISH OS Shell)
 * * - 폰트 로드 및 변수 설정
 * - 전역 배경화면 (Gradient + Noise)
 * - 전역 태스크바 (Taskbar) 고정
 * - 메타데이터 설정
 */

import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { Taskbar } from "@/components/os"
import MiniPlayer from "@/components/os/MiniPlayer";
import CustomCursor from "@/components/ui/CustomCursor";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import EULAModal from "@/components/modals/EULAModal";
import { generateWebsiteJsonLd, generateOrganizationJsonLd } from "@/lib/json-ld";
import "./styles/globals.css";

// ----------------------------------------------------------------------
// 1. 로컬 폰트 설정
// ----------------------------------------------------------------------
// 픽셀 폰트 (제목, UI 요소)
const neodunggeunmo = localFont({
  src: './fonts/NeoDunggeunmoPro-Regular.ttf',
  display: 'swap',
  variable: '--font-pixel',
  preload: true, // 성능 최적화: 우선 로드
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
// 2. 메타데이터 및 뷰포트 설정
// ----------------------------------------------------------------------
export const metadata: Metadata = {
  title: "WISH OS | NCT WISH Archive",
  description: "NCT WISH의 모든 순간을 담은 Windows 98 스타일 팬메이드 아카이브",

  keywords: ["NCT WISH", "NCT", "엔시티 위시", "아카이브", "WISH OS"],
  icons: {
    icon: '/system/icons/favicon.ico?v=3',
    apple: '/system/icons/apple-touch-icon.png?v=3',
    shortcut: '/system/icons/favicon.ico?v=3',
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://wish-archive.vercel.app",
    title: "WISH OS | NCT WISH Archive",
    description: "NCT WISH의 모든 순간을 담은 Windows 98 스타일 팬메이드 아카이브",
    siteName: "WISH OS",
    images: [
      {
        url: "/system/icons/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "WISH OS - NCT WISH Archive",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "WISH OS",
    description: "NCT WISH Fan-made Archive",
    images: ["/system/icons/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // 확대 금지 (앱처럼 느낌)
  themeColor: "#BFDEF0", // 상단 상태바 색상 (OS 배경색에 맞추면 예쁨)
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
        {/* JSON-LD 구조화된 데이터 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteJsonLd()),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationJsonLd()),
          }}
        />

        {/* [A] 전역 배경화면 레이어 (Z-Index: -20) */}
        {/* layout에 두어야 페이지 이동 시에도 배경이 깜빡이지 않음 */}
        <div className="fixed inset-0 -z-20 bg-linear-to-br from-[#E0F7FA] via-[#bfdef0] to-[#A7C7E7]" />

        {/* [B] 노이즈 텍스처 레이어 (Z-Index: Highest) */}
        {/* 투명도를 낮추고 맨 위에 씌워서 아날로그 필름 입자 느낌 구현 (클릭 영향 X) */}
        <div 
          className="fixed inset-0 z-[99999] opacity-[0.02] pointer-events-none"
          style={{ 
            backgroundImage: "url('/system/wallpapers/noise.png')",
            backgroundRepeat: 'repeat'
          }}
        />

        {/* [C] 메인 콘텐츠 영역 */}
        {/* 하단 Taskbar 높이(50px)만큼 패딩을 주어 가려짐 방지 */}
        <main className="w-full h-full relative z-(--z-desktop)">
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <Analytics />
        </main>

        {/* [D] 전역 태스크바 (항상 최상위 고정) */}
        <Taskbar />

        {/* [E] 미니 플레이어 (전역 플로팅) */}
        <MiniPlayer />

        {/* [F] 커스텀 커서 (Deskotp Only) */}
        <CustomCursor />

        {/* [G] EULA 동의 모달 (첫 방문 시) */}
        <EULAModal />

      </body>
    </html>
  );
}