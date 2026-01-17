# 🌟 WISH Archive

> **NCT WISH 공식 팬 아카이브 웹사이트**  
> Windows 95/XP 스타일의 레트로 데스크톱 UI로 구현된 그룹 활동 기록 및 팬 커뮤니티 플랫폼

---

## 📖 프로젝트 소개

**WISH Archive**는 K-POP 그룹 **NCT WISH**의 활동 기록을 체계적으로 보존하고, 팬들이 추억을 공유할 수 있는 인터랙티브 웹 아카이브입니다.

### 주요 특징

- 📚 **완전한 아카이빙**: 데뷔부터 현재까지의 모든 활동 기록
- 🎨 **레트로 감성**: Windows 95/XP 스타일의 독특한 UI/UX
- 💿 **디스코그래피**: 앨범, 수록곡, 가사 정보
- 🖼️ **갤러리**: 사진, 화보, 비디오 아카이브
- 💬 **커뮤니티**: 팬 방명록 및 소원함
- 📊 **데이터 시각화**: 차트, 판매량, 인증 통계

---

## 🛠 기술 스택

### Frontend
- **Framework**: Next.js 16.0.8 (App Router)
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.17
- **State Management**: Zustand 5.0.9
- **UI Components**: react-rnd, react-draggable, lucide-react

### Backend & Database
- **Database**: PostgreSQL 15+ (Supabase)
- **ORM**: Prisma 7.2.0
- **Image CDN**: Cloudinary 2.8.0
- **Hosting**: Vercel (예정)

---

## 🚀 시작하기

### 사전 요구사항

- Node.js 20.x 이상
- PostgreSQL 데이터베이스 (또는 Supabase)

### 설치

```bash
# 저장소 클론
git clone https://github.com/YOUR_USERNAME/wish-archive.git
cd wish-archive

# 의존성 설치
npm install

# 환경 변수 설정 (.env 파일 생성)
cp .env.example .env
# DATABASE_URL, CLOUDINARY_* 등 환경 변수 설정

# 데이터베이스 마이그레이션
npx prisma migrate dev

# 시드 데이터 삽입 (선택사항)
npm run db:seed

# 개발 서버 시작
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### 주요 명령어

```bash
# 개발
npm run dev          # 개발 서버 시작
npm run build        # 프로덕션 빌드
npm run start        # 프로덕션 서버 시작
npm run lint         # ESLint 실행

# 데이터베이스
npm run db:seed      # 시드 데이터 삽입
npm run db:reset     # DB 초기화
npm run db:fresh     # DB 리셋 + 시드

# Prisma
npx prisma studio    # 데이터베이스 GUI
npx prisma generate  # Prisma Client 재생성
```

---

## 📁 프로젝트 구조

```
wish-archive/
├── docs/                  # 📚 프로젝트 문서
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # React 컴포넌트
│   │   ├── apps/         # 데스크톱 앱
│   │   ├── os/           # OS 시스템 컴포넌트
│   │   ├── ui/           # UI 컴포넌트
│   │   └── widgets/      # 위젯
│   └── lib/              # 유틸리티 함수
├── prisma/               # 데이터베이스
│   ├── schema.prisma     # 스키마 정의
│   ├── migrations/       # 마이그레이션
│   └── seeds/            # 시드 데이터
└── public/               # 정적 파일
```

---

## 📚 문서

프로젝트의 상세한 문서는 `docs/` 디렉토리에서 확인할 수 있습니다:

- **[PROJECT_OVERVIEW.md](./docs/PROJECT_OVERVIEW.md)** - 프로젝트 전체 개요
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - 시스템 아키텍처
- **[DATABASE.md](./docs/DATABASE.md)** - 데이터베이스 스키마
- **[FILE_STRUCTURE.md](./docs/FILE_STRUCTURE.md)** - 파일 구조 가이드
- **[API_REFERENCE.md](./docs/API_REFERENCE.md)** - API 명세
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - 배포 가이드
- **[TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)** - 문제 해결 가이드

---

## 🎨 주요 기능

### 1. 데스크톱 OS 인터페이스
- 드래그 가능한 창 시스템
- 최소화/최대화 기능
- 작업 표시줄 및 시작 메뉴
- 바탕화면 아이콘

### 2. 주요 애플리케이션
- **My WISH**: 그룹 및 멤버 프로필
- **WISH Archive**: 활동 타임라인
- **Discography**: 앨범 및 수록곡
- **WISH Gallery**: 사진/비디오 갤러리
- **WISH World**: 외부 링크 모음
- **To. WISH**: 팬 방명록

### 3. 데스크톱 위젯
- D-Day 카운터
- 미니 플레이어
- 멤버 명언
- 포토카드
- 폴라로이드
- 스티키 노트
- 위슈 다마고치
- 소원 항아리

---

## 🔧 개발 로드맵

### ✅ Phase 1 - 기본 시스템 (완료)
- [x] Next.js 16 + TypeScript 프로젝트 세팅
- [x] Prisma + PostgreSQL 데이터베이스
- [x] 창 관리 시스템
- [x] 기본 데스크톱 UI
- [x] 주요 앱 컴포넌트
- [x] 위젯 시스템

### 🚧 Phase 2 - 기능 확장 (진행 중)
- [ ] 반응형 디자인 완벽 구현
- [ ] To. WISH 방명록 시스템
- [ ] 갤러리 자동화
- [ ] 검색 기능
- [ ] 다국어 지원

### 📅 Phase 3 - 최적화 및 배포 (예정)
- [ ] 성능 최적화
- [ ] SEO 최적화
- [ ] 프로덕션 배포

---

## 📄 라이선스

이 프로젝트는 개인 팬 프로젝트이며, NCT WISH 및 SM Entertainment와 공식적인 관련이 없습니다.

---

## 🙏 감사의 말

NCT WISH와 NCTzen WISH 여러분께 감사드립니다. 💚

---

**Last Updated**: 2026-01-17  
**Version**: 0.1.0  
**Author**: Park Ju Eul (rope_park)
