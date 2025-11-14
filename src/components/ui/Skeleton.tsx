/**
 * Skeleton 컴포넌트
 * 
 * 로딩 중 플레이스홀더
 * - 다양한 형태 지원
 */

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  return (
    <div
      className={[
        'animate-pulse bg-gray-200',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      aria-hidden="true"
    />
  );
}

// 프리셋 스켈레톤들
Skeleton.Text = function SkeletonText({
  lines = 3,
  className = '',
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          variant="text"
          width={i === lines - 1 ? '80%' : '100%'}
        />
      ))}
    </div>
  );
};

Skeleton.Card = function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`space-y-3 rounded-lg border bg-white p-4 ${className}`}>
      <Skeleton variant="rectangular" height={200} />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="80%" />
    </div>
  );
};
