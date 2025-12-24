/**
 * Card 컴포넌트
 * 
 * - 디자인 시스템의 핵심 컨테이너
 * - 다양한 변형(variant) 제공: window, panel, glass, paper 등
 * - Compound Pattern 지원 (헤더, 바디, 푸터)
 */

'use client';

import { forwardRef, ReactNode, HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'window' | 'panel' | 'glass' | 'paper' | 'default';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverable?: boolean;
  fullHeight?: boolean;
  children: ReactNode;
}

const CardMain = forwardRef<HTMLDivElement, CardProps>(
  ({
    variant = 'default',
    padding = 'md',
    hoverable = false,
    fullHeight = false,
    className = '',
    children,
    ...props
  }, ref) => {

    // 디자인 테마 매핑
    const variantClasses = {
      window: `
        bg-gray-200
        border-2 border-t-white border-l-white border-r-black border-b-black
        shadow-[1px_1px_0px_0px_rgba(0,0,0,0.5)]
      `,

      panel: `
        bg-white
        border-2 border-t-gray-600 border-l-gray-600 border-r-white border-b-white
      `,

      glass: `
        bg-white/60 backdrop-blur-md
        border border-white/50
        shadow-lg rounded-xl
      `,

      paper: `
        bg-white
        border border-black
        shadow-retro-hard rounded-sm
      `,

      default: `
        bg-white
        border border-gray-200
        rounded-lg shadow-sm
      `,
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
        ref={ref}
        className={`
          relative flex flex-col
          transition-all duration-200

          ${variantClasses[variant]}
          ${paddingClasses[padding]}

          ${fullHeight ? 'h-full' : 'h-auto'}
          ${hoverable ? 'hover:-translate-y-1 hover:shadow-lg cursor-pointer' : ''}
    
          ${className}
      `}
        {...props}
      >
        {children}
      </div>
    );
  }
);

// 서브 컴포넌트들
const CardHeader = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`mb-4 flex items-center justify-between shrink-0 ${className}`}>
      {children}
    </div>
  );
};

// Body: 메인 컨텐츠 영역 (남은 공간 모두 차지)
const CardBody = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`flex-1 min-h-0 overflow-auto ${className}`}>
      {children}
    </div>
  );
};

// Footer: 하단 버튼 등이 위치하는 영역
const CardFooter = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 shrink-0 ${className}`}>
      {children}
    </div>
  );
};

// 메인 컴포넌트에 서브 컴포넌트 할당
const Card = Object.assign(CardMain, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
});

CardMain.displayName = 'CardMain';

export default Card;