/**
 * 기본 카드 컴포넌트
 * 
 * - 모든 카드 컴포넌트의 기본 구조 정의
 */

import type { ReactNode } from 'react';

/**
 * BaseCardProps 인터페이스
 * 
 * 자식 컴포넌트에서 레이아웃만 오버라이드
 */
export interface BaseCardProps {
    children: ReactNode; // 카드 내부 컨텐츠
    className?: string;  // 추가 클래스명
    onClick?: () => void; // 클릭 핸들러
    hoverable?: boolean; // 호버 효과 여부
    selected?: boolean; // 선택 상태 여부
}

export default function BaseCard({
    children,
    className = '',
    onClick,
    hoverable = false,
    selected = false,
}: BaseCardProps) {
    return (
        <div
            onClick={onClick}
            className={[
                'rounded-xl border bg-white p-4',
                hoverable && 'transition-all hover:shadow-md',
                onClick && 'cursor-pointer',
                selected && 'ring-2 ring-blue-500',
                className,
            ]
                .filter(Boolean)
                .join(' ')}
        >
            {children}
        </div>
    )
}

