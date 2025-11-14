/**
 * Prisma 클라이언트 인스턴스
 * 
 * 개발 환경에서 Hot Module Replacement(HMR)로 인한 중복 인스턴스 생성을 방지하기 위함
 * 프로덕션 환경에서는 단일 인스턴스가 생성됨
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Prisma 클라이언트 인스턴스
 */
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
