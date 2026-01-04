/**
 * API: Get Lyrics for a Track
 * GET /api/lyrics/[trackId]
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackId: string }> }
) {
  try {
    const { trackId } = await params;

    const lyrics = await prisma.trackLyric.findMany({
      where: { trackId },
      orderBy: { language: 'asc' }
    });

    return NextResponse.json(lyrics);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lyrics' },
      { status: 500 }
    );
  }
}
