/**
 * EmptyState 컴포넌트
 * 
 * - 데이터가 없을 때 보여줌
 * - 검색 결과가 없을 때 보여줌
 * - 에러 발생 시 보여줌
 */

'use client';

import { ReactNode } from 'react';
import { Button } from '../ui';

export interface EmptyStateProps {
  icon?: ReactNode;      // 아이콘 (이모지 또는 컴포넌트)
  title: string;         // 제목 
  description?: string;  // 설명
  action?: {             // 하단 액션 버튼
    label: string;
    onClick: () => void;
  };
  fullHeight?: boolean;
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  fullHeight = true,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center p-8 text-center
        border-2 border-t-gray-600 border-l-gray-600 border-r-white border-b-white
        shadow-[inset_1px_1px_0px_#000]

        ${fullHeight ? 'h-full flex-1' : 'h-auto py-12'}
        ${className}
      `}
    >
      {/* 아이콘 영역 */}
      <div className="mb-4 text-4xl select-none opacity-50 grayscale filter">
        {icon || '📂'} {/* 기본값은 빈 폴더 */}
      </div>

      {/* 텍스트 영역 */}
      <h3 className="mb-2 font-pixel text-lg font-bold text-gray-800">
        {title}
      </h3>
      
      {description && (
        <p className="mb-6 font-pixel text-xs text-gray-500 max-w-[240px] mx-auto leading-relaxed break-keep">
          {description}
        </p>
      )}

      {/* 액션 버튼 */}
      {action && (
        <Button 
          variant="default" 
          size="sm" 
          onClick={action.onClick}
          className="font-pixel min-w-[100px]"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

// 프리셋 (미리 정의된 상태들)
type NoResultProps = { query: string; onReset?: () => void };
type NoDataProps = { message?: string };
type ErrorProps = { message?: string; onRetry?: () => void };

EmptyState.NoResult = function NoResult({ query, onReset }: NoResultProps) {
  return (
    // 검색 결과 없음
    <EmptyState
      icon="🔍"
      title="검색 결과 없음"
      description={`'${query}'에 대한 결과를 찾을 수 없습니다.`}
      action={onReset ? { label: "검색 초기화", onClick: onReset } : undefined}
    />
  );
};

EmptyState.NoData = function NoData({ message = "표시할 데이터가 없습니다." }: NoDataProps) {
  return (
    // 데이터 없음 (기본)
    <EmptyState
      icon="📭"
      title="비어있음"
      description={message}
    />
  );
};

EmptyState.Error = function Error({ message, onRetry }: ErrorProps) {
  return (
    // 에러 발생
    <EmptyState
      icon="💣"
      title="오류 발생"
      description={message || "데이터를 불러오는 중 문제가 생겼습니다."}
      action={onRetry ? { label: "다시 시도", onClick: onRetry } : undefined}
    />
  );
};

EmptyState.Construction = function Construction() {
  return (
    // 공사중
    <EmptyState
      icon="🚧"
      title="공사중"
      description="페이지 준비 중입니다. 잠시 후 다시 방문해주세요."
    />
  );
};