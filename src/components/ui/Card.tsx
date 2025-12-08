/**
 * Card 컴포넌트
 * 
 * - 디자인 시스템의 핵심 컨테이너
 * - 다양한 변형(variant) 제공: window, panel, glass, paper 등
 * - Compound Pattern 지원 (헤더, 바디, 푸터)
 */

import type { ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'window' | 'panel' | 'glass' | 'paper' | 'default';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  children: ReactNode;
}

export default function Card({
  variant = 'default',
  padding = 'md',
  hoverable = false,
  className = '',
  children,
  ...props
}: CardProps) {

  // 디자인 테마 매핑
  const variantClasses = {
    window: 'bg-gray-200 border border-white shadow-outset outline outline-1 outline-black rounded-none',

    panel: 'bg-white border border-gray-400 shadow-inset rounded-none',

    glass: 'bg-white/60 backdrop-blur-md border border-white/50 shadow-lg rounded-xl',

    paper: 'bg-white border border-black shadow-retro-hard rounded-sm',

    default: 'bg-white border border-gray-200 rounded-lg shadow-sm',
  };

  // 패딩 매핑
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        relative overflow-hidden transition-all duration-200
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverable ? 'hover:-translate-y-1 hover:shadow-lg cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}

// 서브 컴포넌트들 (선택 사항)
Card.Header = function CardHeader({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

Card.Body = function CardBody({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`flex-1 ${className}`}>{children}</div>;
};

Card.Footer = function CardFooter({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`}>{children}</div>;
};
