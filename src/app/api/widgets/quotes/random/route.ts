/**
 * Random Quote API Route
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GET /api/widgets/quotes/random
 * @returns {Promise<NextResponse>} HTTP 응답 객체
 */
export async function GET() {
  try {
    const count = await prisma.quote.count();

    if (count === 0) {
      return NextResponse.json({ error: 'No quotes found' }, { status: 404 });
    }

    const skip = Math.floor(Math.random() * count);

    // 랜덤으로 하나의 명언을 조회
    const randomQuote = await prisma.quote.findFirst({
      skip: skip,
      include: {
        member: {
          select: {
            stageName: true,
            characterUrl: true,
            colorCode: true,
          },
        },
      },
    });

    if (!randomQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    const responseData = {
      ...randomQuote,
      member: {
        ...randomQuote.member,
        characterUrl: randomQuote.member.characterUrl || null,
        colorCode: randomQuote.member.colorCode || null,
      },
    };
    return NextResponse.json(responseData);

  } catch (error) {
    console.error('Error fetching random quote:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}