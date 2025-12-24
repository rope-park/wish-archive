/**
 * Group API Route
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/group
 * @returns 그룹 정보
 */
export async function GET() {
  try {
    // slug가 'nct-wish'인 그룹 정보 조회
    const group = await prisma.group.findUnique({
      where: { slug: 'nct-wish' },
      include: {
        externalLinks: {
          orderBy: { order: 'asc' }, // 외부 링크 정렬
        },
      },
    });

    if (!group) {
      return NextResponse.json({ error: 'Group not found' }, { status: 404 });
    }

    return NextResponse.json(group);
  } catch (error) {
    console.error('Failed to fetch group:', error);
    return NextResponse.json(
      { error: 'Failed to fetch group' },
      { status: 500 }
    );
  }
}