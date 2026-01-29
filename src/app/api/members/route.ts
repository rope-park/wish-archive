/**
 * Members API Route
 * 멤버 목록 정보를 제공합니다.
 */

import { NextRequest } from 'next/server';
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
 * GET /api/members - 멤버 목록 조회
 * @returns 멤버 목록
 */
export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { birthDate: 'asc' },
    });

    return successResponse(members);
  } catch (error) {
    console.error('[Members API] Failed to fetch:', error);
    
    return errorResponse(
      API_ERROR_CODES.DATABASE_ERROR,
      'Failed to fetch members',
      500,
      process.env.NODE_ENV === 'development' ? error : undefined
    );
  }
}
