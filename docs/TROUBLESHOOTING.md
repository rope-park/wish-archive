# 🔧 WISH Archive - 문제 해결 가이드

> 개발 및 배포 과정에서 발생할 수 있는 모든 문제의 상세 해결 방법

---

## 📋 목차

1. [개발 환경 설정](#-개발-환경-설정)
2. [Prisma 데이터베이스](#-prisma-데이터베이스)
3. [Next.js 빌드 & 런타임](#-nextjs-빌드--런타임)
4. [Cloudinary 이미지](#-cloudinary-이미지)
5. [Supabase 연결](#-supabase-연결)
6. [Vercel 배포](#-vercel-배포)
7. [위젯 & 컴포넌트](#-위젯--컴포넌트)
8. [성능 최적화](#-성능-최적화)
9. [브라우저 호환성](#-브라우저-호환성)
10. [TypeScript & React](#-typescript--react)

---

## 🖥️ 개발 환경 설정

### 문제 1: `npm install` 실패

#### 증상
```bash
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

#### 원인
- 패키지 버전 충돌
- Node.js 버전 불일치
- npm 캐시 손상

#### 해결 방법

**Step 1: Node.js 버전 확인**
```bash
node -v  # v18.0.0 이상 필요
npm -v   # v9.0.0 이상 권장
```

버전이 낮다면:
```bash
# nvm 사용 (권장)
nvm install 18
nvm use 18

# 또는 공식 웹사이트에서 다운로드
https://nodejs.org/
```

**Step 2: 캐시 정리 및 재설치**
```bash
# npm 캐시 정리
npm cache clean --force

# node_modules 삭제
rm -rf node_modules package-lock.json

# 재설치
npm install
```

**Step 3: Legacy Peer Dependencies (최후 수단)**
```bash
npm install --legacy-peer-deps
```

#### 검증
```bash
npm run dev
# ✅ http://localhost:3000 접속 성공
```

---

### 문제 2: `.env` 파일 인식 안 됨

#### 증상
```bash
Error: Environment variable not found: DATABASE_URL
```

#### 원인
- `.env` 파일이 프로젝트 루트에 없음
- 파일명 오타 (`.env.local` vs `.env`)
- Git에 커밋되어 민감 정보 노출

#### 해결 방법

**Step 1: 파일 위치 확인**
```bash
# 프로젝트 루트에 있어야 함
ls -la | grep .env
# .env
# .env.example (템플릿)
```

**Step 2: 파일 생성**
```bash
# 템플릿 복사
cp .env.example .env

# 또는 직접 생성
touch .env
```

**Step 3: 필수 변수 추가**
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
```

**Step 4: Next.js 재시작**
```bash
# Ctrl + C로 종료 후 재실행
npm run dev
```

#### 검증
```bash
# env.ts에서 확인
node -e "require('dotenv').config(); console.log(process.env.DATABASE_URL)"
```

---

### 문제 3: TypeScript 에러 폭발

#### 증상
```
Type error: Property 'id' does not exist on type 'never'
... (수백 개의 에러)
```

#### 원인
- Prisma Client가 생성되지 않음
- `tsconfig.json` 설정 오류
- 타입 선언 파일 누락

#### 해결 방법

**Step 1: Prisma Client 재생성**
```bash
npx prisma generate
```

**Step 2: TypeScript 재시작 (VSCode)**
```
Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

**Step 3: tsconfig.json 확인**
```json
{
  "compilerOptions": {
    "strict": true,
    "skipLibCheck": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

#### 검증
```bash
npx tsc --noEmit
# ✅ 에러 없음
```

---

## 🗄️ Prisma 데이터베이스

### 문제 4: `PrismaClientInitializationError`

#### 증상
```
PrismaClientInitializationError: Can't reach database server at `db.xxx.supabase.co:5432`
```

#### 원인
- `DATABASE_URL` 환경 변수 없음
- 잘못된 연결 문자열
- Supabase 프로젝트 일시 중지
- 네트워크 방화벽

#### 해결 방법

**Step 1: 환경 변수 확인**
```bash
echo $DATABASE_URL
# postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
```

비어있다면:
```bash
export DATABASE_URL="postgresql://..."
```

**Step 2: 연결 문자열 포맷 검증**
```
postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DATABASE]

예시:
postgresql://postgres:mypassword123@db.abcdefg.supabase.co:5432/postgres
```

**Step 3: Supabase 프로젝트 상태 확인**
1. [Supabase 대시보드](https://app.supabase.com) 접속
2. 프로젝트 상태 확인 (일시 중지 시 Resume)

**Step 4: 연결 테스트**
```bash
# psql로 직접 연결
psql $DATABASE_URL -c "SELECT 1;"

# 또는 Prisma Studio
npx prisma studio
```

**Step 5: Connection Pooler 사용**
```env
# Direct (마이그레이션용)
DATABASE_URL="postgresql://...@db.xxx.supabase.co:5432/postgres"

# Pooler (런타임용)
DATABASE_URL_POOLER="postgresql://...@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
```

`prisma/schema.prisma`:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL_POOLER")
  directUrl = env("DATABASE_URL")
}
```

#### 검증
```bash
npx prisma db pull
# ✅ Introspected 32 models
```

---

### 문제 5: 마이그레이션 실패

#### 증상
```
Error: P3009 migrate found failed migrations in the target database
```

#### 원인
- 이전 마이그레이션이 중단됨
- 스키마와 DB 상태 불일치
- 수동 DB 변경

#### 해결 방법

**Step 1: 마이그레이션 상태 확인**
```bash
npx prisma migrate status
```

**Step 2: 실패한 마이그레이션 롤백**
```bash
# 마지막 마이그레이션 되돌리기
npx prisma migrate resolve --rolled-back "20251210125026_wish_os_release_dates"
```

**Step 3: DB 리셋 (개발 환경 only)**
```bash
# ⚠️ 모든 데이터 삭제됨!
npx prisma migrate reset --force

# 시드 데이터 재삽입
npm run db:seed
```

**Step 4: Production DB 수동 복구**
```sql
-- _prisma_migrations 테이블 확인
SELECT * FROM _prisma_migrations ORDER BY finished_at DESC;

-- 실패한 마이그레이션 제거
DELETE FROM _prisma_migrations WHERE migration_name = '20251210125026_...';

-- 재실행
npx prisma migrate deploy
```

**Step 5: 스키마 동기화 (강제)**
```bash
# DB 스키마를 Prisma 스키마로 덮어씀
npx prisma db push --accept-data-loss
```

#### 검증
```bash
npx prisma migrate status
# ✅ Database schema is up to date!
```

---

### 문제 6: 시드 데이터 삽입 실패

#### 증상
```
Error: Unique constraint failed on the fields: (`slug`)
```

#### 원인
- 중복 데이터 삽입 시도
- Foreign key 제약 위반
- ENUM 값 오타

#### 해결 방법

**Step 1: 기존 데이터 확인**
```bash
npx prisma studio
# Group 테이블에 'nct-wish' slug가 이미 존재하는지 확인
```

**Step 2: upsert 사용 (prisma/seeds/00-group.ts)**
```typescript
// ❌ create (중복 시 에러)
await prisma.group.create({ data: { slug: 'nct-wish', ... } });

// ✅ upsert (중복 시 업데이트)
await prisma.group.upsert({
  where: { slug: 'nct-wish' },
  update: {},
  create: { slug: 'nct-wish', ... }
});
```

**Step 3: Foreign Key 순서 확인**
```typescript
// ✅ 올바른 순서
await seedGroup();      // 1. Group 먼저
await seedMembers();    // 2. Member (groupId 참조)
await seedAlbums();     // 3. Album (groupId 참조)
await seedTracks();     // 4. Track (albumId 참조)
```

**Step 4: ENUM 값 검증**
```typescript
// prisma/schema.prisma
enum ReleaseType {
  STUDIO_ALBUM
  MINI_ALBUM
  SINGLE_ALBUM
  DIGITAL_SINGLE
  PARTICIPATION
}

// ❌ 오타
type: 'MINI_ALBUMS'  // 에러!

// ✅ 정확한 값
type: 'MINI_ALBUM'
```

**Step 5: 전체 리셋 후 재시드**
```bash
npm run db:fresh
# = prisma migrate reset --force && prisma db seed
```

#### 검증
```bash
# 각 테이블 카운트 확인
psql $DATABASE_URL -c "SELECT 
  (SELECT COUNT(*) FROM \"Group\") as groups,
  (SELECT COUNT(*) FROM \"Member\") as members,
  (SELECT COUNT(*) FROM \"Album\") as albums,
  (SELECT COUNT(*) FROM \"Track\") as tracks;"

# 예상: groups=1, members=6, albums=11, tracks=66
```

---

## ⚡ Next.js 빌드 & 런타임

### 문제 7: 빌드 실패 - Module not found

#### 증상
```
Module not found: Can't resolve '@/components/apps/DiscographyApp'
```

#### 원인
- 파일 경로 오타
- 대소문자 불일치 (Windows ↔ Linux)
- Import 경로 오류

#### 해결 방법

**Step 1: 파일 존재 확인**
```bash
# 실제 경로 확인
ls src/components/apps/DiscographyApp.tsx

# 대소문자 정확히 확인
find src -name "*discography*" -o -name "*Discography*"
```

**Step 2: Import 경로 수정**
```typescript
// ❌ 오타
import DiscographyApp from '@/components/apps/DiscographyAp';

// ✅ 정확한 경로
import DiscographyApp from '@/components/apps/DiscographyApp';
```

**Step 3: tsconfig.json paths 확인**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Step 4: 캐시 정리 후 재빌드**
```bash
rm -rf .next
npm run build
```

#### 검증
```bash
npm run build
# ✅ Compiled successfully
```

---

### 문제 8: Hydration Error

#### 증상
```
Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

#### 원인
- 서버와 클라이언트 렌더링 불일치
- `Date.now()`, `Math.random()` 같은 비결정적 값
- 브라우저 전용 API를 서버에서 사용

#### 해결 방법

**Step 1: 원인 파악**
```typescript
// ❌ 서버와 클라이언트 결과 다름
<div>{new Date().toLocaleString()}</div>
<div>{Math.random()}</div>
```

**Step 2: useEffect 사용**
```typescript
'use client';
import { useState, useEffect } from 'react';

export default function TimeWidget() {
  const [time, setTime] = useState<string>('');
  
  useEffect(() => {
    setTime(new Date().toLocaleString());
  }, []);
  
  return <div>{time || 'Loading...'}</div>;
}
```

**Step 3: suppressHydrationWarning (임시 해결)**
```typescript
<div suppressHydrationWarning>
  {new Date().toLocaleString()}
</div>
```

**Step 4: 클라이언트 전용 컴포넌트**
```typescript
'use client';
import dynamic from 'next/dynamic';

const ClientOnlyWidget = dynamic(() => import('./ClientWidget'), {
  ssr: false
});
```

#### 검증
```bash
npm run build && npm start
# ✅ 콘솔에 Hydration 에러 없음
```

---

### 문제 9: API Route 500 에러

#### 증상
```json
{
  "error": "Internal Server Error"
}
```

#### 원인
- Prisma Client 초기화 실패
- 환경 변수 누락
- Try-catch 블록 없음

#### 해결 방법

**Step 1: 서버 로그 확인**
```bash
# Development
npm run dev
# 콘솔에서 자세한 에러 메시지 확인

# Production (Vercel)
vercel logs
```

**Step 2: Try-catch 추가**
```typescript
// src/app/api/members/route.ts
export async function GET() {
  try {
    const members = await prisma.member.findMany();
    return NextResponse.json(members);
  } catch (error) {
    console.error('❌ API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch members', details: error.message },
      { status: 500 }
    );
  }
}
```

**Step 3: Prisma Client 확인**
```typescript
import { prisma } from '@/lib/prisma';

// Prisma Client가 null이 아닌지 확인
if (!prisma) {
  throw new Error('Prisma Client not initialized');
}
```

**Step 4: 환경 변수 검증**
```typescript
// src/lib/env.ts
import { z } from 'zod';

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
});

export const env = EnvSchema.parse(process.env);
// ❌ 누락된 변수 있으면 즉시 에러 발생
```

#### 검증
```bash
curl http://localhost:3000/api/members
# ✅ [{ "id": "...", "stageName": "SION", ... }]
```

---

## 🖼️ Cloudinary 이미지

### 문제 10: 이미지가 표시되지 않음

#### 증상
- 이미지 URL은 있지만 `<img>` 태그에서 로드 실패
- 404 Not Found 에러
- CORS 에러

#### 원인
- Cloudinary 환경 변수 누락
- Cloud Name 오타
- Public ID 경로 오류
- CORS 설정 문제

#### 해결 방법

**Step 1: 환경 변수 확인**
```bash
# .env
echo $NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# dcexample123 (비어있으면 안 됨!)
```

**Step 2: Cloud Name 검증**
```typescript
// 올바른 형식
const url = `https://res.cloudinary.com/${cloudName}/image/upload/v1234567890/nct-wish/sion.jpg`;

// ❌ 잘못된 Cloud Name
https://res.cloudinary.com/wrong-name/...
// → 404 Not Found
```

**Step 3: Public ID 확인**
```typescript
// Cloudinary Console에서 이미지 클릭 → Details
Public ID: nct-wish/members/sion/profile.jpg

// ✅ 정확한 URL 생성
https://res.cloudinary.com/dcexample123/image/upload/nct-wish/members/sion/profile.jpg
```

**Step 4: Next.js Image 도메인 허용**
```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      }
    ]
  }
};
```

**Step 5: CORS 설정 (Cloudinary Console)**
1. **Settings** → **Security**
2. **Allowed fetch domains** 추가:
   - `localhost:3000`
   - `*.vercel.app`
   - 커스텀 도메인

#### 검증
```bash
# URL 직접 접속
curl -I https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/test.jpg

# ✅ HTTP/2 200
```

---

### 문제 11: Gallery API 빈 배열 반환

#### 증상
```json
{
  "mode": "folder",
  "path": "nct-wish/events",
  "items": []
}
```

#### 원인
- Cloudinary 폴더 경로 오타
- API Key/Secret 오류
- 이미지 업로드 안 됨

#### 해결 방법

**Step 1: Cloudinary Console에서 폴더 확인**
1. [Media Library](https://console.cloudinary.com/console/media_library) 접속
2. 폴더 구조 확인:
   ```
   nct-wish/
     └── events/  ← 이 경로가 정확한지 확인
   ```

**Step 2: API 자격 증명 테스트**
```typescript
// src/lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// 테스트 코드 추가
async function testCloudinary() {
  const result = await cloudinary.api.resources({ max_results: 1 });
  console.log('✅ Cloudinary connected:', result);
}
```

**Step 3: 검색 Expression 디버깅**
```typescript
// src/app/api/gallery/route.ts
const expression = `folder:"${path}"`;
console.log('🔍 Search expression:', expression);

const imageRes = await cloudinary.search
  .expression(expression)
  .max_results(100)
  .execute();

console.log('📸 Found images:', imageRes.resources.length);
```

**Step 4: 이미지 업로드**
```bash
# Cloudinary CLI 사용
npm install -g cloudinary-cli

cloudinary config:set cloud_name=YOUR_CLOUD_NAME api_key=... api_secret=...

cloudinary uploader upload image.jpg -p nct-wish/events/test
```

#### 검증
```bash
curl "http://localhost:3000/api/gallery?path=nct-wish/events"
# ✅ { "items": [{ "name": "test.jpg", ... }] }
```

---

## 🔗 Supabase 연결

### 문제 12: Connection Pool 고갈

#### 증상
```
Error: P1001: Can't reach database server. Too many connections.
```

#### 원인
- Vercel 서버리스 함수가 너무 많은 연결 생성
- Prisma Connection Pool 설정 부족
- Connection 누수 (close 안 함)

#### 해결 방법

**Step 1: Connection Pooling 활성화**
1. Supabase 대시보드 → **Database** → **Connection Pooling**
2. **Enable** 클릭
3. **Transaction mode** 선택
4. Pooler URL 복사

**Step 2: 환경 변수 분리**
```env
# Direct connection (마이그레이션 전용)
DATABASE_URL="postgresql://postgres:pass@db.xxx.supabase.co:5432/postgres"

# Pooler connection (런타임 전용)
DATABASE_URL_POOLER="postgresql://postgres:pass@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres"
```

**Step 3: Prisma 스키마 수정**
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL_POOLER")
  directUrl = env("DATABASE_URL")
}
```

**Step 4: Prisma 재생성 및 배포**
```bash
npx prisma generate
git add . && git commit -m "Add connection pooling" && git push
```

**Step 5: Vercel 환경 변수 추가**
1. Vercel 대시보드 → **Settings** → **Environment Variables**
2. `DATABASE_URL_POOLER` 추가
3. **Redeploy**

#### 검증
```bash
# Supabase Connection Stats
# Supabase → Database → Connection Pooling
# Active connections: 1-10 (정상)
```

---

### 문제 13: 느린 쿼리 성능

#### 증상
- API 응답 시간 3초 이상
- Vercel Function Timeout (10초)

#### 원인
- N+1 쿼리 문제
- 인덱스 없음
- 대량 데이터 조회

#### 해결 방법

**Step 1: Prisma 쿼리 로깅**
```typescript
// src/lib/prisma.ts
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// 콘솔에서 느린 쿼리 확인
```

**Step 2: N+1 쿼리 제거**
```typescript
// ❌ N+1 쿼리 (albums 개수만큼 쿼리 실행)
const albums = await prisma.album.findMany();
for (const album of albums) {
  const tracks = await prisma.track.findMany({
    where: { albumId: album.id }
  });
  album.tracks = tracks;
}

// ✅ Include로 한 번에 (1 쿼리)
const albums = await prisma.album.findMany({
  include: { tracks: true }
});
```

**Step 3: Select로 필요한 필드만**
```typescript
// ❌ 모든 필드 (무거움)
const members = await prisma.member.findMany();

// ✅ 필요한 필드만
const members = await prisma.member.findMany({
  select: {
    id: true,
    stageName: true,
    profileImageUrl: true
  }
});
```

**Step 4: 인덱스 추가**
```prisma
// prisma/schema.prisma
model Event {
  date DateTime
  type EventType
  
  @@index([date])
  @@index([type])
  @@index([date, type]) // 복합 인덱스
}
```

마이그레이션 생성:
```bash
npx prisma migrate dev --name add_event_indexes
```

**Step 5: 페이지네이션**
```typescript
// ❌ 전체 조회 (10,000개)
const events = await prisma.event.findMany();

// ✅ 페이지네이션 (20개씩)
const events = await prisma.event.findMany({
  take: 20,
  skip: (page - 1) * 20,
  orderBy: { date: 'desc' }
});
```

**Step 6: ISR 캐싱**
```typescript
// src/app/api/stats/route.ts
export const revalidate = 3600; // 1시간 캐시
```

#### 검증
```bash
# Supabase Query Performance
# Supabase → Database → Query Performance
# 평균 쿼리 시간: < 100ms (목표)
```

---

## 🚀 Vercel 배포

### 문제 14: 빌드 시간 초과 (45분)

#### 증상
```
Error: Command "npm run build" timed out after 45 minutes
```

#### 원인
- 너무 많은 페이지 생성 (SSG)
- 느린 외부 API 호출
- 큰 번들 사이즈

#### 해결 방법

**Step 1: 빌드 로그 분석**
```bash
# 로컬에서 빌드 시간 측정
time npm run build

# 어떤 페이지가 느린지 확인
# Generating static pages (123/500) → 여기서 멈춤?
```

**Step 2: generateStaticParams 최적화**
```typescript
// ❌ 10,000개 페이지 생성
export async function generateStaticParams() {
  const events = await prisma.event.findMany(); // 10,000개
  return events.map(e => ({ id: e.id }));
}

// ✅ 제한 또는 ISR로 전환
export const dynamic = 'force-dynamic'; // SSG 대신 SSR
```

**Step 3: 번들 크기 분석**
```bash
npm install -D @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# 실행
ANALYZE=true npm run build
```

큰 패키지 찾아서 제거 또는 Dynamic Import:
```typescript
// ❌ 정적 import (번들에 포함)
import { Chart } from 'recharts';

// ✅ 동적 import
const Chart = dynamic(() => import('recharts').then(m => m.Chart), {
  ssr: false
});
```

**Step 4: Vercel 설정 확인**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "framework": "nextjs",
  "regions": ["icn1"]
}
```

#### 검증
```bash
npm run build
# ✅ Compiled successfully in < 5 minutes
```

---

### 문제 15: 환경 변수 업데이트 안 됨

#### 증상
- Vercel에서 환경 변수를 수정했지만 여전히 이전 값 사용

#### 원인
- 재배포 필요
- 빌드 타임 vs 런타임 변수 혼동

#### 해결 방법

**Step 1: 환경 변수 타입 이해**
```typescript
// 빌드 타임 (정적으로 번들에 포함)
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

// 런타임 (서버에서만 접근)
const apiSecret = process.env.CLOUDINARY_API_SECRET;
```

**Step 2: 재배포**

**방법 A: Vercel 대시보드**
1. Deployments → 최신 배포 클릭
2. **Redeploy** 버튼 클릭
3. **Use existing Build Cache** 체크 해제

**방법 B: Git Push (빈 커밋)**
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

**방법 C: Vercel CLI**
```bash
vercel --prod --force
```

**Step 3: 캐시 무효화**
```bash
# Edge Network 캐시 제거
# Vercel 대시보드 → Deployments → ... → Invalidate Cache
```

#### 검증
```bash
# Production에서 확인
curl https://wish-archive.vercel.app/api/group
```

---

### 문제 16: Vercel Function Timeout

#### 증상
```
Task timed out after 10.00 seconds
```

#### 원인
- Hobby 플랜: 10초 제한
- 느린 데이터베이스 쿼리
- 외부 API 호출 지연

#### 해결 방법

**Step 1: 쿼리 최적화** (문제 13 참고)

**Step 2: ISR 사용**
```typescript
// src/app/api/stats/route.ts
export const revalidate = 3600; // 1시간 캐시

// 첫 요청만 느리고, 이후는 캐시됨
```

**Step 3: Edge Runtime 사용**
```typescript
// src/app/api/members/route.ts
export const runtime = 'edge'; // 10초 → 30초 제한

export async function GET() {
  const members = await prisma.member.findMany();
  return NextResponse.json(members);
}
```

**주의**: Edge Runtime은 모든 Node.js API 지원 안 함

**Step 4: Background Job으로 분리**
```typescript
// 무거운 작업은 별도 서비스로
// - Vercel Cron Jobs
// - Supabase Functions
// - AWS Lambda
```

#### 검증
```bash
# 응답 시간 측정
time curl https://wish-archive.vercel.app/api/stats
# < 2 seconds (목표)
```

---

## 🎨 위젯 & 컴포넌트

### 문제 17: Window 드래그 안 됨

#### 증상
- WindowFrame 컴포넌트를 드래그할 수 없음
- 클릭만 되고 움직이지 않음

#### 원인
- react-rnd 이벤트 충돌
- CSS `pointer-events: none`
- Z-index 문제

#### 해결 방법

**Step 1: react-rnd 설정 확인**
```typescript
// src/components/os/WindowFrame.tsx
<Rnd
  enableResizing={true}
  disableDragging={false} // ← false인지 확인
  dragHandleClassName="window-header" // 헤더만 드래그 가능
>
  <div className="window-header">타이틀바</div>
  <div className="window-body">컨텐츠</div>
</Rnd>
```

**Step 2: CSS 확인**
```css
/* ❌ 드래그 비활성화 */
.window-frame {
  pointer-events: none;
}

/* ✅ 정상 */
.window-frame {
  pointer-events: auto;
}

/* 드래그 핸들 (헤더) */
.window-header {
  cursor: move;
  user-select: none;
}
```

**Step 3: Z-index 디버깅**
```typescript
// 드래그 시작 시 최상위로
const handleDragStart = () => {
  bringToFront(appId); // Z-index 업데이트
};

<Rnd onDragStart={handleDragStart} />
```

#### 검증
```bash
# 브라우저에서 테스트
1. 윈도우 헤더 클릭
2. 마우스 이동
# ✅ 윈도우가 따라 움직임
```

---

### 문제 18: Tamagotchi 3D 모델 안 보임

#### 증상
- TamagotchiWidget에서 별 모델 렌더링 안 됨
- 검은 화면

#### 원인
- Three.js 초기화 실패
- Canvas 크기 0
- 카메라 위치 오류

#### 해결 방법

**Step 1: Canvas 크기 확인**
```typescript
// src/components/widgets/TamagotchiWidget.tsx
<div style={{ width: '100%', height: '400px' }}>
  <Canvas>
    <StarModel />
  </Canvas>
</div>
```

**Step 2: 카메라 설정**
```typescript
<Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
  <ambientLight intensity={0.5} />
  <pointLight position={[10, 10, 10]} />
  <StarModel />
</Canvas>
```

**Step 3: 모델 로드 확인**
```typescript
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function StarModel() {
  const gltf = useLoader(GLTFLoader, '/models/star.glb');
  return <primitive object={gltf.scene} />;
}
```

파일 위치 확인:
```bash
ls public/models/star.glb
# ✅ 파일 존재
```

**Step 4: Suspense로 로딩 처리**
```typescript
<Suspense fallback={<div>Loading 3D...</div>}>
  <Canvas>
    <StarModel />
  </Canvas>
</Suspense>
```

#### 검증
```bash
# 브라우저 콘솔 확인
# ✅ Three.js 에러 없음
```

---

### 문제 19: MiniPlayer 자동재생 안 됨

#### 증상
- YouTube 플레이어가 자동으로 재생되지 않음

#### 원인
- 브라우저 자동재생 정책 (Chrome, Safari)
- `muted` 속성 누락

#### 해결 방법

**Step 1: Muted 자동재생**
```typescript
// src/components/widgets/MiniPlayerWidget.tsx
<ReactPlayer
  url={videoUrl}
  playing={true}
  muted={true} // ← 필수!
  volume={0.5}
  onReady={() => setMuted(false)} // 준비되면 음소거 해제
/>
```

**Step 2: 사용자 인터랙션 후 재생**
```typescript
const [canPlay, setCanPlay] = useState(false);

const handlePlayClick = () => {
  setCanPlay(true);
};

<ReactPlayer
  playing={canPlay}
  muted={false}
/>
```

**Step 3: 브라우저별 정책 확인**
```typescript
// Chrome: muted=true 필요
// Safari: 더 엄격함 (사용자 제스처 필요)
// Firefox: 상대적으로 관대
```

#### 검증
```bash
# Chrome DevTools → Console
# ⚠️ "Autoplay blocked" 경고 없음
```

---

## ⚡ 성능 최적화

### 문제 20: 초기 로딩 시간 느림 (5초+)

#### 증상
- 페이지 첫 로드 시 5초 이상 소요
- Lighthouse Performance 점수 < 50

#### 원인
- 큰 JavaScript 번들
- 최적화되지 않은 이미지
- 서버 렌더링 느림

#### 해결 방법

**Step 1: Lighthouse 분석**
```bash
# Chrome DevTools → Lighthouse → Analyze
# 문제 항목 확인:
# - Reduce unused JavaScript
# - Serve images in next-gen formats
# - Reduce server response time
```

**Step 2: Dynamic Import**
```typescript
// ❌ 모든 앱 정적 import (번들 비대)
import DiscographyApp from './apps/DiscographyApp';
import ArchiveApp from './apps/ArchiveApp';
import GalleryApp from './apps/GalleryApp';

// ✅ 동적 import (필요할 때만 로드)
const apps = {
  discography: dynamic(() => import('./apps/DiscographyApp')),
  archive: dynamic(() => import('./apps/ArchiveApp')),
  gallery: dynamic(() => import('./apps/GalleryApp')),
};
```

**Step 3: 이미지 최적화**
```typescript
// ❌ <img> 태그
<img src="cover.jpg" alt="Album" />

// ✅ Next.js Image 컴포넌트
import Image from 'next/image';

<Image
  src="https://res.cloudinary.com/.../cover.jpg"
  alt="Album"
  width={300}
  height={300}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

Cloudinary 자동 포맷 변환:
```typescript
const url = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/cover.jpg`;
// f_auto: WebP, AVIF 자동 선택
// q_auto: 품질 자동 조정
```

**Step 4: SSR → ISR 전환**
```typescript
// src/app/page.tsx
export const revalidate = 3600; // 1시간마다 재생성

// 빌드 타임에 정적 생성 → 빠른 첫 로드
```

**Step 5: CSS 최적화**
```css
/* ❌ 사용하지 않는 Tailwind 클래스 제거 */
/* tailwind.config.cjs */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  plugins: [],
};
```

#### 검증
```bash
# Lighthouse 재측정
# Performance: > 90 (목표)
# FCP: < 1.5s
# LCP: < 2.5s
```

---

### 문제 21: 메모리 누수 (Memory Leak)

#### 증상
- 페이지 사용 시간이 길어질수록 느려짐
- Chrome Task Manager에서 메모리 계속 증가
- "Page unresponsive" 경고

#### 원인
- useEffect cleanup 누락
- 이벤트 리스너 제거 안 함
- 타이머 정리 안 함

#### 해결 방법

**Step 1: useEffect Cleanup**
```typescript
// ❌ Cleanup 없음
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);
}, []);

// ✅ Cleanup 추가
useEffect(() => {
  const interval = setInterval(() => {
    setTime(new Date());
  }, 1000);
  
  return () => clearInterval(interval); // ← 정리!
}, []);
```

**Step 2: 이벤트 리스너 정리**
```typescript
useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

**Step 3: Zustand Store 정리**
```typescript
// src/app/stores/useWindowStore.ts
const useWindowStore = create<WindowStore>((set) => ({
  windows: [],
  
  // ❌ 윈도우 닫아도 데이터 남음
  closeWindow: (id) => set((state) => ({
    windows: state.windows.filter(w => w.id !== id)
  })),
  
  // ✅ 명시적 정리
  cleanup: () => set({ windows: [] }),
}));

// 페이지 언마운트 시
useEffect(() => {
  return () => useWindowStore.getState().cleanup();
}, []);
```

**Step 4: React DevTools Profiler로 감지**
```bash
1. Chrome DevTools → Profiler 탭
2. Record 시작
3. 앱 사용 (윈도우 열기/닫기)
4. Record 중지
5. Flamegraph에서 느린 컴포넌트 확인
```

#### 검증
```bash
# Chrome Task Manager (Shift + Esc)
# 메모리 사용량이 안정적으로 유지됨
# < 200MB (목표)
```

---

## 🌐 브라우저 호환성

### 문제 22: Safari에서 레이아웃 깨짐

#### 증상
- Safari에서만 CSS Grid 레이아웃 이상
- Flexbox gap 적용 안 됨

#### 원인
- Safari의 느린 표준 지원
- Webkit 접두사 필요

#### 해결 방법

**Step 1: Flexbox gap 대안**
```css
/* ❌ Safari < 14.1 지원 안 함 */
.container {
  display: flex;
  gap: 1rem;
}

/* ✅ 대안: margin */
.container > * + * {
  margin-left: 1rem;
}

/* 또는 Tailwind */
<div className="flex space-x-4">
```

**Step 2: Webkit 접두사**
```css
.window {
  -webkit-user-select: none;
  user-select: none;
  
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
```

**Step 3: CSS Grid fallback**-
```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Safari 구버전 대비 */
@supports not (grid-template-columns: subgrid) {
  .grid {
    display: flex;
    flex-wrap: wrap;
  }
}
```

#### 검증
```bash
# BrowserStack 또는 실제 Safari에서 테스트
# macOS Safari, iOS Safari 모두 확인
```

---

### 문제 23: Internet Explorer 11 지원

#### 증상
- IE11에서 완전히 작동 안 함
- "구문 오류" 메시지

#### 원인
- Next.js 15+는 IE11 지원 중단
- ES6+ 문법 사용

#### 해결 방법

**Step 1: 브라우저 감지 및 경고**
```typescript
// src/app/layout.tsx
'use client';
import { useEffect } from 'react';

export default function RootLayout({ children }) {
  useEffect(() => {
    const isIE = /MSIE|Trident/.test(navigator.userAgent);
    if (isIE) {
      alert('이 사이트는 Internet Explorer를 지원하지 않습니다. Chrome, Firefox, Safari를 사용해주세요.');
    }
  }, []);
  
  return <html>{children}</html>;
}
```

**Step 2: 최소 지원 브라우저 명시**
```html
<!-- public/index.html -->
<!--[if IE]>
<div style="padding: 20px; background: #f00; color: #fff;">
  이 웹사이트는 Internet Explorer를 지원하지 않습니다.
  <a href="https://www.google.com/chrome/">Chrome 다운로드</a>
</div>
<![endif]-->
```

**권장**: IE11 지원 포기 (Next.js 공식 입장)

#### 검증
```bash
# 지원 브라우저 정책 문서화
# - Chrome 90+
# - Firefox 88+
# - Safari 14+
# - Edge 90+
```

---

## 📝 TypeScript & React

### 문제 24: TypeScript 타입 에러

#### 증상
```typescript
Type 'string | undefined' is not assignable to type 'string'
```

#### 원인
- Strict 모드 활성화
- Optional 필드 처리 안 함

#### 해결 방법

**Step 1: Optional Chaining**
```typescript
// ❌ 에러 발생
const title: string = album.title;

// ✅ Optional chaining
const title: string = album?.title ?? 'Unknown';
```

**Step 2: Type Guard**
```typescript
function isMember(obj: any): obj is Member {
  return obj && typeof obj.stageName === 'string';
}

const member = data;
if (isMember(member)) {
  console.log(member.stageName); // ✅ 타입 안전
}
```

**Step 3: Non-null Assertion (확실할 때만)**
```typescript
const group = await prisma.group.findUnique({ where: { slug: 'nct-wish' } });

// ❌ group이 null일 수 있음
console.log(group.name);

// ✅ 타입 체크
if (!group) throw new Error('Group not found');
console.log(group.name);

// ⚠️ Non-null assertion (확실할 때만)
console.log(group!.name);
```

**Step 4: Zod 스키마 검증**
```typescript
import { z } from 'zod';

const AlbumSchema = z.object({
  id: z.string(),
  title: z.string(),
  releaseDate: z.date(),
  coverImageUrl: z.string().url().optional(),
});

type Album = z.infer<typeof AlbumSchema>;

// 런타임 검증
const album = AlbumSchema.parse(data);
```

#### 검증
```bash
npx tsc --noEmit
# ✅ Found 0 errors
```

---

### 문제 25: React Hook 규칙 위반

#### 증상
```
React Hook "useState" is called conditionally
```

#### 원인
- 조건문 안에서 Hook 호출
- 반복문 안에서 Hook 호출

#### 해결 방법

**Step 1: Hook을 최상위에서 호출**
```typescript
// ❌ 조건문 안에서 Hook
function Component({ show }) {
  if (show) {
    const [count, setCount] = useState(0); // 에러!
  }
}

// ✅ 최상위에서 Hook
function Component({ show }) {
  const [count, setCount] = useState(0);
  
  if (!show) return null;
  return <div>{count}</div>;
}
```

**Step 2: 조건부 렌더링 분리**
```typescript
function ParentComponent({ show }) {
  if (!show) return null;
  return <ChildComponentWithHooks />;
}

function ChildComponentWithHooks() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
```

**Step 3: ESLint 규칙 활성화**
```json
// .eslintrc.json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

#### 검증
```bash
npm run lint
# ✅ No linting errors
```

---

## 🆘 긴급 복구 가이드

### Production 다운 시 체크리스트

#### Step 1: 상태 확인 (1분)
```bash
# 사이트 접속 확인
curl -I https://wish-archive.vercel.app

# Vercel 상태 페이지
https://www.vercel-status.com

# Supabase 상태
https://status.supabase.com

# Cloudinary 상태
https://status.cloudinary.com
```

#### Step 2: Vercel 배포 롤백 (2분)
1. Vercel 대시보드 → **Deployments**
2. 마지막 정상 배포 찾기
3. **...** → **Promote to Production**

#### Step 3: 데이터베이스 복구 (5분)
```bash
# 백업에서 복원 (사전에 백업 필요!)
pg_restore -d $DATABASE_URL backup_20241229.sql

# 또는 마이그레이션 재실행
npx prisma migrate deploy
```

#### Step 4: 환경 변수 확인 (3분)
```bash
# Vercel CLI로 확인
vercel env ls

# 누락된 변수 추가
vercel env add DATABASE_URL
```

#### Step 5: 캐시 무효화 (1분)
```bash
# Vercel Edge Cache 제거
vercel --prod --force
```

#### Step 6: 모니터링
```bash
# Vercel Logs 실시간 확인
vercel logs --follow

# Supabase Logs
# Supabase → Database → Logs
```

---

## 📞 도움 받기

### 공식 커뮤니티

- **Next.js Discord**: [discord.gg/nextjs](https://discord.gg/nextjs)
- **Prisma Discord**: [pris.ly/discord](https://pris.ly/discord)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

### GitHub Issues

```bash
# 버그 리포트 템플릿
제목: [BUG] 간단한 설명

**증상**
무엇이 잘못되었나요?

**재현 방법**
1. ...
2. ...

**예상 동작**
어떻게 동작해야 하나요?

**환경**
- OS: Windows 11
- Node: 18.17.0
- Browser: Chrome 120

**스크린샷**
(있다면 추가)

**에러 메시지**
```
전체 에러 메시지
```
```

---

## 📚 참고 자료

### 관련 문서
- [DEPLOYMENT.md](./DEPLOYMENT.md) - 배포 가이드
- [ARCHITECTURE.md](./ARCHITECTURE.md) - 시스템 아키텍처
- [DATABASE.md](./DATABASE.md) - 데이터베이스 스키마
- [API_REFERENCE.md](./API_REFERENCE.md) - API 명세

### 공식 문서
- [Next.js Troubleshooting](https://nextjs.org/docs/messages)
- [Prisma Error Reference](https://www.prisma.io/docs/reference/api-reference/error-reference)
- [Vercel Support](https://vercel.com/support)

---

**Last Updated:** 2025-12-29  
**Total Issues Covered:** 25+  
**Author:** Kelly
