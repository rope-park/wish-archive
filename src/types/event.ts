import {
    EventType,
    ContentType,
    Platform,
    ExternalLinkType,
} from "@prisma/client";

// 외부 링크 입력을 위한 인터페이스 정의
export interface ExternalLinkInput {
    url: string;
    type?: ExternalLinkType; // 링크 유형
    label?: string; // 버튼명/설명 (예: '공식 홈페이지', 'X 공지')
}

/**
 * EventInput 인터페이스
 * * 모든 스케줄 데이터를 통합 관리하기 위한 입력 구조.
 * DB 스키마와 1:1로 매칭되지 않고, 시드 스크립트(seed-events.ts)가
 * 이 정보를 해석하여 여러 테이블(Event, Appearance, MusicShowTrophy 등)에 분산 저장.
 */
export interface EventInput {
    // ==========================================
    // 1. 기본 정보 (Basic Info)
    // ==========================================
    date: string; // 'YYYY-MM-DD' (필수)
    time?: string; // 'HH:MM' (선택)
    type: EventType; // 활동 타입 (ENUM)
    title: string; // 스케줄명 (필수)
    description?: string; // 상세 설명
    milestone?: boolean; // 주요 이정표 여부 (데뷔, 첫 1위 등)
    isPreDebut?: boolean; // 프리데뷔 여부 (Pre-Debut)

    // ==========================================
    // 2. 일시 및 장소 상세 (Date & Location)
    // ==========================================
    startDate?: string; // 기간제 행사의 시작일
    endDate?: string; // 기간제 행사의 종료일

    location?: string; // 장소명 (예: 도쿄돔)
    country?: string; // 국가 코드 (KR, JP, etc)
    city?: string; // 도시명 (서울, 도쿄, etc)

    // ==========================================
    // 3. 외부 링크 (External Links)
    // ==========================================
    relatedUrl?: string; // 공식 공지, 기사 링크 등 (단일)
    ticketUrl?: string; // 예매처 링크
    externalLinks?: ExternalLinkInput[]; // 추가 외부 링크 목록 (복수)

    // ==========================================
    // 4. 자동 관계 매핑 (Auto-Mapping Helpers)
    // ==========================================
    // * 아래 필드들은 DB에 직접 들어가는 값이 아니라, ID를 찾기 위한 힌트임.
    // * Era(활동기)와 Program(방송)은 date와 title을 기반으로 자동 매핑되므로 생략.

    seriesName?: string; // 투어/이벤트 시리즈 이름 (EventSeries 연결용)
    // 예: "NCT WISH ASIA TOUR LOG in"

    albumTitle?: string; // 관련 앨범 제목 (Album 연결용)
    // 예: "Steady"

    // ==========================================
    // 5. 갤러리 연결 (Gallery Integration)
    // ==========================================
    // Cloudinary API 기반 갤러리 앱과 연결할 폴더 경로
    galleryFolderPath?: string;
    // 예: "nct-wish/events/2024/0221_debut"

    // ==========================================
    // 6. 멤버 참여 정보 (Participants)
    // ==========================================
    // 값이 없으면 '전원 참석'으로 간주
    participants?: {
        type: "ONLY" | "ABSENT"; // ONLY: 이 멤버들만 참여 / ABSENT: 이 멤버들만 불참
        memberNames: string[]; // 멤버 이름 (Stage Name 기준: 시온, 리쿠...)
        role?: string; // 역할 (예: 스페셜 MC, 게스트)
        note?: string; // 비고 (예: 건강 상의 이유)
    };

    // ==========================================
    // 7. 방송 출연 상세 (Appearance)
    // ==========================================
    // 음악방송(MUSIC_SHOW)이나 예능(VARIETY_SHOW)일 때 사용
    appearance?: {
        programName?: string; // 프로그램명 수동 지정 (생략 시 title에서 자동 추출 시도)
        episode?: string; // 회차 정보 (예: "830회")
        isPerformance?: boolean; // 무대 진행 여부
        performedTrack?: string | string[]; // 무대한 곡 제목 (Track 자동 연결용)
        role?: string; // 출연 역할 (출연진, 호스트 등)
    };

    // ==========================================
    // 8. 음악방송 결과 (Music Show Result)
    // ==========================================
    // 1위 후보였거나 수상을 했을 때 기록
    musicShowResult?: {
        rank: number; // 순위 (1 = 1위)
        score?: number; // 집계 점수
        isTripleCrown?: boolean; // 트리플 크라운 여부
        note?: string; // 비고 (예: "데뷔 첫 1위")
    };

    // ==========================================
    // 9. 관련 콘텐츠 (Linked Contents)
    // ==========================================
    // 유튜브 영상, 직캠 등을 연결 (Content 모델 연결용)
    linkedContents?: {
        title: string; // 콘텐츠 제목
        platform: Platform; // 콘텐츠 플랫폼 (YOUTUBE, VOD, etc)
        url: string; // 영상 URL
        type: ContentType; // 콘텐츠 유형
        cast?: string[]; // 출연 멤버
    }[];

    // ==========================================
    // 10. 갤러리 포스트 (Gallery Posts)
    // ==========================================
    // 트위터/인스타그램 등 공식 사진 아카이빙
    galleryPosts?: {
        url: string; // 원본 링크
        platform: Platform; // 플랫폼
        type?: string; // OFFICIAL, FAN, etc
        caption?: string; // 설명
    }[];
}

// ==========================================
// 10. 스크래핑 데이터 매칭용 타입 (Scraped Data Matching Types)
// ==========================================

/**
 * 스크래핑된 비디오 데이터
 */
export interface ScrapedVideo {
    publishedAt: string; // ISO 8601 날짜 문자열
    title: string;
    description?: string;
    url: string;
}

/**
 * 날짜별 그룹화된 YouTube 데이터
 */
export interface YouTubeGroupedData {
    date: string; // "YYYY-MM-DD" 형식
    videos: ScrapedVideo[];
}

/**
 * LinkedContent 입력 타입 (기존 inferred type 명시화)
 */
export interface LinkedContentInput {
    title: string;
    platform: Platform;
    url: string;
    type: ContentType;
    cast?: string[];
}

/**
 * 매칭된 이벤트 정보
 */
export interface MatchedEvent {
    eventDate: string; // "YYYY-MM-DD"
    eventTitle: string;
    eventType: EventType;
    addedContents: LinkedContentInput[];
}

/**
 * 매칭되지 않은 비디오 정보
 */
export interface UnmatchedVideo {
    date: string; // "YYYY-MM-DD"
    videos: ScrapedVideo[];
    reason: string; // 매칭 실패 이유
}

/**
 * 잠재적 매칭 제안
 */
export interface SuggestionItem {
    video: ScrapedVideo;
    potentialEvents: Array<{
        eventDate: string;
        eventTitle: string;
        eventType: EventType;
        confidence: number; // 0~1 사이의 신뢰도 점수
        reason: string; // 제안 이유 (예: "날짜 불일치 but 키워드 매칭")
    }>;
}

/**
 * 매칭 결과 전체
 */
export interface MatchResult {
    matched: MatchedEvent[]; // 성공적으로 매칭된 이벤트들
    unmatched: UnmatchedVideo[]; // 매칭되지 않은 비디오들
    suggestions: SuggestionItem[]; // 수동 검토가 필요한 제안들
    stats: {
        totalEvents: number;
        eventsWithNewContent: number;
        totalContentsAdded: number;
        byPlatform: Record<string, number>;
        byContentType: Record<string, number>;
    };
}
