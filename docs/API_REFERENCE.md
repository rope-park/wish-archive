# 🌐 WISH Archive - API Reference

> Next.js 16 App Router 기반 RESTful API 완전 명세서

---

## 📋 목차

1. [API 개요](#-api-개요)
2. [인증 및 보안](#-인증-및-보안)
3. [공통 응답 형식](#-공통-응답-형식)
4. [그룹 API](#-그룹-api)
5. [멤버 API](#-멤버-api)
6. [음반 API](#-음반-api)
7. [아카이브 API](#-아카이브-api)
8. [갤러리 API](#-갤러리-api)
9. [위젯 API](#-위젯-api)
10. [통계 API](#-통계-api)
11. [에러 코드](#-에러-코드)

---

## 🎯 API 개요

### 기본 정보

| 항목 | 내용 |
|-----|------|
| **Base URL** | `https://wish-archive.vercel.app/api` (Production)<br/>`http://localhost:3000/api` (Development) |
| **API 버전** | v1 (URL에 버전 없음) |
| **응답 형식** | JSON |
| **문자 인코딩** | UTF-8 |
| **요청 메서드** | GET, POST |

### 현재 구현된 API (10개)

```
/api
├── /group                       [GET]  그룹 정보
├── /members                     [GET]  멤버 목록
├── /releases                    [GET]  음반 목록 (전체)
├── /discography                 [GET]  디스코그래피
├── /archive                     [GET]  아카이브 트리
├── /gallery                     [GET]  갤러리 (Cloudinary)
├── /events                      [GET]  이벤트 목록
├── /lyrics                      [GET]  가사 조회
├── /stats                       [GET]  시스템 통계
└── /widgets
    ├── /dday                    [GET]  D-Day 위젯
    ├── /quotes/random           [GET]  랜덤 명언
    └── /wishes                  [GET, POST]  소원 항아리
```

---

## 🔐 인증 및 보안

### 현재 상태 (Public API)

- **인증 방식**: 없음 (모든 API 공개)
- **CORS**: Next.js 기본 설정 (Same-Origin)
- **Rate Limiting**: 미구현

### 향후 계획 (Phase 1)

```typescript
// 예정: JWT Bearer Token 인증
Authorization: Bearer <access_token>
```

---

## 📦 공통 응답 형식

### 성공 응답

```json
{
  "id": "cm123abc",
  "name": "NCT WISH",
  "members": [...]
}
```

### 에러 응답

```json
{
  "error": "Error message here",
  "details": "Optional detailed information"
}
```

### HTTP 상태 코드

| 코드 | 의미 | 사용 예시 |
|-----|------|-----------|
| 200 | OK | 성공적인 GET 요청 |
| 201 | Created | 성공적인 POST 요청 (리소스 생성) |
| 400 | Bad Request | 잘못된 요청 파라미터 |
| 404 | Not Found | 리소스를 찾을 수 없음 |
| 500 | Internal Server Error | 서버 오류 |

---

## 👥 그룹 API

### `GET /api/group`

그룹(NCT WISH)의 기본 정보를 조회합니다.

#### Request

```http
GET /api/group HTTP/1.1
Host: wish-archive.vercel.app
```

#### Response

```json
{
  "id": "cm4k9abc123",
  "slug": "nct-wish",
  "name": "NCT WISH",
  "nameKo": "엔시티 위시",
  "nameJa": "NCT WISH",
  "debutDate": "2024-02-21T00:00:00.000Z",
  "formationDate": "2023-12-04T00:00:00.000Z",
  "fandomName": "NCTzen WISH",
  "officialColor": "PEARL NEO CHAMPAGNE",
  "logoUrl": "https://res.cloudinary.com/.../logo.png",
  "iconUrl": "https://res.cloudinary.com/.../icon.png",
  "agency": "SM Entertainment",
  "label": "SM Entertainment",
  "description": "일본 데뷔를 목표로 결성된 NCT의 다섯 번째 유닛",
  "externalLinks": [
    {
      "id": "link1",
      "type": "YOUTUBE",
      "title": "NCT WISH Official YouTube",
      "url": "https://youtube.com/@NCTWISH",
      "order": 1
    },
    {
      "type": "INSTAGRAM",
      "url": "https://instagram.com/nctwish_official",
      "order": 2
    }
  ],
  "createdAt": "2024-11-12T09:00:00.000Z",
  "updatedAt": "2024-12-29T10:30:00.000Z"
}
```

#### 필드 설명

| 필드 | 타입 | 설명 |
|-----|------|------|
| `slug` | string | URL 친화적 식별자 |
| `debutDate` | ISO 8601 | 데뷔일 (2024-02-21) |
| `officialColor` | string | 공식 응원 색상 |
| `externalLinks` | array | 외부 링크 목록 (순서대로 정렬됨) |

#### 에러 케이스

```json
// 404 - 그룹을 찾을 수 없음
{
  "error": "Group not found"
}
```

---

## 👤 멤버 API

### `GET /api/members`

NCT WISH 멤버 6명의 프로필 정보를 조회합니다.

#### Request

```http
GET /api/members HTTP/1.1
Host: wish-archive.vercel.app
```

#### Query Parameters

없음

#### Response

```json
[
  {
    "id": "cm4k9member01",
    "groupId": "cm4k9abc123",
    "stageName": "SION",
    "name": "오시온",
    "nameEn": "Oh Sion",
    "birthDate": "2002-05-26T00:00:00.000Z",
    "nationality": "대한민국",
    "hometown": "대전",
    "positions": "리더, 보컬, 래퍼",
    "emoji": "🌷",
    "ownNumber": "01",
    "bloodType": "B",
    "mbti": "ISTP",
    "description": "시온의 자세한 프로필...",
    "profileImageUrl": "https://res.cloudinary.com/.../sion.jpg",
    "iconUrl": "https://res.cloudinary.com/.../sion_icon.png",
    "characterUrl": "https://res.cloudinary.com/.../sion_character.png",
    "colorCode": "#E63946",
    "isActive": true,
    "joinDate": "2023-12-04T00:00:00.000Z",
    "createdAt": "2024-11-12T09:00:00.000Z",
    "updatedAt": "2024-12-15T14:20:00.000Z"
  },
  {
    "stageName": "RIKU",
    "name": "마에다 리쿠",
    "nameEn": "Maeda Riku",
    "emoji": "🐥",
    "ownNumber": "02",
    "colorCode": "#FFD60A",
    ...
  }
  // ... 나머지 멤버 (총 6명)
]
```

#### 정렬 기준

- **기본 정렬**: `birthDate` ASC (생일 빠른 순)
- Sion → Riku → Yushi → Jaehee → Ryo → Sakuya

#### 필드 설명

| 필드 | 타입 | 필수 | 설명 |
|-----|------|-----|------|
| `stageName` | string | ✅ | 활동명 (예: SION) |
| `emoji` | string | ❌ | 멤버 이모지 |
| `ownNumber` | string | ❌ | 멤버 번호 (01~06) |
| `colorCode` | string | ❌ | 멤버 대표 색상 (Hex) |
| `characterUrl` | string | ❌ | 위시돌 캐릭터 이미지 |
| `isActive` | boolean | ✅ | 활동 여부 |

---

## 💿 음반 API

### `GET /api/releases`

전체 앨범 목록과 수록곡을 조회합니다.

#### Request

```http
GET /api/releases HTTP/1.1
Host: wish-archive.vercel.app
```

#### Response

```json
[
  {
    "id": "cm4k9album01",
    "slug": "songbird",
    "title": "Songbird",
    "releaseDate": "2024-07-25T00:00:00.000Z",
    "type": "MINI_ALBUM",
    "trackCount": 6,
    "totalLengthSec": 1200,
    "label": "SM Entertainment",
    "distributor": "Dreamus",
    "coverImageUrl": "https://res.cloudinary.com/.../songbird_cover.jpg",
    "diskImageUrl": "https://res.cloudinary.com/.../songbird_disk.png",
    "iconUrl": "https://res.cloudinary.com/.../songbird_icon.png",
    "themeColor": "#E8F5E9",
    "themeTextColor": "#2E7D32",
    "mvUrl": "https://youtu.be/abc123",
    "market": "KOREA",
    "primaryLanguage": "KOREAN",
    "isPreDebut": false,
    "isOst": false,
    "group": {
      "id": "cm4k9abc123",
      "name": "NCT WISH"
    },
    "tracks": [
      {
        "id": "track01",
        "albumId": "cm4k9album01",
        "trackNumber": 1,
        "title": "Songbird",
        "durationSec": 195,
        "genre": "Dance Pop",
        "isTitle": true,
        "isSingle": false,
        "hasMv": true,
        "language": "KOREAN",
        "releaseDate": "2024-07-25T00:00:00.000Z",
        "mvUrl": "https://youtu.be/abc123",
        "themeColor": "#4CAF50"
      },
      {
        "trackNumber": 2,
        "title": "Tears Are Falling",
        "isTitle": false,
        ...
      }
      // ... 나머지 트랙 (총 6곡)
    ],
    "createdAt": "2024-11-12T09:00:00.000Z",
    "updatedAt": "2024-12-20T11:00:00.000Z"
  }
  // ... 나머지 앨범
]
```

#### 정렬 기준

- **기본 정렬**: `releaseDate` DESC (최신 발매순)

#### 필드 설명

| 필드 | 타입 | 설명 |
|-----|------|------|
| `type` | ReleaseType | STUDIO_ALBUM, MINI_ALBUM, SINGLE_ALBUM, DIGITAL_SINGLE, PARTICIPATION |
| `market` | Market | KOREA, JAPAN, GLOBAL |
| `themeColor` | string | UI 테마 색상 (Hex) |
| `isPreDebut` | boolean | 데뷔 전 앨범 여부 |
| `tracks` | Track[] | 수록곡 배열 (트랙 번호순) |

---

### `GET /api/discography`

디스코그래피 앱에서 사용하는 앨범 목록입니다. `/api/releases`와 거의 동일하나 `group` include가 없습니다.

#### Request

```http
GET /api/discography HTTP/1.1
```

#### Response

```json
[
  {
    "id": "...",
    "title": "Songbird",
    "releaseDate": "2024-07-25T00:00:00.000Z",
    "tracks": [
      {
        "trackNumber": 1,
        "title": "Songbird",
        ...
      }
    ]
  }
]
```

#### `/releases`와의 차이점

| 항목 | `/releases` | `/discography` |
|-----|-------------|----------------|
| `group` include | ✅ | ❌ |
| 사용처 | 일반 앨범 목록 | Discography 앱 |

---

## 📂 아카이브 API

### `GET /api/archive`

연도/Era별 계층 구조로 된 아카이브 파일 트리를 반환합니다.

#### Request

```http
GET /api/archive HTTP/1.1
```

#### Response

```json
{
  "name": "내 컴퓨터",
  "type": "root",
  "children": [
    {
      "name": "WISH Archive (D:)",
      "type": "drive",
      "children": [
        {
          "name": "2024",
          "type": "folder",
          "children": [
            {
              "id": "era_wish",
              "name": "WISH Era",
              "type": "era",
              "description": "데뷔 첫 미니앨범 활동기",
              "children": [
                {
                  "id": "album_wish",
                  "name": "WISH",
                  "type": "album",
                  "date": "2024-02-28T00:00:00.000Z",
                  "cover": "https://res.cloudinary.com/.../wish_cover.jpg"
                },
                {
                  "id": "event_showcase",
                  "name": "WISH Showcase",
                  "type": "event",
                  "eventType": "SHOWCASE",
                  "date": "2024-02-28T00:00:00.000Z"
                },
                {
                  "name": "Music Bank 출연",
                  "type": "event",
                  "eventType": "MUSIC_SHOW",
                  "date": "2024-03-01T00:00:00.000Z"
                }
              ]
            },
            {
              "name": "Songbird Era",
              "type": "era",
              "children": [...]
            }
          ]
        },
        {
          "name": "2025",
          "type": "folder",
          "children": []
        }
      ]
    }
  ]
}
```

#### 노드 타입

| Type | 설명 | 자식 노드 |
|------|------|----------|
| `root` | 최상위 루트 | drive |
| `drive` | 드라이브 (D:) | folder (연도) |
| `folder` | 연도 폴더 (2024) | era, event |
| `era` | 활동 시기 | album, event |
| `album` | 앨범 파일 | 없음 (리프 노드) |
| `event` | 이벤트 파일 | 없음 (리프 노드) |

#### 정렬 규칙

1. 연도 폴더: 오름차순 (2024 → 2025)
2. Era 내부: `date` ASC (날짜순)
3. Misc 이벤트: Era 없는 이벤트들

#### 사용처

- **ArchiveApp**: Windows 탐색기 스타일 파일 트리

---

## 🖼️ 갤러리 API

### `GET /api/gallery`

Cloudinary 기반 이미지 갤러리 데이터를 조회합니다.

#### Request

```http
GET /api/gallery?mode=folder&path=nct-wish/events/2024 HTTP/1.1
```

#### Query Parameters

| 파라미터 | 타입 | 필수 | 기본값 | 설명 |
|---------|------|-----|--------|------|
| `mode` | string | ❌ | `folder` | `folder` (폴더 탐색) / `widget` (태그 검색) |
| `path` | string | ❌ | `nct-wish` | Cloudinary 폴더 경로 |
| `tag` | string | ❌ | - | 필터 태그 (멤버명 등) |
| `subTag` | string | ❌ | - | 추가 필터 (widget 모드) |

#### Response (Folder Mode)

```json
{
  "mode": "folder",
  "path": "nct-wish/events/2024",
  "filterTag": "",
  "items": [
    {
      "id": "nct-wish/events/2024/0221_debut",
      "name": "0221_debut",
      "type": "folder",
      "path": "nct-wish/events/2024/0221_debut"
    },
    {
      "id": "nct-wish/events/2024/showcase_001",
      "name": "showcase_001.jpg",
      "type": "image",
      "src": "https://res.cloudinary.com/...jpg",
      "width": 1920,
      "height": 1080,
      "format": "jpg",
      "createdAt": "2024-02-21T10:00:00.000Z",
      "caption": "데뷔 쇼케이스 단체 사진",
      "tags": ["debut", "showcase", "group"]
    }
  ]
}
```

#### Response (Widget Mode)

```json
{
  "mode": "widget",
  "path": "",
  "filterTag": "widget-polaroid",
  "items": [
    {
      "id": "nct-wish/polaroid/sion_001",
      "name": "sion_001.jpg",
      "type": "image",
      "src": "https://res.cloudinary.com/...jpg",
      "width": 800,
      "height": 1000,
      "caption": "SION 폴라로이드",
      "tags": ["widget-polaroid", "sion"]
    }
  ]
}
```

#### Mode 상세 설명

**1. Folder Mode** (`mode=folder`)
- Windows 탐색기처럼 폴더 구조 탐색
- 하위 폴더 + 이미지 모두 반환
- `tag` 사용 시 폴더 내 필터링 (하위 폴더 숨김)

**2. Widget Mode** (`mode=widget`)
- 전체 이미지에서 태그 검색
- 폴더 구조 무시, `path` 무시
- 예: `tag=widget-polaroid&subTag=sion`

#### Cloudinary Expression 생성 로직

```typescript
// Folder Mode
expression = `folder:"nct-wish/events/2024" AND tags:sion`

// Widget Mode
expression = `tags:widget-polaroid AND tags:sion`
```

#### 사용처

- **GalleryApp**: 폴더 탐색
- **PolaroidWidget**: `mode=widget&tag=widget-polaroid`
- **PhotocardWidget**: `mode=widget&tag=widget-photocard`

---

## 🎮 위젯 API

### `GET /api/widgets/dday`

D-Day 위젯에 표시할 목표 날짜와 라벨을 반환합니다.

#### Request

```http
GET /api/widgets/dday HTTP/1.1
```

#### Response

```json
{
  "date": "2024-02-21T00:00:00.000Z",
  "label": "Debut",
  "name": "NCT WISH"
}
```

#### 계산 로직

- **서버**: 그룹 데뷔일 반환
- **클라이언트**: D-Day 계산 (`today - debutDate`)

#### Caching

```typescript
export const revalidate = 86400; // 24시간 캐시 (ISR)
```

---

### `GET /api/widgets/quotes/random`

멤버 랜덤 명언을 조회합니다.

#### Request

```http
GET /api/widgets/quotes/random HTTP/1.1
```

#### Response

```json
{
  "id": "cm4k9quote01",
  "content": "항상 최선을 다하는 모습 보여드릴게요!",
  "memberId": "cm4k9member01",
  "member": {
    "stageName": "SION",
    "characterUrl": "https://res.cloudinary.com/.../sion_character.png",
    "colorCode": "#E63946"
  },
  "createdAt": "2024-11-12T09:00:00.000Z",
  "updatedAt": "2024-11-12T09:00:00.000Z"
}
```

#### 랜덤 알고리즘

```typescript
const count = await prisma.quote.count();
const skip = Math.floor(Math.random() * count);
const quote = await prisma.quote.findFirst({ skip });
```

#### Dynamic Rendering

```typescript
export const dynamic = 'force-dynamic'; // 매 요청마다 새로운 명언
```

---

### `GET /api/widgets/tracks`

MV 플레이리스트 데이터를 조회합니다.

#### Request

```http
GET /api/widgets/tracks HTTP/1.1
```

#### Response

```json
[
  {
    "id": "abc123XYZ",
    "trackId": "cm4k9track01",
    "title": "Songbird",
    "album": "Songbird",
    "themeColor": "#4CAF50"
  },
  {
    "id": "def456UVW",
    "title": "NASA",
    "album": "Steady",
    "themeColor": "#2196F3"
  }
]
```

#### 필드 설명

| 필드 | 타입 | 설명 |
|-----|------|------|
| `id` | string | YouTube Video ID (11자) |
| `trackId` | string | Track 모델 ID |
| `themeColor` | string | 테마 색상 |

#### YouTube URL 파싱

```typescript
// 지원하는 URL 형식:
// - https://youtu.be/abc123XYZ
// - https://youtube.com/watch?v=abc123XYZ
// - https://www.youtube.com/embed/abc123XYZ

const regex = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([a-zA-Z0-9_-]{11})/;
const videoId = mvUrl.match(regex)?.[1];
```

#### 필터 조건

- `hasMv: true`
- `mvUrl IS NOT NULL`

---

### `GET /api/widgets/wishes`

소원 항아리 위젯 데이터를 조회합니다.

#### Request

```http
GET /api/widgets/wishes HTTP/1.1
```

#### Response

```json
[
  {
    "id": "cm4k9wish01",
    "content": "NCT WISH 음방 1위 가자!",
    "nickname": "시즈니A",
    "color": "yellow",
    "posX": 45.2,
    "posY": 30.8,
    "rotation": -5.3,
    "createdAt": "2024-12-28T15:30:00.000Z"
  },
  {
    "content": "월드투어 가자!",
    "nickname": "익명의 시즈니",
    "color": "pink",
    "posX": 70.1,
    "posY": 55.4,
    "rotation": 8.7,
    ...
  }
  // 총 5개 (랜덤)
]
```

#### 랜덤 알고리즘

```typescript
// 최근 20개 중 랜덤 5개 선택
const wishes = await prisma.wish.findMany({ take: 20, orderBy: { createdAt: 'desc' } });
const shuffled = wishes.sort(() => 0.5 - Math.random()).slice(0, 5);
```

---

### `POST /api/widgets/wishes`

새로운 소원을 작성합니다.

#### Request

```http
POST /api/widgets/wishes HTTP/1.1
Content-Type: application/json

{
  "content": "NCT WISH 사랑해!",
  "nickname": "시즈니",
  "color": "blue"
}
```

#### Request Body

| 필드 | 타입 | 필수 | 기본값 | 설명 |
|-----|------|-----|--------|------|
| `content` | string | ✅ | - | 소원 내용 (최대 500자) |
| `nickname` | string | ❌ | `익명의 시즈니` | 작성자 닉네임 |
| `color` | string | ❌ | `yellow` | 메모지 색상 |

#### Response (201 Created)

```json
{
  "id": "cm4k9wish99",
  "content": "NCT WISH 사랑해!",
  "nickname": "시즈니",
  "color": "blue",
  "posX": 62.4,
  "posY": 41.8,
  "rotation": -12.3,
  "createdAt": "2024-12-29T10:30:00.000Z"
}
```

#### 자동 생성 값

```typescript
posX: Math.random() * 80 + 10,      // 10~90%
posY: Math.random() * 80 + 10,      // 10~90%
rotation: Math.random() * 30 - 15   // -15 ~ 15도
```

#### Validation

```typescript
if (!content) {
  return NextResponse.json({ error: 'Content required' }, { status: 400 });
}
```

---

## 📊 통계 API

### `GET /api/stats`

시스템 전체 통계 데이터를 조회합니다.

#### Request

```http
GET /api/stats HTTP/1.1
```

#### Response

```json
{
  "albums": 11,
  "tracks": 66,
  "events": 234,
  "contents": 512,
  "awards": 45,
  "recentLogs": [
    {
      "id": "cm4k9event01",
      "name": "SBS_Inkigayo_Performance.exe",
      "date": "2024-12-28T00:00:00.000Z",
      "type": "MUSIC_SHOW",
      "memUsage": 3456
    },
    {
      "name": "Weverse_Live_Riku.exe",
      "date": "2024-12-27T15:00:00.000Z",
      "type": "ONLINE_CONTENT",
      "memUsage": 2134
    }
    // ... 총 10개
  ]
}
```

#### 통계 항목

| 필드 | 설명 | 데이터 소스 |
|-----|------|-----------|
| `albums` | 총 앨범 수 | Album 테이블 COUNT |
| `tracks` | 총 수록곡 수 | Track 테이블 COUNT |
| `events` | 총 활동 수 | Event 테이블 COUNT |
| `contents` | 총 콘텐츠 수 | Content 테이블 COUNT |
| `awards` | 총 수상 실적 | AwardWin 테이블 COUNT |

#### Recent Logs

- 최근 10개 Event를 프로세스 형태로 변환
- 날짜순 정렬 (`date DESC`)
- `.exe` 확장자로 Windows 프로세스 느낌 연출

```typescript
recentLogs: recentEvents.map(event => ({
  name: `${event.title.replace(/\s+/g, '_')}.exe`,
  memUsage: Math.floor(Math.random() * 5000) + 1000
}))
```

#### 사용처

- **TaskManager Widget**: 시스템 프로세스 표시
- **Dashboard**: 전체 통계 요약

---

## ❌ 에러 코드

### 공통 에러

| 코드 | 메시지 | 원인 |
|-----|--------|------|
| 400 | `Content required` | 필수 필드 누락 |
| 404 | `Group not found` | 리소스 없음 |
| 404 | `No quotes found` | 데이터 없음 |
| 500 | `Failed to fetch...` | 데이터베이스 에러 |
| 500 | `Internal Server Error` | 서버 오류 |

### Prisma 에러 처리

```typescript
try {
  const data = await prisma.model.findMany();
  return NextResponse.json(data);
} catch (error) {
  console.error('API Error:', error);
  return NextResponse.json(
    { error: 'Failed to fetch data' },
    { status: 500 }
  );
}
```

---

## 🔄 API 버전 관리

### 현재 전략 (v1)

- URL에 버전 없음 (`/api/members`)
- Breaking Change 시 새 엔드포인트 생성

### 향후 계획 (v2)

```
/api/v2/members
/api/v2/albums
```

---

## 🚀 성능 최적화

### 1. Prisma Include 최적화

```typescript
// ❌ N+1 쿼리 발생
const albums = await prisma.album.findMany();
for (const album of albums) {
  const tracks = await prisma.track.findMany({ where: { albumId: album.id } });
}

// ✅ Include로 한 번에
const albums = await prisma.album.findMany({
  include: { tracks: true }
});
```

### 2. Select로 필요한 필드만

```typescript
// API 응답 크기 최소화
select: {
  id: true,
  title: true,
  coverImageUrl: true
}
```

### 3. ISR (Incremental Static Regeneration)

```typescript
// D-Day 위젯은 24시간 캐시
export const revalidate = 86400;
```

---

## 📝 API 사용 예제

### React Query (TanStack Query)

```typescript
import { useQuery } from '@tanstack/react-query';

const useMembers = () => {
  return useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await fetch('/api/members');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};

// 컴포넌트에서 사용
const { data: members, isLoading } = useMembers();
```

### Server Component (Next.js 15+)

```typescript
// app/members/page.tsx
import { prisma } from '@/lib/prisma';

export default async function MembersPage() {
  // API 호출 대신 직접 DB 쿼리
  const members = await prisma.member.findMany({
    orderBy: { birthDate: 'asc' }
  });

  return <MemberList members={members} />;
}
```

### SWR

```typescript
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then(r => r.json());

function useGroup() {
  const { data, error } = useSWR('/api/group', fetcher);
  return { group: data, isLoading: !error && !data, error };
}
```

---

## 🔮 향후 개발 계획

### Phase 1: 검색 API (우선순위 🔴)

```typescript
GET /api/search?q=songbird&type=track
GET /api/search/albums?q=wish
GET /api/search/tracks?q=nasa
GET /api/search/members?q=riku
```

**응답 예시**:
```json
{
  "query": "songbird",
  "type": "track",
  "results": [
    {
      "id": "track_id",
      "title": "Songbird",
      "album": "Songbird",
      "score": 0.95
    }
  ],
  "total": 1
}
```

---

### Phase 2: 페이징 및 필터링 (우선순위 🟡)

```typescript
GET /api/albums?page=1&limit=10&type=MINI_ALBUM&market=KOREA
GET /api/events?startDate=2024-01-01&endDate=2024-12-31&type=CONCERT
```

**Query Parameters**:
- `page`: 페이지 번호 (기본: 1)
- `limit`: 페이지당 항목 수 (기본: 20, 최대: 100)
- `sortBy`: 정렬 필드 (예: `releaseDate`)
- `order`: `asc` / `desc`

**응답 예시**:
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 45,
    "totalPages": 5
  }
}
```

---

### Phase 3: 사용자 인증 API (우선순위 🟡)

```typescript
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET  /api/auth/me
PUT  /api/users/:id
```

**JWT 인증**:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### Phase 4: 댓글/좋아요 API (우선순위 🟢)

```typescript
GET    /api/comments?albumId=xxx
POST   /api/comments
PUT    /api/comments/:id
DELETE /api/comments/:id

POST   /api/likes
GET    /api/likes/me
DELETE /api/likes/:id
```

---

### Phase 5: 관리자 CMS API (우선순위 🔵)

```typescript
POST   /api/admin/albums
PUT    /api/admin/albums/:id
DELETE /api/admin/albums/:id
POST   /api/admin/tracks
PUT    /api/admin/users/:id/ban
```

**인증 요구사항**:
- Role: `ADMIN` 또는 `MODERATOR`

---

## 📚 참고 자료

### 관련 문서

- [DATABASE.md](./DATABASE.md) - Prisma 스키마 및 모델 설명
- [ARCHITECTURE.md](./ARCHITECTURE.md) - 시스템 아키텍처
- [FILE_STRUCTURE.md](./FILE_STRUCTURE.md) - 파일 구조 가이드

### 외부 리소스

- [Next.js Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [Cloudinary Search API](https://cloudinary.com/documentation/search_api)

---

**Last Updated:** 2025-12-29  
**API Version:** v1  
**Total Endpoints:** 11  
**Author:** Park Ju Eul (rope_park)
