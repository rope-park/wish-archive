/**
 * 앨범 리포지토리
 * 
 * 앨범 관련 DB 쿼리 처리
 */

import 'server-only';
import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import { ReleaseType, Market, Language } from '@prisma/client';

/**
 * 릴리스 필터 타입
 * @typedef {Object} ReleaseFilter
 */
export type ReleaseFilter = {
    q?: string; // 검색어
    type?: ReleaseType | 'ALL'; // 릴리스 타입 필터
    market?: Market | 'ALL'; // 마켓 필터
    year?: number | 'ALL'; // 발매 연도 필터
    lang?: Language | 'ALL'; // 언어 필터
    isTitleOnly?: boolean; // 타이틀곡만 검색
};

/**
 * 릴리스 목록 조회
 * @param filter - 릴리스 필터
 * @param limit - 조회 개수
 * @param offset - 조회 시작 위치
 * @returns {Promise<{ albums: Album[]; total: number }>} - 릴리스 목록과 총 개수
 */
export async function listReleases(filter: ReleaseFilter, limit = 30, offset = 0) {
    const where: Prisma.AlbumWhereInput = {
        ...(filter.type && filter.type !== 'ALL' ? { type: filter.type } : {}),
        ...(filter.market && filter.market !== 'ALL' ? { market: filter.market } : {}),
        ...(filter.year && filter.year !== 'ALL'
            ? {
                releaseDate: {
                    gte: new Date(`${filter.year}-01-01`),
                    lt: new Date(`${filter.year + 1}-01-01`),
                },
            }
            : {}),
        ...(filter.q
            ? {
                OR: [
                    { title: { contains: filter.q, mode: 'insensitive' } },
                    { description: { contains: filter.q, mode: 'insensitive' } },
                ],
            }
        : {}),
    };

    const albums = await prisma.album.findMany({
        where,
        orderBy: { releaseDate: 'desc' },
        skip: offset,
        take: limit,
        include: {
            tracks: filter.isTitleOnly ? { where: { isTitle: true } } : true,
        },
    });

    const total = await prisma.album.count({ where });
    return { albums, total };
}

/**
 * 앨범 상세 조회
 * @param id - 앨범 ID
 * @returns {Promise<Album | null>} 앨범 상세 정보
 */
export async function getAlbumById(id: string) {
    return prisma.album.findUnique({
        where: { id },
        include: {
            tracks: { orderBy: { trackNumber: 'asc' } },
            events: {
                include: { event: true },
                orderBy: { event: { date: 'desc' } },
            },
            chartEntries: {
                include: { chart: true },
                orderBy: { weekStart: 'desc'} ,
            },
            certifications: true,
        },
    });
}