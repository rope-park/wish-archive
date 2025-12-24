/**
 * polaroid random API route
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 캐시 방지 (항상 새로운 랜덤 데이터 가져옴)
export const dynamic = 'force-dynamic';

/**
 * GET api/widgets/polaroid/random
 * @returns 랜덤 폴라로이드 사진 데이터
 */
export async function GET() {
    try {
        // 전체 폴라로이드 개수 확인
        const count = await prisma.polaroid.count();

        if (count === 0) {
            return NextResponse.json({
                id: 'default',
                imageUrl: '/system/widgets/PolaroidPhoto/wishpolaroid_temp.jpg',
                caption: 'Welcome to Wish OS!',
            });
        }

        // 랜덤 오프셋 생성
        const randomOffset = Math.floor(Math.random() * count);

        // 랜덤 폴라로이드 1개 조회
        const randomPolaroid = await prisma.polaroid.findFirst({
            skip: randomOffset,
        });

        if (!randomPolaroid) {
            return NextResponse.json(
                { error: 'Polaroid not found' },
                { status: 404 }
            );
        }

        // 응답 데이터 구성
        const widgetData = {
            id: randomPolaroid.id,
            src: randomPolaroid.imageUrl,
            caption: randomPolaroid.caption,
        };

        return NextResponse.json(widgetData);

    } catch (error) {
        console.error('Error fetching random polaroid:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}