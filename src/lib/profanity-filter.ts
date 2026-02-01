/**
 * 욕설 및 부적절한 콘텐츠 감지 유틸리티
 */

// 기본 욕설 키워드 목록
const PROFANITY_KEYWORDS = [
    '시발', '씨발', '씨빨', '씹알', '미친놈', '개새끼', '병신', '지랄', '꺼져', '좆', '씹', '썅', '쓰레기', '빻',
    'ㅅㅂ', 'ㅆㅂ', 'ㅂㅅ', 'ㅄ', 'ㄲㅈ', 'ㅈㄴ', 'ㅈㄹ', 'ㅈ같', 'ㄳㄲ', 'ㄱㅅㄲ', 'ㅗ', 'ㅈ',
    '개ㅅㅐㄲ', '개새ㄲ', '개색기', '한남', '폐급', '찐따', '염병', '엿', '재기',
    'fuck', 'shit', 'bitch', 'damn', 'bullshit'
];

// 멤버 비방 관련 키워드
const HATE_KEYWORDS = [
    '싫어', '별로', '못생', '실력없', '탈퇴', '죽어', '뒤져', '뒈져'
];

/**
 * 텍스트에서 욕설 또는 부적절한 콘텐츠를 감지합니다
 * @param text 검사할 텍스트
 * @returns 부적절한 콘텐츠가 발견되면 true
 */
export function containsProfanity(text: string): boolean {
    if (!text) return false;

    const lowerText = text.toLowerCase();

    // 욕설 키워드 검사
    for (const keyword of PROFANITY_KEYWORDS) {
        if (lowerText.includes(keyword.toLowerCase())) {
            return true;
        }
    }

    // 멤버 비방 키워드 검사 (더 엄격하게)
    for (const keyword of HATE_KEYWORDS) {
        if (lowerText.includes(keyword.toLowerCase())) {
            return true;
        }
    }

    return false;
}

/**
 * 텍스트에서 감지된 부적절한 키워드를 반환합니다
 * @param text 검사할 텍스트
 * @returns 감지된 키워드 배열
 */
export function getDetectedKeywords(text: string): string[] {
    if (!text) return [];

    const lowerText = text.toLowerCase();
    const detected: string[] = [];

    for (const keyword of [...PROFANITY_KEYWORDS, ...HATE_KEYWORDS]) {
        if (lowerText.includes(keyword.toLowerCase())) {
            detected.push(keyword);
        }
    }

    return detected;
}

/**
 * 텍스트를 정화합니다 (욕설을 *로 대체)
 * @param text 정화할 텍스트
 * @returns 정화된 텍스트
 */
export function sanitizeText(text: string): string {
    if (!text) return text;

    let sanitized = text;

    for (const keyword of [...PROFANITY_KEYWORDS, ...HATE_KEYWORDS]) {
        const regex = new RegExp(keyword, 'gi');
        sanitized = sanitized.replace(regex, '*'.repeat(keyword.length));
    }

    return sanitized;
}
