/**
 * 애플리케이션 전용 에러 클래스
 */

/**
 * 에러 클래스
 * @class AppError
 * @extends Error
 * @property {number} status - HTTP 상태 코드
 */
export class AppError extends Error {
    status: number;
    constructor(message: string, status = 400) {
        super(message);
        this.status = status;
    }
}

/**
 * 에러를 JSON 형태로 변환
 * @param e 에러 객체
 * @returns JSON 형태의 에러 정보
 */
export function toJsonError(e: unknown) {
    if (e instanceof AppError) {
        return { message: e.message, status: e.status };
    }
    if (e instanceof Error) {
        return { message: e.message, status: 500 };
    }
    return { message: "Internal Server Error", status: 500 };
}