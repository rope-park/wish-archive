/**
 * LoadingSpinner Component
 * 
 * WISH POP 스타일 로딩 스피너
 */

'use client';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

export default function LoadingSpinner({ size = 'md', message }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-4',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      {/* 회전하는 별 */}
      <div className="relative">
        <div className={`${sizeClasses[size]} rounded-full border-wish-green border-t-wish-pink animate-spin`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl animate-pulse">⭐</span>
        </div>
      </div>
      
      {message && (
        <p className="font-jua text-lg text-gray-600 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
