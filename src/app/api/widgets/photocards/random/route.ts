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
        const count = await prisma.digitalPhotoCard.count();

        if (count === 0) {
            return NextResponse.json(
                { error: 'No photocards available' },
                { status: 404 }
            );
        }

        // 랜덤 오프셋 생성
        const randomOffset = Math.floor(Math.random() * count);

        // 랜덤 포토카드 1개 조회
        const randomPhotocard = await prisma.digitalPhotoCard.findFirst({
            skip: randomOffset,
            select: {
                id: true,
                name: true,
                imageUrl: true,
                sourceType: true,
                // 멤버 정보
                member: {
                    select: {
                        stageName: true,
                        colorCode: true,
                    },
                },
                // 앨범 정보
                album: {
                    select: {
                        title: true,
                    },
                },
                // 이벤트 정보
                event: {
                    select: {
                        title: true,
                    },
                },
            },
        });

        if (!randomPhotocard) {
            return NextResponse.json(
                { error: 'Photocard not found' },
                { status: 404 }
            );
        }

        // 출처 이름 결정 로직
        let sourceName = 'Special';

        if (randomPhotocard.sourceType === 'ALBUM' && randomPhotocard.album) {
            sourceName = randomPhotocard.album.title;
        } else if (randomPhotocard.sourceType === 'EVENT' && randomPhotocard.event) {
            sourceName = randomPhotocard.event.title;
        } else {
            sourceName = randomPhotocard.name;
        }

        // 응답 데이터 구성
        const responseData = {
            id: randomPhotocard.id,
            member: randomPhotocard.member?.stageName || 'NCT WISH',
            source: sourceName,
            color: randomPhotocard.member?.colorCode || '#BBE309',
            src: randomPhotocard.imageUrl,
        };

        return NextResponse.json(responseData);

    } catch (error) {
        console.error('Error fetching random photocard:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}