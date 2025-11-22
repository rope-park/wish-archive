/**
 * Timeline API Route
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/timeline - 이벤트 목록 조회
 * @returns 이벤트 목록
 */
export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { date: 'desc' },
      include: {
        era: true,
        series: true,
        albums: {
          include: {
            album: true,
          },
        },
        members: {
          include: {
            member: true,
          },
        },
      },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('Failed to fetch timeline:', error);
    return NextResponse.json(
      { error: 'Failed to fetch timeline' },
      { status: 500 }
    );
  }
}
