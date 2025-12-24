// prisma/seeds/07-appearances.ts
import type { PrismaClient } from '@prisma/client'
import { logger, ProgressTracker } from './utils'

// 타입 정의 업데이트
interface AppearanceConfig {
  date: string;
  title: string;
  time?: string;
  note?: string;
  isWin?: boolean;
  role?: string;
  isPerformance?: boolean;
  members?: string[];
}

interface ProgramSchedule {
  programKey: string;
  appearances: (AppearanceConfig | string)[];
}

interface PromotionCampaign {
  trackKeyword: string;
  schedules: ProgramSchedule[];
}

/**
 * 방송 출연 기록 시드
 * - 스케줄 기록 (타임라인용)
 */
export async function seedAppearances(prisma: PrismaClient) {
  // 사전 데이터 조회
  const allPrograms = await prisma.program.findMany();
  const allTracks = await prisma.track.findMany();
  const allMembers = await prisma.member.findMany();

  // 맵핑 헬퍼
  const programMap = new Map<string, string>();
  allPrograms.forEach((program) => {
    programMap.set(program.name, program.id);
    if (program.name.includes('M COUNTDOWN')) programMap.set('MCD', program.id);
    if (program.name.includes('Music Bank')) programMap.set('MUBANK', program.id);
    if (program.name.includes('Music Core')) programMap.set('MCORE', program.id);
    if (program.name.includes('Inkigayo')) programMap.set('INKIGAYO', program.id);
    if (program.name.includes('The Show')) programMap.set('THESHOW', program.id);
    if (program.name.includes('Show Champion')) programMap.set('SHOWCHAMP', program.id);
  });

  const getTrackId = (keyword: string) => {
    const track = allTracks.find(t => t.title.includes(keyword));
    return track ? track.id : null;
  };

  const getMemberIds = (names?: string[]) => {
    if (!names || names.length === 0) return allMembers.map(m => m.id);
    return allMembers
      .filter(m => (m.stageName && names.includes(m.stageName)) || (m.nameEn && names.includes(m.nameEn)))
      .map(m => m.id);
  }

  const campaigns: PromotionCampaign[] = [
    {
      trackKeyword: 'WISH (Korean',
      schedules: [
        {
          programKey: 'MCD',
          appearances: [
            { date: '2024-02-29', title: 'WISH 데뷔 무대', note: '데뷔' }, // 직접 입력
            { date: '2024-03-07', title: 'WISH' },
            { date: '2024-03-14', title: 'WISH' }
          ]
        },
        {
          programKey: 'MUBANK',
          appearances: [
            { date: '2024-03-01', title: 'WISH 공중파 데뷔' },
            { date: '2024-03-08', title: 'WISH' }
          ]
        },
        {
          programKey: 'THESHOW',
          appearances: [
            { date: '2024-03-12', title: 'WISH - 더쇼 1위', note: '데뷔 첫 1위', isWin: true }
          ]
        },
      ]
    },
    {
      trackKeyword: 'Steady',
      schedules: [
        {
          programKey: 'MCD',
          appearances: [
            { date: '2024-09-26', title: 'Steady 컴백 무대' },
            { date: '2024-10-03', title: 'Steady' }
          ]
        },
        {
          programKey: 'MUBANK',
          appearances: [
            { date: '2024-09-27', title: 'Steady 컴백' },
            { date: '2024-10-04', title: 'Steady - 뮤직뱅크 1위', note: '지상파 첫 1위', isWin: true }
          ]
        },
      ]
    },
    {
      trackKeyword: 'poppop',
      schedules: [
        {
          programKey: 'MCD',
          appearances: [
            { date: '2025-04-17', title: 'poppop 컴백 스페셜' },
            { date: '2025-04-24', title: 'poppop - 엠카 1위', isWin: true }
          ]
        },
        {
          programKey: 'INKIGAYO',
          appearances: [
            // [개별 활동] 시온 스페셜 MC
            {
              date: '2025-04-20',
              title: '시온 스페셜 MC', // 이렇게 개별 타이틀 지정
              role: 'Special MC',
              members: ['시온'],
              isPerformance: false
            },
            // [단체 활동] 같은 날 무대
            {
              date: '2025-04-20',
              title: 'poppop 컴백 무대'
            }
          ]
        }
      ]
    },
    {
      trackKeyword: 'COLOR',
      schedules: [
        {
          programKey: 'MCD',
          appearances: [
            { date: '2025-09-05', title: 'COLOR 컴백 무대' }
          ]
        }
      ]
    }
  ];

  const totalItems = campaigns.reduce((acc, camp) =>
    acc + camp.schedules.reduce((sAcc, sch) => sAcc + sch.appearances.length, 0), 0);

  const createdAppearances = [];
  const progress = new ProgressTracker('Appearances seeding', totalItems);



  for (const campaign of campaigns) {
    const trackId = getTrackId(campaign.trackKeyword);
    if (!trackId) {
      logger.warning(`Track not found for keyword: ${campaign.trackKeyword}`);
      continue;
    }

    for (const schedule of campaign.schedules) {
      const programId = programMap.get(schedule.programKey);
      if (!programId) {
        logger.warning(`Program not found for key: ${schedule.programKey}`);
        continue;
      }

      for (const item of schedule.appearances) {
        const config: AppearanceConfig = typeof item === 'string' ? { date: item, title: campaign.trackKeyword } : item;
        const finalTitle = config.title || campaign.trackKeyword;
        const isoDate = new Date(`${config.date}T${config.time || '09:00:00'}Z`);

        const targetMemberIds = getMemberIds(config.members);

        const appearanceData = {
          programId,
          trackId,
          date: isoDate,
          title: finalTitle,
          isPerformance: config.isPerformance !== false,
          role: config.role || null,
          note: config.note || null,
        };

        const uniqueId = `${programId}_${trackId}_${config.date}_${config.role || 'group'}`;

        try {
          const result = await prisma.appearance.upsert({
            where: { id: uniqueId },
            update: {
              ...appearanceData,
              members: {
                set: targetMemberIds.map(id => ({ id })),
              }
            },
            create: {
              ...appearanceData,
              id: uniqueId,
              members: {
                connect: targetMemberIds.map(id => ({ id })),
              }
            },
          });
          createdAppearances.push(result);
        } catch (error) {
          logger.error(`Failed to upsert appearance for ${uniqueId}: ${error}`);
        }
        progress.increment();
      }
    }
  }

  progress.complete();
  logger.success(`Appearances seeded: ${createdAppearances.length} appearances`);
  return createdAppearances;
}
