/**
 * EmptyState 컴포넌트
 * 
 * - 데이터가 없을 때 보여줌
 * - 검색 결과가 없을 때 보여줌
 * - 에러 발생 시 보여줌
 */
'use client';

import { ReactNode } from 'react';
import Button from '@/components/ui/Button';

export interface EmptyStateProps {
  icon?: ReactNode;      // 아이콘 (이모지 또는 컴포넌트)
  title: string;         // 제목 (예: 데이터가 없습니다)
  description?: string;  // 설명 (예: 검색 결과가 없어요)
  action?: {             // 하단 액션 버튼 (선택사항)
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export default function EmptyState({
  icon,
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center p-8 text-center
        bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg
        ${className}
      `}
    >
      {/* 아이콘 영역 */}
      <div className="mb-4 text-4xl animate-bounce">
        {icon || '📂'} {/* 기본값은 빈 폴더 */}
      </div>

      {/* 텍스트 영역 */}
      <h3 className="mb-2 font-pixel text-lg text-gray-900">
        {title}
      </h3>
      
      {description && (
        <p className="mb-6 font-body text-sm text-gray-500 max-w-[200px] mx-auto leading-relaxed">
          {description}
        </p>
      )}

      {/* 액션 버튼 */}
      {action && (
        <Button 
          variant="default" 
          size="sm" 
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

EmptyState.Presets = {
  // 검색 결과 없음
  NoResult: ({ query, onReset }: { query: string; onReset?: () => void }) => (
    <EmptyState
      icon="🔍"
      title="검색 결과 없음"
      description={`'${query}'에 대한 결과를 찾을 수 없습니다.`}
      action={onReset ? { label: "검색 초기화", onClick: onReset } : undefined}
    />
  ),

  // 데이터 없음 (기본)
  NoData: ({ message = "표시할 데이터가 없습니다." }: { message?: string }) => (
    <EmptyState
      icon="📭"
      title="비어있음"
      description={message}
    />
  ),

  // 에러 발생
  Error: ({ onRetry }: { onRetry?: () => void }) => (
    <EmptyState
      icon="💣"
      title="오류 발생"
      description="데이터를 불러오는 중 문제가 생겼습니다."
      action={onRetry ? { label: "다시 시도", onClick: onRetry } : undefined}
    />
  ),
};