// prisma/seeds/03-albums.ts
import { PrismaClient, Album, Market, Currency, EditionType, Member, Prisma } from '@prisma/client'
import { logger, ProgressTracker } from './utils/utils'

/**
 * 앨범 시드
 */
// TODO: 이미지 경로 변경 필요 (이미지 교체 예정)
export async function seedAlbums(prisma: PrismaClient, groupId: string): Promise<Album[]> {
  const members = await prisma.member.findMany({
    where: { groupId },
    orderBy: { birthDate: 'asc' },  // 생일 순 정렬
  });

  if (members.length === 0) {
    throw new Error('No members found for the specified groupId');
  }

  // 솔로 에디션/앨범 생성 헬퍼 함수
  const createSoloEditions = (
    name: string,
    albumSlug: string,
    baseSku: string,
    price: number,
    currency: Currency,
    defaultComponents: string[],
  ) => {
    const skuParts = baseSku.split('-');
    const skuPrefix = skuParts[0];
    const startNumber = parseInt(skuParts[1]);

    return members.map((member, index) => ({
      name: `${member.nameEn}`,
      editionType: 'CD' as EditionType,
      coverImageUrl: `/content/albums/${albumSlug}/editions/${albumSlug}_solo_${member.nameEn?.toLowerCase()}.png`,
      packageImageUrl: `/content/albums/${albumSlug}/editions/${albumSlug}_solo_${member.nameEn?.toLowerCase()}_pack.png`,
      description: `${member.stageName} 버전.`,
      components: defaultComponents,
      releasePrice: price,
      currency: currency,
      sku: `${skuPrefix}-${startNumber + index}`,
      memberId: member.id,
    }));
  };

  const albums = [
    // ==================== 0. Hands Up (프리데뷔) ====================
    {
      title: 'Hands Up',
      slug: 'hands-up',
      releaseDate: new Date('2023-10-08'),
      type: 'SINGLE_ALBUM' as const,
      market: 'JAPAN' as const,
      primaryLanguage: 'JAPANESE' as const,
      isPreDebut: true,
      isOst: false,

      totalLengthSec: 6 * 60 + 15,
      trackCount: 2,
      coverImageUrl: '/content/albums/00_handsup/HandsUp_cover.jpg',
      iconUrl: '/public/content/albums/00_handsup/HandsUp_icon.png',

      label: 'Avex Trax',
      distributor: 'Avex Entertainment, Kakao Entertainment',
      description: "2023년 10월 8일에 발매된 NCT WISH(당시 NCT NEW TEAM)의 프리 데뷔 싱글 앨범. 타이틀 곡 'Hands Up'과 수록곡 'We Go!' 2곡이 수록되어 있으며, 꿈을 향한 멤버들의 열정과 포부를 만끽할 수 있다. 희망찬 에너지와 파워풀한 퍼포먼스가 돋보이는 앨범이다.",

      mvUrl: 'https://youtu.be/ZVcy7bQkBhA',
      themeColor: '#C6B2FF',
      themeTextColor: '#2D1B4E',
      groupId,

      releases: [
        { market: 'GLOBAL' as Market, date: new Date('2023-10-08'), format: 'DIGITAL' as const },
        { market: 'JAPAN' as Market, date: new Date('2023-10-08'), format: 'DIGITAL' as const },
        { market: 'JAPAN' as Market, date: new Date('2023-12-20'), format: 'PHYSICAL' as const },
      ],
      editions: [
        {
          name: 'Pre-Debut Single (Limited Edition A Ver.)',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/00_handsup/editions/lim_a.png',
          packageImageUrl: '/content/albums/00_handsup/editions/lim_a_pack.png',
          isLimited: true,
          description: '프리 데뷔 싱글 일본 발매 한정반 A 버전.',
          components: { items: ['Poster Jacket(Type A)', 'CD-R', 'Sticker Set', 'Trading Card(Type A) (Random 1 out of 6)'] },
          releasePrice: 2500,
          currency: 'JPY' as Currency,
        },
        {
          name: 'Pre-Debut Single (Limited Edition B Ver.)',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/hands-up/editions/lim_b.png',
          packageImageUrl: '/content/albums/hands-up/editions/lim_b_pack.png',
          isLimited: true,
          description: '프리 데뷔 싱글 일본 발매 한정반 B 버전.',
          components: { items: ['Poster Jacket(Type B)', 'CD-R', 'Sticker Set', 'Trading Card(Type B) (Random 1 out of 6)'] },
          releasePrice: 2500,
          currency: 'JPY' as Currency,
        }
      ]
    },

    // ==================== 1. WISH (데뷔 싱글) ====================
    {
      title: 'WISH',
      slug: 'wish',
      releaseDate: new Date('2024-02-28'),
      type: 'SINGLE_ALBUM' as const,
      market: 'GLOBAL' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isOst: false,

      totalLengthSec: 13 * 60 + 4,
      trackCount: 4,
      coverImageUrl: '/content/albums/01_wish/Wish_cover.jpg',
      iconUrl: '/content/albums/01_wish/icon.png',

      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment, Avex Entertainment',
      description: '2024년 2월 28일에 발매된 NCT WISH의 데뷔 싱글. 타이틀 곡 "WISH"와 수록곡 "Sail Away"가 담겨 있다. 2월 21일 도쿄돔에서 열린 SMTOWN LIVE 2024에서 데뷔 무대를 가졌으며, 한국과 일본 동시 공략을 목표로 한다. "청량 & 네오"라는 독자적인 색깔을 보여주며 데뷔 8일 만에 음악방송 1위를 달성했다.',

      mvUrl: 'https://youtu.be/hvQZs3k6Ytk',
      themeColor: '#BFFF00',
      themeTextColor: '#000000',
      groupId,

      releases: [
        { market: 'GLOBAL' as Market, date: new Date('2024-02-28'), format: 'DIGITAL' as const },
        { market: 'KOREA' as Market, date: new Date('2024-02-28'), format: 'DIGITAL' as const },
        { market: 'JAPAN' as Market, date: new Date('2024-02-28'), format: 'DIGITAL' as const },
        { market: 'JAPAN' as Market, date: new Date('2024-02-28'), format: 'PHYSICAL' as const },
        { market: 'KOREA' as Market, date: new Date('2024-03-04'), format: 'PHYSICAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2024-03-04'), format: 'PHYSICAL' as const },
      ],
      // TODO: 멤버 SOLO 버전 데이터 관리 스키마 연결 필요
      editions: [
        {
          name: 'Photobook Ver.',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/wish/editions/photobook_kr_a.png',
          packageImageUrl: '/content/albums/wish/editions/photobook_kr_a_pack.png',
          description: '한국/글로벌 포토북 발매 버전.',
          components: { items: ['Photobook (88p)', 'CD-R', 'Polaroid (Random 1 out of 6)', 'Photo Card (Random 1 out of 6)', 'Post Card', 'Folded Poster (Random 1 out of 2)'] },
          releasePrice: 14800,
          currency: 'KRW' as Currency,
        },
        {
          name: 'WICHU Ver.',
          editionType: 'SMART_ALBUM' as EditionType,
          coverImageUrl: '/content/albums/wish/editions/wichu_kr_a.png',
          packageImageUrl: '/content/albums/wish/editions/wichu_kr_a_pack.png',
          isLimited: true,
          description: '한국/글로벌 WICHU 키링 버전 (스마트 앨범).',
          components: { items: ['Package Box', 'WICHU Keyring', 'NFC CD', 'Photocard (Random 1 out of 6)', 'WICHU Guide (Random 1 out of 6)', 'Polaroid (Random 1 out of 2)', 'Sticker Set (3EA)'] },
          releasePrice: 29700,
          currency: 'KRW' as Currency,
        },
        {
          name: 'All Member Ver.',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/wish/editions/all_member_jp.png',
          packageImageUrl: '/content/albums/wish/editions/all_member_jp_pack.png',
          description: 'WISH 싱글 앨범 통상반.',
          components: { items: ['CD-R', 'Trading Card (A Ver.) (Random 1 out of 6)'] },
          releasePrice: 1500,
          currency: 'JPY' as Currency,
          sku: 'AVCK-43330'
        },
        /*{
          name: 'Member Solo Ver.',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/wish/editions/wish_solo_jp.png',
          packageImageUrl: '/content/albums/wish/editions/wish_solo_jp_pack.png',
          description: '일본 멤버별 버전.',
          components: { items: ['CD-R', 'Trading Card (B Ver.) (Random 1 out of 6)'] },
          releasePrice: 1500,
          currency: 'JPY' as Currency,
          sku: 'AVCK-43324 ~ AVCK-43329'
        },*/
        ...createSoloEditions('Member Solo Ver.', 'wish', 'AVCK-43324', 1500, 'JPY', ['CD-R', 'Trading Card (B Ver.) (Random 1 out of 6)']),
      ]
    },

    // ==================== 2. Songbird (2nd 싱글) ====================
    {
      title: 'Songbird',
      slug: 'songbird',
      releaseDate: new Date('2024-06-25'),
      type: 'SINGLE_ALBUM' as const,
      market: 'GLOBAL' as const,
      primaryLanguage: 'JAPANESE' as const,
      isPreDebut: false,
      isOst: false,

      totalLengthSec: 6 * 60 + 8,
      trackCount: 2,
      coverImageUrl: '/content/albums/02_songbird/Songbird_cover_kr.jpg',
      iconUrl: '/content/albums/02_songbird/Songbird_icon_kr.png',

      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment, Avex Entertainment',
      description: "2024년 6월 25일(일본), 7월 1일(한국) 발매된 NCT WISH의 싱글 2집. 타이틀 곡 'Songbird'는 행운을 가져다주는 새를 모티브로 하여, 기적을 이루기 위해 함께 날아오르자는 메시지를 담았다. 시원한 기타 리프가 돋보이는 팝 댄스 곡으로, '2024년 최고의 신인'다운 청량한 에너지를 선사한다. 초동 53만 장을 돌파하며 하프 밀리언셀러를 달성했다.",

      mvUrl: 'https://youtu.be/2XqVNFBtVo4',
      themeColor: '#8EE3F5',
      themeTextColor: '#004466',
      groupId,

      releases: [
        { market: 'JAPAN' as Market, date: new Date('2024-06-25'), format: 'DIGITAL' as const },
        { market: 'JAPAN' as Market, date: new Date('2024-06-26'), format: 'PHYSICAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2024-07-01'), format: 'DIGITAL' as const },
        { market: 'KOREA' as Market, date: new Date('2024-07-01'), format: 'DIGITAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2024-07-01'), format: 'PHYSICAL' as const },
        { market: 'KOREA' as Market, date: new Date('2024-07-01'), format: 'PHYSICAL' as const },
      ],
      editions: [
        {
          name: 'All Member Ver.',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/02_songbird/songbird_all_member.png',
          packageImageUrl: '/content/albums/02_songbird/songbird_all_member_pack.png',
          description: '일본 ALL Member 버전.',
          components: { items: ['Trading Card (Random 1 out of 24)'] },
          releasePrice: 1500,
          currency: 'JPY' as Currency,
          sku: 'AVCK-43380'
        },
        /**{
          name: 'Member Solo Ver.',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/songbird/songbird_all_member.png',
          packageImageUrl: '/content/albums/songbird/songbird_all_member_pack.png',
          description: '일본 멤버별 버전.',
          components: { items: ['Trading Card (Random 1 out of 24)'] },
          releasePrice: 1500,
          currency: 'JPY' as Currency,
          sku: 'AVCK-43374 ~ AVCK-43379'
        },**/
        ...createSoloEditions('Member Solo Ver.', 'songbird', 'AVCK-43374', 1500, 'JPY', ['Trading Card (Random 1 out of 24)']),
        {
          name: 'Letter Ver.',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/02_songbird/songbird_cover_letter.png',
          packageImageUrl: '/content/albums/02_songbird/songbird_letter_pack.png',
          description: '한국/글로벌 편지봉투 컨셉 버전.',
          components: { items: ['Photobook (24p)', 'Mini CD-R', 'Sticker Photo', 'Postcard (Random 1 out of 6)', 'DIY Letter Set', 'Envelope', 'Photo Card (Random 1 out of 6)'] },
          releasePrice: 14100,
          currency: 'KRW' as Currency,
        },
        {
          name: 'SMini Ver.',
          editionType: 'MUSIC_NFC_CD' as EditionType,
          coverImageUrl: '/content/albums/02_songbird/songbird_smini.png',
          packageImageUrl: '/content/albums/02_songbird/songbird_smini_pack.png',
          description: '한국/글로벌 스마트 앨범 (SMini).',
          components: { items: ['Package (6 Versions)', 'SMini Case', 'Music NFC CD', 'Photo Card (Random 1 out of 6)'] },
          releasePrice: 12600,
          currency: 'KRW' as Currency,
        }
      ]
    },

    // ==================== 3. Steady (1st Mini Album) ====================
    {
      title: 'Steady',
      slug: 'steady',
      releaseDate: new Date('2024-09-24'),
      type: 'MINI_ALBUM' as const,
      market: 'KOREA' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isOst: false,

      totalLengthSec: 21 * 60 + 18,
      trackCount: 7,
      coverImageUrl: '/content/albums/04_steady/Steady_cover.jpg',
      iconUrl: '/content/albums/04_steady/Steady_icon.png',

      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment',
      description: '2024년 9월 24일 발매된 NCT WISH의 첫 번째 미니 앨범. 타이틀 곡 "Steady"를 포함해 총 7곡이 수록되었다. 데뷔부터 이어온 "기적"의 서사를 마무리하며, 우리의 기적 같은 순간을 영원히 이어가겠다는 진심("Let\'s go steady")을 담았다. 선주문 80만 장, 초동 79만 장을 기록하며 자체 최고 기록을 경신했고, 지상파 음악방송 첫 1위(뮤직뱅크)를 안겨준 기념비적인 앨범이다.',

      mvUrl: 'https://youtu.be/IKlkZZv76Ho',
      themeColor: '#FFB6D9',
      themeTextColor: '#660033',
      groupId,

      releases: [
        { market: 'KOREA' as Market, date: new Date('2024-09-24'), format: 'DIGITAL' as const },
        { market: 'KOREA' as Market, date: new Date('2024-09-24'), format: 'PHYSICAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2024-09-24'), format: 'DIGITAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2024-09-24'), format: 'PHYSICAL' as const },
      ],
      editions: [
        {
          name: 'Photobook Ver. (I ❤️ WISH Ver.)',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/steady/steady_cover_kr_a.png',
          packageImageUrl: '/content/albums/steady/steady_cover_kr_a_pack.png',
          description: '한국/글로벌 발매 포토북 버전 (I ❤️ WISH Ver.).',
          components: { items: ['Package Box', 'Photobook (96p)', 'CD-R', 'Postcard (Random 1 out of 6)', 'Folded Poster (Random 1 out of 2)', 'Sticker', 'Photo Card (Random 1 out of 6)'] },
          releasePrice: 17800,
          currency: 'KRW' as Currency,
        },
        {
          name: 'Photobook Ver. (Finding Psyche Ver.)',
          editionType: 'CD' as EditionType,
          coverImageUrl: '/content/albums/steady/steady_cover_kr_b.png',
          packageImageUrl: '/content/albums/steady/steady_cover_kr_b_pack.png',
          description: '한국/글로벌 발매 포토북 버전 (Finding Psyche Ver.).',
          components: { items: ['Package Box', 'Photobook (96p)', 'CD-R', 'Paper Figure (Random 1 out of 6)', 'Folded Poster (Random 1 out of 2)', 'Sticker', 'Photo Card (Random 1 out of 6)'] },
          releasePrice: 17800,
          currency: 'KRW' as Currency,
        },
        {
          name: 'QR Ver.',
          editionType: 'QR_CARD' as EditionType,
          coverImageUrl: '/content/albums/steady/steady_qr_ver.png',
          packageImageUrl: '/content/albums/steady/steady_qr_ver_pack.png',
          description: '한국/글로벌 발매 QR 코드 버전.',
          components: { items: ['Package Box', 'Image Card (6EA Set), Photo Card (Random 1 out of 6)', 'Flip Book (120p)', 'QR Card'] },
          releasePrice: 14100,
          currency: 'KRW' as Currency,
        },
        {
          name: 'Keyring Ver.',
          editionType: 'QR_CARD' as EditionType,
          coverImageUrl: '/content/albums/steady/steady_wichu_ver.png',
          packageImageUrl: '/content/albums/steady/steady_wichu_ver_pack.png',
          description: '한국/글로벌 발매 WICHU&apos;s Memory 버전.',
          components: { items: ['WICHU Camera', 'Photo Film (12 Pics) (Random 1 out of 2)', 'Photo Card (Random 1 out of 6)', 'Music NFC CD (Random 1 out of 6)'] },
          releasePrice: 37100,
          currency: 'KRW' as Currency,
        }
      ]
    },

    // ==================== 4. WISHFUL (일본 정규 1집) ====================
    {
      title: 'WISHFUL',
      slug: 'wishful',
      releaseDate: new Date('2024-11-27'),
      type: 'STUDIO_ALBUM' as const,
      market: 'JAPAN' as const,
      primaryLanguage: 'JAPANESE' as const,
      isPreDebut: false,
      isOst: false,

      totalLengthSec: 40 * 60 + 59,
      trackCount: 13,
      coverImageUrl: '/content/albums/05_wishful/Wishful_cover.jpg',
      iconUrl: '/content/albums/05_wishful/Wishful_icon.png',

      label: 'Avex Trax',
      distributor: 'Avex Entertainment',
      description: '2024년 11월 27일(음원), 12월 25일(음반) 발매된 NCT WISH의 일본 첫 정규 앨범. 크리스마스 시즌에 맞춰 발매된 선물 같은 앨범으로, 팝 발라드 타이틀곡 "Wishful Winter"를 포함해 신곡 6곡과 기존 발표곡 7곡 등 총 13곡이 수록되었다. "소원을 이뤄주는 아이들"이라는 그룹의 정체성을 따뜻한 겨울 감성으로 풀어냈다.',

      mvUrl: 'https://youtu.be/NAhEwvI9TGE',
      themeColor: '#FFF89A',
      themeTextColor: '#4A4000',
      groupId,

      releases: [
        { market: 'JAPAN' as Market, date: new Date('2024-11-27'), format: 'DIGITAL' as const },
        { market: 'JAPAN' as Market, date: new Date('2024-12-25'), format: 'PHYSICAL' as const },
      ],
      editions: [
        {
          name: 'Christmas Gift Box Ver.',
          coverImageUrl: '/images/albums/05_wishful/wishful_lim_a.png',
          description: '일본 발매 크리스마스 기프트 박스 버전 (초회생산한정반). DVD 포함.',
          components: { items: ['Booklet (32p)', 'CD-R', 'DVD (Music Video & Making Film)', 'Trading Card (Random 1 out of 6)'] },
          sku: 'AVCK-99622'
        },
        {
          name: 'Standard Ver.',
          coverImageUrl: '/images/albums/05_wishful/wishful_std.png',
          description: '일본 발매 통상반.',
          components: { items: ['Booklet (24p)', 'CD-R', 'Trading Card (Random 1 out of 6)'] },
          sku: 'AVCK-99623'
        },
        {
          name: 'ALL Member Ver.',
          coverImageUrl: '/images/albums/05_wishful/wishful_kr_a.png',
          description: '일본 ALL Member 버전 (미니 레코드 LP 스타일).',
          components: { items: ['Lyric Book', 'CD-R', 'Photocard (Random 1 out of 6)'] },
          sku: 'SMK1807'
        },
        {
          name: 'Member Solo Ver.', /* TODO: 멤버 SOLO 버전 데이터 관리 스키마 연결 필요 */
          coverImageUrl: '/images/albums/05_wishful/wishful_solo_kr.png',
          description: '일본 멤버 솔로별 버전 (스마트 앨범).',
          components: { items: ['Lyric Book', 'CD-R', 'Photocard (Solo Ver.)'] },
          sku: 'SMK1808 ~ SMK1813'
        }
      ]
    },

    // =================== 5. Miracle (Pre-Release Single) ====================
    {
      title: 'Miracle',
      slug: 'miracle',
      releaseDate: new Date('2025-01-22'),
      type: 'DIGITAL_SINGLE' as const,
      market: 'GLOBAL' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isOst: false,

      totalLengthSec: 2 * 60 + 57,
      trackCount: 1,

      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment',
      description: "2025년 1월 22일 발매된 '2025 SMTOWN : THE CULTURE, THE FUTURE' 프로젝트의 선공개 싱글. 2005년 슈퍼주니어의 히트곡 'Miracle'을 리메이크했다. KENZIE가 편곡을 맡아 뉴잭스윙 장르로 재해석했으며, NCT WISH의 청량하고 영(Young)한 에너지가 돋보인다. SM 창립 30주년을 기념하는 의미 있는 곡이다.",
      groupId,

      releases: [
        { market: 'GLOBAL' as Market, date: new Date('2025-01-22'), format: 'DIGITAL' as const }
      ]
    },

    // ==================== 6. poppop (2nd Mini Album) ====================
    {
      title: 'poppop',
      slug: 'poppop',
      releaseDate: new Date('2025-04-14'),
      type: 'MINI_ALBUM' as const,
      market: 'KOREA' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isOst: false,

      totalLengthSec: 17 * 60 + 56,
      trackCount: 6,
      coverImageUrl: '/content/albums/06_poppop/poppop_cover.jpg',
      iconUrl: '/content/albums/06_poppop/poppop_icon.png',
      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment',
      description: '2025년 4월 14일 발매된 NCT WISH의 두 번째 미니 앨범. 타이틀 곡 "poppop"은 사랑이 시작될 때의 두근거림을 "Pop Pop" 터지는 소리에 비유한 경쾌한 댄스 팝 곡이다. KENZIE가 작사에 참여하여 특유의 밝은 감성을 살렸다. "어린 왕자"를 모티브로 한 수록곡 등이 포함되어 있으며, 초동 108만 장을 돌파하며 데뷔 후 첫 밀리언셀러에 등극했다.',

      mvUrl: 'https://youtu.be/LNETckymbzk',
      themeColor: '#0C23BC',
      themeTextColor: '#FFFFFF',
      groupId,

      releases: [
        { market: 'KOREA' as Market, date: new Date('2025-04-14'), format: 'DIGITAL' as const },
        { market: 'KOREA' as Market, date: new Date('2025-04-14'), format: 'PHYSICAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2025-04-14'), format: 'DIGITAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2025-04-14'), format: 'PHYSICAL' as const },
      ],
      editions: [
        {
          name: 'Photobook Ver.',
          coverImageUrl: '/images/albums/06_poppop/poppop_cover_kr_a.png',
          description: '한국/글로벌 발매 포토북 버전.',
          components: { items: ['Photobook (88p)', 'CD-R', 'Poster (Random 1 out of 2)', 'Photocard (Random 1 out of 6)'] },
        },
        {
          name: 'Jewel Case Individual Ver.', /* TODO: 멤버 SOLO 버전 데이터 관리 스키마 연결 필요 */
          coverImageUrl: '/images/albums/06_poppop/poppop_jewelcase.png',
          description: '한국/글로벌 발매 쥬얼 케이스 개인별 버전.',
          components: { items: ['Jewel Case', 'CD-R', 'Photocard (Solo Ver.)'] },
        },
        {
          name: 'Jewel Case Group Ver.',
          coverImageUrl: '/images/albums/06_poppop/poppop_jewelcase_group.png',
          description: '한국/글로벌 발매 쥬얼 케이스 단체 버전.',
          components: { items: ['Jewel Case', 'CD-R', 'Photocard (Group Ver.)'] },
        },
        {
          name: 'WICHU Ver.',
          coverImageUrl: '/images/albums/06_poppop/poppop_wichu.png',
          description: '한국/글로벌 발매 WICHU 버전.',
          components: { items: ['WICHU Keyring', 'Music NFC CD', 'Sticker Set', 'Photocard (Random 1 out of 6)'] },
        }
      ]
    },

    // ==================== 7. COLOR (3rd Mini Album) ====================
    {
      title: 'COLOR',
      slug: 'color',
      releaseDate: new Date('2025-09-01'),
      type: 'MINI_ALBUM' as const,
      market: 'KOREA' as const,
      primaryLanguage: 'KOREAN' as const,
      isPreDebut: false,
      isOst: false,

      totalLengthSec: 21 * 60 + 14,
      trackCount: 7,
      coverImageUrl: '/content/albums/08_color/Color_cover.jpg',
      iconUrl: '/content/albums/08_color/Color_icon.png',

      label: 'SM Entertainment',
      distributor: 'Kakao Entertainment',
      description: '2025년 9월 1일 발매된 NCT WISH의 미니 3집. "다채로운 색으로 세상을 물들인다"는 포부를 담은 앨범으로, 일렉트로닉 팝 장르의 타이틀 곡 "COLOR"를 비롯해 "Surf", "Baby Blue", "Cheat Code" 등 다양한 스타일의 7곡이 수록되었다. 초동 139만 장을 기록하며 자체 최고 기록을 경신했고, 멜론 HOT 100 1위 등 음원 성적에서도 두각을 나타냈다.',

      mvUrl: 'https://youtu.be/28dAfmIAlCo',
      themeColor: '#FDF628',
      themeTextColor: '#000000',
      groupId,

      releases: [
        { market: 'KOREA' as Market, date: new Date('2025-09-01'), format: 'DIGITAL' as const },
        { market: 'KOREA' as Market, date: new Date('2025-09-01'), format: 'PHYSICAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2025-09-01'), format: 'DIGITAL' as const },
        { market: 'GLOBAL' as Market, date: new Date('2025-09-01'), format: 'PHYSICAL' as const },
      ],
      editions: [
        {
          name: 'Photobook Ver.',
          coverImageUrl: '/images/albums/08_color/color_cover_kr_a.png',
          description: '한국/글로벌 발매 포토북 버전.',
          components: { items: ['Photobook (88p)', 'CD-R', 'Poster (Random 1 out of 2)', 'Photocard (Random 1 out of 7)'] },
        },
        {
          name: 'Jewel Case Ver.', /* TODO: 멤버 SOLO 버전 데이터 관리 스키마 연결 필요 */
          coverImageUrl: '/images/albums/08_color/color_jewelcase.png',
          description: '한국/글로벌 발매 쥬얼 케이스 버전.',
          components: { items: ['Jewel Case', 'CD-R', 'Photocard (Random 1 out of 7)'] },
        },
        {
          name: 'Surf Ver.',
          coverImageUrl: '/images/albums/08_color/color_surf.png',
          description: '한국/글로벌 발매 Surf 버전.',
          components: { items: ['Surf Keyring', 'Music NFC CD', 'Sticker Set', 'Photocard (Random 1 out of 7)'] },
        },
      ]
    },

    // ==================== 8. WISHLIST (Japan 1st Mini Single) ====================
    {
      title: 'WISHLIST',
      slug: 'wishlist',
      releaseDate: new Date('2026-01-14'),
      type: 'MINI_ALBUM' as const,
      market: 'JAPAN' as const,
      primaryLanguage: 'JAPANESE' as const,
      isPreDebut: false,
      isOst: false,

      totalLengthSec: 19 * 60 + 58,
      trackCount: 7,
      coverImageUrl: '/content/albums/09_wishlist/Wishlist_cover.jpg',
      iconUrl: '/content/albums/09_wishlist/Wishlist_icon.png',

      label: 'Avex Trax',
      distributor: 'Avex Entertainment',
      description: '2026년 1월 14일 발매된 NCT WISH의 일본 첫 미니 앨범. 타이틀 곡 "Hello Mellow"는 강렬한 드럼 비트와 유니크한 멜로디 라인이 특징인 곡으로, 사랑에 빠진 소년의 설렘을 표현했다. 이 외에도 "ZONE", "BUBBLE GUM", "Dreamcatcher" 등 다채로운 장르의 7곡이 수록되어 NCT WISH의 폭넓은 음악적 스펙트럼을 보여준다.',
      
      mvUrl: 'https://youtu.be/8s23tBtQciU',
      themeColor: '#FFA500',
      themeTextColor: '#000000',
      groupId,

      releases: [
        { market: 'JAPAN' as Market, date: new Date('2026-01-14'), format: 'DIGITAL' as const },
        { market: 'JAPAN' as Market, date: new Date('2026-01-14'), format: 'PHYSICAL' as const },
      ],
      editions: [
        {
          name: 'Standard Ver.',
          coverImageUrl: '/images/albums/09_wishlist/wishlist_std.png',
          description: '일본 발매 통상반.',
          components: { items: ['Booklet (24p)', 'CD-R', 'Trading Card (Random 1 out of 6)'] },
          sku: 'AVCK-99700'
        },
        {
          name: 'Limited Ver.',
          coverImageUrl: '/images/albums/09_wishlist/wishlist_lim.png',
          description: '일본 발매 한정반. DVD 포함.',
          components: { items: ['Booklet (32p)', 'CD-R', 'DVD (Music Video & Making Film)', 'Trading Card (Random 1 out of 6)'] },
          sku: 'AVCK-99701'
        },
        /* TODO: 에디션 추가 */
      ]
    },
  ]

  const createdAlbums: Album[] = []
  const progress = new ProgressTracker('Seeding Albums', albums.length)

  for (const albumData of albums) {
    try {
      const { releases, editions, ...albumInfo } = albumData

      // 앨범 upsert
      const album = await prisma.album.upsert({
        where: {
          slug: albumInfo.slug,
        },
        update: albumInfo,
        create: albumInfo,
      })

      createdAlbums.push(album)
      progress.increment()

      // Era와 연결 (제목 기반 매칭)
      await linkAlbumToEra(prisma, album, groupId)

      // 릴리즈 생성
      await prisma.albumRelease.deleteMany({
        where: { albumId: album.id },
      })
      if (releases && releases.length > 0) {
        for (const rel of releases) {
          await prisma.albumRelease.create({
            data: { ...rel, albumId: album.id, format: rel.format || 'DIGITAL' },
          })
        }
      }

      // 에디션 생성
      if (editions && editions.length > 0) {
        for (const edition of editions) {
          const editionData = {
            ...edition,
            albumId: album.id,
            components: edition.components ? (edition.components as Prisma.InputJsonValue) : Prisma.JsonNull,
          };

          const existingEdition = await prisma.albumEdition.findFirst({
            where: {
              albumId: album.id,
              name: edition.name,
            },
          });

          if (existingEdition) {
            await prisma.albumEdition.update({
              where: { id: existingEdition.id },
              data: editionData,
            });
          } else {
            await prisma.albumEdition.create({
              data: editionData,
            });
          }
        }
      }
    } catch (error) {
      logger.error(`Failed to seed album: ${albumData.title}`)
      throw error
    }
  }

  progress.complete()
  return createdAlbums
}

