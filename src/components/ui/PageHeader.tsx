/**
 * PageHeader Component
 * 
 * 페이지 상단 헤더 (일관된 디자인)
 */

'use client';

import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: string;
  color?: 'green' | 'sky' | 'pink' | 'purple' | 'lemon';
  children?: ReactNode;
}

const colorClasses = {
  green: 'text-wish-green',
  sky: 'text-wish-sky',
  pink: 'text-wish-pink',
  purple: 'text-wish-purple',
  lemon: 'text-wish-lemon',
};

export default function PageHeader({ 
  title, 
  subtitle, 
  icon = '✨', 
  color = 'pink',
  children 
}: PageHeaderProps) {
  return (
    <header className="mb-12 text-center relative z-10">
      <h1 className={`font-bagel-fat-one text-5xl md:text-6xl ${colorClasses[color]} mb-4 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.2)] relative inline-block`}>
        {title}
        <span className="absolute -top-6 -right-8 text-4xl animate-sparkle">{icon}</span>
        <span className="absolute -bottom-4 -left-6 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>💚</span>
      </h1>
      
      {subtitle && (
        <p className="text-lg font-jua text-text-dark mt-2">
          {subtitle}
        </p>
      )}
      
      {children && (
        <div className="mt-6">
          {children}
        </div>
      )}
    </header>
  );
}
