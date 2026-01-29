/**
 * React ErrorBoundary 컴포넌트
 * 
 * 예상치 못한 에러를 catch하고 레트로 스타일 폴백 UI를 표시합니다.
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    
    // TODO: 에러 로깅 서비스 연동 (Sentry 등)
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error);
    // }
  }

  public render() {
    if (this.state.hasError) {
      // 커스텀 fallback이 있으면 사용
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 레트로 스타일 에러 화면
      return (
        <div className="fixed inset-0 flex items-center justify-center bg-brand-retro-navy p-4">
          <div className="bg-gray-200 border-4 border-gray-400 shadow-retro-hard max-w-md w-full">
            {/* 타이틀 바 */}
            <div className="bg-brand-retro-navy text-white px-2 py-1 flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span className="font-pixel text-sm">WISH OS - Application Error</span>
            </div>

            {/* 에러 내용 */}
            <div className="p-6 space-y-4">
              <div className="flex items-start gap-4">
                <div className="text-5xl">💥</div>
                <div className="flex-1">
                  <h2 className="font-pixel text-lg mb-2 text-gray-900">
                    앱에 문제가 발생했습니다
                  </h2>
                  <p className="font-gothic text-sm text-gray-700 leading-relaxed">
                    예상치 못한 오류로 인해 앱이 중단되었습니다.
                    <br />
                    페이지를 새로고침하거나 잠시 후 다시 시도해주세요.
                  </p>
                </div>
              </div>

              {/* 에러 상세 (개발 환경에서만) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 p-2 bg-white border border-gray-400 text-xs font-code">
                  <summary className="cursor-pointer font-bold mb-2">
                    에러 상세 정보 (개발 모드)
                  </summary>
                  <pre className="whitespace-pre-wrap text-red-600">
                    {this.state.error.toString()}
                    {'\n'}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}

              {/* 액션 버튼 */}
              <div className="flex gap-2 justify-end mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-gray-200 border-2 border-gray-400 shadow-outset hover:bg-gray-300 active:shadow-inset font-pixel text-sm"
                >
                  새로고침
                </button>
                <button
                  onClick={() => this.setState({ hasError: false, error: null })}
                  className="px-4 py-2 bg-gray-200 border-2 border-gray-400 shadow-outset hover:bg-gray-300 active:shadow-inset font-pixel text-sm"
                >
                  다시 시도
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
