/**
 * 시드 데이터 메인 실행 스크립트
 * 
 * 실행: npm run db:seed
 * 의존성 순서:
 * Group -> Member/Era/Album -> Event -> Appearance/Chart
 */

import { PrismaClient, Group, Member, Era, Album, Track, Event, Program, } from '@prisma/client'
import { logger, checkEnvVars } from './seeds/utils'
import { seedGroup } from './seeds/00-group'
import { seedMembers } from './seeds/01-members'
import { seedEras } from './seeds/02-eras'
import { seedAlbums } from './seeds/03-albums'
import { seedTracks } from './seeds/04-tracks'
import { seedEvents } from './seeds/05-events'
import { seedPrograms } from './seeds/06-programs'
import { seedAppearances } from './seeds/07-appearances'
import { seedCharts } from './seeds/08-charts'
import { seedCertifications } from './seeds/09-certifications'
import { seedWidgets } from './seeds/10-widgets'
import { seedMusicShowTrophies } from './seeds/11-music-show'
import { seedAlbumSales } from './seeds/12-sales'
import { seedContents } from './seeds/13-contents'
import { seedAwards } from './seeds/14-awards'
import { seedLyrics } from './seeds/15-lyrics'

const prisma = new PrismaClient({
  log: process.env.DEBUG === 'true' ? ['query', 'info', 'warn', 'error'] : ['info', 'warn', 'error'],
})

type SeedResults = {
  Group?: { id: string };
  Members?: Member[];
  Eras?: Era[];
  Albums?: Album[];
  Tracks?: Track[];
  Events?: Event[];
  Programs?: Program[];
  Appearances?: unknown[];
  Charts?: unknown[];
  Certifications?: unknown[];
  Widgets?: unknown;
  MusicShowTrophies?: unknown[];
  AlbumSales?: unknown[];
  Contents?: unknown[];
  Awards?: unknown[];
  Lyrics?: unknown[];
};

// 시드 단계 정의
const SEED_STEPS = [
  { name: 'Group', fn: seedGroup, deps: [] },
  { name: 'Members', fn: seedMembers, deps: ['Group'] },
  { name: 'Eras', fn: seedEras, deps: ['Group'] },
  { name: 'Albums', fn: seedAlbums, deps: ['Group'] },
  { name: 'Tracks', fn: seedTracks, deps: ['Albums'] },
  { name: 'Events', fn: seedEvents, deps: ['Members', 'Eras', 'Albums'] },
  { name: 'Programs', fn: seedPrograms, deps: [] },
  { name: 'Appearances', fn: seedAppearances, deps: ['Programs', 'Tracks'] },
  { name: 'Charts', fn: seedCharts, deps: [] },
  { name: 'Certifications', fn: seedCertifications, deps: ['Albums'] },
  { name: 'Widgets', fn: seedWidgets, deps: ['Members', 'Albums'] },
  { name: 'MusicShowTrophies', fn: seedMusicShowTrophies, deps: ['Programs', 'Tracks'] },
  { name: 'AlbumSales', fn: seedAlbumSales, deps: ['Albums'] },
  { name: 'Contents', fn: seedContents, deps: [] },
  { name: 'Awards', fn: seedAwards, deps: [] },
  { name: 'Lyrics', fn: seedLyrics, deps: ['Tracks'] },
] as const

