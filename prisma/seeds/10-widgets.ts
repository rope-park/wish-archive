import { PrismaClient, PhotoCardSource } from '@prisma/client';
import { logger, ProgressTracker } from './utils';

/**
 * 위젯 데이터 시드
 * - Quotes (멤버 어록)
 * - Playlist (미니 플레이어)
 * - Wishes (방명록 샘플)
 * - PhotoCards (포토카드)
 * - Polaroids (폴라로이드 사진)
 */
export async function seedWidgets(prisma: PrismaClient) {

    // [0] 사전 데이터 조회
    const members = await prisma.member.findMany();
    const albums = await prisma.album.findMany();
    const tracks = await prisma.track.findMany({
        where: { hasMv: true, mvUrl: { not: null } },
        orderBy: { releaseDate: 'desc' }
    });


    // ID 매핑 헬퍼
    const getMember = (name: string) => members.find(m => m.stageName === name || m.name === name || m.nameEn?.toLowerCase() === name.toLowerCase());
    const _getAlbum = (title: string) => albums.find(a => a.title.includes(title));
    const _getTrack = (title: string) => tracks.find(t => t.title === title);

    // =====================================================================
    // [1] Members Quote (어록) 시드
    // ====================================================================
    await prisma.quote.deleteMany();

    const quotesData = [
        { name: '시온', content: "시즈니 사랑한다잉~" },
        { name: '시온', content: "오늘보다 내일 더 발전하는 사람이 되자" },
        { name: '시온', content: "앞으로 오래오래 보자 시즈니이💚" },
        { name: '시온', content: "저 믿고 따라오세요" },
        { name: '리쿠', content: "후쿠이에서 온 사랑 많은 리쿠입니다!" },
        { name: '리쿠', content: "나의 인생처럼 쫀쪼-니" },
        { name: '리쿠', content: "헉 그거 초코리야?" },
        { name: '리쿠', content: "집 가 그러면" },
        { name: '리쿠', content: "믿겨가 안되는데" },
        { name: '리쿠', content: "휴닝카이 친구들도 첨벙첨벙~" },
        { name: '유우시', content: "자기 파트 때 불렀으면 조켄네" },
        { name: '유우시', content: "자세히 오래 보아야 저의 진짜 매력을 알 수 있을 거예요" },
        { name: '유우시', content: "우리는 지구가 사라져도 행복합시다^^!" },
        { name: '유우시', content: "에엣... 나니시뗀노...?" },
        { name: '유우시', content: "응 언어는 기세야\n 기세와 다정함이야" },
        { name: '유우시', content: "'가속'. 이제부터 우리는 더 빠르고 더 멀리 달릴 것이다." },
        { name: '유우시', content: "돌이... 돌이... 뜨거워서 기모찌 ∞" },
        { name: '유우시', content: "차에 치인 크로와상" },
        { name: '유우시', content: "그러니까 말이죠 대영쿤" },
        { name: '유우시', content: "너네 뜨겁다" },
        { name: '유우시', content: "참깨라면! 먹을 수 있어" },
        { name: '유우시', content: "사진을 찍으려고 했는데 입이 먼저 움직였어요" },
        { name: '유우시', content: "하기 전에 그냥 머리 속에 박아 놔" },
        { name: '유우시', content: "같이 죽자" },
        { name: '유우시', content: "나를 믿고 정착하라" },
        { name: '유우시', content: "위츄는 잠깐 휴가로 어디 다니고 있어\n 지금 어디에 있는지 모르겠네\n 누구 집에 간다고 했는데\n 혹시 위츄 시즈니 집에 있어?" },
        { name: '재희', content: "을사을사 화이팅" },
        { name: '재희', content: "복지피스-" },
        { name: '료', content: "꽤.괜" },
        { name: '료', content: "이런 아저씨 좋아할래?" },
        { name: '료', content: "인간의 더러운 부분이야" },
        { name: '료', content: "또오! 나만 나락 가는 거야" },
        { name: '료', content: "지옥 가야돼" },
        { name: '사쿠야', content: "최고의 빵이 되고 싶어" },
        { name: '사쿠야', content: "오빠만 믿어" },
        { name: '사쿠야', content: "듀 듀듀듀 바바바" },
        { name: '사쿠야', content: "쨔가워요 쨔가워요" },
        { name: '사쿠야', content: "風を置き去りにしてやるせ！(바람보다 빠르게 달려보겠어!)" },
        { name: '사쿠야', content: "My friend is Ryo" },
        { name: '사쿠야', content: "노터치" },
        { name: '사쿠야', content: "꿈에는 좋은 것이나 나쁜 것이랄 게 없어요" },
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

    logger.success(`Quotes seeded: ${quotesData.length} items`);

    // =====================================================================
    // [2] Mini Player (플레이리스트) 시드
    // =====================================================================
    await prisma.playlistTrack.deleteMany();

    let orderCounter = 1;
    const playlistTrack = [];

    for (const track of tracks) {
        // YouTube URL에서 video ID 추출
        const match = track.mvUrl?.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/);
        const youtubeId = match ? match[1] : null;

        // 유효한 YouTube ID만 PlaylistTrack에 추가
        if (youtubeId) {
            const playlistTrackItem = await prisma.playlistTrack.create({
                data: {
                    title: track.title,
                    artist: "NCT WISH",
                    youtubeId: youtubeId,
                    order: orderCounter++,
                    isActive: true,
                    trackId: track.id,
                }
            });
            playlistTrack.push(playlistTrackItem);
        }
    }

    logger.success(`Playlist tracks seeded: ${playlistTrack.length} items`);

    // =====================================================================
    // [3] Photo Cards (포토카드) 시드
    // =====================================================================
    await prisma.photoCard.deleteMany();

    const photoCardTemplates = {
        'sion': [
            { file: 'selfie_mirror.jpg', name: '연습실 거울 셀카', ver: 'Practice', source: 'OTHER' },
            { file: 'selfie_bed.jpg', name: '자기 전 굿나잇', ver: 'Daily', source: 'OTHER' },
            { file: 'concept_wish.jpg', name: 'WISH 자켓 비하인드', ver: 'WISH', source: 'ALBUM' },
            { file: 'selfie_stage.jpg', name: '음방 대기실', ver: 'Stage', source: 'OTHER' },
            { file: 'special_bday.jpg', name: '생일 기념 컷', ver: 'Special', source: 'EVENT' },
        ],
        'riku': [
            { file: 'selfie_cat.jpg', name: '고양이 귀 리쿠', ver: 'Cute', source: 'OTHER' },
            { file: 'concept_steady.jpg', name: 'Steady 컨셉 포토', ver: 'Steady', source: 'ALBUM' },
            { file: 'selfie_hoodie.jpg', name: '후드티 꾸러기', ver: 'Daily', source: 'OTHER' },
            { file: 'behind_mv.jpg', name: 'MV 촬영장', ver: 'Behind', source: 'EVENT' },
        ],
        'yushi': [
            { file: 'selfie_close.jpg', name: '얼빡 초근접', ver: 'Daily', source: 'OTHER' },
            { file: 'concept_songbird.jpg', name: 'Songbird 컨셉', ver: 'Songbird', source: 'ALBUM' },
            { file: 'selfie_v.jpg', name: '브이 요정', ver: 'Daily', source: 'OTHER' },
            { file: 'special_award.jpg', name: '신인상 트로피', ver: 'Special', source: 'EVENT' },
        ],
        'jaehee': [
            { file: 'selfie_school.jpg', name: '교복 재희', ver: 'School', source: 'OTHER' },
            { file: 'concept_wishful.jpg', name: 'WISHFUL 자켓', ver: 'WISHFUL', source: 'ALBUM' },
            { file: 'selfie_piano.jpg', name: '피아노 앞에서', ver: 'Daily', source: 'OTHER' },
        ],
        'ryo': [
            { file: 'selfie_peace.jpg', name: '말티즈 피스', ver: 'Daily', source: 'OTHER' },
            { file: 'concept_poppop.jpg', name: 'poppop 티저', ver: 'poppop', source: 'ALBUM' },
            { file: 'selfie_eat.jpg', name: '맛있는거 먹는 중', ver: 'Mukbang', source: 'OTHER' },
        ],
        'sakuya': [
            { file: 'selfie_bread.jpg', name: '빵쿠야', ver: 'Daily', source: 'OTHER' },
            { file: 'concept_color.jpg', name: 'COLOR 컨셉', ver: 'COLOR', source: 'ALBUM' },
            { file: 'selfie_wink.jpg', name: '막내의 윙크', ver: 'Cute', source: 'OTHER' },
            { file: 'special_wichu.jpg', name: '위츄와 함께', ver: 'Special', source: 'EVENT' },
        ],
    };

    const photoCards = [];

    for (const member of members) {
        const slugName = member.nameEn?.toLowerCase();
        const templates = photoCardTemplates[slugName as keyof typeof photoCardTemplates] || [];

        for (const template of templates) {
            photoCards.push({
                name: `${member.nameEn} - ${member.stageName}`,
                imageUrl: `/content/photocards/${slugName}/${template.file}`,
                sourceType: template.source as PhotoCardSource,
                memberId: member.id,
                versionName: template.ver,
            });
        }
    }

    const pcProgress = new ProgressTracker('Photo Cards seeding', photoCards.length);
    for (const pcData of photoCards) {
        const { memberId, ...rest } = pcData;

        await prisma.photoCard.create({ data: { ...rest, member: { connect: { id: memberId } } } });
        pcProgress.increment();
    }
    pcProgress.complete();

    logger.success(`Photo Cards seeded: ${photoCards.length} items`);

    // =====================================================================
    // [4] Wish Jar (방명록) 샘플 시드
    // =====================================================================
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

    logger.success('✅ Widget Data Seeded Successfully!');


    // ====================================================================
    // [5] 폴라로이드 사진 시드
    // ====================================================================
    await prisma.polaroid.deleteMany();

    const polaroids = [
        { file: 'sion_coffee.jpg', caption: '카페인 충전 중 ☕️' },
        { file: 'sion_practice.jpg', caption: '오늘 연습도 끝!' },
        { file: 'riku_cat.jpg', caption: '나랑 닮았나? 🐱' },
        { file: 'riku_tokyo.jpg', caption: '도쿄 타워 앞에서' },
        { file: 'yushi_shy.jpg', caption: '부끄러워...' },
        { file: 'yushi_dance.jpg', caption: '춤추는 유우시 ✨' },
        { file: 'jaehee_tree.jpg', caption: '나무 재희 🌳' },
        { file: 'jaehee_piano.jpg', caption: '피아노 연주 🎹' },
        { file: 'ryo_flower.jpg', caption: '꽃보다 료 🌸' },
        { file: 'ryo_energy.jpg', caption: '에너지 뿜뿜!!' },
        { file: 'sakuya_bread.jpg', caption: '빵 냠냠 🥐' },
        { file: 'sakuya_wink.jpg', caption: '사쿠야 윙크 😉' },
        { file: 'group_debut.jpg', caption: 'WISH Debut Day 🍀' },
        { file: 'group_travel.jpg', caption: '우리들의 여행' },
    ];

    const ppProgress = new ProgressTracker('Polaroids seeding', polaroids.length);
    for (const ppData of polaroids) {

        const imageUrl = `/system/widgets/PolaroidPhoto/${ppData.file}`;

        await prisma.polaroid.create({ data: { imageUrl, caption: ppData.caption } });
        ppProgress.increment();
    }
    ppProgress.complete();

    logger.success(`Polaroids seeded: ${polaroids.length} items`);
}