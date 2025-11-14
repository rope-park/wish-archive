import 'server-only';
/**
 * 타임라인(이벤트) 리포지토리
 * 
 * 타임라인 관련 DB 작업 처리
 */

import { prisma } from '@/lib/prisma';
import { EventType } from '@prisma/client';

export type TimelineFilter = {
    year?: number | 'ALL';
    month?: number | 'ALL';
    type?: EventType | 'ALL';
    q?: string;
}

export async function listTimeline(filter: TimelineFilter, limit = 50, offset = 0) {
    