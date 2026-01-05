// prisma/seeds/13-contents.ts
import { PrismaClient, ContentType, ContentPlatform } from '@prisma/client'
import { logger, ProgressTracker } from './utils'

// YouTube 썸네일 생성 헬퍼
const getYouTubeThumb = (id: string) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

/**
 * 콘텐츠 시드
 * - 뮤직비디오, 퍼포먼스 클립, 자체 콘텐츠, 비하인드 영상 등
 */
export async function seedContents(prisma: PrismaClient) {
    const albums = await prisma.album.findMany();
    const tracks = await prisma.track.findMany();
    const members = await prisma.member.findMany();
    const group = await prisma.group.findFirst({ where: { slug: 'nct-wish' } });

    if (!group) throw new Error('Group "nct-wish" not found');

    const getAlbumId = (slug: string) => albums.find(a => a.slug === slug)?.id;
    const getTrackId = (title: string) => tracks.find(t => t.title === title)?.id;

    const allMemberIds = members.map(m => m.id);

    const contentsData = [
        // ----------------------------------------------------
        // [1] Pre-Debut: Hands Up
        // ----------------------------------------------------
        {
            title: 'NCT WISH : WISH for Our WISH',
            videoId: 'RxG5XoFmXHY',
            cType: 'MV_TEASER' as ContentType,
            publishedAt: new Date('2024-01-17'),
            tags: ['Teaser', 'Debut', 'Trailer'],
            albumSlug: 'hands-up'
        },
        {
            title: 'NCT WISH "Hands Up" MV',
            videoId: 'ZVcy7bQkBhA',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2023-10-08'),
            tags: ['MV', 'Pre-Debut', 'Hands Up'],
            albumSlug: 'hands-up',
            trackTitle: 'Hands Up'
        },
        {
            title: 'NCT WISH "We Go!" Performance Video',
            videoId: 'iVEHidURFoU',
            cType: 'PERFORMANCE_CLIP' as ContentType,
            publishedAt: new Date('2023-10-08'),
            tags: ['Performance', 'We Go', 'Pre-Debut'],
            albumSlug: 'hands-up',
            trackTitle: 'We Go!'
        },

        // ----------------------------------------------------
        // [2] Debut: WISH
        // ----------------------------------------------------
        {
            title: 'NCT WISH "WISH (Korean Ver.)" MV',
            videoId: 'hvQZs3k6Ytk',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2024-02-28'),
            tags: ['MV', 'Debut', 'WISH', 'Korean Ver', '큐피드'],
            albumSlug: 'wish',
            trackTitle: 'WISH (Korean Ver.)',
            isHighlight: true,
        },
        {
            title: 'NCT WISH "WISH (Japanese Ver.)" MV',
            videoId: 'ZgrEZmAgzM8',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2024-02-28'),
            tags: ['MV', 'Debut', 'WISH', 'Japanese Ver'],
            albumSlug: 'wish',
            trackTitle: 'WISH (Japanese Ver.)'
        },
        {
            title: 'WISH Performance Video',
            videoId: '8X-Jq0q0q0q', // (가상의 ID 예시 - 실제 ID로 교체 권장)
            cType: 'DANCE_PRACTICE' as ContentType,
            publishedAt: new Date('2024-03-01'),
            tags: ['Performance', 'Choreography', 'WISH'],
            albumSlug: 'wish',
            trackTitle: 'WISH (Korean Ver.)'
        },
        {
            title: 'NCT WISH "Sail Away" MV',
            videoId: 'VLtIZR4wHtU', // (가상의 ID)
            cType: 'MV' as ContentType, // Track Video 성격
            publishedAt: new Date('2024-02-28'),
            tags: ['Track Video', 'Sail Away', 'Marine Look'],
            albumSlug: 'wish',
            trackTitle: 'Sail Away (Korean Ver.)'
        },
        {
            title: 'Wish Bakery Ep.1 : Riku & Sion',
            videoId: 'WishBakery_01',
            cType: 'BEHIND' as ContentType,
            publishedAt: new Date('2024-03-10'),
            tags: ['Reality', 'Wish Bakery', 'Cooking'],
            albumSlug: 'wish',
        },
        {
            title: 'WISH Album Unboxing',
            videoId: 'Unboxing_Wish',
            cType: 'UNBOXING' as ContentType,
            publishedAt: new Date('2024-03-05'),
            tags: ['Unboxing', 'Album', 'Reaction'],
            albumSlug: 'wish',
        },

        // ----------------------------------------------------
        // [3] Songbird
        // ----------------------------------------------------
        {
            title: 'NCT WISH "Songbird (Korean Ver.)" MV',
            videoId: '2XqVNFBtVo4',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2024-07-01'),
            tags: ['MV', 'Songbird', 'Summer', '청량'],
            albumSlug: 'songbird',
            trackTitle: 'Songbird (Korean Ver.)',
            isHighlight: true,
        },
        {
            title: 'NCT WISH "Songbird (Japanese Ver.)" MV',
            videoId: 'C_qALZPuK8I',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2024-06-25'),
            tags: ['MV', 'Songbird', 'Japanese Ver'],
            albumSlug: 'songbird',
            trackTitle: 'Songbird (Japanese Ver.)'
        },
        {
            title: 'Tears Are Falling Special Video',
            videoId: 'UxEdtQR7gUM', // (가상의 ID)
            cType: 'OTHER' as ContentType,
            publishedAt: new Date('2024-07-05'),
            tags: ['Special Video', 'Ballad', '힐링'],
            albumSlug: 'songbird',
            trackTitle: 'Tears Are Falling (Korean Ver.)'
        },
        {
            title: 'Lets Ride! NCT WISH 첫 번째 여름 여행! | WISH\'s Wish☆ EP. 1',
            videoId: 'WishsWish_01',
            cType: 'BEHIND' as ContentType,
            publishedAt: new Date('2024-07-04'),
            tags: ['Reality', 'Travel', 'Summer'],
            albumSlug: 'songbird',
        },

        // ----------------------------------------------------
        // [4] Steady
        // ----------------------------------------------------
        {
            title: 'NCT WISH "Steady" MV',
            videoId: 'IKlkZZv76Ho',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2024-09-24'),
            tags: ['MV', 'Steady', 'School', 'Romance'],
            albumSlug: 'steady',
            trackTitle: 'Steady',
            isHighlight: true,
        },
        {
            title: 'NCT WISH "Dunk Shot" MV',
            videoId: '4vgac97VlCE',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2024-09-09'),
            tags: ['MV', 'Pre-Release', 'Dunk Shot', 'Basketball'],
            albumSlug: 'steady',
            trackTitle: 'Dunk Shot'
        },
        {
            title: 'NCT WISH "3분까진 필요없어" Track Video',
            videoId: 'GTFqQDZ6jec',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2024-09-24'),
            tags: ['Track Video', '3 Minutes', 'Wit'],
            albumSlug: 'steady',
            trackTitle: '3분까진 필요없어 (3 Minutes)'
        },

        // ----------------------------------------------------
        // [5] WISHFUL (Japan 1st Album)
        // ----------------------------------------------------
        {
            title: 'NCT WISH "Wishful Winter" MV',
            videoId: 'NAhEwvI9TGE',
            cType: 'MV' as ContentType,
            publishedAt: new Date('2024-11-27'),
            tags: ['MV', 'Winter', 'Carol', 'Christmas', 'Japan'],
            albumSlug: 'wishful',
            trackTitle: 'Wishful Winter',
            isHighlight: true,
        },
        {
            title: 'NCT WISH "NASA" Performance Video',
            videoId: 'noGjEgZ15PM', // (가상의 ID)
            cType: 'PERFORMANCE_CLIP' as ContentType,
            publishedAt: new Date('2024-11-27'),
            tags: ['Performance', 'NASA', 'HipHop'],
            albumSlug: 'wishful',
            trackTitle: 'NASA'
        },
        {
            title: 'LOG in WISH #KYOTO | 위시가 교토에 왔어료',
            videoId: 'Login_Kyoto',
            cType: 'BEHIND' as ContentType,
            publishedAt: new Date('2024-11-15'),
            tags: ['Tour', 'Log in', 'Kyoto', 'Travel'],
            albumSlug: 'wishful',
        },

        // ----------------------------------------------------
        // [6] poppop
        // ----------------------------------------------------
        {
            title: 'NCT WISH "poppop" MV',
            videoId: 'LNETckymbzk', // (가상의 ID)
            cType: 'MV' as ContentType,
            publishedAt: new Date('2025-04-14'),
            tags: ['MV', 'poppop', 'Refresh', 'Million Seller'],
            albumSlug: 'poppop',
            trackTitle: 'poppop',
            isHighlight: true,
        },
        {
            title: 'Melt Inside My Pocket (Live Clip)',
            videoId: 'GIoDgHfQX6Y', // (가상의 ID)
            cType: 'LIVE_STREAM' as ContentType,
            publishedAt: new Date('2025-03-21'), // 선공개일
            tags: ['Live', 'Concert', 'Pre-Release'],
            albumSlug: 'poppop',
            trackTitle: 'Melt Inside My Pocket'
        },
        {
            title: 'poppop Jacket Behind',
            videoId: 'poppop_jacket',
            cType: 'BEHIND' as ContentType,
            publishedAt: new Date('2025-04-15'),
            tags: ['Behind', 'Jacket', 'Photoshoot'],
            albumSlug: 'poppop',
        },

        // ----------------------------------------------------
        // [7] COLOR
        // ----------------------------------------------------
        {
            title: 'NCT WISH "COLOR" MV',
            videoId: '28dAfmIAlCo', // (가상의 ID)
            cType: 'MV' as ContentType,
            publishedAt: new Date('2025-09-01'),
            tags: ['MV', 'COLOR', 'Showcase', 'Festival'],
            albumSlug: 'color',
            trackTitle: 'COLOR',
            isHighlight: true,
        },
        {
            title: 'NCT WISH "Surf" MV',
            videoId: '1pyO6oNmACs', // (가상의 ID)
            cType: 'MV' as ContentType,
            publishedAt: new Date('2025-08-12'), // 선공개
            tags: ['MV', 'Surf', 'Summer', 'Beach'],
            albumSlug: 'color',
            trackTitle: 'Surf'
        },
        {
            title: 'NCT WISH "Baby Blue" MV',
            videoId: 'FBr4hA9L90s', // (가상의 ID)
            cType: 'MV' as ContentType,
            publishedAt: new Date('2025-08-26'), // 선공개
            tags: ['MV', 'Baby Blue', 'Cute'],
            albumSlug: 'color',
            trackTitle: 'Baby Blue'
        },
        {
            title: 'WISH ON STAGE Highlights',
            videoId: 'WishOnStage_High',
            cType: 'PERFORMANCE_CLIP' as ContentType,
            publishedAt: new Date('2025-09-02'),
            tags: ['Showcase', 'Live', 'Performance'],
            albumSlug: 'color',
        },
    ];

    // ====================================================
    // [DB 입력 로직]
    // ====================================================

    const createdContents = [];
    const progress = new ProgressTracker('Seeding Contents', contentsData.length);

    for (const item of contentsData) {
        try {
            // 1. URL & Thumbnail 생성
            // videoId가 실제 유튜브 ID 포맷(11자)이면 링크 생성, 아니면 임의 처리
            const isYoutubeId = item.videoId.length === 11 && !item.videoId.includes('_');
            const url = isYoutubeId
                ? `https://www.youtube.com/watch?v=${item.videoId}`
                : `https://example.com/video/${item.videoId}`;

            const thumbnailUrl = isYoutubeId
                ? getYouTubeThumb(item.videoId)
                : `/images/placeholders/content_${item.cType.toLowerCase()}.jpg`; // 로컬 플레이스홀더

            // 2. 연결 관계 ID 찾기
            const albumId = item.albumSlug ? getAlbumId(item.albumSlug) : undefined;
            const trackId = item.trackTitle ? getTrackId(item.trackTitle) : undefined;

            // 3. 태그 처리 (connectOrCreate)
            const tagsString = item.tags;

            // 4. Content 생성 (Upsert)
            const content = await prisma.content.upsert({
                where: { url },
                update: {
                    title: item.title,
                    cType: item.cType,
                    platform: 'YOUTUBE' as ContentPlatform,
                    thumbnailUrl,
                    publishedAt: item.publishedAt,
                    description: `${item.title} - Official Video`,
                    tags: tagsString,
                    isHighlight: item.isHighlight || false,
                    album: albumId ? { connect: { id: albumId } } : undefined,
                    track: trackId ? { connect: { id: trackId } } : undefined,
                    group: { connect: { id: group.id } },
                    // update 시에는 members를 건드리지 않음 (이미 존재하므로)
                },
                create: {
                    title: item.title,
                    url,
                    cType: item.cType,
                    platform: 'YOUTUBE' as ContentPlatform,
                    thumbnailUrl,
                    publishedAt: item.publishedAt,
                    description: `${item.title} - Official Video`,
                    tags: tagsString,
                    isHighlight: item.isHighlight || false,
                    album: albumId ? { connect: { id: albumId } } : undefined,
                    track: trackId ? { connect: { id: trackId } } : undefined,
                    group: { connect: { id: group.id } },
                    members: {
                        create: allMemberIds.map(memberId => ({
                            member: { connect: { id: memberId } }
                        }))
                    }
                }
            });

            createdContents.push(content);
            progress.increment();

        } catch (error) {
            logger.error(`Failed to seed content: ${item.title}`);
            console.error(error);
        }
    }

    progress.complete();
    logger.success(`Contents seeded: ${createdContents.length} items`);
    return createdContents;
}