// 앨범과 Era 연결 함수
async function linkAlbumToEra(
  prisma: PrismaClient,
  album: Album,
  groupId: string
) {
  // Era 제목과 앨범 제목이 일치하는지 확인
  const eraMap: Record<string, string> = {
    'Hands Up': 'PRE-DEBUT',
    'WISH': 'WISH',
    'Songbird': 'SONGBIRD',
    'Steady': 'STEADY',
    'WISHFUL': 'WISHFUL',
    'Miracle': 'MIRACLE',
    'poppop': 'POPPOP',
    'COLOR': 'COLOR',
    'WISHLIST': 'WISHLIST',
  };

  const eraName = eraMap[album.title] || album.title;

  const era = await prisma.era.findFirst({
    where: {
      groupId: groupId,
      name: { equals: eraName, mode: 'insensitive' },
    },
  })

  if (era) {
    // mainAlbumId 업데이트
    if (!era.mainAlbumId) {
      await prisma.era.update({
        where: { id: era.id },
        data: { mainAlbumId: album.id },
      })
      logger.debug(`Linked album "${album.title}" to era "${era.name}"`)
    }

    // eraId 업데이트
    if (album.eraId !== era.id) {
      await prisma.album.update({
        where: { id: album.id },
        data: { eraId: era.id },
      })
      logger.debug(`Updated album "${album.title}" with eraId "${era.id}"`)
    }
  }
}