import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { EventType, Prisma } from '@prisma/client';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const month = searchParams.get('month'); // YYYY-MM 형식 또는 YYYY 형식
    const type = searchParams.get('type') as EventType | null;
    const search = searchParams.get('search');
    const isPreDebut = searchParams.get('isPreDebut'); // 'true' | 'false' | null

    // 쿼리 조건 구성
    const where: Prisma.EventWhereInput = {};

    // isPreDebut 필터
    if (isPreDebut !== null) {
      where.isPreDebut = isPreDebut === 'true';
    }

    // 월별/연도별 필터
    if (month) {
      // YYYY 형식인 경우 (연도만)
      if (month.length === 4) {
        const year = month;
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31T23:59:59.999Z`);

        where.date = {
          gte: startDate,
          lte: endDate,
        };
      } else {
        // YYYY-MM 형식인 경우
        const [year, monthNum] = month.split('-');
        const startDate = new Date(`${year}-${monthNum}-01`);
        const endDate = new Date(startDate);
        endDate.setMonth(endDate.getMonth() + 1);

        where.date = {
          gte: startDate,
          lt: endDate,
        };
      }
    }

    // 타입 필터
    if (type) {
      where.type = type;
    }

    // 검색 필터
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    // 데이터 조회
    const events = await prisma.event.findMany({
      where,
      orderBy: [
        { date: 'asc' },
      ],
    });

    // 날짜를 ISO 문자열로 변환
    const transformedEvents = events.map(event => ({
      ...event,
      date: event.date.toISOString(),
      startDate: event.startDate?.toISOString() || null,
      endDate: event.endDate?.toISOString() || null,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    }));

    return NextResponse.json(transformedEvents);
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}
