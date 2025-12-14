/**
 * D-Day 위젯 API 라우트
 * 
 * - 목표 날짜까지 남거나 지난 일수를 계산하여 반환
 * - 쿼리 파라미터로 날짜와 라벨 설정 가능
 */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 성능 최적화를 위한 24시간 동안 캐시 (ISR)
export const revalidate = 86400; // 24 hours

/**
 * GET api/widgets/dday
 * - 목표 날짜와 라벨을 포함한 D-Day 정보 반환
 * @returns {Promise<NextResponse>} 목표 날짜와 라벨을 포함한 JSON 응답
 */
export async function GET() {
    try {
        // 1. 그룹 정보 조회 (데뷔일 사용)
        const group = await prisma.group.findUnique({
            where: { slug: 'nct-wish' },
            select: { debutDate: true, name: true },
        });

        if (!group?.debutDate) {
            return NextResponse.json({ date: '2024-02-21', label: 'Debut', name: 'NCT WISH' }); // 기본값 반환
        }

        // 2. 응답 반환
        return NextResponse.json({
            date: group.debutDate,
            label: 'Debut',
            name: group.name,
        });

    } catch (error) {
        console.error('Error fetching D-Day data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