// 메인 시드 함수
async function main() {
  const startTime = Date.now()
  
  // 환경 변수 확인
  checkEnvVars(['DATABASE_URL'])
  
  logger.info('🌱 Starting database seed process...')
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
  logger.info(`Total steps: ${SEED_STEPS.length}`)
  console.log('')

  // 시드 데이터 저장소
  const seedResults: SeedResults = {}

  try {
    // 각 단계 실행
    for (let i = 0; i < SEED_STEPS.length; i++) {
      const step = SEED_STEPS[i]
      const stepNum = String(i + 1).padStart(2, '0')
      
      console.log(`\n${'='.repeat(60)}`)
      logger.info(`[${stepNum}/${SEED_STEPS.length}] Seeding ${step.name}...`)
      console.log('='.repeat(60))

      try {
        // 의존성 체크
        for (const dep of step.deps) {
          if (!seedResults[dep as keyof SeedResults]) {
            throw new Error(`Dependency "${dep}" not found for ${step.name}`)
          }
        }

        // 시드 실행
        let result;
        switch (step.name) {
          case 'Group':
            result = await step.fn(prisma);
            break;
          case 'Members':
          case 'Eras':
          case 'Albums':
            result = await step.fn(prisma, seedResults.Group!.id);
            break;
          case 'Tracks':
            result = await step.fn(prisma, seedResults.Albums!);
            break;
          case 'Events':
            result = await step.fn(prisma, seedResults.Members!, seedResults.Eras!, seedResults.Albums!);
            break;
          case 'Lyrics':
            result = await step.fn(prisma);
            break;
          case 'Programs':
          case 'Charts':
          case 'Appearances':
          case 'Certifications':
            result = await step.fn(prisma);
            break;
          case 'Widgets':
          case 'MusicShowTrophies':
          case 'AlbumSales':
          case 'Contents':
          case 'Awards':
            result = await step.fn(prisma);
            break;
        }

        seedResults[step.name as keyof SeedResults] = result as never;
        
        logger.success(`${step.name} seeded successfully`)
      } catch (error) {
        logger.error(`Failed to seed ${step.name}`)
        throw error
      }
    }

    // 요약 정보
    console.log('\n' + '='.repeat(60))
    logger.success('✨ Seed completed successfully!')
    console.log('='.repeat(60))
    
    // 통계 출력
    console.log('\n📊 Seed Statistics:')
    console.log(`  • Groups: ${Array.isArray(seedResults.Group) ? seedResults.Group.length : 1}`)
    console.log(`  • Members: ${Array.isArray(seedResults.Members) ? seedResults.Members.length : 0}`)
    console.log(`  • Eras: ${Array.isArray(seedResults.Eras) ? seedResults.Eras.length : 0}`)
    console.log(`  • Albums: ${Array.isArray(seedResults.Albums) ? seedResults.Albums.length : 0}`)
    console.log(`  • Tracks: ${Array.isArray(seedResults.Tracks) ? seedResults.Tracks.length : 0}`)
    console.log(`  • Events: ${Array.isArray(seedResults.Events) ? seedResults.Events.length : 0}`)
    console.log(`  • Music Show Trophies: ${Array.isArray(seedResults.MusicShowTrophies) ? seedResults.MusicShowTrophies.length : 0}`)
    console.log(`  • Album Sales: ${Array.isArray(seedResults.AlbumSales) ? seedResults.AlbumSales.length : 0}`)
    console.log(`  • Contents: ${Array.isArray(seedResults.Contents) ? seedResults.Contents.length : 0}`)
    console.log(`  • Awards: ${Array.isArray(seedResults.Awards) ? seedResults.Awards.length : 0}`)
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2)
    console.log(`\n Total time: ${duration}s`)
    
  } catch (error) {
    logger.error('Seed failed')
    console.error(error)
    
    // 디버그 모드에서만 스택 트레이스 출력
    if (process.env.DEBUG === 'true' && error instanceof Error) {
      console.error('\n🔍 Stack trace:')
      console.error(error.stack)
    }
    
    process.exit(1)
  }
}

// 실행 및 정리
main()
  .catch((e) => {
    logger.error(`Unexpected error: ${e}`)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    logger.info('Database connection closed')
  })

// 시그널 핸들러
process.on('SIGINT', async () => {
  logger.warning('\nReceived SIGINT, cleaning up...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  logger.warning('\nReceived SIGTERM, cleaning up...')
  await prisma.$disconnect()
  process.exit(0)
})