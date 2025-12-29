# 🚀 WISH Archive - 배포 가이드

> Next.js 16 프로젝트의 Vercel 배포, Supabase 데이터베이스, Cloudinary CDN 설정 완전 가이드

---

## 📋 목차

1. [배포 개요](#-배포-개요)
2. [사전 준비사항](#-사전-준비사항)
3. [환경 변수 설정](#-환경-변수-설정)
4. [데이터베이스 설정 (Supabase)](#-데이터베이스-설정-supabase)
5. [이미지 CDN 설정 (Cloudinary)](#-이미지-cdn-설정-cloudinary)
6. [Vercel 배포](#-vercel-배포)
7. [데이터베이스 마이그레이션](#-데이터베이스-마이그레이션)
8. [시드 데이터 삽입](#-시드-데이터-삽입)
9. [도메인 설정](#-도메인-설정)
10. [CI/CD 파이프라인](#-cicd-파이프라인)
11. [모니터링 및 로깅](#-모니터링-및-로깅)
12. [트러블슈팅](#-트러블슈팅)

---

## 🎯 배포 개요

### 배포 아키텍처

```
┌─────────────────────────────────────────────────────┐
│                    Cloudflare DNS                    │
│              wish-archive.vercel.app                 │
└────────────────────┬────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────┐
│                  Vercel Edge Network                 │
│  ┌──────────────────────────────────────────────┐  │
│  │         Next.js 16 App (서버리스)           │  │
│  │  - SSR (Server-Side Rendering)               │  │
│  │  - ISR (Incremental Static Regeneration)     │  │
│  │  - API Routes (Next.js Route Handlers)       │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────┬────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │                         │
┌───────▼──────┐         ┌────────▼────────┐
│   Supabase   │         │   Cloudinary    │
│  PostgreSQL  │         │   Image CDN     │
│   Database   │         │  (Media Assets) │
└──────────────┘         └─────────────────┘
```

### 기술 스택

| 항목 | 서비스 | 플랜 | 비고 |
|-----|--------|------|------|
| **호스팅** | Vercel | Hobby (무료) | 자동 배포, Edge Network |
| **데이터베이스** | Supabase | Free Tier | PostgreSQL 15, 500MB |
| **이미지 CDN** | Cloudinary | Free Tier | 25GB 저장, 25GB 대역폭/월 |
| **도메인** | Vercel Subdomain | 무료 | wish-archive.vercel.app |
| **Git** | GitHub | Public Repo | 소스 코드 관리 |

---

## ✅ 사전 준비사항

### 1. 계정 생성

다음 서비스들의 계정이 필요합니다:

- [ ] **Vercel 계정** ([vercel.com/signup](https://vercel.com/signup))
- [ ] **Supabase 계정** ([supabase.com](https://supabase.com))
- [ ] **Cloudinary 계정** ([cloudinary.com/users/register/free](https://cloudinary.com/users/register/free))
- [ ] **GitHub 계정** (소스 코드 푸시용)

### 2. 로컬 개발 환경

```bash
Node.js >= 18.0.0
npm >= 9.0.0 또는 pnpm >= 8.0.0
Git >= 2.0.0
```

### 3. 프로젝트 클론

```bash
git clone https://github.com/YOUR_USERNAME/wish-archive.git
cd wish-archive
npm install
```

---

## 🔐 환경 변수 설정

### 환경 변수 파일 생성

프로젝트 루트에 `.env` 파일을 생성합니다:

```bash
touch .env
```

### `.env` 템플릿

```env
# ==========================================
# 데이터베이스 (Supabase)
# ==========================================
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"

# ==========================================
# Cloudinary (이미지 CDN)
# ==========================================
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abcdefghijklmnopqrstuvwxyz123456"

# ==========================================
# Next.js 설정
# ==========================================
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
NODE_ENV="development"

# ==========================================
# 디버그 모드 (선택)
# ==========================================
DEBUG="false"
```

### 환경 변수 설명

| 변수명 | 필수 | 설명 | 예시 |
|-------|------|------|------|
| `DATABASE_URL` | ✅ | Supabase PostgreSQL 연결 문자열 | `postgresql://postgres:...` |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary Cloud Name | `dcexample123` |
| `CLOUDINARY_API_KEY` | ✅ | Cloudinary API Key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | ✅ | Cloudinary API Secret | `abc123...` |
| `NEXT_PUBLIC_BASE_URL` | ❌ | 사이트 기본 URL | `https://wish-archive.vercel.app` |
| `NODE_ENV` | ❌ | 환경 모드 | `production` |
| `DEBUG` | ❌ | 디버그 로그 활성화 | `true` / `false` |

### `.env.local` vs `.env`

```bash
# Development
.env.local      # 로컬 개발용 (Git 무시)
.env            # 템플릿 (Git 추적 가능, 실제 값 없음)

# Production (Vercel)
# Vercel 대시보드에서 직접 설정
```

---

## 🗄️ 데이터베이스 설정 (Supabase)

### Step 1: Supabase 프로젝트 생성

1. [Supabase 대시보드](https://app.supabase.com) 접속
2. **New Project** 클릭
3. 프로젝트 정보 입력:
   - **Name**: `wish-archive`
   - **Database Password**: 강력한 비밀번호 생성 (저장 필수!)
   - **Region**: `Northeast Asia (Seoul)` 또는 `Southeast Asia (Singapore)`
   - **Pricing Plan**: Free

4. **Create new project** 클릭 (약 2분 소요)

### Step 2: Connection String 가져오기

1. 프로젝트 대시보드 → **Settings** → **Database**
2. **Connection string** 섹션 → **URI** 탭
3. Connection string 복사:

```
postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijk.supabase.co:5432/postgres
```

4. `.env` 파일에 `DATABASE_URL`로 추가
5. `[YOUR-PASSWORD]`를 실제 비밀번호로 교체

### Step 3: Connection Pooling 활성화 (권장)

Vercel 서버리스 환경에서는 Connection Pooler 사용 권장:

1. **Database** → **Connection pooling** 활성화
2. **Transaction mode** 선택
3. Pooler URL 복사:

```
postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-ap-northeast-1.pooler.supabase.com:6543/postgres
```

4. `.env`에 추가:

```env
# Direct connection (마이그레이션용)
DATABASE_URL="postgresql://postgres:..."

# Pooler connection (런타임용)
DATABASE_URL_POOLER="postgresql://postgres...pooler.supabase.com:6543/postgres"
```

### Step 4: Prisma 스키마 설정 확인

`prisma/schema.prisma`에서 URL 확인:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DATABASE_URL") // 마이그레이션용
}
```

---

## 🖼️ 이미지 CDN 설정 (Cloudinary)

### Step 1: Cloudinary 계정 생성

1. [Cloudinary 가입 페이지](https://cloudinary.com/users/register/free) 접속
2. 이메일로 가입 또는 GitHub 연동
3. **Plan**: Free tier 선택

### Step 2: API 자격 증명 가져오기

1. [Cloudinary Console](https://console.cloudinary.com) 접속
2. **Dashboard** 화면에서 다음 정보 확인:
   - **Cloud Name**: `dcexample123`
   - **API Key**: `123456789012345`
   - **API Secret**: `abc123...` (Show 클릭)

### Step 3: 환경 변수 설정

`.env` 파일에 추가:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dcexample123"
CLOUDINARY_API_KEY="123456789012345"
CLOUDINARY_API_SECRET="abc123secretkey456"
```

### Step 4: 폴더 구조 생성

Cloudinary Media Library에서 폴더 생성:

```
nct-wish/
├── albums/
│   ├── 00_handsup/
│   ├── 01_wish/
│   ├── 02_songbird/
│   └── ...
├── events/
│   ├── 2024/
│   │   ├── 0221_debut/
│   │   └── ...
│   └── 2025/
├── members/
│   ├── sion/
│   ├── riku/
│   ├── yushi/
│   └── ...
└── widgets/
    ├── polaroid/
    └── photocard/
```

### Step 5: Upload Presets 설정 (선택)

관리자가 이미지를 업로드할 때 사용:

1. **Settings** → **Upload**
2. **Upload presets** → **Add upload preset**
3. 설정:
   - **Preset name**: `wish-archive-unsigned`
   - **Signing Mode**: Unsigned
   - **Folder**: `nct-wish`
   - **Allowed formats**: jpg, png, webp, gif

---

## ☁️ Vercel 배포

### Step 1: GitHub Repository 연결

```bash
# GitHub에 푸시
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/wish-archive.git
git push -u origin main
```

### Step 2: Vercel에 Import

1. [Vercel 대시보드](https://vercel.com/dashboard) 접속
2. **Add New...** → **Project** 클릭
3. **Import Git Repository** → GitHub 연동
4. Repository 선택: `wish-archive`
5. **Import** 클릭

### Step 3: 프로젝트 설정

**Configure Project** 화면에서:

```yaml
Framework Preset: Next.js
Root Directory: ./
Build Command: npm run build (자동 감지)
Output Directory: .next (자동 감지)
Install Command: npm install
```

### Step 4: 환경 변수 추가

**Environment Variables** 섹션에서 추가:

| Name | Value | Environment |
|------|-------|-------------|
| `DATABASE_URL` | `postgresql://...` | Production, Preview |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | `dcexample123` | Production, Preview, Development |
| `CLOUDINARY_API_KEY` | `123456...` | Production, Preview |
| `CLOUDINARY_API_SECRET` | `abc123...` | Production, Preview |

**중요**: `NEXT_PUBLIC_*` 변수는 모든 환경에 추가해야 합니다!

### Step 5: 배포 실행

1. **Deploy** 버튼 클릭
2. 빌드 로그 확인 (약 2-3분 소요)
3. 성공 시 자동으로 URL 생성: `https://wish-archive.vercel.app`

### Step 6: 배포 확인

```bash
# Production URL 접속
https://wish-archive.vercel.app

# API 엔드포인트 테스트
https://wish-archive.vercel.app/api/group
```

---

## 🔧 데이터베이스 마이그레이션

### 로컬 개발 환경

```bash
# 1. Prisma 클라이언트 생성
npx prisma generate

# 2. 마이그레이션 실행
npx prisma migrate deploy

# 3. Prisma Studio로 확인
npx prisma studio
```

### Production 환경 (Vercel)

#### 방법 1: 로컬에서 마이그레이션

```bash
# Production DATABASE_URL 사용
DATABASE_URL="postgresql://postgres:...@db.xxx.supabase.co:5432/postgres" \
npx prisma migrate deploy
```

#### 방법 2: Vercel CLI 사용

```bash
# Vercel CLI 설치
npm i -g vercel

# Vercel 로그인
vercel login

# 프로젝트 링크
vercel link

# 환경 변수 가져오기
vercel env pull .env.production

# 마이그레이션 실행
npx prisma migrate deploy
```

#### 방법 3: GitHub Actions (자동화)

`.github/workflows/migrate.yml`:

```yaml
name: Database Migration

on:
  push:
    branches: [main]
    paths:
      - 'prisma/migrations/**'

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: npx prisma migrate deploy
```

**GitHub Secrets 설정**:
1. Repository → **Settings** → **Secrets and variables** → **Actions**
2. **New repository secret** 클릭
3. `DATABASE_URL` 추가

### 마이그레이션 히스토리 확인

```bash
# 로컬에서 확인
npx prisma migrate status

# Supabase에서 확인
psql $DATABASE_URL -c "SELECT * FROM _prisma_migrations ORDER BY finished_at DESC LIMIT 10;"
```

---

## 🌱 시드 데이터 삽입

### Step 1: 시드 스크립트 확인

`prisma/seed.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 00-group.ts ~ 14-awards.ts 순차 실행
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
```

### Step 2: 로컬에서 시드 실행

```bash
# 기본 시드
npm run db:seed

# 데이터베이스 초기화 + 마이그레이션 + 시드 (전체 리셋)
npm run db:fresh

# 디버그 모드
DEBUG=true npm run db:seed
```

### Step 3: Production 시드

```bash
# Production DATABASE_URL로 실행
DATABASE_URL="postgresql://..." npm run db:seed
```

### Step 4: 시드 검증

```bash
# Prisma Studio로 확인
npx prisma studio

# SQL 쿼리로 확인
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"Group\";"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"Member\";"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM \"Album\";"
```

예상 결과:
- Group: 1개 (NCT WISH)
- Member: 6명
- Album: 11개
- Track: 66곡
- Event: 100개 이상

---

## 🌐 도메인 설정

### 기본 도메인 (무료)

Vercel은 자동으로 다음 도메인을 제공합니다:

```
https://wish-archive.vercel.app
https://wish-archive-kelly.vercel.app (개인 도메인)
```

### 커스텀 도메인 연결

#### Step 1: 도메인 구매

- **Namecheap**: [namecheap.com](https://www.namecheap.com)
- **GoDaddy**: [godaddy.com](https://www.godaddy.com)
- **Cloudflare Registrar**: [cloudflare.com](https://www.cloudflare.com)

예: `nctwish.com`

#### Step 2: Vercel에 도메인 추가

1. Vercel 프로젝트 → **Settings** → **Domains**
2. **Add Domain** 클릭
3. 도메인 입력: `nctwish.com`
4. **Add** 클릭

#### Step 3: DNS 레코드 설정

도메인 제공업체(Namecheap, GoDaddy 등)에서 다음 레코드 추가:

**A 레코드** (Apex 도메인용):
```
Type: A
Name: @
Value: 76.76.21.21
```

**CNAME 레코드** (www 서브도메인용):
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Step 4: SSL 인증서 (자동)

Vercel이 자동으로 Let's Encrypt SSL 인증서 발급 (약 10분 소요)

---

## 🔄 CI/CD 파이프라인

### Vercel 자동 배포

Vercel은 기본적으로 GitHub와 연동되어 자동 배포됩니다:

| Branch | 배포 환경 | URL |
|--------|----------|-----|
| `main` | Production | `wish-archive.vercel.app` |
| `develop` | Preview | `wish-archive-git-develop-kelly.vercel.app` |
| PR 브랜치 | Preview | `wish-archive-pr-123-kelly.vercel.app` |

### GitHub Actions 워크플로우

#### 1. Linting & Type Check

`.github/workflows/ci.yml`:

```yaml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run ESLint
        run: npm run lint
      
      - name: Type check
        run: npx tsc --noEmit
```

#### 2. 데이터베이스 백업

`.github/workflows/backup.yml`:

```yaml
name: Database Backup

on:
  schedule:
    - cron: '0 0 * * 0' # 매주 일요일 자정 (UTC)
  workflow_dispatch: # 수동 실행

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - name: Backup Database
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: |
          pg_dump $DATABASE_URL > backup_$(date +%Y%m%d).sql
      
      - name: Upload to S3 (선택)
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_KEY }}
          aws-region: ap-northeast-2
      
      - run: |
          aws s3 cp backup_$(date +%Y%m%d).sql s3://wish-archive-backups/
```

---

## 📊 모니터링 및 로깅

### Vercel Analytics

1. Vercel 프로젝트 → **Analytics** 탭
2. 무료 플랜: 월 100K 이벤트
3. 확인 가능 항목:
   - Page Views
   - Unique Visitors
   - Top Pages
   - Web Vitals (CLS, FCP, LCP)

### Vercel Speed Insights

```typescript
// src/app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

설치:
```bash
npm install @vercel/speed-insights
```

### Supabase Logs

1. Supabase 대시보드 → **Database** → **Logs**
2. 확인 가능 항목:
   - Query Performance
   - Slow Queries
   - Connection Pool Status

### Sentry (에러 트래킹)

```bash
# 설치
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

`.env`:
```env
NEXT_PUBLIC_SENTRY_DSN="https://...@sentry.io/..."
SENTRY_AUTH_TOKEN="..."
```

---

## 🐛 트러블슈팅

### 1. 빌드 에러: "Cannot find module '@prisma/client'"

**원인**: Prisma Client가 생성되지 않음

**해결**:
```bash
npx prisma generate
npm run build
```

Vercel에서는 `postinstall` 스크립트 추가:

```json
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

---

### 2. 런타임 에러: "PrismaClientInitializationError"

**원인**: DATABASE_URL 환경 변수 없음

**해결**:
1. Vercel 대시보드 → **Settings** → **Environment Variables**
2. `DATABASE_URL` 추가
3. **Redeploy** 클릭

---

### 3. 이미지가 표시되지 않음 (Cloudinary)

**원인**: CORS 또는 환경 변수 오류

**해결**:
1. Cloudinary Console → **Settings** → **Security**
2. **Allowed fetch domains** 추가: `*.vercel.app`
3. `.env` 확인:
   ```env
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="dcexample123"
   ```

---

### 4. 데이터베이스 연결 실패 (Supabase)

**원인**: Connection Pool 고갈

**해결**:
1. Supabase → **Database** → **Connection Pooling** 활성화
2. Prisma 스키마 수정:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL_POOLER")
     directUrl = env("DATABASE_URL")
   }
   ```
3. `.env` 추가:
   ```env
   DATABASE_URL="postgresql://...@db.xxx.supabase.co:5432/postgres"
   DATABASE_URL_POOLER="postgresql://...@pooler.supabase.com:6543/postgres"
   ```

---

### 5. ISR 캐싱 문제

**원인**: `revalidate` 설정 미적용

**해결**:
```typescript
// src/app/api/widgets/dday/route.ts
export const revalidate = 86400; // 24시간

// 또는 강제 재검증
await fetch('/api/widgets/dday', { cache: 'no-store' });
```

Vercel에서 캐시 초기화:
```bash
vercel --prod --force
```

---

### 6. 환경 변수 업데이트가 반영되지 않음

**원인**: 재배포 필요

**해결**:
1. 환경 변수 변경 후 **Redeploy** 버튼 클릭
2. 또는 빈 커밋으로 재배포:
   ```bash
   git commit --allow-empty -m "Trigger redeploy"
   git push
   ```

---

### 7. 느린 API 응답 속도

**원인**: 
- N+1 쿼리 문제
- 인덱스 부재
- Connection Pool 설정 부족

**해결**:

**A. Prisma Include 최적화**:
```typescript
// ❌ N+1 쿼리
const albums = await prisma.album.findMany();
for (const album of albums) {
  const tracks = await prisma.track.findMany({ where: { albumId: album.id } });
}

// ✅ Include로 한 번에
const albums = await prisma.album.findMany({
  include: { tracks: true }
});
```

**B. 인덱스 추가**:
```prisma
model Event {
  date DateTime
  
  @@index([date])
}
```

**C. Connection Pool 설정**:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL_POOLER")
}
```

---

### 8. Vercel Function Timeout (10초 제한)

**원인**: 서버리스 함수 실행 시간 초과 (Hobby 플랜: 10초)

**해결**:

**A. 쿼리 최적화**:
```typescript
// Select로 필요한 필드만
const members = await prisma.member.findMany({
  select: {
    id: true,
    stageName: true,
    profileImageUrl: true
  }
});
```

**B. 페이지네이션**:
```typescript
const events = await prisma.event.findMany({
  take: 20,
  skip: (page - 1) * 20
});
```

**C. ISR 사용** (API Route):
```typescript
export const revalidate = 3600; // 1시간 캐시
```

---

## 📝 배포 체크리스트

### 배포 전

- [ ] `.env` 파일 설정 완료
- [ ] Supabase 프로젝트 생성
- [ ] Cloudinary 계정 설정
- [ ] GitHub에 코드 푸시
- [ ] `npm run build` 로컬 빌드 성공
- [ ] Prisma 마이그레이션 테스트 완료

### Vercel 설정

- [ ] GitHub Repository 연결
- [ ] 환경 변수 추가 (최소 4개)
- [ ] Build & Output 설정 확인
- [ ] 첫 배포 성공

### 데이터베이스

- [ ] Supabase 마이그레이션 실행
- [ ] 시드 데이터 삽입
- [ ] Prisma Studio로 데이터 확인
- [ ] Connection Pooling 활성화

### CDN

- [ ] Cloudinary 폴더 구조 생성
- [ ] 이미지 업로드 (앨범 커버, 멤버 프로필)
- [ ] Gallery API 테스트

### 테스트

- [ ] `/api/group` 응답 확인
- [ ] `/api/members` 응답 확인
- [ ] `/api/gallery` 이미지 로드 확인
- [ ] Desktop UI 정상 작동 확인
- [ ] 모바일 반응형 테스트

### 모니터링

- [ ] Vercel Analytics 활성화
- [ ] Speed Insights 설치
- [ ] Sentry 에러 트래킹 설정 (선택)

---

## 🚀 배포 후 최적화

### 1. 이미지 최적화

```typescript
// next.config.ts
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/avif', 'image/webp'],
  },
};
```

### 2. Bundle Size 최적화

```bash
# Bundle 분석
npm install -D @next/bundle-analyzer

# next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);

# 실행
ANALYZE=true npm run build
```

### 3. 캐싱 전략

```typescript
// API Routes
export const revalidate = 3600; // 1시간

// Page
export const revalidate = 86400; // 24시간

// Dynamic
export const dynamic = 'force-dynamic'; // 캐싱 안 함
```

---

## 📚 참고 자료

### 공식 문서

- [Next.js 배포](https://nextjs.org/docs/deployment)
- [Vercel 문서](https://vercel.com/docs)
- [Supabase 가이드](https://supabase.com/docs/guides/database)
- [Cloudinary 문서](https://cloudinary.com/documentation)
- [Prisma 배포 가이드](https://www.prisma.io/docs/guides/deployment)

### 관련 문서

- [ARCHITECTURE.md](./ARCHITECTURE.md) - 시스템 아키텍처
- [DATABASE.md](./DATABASE.md) - 데이터베이스 스키마
- [API_REFERENCE.md](./API_REFERENCE.md) - API 명세

---

**Last Updated:** 2025-12-29  
**Deployment Platform:** Vercel  
**Database:** Supabase PostgreSQL  
**CDN:** Cloudinary  
**Author:** Kelly
