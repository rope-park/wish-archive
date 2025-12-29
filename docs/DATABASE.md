# 🗄️ WISH Archive - 데이터베이스 스키마

> PostgreSQL + Prisma ORM 기반 데이터베이스의 완전한 스키마 정의 및 관계 설명

---

## 📋 목차

1. [데이터베이스 개요](#-데이터베이스-개요)
2. [ENUM 타입 정의](#-enum-타입-정의)
3. [핵심 모델](#-핵심-모델)
4. [관계 테이블](#-관계-테이블)
5. [방송 및 출연](#-방송-및-출연)
6. [차트 및 판매](#-차트-및-판매)
7. [크레딧 및 기여자](#-크레딧-및-기여자)
8. [콘텐츠 및 미디어](#-콘텐츠-및-미디어)
9. [시상식 및 수상](#-시상식-및-수상)
10. [위젯 데이터](#-위젯-데이터)
11. [ERD 다이어그램](#-erd-다이어그램)
12. [인덱싱 전략](#-인덱싱-전략)

---

## 🎯 데이터베이스 개요

### 기술 스택

| 항목 | 기술 |
|-----|------|
| **DBMS** | PostgreSQL 15+ |
| **ORM** | Prisma 6.19.1 |
| **호스팅** | Supabase |
| **마이그레이션** | Prisma Migrate |
| **시드 데이터** | TypeScript (tsx) |

### 스키마 통계

- **총 모델 수**: 32개
- **ENUM 타입**: 15개
- **관계 테이블**: 5개
- **인덱스**: 100개 이상
- **총 라인 수**: 1,269줄

### 설계 원칙

1. **정규화**: 3NF (Third Normal Form) 준수
2. **관계 무결성**: 외래 키 제약 조건 활용
3. **타입 안정성**: ENUM 타입으로 값 제한
4. **다국어 지원**: 한국어, 일본어, 영어 필드 (구현 예정)
5. **확장성**: JSON 필드로 유연한 데이터 저장
6. **성능**: 자주 쿼리되는 필드에 인덱스 설정

---

## 📐 ENUM 타입 정의

Prisma의 ENUM 타입을 사용하여 데이터 일관성을 보장합니다.

### 1. EventType (활동 타입)

```prisma
enum EventType {
  RELEASE        // 음반/싱글/디지털 발매
  MUSIC_SHOW     // 음악방송 출연
  CONCERT        // 콘서트
  TOUR           // 투어
  FANMEETING     // 팬미팅
  SHOWCASE       // 쇼케이스
  VARIETY_SHOW   // 예능/특집/일반 TV 출연
  POPUP_STORE    // 팝업 스토어
  AWARD_SHOW     // 시상식 참석/수상
  CF_AD          // 광고/브랜드 콜라보
  MAGAZINE       // 화보/잡지 촬영
  ONLINE_CONTENT // 유튜브/Weverse/웹 콘텐츠
  MERCH_DROP     // 굿즈
  ANNOUNCEMENT   // 공식 발표/공지
  OTHER
}
```

**사용처**: Event, EventSeries

---

### 2. ReleaseType (음반 타입)

```prisma
enum ReleaseType {
  STUDIO_ALBUM   // 정규 앨범
  MINI_ALBUM     // 미니 앨범
  SINGLE_ALBUM   // 싱글 앨범
  DIGITAL_SINGLE // 디지털 싱글
  PARTICIPATION  // OST, SMTOWN, Featuring 등 참여 음반
}
```

**사용처**: Album

---

### 3. EditionType (앨범 에디션 유형)

```prisma
enum EditionType {
  CD            // CD-R 등
  SMART_ALBUM   // NFC 등
  MUSIC_NFC_CD  // SMini 등
  QR_CARD       // QR 카드
}
```

**사용처**: AlbumEdition

---

### 4. Market (시장/지역)

```prisma
enum Market {
  KOREA
  JAPAN
  GLOBAL
}
```

**사용처**: Album, AlbumRelease

---

### 5. Language (언어) (추후 다국어 지원에 사용)

```prisma
enum Language {
  KOREAN
  JAPANESE
  ENGLISH
  OTHER
}
```

**사용처**: Album, Track, TrackLyric

---

### 6. ProgramType (프로그램 타입)

```prisma
enum ProgramType {
  MUSIC_SHOW    // 음악방송
  VARIETY_SHOW  // 예능
  RADIO         // 라디오
}
```

**사용처**: Program

---

### 7. CertBody (인증 기관)

```prisma
enum CertBody {
  RIAJ  // 일본 레코드협회
  KMCA  // 한국음악콘텐츠협회(Circle)
}
```

**사용처**: Certification

---

### 8. CertLevel (인증 등급)

```prisma
enum CertLevel {
  GOLD
  PLATINUM
  DOUBLE_PLATINUM
  MILLION
}
```

**사용처**: Certification

---

### 9. LinkType (외부 링크 분류) (추가 필요)

```prisma
enum LinkType {
  OFFICIAL_SITE  // 공식 사이트
  YOUTUBE        // 유튜브
  X_TWITTER      // X (트위터)
  INSTAGRAM      // 인스타그램
  TIKTOK         // 틱톡
  NAVER_TV
  SPOTIFY        // 스포티파이
  AMAZON_MUSIC   // 아마존 뮤직
  APPLE_MUSIC    // 애플뮤직
  MELON_MUSIC    // 멜론뮤직
  GENIE_MUSIC    // 지니뮤직
  BUGS_MUSIC     // 벅스
  FACEBOOK       // 페이스북
  WEIBO          // 웨이보
  BILIBILI       // 빌리빌리
  WEVERSE        // 위버스
  ARTICLE        // 기사
  OTHER
}
```

**사용처**: ExternalLink

---

### 10. CreditRole (크레딧 역할)

```prisma
enum CreditRole {
  LYRICS         // 작사
  COMPOSER       // 작곡
  ARRANGER       // 편곡
  PRODUCER       // 프로듀서
  DIRECTOR       // MV/비디오 감독
  PHOTOGRAPHER   // 사진작가
  CHOREOGRAPHER  // 안무가
  OTHER
}
```

**사용처**: TrackCredit, AlbumCredit

---

### 11. ContentPlatform (콘텐츠 플랫폼)

```prisma
enum ContentPlatform {
  YOUTUBE
  WEVERSE
  NAVER_TV
  INSTAGRAM
  X_TWITTER
  TIKTOK
  BILIBILI
  FACEBOOK
  OFFICIAL_SITE
  OTHER
}
```

**사용처**: Content

---

### 12. ContentType (콘텐츠 유형)

```prisma
enum ContentType {
  MV                  // 뮤직비디오
  MV_TEASER          // MV 티저
  DANCE_PRACTICE     // 안무 영상
  RECORDING_BEHIND   // 녹음 비하인드
  JACKET_BEHIND      // 재킷 촬영 비하인드
  BEHIND             // 일반 비하인드
  LIVE_STREAM        // 라이브 방송
  SHORTS             // 숏폼
  POSTER             // 포스터
  CHALLENGE          // 챌린지
  INTERVIEW          // 인터뷰
  VARIETY_CLIP       // 예능 클립
  PERFORMANCE_CLIP   // 무대 클립
  UNBOXING           // 언박싱
  ANNOUNCEMENT       // 공지
  FANCAM             // 직캠
  OFFICIAL_CAM       // 공식 캠
  OTHER
}
```

**사용처**: Content

---

### 13. ScriptType (가사 표기 유형)

```prisma
enum ScriptType {
  NATIVE      // 원문 (한국어/일본어 등)
  ROMANTIZED  // 로마자 표기
  TRANSLATION // 번역문
}
```

**사용처**: TrackLyric

---

### 14. Currency (통화)

```prisma
enum Currency {
  KRW  // 원화
  JPY  // 엔화
  USD  // 달러
  EUR  // 유로
}
```

**사용처**: AlbumEdition

---

## 🎵 핵심 모델

### 1. Group (그룹 정보)

```prisma
model Group {
  id   String @id @default(cuid())
  slug String @unique

  // 기본 정보
  name   String   // "NCT WISH"
  nameKo String?  // "엔시티 위시"
  nameJa String?  // "NCT WISH"

  // 기념일
  debutDate     DateTime?
  formationDate DateTime?

  // 팬덤
  fandomName String?  // "NCTzen WISH"

  // 비주얼
  officialColor String?  // "PEARL NEO CHAMPAGNE"
  logoUrl       String?
  iconUrl       String?

  // 상세 정보
  agency      String?  // "SM Entertainment"
  label       String?
  description String?  @db.Text

  // 관계
  members       Member[]
  eras          Era[]
  albums        Album[]
  externalLinks ExternalLink[]
  contents      Content[]
  awards        AwardWin[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**주요 특징**:
- `slug`: URL 친화적 식별자 (예: `nct-wish`)
- 다국어 지원: `name`, `nameKo`, `nameJa`
- 1:N 관계: 멤버, 앨범, 활동 시기 등

---

### 2. Member (멤버 프로필)

```prisma
model Member {
  id      String @id @default(cuid())
  groupId String
  group   Group  @relation(...)

  // 신상 정보
  stageName String  // 활동명
  name      String?  // 본명
  nameEn    String?
  nameHanja String?

  birthDate   DateTime?
  nationality String?
  hometown    String?

  // 아이돌 프로필
  positions String?  // "보컬, 래퍼, 센터"
  emoji     String?  // "🐱"
  ownNumber String?  // "01"
  bloodType String?
  mbti      String?

  description String? @db.Text

  // 비주얼
  profileImageUrl String?
  iconUrl         String?
  characterUrl    String?  // 위시돌 캐릭터
  colorCode       String?  // "#FF6B9D"

  // 활동 메타
  isActive Boolean   @default(true)
  joinDate DateTime?

  // 관계
  events        MemberOnEvent[]
  contents      MemberOnContent[]
  externalLinks ExternalLink[]
  quotes        Quote[]
  albumEditions AlbumEdition[]
  awardWins     AwardWin[]
  appearances   Appearance[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([groupId, stageName])
  @@index([groupId])
}
```

**주요 특징**:
- 멤버별 고유 정보 (이모지, 번호, 색상)
- 멤버별 버전 앨범 연결 (`albumEditions`)
- 활동 여부 플래그 (`isActive`)

---

### 3. Album (음반/릴리스)

```prisma
model Album {
  id   String  @id @default(cuid())
  slug String? @unique

  // 기본 정보
  title       String
  releaseDate DateTime
  type        ReleaseType

  // 앨범 스펙
  trackCount     Int?
  totalLengthSec Int?
  label          String?
  distributor    String?
  description    String? @db.Text

  // 비주얼
  coverImageUrl String?
  diskImageUrl  String?
  vinylImageUrl String?
  iconUrl       String?

  // 테마
  themeColor     String?
  themeTextColor String?
  mvUrl          String?

  // 분류
  market          Market   @default(KOREA)
  primaryLanguage Language @default(KOREAN)
  groupId         String?
  group           Group?   @relation(...)

  isPreDebut Boolean @default(false)
  isOst      Boolean @default(false)

  // 관계
  releases       AlbumRelease[]
  tracks         Track[]
  events         EventOnAlbum[]
  chartEntries   ChartEntry[]
  certifications Certification[]
  editions       AlbumEdition[]
  credits        AlbumCredit[]
  externalLinks  ExternalLink[]
  contents       Content[]
  salesDaily     AlbumDailySales[]
  awards         AwardWin[]
  era            Era?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([releaseDate])
  @@index([type])
  @@index([market])
}
```

**주요 특징**:
- 국가별 발매일 관리 (`AlbumRelease`)
- 여러 버전/에디션 지원 (`AlbumEdition`)
- 테마 색상 설정 (UI 커스터마이징)
- 데뷔 전 앨범 구분 (`isPreDebut`)

---

### 4. AlbumRelease (국가별 발매일)

```prisma
model AlbumRelease {
  id String @id @default(cuid())

  albumId String
  album   Album  @relation(...)

  market Market    // KOREA, JAPAN, GLOBAL
  date   DateTime  // 해당 국가 발매일
  format String @default("PHYSICAL")  // PHYSICAL, DIGITAL

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([albumId])
  @@index([date])
}
```

**사용 사례**:
- 한국: 2024-02-21
- 일본: 2024-02-28
- 글로벌 디지털: 2024-02-21

---

### 5. AlbumEdition (앨범 버전)

```prisma
model AlbumEdition {
  id String @id @default(cuid())

  albumId String
  album   Album  @relation(...)

  // 기본 정보
  name        String       // "NEMO Ver."
  editionType EditionType?
  sku         String?
  isLimited   Boolean      @default(false)

  // 비주얼
  coverImageUrl   String?
  packageImageUrl String?

  // 구성품
  components  Json?     // ["포토북 104p", "CD-R", ...]
  description String? @db.Text

  // 가격
  releasePrice Int?
  currency     Currency?
  purchaseUrl  String?

  // 멤버 버전
  memberId String?
  member   Member? @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([albumId])
  @@index([memberId])
}
```

**사용 사례**:
- SONGBIRD 앨범의 NEMO Ver., PHOTOCARD Ver.
- 멤버별 개인 버전 (Riku Ver., Yushi Ver. 등)

---

### 6. Track (수록곡)

```prisma
model Track {
  id      String @id @default(cuid())
  albumId String
  album   Album  @relation(...)

  // 기본 정보
  trackNumber Int
  title       String
  durationSec Int?
  genre       String?

  // 분류 플래그
  isTitle      Boolean  @default(false)
  isSingle     Boolean  @default(false)
  isPreRelease Boolean  @default(false)
  hasMv        Boolean  @default(false)
  language     Language @default(KOREAN)

  releaseDate DateTime?

  // 비주얼 & 테마
  iconUrl    String?
  themeColor String?

  // 미디어
  mvUrl    String?
  audioUrl String?
  note     String?

  // 버전 관계
  originalTrackId String?
  originalTrack   Track?  @relation("TrackOriginal", ...)
  versions        Track[] @relation("TrackOriginal")

  // 관계
  playlistTracks PlaylistTrack[]
  appearances    Appearance[]
  chartEntries   ChartEntry[]
  certifications Certification[]
  credits        TrackCredit[]
  externalLinks  ExternalLink[]
  contents       Content[]
  musicShowWins  MusicShowTrophy[]
  lyrics         TrackLyric[]
  cheeringGuide  CheeringGuide?
  awards         AwardWin[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([albumId, trackNumber])
  @@index([albumId])
}
```

**주요 특징**:
- 타이틀곡/선공개/싱글 플래그
- 버전 관계 (Original vs Remix/Remaster)
- 가사, 응원법, 차트 성적 연결

---

### 7. TrackLyric (가사)

```prisma
model TrackLyric {
  id String @id @default(cuid())

  // 가사 데이터
  text       String  @db.Text  // 전체 가사
  lrcContent String? @db.Text  // LRC 포맷 (시간 동기화)

  // 분류
  language Language   @default(KOREAN)
  script   ScriptType @default(NATIVE)

  // 메타데이터
  isOfficial Boolean @default(false)
  copyright  String?
  provider   String?

  trackId String @unique
  track   Track  @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([trackId, language, script])
  @@index([trackId, language])
}
```

**사용 사례**:
- 한국어 원문 (NATIVE)
- 로마자 표기 (ROMANTIZED)
- 영어 번역 (TRANSLATION)

---

### 8. CheeringGuide (응원법)

```prisma
model CheeringGuide {
  id String @id @default(cuid())

  title      String?
  isOfficial Boolean @default(false)

  // 콘텐츠
  text     String? @db.Text
  imageUrl String?
  videoUrl String?

  // 구조화된 데이터
  steps Json?  // [{ time: "00:15", part: "NCT WISH!" }]

  provider  String?
  sourceUrl String?

  trackId String @unique
  track   Track  @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([trackId])
}
```

---

### 9. Event (활동/스케줄)

```prisma
model Event {
  id String @id @default(cuid())

  type EventType

  // 날짜
  date      DateTime
  startDate DateTime?
  endDate   DateTime?

  // 이벤트 정보
  title       String
  description String? @db.Text

  // 장소
  location String?
  country  String?
  city     String?

  // 비주얼
  mainImageUrl  String?
  isHighlighted Boolean @default(false)

  // 링크
  relatedUrl     String?
  ticketUrl      String?
  galleryAlbumId String?

  // 관계
  eraId    String?
  era      Era?    @relation(...)
  seriesId String?
  series   EventSeries? @relation(...)

  programName String?
  programId   String?
  program     Program? @relation(...)

  albums  EventOnAlbum[]
  members MemberOnEvent[]

  appearances   Appearance[]
  externalLinks ExternalLink[]
  contents      Content[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([date])
  @@index([type])
  @@index([eraId])
}
```

**사용 사례**:
- 앨범 발매 (`RELEASE`)
- 콘서트 (`CONCERT`)
- 팬미팅 (`FANMEETING`)
- 음악방송 (`MUSIC_SHOW`)

---

### 10. EventSeries (이벤트 시리즈)

```prisma
model EventSeries {
  id String @id @default(cuid())

  name String
  type EventType

  logoUrl   String?
  posterUrl String?

  organizer   String?
  description String? @db.Text

  events Event[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([type])
}
```

**사용 사례**:
- "2024 WISH ON TOUR" (투어 시리즈)
- "WISH 1st Anniversary Fanmeeting" (팬미팅 시리즈)

---

### 11. Era (활동 시기)

```prisma
model Era {
  id String @id @default(cuid())

  name        String
  title       String?
  description String? @db.Text

  // 테마
  isCurrent     Boolean @default(false)
  themeColor    String?
  backgroundUrl String?
  iconUrl       String?
  logoUrl       String?

  // 기간
  startDate DateTime
  endDate   DateTime?

  groupId String?
  group   Group?  @relation(...)

  events Event[]

  mainAlbumId String? @unique
  mainAlbum   Album?  @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**사용 사례**:
- "WISH Era" (2024.02 ~ 2024.07)
- "Songbird Era" (2024.07 ~ 2024.10)

---

## 🎤 관계 테이블

### 1. EventOnAlbum (이벤트-앨범 N:M)

```prisma
model EventOnAlbum {
  eventId String
  albumId String

  event Event @relation(...)
  album Album @relation(...)

  @@id([eventId, albumId])
  @@index([albumId])
}
```

**사용 사례**: 쇼케이스 이벤트에 앨범 연결

---

### 2. MemberOnEvent (멤버-이벤트 N:M)

```prisma
model MemberOnEvent {
  memberId String
  eventId  String

  role     String?
  isAbsent Boolean @default(false)
  note     String?

  member Member @relation(...)
  event  Event  @relation(...)

  @@id([memberId, eventId])
  @@index([eventId])
}
```

**사용 사례**: 멤버별 참여 여부, 불참 표시

---

### 3. MemberOnContent (멤버-콘텐츠 N:M)

```prisma
model MemberOnContent {
  memberId  String
  contentId String

  role String?
  note String?

  member  Member  @relation(...)
  content Content @relation(...)

  @@id([memberId, contentId])
  @@index([contentId])
}
```

**사용 사례**: 콘텐츠에 출연한 멤버 표시

---

## 📺 방송 및 출연

### 1. Program (방송 프로그램)

```prisma
model Program {
  id String @id @default(cuid())

  name    String
  network String?
  country String?
  pType   ProgramType

  // 편성
  dayOfWeek String?
  airTime   String?

  logoUrl     String?
  officialUrl String?
  notes       String?

  appearances     Appearance[]
  musicShowTrophy MusicShowTrophy[]
  events          Event[]
  externalLinks   ExternalLink[]
  contents        Content[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([name, country])
  @@index([pType])
}
```

---

### 2. Appearance (방송 출연)

```prisma
model Appearance {
  id String @id @default(cuid())

  date    DateTime
  title   String?
  episode String?
  members Member[]

  isPerformance Boolean @default(false)
  role          String?

  programId String
  program   Program @relation(...)

  eventId String?
  event   Event?  @relation(...)

  trackId String?
  track   Track?  @relation(...)

  externalLinks ExternalLink[]
  contents      Content[]

  note String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([date])
  @@index([programId])
}
```

---

### 3. MusicShowTrophy (음방 1위)

```prisma
model MusicShowTrophy {
  id String @id @default(cuid())

  date  DateTime
  score Int?

  isTripleCrown Boolean @default(false)

  programId String
  program   Program @relation(...)

  trackId String?
  track   Track?  @relation(...)

  note String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([programId, date])
  @@index([trackId])
}
```

---

## 📊 차트 및 판매

### 1. Chart (차트)

```prisma
model Chart {
  id String @id @default(cuid())

  name     String
  provider String?
  country  String?

  periodType String @default("WEEKLY")

  logoUrl   String?
  colorCode String?

  officialUrl String?
  notes       String?

  entries ChartEntry[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([name, provider, periodType])
  @@index([name])
}
```

---

### 2. ChartEntry (차트 진입)

```prisma
model ChartEntry {
  id String @id @default(cuid())

  date DateTime
  rank Int

  change Int?
  isNew  Boolean @default(false)

  chartId String
  chart   Chart  @relation(...)

  albumId String?
  album   Album?  @relation(...)

  trackId String?
  track   Track?  @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([date])
  @@index([chartId])
  @@index([trackId])
}
```

---

### 3. Certification (음반 인증)

```prisma
model Certification {
  id String @id @default(cuid())

  body  CertBody
  level CertLevel

  date  DateTime
  units Int?

  badgeImageUrl String?

  albumId String?
  album   Album?  @relation(...)

  trackId String?
  track   Track?  @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([body, level])
  @@index([albumId])
}
```

---

### 4. AlbumDailySales (일별 판매량)

```prisma
model AlbumDailySales {
  id String @id @default(cuid())

  date       DateTime
  units      Int
  totalUnits Int?

  provider String?

  daySequence Int?
  note        String?

  albumId String
  album   Album  @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([albumId, date, provider])
  @@index([albumId])
}
```

---

## 👥 크레딧 및 기여자

### 1. Contributor (기여자)

```prisma
model Contributor {
  id String @id @default(cuid())

  name  String
  alias String?

  description String? @db.Text

  trackCredits  TrackCredit[]
  albumCredits  AlbumCredit[]
  externalLinks ExternalLink[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([name])
}
```

---

### 2. TrackCredit (곡 크레딧)

```prisma
model TrackCredit {
  CreditRole CreditRole
  detail     String?
  order      Int @default(0)

  trackId       String
  contributorId String

  track       Track       @relation(...)
  contributor Contributor @relation(...)

  @@id([trackId, contributorId])
  @@index([contributorId])
}
```

---

### 3. AlbumCredit (앨범 크레딧)

```prisma
model AlbumCredit {
  role   CreditRole
  detail String?
  order  Int @default(0)

  albumId       String
  contributorId String

  album       Album       @relation(...)
  contributor Contributor @relation(...)

  @@id([albumId, contributorId])
  @@index([contributorId])
}
```

---

## 🎬 콘텐츠 및 미디어

### 1. Content (콘텐츠)

```prisma
model Content {
  id String @id @default(cuid())

  title    String
  platform ContentPlatform
  cType    ContentType

  url          String  @unique
  thumbnailUrl String?

  channelName String?
  publishedAt DateTime
  description String?  @db.Text

  isHighlight Boolean @default(false)

  // 관계
  groupId   String?
  group     Group?   @relation(...)
  albumId   String?
  album     Album?   @relation(...)
  eventId   String?
  event     Event?   @relation(...)
  trackId   String?
  track     Track?   @relation(...)
  programId String?
  program   Program? @relation(...)
  appearanceId String?
  appearance   Appearance? @relation(...)

  tags String[]

  members    MemberOnContent[]
  videoStats VideoStat[]
  externalLinks ExternalLink[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([platform, cType])
  @@index([publishedAt])
}
```

---

### 2. VideoStat (조회수 통계)

```prisma
model VideoStat {
  id        String  @id @default(cuid())
  contentId String
  content   Content @relation(...)

  snapshotAt DateTime

  viewCount    BigInt
  likeCount    BigInt?
  commentCount BigInt?

  createdAt DateTime @default(now())

  @@unique([contentId, snapshotAt])
  @@index([contentId, snapshotAt])
}
```

---

## 🏆 시상식 및 수상

### 1. AwardOrganization (시상 기관)

```prisma
model AwardOrganization {
  id String @id @default(cuid())

  name         String
  abbreviation String?
  country      String?

  logoUrl String?

  events AwardEvent[]
  notes  String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([name])
}
```

---

### 2. AwardEvent (시상식 회차)

```prisma
model AwardEvent {
  id             String            @id @default(cuid())
  organizationId String
  organization   AwardOrganization @relation(...)

  name     String
  edition  String?
  heldAt   DateTime?
  location String?

  posterUrl String?
  logoUrl   String?

  categories AwardCategory[]
  wins       AwardWin[]

  notes String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([organizationId])
  @@index([heldAt])
}
```

---

### 3. AwardCategory (수상 부문)

```prisma
model AwardCategory {
  id      String     @id @default(cuid())
  eventId String
  event   AwardEvent @relation(...)

  name String
  type String @default("OTHER")

  wins AwardWin[]
  notes String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([eventId])
  @@index([name])
}
```

---

### 4. AwardWin (수상 실적)

```prisma
model AwardWin {
  id String @id @default(cuid())

  categoryId String
  category   AwardCategory @relation(...)

  eventId String?
  event   AwardEvent? @relation(...)

  // 수상 대상
  groupId  String?
  group    Group?  @relation(...)
  memberId String?
  member   Member? @relation(...)
  albumId  String?
  album    Album?  @relation(...)
  trackId  String?
  track    Track?  @relation(...)

  sceneImageUrl String?
  speechUrl     String?

  isJoint Boolean @default(false)
  note    String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([categoryId])
  @@index([eventId])
  @@index([groupId])
}
```

---

## 🎮 위젯 데이터

### 1. Quote (멤버 명언)

```prisma
model Quote {
  id String @id @default(cuid())

  content String

  memberId String
  member   Member @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**사용처**: MembersQuoteWidget

---

### 2. Wish (소원 항아리)

```prisma
model Wish {
  id String @id @default(cuid())

  content  String  @db.Text
  nickname String?
  password String?
  color    String  // 색상

  // 위치
  posX     Float?
  posY     Float?
  rotation Float?

  createdAt DateTime @default(now())
}
```

**사용처**: WishJarWidget

---

### 3. PlaylistTrack (재생 목록)

```prisma
model PlaylistTrack {
  id String @id @default(cuid())

  title     String
  artist    String @default("NCT WISH")
  youtubeId String

  trackId String?
  track   Track?  @relation(...)

  order    Int     @default(0)
  isActive Boolean @default(true)

  createdAt DateTime @default(now())
}
```

**사용처**: MiniPlayerWidget

---

## 🔗 외부 링크

### ExternalLink (외부 링크)

```prisma
model ExternalLink {
  id String @id @default(cuid())

  type  LinkType
  title String?
  url   String

  description String?

  iconUrl String?
  order   Int     @default(0)

  isOfficial Boolean @default(true)

  // 다양한 연결 지점
  groupId       String?
  group         Group?       @relation(...)
  memberId      String?
  member        Member?      @relation(...)
  albumId       String?
  album         Album?       @relation(...)
  trackId       String?
  track         Track?       @relation(...)
  programId     String?
  program       Program?     @relation(...)
  eventId       String?
  event         Event?       @relation(...)
  contentId     String?
  content       Content?     @relation(...)
  contributorId String?
  contributor   Contributor? @relation(...)
  appearanceId  String?
  appearance    Appearance?  @relation(...)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([groupId])
  @@index([type])
  @@index([order])
}
```

---

## 📐 ERD 다이어그램

### 핵심 관계 요약

```
Group (1) ─────► (N) Member
  │                   │
  │                   │
  ├─► (N) Album      └─► (N) MemberOnEvent ◄─ (N) Event
  │      │                                          │
  │      ├─► (N) Track                              │
  │      │      │                                    │
  │      │      ├─► (1) TrackLyric                  │
  │      │      ├─► (1) CheeringGuide               │
  │      │      └─► (N) ChartEntry ◄─ (1) Chart     │
  │      │                                           │
  │      └─► (N) AlbumEdition                       │
  │                                                  │
  └─► (N) Era ◄─────────────────────────────────────┘
        │
        └─► (1) Album (mainAlbum)
```

---

## 🔍 인덱싱 전략

### 주요 인덱스

1. **Primary Keys**: 모든 모델에 `@id` 설정
2. **Unique Constraints**: slug, url 등 고유값
3. **Foreign Key Indexes**: 관계 필드에 자동 인덱스
4. **Custom Indexes**: 자주 쿼리되는 필드

### 인덱스 예시

```prisma
// Album 모델
@@index([releaseDate])  // 발매일순 정렬
@@index([type])         // 타입별 필터링
@@index([market])       // 시장별 필터링

// Event 모델
@@index([date])         // 날짜순 정렬
@@index([type])         // 활동 타입별 필터링
@@index([eraId])        // Era별 필터링

// Track 모델
@@unique([albumId, trackNumber])  // 앨범 내 트랙 번호 고유
```

---

## 🎯 쿼리 최적화 팁

### 1. Include로 N+1 방지

```typescript
// ❌ N+1 쿼리
const albums = await prisma.album.findMany();
for (const album of albums) {
  const tracks = await prisma.track.findMany({
    where: { albumId: album.id }
  });
}

// ✅ Include로 한 번에
const albums = await prisma.album.findMany({
  include: {
    tracks: true,
  },
});
```

### 2. Select로 필요한 필드만

```typescript
const members = await prisma.member.findMany({
  select: {
    id: true,
    stageName: true,
    profileImageUrl: true,
  },
});
```

### 3. Where 조건 활용

```typescript
const recentAlbums = await prisma.album.findMany({
  where: {
    releaseDate: {
      gte: new Date('2024-01-01'),
    },
    market: 'KOREA',
  },
  orderBy: {
    releaseDate: 'desc',
  },
});
```

---

## 📊 데이터 무결성 규칙

### Cascade 삭제

```prisma
// Member 삭제 시 관련 Quote도 삭제
model Member {
  quotes Quote[] // onDelete: Cascade (기본)
}

// Album 삭제 시 Track도 삭제
model Album {
  tracks Track[]
}
```

### SetNull 전략

```prisma
// Event 삭제 시 Appearance의 eventId만 null
model Appearance {
  eventId String?
  event   Event?  @relation(fields: [eventId], ...)
}
```

---

## 🚀 마이그레이션 히스토리

프로젝트의 주요 마이그레이션:

1. `20251112090730_init_supabase` - 초기 Supabase 연동
2. `20251112140829_refactor_nctwish_schema` - NCT WISH 스키마 재구성
3. `20251114065203_add_expanded_schema` - 확장 스키마 추가
4. `20251210062956_wish_os_final_ver` - WISH OS 최종 버전
5. `20251211094608_wish_photocard_refactor_final` - 포토카드 리팩토링

---

## 📝 베스트 프랙티스

### 1. ENUM 사용

```prisma
// ✅ ENUM으로 값 제한
type ReleaseType @default(MINI_ALBUM)

// ❌ String으로 자유 입력
type String
```

### 2. Timestamps 필수

```prisma
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

### 3. 소프트 딜리트 (선택)

```prisma
model Member {
  isActive Boolean @default(true)
  deletedAt DateTime?
}
```

---

## 🔮 향후 확장 계획

### 1. 사용자 시스템 (Phase 1)

#### User 모델
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  username  String   @unique
  nickname  String?
  
  avatarUrl String?
  bio       String?
  
  role      UserRole @default(USER)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // 관계
  wishes      Wish[]
  comments    Comment[]
  likes       Like[]
  bookmarks   Bookmark[]
  playlists   Playlist[]
}

enum UserRole {
  USER
  MODERATOR
  ADMIN
}
```

**필요 API**:
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/login` - 로그인
- `POST /api/auth/logout` - 로그아웃
- `GET /api/auth/me` - 현재 사용자 정보
- `PUT /api/users/:id` - 프로필 수정
- `DELETE /api/users/:id` - 회원 탈퇴

---

### 2. 인터랙션 시스템 (Phase 2)

#### Comment 모델 (댓글)
```prisma
model Comment {
  id        String   @id @default(cuid())
  content   String   @db.Text
  
  userId    String
  user      User     @relation(...)
  
  // 댓글 대상 (다형성 관계)
  albumId   String?
  album     Album?   @relation(...)
  trackId   String?
  track     Track?   @relation(...)
  contentId String?
  content   Content? @relation(...)
  eventId   String?
  event     Event?   @relation(...)
  
  // 대댓글
  parentId  String?
  parent    Comment?  @relation("CommentReplies", ...)
  replies   Comment[] @relation("CommentReplies")
  
  isEdited  Boolean  @default(false)
  isDeleted Boolean  @default(false)
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@index([albumId])
  @@index([userId])
  @@index([createdAt])
}
```

#### Like 모델 (좋아요)
```prisma
model Like {
  id        String   @id @default(cuid())
  
  userId    String
  user      User     @relation(...)
  
  // 좋아요 대상
  albumId   String?
  album     Album?   @relation(...)
  trackId   String?
  track     Track?   @relation(...)
  contentId String?
  content   Content? @relation(...)
  commentId String?
  comment   Comment? @relation(...)
  
  createdAt DateTime @default(now())
  
  @@unique([userId, albumId])
  @@unique([userId, trackId])
  @@unique([userId, contentId])
  @@unique([userId, commentId])
  @@index([userId])
}
```

#### Bookmark 모델 (북마크)
```prisma
model Bookmark {
  id        String   @id @default(cuid())
  
  userId    String
  user      User     @relation(...)
  
  // 북마크 대상
  albumId   String?
  album     Album?   @relation(...)
  trackId   String?
  track     Track?   @relation(...)
  contentId String?
  content   Content? @relation(...)
  eventId   String?
  event     Event?   @relation(...)
  
  folderId  String?
  folder    BookmarkFolder? @relation(...)
  
  note      String?
  
  createdAt DateTime @default(now())
  
  @@unique([userId, albumId])
  @@unique([userId, trackId])
  @@index([userId])
}

model BookmarkFolder {
  id        String   @id @default(cuid())
  name      String
  color     String?
  
  userId    String
  user      User     @relation(...)
  
  bookmarks Bookmark[]
  
  createdAt DateTime @default(now())
  
  @@index([userId])
}
```

**필요 API**:
- `GET /api/comments?albumId=xxx` - 댓글 목록
- `POST /api/comments` - 댓글 작성
- `PUT /api/comments/:id` - 댓글 수정
- `DELETE /api/comments/:id` - 댓글 삭제
- `POST /api/likes` - 좋아요 토글
- `GET /api/likes/me` - 내 좋아요 목록
- `POST /api/bookmarks` - 북마크 추가
- `GET /api/bookmarks/me` - 내 북마크
- `DELETE /api/bookmarks/:id` - 북마크 삭제

---

### 3. 알림 시스템 (Phase 3)

#### Notification 모델
```prisma
model Notification {
  id        String   @id @default(cuid())
  
  type      NotificationType
  title     String
  message   String
  
  userId    String
  user      User     @relation(...)
  
  // 관련 엔티티
  relatedId   String?
  relatedType String?
  actionUrl   String?
  
  isRead    Boolean  @default(false)
  
  createdAt DateTime @default(now())
  
  @@index([userId, isRead])
  @@index([createdAt])
}

enum NotificationType {
  NEW_RELEASE    // 새 앨범 발매
  COMEBACK       // 컴백 예정
  BIRTHDAY       // 멤버 생일
  ANNIVERSARY    // 데뷔 기념일
  COMMENT_REPLY  // 댓글 답글
  LIKE           // 좋아요
  SYSTEM         // 시스템 공지
}
```

**필요 API**:
- `GET /api/notifications` - 알림 목록
- `PUT /api/notifications/:id/read` - 읽음 처리
- `PUT /api/notifications/read-all` - 전체 읽음
- `DELETE /api/notifications/:id` - 알림 삭제

---

### 4. 검색 시스템 (Phase 4)

#### SearchLog 모델 (검색 로그)
```prisma
model SearchLog {
  id        String   @id @default(cuid())
  
  query     String
  userId    String?
  
  resultCount Int    @default(0)
  
  createdAt DateTime @default(now())
  
  @@index([query])
  @@index([createdAt])
}
```

**필요 API**:
- `GET /api/search?q=songbird` - 통합 검색
- `GET /api/search/albums?q=wish` - 앨범 검색
- `GET /api/search/tracks?q=nasa` - 곡 검색
- `GET /api/search/members?q=riku` - 멤버 검색
- `GET /api/search/events?q=concert` - 활동 검색
- `GET /api/search/contents?q=dance` - 콘텐츠 검색
- `GET /api/search/trending` - 인기 검색어

**구현 방법**:
- PostgreSQL Full-Text Search
- Prisma `search` 기능
- 또는 Algolia/Elasticsearch 연동

---

### 5. 플레이리스트 시스템 (Phase 5)

#### Playlist 모델
```prisma
model Playlist {
  id          String   @id @default(cuid())
  
  name        String
  description String?
  coverUrl    String?
  
  isPublic    Boolean  @default(true)
  isOfficial  Boolean  @default(false)
  
  userId      String?
  user        User?    @relation(...)
  
  tracks      PlaylistTrack[]
  
  playCount   Int      @default(0)
  likeCount   Int      @default(0)
  
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  @@index([userId])
  @@index([isPublic, isOfficial])
}

model PlaylistTrack {
  id         String   @id @default(cuid())
  
  playlistId String
  playlist   Playlist @relation(...)
  
  trackId    String?
  track      Track?   @relation(...)
  
  // 외부 곡 (YouTube 등)
  title      String?
  artist     String?
  youtubeId  String?
  
  order      Int      @default(0)
  addedAt    DateTime @default(now())
  
  @@unique([playlistId, order])
  @@index([playlistId])
}
```

**필요 API**:
- `GET /api/playlists` - 플레이리스트 목록
- `GET /api/playlists/:id` - 플레이리스트 상세
- `POST /api/playlists` - 플레이리스트 생성
- `PUT /api/playlists/:id` - 플레이리스트 수정
- `DELETE /api/playlists/:id` - 플레이리스트 삭제
- `POST /api/playlists/:id/tracks` - 곡 추가
- `DELETE /api/playlists/:id/tracks/:trackId` - 곡 제거
- `PUT /api/playlists/:id/tracks/reorder` - 순서 변경

---

### 6. 통계 및 분석 (Phase 6)

#### ViewLog 모델 (조회 로그)
```prisma
model ViewLog {
  id        String   @id @default(cuid())
  
  userId    String?
  
  // 조회 대상
  albumId   String?
  album     Album?   @relation(...)
  trackId   String?
  track     Track?   @relation(...)
  contentId String?
  content   Content? @relation(...)
  
  viewedAt  DateTime @default(now())
  
  @@index([albumId, viewedAt])
  @@index([trackId, viewedAt])
  @@index([contentId, viewedAt])
}

model Popularity {
  id        String   @id @default(cuid())
  
  // 인기도 대상
  albumId   String?  @unique
  album     Album?   @relation(...)
  trackId   String?  @unique
  track     Track?   @relation(...)
  contentId String?  @unique
  content   Content? @relation(...)
  
  // 지표
  viewCount    Int @default(0)
  likeCount    Int @default(0)
  commentCount Int @default(0)
  shareCount   Int @default(0)
  
  // 가중치 점수
  score        Float @default(0)
  
  updatedAt    DateTime @updatedAt
  
  @@index([score])
}
```

**필요 API**:
- `GET /api/analytics/popular/albums` - 인기 앨범
- `GET /api/analytics/popular/tracks` - 인기 곡
- `GET /api/analytics/popular/contents` - 인기 콘텐츠
- `GET /api/analytics/trending` - 트렌딩
- `GET /api/analytics/stats` - 전체 통계
- `POST /api/analytics/views` - 조회 기록

---

### 7. 이미지 관리 시스템 (Phase 7)

#### MediaAsset 모델
```prisma
model MediaAsset {
  id        String   @id @default(cuid())
  
  type      MediaType
  url       String
  
  // Cloudinary 메타데이터
  publicId  String   @unique
  format    String?
  width     Int?
  height    Int?
  bytes     BigInt?
  
  // 분류
  category  String?  // album-cover, member-profile, event-poster
  tags      String[]
  
  // 연결
  albumId   String?
  album     Album?   @relation(...)
  memberId  String?
  member    Member?  @relation(...)
  
  uploadedBy String?
  user       User?   @relation(...)
  
  createdAt DateTime @default(now())
  
  @@index([category])
  @@index([publicId])
}

enum MediaType {
  IMAGE
  VIDEO
  AUDIO
  DOCUMENT
}
```

**필요 API**:
- `POST /api/media/upload` - 이미지 업로드
- `DELETE /api/media/:id` - 이미지 삭제
- `GET /api/media` - 미디어 라이브러리
- `PUT /api/media/:id` - 메타데이터 수정

---

### 8. 관리자 시스템 (Phase 8)

#### AdminLog 모델
```prisma
model AdminLog {
  id        String   @id @default(cuid())
  
  adminId   String
  admin     User     @relation(...)
  
  action    AdminAction
  
  targetType String?  // Album, Track, Member 등
  targetId   String?
  
  details    Json?
  ipAddress  String?
  
  createdAt  DateTime @default(now())
  
  @@index([adminId])
  @@index([createdAt])
}

enum AdminAction {
  CREATE
  UPDATE
  DELETE
  APPROVE
  REJECT
  BAN
  UNBAN
}
```

**필요 API**:
- `GET /api/admin/dashboard` - 대시보드 통계
- `GET /api/admin/logs` - 관리 로그
- `GET /api/admin/users` - 사용자 관리
- `PUT /api/admin/users/:id/ban` - 사용자 차단
- `GET /api/admin/reports` - 신고 관리
- `POST /api/admin/albums` - 앨범 추가 (CMS)
- `PUT /api/admin/albums/:id` - 앨범 수정
- `DELETE /api/admin/albums/:id` - 앨범 삭제

---

### 9. 실시간 기능 (Phase 9)

#### ChatMessage 모델 (실시간 채팅)
```prisma
model ChatRoom {
  id        String   @id @default(cuid())
  
  name      String
  type      ChatRoomType
  
  eventId   String?
  event     Event?   @relation(...)
  
  isActive  Boolean  @default(true)
  
  messages  ChatMessage[]
  
  createdAt DateTime @default(now())
}

model ChatMessage {
  id        String   @id @default(cuid())
  
  roomId    String
  room      ChatRoom @relation(...)
  
  userId    String
  user      User     @relation(...)
  
  content   String   @db.Text
  type      MessageType @default(TEXT)
  
  createdAt DateTime @default(now())
  
  @@index([roomId, createdAt])
}

enum ChatRoomType {
  EVENT_LIVE    // 이벤트 라이브 채팅
  GLOBAL        // 전체 채팅
  PRIVATE       // 개인 메시지
}

enum MessageType {
  TEXT
  EMOJI
  STICKER
  IMAGE
}
```

**필요 기술**:
- WebSocket (Socket.io)
- Server-Sent Events (SSE)
- Supabase Realtime

**필요 API**:
- `GET /api/chat/rooms` - 채팅방 목록
- `GET /api/chat/rooms/:id/messages` - 메시지 조회
- `POST /api/chat/rooms/:id/messages` - 메시지 전송
- WebSocket endpoints

---

### 10. 추천 시스템 (Phase 10)

#### Recommendation 모델
```prisma
model Recommendation {
  id        String   @id @default(cuid())
  
  userId    String
  user      User     @relation(...)
  
  // 추천 대상
  trackId   String?
  track     Track?   @relation(...)
  albumId   String?
  album     Album?   @relation(...)
  contentId String?
  content   Content? @relation(...)
  
  score     Float    // 추천 점수
  reason    String?  // 추천 이유
  
  isShown   Boolean  @default(false)
  isClicked Boolean  @default(false)
  
  createdAt DateTime @default(now())
  
  @@index([userId, score])
}
```

**필요 API**:
- `GET /api/recommendations/tracks` - 곡 추천
- `GET /api/recommendations/albums` - 앨범 추천
- `GET /api/recommendations/similar?trackId=xxx` - 유사 곡

**추천 알고리즘**:
1. Collaborative Filtering (협업 필터링)
2. Content-Based Filtering (콘텐츠 기반)
3. Hybrid Approach

---

### 11. 외부 API 연동 (Phase 11)

#### ExternalApiSync 모델
```prisma
model ExternalApiSync {
  id        String   @id @default(cuid())
  
  provider  String   // YouTube, Spotify, Melon 등
  endpoint  String
  
  lastSyncAt   DateTime?
  nextSyncAt   DateTime?
  
  syncStatus   SyncStatus @default(IDLE)
  errorMessage String?
  
  config       Json?
  
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  @@unique([provider, endpoint])
}

enum SyncStatus {
  IDLE
  RUNNING
  SUCCESS
  FAILED
}
```

**연동 대상**:
- YouTube Data API - 조회수, 댓글 수
- Spotify API - 스트리밍 데이터
- Melon API - 국내 차트 및 판매량
- Last.fm API - 리스너 통계
- X (Twitter) API - 소셜 데이터

**필요 API**:
- `POST /api/sync/youtube` - YouTube 데이터 동기화
- `POST /api/sync/spotify` - Spotify 데이터 동기화
- `POST /api/sync/melon` - Melon 데이터 동기화
- `GET /api/sync/status` - 동기화 상태

---

## 📊 우선순위별 개발 로드맵

### 🔴 Phase 1 (필수 - 즉시 개발)
1. **검색 API** - 사용자 경험 핵심
2. **통계 API** - 위젯 데이터 제공
3. **플레이리스트 API** - 음악 플레이어 기능

### 🟡 Phase 2 (중요 - 3개월 내)
4. **사용자 인증** - 개인화 기능 기반
5. **댓글/좋아요** - 커뮤니티 참여
6. **북마크** - 콘텐츠 저장

### 🟢 Phase 3 (선택 - 6개월 내)
7. **알림 시스템** - 사용자 리텐션
8. **실시간 채팅** - 이벤트 참여
9. **추천 시스템** - 콘텐츠 발견

### 🔵 Phase 4 (향후 - 1년 내)
10. **외부 API 연동** - 데이터 자동화
11. **관리자 CMS** - 콘텐츠 관리
12. **이미지 관리** - 미디어 라이브러리

---

**Last Updated:** 2025-12-29  
**Schema Version:** 1.0  
**Total Models:** 32 (현재) → 50+ (Phase 4 완료 시)  
**Author:** Park Ju Eul (rope_park)
