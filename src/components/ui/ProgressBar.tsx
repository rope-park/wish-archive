/**
 * ProgressBar 컴포넌트
 * 
 * 진행률 표시 바
 * - 퍼센트 기반
 */

export interface ProgressBarProps {
  value: number; // 0-100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'success' | 'warning' | 'danger';
  showLabel?: boolean;
  className?: string;
}

export default function ProgressBar({
  value,
  max = 100,
  size = 'md',
  variant = 'default',
  showLabel = false,
  className = '',
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };

  const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    danger: 'bg-red-600',
  };

  return (
    <div className={`w-full ${className}`}>
      {/* 레이블 */}
      {showLabel && (
        <div className="mb-1 flex items-center justify-between text-sm text-gray-600">
          <span>Progress</span>
          <span className="font-medium">{Math.round(percentage)}%</span>
        </div>
      )}

      {/* 프로그레스 바 */}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        className={`w-full overflow-hidden rounded-full bg-gray-200 ${sizeClasses[size]}`}
      >
        <div
          className={`h-full transition-all duration-300 ${variantClasses[variant]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
