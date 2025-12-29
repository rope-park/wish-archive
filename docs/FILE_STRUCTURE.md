# 📂 WISH Archive - 파일 구조 가이드

> 프로젝트의 모든 폴더와 파일에 대한 상세한 설명과 역할 정의

---

## 📋 목차

1. [전체 구조 개요](#-전체-구조-개요)
2. [루트 디렉토리](#-루트-디렉토리)
3. [src/ - 소스 코드](#-src---소스-코드)
4. [prisma/ - 데이터베이스](#-prisma---데이터베이스)
5. [public/ - 정적 파일](#-public---정적-파일)
6. [기타 디렉토리](#-기타-디렉토리)
7. [파일 명명 규칙](#-파일-명명-규칙)

---

## 🌳 전체 구조 개요

```
wish-archive/
├── 📄 설정 파일들 (루트)
├── 📁 3D_asset/              # 3D 모델 원본 파일 (.blend)
├── 📁 content/               # HTML 콘텐츠 파일
├── 📁 docs/                  # 📚 프로젝트 문서
├── 📁 prisma/                # 🗄️ 데이터베이스 (스키마, 마이그레이션, 시드)
├── 📁 public/                # 🌐 정적 파일 (이미지, 사운드 등)
├── 📁 reference/             # 참고 자료
└── 📁 src/                   # 💻 소스 코드
    ├── 📁 app/               # Next.js App Router
    ├── 📁 components/        # React 컴포넌트
    └── 📁 lib/               # 유틸리티 함수
```

---

## 📄 루트 디렉토리

### 설정 파일

| 파일 | 용도 | 설명 |
|-----|------|------|
| `package.json` | 프로젝트 메타데이터 | 의존성, 스크립트, 프로젝트 정보 |
| `tsconfig.json` | TypeScript 설정 | 컴파일러 옵션, 경로 별칭 설정 |
| `next.config.ts` | Next.js 설정 | 빌드, 이미지 최적화, 환경변수 등 |
| `tailwind.config.cjs` | Tailwind CSS 설정 | 테마, 플러그인, 컨텐츠 경로 |
| `postcss.config.mjs` | PostCSS 설정 | CSS 후처리 플러그인 |
| `eslint.config.mjs` | ESLint 설정 | 코드 린팅 규칙 |
| `.env` | 환경 변수 | DB 연결, API 키 등 (Git 제외) |
| `.gitignore` | Git 제외 파일 | node_modules, .env 등 |
| `LICENSE` | 라이선스 | 프로젝트 라이선스 정보 |
| `README.md` | 프로젝트 소개 | 기본 설명 및 시작 가이드 |

### TypeScript 선언 파일

| 파일 | 용도 |
|-----|------|
| `next-env.d.ts` | Next.js 타입 정의 (자동 생성) |
| `css.d.ts` | CSS 모듈 타입 선언 |

---

## 💻 src/ - 소스 코드

프로젝트의 핵심 로직과 UI 컴포넌트가 위치한 디렉토리입니다.

### 📁 src/app/ - Next.js App Router

Next.js 16의 App Router 구조를 따릅니다. 파일 기반 라우팅 시스템입니다.

```
src/app/
├── layout.tsx              # 🏗️ 루트 레이아웃 (전체 페이지 감싸기)
├── page.tsx                # 🏠 메인 페이지 (데스크톱 화면)
├── 📁 api/                 # API Routes (서버리스 함수)
├── 📁 fonts/               # 로컬 폰트 파일
├── 📁 stores/              # Zustand 전역 상태 관리
└── 📁 styles/              # 전역 CSS 스타일
```

#### `layout.tsx` - 루트 레이아웃

**역할**: 모든 페이지를 감싸는 최상위 레이아웃

**주요 기능**:
- 로컬 폰트 로드 및 CSS 변수 설정
- 전역 배경화면 (그라디언트 + 노이즈 텍스처)
- 작업 표시줄 (Taskbar) 렌더링
- 메타데이터 설정 (제목, 설명, 파비콘)

**사용하는 폰트**:
- `NeoDunggeunmoPro-Regular.ttf` → `--font-pixel` (UI 요소)
- `PyeojinGothic-*.ttf` → `--font-gothic` (본문)
- `SSShinb7Regular.ttf` → `--font-hand` (손글씨)
- `D2Coding.ttf` → `--font-code` (코드/터미널)

#### `page.tsx` - 메인 데스크톱 화면

**역할**: 사용자가 처음 보는 데스크톱 인터페이스

**주요 기능**:
- 바탕화면 아이콘 그리드 렌더링
- 위젯 시스템 관리 (드래그 가능)
- 반응형 레이아웃 (모바일/태블릿/데스크톱)
- 터치 디바이스 감지
- 뷰포트 크기에 따른 동적 스케일링

**상태 관리**:
- `selectedIconId`: 선택된 아이콘
- `widgetPositions`: 위젯 위치 (로컬 스토리지 저장)
- `widgetScale`, `iconScale`: 반응형 크기 조정
- `isViewportTooSmall`: 작은 화면 경고

**렌더링 순서**:
1. 바탕화면 아이콘 (좌측)
2. 위젯 영역 (우측)
3. WindowRenderer (창 관리)

---

### 📁 src/app/api/ - API Routes

서버리스 함수로 동작하는 백엔드 API 엔드포인트들입니다.

```
src/app/api/
├── 📁 archive/
│   └── route.ts            # GET /api/archive - 타임라인 이벤트 목록
├── 📁 discography/
│   └── route.ts            # GET /api/discography - 앨범 및 수록곡
├── 📁 gallery/
│   └── route.ts            # GET /api/gallery - 갤러리 이미지
├── 📁 group/
│   └── route.ts            # GET /api/group - 그룹 정보
├── 📁 members/
│   └── route.ts            # GET /api/members - 멤버 목록
├── 📁 releases/
│   └── route.ts            # GET /api/releases - 릴리스 정보
├── 📁 stats/
│   └── route.ts            # GET /api/stats - 통계 데이터
└── 📁 widgets/             # 위젯용 API
    ├── 📁 dday/
    │   └── route.ts        # GET /api/widgets/dday - D-Day 이벤트
    ├── 📁 quotes/
    │   └── 📁 random/
    │       └── route.ts    # GET /api/widgets/quotes/random - 랜덤 명언
    ├── 📁 wishes/
    │   └── route.ts        # (개발 예정) GET /api/widgets/wishes - 소원 목록
    └── 📁 _tracks/
        └── route.ts        # (삭제 예정) 트랙 정보
```

#### API Route 파일 구조

각 `route.ts` 파일은 다음 패턴을 따릅니다:

```typescript
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

/**
 * GET /api/[endpoint]
 * @returns JSON 응답
 */
export async function GET() {
  try {
    // Prisma 쿼리
    const data = await prisma.model.findMany({...});
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

**공통 특징**:
- `@/lib/prisma`에서 Prisma 클라이언트 import
- `NextResponse`로 JSON 응답 반환
- try-catch 에러 처리
- 적절한 HTTP 상태 코드

---

### 📁 src/app/stores/ - 전역 상태 관리

Zustand를 사용한 클라이언트 상태 관리 스토어들입니다.

```
src/app/stores/
├── useWindowStore.ts       # 창 관리 스토어 (핵심!)
└── useAudioStore.ts        # 오디오 플레이어 스토어
```

#### `useWindowStore.ts` - 창 관리 스토어

**역할**: 모든 창(Window)의 상태를 중앙 집중식으로 관리

**타입 정의**:

```typescript
type AppType =
  | 'MY_WISH'      // 소개/프로필
  | 'WISH_ARCHIVE' // 타임라인
  | 'DISCOGRAPHY'  // 앨범/음악
  | 'WISH_GALLERY' // 사진첩
  | 'WISH_WORLD'   // 외부 링크
  | 'TO_WISH'      // 방명록
  | 'RECYCLE_BIN'  // 휴지통
  | 'README';      // README
```

**상태**:
- `windows: WindowState[]` - 열린 창 목록
- `activeWindowId: string | null` - 현재 포커스된 창 ID
- `recentApps: AppInfo[]` - 최근 사용 앱 목록

**액션**:
- `openWindow(type, options?)` - 새 창 열기
- `closeWindow(id)` - 창 닫기
- `minimizeWindow(id)` - 최소화
- `maximizeWindow(id)` - 최대화/복원
- `focusWindow(id)` - 창 포커스 (Z-Index 조정)
- `updateWindowPosition(id, position)` - 위치 업데이트
- `updateWindowSize(id, size)` - 크기 업데이트

**WindowState 인터페이스**:

```typescript
interface WindowState {
  id: string;
  type: AppType;
  title: string;
  icon: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  beforeMaximize?: { position, size }; // 복원용
}
```

#### `useAudioStore.ts` - 오디오 플레이어 스토어

**역할**: 음악 재생 상태 관리 (MiniPlayerWidget에서 사용)

**상태**:
- `currentTrack` - 현재 재생 중인 트랙
- `isPlaying` - 재생 여부
- `volume` - 볼륨
- `playlist` - 재생 목록

**액션**:
- `play()`, `pause()`, `stop()`
- `setVolume()`
- `nextTrack()`, `prevTrack()`

---

### 📁 src/app/fonts/ - 폰트 파일

```
src/app/fonts/
├── NeoDunggeunmoPro-Regular.ttf     # 픽셀 폰트 (UI)
├── PyeojinGothic-Light.ttf          # 고딕 (본문, 300)
├── PyeojinGothic-Regular.ttf        # 고딕 (본문, 400)
├── PyeojinGothic-Medium.ttf         # 고딕 (본문, 500)
├── PyeojinGothic-SemiBold.ttf       # 고딕 (본문, 600)
├── PyeojinGothic-Bold.ttf           # 고딕 (본문, 700)
├── SSShinb7Regular.ttf              # 손글씨
├── D2Coding.ttf                     # 코드 폰트 (Regular)
├── D2CodingBold.ttf                 # 코드 폰트 (Bold)
├── RiaSans-*.ttf                    # (추가 폰트)
└── 이서윤체.ttf                      # (추가 폰트)
```

**사용 방법**:

```tsx
// layout.tsx에서 로드
import localFont from "next/font/local";

const neodunggeunmo = localFont({
  src: './fonts/NeoDunggeunmoPro-Regular.ttf',
  variable: '--font-pixel',
});

// CSS에서 사용
.my-element {
  font-family: var(--font-pixel);
}
```

---

### 📁 src/app/styles/ - 전역 스타일

```
src/app/styles/
└── globals.css             # 전역 CSS 스타일
```

**포함 내용**:
- Tailwind CSS 디렉티브 (`@tailwind base, components, utilities`)
- CSS 변수 정의 (`--font-*`, `--color-*` 등)
- 전역 리셋 스타일
- 커스텀 스크롤바 스타일
- Windows OS 스타일 테마 (버튼, 창 등)

---

## 📦 src/components/ - 컴포넌트

프로젝트의 모든 React 컴포넌트가 위치합니다.

```
src/components/
├── index.ts                # 전체 컴포넌트 export
├── 📁 apps/                # 데스크톱 앱 컴포넌트
├── 📁 os/                  # OS 시스템 컴포넌트
├── 📁 ui/                  # 재사용 가능한 UI 컴포넌트
└── 📁 widgets/             # 데스크톱 위젯
```

---

### 📁 src/components/apps/ - 앱 컴포넌트

각 데스크톱 앱의 메인 컴포넌트들입니다.

```
src/components/apps/
├── index.ts                # 앱 컴포넌트 export
├── 📁 Discography/         # 💿 앨범/음악 앱
├── 📁 MyWish/              # 📁 그룹/멤버 소개 앱
├── 📁 README/              # 📄 README 파일 뷰어
├── 📁 schedule/            # 📅 (예정) 스케줄 앱
├── 📁 To_Wish/             # 💌 방명록/소원함 앱
├── 📁 WishArchive/         # 🗓️ 타임라인 아카이브 앱
├── 📁 WishGallery/         # 🖼️ 갤러리 앱
└── 📁 WishWorld/           # 🌐 외부 링크 모음 앱
```

#### 앱 폴더 구조 (예: Discography)

```
Discography/
├── Discography.tsx         # 메인 컴포넌트
├── AlbumList.tsx           # 앨범 목록
├── AlbumDetail.tsx         # 앨범 상세
├── TrackItem.tsx           # 트랙 아이템
└── index.ts                # export
```

**앱 컴포넌트 공통 Props**:

```typescript
interface AppProps {
  onClose?: () => void;     // 창 닫기 콜백
}
```

**앱별 주요 기능**:

| 앱 | 주요 기능 | API 엔드포인트 |
|----|----------|---------------|
| **Discography** | 앨범 목록, 트랙 재생, 가사 보기 | `/api/discography` |
| **MyWish** | 그룹 정보, 멤버 프로필 | `/api/group`, `/api/members` |
| **WishArchive** | 타임라인, 이벤트 필터링 | `/api/archive` |
| **WishGallery** | 이미지 그리드, 라이트박스 | `/api/gallery` |
| **WishWorld** | SNS 링크, 스트리밍 링크 | `/api/group` (links) |
| **To_Wish** | 방명록 작성, 소원 목록 | `/api/widgets/wishes` |
| **README** | 마크다운 렌더링 | (정적 파일) |

---

### 📁 src/components/os/ - OS 시스템 컴포넌트

Windows OS의 핵심 UI 요소들입니다.

```
src/components/os/
├── index.ts                # OS 컴포넌트 export
├── DesktopIcon.tsx         # 바탕화면 아이콘
├── StartMenu.tsx           # 시작 메뉴
├── Taskbar.tsx             # 작업 표시줄
├── WindowFrame.tsx         # 창 프레임 (드래그, 리사이즈)
└── WindowRenderer.tsx      # 창 렌더링 관리자
```

#### `DesktopIcon.tsx` - 바탕화면 아이콘

**Props**:

```typescript
interface DesktopIconProps {
  id: string;
  type: AppType;
  title: string;
  iconSrc: string;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onDoubleClick?: (type: AppType) => void;
}
```

**기능**:
- 클릭 시 선택 상태 표시
- 더블클릭 시 앱 실행
- 아이콘 + 텍스트 레이아웃
- 드래그 가능 (예정)

#### `Taskbar.tsx` - 작업 표시줄

**구성 요소**:
- 시작 버튼 (StartMenu 토글)
- 열린 창 목록 (최소화된 창 포함)
- 시스템 트레이
- 시계

**기능**:
- 창 클릭 시 복원 및 포커스
- 활성 창 하이라이트
- 최소화된 창 복원

#### `WindowFrame.tsx` - 창 프레임

**Props**:

```typescript
interface WindowFrameProps {
  id: string;
  title: string;
  iconSrc?: string;
  children: React.ReactNode;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
}
```

**기능**:
- **타이틀바**: 아이콘, 제목, 최소화/최대화/닫기 버튼
- **드래그**: `react-rnd`를 사용한 창 이동
- **리사이즈**: 창 크기 조절
- **최대화**: 전체 화면 토글
- **포커스**: 클릭 시 맨 앞으로 가져오기

**내부 구조**:

```tsx
<Rnd
  position={position}
  size={size}
  onDragStop={handleDragStop}
  onResizeStop={handleResizeStop}
>
  {/* 타이틀바 */}
  <div className="title-bar">
    <img src={iconSrc} />
    <span>{title}</span>
    <div className="buttons">
      <button onClick={minimize}>_</button>
      <button onClick={maximize}>□</button>
      <button onClick={close}>×</button>
    </div>
  </div>

  {/* 콘텐츠 */}
  <div className="content">
    {children}
  </div>
</Rnd>
```

#### `WindowRenderer.tsx` - 창 렌더링 관리자

**역할**: Zustand 스토어의 `windows` 배열을 구독하여 각 창 렌더링

**작동 방식**:

```typescript
export default function WindowRenderer() {
  const { windows } = useWindowStore();

  const renderAppContent = (type: AppType) => {
    switch (type) {
      case 'MY_WISH': return <MyWish />;
      case 'DISCOGRAPHY': return <Discography />;
      // ... 기타 앱
      default: return <PlaceholderApp />;
    }
  };

  return (
    <>
      {windows.map(win => (
        <WindowFrame key={win.id} {...win}>
          {renderAppContent(win.type)}
        </WindowFrame>
      ))}
    </>
  );
}
```

**PlaceholderApp**: 아직 개발 중인 앱의 임시 화면

---

### 📁 src/components/ui/ - UI 컴포넌트

재사용 가능한 공통 UI 컴포넌트 라이브러리입니다.

```
src/components/ui/
├── index.ts                # UI 컴포넌트 export
├── Badge.tsx               # 뱃지
├── Button.tsx              # 버튼
├── Calendar.tsx            # 달력
├── Card.tsx                # 카드 컨테이너
├── Checkbox.tsx            # 체크박스
├── ColorChip.tsx           # 색상 칩
├── Divider.tsx             # 구분선
├── Dropdown.tsx            # 드롭다운
├── EmptyState.tsx          # 빈 상태 표시
├── Input.tsx               # 입력 필드
├── MemberProfile.tsx       # 멤버 프로필 카드
├── MenuBar.tsx             # 메뉴바
├── Modal.tsx               # 모달 (오버레이)
├── Notification.tsx        # 알림 토스트
├── Pagination.tsx          # 페이지네이션
├── ProgressBar.tsx         # 프로그레스 바
├── Radio.tsx               # 라디오 버튼
├── ScrollBar.tsx           # 커스텀 스크롤바
├── SearchBar.tsx           # 검색바
├── Skeleton.tsx            # 스켈레톤 로딩
├── Spinner.tsx             # 로딩 스피너
├── Tabs.tsx                # 탭 네비게이션
├── Toggle.tsx              # 토글 스위치
├── ToolBar.tsx             # 툴바
└── Tooltip.tsx             # 툴팁
```

#### 주요 UI 컴포넌트 설명

**Button.tsx**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

**Modal.tsx**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}
```

**Tooltip.tsx**
```typescript
interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}
```

---

### 📁 src/components/widgets/ - 위젯

바탕화면에 배치 가능한 인터랙티브 위젯들입니다.

```
src/components/widgets/
├── index.ts                        # 위젯 export
├── DraggableWidget.tsx             # 위젯 래퍼 (드래그 가능)
├── DDayCounterWidget.tsx           # 📅 D-Day 카운터
├── MembersQuoteWidget.tsx          # 💬 멤버 명언
├── MiniPlayerWidget.tsx            # 🎵 미니 플레이어
├── PhotoCardWidget.tsx             # 🃏 포토카드
├── PolaroidPhotoWidget.tsx         # 📸 폴라로이드
├── StickyNoteWidget.tsx            # 📝 스티키 노트
├── WichuTamagotchiWidget.tsx       # 🎮 다마고치
└── WishJarWidget.tsx               # 🏺 소원 항아리
```

#### `DraggableWidget.tsx` - 위젯 래퍼

**역할**: 모든 위젯을 감싸는 공통 컨테이너

**Props**:

```typescript
interface DraggableWidgetProps {
  id: string;
  title?: string;
  initialPosition?: { x: number; y: number };
  children: React.ReactNode;
  onPositionChange?: (pos: { x: number; y: number }) => void;
}
```

**기능**:
- `react-draggable`을 사용한 드래그 기능
- 위치 로컬 스토리지 저장
- 닫기 버튼 (선택적)

#### 위젯별 기능

| 위젯 | 기능 | API |
|-----|------|-----|
| **DDayCounter** | 중요 일정까지 D-Day 표시 | `/api/widgets/dday` |
| **MembersQuote** | 멤버 명언/발언 랜덤 표시 | `/api/widgets/quotes/random` |
| **MiniPlayer** | 음악 재생 컨트롤 | `useAudioStore` |
| **PhotoCard** | 포토카드 슬라이더 | Cloudinary |
| **PolaroidPhoto** | 폴라로이드 스타일 사진 | Cloudinary |
| **StickyNote** | 메모 작성 (로컬 저장) | localStorage |
| **WichuTamagotchi** | 3D 다마고치 게임 | Three.js |
| **WishJar** | 소원 항아리 (방명록) | `/api/widgets/wishes` |

---

## 🛠 src/lib/ - 유틸리티 함수

공통으로 사용되는 라이브러리 및 헬퍼 함수들입니다.

```
src/lib/
├── prisma.ts               # Prisma 클라이언트 싱글톤
├── cloudinary.ts           # Cloudinary 설정
├── env.ts                  # 환경 변수 검증
├── error.ts                # 에러 처리 유틸
├── date.ts                 # 날짜 포맷 유틸
└── position.ts             # 위치 계산 유틸
```

### `prisma.ts` - Prisma 클라이언트

**역할**: 전역 Prisma 클라이언트 인스턴스 제공

**특징**:
- 개발 환경에서 HMR로 인한 중복 인스턴스 방지
- 쿼리 로깅 (개발 환경)
- 환경 변수로부터 DB URL 로드

```typescript
export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});
```

### `cloudinary.ts` - Cloudinary 설정

**역할**: 이미지/비디오 업로드 및 최적화 설정

```typescript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

### `date.ts` - 날짜 유틸리티

```typescript
// D-Day 계산
export function calculateDDay(targetDate: Date): number;

// 날짜 포맷팅
export function formatDate(date: Date, format: string): string;

// 상대 시간 (예: "3일 전")
export function getRelativeTime(date: Date): string;
```

### `position.ts` - 위치 계산

```typescript
// 창 중앙 정렬 위치 계산
export function getCenterPosition(
  windowSize: { width: number; height: number },
  viewportSize: { width: number; height: number }
): { x: number; y: number };

// 겹침 방지 위치 계산
export function getOffsetPosition(
  basePosition: { x: number; y: number },
  offset: number
): { x: number; y: number };
```

---

## 🗄️ prisma/ - 데이터베이스

데이터베이스 스키마, 마이그레이션, 시드 데이터를 관리합니다.

```
prisma/
├── schema.prisma           # 📐 DB 스키마 정의
├── seed.ts                 # 🌱 시드 진입점
├── 📁 seeds/               # 시드 데이터 파일들
└── 📁 migrations/          # 마이그레이션 히스토리
```

### `schema.prisma` - 스키마 정의

**구성**:

```prisma
// 1. Generator 설정
generator client {
  provider = "prisma-client-js"
}

// 2. Datasource 설정
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// 3. ENUM 정의 (15개)
enum EventType { ... }
enum ReleaseType { ... }
// ... 기타

// 4. Model 정의 (20개+)
model Group { ... }
model Member { ... }
// ... 기타
```

**주요 모델**:
- Group, Member, Era
- Album, Track, Lyric
- Event, Program, Appearance
- Chart, Certification, Sales
- Link, Content, Credit
- Widget

**파일 크기**: ~1,269 줄 (매우 상세한 스키마)

### `seed.ts` - 시드 진입점

**역할**: 모든 시드 파일을 순차적으로 실행

```typescript
import { seedGroup } from './seeds/00-group';
import { seedMembers } from './seeds/01-members';
// ... 기타

async function main() {
  console.log('🌱 Seeding database...');
  
  await seedGroup();
  await seedMembers();
  await seedEras();
  // ... 순차 실행
  
  console.log('✅ Seeding complete!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

### 📁 seeds/ - 시드 데이터

```
prisma/seeds/
├── utils.ts                # 시드 유틸 함수
├── 00-group.ts             # 그룹 정보
├── 01-members.ts           # 멤버 정보
├── 02-eras.ts              # 활동 시대
├── 03-albums.ts            # 앨범
├── 04-tracks.ts            # 수록곡
├── 05-events.ts            # 이벤트/활동
├── 06-programs.ts          # 방송 프로그램
├── 07-appearances.ts       # 출연 기록
├── 08-charts.ts            # 차트 성적
├── 09-certifications.ts    # 음반 인증
├── 10-widgets.ts           # 위젯 데이터
├── 11-music-show.ts        # 음악방송
├── 12-sales.ts             # 판매량
├── 13-contents.ts          # 콘텐츠
└── 14-awards.ts            # 수상 기록
```

**시드 파일 패턴**:

```typescript
import { prisma } from '../lib/prisma';

export async function seedGroup() {
  const group = await prisma.group.upsert({
    where: { slug: 'nct-wish' },
    update: {},
    create: {
      slug: 'nct-wish',
      name: 'NCT WISH',
      nameKo: '엔시티 위시',
      // ... 데이터
    },
  });
  
  console.log('✅ Group seeded');
  return group;
}
```

### 📁 migrations/ - 마이그레이션

```
prisma/migrations/
├── migration_lock.toml
├── 20251112090730_init_supabase/
├── 20251112140829_refactor_nctwish_schema/
├── 20251114065203_add_expanded_schema/
├── 20251114065557_fix_track_unique_constraint/
├── 20251114070003_add_announcement_event_type/
├── 20251122113629_add_album_theme_fields/
├── 20251123125950_add_icon_url_fields/
├── 20251210062956_wish_os_final_ver/
├── 20251210125026_wish_os_release_dates/
├── 20251211090742_wish_photocard_refactor/
└── 20251211094608_wish_photocard_refactor_final/
```

**각 마이그레이션 폴더**:
- `migration.sql` - SQL 변경 사항

**실행 방법**:
```bash
npx prisma migrate dev   # 개발 환경
npx prisma migrate deploy # 프로덕션
```

---

## 🌐 public/ - 정적 파일

브라우저에서 직접 접근 가능한 정적 리소스들입니다.

```
public/
├── 📁 system/              # OS 시스템 리소스
│   ├── 📁 icons/           # 아이콘 이미지
│   ├── 📁 cursors/         # 커서 이미지
│   ├── 📁 sounds/          # 효과음
│   ├── 📁 wallpapers/      # 배경화면
│   └── 📁 widgets/         # (예정) 위젯 에셋
└── 📁 content/             # 콘텐츠 파일
    ├── 📁 albums/          # 앨범 이미지
    ├── 📁 events/          # 이벤트 이미지
    ├── 📁 group/           # 그룹 이미지
    ├── 📁 members/         # 멤버 사진
    └── 📁 etc/             # 기타
```

### 📁 public/system/icons/

```
public/system/icons/
├── favicon.ico             # 파비콘
├── favicon.svg             # SVG 파비콘
├── favicon-96x96.png       # PNG 파비콘
├── apple-touch-icon.png    # iOS 아이콘
├── 📁 apps/                # 앱 아이콘
│   ├── mywish.png
│   ├── wisharchive.png
│   ├── discography.png
│   ├── wishgallery.png
│   ├── wishworld.png
│   ├── towish.png
│   ├── readme.png
│   └── recyclebin.png
├── 📁 externalLinks/       # 외부 링크 아이콘
│   ├── youtube.png
│   ├── instagram.png
│   ├── twitter.png
│   └── ...
├── Desktop Icon.png
├── Event Icon.png
├── Modal Icon.png
├── Music Control Icon.png
├── Origami Crane.png
└── Tray Icon.png
```

**사용 예시**:

```tsx
<img src="/system/icons/apps/discography.png" alt="Discography" />
```

### 📁 public/system/cursors/

커스텀 마우스 커서 이미지들 (예: Windows 95 스타일)

### 📁 public/system/sounds/

효과음 파일들 (예: 클릭, 알림 등)

### 📁 public/system/wallpapers/

배경화면 이미지들

### 📁 public/content/

실제 콘텐츠 파일들 (앨범 커버, 멤버 사진 등)

```
public/content/
├── albums/
│   ├── 00_handsup/
│   ├── 01_wish/
│   ├── 02_songbird/
│   └── ...
├── members/
│   ├── jaehee/
│   ├── riku/
│   ├── ryo/
│   └── ...
└── events/
```

---

## 🎨 기타 디렉토리

### 📁 3D_asset/

Blender 3D 모델 원본 파일들

```
3D_asset/
├── tabmgochi_star.blend1   # 다마고치 별
└── tamagochi.blend1         # 다마고치 모델
```

**용도**: WichuTamagotchiWidget에서 사용하는 3D 모델

### 📁 content/

HTML 콘텐츠 파일들

```
content/
├── group/
│   └── description.html    # 그룹 소개
└── members/
    ├── jaehee/description.html
    ├── riku/description.html
    └── ...
```

**용도**: MyWish 앱에서 iframe 또는 마크다운으로 렌더링

### 📁 docs/

프로젝트 문서들 (현재 읽고 있는 문서 포함)

```
docs/
├── PROJECT_OVERVIEW.md     # 프로젝트 개요
├── FILE_STRUCTURE.md       # 현재 문서
├── ARCHITECTURE.md         # (예정) 아키텍처
├── DATABASE.md             # (예정) DB 스키마
└── API_REFERENCE.md        # (예정) API 명세
```

### 📁 reference/

참고 자료 및 디자인 파일

```
reference/
└── reference.pur           # 참고 파일
```

---

## 📝 파일 명명 규칙

### TypeScript/React 파일

| 파일 타입 | 규칙 | 예시 |
|----------|------|------|
| **컴포넌트** | PascalCase | `WindowFrame.tsx` |
| **유틸리티** | camelCase | `prisma.ts` |
| **타입 정의** | PascalCase | `types.ts` |
| **스토어** | camelCase (use*) | `useWindowStore.ts` |
| **Hook** | camelCase (use*) | `useWindowSize.ts` |
| **API Route** | camelCase | `route.ts` |

### 폴더 명명

| 폴더 타입 | 규칙 | 예시 |
|----------|------|------|
| **컴포넌트 폴더** | PascalCase | `Discography/` |
| **유틸 폴더** | camelCase | `lib/` |
| **앱 폴더** | PascalCase | `MyWish/` |
| **API 폴더** | camelCase | `widgets/` |

### 이미지/에셋 파일

| 파일 타입 | 규칙 | 예시 |
|----------|------|------|
| **아이콘** | camelCase.확장자 | `mywish.png` |
| **배경화면** | kebab-case.확장자 | `default-wallpaper.jpg` |
| **콘텐츠** | 숫자_이름/ | `01_wish/` |

---

## 🔍 파일 찾기 가이드

### "창 관리 로직을 수정하고 싶어요"
→ `src/app/stores/useWindowStore.ts`

### "새로운 앱을 추가하고 싶어요"
1. `src/components/apps/NewApp/` 폴더 생성
2. `src/components/apps/index.ts`에 export 추가
3. `src/app/stores/useWindowStore.ts`에 `AppType` 추가
4. `src/components/os/WindowRenderer.tsx`에 라우팅 추가
5. `src/app/page.tsx`의 `DESKTOP_ICONS`에 아이콘 추가

### "새로운 위젯을 만들고 싶어요"
1. `src/components/widgets/MyWidget.tsx` 생성
2. `DraggableWidget`으로 감싸기
3. `src/components/widgets/index.ts`에 export 추가
4. `src/app/page.tsx`의 `WIDGET_CONFIGS`에 추가

### "API 엔드포인트를 추가하고 싶어요"
1. `src/app/api/myendpoint/route.ts` 생성
2. `GET`, `POST` 등 HTTP 메서드 함수 작성
3. Prisma 쿼리 작성
4. `NextResponse.json()` 반환

### "데이터베이스 스키마를 수정하고 싶어요"
1. `prisma/schema.prisma` 수정
2. `npx prisma migrate dev --name my_change` 실행
3. `npx prisma generate` (Prisma Client 재생성)

### "시드 데이터를 추가하고 싶어요"
1. `prisma/seeds/XX-my-seed.ts` 생성
2. `prisma/seed.ts`에 import 및 실행 추가
3. `npm run db:seed` 실행

### "전역 스타일을 변경하고 싶어요"
→ `src/app/styles/globals.css`

### "환경 변수를 추가하고 싶어요"
1. `.env` 파일에 추가
2. `src/lib/env.ts`에서 검증 (선택)
3. Next.js 재시작

---

## 📊 파일 통계

| 카테고리 | 파일 수 (예상) |
|---------|--------------|
| **컴포넌트** | 50+ |
| **API Routes** | 11 |
| **시드 파일** | 15 |
| **마이그레이션** | 12 |
| **폰트 파일** | 13 |
| **설정 파일** | 10 |
| **문서** | 5+ |

---

## 🎯 베스트 프랙티스

### 1. 컴포넌트 작성
- 파일 상단에 JSDoc 주석 작성
- Props 인터페이스 명시
- export default 사용

### 2. 폴더 구조
- 관련 파일은 같은 폴더에 모으기
- `index.ts`로 깔끔한 import 경로 제공

### 3. 임포트 순서
```typescript
// 1. React 관련
import { useState } from 'react';

// 2. 외부 라이브러리
import { prisma } from '@/lib/prisma';

// 3. 내부 컴포넌트
import { WindowFrame } from '@/components/os';

// 4. 타입
import type { AppType } from '@/types';

// 5. 스타일
import './styles.css';
```

### 4. 경로 별칭
`tsconfig.json`에서 `@/`로 `src/` 경로 별칭 설정됨

```typescript
// ❌ 상대 경로 (비추천)
import { Button } from '../../../components/ui/Button';

// ✅ 절대 경로 (추천)
import { Button } from '@/components/ui/Button';
```

---

## 🚀 다음 단계

이 문서를 읽었다면 다음을 확인하세요:

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - 시스템 아키텍처 및 데이터 흐름
- **[DATABASE.md](./DATABASE.md)** - 데이터베이스 스키마 상세
- **[API_REFERENCE.md](./API_REFERENCE.md)** - API 엔드포인트 명세

---

**Last Updated:** 2025-12-29  
**Version:** 0.1.0  
**Author:** Kelly
