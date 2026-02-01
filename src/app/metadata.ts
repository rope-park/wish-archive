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
    default: "WISH OS - NCT WISH 아카이브",
    template: "%s | WISH OS",
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
  authors: [{ name: "rope_park", url: "https://github.com/rope-park/wish-archive" }],
  creator: "rope_park",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://nct-wish-os.vercel.app",
    title: "WISH OS - NCT WISH 아카이브",
    description:
      "System Loading... Click to Start.",
    siteName: "WISH OS",
    images: [
      {
        url: "/system/icons/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "WISH OS - NCT WISH 팬 아카이브",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "WISH OS - NCT WISH 아카이브",
    description: "System Loading... Click to Start.",
    images: ["/system/icons/opengraph-image.png"],
    creator: "@rope_park",
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
