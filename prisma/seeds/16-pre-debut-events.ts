/**
 * Seed: Pre-Debut Events (2023.10 - 2024.02)
 * NCT WISH: The Foundation Era
 */

import { PrismaClient, EventType } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedPreDebutEvents() {
  console.log('🌱 Seeding Pre-Debut Events...');

  const events = [
    // OCTOBER 2023
    {
      date: new Date('2023-10-02'),
      type: EventType.ANNOUNCEMENT,
      title: '멤버 정민 하차 및 6인 체제 확정 발표',
      description: 'SM 엔터테인먼트 공식 입장',
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-04'),
      type: EventType.ANNOUNCEMENT,
      title: 'NCT NEW TEAM 공식 SNS 채널 개설',
      description: 'X, Instagram, YouTube 오픈',
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-07'),
      type: EventType.RELEASE,
      title: 'Hands Up 티저 이미지 공개',
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-08'),
      type: EventType.RELEASE,
      title: '프리 데뷔 싱글 《Hands Up》 디지털 음원 발매',
      description: '수록곡: Hands Up, We Go!',
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-08'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (도쿄)',
      location: 'Zepp Shinjuku',
      country: '일본',
      city: '도쿄',
      startDate: new Date('2023-10-08'),
      endDate: new Date('2023-10-08'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-09'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (나고야)',
      location: 'Zepp Nagoya',
      country: '일본',
      city: '나고야',
      startDate: new Date('2023-10-09'),
      endDate: new Date('2023-10-09'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-11'),
      type: EventType.CONCERT,
      title: 'NCT NATION : To The World in Japan',
      location: '요코하마 닛산 스타디움',
      country: '일본',
      city: '요코하마',
      description: 'NCT 멤버로서 첫 공식 무대',
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-12'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (오사카)',
      location: 'Zepp Osaka Bayside',
      country: '일본',
      city: '오사카',
      startDate: new Date('2023-10-12'),
      endDate: new Date('2023-10-12'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-13'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (후쿠오카)',
      location: 'Zepp Fukuoka',
      country: '일본',
      city: '후쿠오카',
      startDate: new Date('2023-10-13'),
      endDate: new Date('2023-10-13'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-14'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (사이타마)',
      location: 'Zepp Haneda',
      country: '일본',
      city: '사이타마',
      startDate: new Date('2023-10-14'),
      endDate: new Date('2023-10-14'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-10-29'),
      type: EventType.ONLINE_CONTENT,
      title: '日本テレビ『バズリズム02』 Hands Up 무대 공개',
      description: '지상파 첫 방송 무대',
      isPreDebut: true,
    },

    // NOVEMBER 2023
    {
      date: new Date('2023-11-01'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (고베)',
      location: 'Zepp Kobe',
      country: '일본',
      city: '고베',
      startDate: new Date('2023-11-01'),
      endDate: new Date('2023-11-01'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-11-02'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (센다이)',
      location: 'Zepp Sendai',
      country: '일본',
      city: '센다이',
      startDate: new Date('2023-11-02'),
      endDate: new Date('2023-11-02'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-11-03'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (삿포로)',
      location: 'Zepp Sapporo',
      country: '일본',
      city: '삿포로',
      startDate: new Date('2023-11-03'),
      endDate: new Date('2023-11-03'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-11-04'),
      type: EventType.CONCERT,
      title: 'LASTART PRE-DEBUT TOUR (니가타)',
      location: 'Zepp Niigata',
      country: '일본',
      city: '니가타',
      startDate: new Date('2023-11-04'),
      endDate: new Date('2023-11-04'),
      isPreDebut: true,
    },
    {
      date: new Date('2023-11-06'),
      type: EventType.MAGAZINE,
      title: '잡지 《Dance SQUARE》 vol.49 발매',
      description: '표지 모델 및 특집 기사',
      isPreDebut: true,
    },
    {
      date: new Date('2023-11-08'),
      type: EventType.ONLINE_CONTENT,
      title: 'LASTART 시즌 2 예고편 공개',
      isPreDebut: true,
    },
    {
      date: new Date('2023-11-11'),
      type: EventType.ONLINE_CONTENT,
      title: 'YouTube 채널명 "NCT WISH"로 변경',
      isPreDebut: true,
    },
    {
      date: new Date('2023-11-22'),
      type: EventType.RELEASE,
      title: 'Hands Up MV (Korean ver.) 공개',
      description: '한국어 버전 뮤직비디오 공개',
      isPreDebut: true,
    },
    {
      date: new Date('2023-11-24'),
      type: EventType.MAGAZINE,
      title: '잡지 《CanCam》 1월호 발매',
      description: '표지 모델',
      isPreDebut: true,
    },

    // DECEMBER 2023
    {
      date: new Date('2023-12-01'),
      type: EventType.ONLINE_CONTENT,
      title: 'NCT WISH 공식 X 팬카페 프로필 설정',
      isPreDebut: true,
    },
    {
      date: new Date('2023-12-07'),
      type: EventType.ONLINE_CONTENT,
      title: 'NCT WISH의 데뷔까지 D-83 첫 컨텐츠 공개',
      isPreDebut: true,
    },
    {
      date: new Date('2023-12-13'),
      type: EventType.ONLINE_CONTENT,
      title: 'Weverse 채널 오픈',
      isPreDebut: true,
    },
    {
      date: new Date('2023-12-15'),
      type: EventType.MAGAZINE,
      title: '잡지 《Myojo》 2월호 발매',
      description: '표지 모델',
      isPreDebut: true,
    },
    {
      date: new Date('2023-12-18'),
      type: EventType.ONLINE_CONTENT,
      title: 'LASTART 시즌 2 첫 방송',
      description: 'Hulu 독점 공개',
      isPreDebut: true,
    },
    {
      date: new Date('2023-12-20'),
      type: EventType.CONCERT,
      title: '2023 SBS 가요대전',
      location: '인스파이어 아레나',
      country: '한국',
      city: '인천',
      description: '한국 첫 무대',
      isPreDebut: true,
    },
    {
      date: new Date('2023-12-24'),
      type: EventType.RELEASE,
      title: 'PINKFONG x NCT WISH 크리스마스 캐롤 공개',
      description: '지글지글 산타',
      isPreDebut: true,
    },
    {
      date: new Date('2023-12-30'),
      type: EventType.CONCERT,
      title: 'SMTOWN LIVE 2024 in Seoul',
      location: 'KSPO DOME',
      country: '한국',
      city: '서울',
      isPreDebut: true,
    },

    // JANUARY 2024
    {
      date: new Date('2024-01-01'),
      type: EventType.CONCERT,
      title: 'SMTOWN LIVE 2024 in Seoul (Day 2)',
      location: 'KSPO DOME',
      country: '한국',
      city: '서울',
      isPreDebut: true,
    },
    {
      date: new Date('2024-01-01'),
      type: EventType.ONLINE_CONTENT,
      title: 'NCT WISH 2024 신년 인사 영상 공개',
      isPreDebut: true,
    },
    {
      date: new Date('2024-01-05'),
      type: EventType.MAGAZINE,
      title: '잡지 《Popteen》 2월호 발매',
      description: '표지 모델',
      isPreDebut: true,
    },
    {
      date: new Date('2024-01-17'),
      type: EventType.ANNOUNCEMENT,
      title: '팀명 "NCT WISH" 공식 발표',
      description: 'SM 엔터테인먼트 공식 발표',
      isPreDebut: true,
    },
    {
      date: new Date('2024-01-22'),
      type: EventType.ONLINE_CONTENT,
      title: 'LASTART 시즌 2 피날레',
      description: 'Hulu 독점 공개',
      isPreDebut: true,
    },
    {
      date: new Date('2024-01-23'),
      type: EventType.MAGAZINE,
      title: '잡지 《ViVi》 3월호 발매',
      description: '표지 모델',
      isPreDebut: true,
    },
    {
      date: new Date('2024-01-31'),
      type: EventType.RELEASE,
      title: '데뷔 앨범 《WISH》 티저 공개 시작',
      isPreDebut: true,
    },

    // FEBRUARY 2024
    {
      date: new Date('2024-02-07'),
      type: EventType.ONLINE_CONTENT,
      title: 'WISH MV 티저 공개',
      isPreDebut: true,
    },
    {
      date: new Date('2024-02-14'),
      type: EventType.RELEASE,
      title: 'WISH MV 공개',
      description: '일본 데뷔 싱글 선공개',
      isPreDebut: true,
    },
    {
      date: new Date('2024-02-21'),
      type: EventType.CONCERT,
      title: 'SMTOWN LIVE 2024 in Tokyo',
      location: '도쿄 돔',
      country: '일본',
      city: '도쿄',
      description: '도쿄 돔 데뷔 무대',
      isPreDebut: true,
    },
    {
      date: new Date('2024-02-22'),
      type: EventType.CONCERT,
      title: 'SMTOWN LIVE 2024 in Tokyo (Day 2)',
      location: '도쿄 돔',
      country: '일본',
      city: '도쿄',
      isPreDebut: true,
    },
    {
      date: new Date('2024-02-28'),
      type: EventType.RELEASE,
      title: '데뷔 싱글 《WISH》 발매',
      description: '일본 정식 데뷔',
      isPreDebut: true,
    },
    {
      date: new Date('2024-02-28'),
      type: EventType.SHOWCASE,
      title: 'NCT WISH Debut Showcase',
      location: 'Zepp DiverCity',
      country: '일본',
      city: '도쿄',
      description: '데뷔 쇼케이스',
      isPreDebut: true,
    },
  ];

  // Create all events
  for (const event of events) {
    await prisma.event.create({
      data: event,
    });
  }

  const count = events.length;

  console.log(`✅ Pre-Debut Events: ${count} records created`);
  return count;
}
