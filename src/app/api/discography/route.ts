/**
 * Discography API Route
 * 앨범 목록과 수록곡 정보를 제공합니다.
 */

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import {
  errorResponse,
  handleCorsOptions,
  API_ERROR_CODES,
} from "@/lib/api-response";

/**
 * OPTIONS 요청 핸들러 (CORS preflight)
 */
export async function OPTIONS(request: NextRequest) {
  return handleCorsOptions(request);
}

/**
 * GET /api/discography
 * @returns 앨범 목록과 수록곡 정보
 */
export async function GET(request: NextRequest) {
  try {
    const albums = await prisma.album.findMany({
      include: {
        tracks: {
          orderBy: { trackNumber: "asc" },
        },
      },
      orderBy: {
        releaseDate: "desc",
      },
    });

    // Discography 컴포넌트가 배열을 직접 기대하므로 배열 반환
    return NextResponse.json(albums);
  } catch (error) {
    console.error("[Discography API] Failed to fetch:", error);

    return errorResponse(
      API_ERROR_CODES.DATABASE_ERROR,
      "Failed to fetch discography",
      500,
      process.env.NODE_ENV === "development" ? error : undefined,
    );
  }
}
