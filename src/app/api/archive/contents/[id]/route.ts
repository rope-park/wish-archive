// src/app/api/archive/contents/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const content = await prisma.content.findUnique({
      where: { id },
      include: {
        event: {
          select: {
            id: true,
            title: true,
            type: true,
            date: true,
            era: { select: { name: true } },
            _count: { select: { galleryPosts: true } }
          }
        },
        album: { select: { title: true } },
        members: {
          include: { member: { select: { stageName: true, colorCode: true, iconUrl: true } } }
        },
        externalLinks: true, // 관련 링크 (원본, 기사 등)
        program: { select: { name: true } }
      }
    });

    if (!content) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error('Content Detail API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}