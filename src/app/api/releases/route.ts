/**
 * Releases API Route
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/releases - 음반 목록 조회
 * @returns 음반 목록
 */
export async function GET() {
  try {
    const albums = await prisma.album.findMany({
      orderBy: { releaseDate: 'desc' },
      include: {
        group: true,
        tracks: {
          orderBy: { trackNumber: 'asc' },
        },
      },
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error('Failed to fetch releases:', error);
    return NextResponse.json(
      { error: 'Failed to fetch releases' },
      { status: 500 }
    );
  }
}
