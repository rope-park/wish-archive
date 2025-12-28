// prisma/seeds/01-members.ts
import type { PrismaClient } from '@prisma/client'
import { logger, ProgressTracker, upsertRecord } from './utils'
import fs from 'fs'
import path from 'path'

/**
 * NCT WISH 멤버 시드
 */
// TODO: 실제 멤버 프로필 이미지/아이콘/캐릭터 이미지 경로 업데이트 필요
export async function seedMembers(prisma: PrismaClient, groupId: string) {
  const members = [
    {
      stageName: '시온',
      name: '오시온',
      nameHanja: '吳是溫',
      nameEn: 'SION',

      birthDate: new Date('2002-05-11'),
      nationality: '대한민국',
      hometown: '전라남도 목포시',

      positions: '리더, 리드보컬, 리드댄서',
      mbti: 'INTJ',
      emoji: '🌷',
      ownNumber: '01',
      bloodType: 'O',

      joinDate: new Date('2024-02-21'),
      isActive: true,

      // 비주얼 에셋
      colorCode: '#E9B0EF', // PURPLE
      profileImageUrl: '/content/members/sion/profile.png',
      characterUrl: '/content/members/sion/character.png',
      iconUrl: '/content/members/sion/icon.png',
    },
    {
      stageName: '리쿠',
      name: '마에다 리쿠',
      nameHanja: '前田 陸',
      nameEn: 'RIKU',

      birthDate: new Date('2003-06-28'),
      nationality: '일본',
      hometown: '후쿠이현',

      positions: '메인래퍼, 리드댄서',
      mbti: 'ISFP',
      emoji: '🐿️',
      ownNumber: '03',
      bloodType: 'AB',

      joinDate: new Date('2024-02-21'),
      isActive: true,

      colorCode: '#FFB7B2', // RED
      profileImageUrl: '/content/members/riku/profile.jpg',
      iconUrl: '/content/members/riku/icon.png',
      characterUrl: '/content/members/riku/character.png',
    },
    {
      stageName: '유우시',
      name: '토쿠노 유우시',
      nameHanja: '得能 勇志',
      nameEn: 'YUSHI',

      birthDate: new Date('2004-04-05'),
      nationality: '일본',
      hometown: '도쿄도 고토구',

      positions: '메인댄서, 리드보컬',
      mbti: 'ISFJ',
      emoji: '⭐',
      ownNumber: '45',
      bloodType: 'A',

      joinDate: new Date('2024-02-21'),
      isActive: true,

      colorCode: '#B9E6FD', // BLUE
      profileImageUrl: '/content/members/yushi/profile.jpg',
      iconUrl: '/content/members/yushi/icon.png',
      characterUrl: '/content/members/yushi/character.png',
    },
    {
      stageName: '재희',
      name: '김대영',
      nameHanja: '金垈永',
      nameEn: 'JAEHEE',

      birthDate: new Date('2005-06-21'),
      nationality: '대한민국',
      hometown: '대구광역시 달서구 장기동',

      positions: '메인보컬',
      mbti: 'ESFP',
      emoji: '🌳',
      ownNumber: '13',
      bloodType: 'O',

      joinDate: new Date('2024-02-21'),
      isActive: true,

      colorCode: '#8FD0AC', // GREEN
      profileImageUrl: '/content/members/jaehee/profile.jpg',
      iconUrl: '/content/members/jaehee/icon.png',
      characterUrl: '/content/members/jaehee/character.png',
    },
    {
      stageName: '료',
      name: '히로세 료',
      nameHanja: '廣瀬 遼',
      nameEn: 'RYO',

      birthDate: new Date('2007-08-04'),
      nationality: '일본',
      hometown: '교토부',

      positions: '서브보컬',
      mbti: 'INTP-T',
      emoji: '🦭',
      ownNumber: '21',
      bloodType: 'A',
      joinDate: new Date('2024-02-21'),
      isActive: true,

      colorCode: '#FFF9C4', // YELLOW
      profileImageUrl: '/content/members/ryo/profile.jpg',
      iconUrl: '/content/members/ryo/icon.png',
      characterUrl: '/content/members/ryo/character.png',
    },
    {
      stageName: '사쿠야',
      name: '후지나가 사쿠야',
      nameHanja: '藤永 咲哉',
      nameEn: 'SAKUYA',

      birthDate: new Date('2007-11-18'),
      nationality: '일본',
      hometown: '이시카와현 (출생) / 사이타마현 (출신)',

      positions: '리드래퍼, 서브보컬, 막내',
      mbti: 'ENFP',
      emoji: '🥐',
      ownNumber: '39',
      bloodType: 'AB',
      joinDate: new Date('2024-02-21'),
      isActive: true,

      colorCode: '#F5CAD4', // PINK
      profileImageUrl: '/content/members/sakuya/profile.jpg',
      iconUrl: '/content/members/sakuya/icon.png',
      characterUrl: '/content/members/sakuya/character.png',
    },
  ]

  const createdMembers = []
  const progress = new ProgressTracker('Seeding Members', members.length)

  for (const memberData of members) {
    // 설명 파일 읽기
    const folderName = memberData.nameEn.toLowerCase();
    const descriptionPath = path.join(process.cwd(), `content/members/${folderName}/description.html`);

    let description = '';
    try {
      description = fs.readFileSync(descriptionPath, 'utf-8');
    } catch (error) {
      logger.error(`Description file not found for ${memberData.stageName} at ${descriptionPath}. Using default description.`);
      description = `NCT WISH Member ${memberData.stageName}.`;
    }

    const member = await upsertRecord(
      prisma.member,
      {
        groupId_stageName: {
          groupId,
          stageName: memberData.stageName,
        },
      },
      { 
        ...memberData, 
        groupId,
        description: description
       },
    );

    createdMembers.push(member)
    progress.increment()
  }

  progress.complete()
  logger.success(`Members seeded: ${createdMembers.length} members`)
  return createdMembers
}
