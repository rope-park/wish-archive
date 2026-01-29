/**
 * API: 특정 Lore 상세 조회, 수정, 삭제
 * GET    /api/lore/[id] - Lore 상세 정보 조회
 * PATCH  /api/lore/[id] - Lore 수정
 * DELETE /api/lore/[id] - Lore 삭제
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface Params {
  params: {
    id: string;
  };
}

// GET - Lore 상세 조회
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    const lore = await prisma.lore.findUnique({
      where: { id },
      include: {
        images: {
          orderBy: { order: 'asc' }
        },
        videos: true
      }
    });
    
    if (!lore) {
      return NextResponse.json(
        { error: 'Lore not found' },
        { status: 404 }
      );
    }
    
    // 조회수 증가
    await prisma.lore.update({
      where: { id },
      data: { viewCount: { increment: 1 } }
    });
    
    return NextResponse.json(lore);
  } catch (error) {
    console.error('Error fetching lore:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lore' },
      { status: 500 }
    );
  }
}

// PATCH - Lore 수정
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const {
      title,
      type,
      status,
      era,
      description,
      solution,
      tags,
      thumbnailUrl,
      isApproved
    } = body;
    
    const updateData: Prisma.LoreUpdateInput = {};
    
    if (title !== undefined) updateData.title = title;
    if (type !== undefined) updateData.type = type;
    if (status !== undefined) updateData.status = status;
    if (era !== undefined) updateData.era = era;
    if (description !== undefined) updateData.description = description;
    if (solution !== undefined) updateData.solution = solution;
    if (tags !== undefined) updateData.tags = tags;
    if (thumbnailUrl !== undefined) updateData.thumbnailUrl = thumbnailUrl;
    if (isApproved !== undefined) updateData.isApproved = isApproved;
    
    // status가 SOLVED로 변경되면 solvedDate 기록
    if (status === 'SOLVED' && !updateData.solvedDate) {
      updateData.solvedDate = new Date();
    }
    
    const lore = await prisma.lore.update({
      where: { id },
      data: updateData,
      include: {
        images: true,
        videos: true
      }
    });
    
    return NextResponse.json(lore);
  } catch (error) {
    console.error('Error updating lore:', error);
    return NextResponse.json(
      { error: 'Failed to update lore' },
      { status: 500 }
    );
  }
}

// DELETE - Lore 삭제
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const { id } = params;
    
    await prisma.lore.delete({
      where: { id }
    });
    
    return NextResponse.json({ success: true, message: 'Lore deleted' });
  } catch (error) {
    console.error('Error deleting lore:', error);
    return NextResponse.json(
      { error: 'Failed to delete lore' },
      { status: 500 }
    );
  }
}
