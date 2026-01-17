# 🌟 WISH Archive - 프로젝트 개요

> **NCT WISH 공식 팬 아카이브 웹사이트**  
> Windows 95/XP 스타일의 레트로 데스크톱 UI로 구현된 그룹 활동 기록 및 팬 커뮤니티 플랫폼

---

## 📋 목차

1. [프로젝트 소개](#-프로젝트-소개)
2. [핵심 기능](#-핵심-기능)
3. [기술 스택](#-기술-스택)
4. [프로젝트 구조](#-프로젝트-구조)
5. [시작하기](#-시작하기)
6. [주요 특징](#-주요-특징)
7. [개발 로드맵](#-개발-로드맵)

---

## 🎯 프로젝트 소개

**WISH Archive**는 K-POP 그룹 **NCT WISH**의 활동 기록을 체계적으로 보존하고, 팬들이 추억을 공유할 수 있는 인터랙티브 웹 아카이브입니다.

### 프로젝트 목적

- 📚 **아카이빙**: 데뷔부터 현재까지의 모든 활동 기록 (음반, 공연, 방송, 화보 등)
- 🎨 **팬 경험**: 레트로 감성의 Windows OS UI를 통한 독특한 사용자 경험
- 💬 **커뮤니티**: 팬들이 소원을 남기고 추억을 공유하는 공간
- 📊 **데이터 시각화**: 차트, 판매량, 인증 등 통계 데이터 제공

### 디자인 컨셉

- **Windows 95/XP Retro UI**: 향수를 자극하는 클래식 OS 인터페이스
- **인터랙티브 데스크톱**: 드래그 가능한 창, 최소화/최대화 기능
- **커스터마이징 가능한 위젯**: 바탕화면에 배치 가능한 다양한 위젯들
- **반응형 디자인**: 데스크톱 및 모바일 환경 모두 지원

---

## ✨ 핵심 기능

### 1. 데스크톱 OS 인터페이스

- **창 관리 시스템**: 여러 앱 창을 동시에 열고 관리 (드래그, 리사이즈, 최소화/최대화)
- **작업 표시줄**: 열린 앱 목록, 시작 메뉴, 시스템 트레이
- **바탕화면 아이콘**: 더블클릭으로 앱 실행

### 2. 주요 애플리케이션

| 앱 이름 | 기능 | 아이콘 |
|--------|------|--------|
| **My WISH** | 그룹 및 멤버 프로필, 소개 | 📁 |
| **WISH Archive** | 타임라인 형식의 활동 기록 | 🗓️ |
| **Discography** | 앨범, 수록곡, 가사 정보 | 💿 |
| **WISH Gallery** | 사진, 화보, 비디오 갤러리 | 🖼️ |
| **WISH World** | 외부 링크 모음 (SNS, 스트리밍 등) | 🌐 |
| **To. WISH** | 팬 방명록/소원함 | 💌 |
| **README.txt** | 사이트 사용 가이드 | 📄 |
| **Recycle Bin** | 휴지통 | 🗑️ |

### 3. 데스크톱 위젯

- **📅 D-Day Counter**: 중요한 날짜까지 남은 일수
- **🎵 Mini Player**: 음악 재생 위젯
- **💬 Members Quote**: 멤버들의 명언/발언
- **🃏 Photo Card**: 포토카드 컬렉션
- **📸 Polaroid Photo**: 폴라로이드 스타일 사진
- **📝 Sticky Note**: 메모장 위젯
- **🎮 Wichu Tamagotchi**: 위슈 다마고치 게임
- **🏺 Wish Jar**: 소원 항아리

### 4. 데이터베이스 기능

- 완전한 디스코그래피 (앨범, 트랙, 크레딧)
- 이벤트 타임라인 (음방, 콘서트, 예능, 팬미팅 등)
- 차트 성적 및 판매량 기록
- 음반 인증 (골드, 플래티넘 등)
- 멤버별 개인 활동 기록

---

## 🛠 기술 스택

### Frontend

| 기술 | 버전 | 용도 |
|-----|------|------|
| **Next.js** | 16.0.8 | React 프레임워크, App Router |
| **React** | 19.2.0 | UI 라이브러리 |
| **TypeScript** | 5.9.3 | 타입 안정성 |
| **Tailwind CSS** | 4.1.17 | 유틸리티 기반 스타일링 |
| **Zustand** | 5.0.9 | 클라이언트 상태 관리 |
| **Framer Motion** | 12.23.25 | 애니메이션 (devDep) |

### UI/UX 라이브러리

- **react-rnd** (10.5.2): 드래그 & 리사이즈 가능한 창
- **react-draggable** (4.5.0): 위젯 드래그
- **lucide-react** (0.554.0): 아이콘
- **recharts** (3.6.0): 차트 시각화
- **three.js** (0.181.2): 3D 그래픽 (타마고치 등)
- **react-markdown** (10.1.0): 마크다운 렌더링
- **react-player** (3.4.0): 비디오 재생
- **react-datepicker** (8.10.0): 날짜 선택
- **axios** (1.13.2): HTTP 클라이언트
- **date-fns** (4.1.0): 날짜 유틸리티

### Backend & Database

| 기술 | 버전 | 용도 |
|-----|------|------|
| **PostgreSQL** | 15+ | 메인 데이터베이스 |
| **Prisma** | 7.2.0 | ORM (스키마, 마이그레이션, 쿼리) |
| **Supabase** | 2.83.0 | DB 호스팅 및 인증 |
| **Cloudinary** | 2.8.0 | 이미지/비디오 스토리지 및 최적화 |

### 개발 도구

- **ESLint** + **TypeScript**: 코드 품질 관리
- **PostCSS** + **Autoprefixer**: CSS 전처리
- **tsx**: TypeScript 실행 (시드 스크립트)

---

## 📁 프로젝트 구조

```
wish-archive/
├── docs/                      # 📚 프로젝트 문서
│   ├── PROJECT_OVERVIEW.md    # 이 문서
│   ├── FILE_STRUCTURE.md      # 폴더/파일 구조 상세
│   ├── ARCHITECTURE.md        # 시스템 아키텍처
│   ├── DATABASE.md            # DB 스키마 설명
│   └── API_REFERENCE.md       # API 엔드포인트 명세
│
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── page.tsx           # 메인 데스크톱 화면
│   │   ├── layout.tsx         # 루트 레이아웃
│   │   ├── api/               # API Routes (서버리스 함수)
│   │   ├── stores/            # Zustand 전역 상태
│   │   ├── fonts/             # 로컬 폰트 파일
│   │   └── styles/            # 전역 CSS
│   │
│   ├── components/            # React 컴포넌트
│   │   ├── apps/              # 데스크톱 앱 컴포넌트
│   │   ├── os/                # OS 시스템 컴포넌트
│   │   ├── ui/                # 재사용 가능한 UI 컴포넌트
│   │   └── widgets/           # 데스크톱 위젯
│   │
│   ├── lib/                   # 유틸리티 함수
│   ├── hooks/                 # 커스텀 React Hooks
│   └── server/                # 서버 측 로직 (예정)
│       ├── repos/             # Repository 패턴
│       ├── services/          # 비즈니스 로직
│       └── validators/        # 데이터 검증
│
├── prisma/
│   ├── schema.prisma          # DB 스키마 정의
│   ├── seed.ts                # 시드 데이터 진입점
│   ├── seeds/                 # 시드 데이터 파일들
│   └── migrations/            # 마이그레이션 히스토리
│
├── public/
│   ├── system/                # OS 시스템 리소스
│   │   ├── icons/             # 앱/파일 아이콘
│   │   ├── cursors/           # 커스텀 커서
│   │   ├── sounds/            # 효과음
│   │   └── wallpapers/        # 배경화면 이미지
│   └── content/               # 콘텐츠 파일 (앨범, 멤버 등)
│
├── 3D_asset/                  # 3D 모델 원본 파일
├── content/                   # HTML 콘텐츠 파일
└── reference/                 # 참고 자료
```

---

## 🚀 시작하기

### 사전 요구사항

- **Node.js** 20.x 이상
- **npm** 또는 **yarn**, **pnpm**, **bun**
- **PostgreSQL** 데이터베이스 (Supabase 사용 권장)

### 설치 및 실행

```bash
# 1. 저장소 클론
git clone [repository-url]
cd wish-archive

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
# .env 파일 생성 후 다음 항목 설정:
# - DATABASE_URL (PostgreSQL 연결 문자열)
# - DIRECT_URL (Prisma 직접 연결용)
# - NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
# - CLOUDINARY_API_KEY
# - CLOUDINARY_API_SECRET

# 4. 데이터베이스 마이그레이션
npx prisma migrate dev

# 5. 시드 데이터 삽입 (선택사항)
npm run db:seed

# 6. 개발 서버 시작
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
npm run db:reset     # DB 초기화 (주의!)
npm run db:fresh     # DB 리셋 + 시드

# Prisma 유틸리티
npx prisma studio    # 데이터베이스 GUI
npx prisma generate  # Prisma Client 재생성
```

---

## 🌟 주요 특징

### 1. **완전한 창 관리 시스템**
- Zustand 기반 중앙집중식 상태 관리
- Z-Index 자동 관리로 포커스 제어
- 창 최소화/최대화 상태 저장 및 복원
- 드래그 앤 드롭 자유로운 창 배치

### 2. **반응형 위젯 시스템**
- 뷰포트 크기에 따라 동적으로 위젯 표시/숨김
- 드래그 가능한 위젯 (react-draggable)
- 로컬 스토리지에 위치 저장
- 모바일/태블릿/데스크톱 별도 레이아웃

### 3. **포괄적인 데이터 모델**
- 15개 이상의 ENUM 타입으로 데이터 표준화
- 외래 키 관계로 데이터 무결성 보장
- 시간대 정보 포함 (DateTime with timezone)
- 다국어 지원 (한국어, 일본어, 영어) (예정)

### 4. **최적화된 이미지 처리**
- Cloudinary를 통한 자동 이미지 최적화
- 반응형 이미지 제공 (예정)
- Lazy loading 지원

### 5. **접근성 및 UX**
- 터치 디바이스 감지 및 대응
- 키보드 네비게이션 (예정)
- 스크린 리더 호환성 고려
- 작은 화면 감지 및 경고 표시

---

## 🎨 디자인 시스템

### 폰트

| 폰트 이름 | 용도 | CSS 변수 |
|----------|------|----------|
| **Neo둥근모 Pro** | UI 요소, 제목 (픽셀 폰트) | `--font-pixel` |
| **평진고딕** | 본문, 가독성 필요 영역 | `--font-gothic` |
| **새로씨신비** | 손글씨 (메모장, 폴라로이드) | `--font-hand` |
| **D2 Coding** | 코드, 터미널 | `--font-code` |

### 테마

- **공식 컬러**: Pearl Neo Champagne
- **배경**: 그라디언트 + 노이즈 텍스처
- **창 스타일**: Windows 클래식 테마 (회색 타이틀바, 3D 버튼)

---

## 📊 데이터베이스 개요

### 핵심 모델

1. **Group** - 그룹 기본 정보
2. **Member** - 멤버 프로필
3. **Album** - 음반 정보
4. **Track** - 수록곡
5. **Event** - 활동 일정 (음방, 콘서트, 예능 등)
6. **Chart** - 차트 성적
7. **Certification** - 음반 인증
8. **Widget** - 위젯 데이터

상세한 스키마는 [DATABASE.md](./DATABASE.md)를 참고하세요.

---

## 🔧 개발 로드맵

### ✅ Phase 1 - 기본 시스템 (완료)
- [x] Next.js 16 + TypeScript 프로젝트 세팅
- [x] Prisma + PostgreSQL 데이터베이스 구축
- [x] 창 관리 시스템 (Zustand)
- [x] 기본 데스크톱 UI
- [x] 주요 앱 컴포넌트 (Discography, Gallery 등)
- [x] 위젯 시스템

### 🚧 Phase 2 - 기능 확장 (진행 중)
- [ ] 반응형 디자인 완벽 구현 (모바일/태블릿/데스크톱 지원)
- [ ] To. WISH 방명록 시스템
- [ ] 시드 데이터 추가 자동화
- [ ] 갤러리 이미지 업로드 자동화 (Cloudinary 연동(태깅, 파일 이름 규칙 등 자동화, 중복 사진 방지))
- [ ] 이벤트 및 갤러리에서 검색 기능
- [ ] 다국어 지원 (i18n)

### 📅 Phase 3 - 고급 기능 (예정)
- [ ] 실시간 알림 시스템
- [ ] 소셜 공유 기능
- [ ] 다크 모드
- [ ] PWA (Progressive Web App)

### 🎯 Phase 4 - 최적화 및 배포 (예정)
- [ ] 성능 최적화 (Lighthouse 90+ 목표)
- [ ] SEO 최적화
- [ ] 애널리틱스 통합
- [ ] 프로덕션 배포 (Vercel)

---

## 📝 문서 가이드

- **[FILE_STRUCTURE.md](./FILE_STRUCTURE.md)** - 폴더/파일 구조 상세 설명
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 시스템 아키텍처 및 데이터 흐름
- **[DATABASE.md](./DATABASE.md)** - 데이터베이스 스키마 및 관계
- **[API_REFERENCE.md](./API_REFERENCE.md)** - API 엔드포인트 명세
- **[COMPONENTS.md](./COMPONENTS.md)** - 컴포넌트 사용 가이드 (작성 예정)
- **[DEV_GUIDE.md](./DEV_GUIDE.md)** - 개발자 가이드 (작성 예정)

---

## 👥 기여하기

프로젝트 기여를 환영합니다! 이슈 제출, 기능 제안, Pull Request 등 자유롭게 참여해주세요.

---

## 📄 라이선스

이 프로젝트는 개인 팬 프로젝트이며, NCT WISH 및 SM Entertainment와 공식적인 관련이 없습니다.

---

## 🙏 감사의 말

NCT WISH와 NCTzen WISH 여러분께 감사드립니다. 💚

---

**Last Updated:** 2026-01-17  
**Version:** 0.1.0  
**Author:** Park Ju Eul (rope_park)
