/**
 * Discography API Route
 */

import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * GET /api/discography
 * @returns 앨범 목록과 수록곡 정보
 */
export async function GET() {
  try {
    const albums = await prisma.album.findMany({
      include: {
        tracks: {
          orderBy: { trackNumber: 'asc' }, // 트랙 순서대로
        },
      },
      orderBy: {
        releaseDate: 'desc',
      },
    });

    return NextResponse.json(albums);
  } catch (error) {
    console.error('Failed to fetch discography:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}