/**
 * Card 컴포넌트
 * 
 * 범용 카드 컴포넌트 (BaseCard의 대안)
 * - 다양한 변형 지원 (elevated, outlined, flat)
 * - 헤더, 푸터 영역 분리
 */

import type { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'flat';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: ReactNode;
}

export default function Card({
  variant = 'elevated',
  padding = 'md',
  hoverable = false,
  className = '',
  children,
  ...props
}: CardProps) {
  const variantClasses = {
    elevated: 'bg-white shadow-md',
    outlined: 'bg-white border border-gray-200',
    flat: 'bg-gray-50',
  };

  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  return (
    <div
      className={[
        'rounded-lg transition-all',
        variantClasses[variant],
        paddingClasses[padding],
        hoverable && 'hover:shadow-lg hover:scale-[1.02] cursor-pointer',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  );
}

// 서브 컴포넌트들
Card.Header = function CardHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-b border-gray-200 pb-3 mb-3 ${className}`}>
      {children}
    </div>
  );
};

Card.Body = function CardBody({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
};

Card.Footer = function CardFooter({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border-t border-gray-200 pt-3 mt-3 ${className}`}>
      {children}
    </div>
  );
};
