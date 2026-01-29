/**
 * API: Lore 목록 조회 및 생성
 * GET  /api/lore - 전체 Lore 조회 (필터링 지원)
 * POST /api/lore - 새로운 Lore 생성 (유저 제출)
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

// GET - Lore 목록 조회
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // 쿼리 파라미터
    const era = searchParams.get('era');
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const approved = searchParams.get('approved') !== 'false'; // 기본값: 승인된 것만
    
    // 필터 조건 구성
    const where: Prisma.LoreWhereInput = {};
    
    if (approved) {
      where.isApproved = true;
    }
    
    if (era && era !== 'all') {
      where.era = era;
    }
    
    if (type && type !== 'all') {
      where.type = type as Prisma.EnumLoreTypeFilter;
    }
    
    if (status && status !== 'all') {
      where.status = status as Prisma.EnumLoreStatusFilter;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } }
      ] as any;
    }
    
    const lores = await prisma.lore.findMany({
      where,
      include: {
        images: {
          orderBy: { order: 'asc' },
          take: 1 // 썸네일만
        },
        videos: {
          take: 1
        }
      },
      orderBy: [
        { status: 'asc' }, // UNSOLVED 먼저
        { upvotes: 'desc' },
        { createdAt: 'desc' }
      ]
    });
    
    return NextResponse.json({
      lores,
      total: lores.length
    });
  } catch (error) {
    console.error('Error fetching lores:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lores' },
      { status: 500 }
    );
  }
}

// POST - 새로운 Lore 생성 (유저 제출)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      title,
      type,
      era,
      description,
      submittedBy,
      tags = [],
      thumbnailUrl
    } = body;
    
    // 필수 필드 검증
    if (!title || !type || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // 유저 제출 Lore 생성 (관리자 승인 대기 상태)
    const lore = await prisma.lore.create({
      data: {
        title,
        type,
        era,
        description,
        submittedBy,
        tags,
        thumbnailUrl,
        status: 'UNSOLVED', // 기본값
        isUserSubmitted: true,
        isApproved: false // 관리자 승인 필요
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Your theory has been submitted for review! 🕵️',
      lore
    }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating lore:', error);
    return NextResponse.json(
      { error: 'Failed to create lore' },
      { status: 500 }
    );
  }
}
