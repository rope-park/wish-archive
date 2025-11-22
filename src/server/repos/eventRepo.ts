import 'server-only';
/**
 * 타임라인(이벤트) 리포지토리
 * 
 * 타임라인 관련 DB 작업 처리
 */

import { prisma } from '@/lib/prisma';
import type { Prisma, EventType } from '@prisma/client';

export type TimelineFilter = {
    year?: number | 'ALL';
    month?: number | 'ALL';
    type?: EventType | 'ALL';
    q?: string;
}

export async function listTimeline(filter: TimelineFilter, limit = 50, offset = 0) {
    const where: Prisma.EventWhereInput = {
        ...(filter.type && filter.type !== 'ALL' ? { type: filter.type } : {}),
        ...(filter.year && filter.year !== 'ALL' ? { year: filter.year } : {}),
        ...(filter.month && filter.month !== 'ALL' ? { month: filter.month } : {}),
        ...(filter.q ? {
            OR: [
                { title: { contains: filter.q, mode: 'insensitive' } },
                { description: { contains: filter.q, mode: 'insensitive' } },
            ]
        } : {}),
    };
    const events = await prisma.event.findMany({
        where,
        orderBy: { date: 'desc' },
        take: limit,
        skip: offset,
        include: {
            era: true,
            series: true,
            albums: {
                include: {
                    album: true,
                },
            },
            members: {
                include: {
                    member: true,
                },
            },
        },
    });

    return events;
}