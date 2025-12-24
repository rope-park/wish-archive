/**
 * seed 공통 유틸리티
 */

import type { PrismaClient, LinkType, Prisma } from '@prisma/client';
import { create } from 'domain';

// 슬러그 생성 함수
export function slugify(text: string): string {
    return text
        .toString()
        .normalize('NFKD') // 유니코드 정규화
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')     // 공백을 -로 치환
        .replace(/[^\w\-]+/g, '') // 문자가 아닌 것 제거
        .replace(/\-\-+/g, '-')   // -가 여러 개면 하나로
        .replace(/^-+/, '')       // 앞쪽 - 제거
        .replace(/-+$/, '');      // 뒤쪽 - 제거
}

interface UpsertDelegate<T, WhereInput, CreateInput, UpdateInput> {
    upsert(args: {
        where: WhereInput;
        create: CreateInput;
        update: UpdateInput;
    }): Promise<T>;
}

// upsert 헬퍼 (존재하면 업데이트, 없으면 생성)
export async function upsertRecord<T, W, D>(
    model: UpsertDelegate<T, W, D, D>,
    where: W,
    date: D
): Promise<T> {
    return model.upsert({
        where,
        update: date,
        create: date,
    });
}

// batch upsert 헬퍼 (여러 레코드 효율적 처리)
export async function batchUpsertRecord<T, W, D>(
    model: UpsertDelegate<T, W, D, D>,
    records: Array<{ where: W; data: D }>,
    batchSize = 20 // 배포 환경 고려하여 배치 사이즈 조정
): Promise<T[]> {
    const results: T[] = [];

    for (let i = 0; i < records.length; i += batchSize) {
        const batch = records.slice(i, i + batchSize);
        // Promise.all로 병렬 처리
        const batchResults = await Promise.all(
            batch.map(({ where, data }) =>
                model.upsert({
                    where,
                    update: data,
                    create: data,
                })
            )
        );
        results.push(...batchResults as T[]);
    }
    return results;
}

// 안전한 외부 링크 생성
type LinkParentType =
    | 'groupId'
    | 'memberId'
    | 'albumId'
    | 'trackId'
    | 'programId'
    | 'eventId'
    | 'contentId'
    | 'contributorId'
    | 'appearanceId';

export async function createExternalLinks(
    prisma: PrismaClient,
    parentId: string,
    parentType: LinkParentType,
    links: Array<{
        type: LinkType;
        title?: string;
        url: string;
        order?: number;
    }>
) {
    if (!links || links.length === 0) return;

    for (const [index, linkData] of links.entries()) {
        // ID 생성 로직 (Seed 멱등성 보장용)
        const safeUrlKey = linkData.url.slice(-20).replace(/[^a-zA-Z0-9]/g, '');
        const customId = `${parentType}_${parentId.slice(-10)}_${safeUrlKey}_${index}`;

        const createData = {
            ...linkData,
            id: customId,
            order: linkData.order ?? index + 1,
            isOfficial: true,
            [parentType]: parentId,
        }as Prisma.ExternalLinkCreateInput;
        
        await prisma.externalLink.upsert({
            where: { id: customId },
            update: {
                ...linkData,
                order: linkData.order ?? index + 1,
            },
            create: createData,
        });
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