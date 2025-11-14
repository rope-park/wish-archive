/**
 * 기본 리스트 컴포넌트
 * 
 * 그리드, 리스트, 메이슨리 레이아웃 지원
 */

import type { ReactNode } from 'react';

/**
 * BaseListProps
 * 
 * 기본 리스트 컴포넌트 props
 */
export interface BaseListProps {
    children: ReactNode;
    layout?: 'grid' | 'list' | 'masonry';
    cols?: { base?: number; sm?: number; md?: number; lg?: number; xl?: number };
    gap?: number;
    className?: string;
}

/**
 * BaseList 컴포넌트
 * @param param0 - BaseListProps
 * @returns JSX.Element
 */
export default function BaseList({
    children,
    layout = 'grid',
    cols = { base: 1, sm: 2, md: 3, lg: 4, xl: 5 },
    gap = 4,
    className = '',
}: BaseListProps) {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
        5: 'grid-cols-5',
        6: 'grid-cols-6',
    } as const;

    const layoutClass = {
        grid: 'grid',
        list: 'flex flex-col',
        masonry: 'columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5',
    }[layout];

    // 반응형 그리드 컬럼 클래스 생성
    const colsClass =
        layout == 'grid'
            ? [
                cols.base && gridCols[cols.base as keyof typeof gridCols],
                cols.sm && `sm:${gridCols[cols.sm as keyof typeof gridCols]}`,
                cols.md && `md:${gridCols[cols.md as keyof typeof gridCols]}`,
                cols.lg && `lg:${gridCols[cols.lg as keyof typeof gridCols]}`,
                cols.xl && `xl:${gridCols[cols.xl as keyof typeof gridCols]}`,
              ]
                  .filter(Boolean)
                  .join(' ')
            : '';

    return (
        <div className={`${layoutClass} ${colsClass} gap-${gap} ${className}`}>
            {children}
        </div>
    )
}