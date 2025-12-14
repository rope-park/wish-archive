import { PrismaClient, PhotoCardSource } from '@prisma/client';

/**
 * 위젯 데이터 시드
 * - Quotes (멤버 어록)
 * - Playlist (미니 플레이어)
 * - Wishes (방명록 샘플)
 * - DigitalPhotoCards (포토카드 - 앨범/이벤트 연동)
 */
export async function seedWidgets(prisma: PrismaClient) {
    console.log('🌱 Seeding Widget Data...');

    // =====================================================================
    // [0] 사전 데이터 조회 (FK 연결을 위해 필요)
    // =====================================================================

    // 1. 멤버 조회
    const members = await prisma.member.findMany();
    const getMember = (name: string) => members.find(m => m.stageName === name || m.name === name);

    // 2. 앨범 조회 (Steady, WISH)
    const albumSteady = await prisma.album.findFirst({ where: { title: { contains: 'Steady' } } });
    const albumWish = await prisma.album.findFirst({ where: { title: { contains: 'WISH' } } });

    // 3. 이벤트 조회 (시즌그리팅, 팬미팅 등 - 없으면 생성하거나 넘어감)
    const eventFanmeeting = await prisma.event.findFirst({ where: { type: 'FANMEETING' } });

    // =====================================================================
    // [1] Members Quote (어록) 시드
    // =====================================================================
    console.log('   - Seeding Quotes...');

    // 기존 데이터 초기화 (중복 방지)
    await prisma.quote.deleteMany();

    const quotesData = [
        { name: '시온', content: "밥은 먹었어? 🍚" },
        { name: '시온', content: "리더로서 묵직하게 가겠습니다." },
        { name: '리쿠', content: "NCT WISH의 쿨한 래퍼 리쿠입니다! 🐿️" },
        { name: '유우시', content: "⭐️ 반짝반짝 유우시" },
        { name: '재희', content: "노래할 때가 가장 행복해요 🌳" },
        { name: '료', content: "오늘 하루도 화이팅! 🦭" },
        { name: '사쿠야', content: "크루아상 좋아해요! 🥐" },
        { name: '사쿠야', content: "형아들 사랑해요 💕" },
    ];

    for (const q of quotesData) {
        const member = getMember(q.name);
        if (member) {
            await prisma.quote.create({
                data: {
                    content: q.content,
                    memberId: member.id,
                },
            });
        }
    }

    // =====================================================================
    // [2] Mini Player (플레이리스트) 시드
    // =====================================================================
    console.log('   - Seeding Playlist...');

    await prisma.playlistTrack.deleteMany();
    
    // Track 테이블에서 MV가 있는 곡들을 가져와서 PlaylistTrack 생성
    const tracksWithMv = await prisma.track.findMany({
        where: {
            hasMv: true,
            mvUrl: { not: null }
        },
        include: {
            album: true
        },
        orderBy: {
            releaseDate: 'desc'
        }
    });

    let orderCounter = 1;

    for (const track of tracksWithMv) {
        // YouTube URL에서 video ID 추출
        let youtubeId = '';
        if (track.mvUrl) {
            const match = track.mvUrl.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
            if (match) {
                youtubeId = match[1];
            }
        }

        // 유효한 YouTube ID만 PlaylistTrack에 추가
        if (youtubeId && youtubeId.length === 11 && !/^(_.*_|example)$/i.test(youtubeId)) {
            await prisma.playlistTrack.create({
                data: {
                    title: track.title,
                    artist: "NCT WISH",
                    youtubeId: youtubeId,
                    order: orderCounter++,
                    isActive: true,
                    trackId: track.id,
                }
            });
        }
    }

    // =====================================================================
    // [3] Digital Photo Cards (포토카드) 시드
    // =====================================================================
    console.log('   - Seeding PhotoCards...');

    await prisma.digitalPhotoCard.deleteMany();

    const photoCards = [];

    // 1. 'Steady' 앨범 포토카드 (ALBUM Source)
    if (albumSteady) {
        const steadyMembers = ['시온', '리쿠', '유우시', '재희', '료', '사쿠야'];

        steadyMembers.forEach((memberName, idx) => {
            const member = getMember(memberName);
            if (member) {
                photoCards.push({
                    name: `${albumSteady.title} Ver.A - ${memberName}`,
                    imageUrl: `/images/photocards/steady/${member.nameEn?.toLowerCase()}_A.jpg`, // 실제 파일명 규칙에 맞게 수정 필요
                    rarity: idx % 2 === 0 ? "RARE" : "COMMON",
                    sourceType: PhotoCardSource.ALBUM,
                    memberId: member.id,
                    albumId: albumSteady.id,
                    eventId: null,
                });
            }
        });
    }

    // 2. 'WISH' 데뷔 싱글 포토카드 (ALBUM Source)
    if (albumWish) {
        const wishMembers = ['시온', '사쿠야']; // 예시로 2명만
        wishMembers.forEach(memberName => {
            const member = getMember(memberName);
            if (member) {
                photoCards.push({
                    name: `Debut Single WISH - ${memberName}`,
                    imageUrl: `/images/photocards/wish/${member.nameEn?.toLowerCase()}_debut.jpg`,
                    rarity: "LEGENDARY",
                    sourceType: PhotoCardSource.ALBUM,
                    memberId: member.id,
                    albumId: albumWish.id,
                    eventId: null,
                });
            }
        });
    }

    // 3. 팬미팅/이벤트 포토카드 (EVENT Source)
    if (eventFanmeeting) {
        const member = getMember('료');
        if (member) {
            photoCards.push({
                name: "School of WISH 팬미팅 특전",
                imageUrl: `/images/photocards/event/ryo_fanmeeting.jpg`,
                rarity: "RARE",
                sourceType: PhotoCardSource.EVENT,
                memberId: member.id,
                albumId: null,
                eventId: eventFanmeeting.id,
            });
        }
    }

    // 4. 기타 특전 (OTHER Source)
    const memberYushi = getMember('유우시');
    if (memberYushi) {
        photoCards.push({
            name: "미공개 셀카 특전",
            imageUrl: `/images/photocards/other/yushi_special.jpg`,
            rarity: "LEGENDARY",
            sourceType: PhotoCardSource.OTHER,
            memberId: memberYushi.id,
            albumId: null,
            eventId: null,
        });
    }

    // 데이터 한꺼번에 생성
    for (const card of photoCards) {
        await prisma.digitalPhotoCard.create({ data: card });
    }

    // =====================================================================
    // [4] Wish Jar (방명록) 샘플 시드
    // =====================================================================
    console.log('   - Seeding Wishes...');

    await prisma.wish.deleteMany();

    await prisma.wish.createMany({
        data: [
            {
                content: "NCT WISH 항상 응원해! 💚",
                nickname: "시즈니",
                color: "green",
                posX: 50, posY: 50, rotation: -5,
            },
            {
                content: "Steady 대박나자~ 노래 너무 좋아요",
                nickname: "위시사랑해",
                color: "pink",
                posX: 150, posY: 100, rotation: 10,
            },
            {
                content: "첫 단독 콘서트 축하해!!",
                nickname: "별",
                color: "blue",
                posX: 100, posY: 200, rotation: 2,
            }
        ]
    });

    console.log('✅ Widget Data Seeded Successfully!');
}