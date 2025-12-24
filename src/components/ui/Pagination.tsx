/**
 * Pagination 컴포넌트
 * 
 * - 페이지 네비게이션
 * - 최대 표시 페이지 수 조절 가능
 */

'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number; // 한 번에 보여줄 페이지 번호 개수
  className?: string;
  showFirstLast?: boolean; // 처음/끝 페이지 버튼 표시 여부
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
  className = '',
  showFirstLast = true,
}: PaginationProps) {

  const [visibleCount, setVisibleCount] = useState(maxVisible);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(Math.min(3, maxVisible)); // 모바일에서는 최대 3개
      } else {
        setVisibleCount(maxVisible);
      }
    };

    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [maxVisible]);

  // 표시할 페이지 번호 계산 로직
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= visibleCount) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(visibleCount / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, currentPage + halfVisible);

    if (currentPage <= halfVisible) {
      end = visibleCount;
    }

    if (currentPage > totalPages - halfVisible) {
      start = totalPages - visibleCount + 1;
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

  // 페이지가 1개뿐이면 숨김
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1 ${className}`}
    >
      {/* 맨 처음으로 (<<) */}
      {showFirstLast && (
        <Button
          size="sm"
          disabled={currentPage === 1}
          onClick={() => onPageChange(1)}
          aria-label="First page"
          className="w-8 px-0 font-pixel text-xs hidden sm:flex"
        >
          {'<<'}
        </Button>
      )}

      {/* 이전 (◀) */}
      <Button
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className="w-8 px-0 font-pixel text-xs"
      >
        ◀
      </Button>

      {/* 페이지 번호들 */}
      {pages.map((page, idx) =>
        page === '...' ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-1 font-pixel text-xs text-gray-500 select-none"
          >
            ...
          </span>
        ) : (
          <Button
            key={page}
            size="sm"
            isActive={currentPage === page}
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? 'page' : undefined}
            className={`
              w-8 px-0 font-pixel
              ${currentPage === page ? 'font-bold text-brand-retro-navy' : 'text-gray-900'}
            `}
          >
            {page}
          </Button>
        )
      )}

      {/* 다음 (▶) */}
      <Button
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className="w-8 px-0 font-pixel text-xs"
      >
        ▶
      </Button>

      {/* 맨 끝으로 (>>) */}
      {showFirstLast && (
        <Button
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(totalPages)}
          aria-label="Last page"
          className="w-8 px-0 font-pixel text-xs hidden sm:flex"
        >
          {'>>'}
        </Button>
      )}
    </nav>
  );
}