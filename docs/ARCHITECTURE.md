# 🏗️ WISH Archive - 시스템 아키텍처

> 프로젝트의 전체 아키텍처, 데이터 흐름, 디자인 패턴 및 기술적 의사결정에 대한 상세 가이드

---

## 📋 목차

1. [아키텍처 개요](#-아키텍처-개요)
2. [계층 구조](#-계층-구조)
3. [데이터 흐름](#-데이터-흐름)
4. [상태 관리](#-상태-관리)
5. [컴포넌트 아키텍처](#-컴포넌트-아키텍처)
6. [창 관리 시스템](#-창-관리-시스템)
7. [렌더링 전략](#-렌더링-전략)
8. [데이터베이스 아키텍처](#-데이터베이스-아키텍처)
9. [API 설계](#-api-설계)
10. [성능 최적화](#-성능-최적화)
11. [보안 및 인증](#-보안-및-인증)

---

## 🎯 아키텍처 개요

### 전체 시스템 다이어그램

```
┌─────────────────────────────────────────────────────────────┐
│                     🌐 Browser (Client)                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         🎨 Presentation Layer (React)               │   │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────────┐  │   │
│  │  │ Desktop  │  │  Apps    │  │    Widgets      │  │   │
│  │  │   OS     │  │ (8개)    │  │    (9개)        │  │   │
│  │  └──────────┘  └──────────┘  └─────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↕                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │      🧠 State Management (Zustand)                  │   │
│  │  • useWindowStore  • useAudioStore                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            ↕ HTTP/HTTPS
┌───────────────────────────┴─────────────────────────────────┐
│              ⚙️ Next.js App Router (Server)                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │           🔌 API Routes Layer                       │   │
│  │   /api/discography  /api/members  /api/archive      │   │
│  │   /api/gallery      /api/widgets/*  ...             │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↕                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │        💼 Business Logic Layer (예정)               │   │
│  │   • Services  • Validators  • Repositories          │   │
│  └─────────────────────────────────────────────────────┘   │
│                          ↕                                   │
│  ┌─────────────────────────────────────────────────────┐   │
│  │          🗄️ Data Access Layer (Prisma)             │   │
│  │   • ORM  • Query Builder  • Migrations              │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                               │
└───────────────────────────┬─────────────────────────────────┘
                            ↕ PostgreSQL Protocol
┌───────────────────────────┴─────────────────────────────────┐
│             💾 Database Layer (PostgreSQL)                   │
│                  + Supabase Hosting                          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            ☁️ External Services                              │
│   • Cloudinary (이미지/비디오 스토리지)                        │
│   • YouTube API (음악 재생)                                  │
└─────────────────────────────────────────────────────────────┘
```

### 아키텍처 특징

| 특징 | 설명 |
|-----|------|
| **패러다임** | Client-Server Architecture with SSR/CSR Hybrid |
| **프레임워크** | Next.js 16 (App Router) |
| **렌더링 방식** | Server Components + Client Components |
| **상태 관리** | Zustand (클라이언트), Server State (React Query 예정) |
| **데이터베이스** | PostgreSQL + Prisma ORM |
| **API 스타일** | RESTful JSON API |
| **배포 전략** | Serverless (Vercel 예정) |

---

## 📊 계층 구조

### 1. Presentation Layer (프레젠테이션 계층)

**책임**: 사용자 인터페이스 렌더링 및 상호작용

**구성 요소**:

```
Presentation Layer
├── Desktop OS UI
│   ├── Taskbar (작업 표시줄)
│   ├── StartMenu (시작 메뉴)
│   ├── DesktopIcons (바탕화면 아이콘)
│   └── WindowFrame (창 프레임)
│
├── Applications (8개 앱)
│   ├── Discography (음악 앱)
│   ├── MyWish (프로필 앱)
│   ├── WishArchive (타임라인 앱)
│   ├── WishGallery (갤러리 앱)
│   ├── WishWorld (링크 모음)
│   ├── To_Wish (방명록)
│   ├── README (사용 가이드)
│   └── RecycleBin (휴지통)
│
├── Widgets (9개 위젯)
│   ├── DDayCounter
│   ├── MembersQuote
│   ├── MiniPlayer
│   ├── PhotoCard
│   ├── PolaroidPhoto
│   ├── StickyNote
│   ├── WichuTamagotchi
│   └── WishJar
│
└── UI Components (26개)
    ├── Button, Modal, Tooltip
    ├── Input, Dropdown, Calendar
    └── ...기타
```

**기술 스택**:
- React 19.2.0
- TypeScript
- Tailwind CSS
- Framer Motion (애니메이션)
- react-rnd (드래그 & 리사이즈)
- Three.js (3D 위젯)

---

### 2. State Management Layer (상태 관리 계층)

**책임**: 클라이언트 측 전역 상태 관리

**구성 요소**:

#### A. Window Store (`useWindowStore`)

```typescript
// 상태
{
  windows: WindowState[];          // 열린 창 목록
  activeWindowId: string | null;   // 포커스된 창 ID
  recentApps: AppInfo[];           // 최근 앱 목록
  backgroundImage: string | null;  // 배경화면
}

// 액션
{
  openWindow(app)          // 창 열기
  closeWindow(id)          // 창 닫기
  minimizeWindow(id)       // 최소화
  maximizeWindow(id)       // 최대화
  focusWindow(id)          // 포커스
  updateWindowPosition()   // 위치 업데이트
  updateWindowSize()       // 크기 업데이트
}
```

#### B. Audio Store (`useAudioStore`)

```typescript
// 상태
{
  currentTrack: Track | null;      // 현재 재생 트랙
  playlist: Track[];               // 재생 목록
  isPlaying: boolean;              // 재생 여부
  volume: number;                  // 볼륨 (0-100)
  isMuted: boolean;                // 음소거 여부
  playerRef: YouTubePlayer | null; // YT Player 참조
}

// 액션
{
  playTrack(track)         // 트랙 재생
  togglePlay()             // 재생/일시정지
  setVolume(volume)        // 볼륨 조절
  toggleMute()             // 음소거 토글
  setPlaylist(tracks)      // 플레이리스트 설정
}
```

**Zustand를 선택한 이유**:
- ✅ 간단한 API (보일러플레이트 최소)
- ✅ DevTools 지원
- ✅ TypeScript 완벽 지원
- ✅ React 외부에서도 접근 가능
- ✅ Redux 대비 번들 크기 작음 (~1KB)

---

### 3. API Layer (API 계층)

**책임**: 클라이언트-서버 통신, 데이터 제공

**설계 원칙**:
- RESTful 설계
- 일관된 응답 형식 (JSON)
- 에러 처리 표준화
- 타입 안정성 (TypeScript)

**API 엔드포인트 구조**:

```
/api
├── /discography          # 앨범 & 트랙
├── /members              # 멤버 목록
├── /archive              # 타임라인 이벤트
├── /gallery              # 갤러리 이미지
├── /group                # 그룹 정보
├── /releases             # 릴리스 정보
├── /stats                # 통계 데이터
└── /widgets              # 위젯 데이터
    ├── /dday             # D-Day 이벤트
    ├── /quotes/random    # 랜덤 명언
    └── /wishes           # 소원 목록
```

**API Route 패턴**:

```typescript
// src/app/api/[endpoint]/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // 1. 요청 파라미터 파싱 (선택적)
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter');

    // 2. Prisma 쿼리
    const data = await prisma.model.findMany({
      where: filter ? { ... } : {},
      include: { ... },
      orderBy: { ... },
    });

    // 3. 성공 응답
    return NextResponse.json(data);
    
  } catch (error) {
    // 4. 에러 처리
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
```

---

### 4. Data Access Layer (데이터 접근 계층)

**책임**: 데이터베이스와의 상호작용

**구성**:

```
Data Access Layer
├── Prisma Client
│   ├── 타입 안전한 쿼리 빌더
│   ├── 마이그레이션 관리
│   └── 시드 데이터 관리
│
├── Database Models (20+ 모델)
│   ├── Group, Member, Era
│   ├── Album, Track, Lyric
│   ├── Event, Program, Appearance
│   ├── Chart, Certification, Sales
│   └── Link, Content, Widget
│
└── Connection Management
    ├── 싱글톤 패턴 (dev HMR 대응)
    └── 커넥션 풀링
```

**Prisma 클라이언트 초기화**:

```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { 
  prisma?: PrismaClient 
};

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

// 개발 환경에서 중복 인스턴스 방지
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

---

### 5. Database Layer (데이터베이스 계층)

**PostgreSQL on Supabase**

- **호스팅**: Supabase (관리형 PostgreSQL)
- **버전**: PostgreSQL 15+
- **확장**: PostGIS, pg_trgm (검색 최적화 예정)

---

## 🔄 데이터 흐름

### 1. 읽기 플로우 (Read Flow)

**예시: 앨범 목록 로드**

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │ 1. 앱 열기 (Discography 더블클릭)
       ↓
┌──────────────┐
│ useWindowStore│
└──────┬───────┘
       │ 2. openWindow('DISCOGRAPHY')
       ↓
┌──────────────┐
│WindowRenderer│
└──────┬───────┘
       │ 3. <Discography /> 컴포넌트 렌더링
       ↓
┌──────────────┐
│ Discography  │
└──────┬───────┘
       │ 4. useEffect(() => fetchAlbums())
       ↓
       │ 5. fetch('/api/discography')
       ↓
┌──────────────┐
│  API Route   │
└──────┬───────┘
       │ 6. prisma.album.findMany({ include: { tracks } })
       ↓
┌──────────────┐
│  PostgreSQL  │
└──────┬───────┘
       │ 7. SQL Query 실행
       ↓
       │ 8. 결과 반환 (JSON)
       ↓
┌──────────────┐
│ Discography  │
└──────┬───────┘
       │ 9. setState(albums)
       ↓
       │ 10. 리렌더링 (앨범 목록 표시)
       ↓
┌──────────────┐
│     UI       │
└──────────────┘
```

**성능 최적화 포인트**:
- ✅ Prisma `include`로 N+1 쿼리 방지
- ✅ Next.js 자동 캐싱 (fetch cache)
- ✅ React `useMemo`로 불필요한 재계산 방지
- 🔜 React Query로 서버 상태 캐싱 (예정)

---

### 2. 쓰기 플로우 (Write Flow)

**예시: 방명록 작성**

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │ 1. 소원 작성 후 제출
       ↓
┌──────────────┐
│  WishJar     │
│  Widget      │
└──────┬───────┘
       │ 2. handleSubmit(wishText)
       ↓
       │ 3. POST /api/widgets/wishes
       │    body: { text, author, ... }
       ↓
┌──────────────┐
│  API Route   │
└──────┬───────┘
       │ 4. 데이터 검증 (validator)
       ↓
       │ 5. prisma.wish.create({ data })
       ↓
┌──────────────┐
│  PostgreSQL  │
└──────┬───────┘
       │ 6. INSERT 실행
       ↓
       │ 7. 생성된 데이터 반환
       ↓
┌──────────────┐
│  WishJar     │
└──────┬───────┘
       │ 8. 로컬 상태 업데이트
       ↓
       │ 9. 성공 메시지 표시
       ↓
┌──────────────┐
│     UI       │
└──────────────┘
```

---

### 3. 실시간 상태 동기화 플로우

**예시: 창 위치 이동**

```
┌──────────────┐
│   User       │
└──────┬───────┘
       │ 1. 창 드래그
       ↓
┌──────────────┐
│ WindowFrame  │
│  (react-rnd) │
└──────┬───────┘
       │ 2. onDragStop(e, data)
       ↓
       │ 3. updateWindowPosition(id, { x, y })
       ↓
┌──────────────┐
│useWindowStore│
└──────┬───────┘
       │ 4. set({ windows: [...] })
       ↓
       │ 5. Zustand subscribers 트리거
       ↓
┌──────────────┐
│WindowRenderer│
└──────┬───────┘
       │ 6. 리렌더링
       ↓
┌──────────────┐
│ WindowFrame  │
└──────┬───────┘
       │ 7. position 업데이트
       ↓
┌──────────────┐
│     UI       │
└──────────────┘
```

**특징**:
- ⚡ 즉각적인 UI 업데이트 (로컬 상태)
- 🔄 옵티미스틱 업데이트
- 💾 로컬 스토리지 영속화 (예정)

---

## 🧩 컴포넌트 아키텍처

### 컴포넌트 계층 구조

```
page.tsx (루트)
│
├── Taskbar
│   ├── StartMenu
│   ├── AppButtons[]
│   └── SystemTray
│
├── DesktopIcons[]
│   └── DesktopIcon
│
├── Widgets[]
│   └── DraggableWidget
│       └── [WidgetContent]
│
└── WindowRenderer
    └── WindowFrame[]
        └── [AppContent]
```

### 컴포넌트 분류

#### 1. Container Components (컨테이너 컴포넌트)

**역할**: 비즈니스 로직, 데이터 페칭, 상태 관리

**예시**:
- `Discography.tsx` - 앨범 데이터 페칭 및 관리
- `WishArchive.tsx` - 이벤트 필터링 로직
- `WishGallery.tsx` - 이미지 로딩 및 라이트박스

**패턴**:
```typescript
export default function Discography() {
  // 1. 상태 관리
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. 데이터 페칭
  useEffect(() => {
    fetchAlbums();
  }, []);

  // 3. 비즈니스 로직
  const handleSelectAlbum = (id: string) => { ... };

  // 4. 프레젠테이션 컴포넌트에 전달
  return (
    <AlbumList 
      albums={albums}
      loading={loading}
      onSelect={handleSelectAlbum}
    />
  );
}
```

#### 2. Presentational Components (프레젠테이션 컴포넌트)

**역할**: UI 렌더링, props를 통한 데이터 표시

**예시**:
- `AlbumCard.tsx` - 앨범 카드 UI
- `TrackItem.tsx` - 트랙 아이템 UI
- `Button.tsx`, `Modal.tsx` 등 UI 컴포넌트

**패턴**:
```typescript
interface AlbumCardProps {
  album: Album;
  onSelect: (id: string) => void;
}

export default function AlbumCard({ 
  album, 
  onSelect 
}: AlbumCardProps) {
  return (
    <div onClick={() => onSelect(album.id)}>
      <img src={album.coverUrl} />
      <h3>{album.title}</h3>
    </div>
  );
}
```

#### 3. HOC & Wrapper Components

**DraggableWidget** - 위젯 래퍼

```typescript
export default function DraggableWidget({
  id,
  children,
  initialPosition,
}: Props) {
  const [position, setPosition] = useState(initialPosition);

  return (
    <Draggable
      position={position}
      onStop={(e, data) => {
        setPosition({ x: data.x, y: data.y });
        localStorage.setItem(`widget-${id}`, JSON.stringify(...));
      }}
    >
      <div className="widget-container">
        {children}
      </div>
    </Draggable>
  );
}
```

---

## 🪟 창 관리 시스템

WISH Archive의 핵심 기능인 창 관리 시스템의 상세 아키텍처입니다.

### 시스템 개요

```
┌─────────────────────────────────────────────────┐
│           Window Management System              │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────┐         ┌─────────────────┐ │
│  │ useWindowStore│ ◄─────► │ WindowRenderer  │ │
│  │  (Zustand)   │         │  (React)        │ │
│  └──────┬───────┘         └────────┬────────┘ │
│         │                           │          │
│         │ state                     │ render   │
│         ↓                           ↓          │
│  ┌──────────────────────────────────────────┐ │
│  │         WindowFrame[] (react-rnd)        │ │
│  │  ┌────────┐ ┌────────┐ ┌────────┐       │ │
│  │  │Window 1│ │Window 2│ │Window 3│ ...   │ │
│  │  └────────┘ └────────┘ └────────┘       │ │
│  └──────────────────────────────────────────┘ │
│                                                  │
└─────────────────────────────────────────────────┘
```

### 창 상태 구조

```typescript
interface WindowState {
  // 식별자
  id: string;                    // 고유 ID
  type: AppType;                 // 앱 타입
  
  // 메타데이터
  title: string;                 // 창 제목
  icon: string;                  // 아이콘 URL
  
  // 위치 & 크기
  position: { x: number; y: number };
  size: { width: number; height: number };
  
  // 상태 플래그
  isMinimized: boolean;          // 최소화 여부
  isMaximized: boolean;          // 최대화 여부
  zIndex: number;                // 레이어 순서
  
  // 최대화 복원용 데이터
  beforeMaximize?: {
    position: { x: number; y: number };
    size: { width: number; height: number };
  };
}
```

### 창 생명주기

```
┌─────────────┐
│   CLOSED    │ (초기 상태)
└──────┬──────┘
       │ openWindow()
       ↓
┌─────────────┐
│   NORMAL    │ ◄─────┐
└──────┬──────┘       │
       │              │
       │ minimizeWindow()
       ↓              │
┌─────────────┐       │
│  MINIMIZED  │       │ restore (taskbar click)
└──────┬──────┘       │
       │              │
       │ (복원)        │
       └──────────────┘
       
       maximizeWindow()
       ↓
┌─────────────┐
│  MAXIMIZED  │
└──────┬──────┘
       │ maximizeWindow() (toggle)
       ↓
┌─────────────┐
│   NORMAL    │
└─────────────┘

       closeWindow()
       ↓
┌─────────────┐
│   CLOSED    │ (창 제거)
└─────────────┘
```

### Z-Index 관리 알고리즘

**목표**: 클릭한 창을 항상 맨 앞으로 가져오기

```typescript
// focusWindow 구현
focusWindow: (id) => {
  set((state) => {
    // 1. 현재 최대 z-index 찾기
    const maxZ = Math.max(...state.windows.map(w => w.zIndex));
    
    // 2. 타겟 창의 z-index를 최대값 + 1로 설정
    const updatedWindows = state.windows.map(w => 
      w.id === id 
        ? { ...w, zIndex: maxZ + 1 }
        : w
    );
    
    return { 
      windows: updatedWindows,
      activeWindowId: id 
    };
  });
}
```

**최적화 고려사항**:
- 🔜 주기적인 z-index 정규화 (오버플로우 방지)
- 🔜 활성 창 하이라이트 스타일

### 창 위치 계산 (Cascading)

**새 창이 열릴 때 자동으로 겹치지 않게 배치**

```typescript
openWindow: (app) => {
  const { windows } = get();
  
  // Cascading 오프셋 계산
  const cascadeOffset = windows.length * 30;
  
  const newWindow: WindowState = {
    id: app.id,
    type: app.type,
    position: {
      x: (app.defaultPosition?.x ?? 100) + cascadeOffset,
      y: (app.defaultPosition?.y ?? 100) + cascadeOffset,
    },
    size: app.defaultSize ?? { width: 600, height: 400 },
    zIndex: maxZ + 1,
    // ...
  };
  
  set({ windows: [...windows, newWindow] });
}
```

**결과**: 새 창이 우하단으로 30px씩 밀려서 열림

---

## 🎨 렌더링 전략

### Server vs Client Components

Next.js 16 App Router는 기본적으로 Server Components를 사용합니다.

#### Server Components (서버 컴포넌트)

**사용 위치**:
- `layout.tsx` - 루트 레이아웃
- API Routes - 서버리스 함수

**장점**:
- ✅ 서버에서 렌더링 (초기 로딩 속도 ↑)
- ✅ 번들 크기 감소 (클라이언트 JS 최소화)
- ✅ 직접 DB 접근 가능

**제한**:
- ❌ React Hooks 사용 불가
- ❌ 브라우저 API 접근 불가
- ❌ 이벤트 핸들러 사용 불가

#### Client Components (클라이언트 컴포넌트)

**사용 위치**:
- `page.tsx` - 메인 데스크톱 화면
- 모든 OS 컴포넌트 (WindowFrame, Taskbar 등)
- 모든 앱 & 위젯
- 인터랙티브 UI 컴포넌트

**선언 방법**:
```typescript
'use client'; // 파일 상단에 명시

import { useState } from 'react';

export default function MyComponent() {
  const [state, setState] = useState();
  // ...
}
```

**사용 이유**:
- ✅ React Hooks 필요
- ✅ 브라우저 API 필요 (localStorage, window 등)
- ✅ 이벤트 핸들러 필요
- ✅ Zustand 같은 클라이언트 상태 관리 필요

### 렌더링 최적화 기법

#### 1. React.memo

**불필요한 리렌더링 방지**

```typescript
export default React.memo(function AlbumCard({ album }) {
  return <div>...</div>;
}, (prevProps, nextProps) => {
  // album.id가 같으면 리렌더링 스킵
  return prevProps.album.id === nextProps.album.id;
});
```

#### 2. useMemo & useCallback

```typescript
export default function Discography() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [filter, setFilter] = useState('');

  // 필터링된 앨범 메모이제이션
  const filteredAlbums = useMemo(() => {
    return albums.filter(a => 
      a.title.toLowerCase().includes(filter.toLowerCase())
    );
  }, [albums, filter]);

  // 콜백 메모이제이션
  const handleSelect = useCallback((id: string) => {
    // ...
  }, []);

  return <AlbumList albums={filteredAlbums} onSelect={handleSelect} />;
}
```

#### 3. Code Splitting (코드 분할)

**동적 import로 초기 번들 크기 감소**

```typescript
// 필요할 때만 로드
import dynamic from 'next/dynamic';

const WichuTamagotchiWidget = dynamic(
  () => import('@/components/widgets/WichuTamagotchiWidget'),
  { 
    loading: () => <Spinner />,
    ssr: false // Three.js는 서버에서 렌더링 불가
  }
);
```

#### 4. Image Optimization

**Next.js Image 컴포넌트 사용**

```typescript
import Image from 'next/image';

<Image
  src={album.coverUrl}
  alt={album.title}
  width={300}
  height={300}
  loading="lazy"        // 레이지 로딩
  placeholder="blur"    // 블러 플레이스홀더
/>
```

---

## 🗄️ 데이터베이스 아키텍처

### 스키마 설계 원칙

1. **정규화**: 3NF까지 정규화하여 데이터 중복 최소화
2. **관계 설정**: 외래 키로 데이터 무결성 보장
3. **인덱싱**: 자주 쿼리되는 필드에 인덱스 설정
4. **타입 안정성**: ENUM 타입으로 값 제한

### 핵심 모델 관계도

```
┌─────────┐
│  Group  │
└────┬────┘
     │ 1
     │
     │ N
┌────┴────┐         ┌────────┐
│ Member  │ ────N─► │ Event  │
└────┬────┘    N    └────┬───┘
     │ 1              1   │
     │                    │ N
     │ N              ┌───┴──────┐
┌────┴────┐          │EventMember│
│  Era    │          └──────────┘
└────┬────┘
     │ 1
     │
     │ N
┌────┴────┐
│  Album  │
└────┬────┘
     │ 1
     │
     │ N
┌────┴────┐
│  Track  │
└────┬────┘
     │ 1
     │
     │ N
┌────┴────┐
│  Lyric  │
└─────────┘
```

### 주요 쿼리 패턴

#### 1. Include (관계 로드)

```typescript
// 앨범과 수록곡 함께 로드
const albums = await prisma.album.findMany({
  include: {
    tracks: {
      orderBy: { trackNumber: 'asc' }
    },
    era: true,
  },
});
```

#### 2. Nested Writes (중첩 생성)

```typescript
// 앨범과 트랙 동시 생성
const album = await prisma.album.create({
  data: {
    title: 'WISH',
    tracks: {
      create: [
        { title: 'NASA', trackNumber: 1 },
        { title: 'Songbird', trackNumber: 2 },
      ],
    },
  },
});
```

#### 3. Filtering & Ordering

```typescript
// 2024년 발매 앨범만 최신순
const albums = await prisma.album.findMany({
  where: {
    releaseDate: {
      gte: new Date('2024-01-01'),
      lt: new Date('2025-01-01'),
    },
  },
  orderBy: {
    releaseDate: 'desc',
  },
});
```

---

## 🔐 보안 및 인증

### 현재 구현

**현재는 읽기 전용 공개 사이트로, 인증 없음**

### 향후 계획

#### 1. Row Level Security (RLS)

```sql
-- 사용자는 자신의 소원만 수정/삭제 가능
CREATE POLICY "Users can only delete/update own wishes"
ON wishes FOR UPDATE OR DELETE
USING (auth.uid() = user_id);
```

#### 3. API Route 보호

```typescript
// Middleware로 인증 확인
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token');
  
  if (!token) {
    return NextResponse.redirect('/login');
  }
  
  return NextResponse.next();
}
```

---

## 🚀 성능 최적화

### 현재 적용된 최적화

✅ **Next.js 자동 최적화**
- 이미지 최적화 (Next/Image)
- 폰트 최적화 (next/font)
- 코드 스플리팅

✅ **Prisma 쿼리 최적화**
- Include로 N+1 방지
- 필요한 필드만 select

✅ **React 최적화**
- React.memo로 불필요한 리렌더링 방지
- useMemo/useCallback

### 향후 최적화 계획

🔜 **React Query 도입**
- 서버 상태 캐싱
- 자동 리페치
- Optimistic Updates

🔜 **가상 스크롤**
- 긴 목록 렌더링 최적화 (react-window)

🔜 **Service Worker**
- 오프라인 지원
- 백그라운드 동기화

🔜 **CDN 캐싱**
- Vercel Edge Network
- Cloudinary CDN

---

## 📐 디자인 패턴

### 1. Repository Pattern (예정)

**목적**: 데이터 접근 로직을 비즈니스 로직에서 분리

```typescript
// src/server/repos/albumRepo.ts
export class AlbumRepository {
  async findAll(): Promise<Album[]> {
    return prisma.album.findMany({
      include: { tracks: true },
    });
  }

  async findById(id: string): Promise<Album | null> {
    return prisma.album.findUnique({
      where: { id },
      include: { tracks: true },
    });
  }
}

// API Route에서 사용
import { AlbumRepository } from '@/server/repos/albumRepo';

export async function GET() {
  const repo = new AlbumRepository();
  const albums = await repo.findAll();
  return NextResponse.json(albums);
}
```

### 2. Singleton Pattern

**Prisma 클라이언트 싱글톤**

```typescript
// src/lib/prisma.ts
const globalForPrisma = globalThis as unknown as { 
  prisma?: PrismaClient 
};

export const prisma = globalForPrisma.prisma ?? 
  new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
```

### 3. Compound Component Pattern

**WindowFrame + Apps**

```typescript
<WindowFrame>
  {/* 자식 컴포넌트가 창 내부 콘텐츠 */}
  <Discography />
</WindowFrame>
```

### 4. Render Props Pattern

**DraggableWidget**

```typescript
<DraggableWidget id="quote">
  {(isDragging) => (
    <div className={isDragging ? 'opacity-50' : ''}>
      <MembersQuote />
    </div>
  )}
</DraggableWidget>
```

---

## 🧪 테스트 전략 (향후)

### 단위 테스트
- Jest + React Testing Library
- 순수 함수, 유틸리티 테스트

### 통합 테스트
- API Routes 테스트
- Prisma 쿼리 테스트

### E2E 테스트
- Playwright
- 사용자 시나리오 테스트 (모바일(Android/iOS 각각), 태블릿, 데스크톱 각각에서 세로, 가로 모드에서의 반응형 테스트 포함)

---

## 📊 모니터링 & 로깅 (향후)

### 에러 트래킹
- Sentry 통합

### 애널리틱스
- Google Analytics 4
- Vercel Analytics

### 성능 모니터링
- Lighthouse CI
- Web Vitals 추적

---

## 🎯 아키텍처 의사결정 기록 (ADR)

### ADR-001: Next.js App Router 선택

**결정**: Next.js 16 App Router 사용

**이유**:
- ✅ Server Components로 성능 향상
- ✅ 파일 기반 라우팅 간편함
- ✅ API Routes로 백엔드 통합
- ✅ Vercel 배포 최적화

**대안**: Pages Router, React SPA + Express

---

### ADR-002: Zustand 상태 관리 선택

**결정**: Zustand 사용

**이유**:
- ✅ 간단한 API (Redux 대비)
- ✅ TypeScript 완벽 지원
- ✅ 작은 번들 크기 (~1KB)
- ✅ DevTools 지원

**대안**: Redux Toolkit, Jotai, Recoil

---

### ADR-003: Prisma ORM 선택

**결정**: Prisma 사용

**이유**:
- ✅ 타입 안전한 쿼리
- ✅ 마이그레이션 자동화
- ✅ 우수한 DX (Developer Experience)
- ✅ Next.js와 완벽 통합

**대안**: TypeORM, Sequelize, Drizzle

---

### ADR-004: PostgreSQL 데이터베이스 선택

**결정**: PostgreSQL on Supabase

**이유**:
- ✅ 관계형 데이터 모델 적합
- ✅ ACID 트랜잭션 보장
- ✅ JSON 필드 지원
- ✅ Supabase 무료 티어

**대안**: MongoDB, MySQL, Firebase

---

## 🔮 향후 아키텍처 개선 계획

### Phase 1: 성능 최적화
- [ ] React Query 도입
- [ ] 가상 스크롤 구현
- [ ] 이미지 레이지 로딩 최적화

### Phase 2: 기능 확장
- [ ] 사용자 인증 (Supabase Auth)
- [ ] 실시간 업데이트 (Supabase Realtime)
- [ ] 검색 기능 (PostgreSQL Full-Text Search)

### Phase 3: 인프라 개선
- [ ] CI/CD 파이프라인 구축
- [ ] 자동화된 테스트
- [ ] 성능 모니터링

### Phase 4: 스케일링
- [ ] 데이터베이스 인덱싱 최적화
- [ ] Redis 캐싱 레이어
- [ ] CDN 통합

---

## 📚 참고 자료

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Zustand Documentation](https://docs.pmnd.rs/zustand)
- [React Architecture Best Practices](https://react.dev/learn/thinking-in-react)

---

**Last Updated:** 2025-12-29  
**Version:** 0.1.0  
**Author:** Park Ju Eul (rope_park)
