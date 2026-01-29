/**
 * SEO & Metadata 설정
 *
 * - OpenGraph, Twitter Card 설정
 * - 검색 엔진 최적화를 위한 메타데이터
 */

import type { Metadata } from "next";

export const metadata: Metadata = {
  // 기본 메타데이터
  title: {
    default: "WISH Archive - NCT WISH 아카이브",
    template: "%s | WISH Archive",
  },
  description:
    "NCT WISH의 모든 활동을 기록하는 팬 아카이브. 음반, 영상, 사진, 일정 등을 한눈에 확인하세요.",
  keywords: [
    "NCT WISH",
    "WISH",
    "SM Entertainment",
    "K-POP",
    "KPOP",
    "아카이브",
    "NCTzen",
    "시온",
    "리쿠",
    "유우시",
    "재희",
    "료",
    "사쿠야",
    "SION",
    "RIKU",
    "YUSHI",
    "JAEHEE",
    "RYO",
    "SAKUYA",
  ],
  authors: [{ name: "WISH Archive Team" }],
  creator: "NCTzen",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://wish-archive.com",
    title: "WISH Archive - NCT WISH 아카이브",
    description:
      "NCT WISH의 모든 활동을 한곳에서. 데뷔부터 현재까지의 모든 기록.",
    siteName: "WISH Archive",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WISH Archive - NCT WISH 팬 아카이브",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "WISH Archive - NCT WISH 아카이브",
    description: "NCT WISH의 모든 활동을 한곳에서",
    images: ["/og-image.jpg"],
    creator: "@NCTsmtown_WISH",
  },

  // Icons
  icons: {
    icon: "/system/icons/favicon.ico?v=3",
    apple: "/system/icons/apple-touch-icon.png?v=3",
    shortcut: "/system/icons/favicon.ico?v=3",
  },

  // Manifest
  manifest: "/site.webmanifest",

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (필요 시 추가)
  // verification: {
  //   google: 'google-site-verification-code',
  //   yandex: 'yandex-verification-code',
  //   me: ['my-email@example.com'],
  // },

  // Category
  category: "entertainment",
};

// 페이지별 메타데이터 생성 헬퍼
export function generateMetadata(page: {
  title: string;
  description: string;
  image?: string;
  keywords?: string[];
}): Metadata {
  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    openGraph: {
      title: page.title,
      description: page.description,
      images: page.image ? [page.image] : undefined,
    },
    twitter: {
      title: page.title,
      description: page.description,
      images: page.image ? [page.image] : undefined,
    },
  };
}
