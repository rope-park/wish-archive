// prisma/seeds/06-programs.ts
import type { PrismaClient } from '@prisma/client'
import { logger, ProgressTracker } from './utils'

/**
 * 방송 프로그램 시드
 */
// TODO: 방송 프로그램 이미지 경로 수정
export async function seedPrograms(prisma: PrismaClient) {
  const programs = [
    // ==================== 음악방송 ====================
{
      name: 'M COUNTDOWN',
      network: 'Mnet',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      dayOfWeek: '목요일',
      airTime: '18:00',
      logoUrl: '/logos/programs/mcountdown.png',
      officialUrl: 'https://www.mnetplus.world/ko',
      notes: '매주 목요일 저녁 6시 Mnet 생방송',
    },
    {
      name: 'Music Bank',
      network: 'KBS2',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      dayOfWeek: '금요일',
      airTime: '17:10',
      logoUrl: '/logos/programs/musicbank.png',
      officialUrl: 'https://program.kbs.co.kr/2tv/enter/musicbank/pc/index.html',
      notes: 'KBS 대표 음악 프로그램',
    },
    {
      name: 'Show! Music Core',
      network: 'MBC',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      dayOfWeek: '토요일',
      airTime: '15:05',
      logoUrl: '/logos/programs/musiccore.png',
      officialUrl: 'https://www.imbc.com/broad/tv/ent/musiccore',
      notes: 'MBC 음악 프로그램',
    },
        {
      name: 'SBS 인기가요',
      network: 'SBS',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      dayOfWeek: '일요일',
      airTime: '15:40',
      logoUrl: '/logos/programs/inkigayo.png',
      officialUrl: 'https://programs.sbs.co.kr/enter/gayo',
      notes: 'SBS 대표 음악 프로그램',
    },
        {
      name: 'The Show',
      network: 'SBS MTV / SBS F!L',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      dayOfWeek: '화요일',
      airTime: '18:00',
      logoUrl: '/logos/programs/theshow.png',
      notes: 'NCT WISH 첫 1위 프로그램',
    },
        {
      name: 'Show Champion',
      network: 'MBC M',
      country: 'KR',
      pType: 'MUSIC_SHOW' as const,
      dayOfWeek: '수요일',
      airTime: '18:00',
      logoUrl: '/logos/programs/showchampion.png',
      notes: 'MBC 뮤직 음악 프로그램',
    },

    // ==================== 라디오 ====================
        {
      name: 'CHAT WITH WISH!',
      network: 'TOKYO FM',
      country: 'JP',
      pType: 'RADIO' as const,
      dayOfWeek: '목요일',
      airTime: '26:00',
      logoUrl: '/logos/programs/chatwithwish.png',
      officialUrl: 'https://www.tfm.co.jp',
      notes: 'NCT WISH 최초 레귤러 라디오 (JFN 계열 33국 넷)',
    },
    {
      name: 'ALL The Feels',
      network: 'FM NACK5',
      country: 'JP',
      pType: 'RADIO' as const,
      dayOfWeek: '월-목',
      airTime: '23:00',
      notes: '주간 플레이리스트 프로그램',
    },
    {
      name: '두시탈출 컬투쇼',
      network: 'SBS 파워FM',
      country: 'KR',
      pType: 'RADIO' as const,
      dayOfWeek: '월-금',
      airTime: '14:00',
      logoUrl: '/logos/programs/cultwo.png',
      notes: 'SBS 대표 라디오 프로그램',
    },
    {
      name: '키스 더 라디오',
      network: 'KBS COOL FM',
      country: 'KR',
      pType: 'RADIO' as const,
      dayOfWeek: '월-금',
      airTime: '22:00',
      notes: 'KBS 심야 라디오',
    },
    {
      name: '별이 빛나는 밤에',
      network: 'MBC FM4U',
      country: 'KR',
      pType: 'RADIO' as const,
      dayOfWeek: '월-금',
      airTime: '22:00',
      notes: 'MBC 대표 심야 라디오',
    },

    // ==================== 서바이벌 프로그램 ====================
    {
      name: 'NCT Universe : LASTART',
      network: '유튜브',
      country: 'KR',
      pType: 'VARIETY_SHOW' as const,
      logoUrl: '/logos/programs/lastart.png',
      notes: 'NCT WISH 데뷔 서바이벌 프로그램 (보아 프로듀서)',
    },

        // ==================== 일본 음악방송 ====================
    {
      name: 'CDTV 라이브!라이브!',
      network: 'TBS',
      country: 'JP',
      pType: 'MUSIC_SHOW' as const,
      logoUrl: '/logos/programs/cdtv.png',
      notes: '일본 TBS 음악 프로그램',
    },
    {
      name: 'Music Station',
      network: '테레비 아사히',
      country: 'JP',
      pType: 'MUSIC_SHOW' as const,
      logoUrl: '/logos/programs/mstation.png',
      notes: '일본 대표 음악 프로그램',
    },
  ]

  const createdPrograms = []
  const progress = new ProgressTracker('Programs Seeded', programs.length)

  for (const programData of programs) {
    const program = await prisma.program.upsert({
      where: {
        name_country: {
          name: programData.name,
          country: programData.country || 'KR',
        },
      },
      update: programData,
      create: programData,
    })

    createdPrograms.push(program)
    progress.increment()
  }
  
  progress.complete()
  logger.success(`Programs seeded: ${createdPrograms.length} programs.`)
  return createdPrograms
}
