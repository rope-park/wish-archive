/**
 * 시드 데이터 메인 실행 스크립트
 * 
 * 실행: npm run db:seed
 * 의존성 순서:
 * Group -> Member/Era/Album -> Event -> Appearance/Chart
 */

import { PrismaClient } from '@prisma/client'
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

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // 1. 그룹 생성 (최상위)
  console.log('📦 [1/10] Seeding Group...')
  const group = await seedGroup(prisma)

  // 2. 멤버 생성
  console.log('👥 [2/10] Seeding Members...')
  const members = await seedMembers(prisma, group.id)

  // 3. Era 생성
  console.log('🌌 [3/10] Seeding Eras...')
  const eras = await seedEras(prisma, group.id)

  // 4. 앨범 생성
  console.log('💿 [4/10] Seeding Albums...')
  const albums = await seedAlbums(prisma, group.id)

  // 5. 트랙 생성
  console.log('🎵 [5/10] Seeding Tracks...')
  await seedTracks(prisma, albums)

  // 6. 이벤트 생성
  console.log('📅 [6/10] Seeding Events...')
  await seedEvents(prisma, members, eras, albums)

  // 7. 방송 프로그램
  console.log('📺 [7/10] Seeding Programs...')
  await seedPrograms(prisma)

  // 8. 출연 기록
  console.log('🎬 [8/10] Seeding Appearances...')
  await seedAppearances(prisma)

  // 9. 차트 정보
  console.log('📊 [9/10] Seeding Charts...')
  await seedCharts(prisma)

  // 10. 인증/수상
  console.log('🏆 [10/10] Seeding Certifications...')
  await seedCertifications(prisma)

  console.log('✅ Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })