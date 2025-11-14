/**
 * Pagination 컴포넌트
 * 
 * 페이지네이션 네비게이션
 * - 이전/다음 버튼
 * - 페이지 번호 표시
 */

'use client';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className = '',
}: PaginationProps) {
  // 표시할 페이지 범위 계산
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

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1 ${className}`}
    >
      {/* 이전 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={[
          'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          currentPage === 1
            ? 'cursor-not-allowed text-gray-400'
            : 'text-gray-700 hover:bg-gray-100',
        ].join(' ')}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* 페이지 번호 */}
      {pages.map((page, idx) =>
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className={[
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-blue-500',
              currentPage === page
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100',
            ].join(' ')}
          >
            {page}
          </button>
        )
      )}

      {/* 다음 버튼 */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={[
          'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-blue-500',
          currentPage === totalPages
            ? 'cursor-not-allowed text-gray-400'
            : 'text-gray-700 hover:bg-gray-100',
        ].join(' ')}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </nav>
  );
}
