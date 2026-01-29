// prisma/seeds/11-awards.ts
import { PrismaClient, Prisma } from '@prisma/client'
import { logger } from './utils/utils'

export async function seedAwards(prisma: PrismaClient | Prisma.TransactionClient, groupId: string) {
  // 1. 시상식 기관 (Organizations) 정의
  const organizations = [
    { id: 'asea', name: 'Asia Star Entertainer Awards', abbr: 'ASEA', country: 'JP' },
    { id: 'tma', name: 'The Fact Music Awards', abbr: 'TMA', country: 'KR' },
    { id: 'kgma', name: 'Korea Grand Music Awards', abbr: 'KGMA', country: 'KR' },
    { id: 'mama', name: 'Mnet Asian Music Awards', abbr: 'MAMA', country: 'KR' },
    { id: 'dreamball', name: 'Dream Rookie', abbr: 'DR', country: 'KR' } // 예시
  ]

  for (const org of organizations) {
    await prisma.awardOrganization.upsert({
      where: { id: org.id },
      update: { name: org.name, abbreviation: org.abbr, country: org.country },
      create: { id: org.id, name: org.name, abbreviation: org.abbr, country: org.country },
    })
  }

  // 2. 시상식 이벤트 (Events) 및 수상 (Wins)
  // 데이터 구조: { orgId, edition, name, date, location, wins: [{ category, type }] }
  const awardEvents = [
    {
      orgId: 'asea',
      edition: '1st',
      name: 'ASEA 2024',
      heldAt: new Date('2024-04-10'),
      location: 'K-Arena Yokohama, Japan',
      wins: [
        { category: 'The Best New Artist', type: 'ROOKIE' }
      ]
    },
    {
      orgId: 'tma',
      edition: '2024',
      name: '2024 The Fact Music Awards',
      heldAt: new Date('2024-09-08'),
      location: 'Kyocera Dome Osaka, Japan',
      wins: [
         // 실제 수상 내역 확인 필요 (NCT WISH 수상 기록 반영)
        { category: 'Next Leader', type: 'ROOKIE' } 
        // 2024 TMA에서 넥스트 리더상 수상 여부 체크 (예시 데이터)
      ]
    },
    {
      orgId: 'mama',
      edition: '2024',
      name: '2024 MAMA AWARDS',
      heldAt: new Date('2024-11-21'), // US: 21, JP: 22
      location: 'Dolby Theatre (LA) & Kyocera Dome (Osaka)',
      wins: [
        // 수상 내역이 있다면 추가
        // { category: 'Best New Male Artist', type: 'ROOKIE' } // 후보 or 수상
      ]
    },
    {
      orgId: 'kgma',
      edition: '1st',
      name: '2024 KGMA',
      heldAt: new Date('2024-11-17'),
      location: 'Inspire Arena, Incheon',
      wins: [
        { category: 'IS Rising Star', type: 'ROOKIE' }
      ]
    }
  ]

  let winCount = 0;

  for (const evt of awardEvents) {
    // 2-1. Event 생성
    const eventId = `${evt.orgId}-${evt.edition.replace(/\s/g, '').toLowerCase()}`
    
    const awardEvent = await prisma.awardEvent.upsert({
      where: { id: eventId },
      update: {
        organizationId: evt.orgId,
        name: evt.name,
        edition: evt.edition,
        heldAt: evt.heldAt,
        location: evt.location
      },
      create: {
        id: eventId,
        organizationId: evt.orgId,
        name: evt.name,
        edition: evt.edition,
        heldAt: evt.heldAt,
        location: evt.location
      }
    })

    // 2-2. Win & Category 생성
    for (const win of evt.wins) {
      // 카테고리 먼저 생성 (없으면)
      const categoryId = `${awardEvent.id}-${win.category.replace(/\s/g, '-').toLowerCase()}`
      const category = await prisma.awardCategory.upsert({
        where: {
          id: categoryId
        },
        update: { 
          eventId: awardEvent.id,
          name: win.category,
          type: win.type 
        },
        create: {
          id: categoryId,
          eventId: awardEvent.id,
          name: win.category,
          type: win.type
        }
      })

      // 수상 기록 연결
      await prisma.awardWin.create({
        data: {
          categoryId: category.id,
          eventId: awardEvent.id,
          groupId: groupId,
          // 멤버 개인 수상인 경우 memberId 추가 로직 필요
        }
      })
      winCount++;
    }
  }

  logger.success(`✓ Awards seeded: ${awardEvents.length} events, ${winCount} wins`)
}