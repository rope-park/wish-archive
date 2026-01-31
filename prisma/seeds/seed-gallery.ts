// prisma/seeds/seed-gallery.ts
import 'dotenv/config';
import { GalleryCategory, Platform } from '@prisma/client';
import { scrapeMetadata } from '../../scripts/scraper/x_twitter/metadata-scraper'
import { galleryLinks } from './13-gallery-links';
import { PrismaClient } from '@prisma/client';

const dbUrl = process.env.DATABASE_URL || process.env.DIRECT_URL;

if (!dbUrl) {
    console.error('🔥 [Error] 데이터베이스 연결 주소(URL)를 찾을 수 없습니다!');
    console.error('   .env 파일에 DATABASE_URL 또는 DIRECT_URL이 있는지 확인해주세요.');
    process.exit(1);
}

console.log(`🔌 Connecting to DB...`);


// 🕵️‍♀️ 멤버 탐정단: 본문에서 이 단어가 보이면 해당 멤버를 태그합니다.
const MEMBER_KEYWORDS: Record<string, string[]> = {
    sion: ['sion', 'SION', '시온', '숀', 'leader'],
    riku: ['riku', 'RIKU', '리쿠', '쿠리', '다람쥐'],
    yushi: ['yushi', 'YUSHI', '유우시', '우시', '윳시', '토쿠노'],
    jaehee: ['jaehee', 'JAEHEE', '재희', '대영', '큰댕', '댕'],
    ryo: ['ryo', 'RYO', '료', '히로세', '작댕'],
    sakuya: ['sakuya', 'SAKUYA', '사쿠야', '쿠야', '빵', '후지나가'],
};

export async function seedGallery(prisma: PrismaClient) {
    console.log('📸 [Wish Gallery] 자동 아카이빙 (날짜 자동 계산 모드) 시작...');

    // 1. 멤버 맵핑 준비
    const members = await prisma.member.findMany();
    const memberMap = new Map(members.map((m) => [
        (m.nameEn || m.stageName).toLowerCase(),
        m.id
    ]));

    let successCount = 0;

    // 🛠️ 이제 galleryLinks는 단순 문자열 배열입니다.
    const links = galleryLinks as string[];

    for (const url of links) {
        // (1) 중복 체크
        const exists = await prisma.galleryPost.findFirst({
            where: { originalUrl: url },
        });

        if (exists) {
            process.stdout.write('⏩');
            continue;
        }

        // (2) 메타데이터 + 날짜 추출
        const meta = await scrapeMetadata(url);
        if (!meta || !meta.imageUrl) {
            process.stdout.write('❌');
            continue;
        }

        // (3) 추출된 날짜로 이벤트 찾기 (자동 매핑의 핵심!)
        // 해당 날짜(00:00 ~ 23:59)에 있는 이벤트를 검색
        const targetDate = meta.date;
        const event = await prisma.event.findFirst({
            where: {
                date: {
                    gte: new Date(targetDate.setHours(0, 0, 0, 0)),
                    lt: new Date(targetDate.setHours(23, 59, 59, 999)),
                },
            },
        });

        // (4) 멤버 태그 분석
        const descriptionLower = meta.description.toLowerCase();
        const taggedMemberIds: string[] = [];

        Object.entries(MEMBER_KEYWORDS).forEach(([engName, keywords]) => {
            if (keywords.some((k) => descriptionLower.includes(k))) {
                let memberId = memberMap.get(engName);
                if (!memberId) {
                    memberMap.forEach((id, name) => {
                        if (!memberId && name.includes(engName)) {
                            memberId = id;
                        }
                    });
                }
                if (memberId && !taggedMemberIds.includes(memberId)) {
                    taggedMemberIds.push(memberId);
                }
            }
        });

        // (5) 카테고리 & 플랫폼 설정
        let category: GalleryCategory = GalleryCategory.OFFICIAL;
        if (taggedMemberIds.length > 0 || descriptionLower.includes('selca')) category = GalleryCategory.SELFIE;
        else if (descriptionLower.includes('behind')) category = GalleryCategory.BEHIND;

        const platform: Platform = (meta.siteName.toUpperCase().includes('TWITTER') || meta.siteName.includes('X'))
            ? Platform.X_TWITTER
            : Platform.INSTAGRAM;

        // (6) 저장
        await prisma.galleryPost.create({
            data: {
                originalUrl: meta.url,
                imageUrl: meta.imageUrl,
                platform: platform,
                caption: meta.description.slice(0, 300),
                category: category,
                eventId: event?.id || null, // 이벤트 있으면 연결, 없으면 Unsorted
                members: {
                    connect: taggedMemberIds.map((id) => ({ id })),
                },
                createdAt: meta.date, // 실제 게시물 작성일로 저장!
            },
        });

        process.stdout.write('✨');
        successCount++;
        await new Promise((r) => setTimeout(r, 300)); // 0.3초 대기
    }

    console.log(`\n🎉 완료! 총 ${successCount}개의 추억을 저장했습니다.`);
}