/**
 * Seed: 2024 Debut Year Events (2024.02 - 2024.12)
 * NCT WISH: Official Debut & First Year Activities
 */

import { PrismaClient, EventType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedDebutYearEvents() {
  console.log('🎊 Seeding 2024 Debut Year Events...');

  const events = [
    // FEBRUARY - Debut Era
    {
      date: new Date('2024-02-21'),
      type: EventType.CONCERT,
      title: 'SMTOWN LIVE 2024 SMCU PALACE @TOKYO (데뷔 무대)',
      location: '도쿄 돔',
      country: '일본',
      city: '도쿄',
      description: '공식 데뷔 무대, 데뷔곡 WISH 최초 공개',
    },
    {
      date: new Date('2024-02-22'),
      type: EventType.CONCERT,
      title: 'SMTOWN LIVE 2024 SMCU PALACE @TOKYO (Day 2)',
      location: '도쿄 돔',
      country: '일본',
      city: '도쿄',
    },
    {
      date: new Date('2024-02-28'),
      type: EventType.RELEASE,
      title: '데뷔 싱글 《WISH》 발매',
      description: '일본 정식 데뷔, 한일 동시 음원 발매',
    },
    {
      date: new Date('2024-02-28'),
      type: EventType.ONLINE_CONTENT,
      title: 'WISH 뮤직비디오 공개 (한/일 버전)',
    },

    // MARCH - WISH Promotions
    {
      date: new Date('2024-03-03'),
      type: EventType.VARIETY_SHOW,
      title: 'TV 도쿄 《Ultrasound》',
      country: '일본',
    },
    {
      date: new Date('2024-03-03'),
      type: EventType.MUSIC_SHOW,
      title: 'SBS 《인기가요》 (한국 음방 데뷔)',
      country: '한국',
    },
    {
      date: new Date('2024-03-04'),
      type: EventType.RELEASE,
      title: '《WISH》 한국 피지컬 앨범 발매',
    },
    {
      date: new Date('2024-03-04'),
      type: EventType.SHOWCASE,
      title: 'NCT WISH\'s WISHLIST (데뷔 쇼케이스)',
      location: '블루스퀘어 마스터카드홀',
      country: '한국',
      city: '서울',
    },
    {
      date: new Date('2024-03-06'),
      type: EventType.VARIETY_SHOW,
      title: 'MBC M 《주간 아이돌》',
      country: '한국',
    },
    {
      date: new Date('2024-03-07'),
      type: EventType.MUSIC_SHOW,
      title: 'Mnet 《엠카운트다운》',
      country: '한국',
    },
    {
      date: new Date('2024-03-08'),
      type: EventType.MUSIC_SHOW,
      title: 'KBS2 《뮤직뱅크》',
      country: '한국',
    },
    {
      date: new Date('2024-03-09'),
      type: EventType.MUSIC_SHOW,
      title: 'MBC 《쇼! 음악중심》',
      country: '한국',
    },
    {
      date: new Date('2024-03-10'),
      type: EventType.MUSIC_SHOW,
      title: 'SBS 《인기가요》',
      country: '한국',
    },
    {
      date: new Date('2024-03-12'),
      type: EventType.MUSIC_SHOW,
      title: 'SBS M 《더 쇼》',
      description: '데뷔 첫 1위 🏆',
      country: '한국',
    },
    {
      date: new Date('2024-03-13'),
      type: EventType.MUSIC_SHOW,
      title: 'MBC M 《쇼! 챔피언》',
      description: '음악 방송 2관왕 🏆',
      country: '한국',
    },
    {
      date: new Date('2024-03-20'),
      type: EventType.CONCERT,
      title: 'Korea Festival 2024 in Fukuoka',
      location: '후쿠오카 시청 앞 광장',
      country: '일본',
      city: '후쿠오카',
    },

    // APRIL
    {
      date: new Date('2024-04-10'),
      type: EventType.AWARD_SHOW,
      title: '제1회 아시아 스타 엔터테이너 어워즈 (ASEA 2024)',
      location: 'K-아레나',
      country: '일본',
      city: '요코하마',
      description: 'The Best New Artist 수상 🏆',
    },
    {
      date: new Date('2024-04-14'),
      type: EventType.CONCERT,
      title: '《The Performance》',
      location: 'K-아레나',
      country: '일본',
      city: '요코하마',
    },
    {
      date: new Date('2024-04-20'),
      type: EventType.POPUP_STORE,
      title: 'SMTOWN FIREWORKS 2024 @ HUIS TEN BOSCH',
      location: '하우스텐보스',
      country: '일본',
      city: '나가사키',
    },

    // MAY - School of WISH Tour
    {
      date: new Date('2024-05-03'),
      type: EventType.CONCERT,
      title: 'Rakuten GirlsAward 2024 S/S',
      location: '국립 요요기 경기장 제1체육관',
      country: '일본',
      city: '도쿄',
    },
    {
      date: new Date('2024-05-11'),
      type: EventType.CONCERT,
      title: 'KCON JAPAN 2024 (Day 1)',
      location: '마쿠하리 멧세',
      country: '일본',
      city: '치바',
    },
    {
      date: new Date('2024-05-12'),
      type: EventType.CONCERT,
      title: 'KCON JAPAN 2024 (Day 2)',
      location: '마쿠하리 멧세',
      country: '일본',
      city: '치바',
    },
    {
      date: new Date('2024-05-18'),
      type: EventType.CONCERT,
      title: 'IKONYX Concert in BANGKOK',
      location: '썬더돔 스타디움',
      country: '태국',
      city: '방콕',
    },
    {
      date: new Date('2024-05-24'),
      type: EventType.FANMEETING,
      title: 'NCT WISH : SCHOOL of WISH - 서울 (Day 1)',
      location: '명화라이브홀',
      country: '한국',
      city: '서울',
      startDate: new Date('2024-05-24'),
      endDate: new Date('2024-05-26'),
    },
    {
      date: new Date('2024-05-25'),
      type: EventType.FANMEETING,
      title: 'NCT WISH : SCHOOL of WISH - 서울 (Day 2)',
      location: '명화라이브홀',
      country: '한국',
      city: '서울',
    },
    {
      date: new Date('2024-05-26'),
      type: EventType.FANMEETING,
      title: 'NCT WISH : SCHOOL of WISH - 서울 (Day 3)',
      location: '명화라이브홀',
      country: '한국',
      city: '서울',
      description: 'Beyond LIVE 생중계',
    },

    // JUNE
    {
      date: new Date('2024-06-01'),
      type: EventType.FANMEETING,
      title: 'NCT WISH : SCHOOL of WISH - 부산',
      location: '드림씨어터',
      country: '한국',
      city: '부산',
    },
    {
      date: new Date('2024-06-08'),
      type: EventType.FANMEETING,
      title: 'NCT WISH : SCHOOL of WISH - 전주',
      location: '전북대학교 삼성문화회관',
      country: '한국',
      city: '전주',
    },
    {
      date: new Date('2024-06-15'),
      type: EventType.FANMEETING,
      title: 'NCT WISH : SCHOOL of WISH - 대구',
      location: '수성아트피아 대극장',
      country: '한국',
      city: '대구',
    },
    {
      date: new Date('2024-06-22'),
      type: EventType.FANMEETING,
      title: 'NCT WISH : SCHOOL of WISH - 청주 (투어 종료)',
      location: 'CJB 미디어센터 에덴아트홀',
      country: '한국',
      city: '청주',
      description: '전국 투어 13회 공연 전석 매진',
    },
    {
      date: new Date('2024-06-26'),
      type: EventType.RELEASE,
      title: '일본 싱글 2집 《Songbird》 발매',
      country: '일본',
    },
    {
      date: new Date('2024-06-29'),
      type: EventType.MUSIC_SHOW,
      title: 'MBC 쇼! 음악중심 in JAPAN',
      location: '베루나 돔',
      country: '일본',
      city: '사이타마',
      description: '시온 스페셜 MC',
    },

    // JULY - Songbird Korea
    {
      date: new Date('2024-07-01'),
      type: EventType.RELEASE,
      title: '싱글 2집 《Songbird》 한국어 버전 발매',
      country: '한국',
      description: '선주문 63만장 돌파',
    },
    {
      date: new Date('2024-07-04'),
      type: EventType.MUSIC_SHOW,
      title: 'Mnet 《엠카운트다운》 (Songbird 컴백)',
      country: '한국',
    },
    {
      date: new Date('2024-07-05'),
      type: EventType.MUSIC_SHOW,
      title: 'KBS2 《뮤직뱅크》',
      country: '한국',
    },
    {
      date: new Date('2024-07-06'),
      type: EventType.MUSIC_SHOW,
      title: 'MBC 《쇼! 음악중심》',
      country: '한국',
      description: '시온 스페셜 MC',
    },
    {
      date: new Date('2024-07-10'),
      type: EventType.MUSIC_SHOW,
      title: 'MBC M 《쇼! 챔피언》',
      country: '한국',
      description: 'Songbird 1위 🏆',
    },
    {
      date: new Date('2024-07-19'),
      type: EventType.AWARD_SHOW,
      title: '2024 TMEA (텐센트 뮤직 엔터테인먼트 어워즈)',
      location: '갤럭시 아레나',
      country: '마카오',
    },
    {
      date: new Date('2024-07-20'),
      type: EventType.FANMEETING,
      title: 'NCTzen WISH-JAPAN FANMEETING 2025 "WISH Festival" (Day 1)',
      location: '토요스 PIT',
      country: '일본',
      city: '도쿄',
    },
    {
      date: new Date('2024-07-21'),
      type: EventType.CONCERT,
      title: '2024 SBS 가요대전 Summer',
      location: '인스파이어 아레나',
      country: '한국',
      city: '인천',
    },

    // AUGUST
    {
      date: new Date('2024-08-01'),
      type: EventType.CONCERT,
      title: 'THE STAR NEXTAGE (Day 1)',
      location: '가든 시어터',
      country: '일본',
      city: '도쿄',
    },
    {
      date: new Date('2024-08-02'),
      type: EventType.CONCERT,
      title: 'THE STAR NEXTAGE (Day 2)',
      location: '가든 시어터',
      country: '일본',
      city: '도쿄',
    },
    {
      date: new Date('2024-08-05'),
      type: EventType.VARIETY_SHOW,
      title: '2024 아이돌스타 선수권대회 (아육대) 녹화',
      location: '고양체육관',
      country: '한국',
    },
    {
      date: new Date('2024-08-22'),
      type: EventType.AWARD_SHOW,
      title: '2024 케이 월드 드림 어워즈 (K-WORLD DREAM AWARDS)',
      location: '잠실실내체육관',
      country: '한국',
      city: '서울',
      description: 'K월드 드림 슈퍼루키상 수상 🏆',
    },

    // SEPTEMBER - Steady Era
    {
      date: new Date('2024-09-01'),
      type: EventType.CONCERT,
      title: 'a-nation 2024',
      location: '아지노모토 스타디움',
      country: '일본',
      city: '도쿄',
    },
    {
      date: new Date('2024-09-06'),
      type: EventType.CONCERT,
      title: '제15회 광주 비엔날레 개막식',
      country: '한국',
      city: '광주',
    },
    {
      date: new Date('2024-09-07'),
      type: EventType.CONCERT,
      title: 'Star Nest Music Festival',
      location: '서구룡 문화지구',
      country: '홍콩',
    },
    {
      date: new Date('2024-09-08'),
      type: EventType.AWARD_SHOW,
      title: '2024 더팩트 뮤직 어워즈 (TMA)',
      location: '교세라 돔 오사카',
      country: '일본',
      city: '오사카',
    },
    {
      date: new Date('2024-09-09'),
      type: EventType.RELEASE,
      title: '선공개 곡 《Dunk Shot》 발매',
      description: 'Steady 선공개 곡',
    },
    {
      date: new Date('2024-09-12'),
      type: EventType.MUSIC_SHOW,
      title: 'Mnet 《엠카운트다운》 (Dunk Shot)',
      country: '한국',
    },
    {
      date: new Date('2024-09-24'),
      type: EventType.RELEASE,
      title: '첫 미니앨범 《Steady》 발매',
      description: '선주문 80만장 돌파',
    },
    {
      date: new Date('2024-09-24'),
      type: EventType.SHOWCASE,
      title: 'NCT WISH Let\'s go Steady (컴백 쇼케이스)',
      location: '블루스퀘어 마스터카드홀',
      country: '한국',
      city: '서울',
    },
    {
      date: new Date('2024-09-26'),
      type: EventType.MUSIC_SHOW,
      title: 'Mnet 《엠카운트다운》 (Steady)',
      country: '한국',
    },

    // OCTOBER
    {
      date: new Date('2024-10-03'),
      type: EventType.CONCERT,
      title: '2024 K-뮤직 시즌 : 굿밤 콘서트',
      location: '해운대 해수욕장',
      country: '한국',
      city: '부산',
    },
    {
      date: new Date('2024-10-04'),
      type: EventType.MUSIC_SHOW,
      title: 'KBS2 《뮤직뱅크》',
      country: '한국',
      description: 'Steady 데뷔 첫 지상파 1위 🏆',
    },
    {
      date: new Date('2024-10-06'),
      type: EventType.CONCERT,
      title: '16th KMF 2024',
      location: '요코하마 아레나',
      country: '일본',
      city: '요코하마',
    },
    {
      date: new Date('2024-10-12'),
      type: EventType.CONCERT,
      title: 'SBS 인기가요 라이브 in 도쿄',
      location: '슈퍼 아레나',
      country: '일본',
      city: '사이타마',
    },
    {
      date: new Date('2024-10-15'),
      type: EventType.RELEASE,
      title: '《Make You Shine》 발매',
      description: '포켓몬스터: 테라스탈 데뷔 OST',
    },
    {
      date: new Date('2024-10-19'),
      type: EventType.CONCERT,
      title: '제30회 드림콘서트',
      location: '고양종합운동장',
      country: '한국',
      city: '고양',
    },

    // NOVEMBER - Asia Tour LOG in
    {
      date: new Date('2024-11-03'),
      type: EventType.TOUR,
      title: '2024 NCT WISH ASIA TOUR LOG in JAPAN - 이시카와 (Day 1)',
      location: '혼다노모리 호쿠덴 홀',
      country: '일본',
      city: '이시카와',
      startDate: new Date('2024-11-03'),
      endDate: new Date('2024-12-13'),
    },
    {
      date: new Date('2024-11-04'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 이시카와 (Day 2)',
      location: '혼다노모리 호쿠덴 홀',
      country: '일본',
      city: '이시카와',
    },
    {
      date: new Date('2024-11-09'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 교토 (Day 1)',
      location: '롬 시어터 교토',
      country: '일본',
      city: '교토',
    },
    {
      date: new Date('2024-11-10'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 교토 (Day 2)',
      location: '롬 시어터 교토',
      country: '일본',
      city: '교토',
    },
    {
      date: new Date('2024-11-17'),
      type: EventType.AWARD_SHOW,
      title: '제1회 코리아 그랜드 뮤직 어워즈 (KGMA)',
      location: '인스파이어 아레나',
      country: '한국',
      city: '인천',
      description: 'IS 라이징 스타상 수상 🏆',
    },
    {
      date: new Date('2024-11-27'),
      type: EventType.RELEASE,
      title: '일본 정규 1집 《WISHFUL》 음원 선공개',
      country: '일본',
    },
    {
      date: new Date('2024-11-27'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 카나가와 (Day 1)',
      location: '파시피코 요코하마 국립대홀',
      country: '일본',
      city: '요코하마',
    },
    {
      date: new Date('2024-11-28'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 카나가와 (Day 2)',
      location: '파시피코 요코하마 국립대홀',
      country: '일본',
      city: '요코하마',
    },
    {
      date: new Date('2024-11-30'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 효고 (Day 1)',
      location: '아마신 아르카이크 홀',
      country: '일본',
      city: '효고',
    },

    // DECEMBER
    {
      date: new Date('2024-12-01'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 효고 (Day 2)',
      location: '아마신 아르카이크 홀',
      country: '일본',
      city: '효고',
    },
    {
      date: new Date('2024-12-06'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 후쿠오카 (Day 1)',
      location: '후쿠오카 선팔레스 호텔&홀',
      country: '일본',
      city: '후쿠오카',
    },
    {
      date: new Date('2024-12-07'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 후쿠오카 (Day 2)',
      location: '후쿠오카 선팔레스 호텔&홀',
      country: '일본',
      city: '후쿠오카',
    },
    {
      date: new Date('2024-12-12'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 아이치 (Day 1)',
      location: '니테라 홀',
      country: '일본',
      city: '아이치',
    },
    {
      date: new Date('2024-12-13'),
      type: EventType.TOUR,
      title: 'LOG in JAPAN - 아이치 (Day 2, 투어 종료)',
      location: '니테라 홀',
      country: '일본',
      city: '아이치',
      description: '일본 6개 도시 12회 공연 전석 매진',
    },
    {
      date: new Date('2024-12-15'),
      type: EventType.CONCERT,
      title: '2024 뮤직뱅크 글로벌 페스티벌 in JAPAN',
      location: '미즈호 PayPay 돔',
      country: '일본',
      city: '후쿠오카',
    },
    {
      date: new Date('2024-12-25'),
      type: EventType.RELEASE,
      title: '일본 정규 1집 《WISHFUL》 피지컬 앨범 발매',
      country: '일본',
    },
    {
      date: new Date('2024-12-25'),
      type: EventType.CONCERT,
      title: '2024 SBS 가요대전: Merry Music',
      location: '인스파이어 아레나',
      country: '한국',
      city: '인천',
    },
    {
      date: new Date('2024-12-27'),
      type: EventType.AWARD_SHOW,
      title: '제9회 아시아 아티스트 어워즈 (AAA 2024)',
      location: '임팩트 아레나',
      country: '태국',
      city: '방콕',
      description: 'AAA 포텐셜상 수상 🏆',
    },
    {
      date: new Date('2024-12-31'),
      type: EventType.CONCERT,
      title: '2024 MBC 가요대제전',
      country: '한국',
    },
  ];

  // Create all events with isPreDebut: false
  for (const event of events) {
    await prisma.event.create({
      data: {
        ...event,
        isPreDebut: false,
      } as any,
    });
  }

  const count = await prisma.event.count();

  console.log(`✅ 2024 Debut Year Events: ${count} records created`);
  return count;
}
