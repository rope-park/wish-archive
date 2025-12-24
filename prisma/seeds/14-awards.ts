// prisma/seeds/14-awards.ts
import { PrismaClient } from '@prisma/client';
import { logger, ProgressTracker } from './utils';

// 수상 내역 시드 데이터
export async function seedAwards(prisma: PrismaClient) {
    const group = await prisma.group.findFirst({ where: { slug: 'nct-wish' } });
    if (!group) throw new Error('Group "nct-wish" not found. Please run the group seed first.');

}