/**
 * photocard random API route
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// 캐시 방지 (항상 새로운 랜덤 데이터 가져옴)
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // 전체 포토카드 개수 확인
        const count = await prisma.photoCard.count();

        if (count === 0) {
            return NextResponse.json(
                { error: 'No photocards available' },
                { status: 404 }
            );
        }

        // 랜덤 오프셋 생성
        const randomOffset = Math.floor(Math.random() * count);

        // 랜덤 포토카드 1개 조회
        const randomPhotocard = await prisma.photoCard.findFirst({
            skip: randomOffset,
            take: 1,
            include: {
                member: true,
            },
        });

        if (!randomPhotocard) {
            return NextResponse.json(
                { error: 'Photocard not found' },
                { status: 404 }
            );
        }

        // 응답 데이터 구성
        const widgetData = {
            id: randomPhotocard.id,
            member: randomPhotocard.member?.stageName || 'NCT WISH',
            version: randomPhotocard.versionName,
            color: randomPhotocard.member?.colorCode || '#BBE309',
            src: randomPhotocard.imageUrl,
        };

        return NextResponse.json(widgetData);

    } catch (error) {
        console.error('Error fetching random photocard:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}