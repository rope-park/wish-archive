/**
 * API 라우트 예시 (템플릿)
 * 
 * 모든 API 라우트는 이 패턴을 따라 작성합니다.
 * - 표준화된 응답 형식
 * - CORS 헤더 설정
 * - 에러 처리
 * - 타입 안전성
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  successResponse,
  errorResponse,
  handleCorsOptions,
  API_ERROR_CODES,
} from '@/lib/api-response';

/**
 * OPTIONS 요청 핸들러 (CORS preflight)
 */
export async function OPTIONS(request: NextRequest) {
  return handleCorsOptions(request);
}

/**
 * GET 요청 핸들러
 * 
 * @example
 * GET /api/example?page=1&limit=20
 */
export async function GET(request: NextRequest) {
  try {
    // 1. 쿼리 파라미터 파싱
    const { searchParams } = new URL(request.url);
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 20;

    // 2. 유효성 검증
    if (page < 1 || limit < 1 || limit > 100) {
      return errorResponse(
        API_ERROR_CODES.VALIDATION_ERROR,
        'Invalid pagination parameters',
        400
      );
    }

    // 3. 데이터베이스 쿼리
    const skip = (page - 1) * limit;
    
    const [items, total] = await Promise.all([
      prisma.album.findMany({
        take: limit,
        skip,
        orderBy: { releaseDate: 'desc' },
        select: {
          id: true,
          title: true,
          coverImageUrl: true,
          releaseDate: true,
        },
      }),
      prisma.album.count(),
    ]);

    // 4. 성공 응답 반환
    return successResponse(items, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    // 5. 에러 처리
    console.error('[API ERROR]', error);
    
    return errorResponse(
      API_ERROR_CODES.INTERNAL_ERROR,
      'Failed to fetch data',
      500,
      process.env.NODE_ENV === 'development' ? error : undefined
    );
  }
}

/**
 * POST 요청 핸들러
 * 
 * @example
 * POST /api/example
 * Body: { "name": "example" }
 */
export async function POST(request: NextRequest) {
  try {
    // 1. 요청 본문 파싱
    const body = await request.json();

    // 2. 유효성 검증
    if (!body.name || typeof body.name !== 'string') {
      return errorResponse(
        API_ERROR_CODES.VALIDATION_ERROR,
        'Invalid request body',
        400
      );
    }

    // 3. 데이터베이스 작업
    const result = await prisma.album.create({
      data: {
        title: body.name,
        releaseDate: new Date(),
        type: 'SINGLE_ALBUM',
        // ... 기타 필드
      },
    });

    // 4. 성공 응답
    return successResponse(result);
  } catch (error) {
    console.error('[API ERROR]', error);
    
    return errorResponse(
      API_ERROR_CODES.INTERNAL_ERROR,
      'Failed to create resource',
      500
    );
  }
}
