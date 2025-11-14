/**
 * 환경 변수 설정 및 검증
 */

import { z } from 'zod'

/**
 * 환경 변수 스키마 정의
 */
const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_BASE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
})

/**
 * 환경 변수 파싱 및 검증
 */
export const env = EnvSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NODE_ENV: process.env.NODE_ENV,
})
