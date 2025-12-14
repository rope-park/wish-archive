/**
 * seed 공통 유틸리티
 */

import type { PrismaClient, LinkType } from '@prisma/client';

// 슬러그 생성 함수
export function slugify(text: string): string {
    return text
        .toString()
        .normalize('NFKD') // 유니코드 정규화
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// upsert 헬퍼 (존재하면 업데이트, 없으면 생성)
export async function upsertRecord<T>(
    model: {
        upsert: (args: { where: Record<string, unknown>; update: Record<string, unknown>; create: Record<string, unknown> }) => Promise<T>;
    },
    where: Record<string, unknown>,
    date: Record<string, unknown>
): Promise<T> {
    return model.upsert({
        where,
        update: date,
        create: date,
    });
}

// batch upsert 헬퍼 (여러 레코드 효율적 처리)
export async function batchUpsertRecord<T>(
    model: {
        upsert: (args: { where: Record<string, unknown>; update: Record<string, unknown>; create: Record<string, unknown> }) => Promise<T>;
    },
    records: Array<{ where: Record<string, unknown>; data: Record<string, unknown> }>,
    batchSize = 10
): Promise<T[]> {
    const results: T[] = [];

    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        const batchResults = await Promise.all(
            batch.map(({ where, data }) =>
                model.upsert({
                    where,
                    update: data,
                    create: data,
                })
            )
        );
        results.push(...batchResults);
    }
    return results;
}

// 안전한 외부 링크 생성
export async function createExternalLinks(
    prisma: PrismaClient,
    parentId: string,
    parentType: 'groupId' | 'memberId' | 'albumId' | 'trackId',
    links: Array<{
        type: LinkType;
        title?: string;
        url: string;
        order: number;
    }>
) {
    for (const linkData of links) {
        await prisma.externalLink.upsert({
            where: {
                id: `${parentId}-${linkData.url}`,
            },
            update: {
                order: linkData.order,
            },
            create: {
                ...linkData,
                [parentType]: parentId,
                isOfficial: true,
            },
        }).catch(async () => {
            const existing = await prisma.externalLink.findFirst({
                where: {
                    url: linkData.url,
                    [parentType]: parentId,
                },
            })

            if (existing) {
                return prisma.externalLink.update({
                    where: { id: existing.id },
                    data: { order: linkData.order },
                })
            } else {
                return prisma.externalLink.create({
                    data: {
                        ...linkData,
                        [parentType]: parentId,
                        isOfficial: true,
                    },
                })
            }
        })
    }
}

// 로깅 헬퍼
export const logger = {
    info: (msg: string) => console.log(`[INFO]: ${msg}`),
    success: (msg: string) => console.log(`[SUCCESS]: ${msg}`),
    warning: (msg: string) => console.warn(`[WARNING]: ${msg}`),
    error: (msg: string) => console.error(`[ERROR]: ${msg}`),
    debug: (msg: string) => {
        if (process.env.DEBUG === 'true') {
            console.log(`[DEBUG]: ${msg}`);
        }
    },
}

// 날짜 유효성 검증
export function validateDate(date: Date | string): Date {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
        throw new Error(`Invalid date: ${date}`);
    }
    return d;
}

// 필수 환경 변수 확인
export function checkEnvVars(vars: string[]) {
    const missing = vars.filter((v) => !process.env[v]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

// 시드 진행률 표시
export class ProgressTracker {
    private current = 0;
    private total: number;
    private name: string;

    constructor(name: string, total: number) {
        this.name = name;
        this.total = total;
    }

    increment() {
        this.current++;
        if (this.current % 10 === 0 || this.current === this.total) {
            console.log(`[${this.name}] Progress: ${this.current}/${this.total}`);
        }
    }

    complete() {
        console.log(`   ✓ ${this.name} completed: ${this.total} items`)
    }
}

// 재시도 로직
export async function withRetry<T>(
    fn: () => Promise<T>,
    retries = 3,
    delayMs = 1000
): Promise<T> {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i === retries - 1) {
                throw error;
            }
            logger.warning(`Retry ${i + 1}/${retries} after error: ${error}`)
            await new Promise((resolve) => setTimeout(resolve, delayMs))
        }
    }
    throw new Error('Unreachable code in withRetry');
}