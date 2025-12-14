import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const count = await prisma.quote.count();

    if (count === 0) {
      return NextResponse.json({ error: 'No quotes found' }, { status: 404 });
    }

    const skip = Math.floor(Math.random() * count);

    const randomQuote = await prisma.quote.findFirst({
      skip: skip,
      include: {
        member: {
          select: {
            stageName: true,
            profileImageUrl: true, // 프로필 사진 (없으면 아이콘 대체)
            iconUrl: true,         // 아이콘
            colorCode: true,
          },
        },
      },
    });

    if (!randomQuote) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 });
    }

    return NextResponse.json(randomQuote);

  } catch (error) {
    console.error('Error fetching random quote:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}