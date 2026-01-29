/**
 * API: 랜덤 Lore 조회
 * GET /api/lore/random
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 전체 개수 조회
    const count = await prisma.lore.count({
      where: { isApproved: true }
    });
    
    if (count === 0) {
      return NextResponse.json(
        { error: 'No lores found' },
        { status: 404 }
      );
    }
    
    // 랜덤 인덱스 선택
    const randomIndex = Math.floor(Math.random() * count);
    
    // 랜덤 Lore 조회
    const lore = await prisma.lore.findMany({
      where: { isApproved: true },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        videos: true
      },
      skip: randomIndex,
      take: 1
    });
    
    return NextResponse.json(lore[0]);
  } catch (error) {
    console.error('Error fetching random lore:', error);
    return NextResponse.json(
      { error: 'Failed to fetch random lore' },
      { status: 500 }
    );
  }
}
