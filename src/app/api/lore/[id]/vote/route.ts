/**
 * API: Lore 업보트/다운보트
 * POST /api/lore/[id]/vote
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { voteType, action } = body; // voteType: 'up' or 'down', action: 'vote' or 'unvote'
    
    if (voteType !== 'up' && voteType !== 'down') {
      return NextResponse.json(
        { error: 'Invalid vote type' },
        { status: 400 }
      );
    }

    if (action !== 'vote' && action !== 'unvote') {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    // action이 'vote'면 increment, 'unvote'면 decrement
    const incrementValue = action === 'vote' ? 1 : -1;
    
    const lore = await prisma.lore.update({
      where: { id },
      data: {
        upvotes: voteType === 'up' ? { increment: incrementValue } : undefined,
        downvotes: voteType === 'down' ? { increment: incrementValue } : undefined
      }
    });
    
    return NextResponse.json({
      success: true,
      upvotes: lore.upvotes,
      downvotes: lore.downvotes
    });
  } catch (error) {
    console.error('Error voting:', error);
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    );
  }
}
