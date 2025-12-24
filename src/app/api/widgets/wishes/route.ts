/**
 * WishJarWidget API Route
 * 
 * GET: 소원 데이터 목록 (랜덤 5개)
 * POST: 소원 남기기
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET api/widgets/wishes
 * @returns 소원 데이터 목록 (랜덤 5개)
 */
export async function GET() {
  try {
    // 최근 50개 중 랜덤 10개 (또는 전체 중 랜덤)
    const wishes = await prisma.wish.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    });
    
    // 셔플
    const shuffled = wishes.sort(() => 0.5 - Math.random()).slice(0, 5);
    
    return NextResponse.json(shuffled);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

/**
 * POST api/widgets/wishes
 * @param req Request body: { content: string, nickname?: string, color?: string }
 * @returns 생성된 소원 데이터
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { content, nickname, color } = body;

    if (!content) return NextResponse.json({ error: 'Content required' }, { status: 400 });

    const newWish = await prisma.wish.create({
      data: {
        content,
        nickname: nickname || '익명의 시즈니',
        color: color || 'yellow',
        // 위치는 랜덤으로 생성 (화면에 흩뿌리기 위해)
        posX: Math.random() * 80 + 10, // 10~90%
        posY: Math.random() * 80 + 10,
        rotation: Math.random() * 30 - 15, // -15 ~ 15도
      },
    });

    return NextResponse.json(newWish);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create wish' }, { status: 500 });
  }
}