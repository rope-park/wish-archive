// prisma/seeds/05-events.ts
import type { PrismaClient, Member, Era, Album, EventType } from '@prisma/client'
import { logger, ProgressTracker } from './utils'

/**
 * 이벤트 시드 (타임라인)
 * - 중요 활동 및 기념비적인 일 등 (콘서트/투어, 팬미팅/팬사인회, 쇼케이스, 음반 발매, 페스티벌(외부 행사), 시상식, 팝업 스토어, 기념일(데뷔일, 멤버 생일 등) 등)
 */
export async function seedEvents(
  prisma: PrismaClient,
  members: Member[],
  eras: Era[],
  albums: Album[]
) {
  // Era 매핑
  const eraMap: Record<string, string> = Object.fromEntries(eras.map(e => [e.name, e.id]));

  // Album 매핑
  const albumMap: Record<string, string> = Object.fromEntries(albums.map(a => [a.title, a.id]));

  const events = [
    // ==================== Pre-Debut Era (2023) ====================
    {
      type: 'ANNOUNCEMENT' as EventType,
      date: new Date('2023-09-07'),
      title: 'NCT NEW TEAM 멤버 공개',
      description: 'LASTART 서바이벌을 통해 선발된 NCT NEW TEAM 6명 멤버 공개 (정민 포함 7명이 최종 데뷔 예정이었으나 정민 하차로 6인 확정)',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['Pre-Debut'],
      programName: 'NCT LASTART',
    },
    {
      type: 'RELEASE' as EventType,
      date: new Date('2023-10-08'),
      title: 'Hands Up 프리데뷔 싱글 발매',
      description: 'NCT NEW TEAM의 프리데뷔 디지털 싱글 발매 (일본)',
      location: null,
      country: 'JP',
      city: null,
      eraId: eraMap['Pre-Debut'],
      programName: null
    },
    {
      type: 'TOUR' as EventType,
      date: new Date('2023-10-15'),
      startDate: new Date('2023-10-15'),
      endDate: new Date('2023-11-30'),
      title: '일본 프리데뷔 투어',
      description: '일본 9개 도시 24회 프리데뷔 투어 진행',
      location: '일본 전역',
      country: 'JP',
      city: null,
      eraId: eraMap['Pre-Debut'],
    },

    // ==================== WISH Era (2024.02-06) ====================
    {
      type: 'CONCERT' as EventType,
      date: new Date('2024-02-21'),
      startDate: new Date('2024-02-21'),
      endDate: new Date('2024-02-22'),
      title: 'SMTOWN LIVE 2024: SMCU PALACE @TOKYO',
      description: '도쿄돔에서 개최된 SMTOWN LIVE에서 NCT WISH 데뷔 무대 최초 공개. SM 아티스트 사상 최초의 한일 동시 데뷔',
      location: '도쿄돔',
      country: 'JP',
      city: '도쿄',
      eraId: eraMap['WISH'],
      relatedUrl: 'https://youtu.be/bR8BxxcmxJY',
    },
    {
      type: 'RELEASE' as EventType,
      date: new Date('2024-02-28'),
      title: 'WISH 싱글 앨범 발매',
      description: '데뷔 싱글 앨범 WISH 발매 (한국어/일본어 2개 버전)',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['WISH'],
    },
    {
      type: 'MUSIC_SHOW' as EventType,
      date: new Date('2024-02-29'),
      title: 'WISH 음악방송 데뷔 무대',
      description: 'M COUNTDOWN에서 데뷔 첫 무대 (WISH)',
      location: 'CJ ENM 센터',
      country: 'KR',
      city: '서울',
      eraId: eraMap['WISH'],
      programName: 'M COUNTDOWN',
    },
    {
      type: 'FANMEETING' as EventType,
      date: new Date('2024-05-24'),
      startDate: new Date('2024-05-24'),
      endDate: new Date('2024-06-22'),
      title: 'NCT WISH : SCHOOL of WISH',
      description: '첫 전국 팬미팅 투어. 서울(3회), 부산, 전주, 대구, 청주 등 5개 도시 13회 공연 전 회차 매진',
      location: '전국 5개 도시',
      country: 'KR',
      city: '서울',
      eraId: eraMap['WISH'],
    },

    // ==================== Songbird Era (2024.06-09) ====================
    {
      type: 'RELEASE' as EventType,
      date: new Date('2024-06-25'),
      title: 'Songbird 싱글 발매',
      description: '2nd 싱글 Songbird 발매 (일본). 초동 53만 장으로 2024년 데뷔 아티스트 최고 기록',
      location: null,
      country: 'JP',
      city: null,
      eraId: eraMap['Songbird'],
    },
    {
      type: 'ONLINE_CONTENT' as EventType,
      date: new Date('2024-07-22'),
      startDate: new Date('2024-07-22'),
      endDate: new Date('2024-07-25'),
      title: 'FM NACK5 ALL The Feels 출연',
      description: '일본 라디오 프로그램 출연. 리쿠/유우시/재희, 시온/료/사쿠야 조합으로 4일간 진행',
      location: null,
      country: 'JP',
      city: null,
      eraId: eraMap['Songbird'],
      programName: 'ALL The Feels',
      ProgramType: 'RADIO',
    },


    // ==================== Steady Era (2024.09-11) ====================
    {
      type: 'RELEASE' as EventType,
      date: new Date('2024-09-09'),
      title: 'Dunk Shot 선공개',
      description: 'Steady 앨범 수록곡 Dunk Shot 선공개',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['Steady'],
    },
    {
      type: 'RELEASE' as EventType,
      date: new Date('2024-09-24'),
      title: 'Steady 미니앨범 발매',
      description: '1st Mini Album Steady 발매. 선주문 80만 장 돌파',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['Steady'],
    },
    {
      type: 'MUSIC_SHOW' as EventType,
      date: new Date('2024-09-26'),
      title: 'Steady 컴백 무대',
      description: 'M COUNTDOWN에서 Steady 컴백 첫 무대',
      location: 'CJ ENM 센터',
      country: 'KR',
      city: '서울',
      eraId: eraMap['Steady'],
      programName: 'M COUNTDOWN',
    },
    {
      type: 'MUSIC_SHOW' as EventType,
      date: new Date('2024-10-04'),
      title: 'Music Bank 첫 지상파 1위',
      description: '10월 4일(1004=천사) Music Bank에서 첫 지상파 음악방송 1위 달성',
      location: 'KBS',
      country: 'KR',
      city: '서울',
      eraId: eraMap['Steady'],
      programName: 'Music Bank',
    },
    {
      type: 'ONLINE_CONTENT' as EventType,
      date: new Date('2024-10-03'),
      title: 'CHAT WITH WISH! 레귤러 라디오 시작',
      description: 'NCT WISH 최초 레귤러 라디오 프로그램 시작 (TOKYO FM, JFN 계열 33국)',
      location: null,
      country: 'JP',
      city: null,
      eraId: eraMap['Steady'],
      programName: 'CHAT WITH WISH!',
      ProgramType: 'RADIO',
    },
    {
      type: 'CONCERT' as EventType,
      date: new Date('2024-11-08'),
      startDate: new Date('2024-11-08'),
      endDate: new Date('2024-12-20'),
      title: 'NCT WISH ASIA TOUR LOG in - 일본 구간',
      description: '일본 6개 도시 12회 공연 (이시카와, 교토, 카나가와, 효고, 후쿠오카, 아이치)',
      location: '일본 6개 도시',
      country: 'JP',
      city: null,
      eraId: eraMap['Steady'],
    },

    // ==================== WISHFUL Era (2024.11-2025.04) ====================
    {
      type: 'RELEASE' as EventType,
      date: new Date('2024-11-27'),
      title: 'WISHFUL 정규 앨범 발매',
      description: '일본 첫 정규 앨범 WISHFUL 발매 (음원 11/27, 피지컬 12/25)',
      location: null,
      country: 'JP',
      city: null,
      eraId: eraMap['WISHFUL'],
    },
    {
      type: 'AWARD_SHOW' as EventType,
      date: new Date('2024-12-19'),
      title: '2024 뮤직뱅크 글로벌 페스티벌 in JAPAN',
      description: 'KBS 연말 페스티벌 출연',
      location: '일본',
      country: 'JP',
      city: null,
      eraId: eraMap['WISHFUL'],
      programName: '뮤직뱅크 글로벌 페스티벌',
    },
    {
      type: 'AWARD_SHOW' as EventType,
      date: new Date('2024-12-25'),
      title: '2024 SBS 가요대전',
      description: 'SBS 연말 가요대전 출연',
      location: 'SBS',
      country: 'KR',
      city: '서울',
      eraId: eraMap['WISHFUL'],
      programName: 'SBS 가요대전',
    },
    {
      type: 'AWARD_SHOW' as const,
      date: new Date('2024-12-31'),
      title: '2024 MBC 가요대제전',
      description: 'MBC 연말 가요대제전 출연 (제주항공 사고로 녹화 방송 전환)',
      location: 'MBC',
      country: 'KR',
      city: '서울',
      eraId: eraMap['WISHFUL'],
      programName: 'MBC 가요대제전',
    },

    {
      type: 'AWARD_SHOW' as const,
      date: new Date('2025-01-05'),
      title: '제39회 골든디스크 어워즈',
      description: '골든디스크 어워즈 출연 및 신인상 수상',
      location: '후쿠오카 페이페이 돔',
      country: 'JP',
      city: '후쿠오카',
      eraId: eraMap['WISHFUL'],
    },
    {
      type: 'CONCERT' as EventType,
      date: new Date('2025-03-21'),
      startDate: new Date('2025-03-21'),
      endDate: new Date('2025-03-23'),
      title: 'NCT WISH ASIA TOUR LOG in - SEOUL',
      description: '올림픽핸드볼경기장 3일간 공연',
      location: '올림픽핸드볼경기장',
      country: 'KR',
      city: '서울',
      eraId: eraMap['WISHFUL'],
    },
    {
      type: 'CONCERT' as EventType,
      date: new Date('2025-04-05'),
      startDate: new Date('2025-04-05'),
      endDate: new Date('2025-04-06'),
      title: 'NCT WISH ASIA TOUR LOG in - MACAU',
      description: '마카오 공연 (2회)',
      location: 'Broadway Theatre',
      country: 'MO',
      city: '마카오',
      eraId: eraMap['WISHFUL'],
    },

    {
      type: 'CONCERT' as EventType,
      date: new Date('2025-04-12'),
      title: 'NCT WISH ASIA TOUR LOG in - MANILA',
      description: '마닐라 공연',
      location: 'New Frontier Theater',
      country: 'PH',
      city: '마닐라',
      eraId: eraMap['WISHFUL'],
    },

    // ==================== poppop Era (2025.04-08) ====================
    {
      type: 'RELEASE' as EventType,
      date: new Date('2025-03-21'),
      title: 'Melt Inside My Pocket 선공개',
      description: 'poppop 앨범 수록곡 선공개 (ASIA TOUR LOG in SEOUL에서 최초 공개)',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['poppop'],
    },

    {
      type: 'RELEASE' as EventType,
      date: new Date('2025-04-14'),
      title: 'poppop 미니앨범 발매',
      description: '2nd Mini Album poppop 발매. 초동 133만 장으로 데뷔 후 첫 밀리언셀러 달성',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['poppop'],
    },

    {
      type: 'MUSIC_SHOW' as EventType,
      date: new Date('2025-04-17'),
      title: 'poppop M COUNTDOWN 컴백',
      description: 'M COUNTDOWN에서 poppop 컴백 무대',
      location: 'CJ ENM 센터',
      country: 'KR',
      city: '서울',
      eraId: eraMap['poppop'],
      programName: 'M COUNTDOWN',
    },

    {
      type: 'MUSIC_SHOW' as EventType,
      date: new Date('2025-04-24'),
      title: 'M COUNTDOWN 첫 1위',
      description: 'poppop으로 M COUNTDOWN 첫 1위 달성',
      location: 'CJ ENM 센터',
      country: 'KR',
      city: '서울',
      eraId: eraMap['poppop'],
      programName: 'M COUNTDOWN',
    },

    {
      type: 'MUSIC_SHOW' as EventType,
      date: new Date('2025-04-25'),
      title: 'Music Bank 1위',
      description: 'poppop으로 Music Bank 1위',
      location: 'KBS',
      country: 'KR',
      city: '서울',
      eraId: eraMap['poppop'],
      programName: 'Music Bank',
    },

    {
      type: 'MUSIC_SHOW' as EventType,
      date: new Date('2025-04-26'),
      title: 'Show Music Core 첫 1위',
      description: 'poppop으로 Show Music Core 첫 1위 달성',
      location: 'MBC',
      country: 'KR',
      city: '서울',
      eraId: eraMap['poppop'],
      programName: 'Show Music Core',
    },

    {
      type: 'CONCERT' as EventType,
      date: new Date('2025-05-03'),
      title: 'NCT WISH ASIA TOUR LOG in - HONG KONG',
      description: '홍콩 공연',
      location: '홍콩 아시아월드 엑스포 공연장',
      country: 'HK',
      city: '홍콩',
      eraId: eraMap['poppop'],
    },

    {
      type: 'CONCERT' as EventType,
      date: new Date('2025-05-17'),
      title: 'NCT WISH ASIA TOUR LOG in - SINGAPORE',
      description: '싱가포르 공연',
      location: '싱가포르 아레나 엑스포',
      country: 'SG',
      city: '싱가포르',
      eraId: eraMap['poppop'],
    },

    {
      type: 'CONCERT' as EventType,
      date: new Date('2025-05-24'),
      title: 'NCT WISH ASIA TOUR LOG in - TAIPEI',
      description: '타이페이 공연',
      location: '타이페이 뮤직 센터 공연',
      country: 'TW',
      city: '타이페이',
      eraId: eraMap['poppop'],
    },

    {
      type: 'CONCERT' as EventType,
      date: new Date('2025-05-31'),
      title: 'NCT WISH ASIA TOUR LOG in - JAKARTA',
      description: '자카르타 공연',
      location: '테니스 인도어 시나얀',
      country: 'ID',
      city: '자카르타',
      eraId: eraMap['poppop'],
    },
    
    // ==================== COLOR Era (2025.09-현재) ====================
    {
      type: 'RELEASE' as EventType,
      date: new Date('2025-08-20'),
      title: 'Surf 선공개',
      description: 'COLOR 앨범 수록곡 Surf 선공개 및 뮤직비디오 공개',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['COLOR'],
    },

    {
      type: 'RELEASE' as const,
      date: new Date('2025-08-28'),
      title: 'Baby Blue 뮤직비디오 선공개',
      description: 'Baby Blue 뮤직비디오 선공개',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['COLOR'],
    },

    {
      type: 'RELEASE' as const,
      date: new Date('2025-09-01'),
      title: 'COLOR 미니앨범 발매',
      description: '3rd Mini Album COLOR 발매',
      location: null,
      country: 'KR',
      city: null,
      eraId: eraMap['COLOR'],
    },

    {
      type: 'SHOWCASE' as const,
      date: new Date('2025-09-01'),
      title: 'WISH ON STAGE (COLOR 쇼케이스)',
      description: 'COEX 광장에서 공연형 쇼케이스 개최',
      location: 'COEX 광장',
      country: 'KR',
      city: '서울',
      eraId: eraMap['COLOR'],
    },

    {
      type: 'CONCERT' as const,
      date: new Date('2025-10-31'),
      startDate: new Date('2025-10-31'),
      endDate: new Date('2025-11-02'),
      title: 'INTO THE WISH : Our WISH - 인천',
      description: '첫 단독 콘서트 투어 시작. 인스파이어 아레나 3회 공연',
      location: '인스파이어 아레나',
      country: 'KR',
      city: '인천',
      eraId: eraMap['COLOR'],
    },

    {
      type: 'CONCERT' as EventType,
      date: new Date('2025-11-08'),
      startDate: new Date('2025-11-08'),
      endDate: new Date('2026-04-11'),
      title: 'INTO THE WISH : Our WISH - 월드 투어',
      description: '14개 지역 공연 예정 (일본 7개 도시, 홍콩, 타이베이, 쿠알라룸푸르, 마카오, 방콕, 자카르타)',
      location: '전 세계',
      country: null,
      city: null,
      eraId: eraMap['COLOR'],
    },
  ]

  const createEvents = []
  const progress = new ProgressTracker('Events', events.length)

  for (const eventData of events) {
    try {
      // eraId, programId, seriesId를 era 관계로 변환
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { eraId, programId, seriesId, tags, ProgramType, ...restData } = eventData as Record<string, unknown>
      const prismaData = {
        ...restData,
        ...(eraId ? { era: { connect: { id: eraId as string } } } : {}),
        ...(programId ? { program: { connect: { id: programId as string } } } : {}),
        ...(seriesId ? { series: { connect: { id: seriesId as string } } } : {}),
      }

      const event = await prisma.event.upsert({
        where: {
          id: `${eventData.title}-${eventData.date.toISOString()}-${eventData.title}`,
        },
        update: prismaData as never,
        create: prismaData as never,
      })
      createEvents.push(event)
      progress.increment()
    } catch {
      const existing = await prisma.event.findFirst({
        where: {
          date: eventData.date,
          title: eventData.title,
        },
      })
    
      if (existing) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { eraId, programId, seriesId, tags, ProgramType, ...restData } = eventData as Record<string, unknown>
        const prismaData = {
          ...restData,
          ...(eraId ? { era: { connect: { id: eraId as string } } } : {}),
          ...(programId ? { program: { connect: { id: programId as string } } } : {}),
          ...(seriesId ? { series: { connect: { id: seriesId as string } } } : {}),
        }
        
        await prisma.event.update({
          where: { id: existing.id },
          data: prismaData as never,
        })
        createEvents.push(existing)
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { eraId, programId, seriesId, tags, ProgramType, ...restData } = eventData as Record<string, unknown>
        const prismaData = {
          ...restData,
          ...(eraId ? { era: { connect: { id: eraId as string } } } : {}),
          ...(programId ? { program: { connect: { id: programId as string } } } : {}),
          ...(seriesId ? { series: { connect: { id: seriesId as string } } } : {}),
        }
        
        const newEvent = await prisma.event.create({
          data: prismaData as never,
        })
        createEvents.push(newEvent)
      }

      progress.increment()
      }
  }

  progress.complete()
  logger.success(`Events seeded: ${createEvents.length} events`)
  return createEvents
}