// prisma/seeds/03-albums.ts
import { PrismaClient, Album, Market, Currency, EditionType, Member, Prisma } from '@prisma/client'
import { logger, ProgressTracker } from './utils'

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
      distributor: 'Avex Entertainment',
      description: 'NCT NEW TEAM(후에 NCT WISH로 명명)의 프리데뷔 디지털 싱글. 2023년 서바이벌 프로그램 "LASTART"를 통해 선발된 멤버들이 일본에서 먼저 공개한 곡으로, 경쾌하고 에너제틱한 사운드가 특징이다.',

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
      distributor: 'Kakao Entertainment',
      description: 'NCT WISH의 공식 데뷔 싱글 앨범. 2024년 2월 21일 SMTOWN LIVE 2024에서 무대를 먼저 선보인 후, 28일 음원이 공개되었다. 밝고 희망찬 에너지를 담은 타이틀곡 WISH로 데뷔 20일 만에 음악방송 1위를 달성하며 화려하게 K-POP 씬에 입성했다. 보아가 프로듀싱을 맡았으며, 큐피드 콘셉트가 돋보이는 앨범이다.',

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
          description: '한국/글로벌 WICHU 발매 버전.',
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

      label: 'Avex Trax',
      distributor: 'Avex Entertainment',
      description: '청량하고 시원한 여름 분위기의 2nd 싱글. 일본 시장을 겨냥한 곡으로, 신나는 비트와 상쾌한 멜로디가 돋보인다. 데뷔 앨범에 이어 53만 장의 초동 판매량을 기록하며 2024년 데뷔 아티스트 중 최고 기록을 달성했다.',

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
      description: 'NCT WISH의 첫 미니앨범. "꾸준함(Steady)"이라는 메시지를 담아 다양한 장르를 소화하며 음악적 스펙트럼을 확장했다. 선공개 곡 "Dunk Shot"부터 타이틀 "Steady", 그리고 "3분까진 필요없어", "Supercute" 등 개성 있는 수록곡들로 구성되어 있다. 선주문 80만 장을 돌파하며 화제를 모았고, 뮤직뱅크에서 데뷔 후 첫 지상파 1위를 차지했다.',

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
      description: 'NCT WISH의 일본 첫 정규 앨범. 크리스마스 시즌에 맞춰 발매된 앨범으로, 팝 발라드 타이틀곡 "Wishful Winter"를 포함해 신곡 6곡과 기존 곡들의 일본어 버전으로 구성되어 NCT WISH의 모든 매력을 집대성했다. 음원은 11월 27일 공개, 피지컬은 12월 25일 발매되었다.',

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
          description: '일본 발매 크리스마스 기프트 박스 버전. DVD 포함.',
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
          description: '일본 ALL Member 버전.',
          components: { items: ['Lyric Book', 'CD-R', 'Photocard (Random 1 out of 6)'] },
          sku: 'SMK1807'
        },
        {
          name: 'Member Solo Ver.',
          coverImageUrl: '/images/albums/05_wishful/wishful_solo_kr.png',
          description: '일본 멤버 솔로별 버전.',
          components: { items: ['Lyric Book', 'CD-R', 'Photocard (Solo Ver.)'] },
          sku: 'SMK1808 ~ SMK1813'
        }
      ]
    },

    // ==================== 5. poppop (2nd Mini Album) ====================
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
      description: '톡톡 터지는 청량감과 경쾌한 사운드로 가득한 2nd 미니앨범. "Melt Inside My Pocket"을 NCT WISH ASIA TOUR LOG in SEOUL에서 선공개하여 화제를 모았다. 앨범 발매 후 133만 장 이상 판매고를 기록하며 데뷔 후 첫 밀리언셀러에 등극했고, 애플뮤직 Top 100 1위, 엠카운트다운/뮤직뱅크/음악중심에서 1위를 차지했다.',

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
          name: 'Jewel Case Individual Ver.',
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

    // ==================== 6. COLOR (3rd Mini Album) ====================
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
      description: '다채로운 색깔과 개성을 담은 3rd 미니앨범. 선공개곡 "Surf", 뮤직비디오 선공개곡 "Baby Blue", 타이틀곡 "COLOR"까지 총 3편의 뮤직비디오가 공개되었다. 비디오 게임을 테마로 한 수록곡 "Cheat Code"는 리그 오브 레전드 레퍼런스("Ninjas hide on bush")로 화제가 되었다. COEX 광장에서 공연형 쇼케이스 WISH ON STAGE를 개최하며 팬들과 만났다.',

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
          name: 'Jewel Case Ver.',
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
    'poppop': 'POPPOP',
    'COLOR': 'COLOR',
  };

  const eraName = eraMap[album.title] || album.title;

  const era = await prisma.era.findFirst({
    where: {
      groupId: groupId,
      name: { equals: eraName, mode: 'insensitive' },
    },
  })

  if (era) {
    if (!era.mainAlbumId) {
      await prisma.era.update({
        where: { id: era.id },
        data: { mainAlbumId: album.id },
      })
      logger.debug(`Linked album "${album.title}" to era "${era.name}"`)
    }
  }
}