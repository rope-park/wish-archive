/**
 * Members API Route
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/members - 멤버 목록 조회
 * @returns 멤버 목록
 */
export async function GET() {
  try {
    const members = await prisma.member.findMany({
      orderBy: { birthDate: 'asc' },
    });

    return NextResponse.json(members);
  } catch (error) {
    console.error('Failed to fetch members:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members' },
      { status: 500 }
    );
  }
}
