import { PrismaClient } from '@prisma/client';
import { logger, ProgressTracker } from './utils/utils';

/**
 * 위젯 데이터 시드
 * - Quotes (멤버 어록)
 * - Playlist (미니 플레이어)
 * - Wishes (방명록 샘플)
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
        { name: '시온', content: "남자병? ㅋㅋㅋㅋ 저희 남자병 오면 큰일나요 ㅋㅋㅋ 저희 남자병 오면 위시 못해요 ㅎㅎ" },
        { name: '시온', content: "들었지 얼른 죽어 (콘서트 티켓 플미 업자들에게)" },
        { name: '시온', content: "오늘보다 내일 더 발전하는 사람이 되자" },
        { name: '시온', content: "앞으로 오래오래 보자 시즈니이💚" },
        { name: '시온', content: "형은 집이 목장이야" },
        { name: '시온', content: "저 믿고 따라오세요" },

        { name: '리쿠', content: "후쿠이에서 온 사랑 많은 리쿠입니다!" },
        { name: '리쿠', content: "나의 인생처럼 쫀쪼-니" },
        { name: '리쿠', content: "헉 그거 초코리야?" },
        { name: '리쿠', content: "집 가 그러면" },
        { name: '리쿠', content: "누가 우리 누나한테 엄마라 그랬... 엄마라 그랬어?" },
        { name: '리쿠', content: "믿겨가 안되는데" },
        { name: '리쿠', content: "휴닝카이 친구들도 첨벙첨벙~" },
        { name: '리쿠', content: "시온이 형은... 진짜 내가 생각했던 연습생.\n유우시는... 그냥 일본사람. SM에 있는 일본인." },
        { name: '리쿠', content: "이거 내 꼰뗀츤데..." },

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
        { name: '유우시', content: "나 사꾸야야!!!" },
        { name: '유우시', content: "나를 믿고 정착하라" },
        { name: '유우시', content: "위츄는 잠깐 휴가로 어디 다니고 있어\n 지금 어디에 있는지 모르겠네\n 누구 집에 간다고 했는데\n 혹시 위츄 시즈니 집에 있어?" },
        { name: '유우시', content: "뜬뜬뜬...♪ 뜬뜬뜬...♪" },

        { name: '재희', content: "을사을사 화이팅" },
        { name: '재희', content: "복지피스-" },
        { name: '재희', content: "그니까" },

        { name: '료', content: "꽤.괜" },
        { name: '료', content: "이런 아저씨 좋아할래?" },
        { name: '료', content: "인간의 더러운 부분이야" },
        { name: '료', content: "또오! 나만 나락 가는 거야" },
        { name: '료', content: "지옥 가야돼" },
        { name: '료', content: "세상 그렇게 잘 되지 않아.\n너가 되고 싶은 대로 되지가 않아 세상이" },
        { name: '료', content: "인생은 3점" },

        { name: '사쿠야', content: "최고의 빵이 되고 싶어" },
        { name: '사쿠야', content: "오빠만 믿어" },
        { name: '사쿠야', content: "듀 듀듀듀 바바바" },
        { name: '사쿠야', content: "쨔가워요 쨔가워요" },
        { name: '사쿠야', content: "風を置き去りにしてやるせ！(바람보다 빠르게 달려보겠어!)" },
        { name: '사쿠야', content: "My friend is Ryo" },
        { name: '사쿠야', content: "노터치" },
        { name: '사쿠야', content: "꿈에는 좋은 것이나 나쁜 것이랄 게 없어요" },
        { name: '사쿠야', content: "눈물은... 예쁜 것입니다" },
        { name: '사쿠야', content: "난 빵밖에 안 믿으니까 빵만 볼래" },
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
    // [3] TODO: Wish Jar (방명록) API 생성 후 push 요청 시마다 db 업데이트 필요
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
}