// prisma/seeds/05-events.ts
import type { PrismaClient, Member, Era, Album } from '@prisma/client'

/**
 * 이벤트 시드 (타임라인)
 */
export async function seedEvents(
  prisma: PrismaClient,
  members: Member[],
  eras: Era[],
  albums: Album[]
) {
  // Era 매핑
  const eraMap: Record<string, string> = {}
  for (const era of eras) {
    eraMap[era.name] = era.id
  }

  // Album 매핑
  const albumMap: Record<string, string> = {}
  for (const album of albums) {
    albumMap[album.title] = album.id
  }

  const events = [
    // Pre-Debut Era
    {
      type: 'ANNOUNCEMENT' as const,
      date: new Date('2023-09-07'),
      title: 'NCT NEW TEAM 공개',
      description: 'NCT 도쿄팀 6명 멤버 공개',
      location: null,
      country: 'KR',
      city: null,
      programName: null,
      url: null,
      tags: '발표, 프리데뷔',
      eraId: eraMap['Pre-Debut Era'],
    },
    {
      type: 'RELEASE' as const,
      date: new Date('2023-10-08'),
      title: 'Hands Up 발매',
      description: '프리데뷔 디지털 싱글 발매 (일본)',
      location: null,
      country: 'JP',
      city: null,
      programName: null,
      url: null,
      tags: '프리데뷔, 일본싱글',
      eraId: eraMap['Pre-Debut Era'],
    },
    {
      type: 'ANNOUNCEMENT' as const,
      date: new Date('2024-02-21'),
      title: 'NCT WISH 그룹명 발표',
      description: '공식 그룹명 NCT WISH 확정 및 데뷔 예정 발표',
      location: null,
      country: 'KR',
      city: null,
      programName: null,
      url: null,
      tags: '그룹명, 데뷔예고',
      eraId: eraMap['Pre-Debut Era'],
    },

    // WISH Era
    {
      type: 'RELEASE' as const,
      date: new Date('2024-02-28'),
      title: 'WISH 싱글 발매',
      description: '데뷔 싱글 앨범 WISH 발매',
      location: null,
      country: 'KR',
      city: null,
      programName: null,
      url: null,
      tags: '데뷔, 싱글',
      eraId: eraMap['WISH Era'],
    },
    {
      type: 'MUSIC_SHOW' as const,
      date: new Date('2024-02-29'),
      title: 'WISH 음악방송 데뷔 무대',
      description: 'M COUNTDOWN에서 데뷔 첫 무대',
      location: 'CJ ENM 센터',
      country: 'KR',
      city: '서울',
      programName: 'M COUNTDOWN',
      url: null,
      tags: '음악방송, 데뷔무대',
      eraId: eraMap['WISH Era'],
    },
    {
      type: 'FANMEETING' as const,
      date: new Date('2024-03-16'),
      title: '첫 팬미팅 NCT WISH TALK',
      description: '데뷔 첫 팬미팅',
      location: 'YES24 라이브홀',
      country: 'KR',
      city: '서울',
      programName: null,
      url: null,
      tags: '팬미팅',
      eraId: eraMap['WISH Era'],
    },
    {
      type: 'RELEASE' as const,
      date: new Date('2024-06-25'),
      title: 'Songbird 싱글 발매',
      description: '일본 2nd 싱글 Songbird 발매',
      location: null,
      country: 'JP',
      city: null,
      programName: null,
      url: null,
      tags: '일본싱글',
      eraId: eraMap['WISH Era'],
    },

    // Steady Era
    {
      type: 'RELEASE' as const,
      date: new Date('2024-09-24'),
      title: 'Steady 미니앨범 발매',
      description: '1st Mini Album Steady 발매',
      location: null,
      country: 'KR',
      city: null,
      programName: null,
      url: null,
      tags: '미니앨범, 컴백',
      eraId: eraMap['Steady Era'],
    },
    {
      type: 'MUSIC_SHOW' as const,
      date: new Date('2024-09-26'),
      title: 'Steady 컴백 무대',
      description: 'M COUNTDOWN 컴백 첫 무대',
      location: null,
      country: 'KR',
      city: '서울',
      programName: 'M COUNTDOWN',
      url: null,
      tags: '음악방송, 컴백',
      eraId: eraMap['Steady Era'],
    },
    {
      type: 'RELEASE' as const,
      date: new Date('2024-11-27'),
      title: 'WISHFUL 정규앨범 발매',
      description: '1st Japanese Album WISHFUL 발매',
      location: null,
      country: 'JP',
      city: null,
      programName: null,
      url: null,
      tags: '일본정규앨범',
      eraId: eraMap['Steady Era'],
    },
  ]

  for (const eventData of events) {
    const existing = await prisma.event.findFirst({
      where: {
        date: eventData.date,
        title: eventData.title,
      },
    })

    if (!existing) {
      await prisma.event.create({ data: eventData })
    }
  }

  console.log(`   ✓ Created ${events.length} events`)
}