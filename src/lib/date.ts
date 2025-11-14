/**
 * 나이 계산/날짜 포맷 공통 유틸리티
 */

/**
 * UTC 기준 나이 계산 (만나이 계산)
 * @param birth 생년월일
 * @param now 현재 날짜 (기본값: 현재 시각)
 * @returns 만 나이
 */
export function calcAgeUTC(birth: Date, now = new Date()): number {
    const y = now.getUTCFullYear() - birth.getUTCFullYear();
    const m = now.getUTCMonth() - birth.getUTCMonth();
    const d = now.getUTCDate() - birth.getUTCDate();
    return m > 0 || (m === 0 && d >= 0) ? y : y - 1;
}

/**
 * UTC 기준 안전한 나이 계산
 * @param birth 생년월일
 * @param now 현재 날짜 (기본값: 현재 시각)
 * @returns 만 나이 또는 null   
 */
export function safeAgeUTC(birth: Date | null | undefined, now = new Date()): number | null {
    return birth ? calcAgeUTC(birth, now) : null;
}

/**
 * UTC 기준 날짜를 YYYY-MM-DD 형식으로 변환
 * @param date 날짜
 * @returns YYYY-MM-DD 형식 문자열 또는 '-' (날짜가 없을 경우)
 */
export function ymdUTC(date: Date | null | undefined): string {
    if (!date) return '-';
    return new Date(date).toISOString().slice(0, 10);
}