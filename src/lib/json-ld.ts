/**
 * JSON-LD 구조화된 데이터 생성
 * Google Search에서 rich results를 위한 구조화된 데이터
 */
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'WISH OS',
    alternateName: 'NCT WISH Archive',
    url: 'https://wish-archive.vercel.app',
    description: 'NCT WISH의 모든 순간을 담은 Windows 98 스타일 팬메이드 아카이브',
    inLanguage: 'ko-KR',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://wish-archive.vercel.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NCT WISH',
    alternateName: '엔시티 위시',
    url: 'https://wish-archive.vercel.app',
    logo: 'https://wish-archive.vercel.app/icons/icon-512x512.png',
    sameAs: [
      'https://www.instagram.com/nctwish_official/',
      'https://www.youtube.com/@NCTWISH',
      'https://twitter.com/NCTsmtown_WISH',
      'https://weverse.io/nctwish',
    ],
    foundingDate: '2024-02-21',
    member: [
      {
        '@type': 'Person',
        name: 'SION',
        alternateName: '시온',
      },
      {
        '@type': 'Person',
        name: 'RIKU',
        alternateName: '리쿠',
      },
      {
        '@type': 'Person',
        name: 'YUSHI',
        alternateName: '유우시',
      },
      {
        '@type': 'Person',
        name: 'JAEHEE',
        alternateName: '재희',
      },
      {
        '@type': 'Person',
        name: 'RYO',
        alternateName: '료',
      },
      {
        '@type': 'Person',
        name: 'SAKUYA',
        alternateName: '사쿠야',
      },
    ],
  };
}

export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
