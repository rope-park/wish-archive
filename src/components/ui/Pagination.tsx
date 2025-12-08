/**
 * Pagination 컴포넌트
 * 
 * - 페이지 네비게이션
 * - 최대 표시 페이지 수 조절 가능
 */
'use client';

import Button from '@/components/ui/Button';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number; // 한 번에 보여줄 페이지 번호 개수
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className = '',
}: PaginationProps) {
  
  // 표시할 페이지 번호 계산 로직
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisible / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      end = maxVisible;
    }

    if (currentPage > totalPages - halfVisible) {
      start = totalPages - maxVisible + 1;
    }

    const pages: (number | '...')[] = [];

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  // 페이지가 1개뿐이면 숨김 (선택사항)
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1 ${className}`}
    >
      {/* 이전 버튼 */}
      <Button
        size="sm"
        variant="default"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="w-8 px-0 font-pixel"
      >
        ◀
      </Button>

      {/* 페이지 번호들 */}
      {pages.map((page, idx) =>
        page === '...' ? (
          // 생략 표시 (...)
          <span 
            key={`ellipsis-${idx}`} 
            className="px-1 font-pixel text-xs text-gray-500 select-none"
          >
            ...
          </span>
        ) : (
          // 숫자 버튼
          <Button
            key={page}
            size="sm"
            isActive={currentPage === page} 
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`
              w-8 px-0 font-pixel
              ${currentPage === page ? 'font-bold text-brand-deep' : 'text-gray-900'}
            `}
          >
            {page}
          </Button>
        )
      )}

      {/* 다음 버튼 */}
      <Button
        size="sm"
        variant="default"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="w-8 px-0 font-pixel"
      >
        ▶
      </Button>
    </nav>
  );
}