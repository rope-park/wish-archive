/**
 * API 응답 표준화 유틸리티
 * 
 * 모든 API 라우트에서 일관된 응답 형식을 사용하도록 합니다.
 */

import { NextResponse } from 'next/server';

/**
 * API 응답 타입 정의
 */
export type ApiResponse<T> = {
  data: T | null;
  error: ApiError | null;
  meta?: ApiMeta;
};

export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

export type ApiMeta = {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
};

/**
 * 성공 응답 생성
 * @param data - 반환할 데이터
 * @param meta - 페이지네이션 등 메타데이터 (선택)
 * @returns NextResponse
 */
export function successResponse<T>(
  data: T,
  meta?: ApiMeta
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      data,
      error: null,
      ...(meta && { meta }),
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        // 캐싱 헤더 (필요시 조정)
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=300',
      },
    }
  );
}

/**
 * 에러 응답 생성
 * @param code - 에러 코드 (예: 'NOT_FOUND', 'INVALID_REQUEST')
 * @param message - 사용자에게 표시할 에러 메시지
 * @param status - HTTP 상태 코드 (기본: 500)
 * @param details - 추가 에러 정보 (선택)
 * @returns NextResponse
 */
export function errorResponse(
  code: string,
  message: string,
  status: number = 500,
  details?: unknown
): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      data: null,
      error: details
        ? { code, message, details }
        : { code, message },
    },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
}

/**
 * CORS 헤더 설정
 * @param allowedOrigins - 허용할 origin 목록 (기본: Vercel 배포 URL)
 */
export function getCorsHeaders(origin?: string | null): HeadersInit {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://nct-wish-os.vercel.app',
    process.env.NEXT_PUBLIC_APP_URL,
  ].filter(Boolean) as string[];

  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  return {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : allowedOrigins[0] || '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Max-Age': '86400', // 24시간
  };
}

/**
 * OPTIONS 요청 핸들러 (CORS preflight)
 * @param request - Request 객체
 * @returns NextResponse
 */
export function handleCorsOptions(request: Request): NextResponse {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

/**
 * API 에러 타입 정의 (재사용 가능한 에러 코드)
 */
export const API_ERROR_CODES = {
  // 400번대 클라이언트 에러
  INVALID_REQUEST: 'INVALID_REQUEST',
  MISSING_PARAMETER: 'MISSING_PARAMETER',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',

  // 500번대 서버 에러
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  DATABASE_ERROR: 'DATABASE_ERROR',
  EXTERNAL_API_ERROR: 'EXTERNAL_API_ERROR',
} as const;
