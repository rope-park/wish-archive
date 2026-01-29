// prisma/seeds/12-lyrics.ts
import { PrismaClient, Language, ScriptType } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// LRC 파일 읽기
function readLRCFile(fileName: string): string | null {
  const lrcPath = path.join(process.cwd(), 'content', 'lyrics', fileName);
  if (fs.existsSync(lrcPath)) {
    return fs.readFileSync(lrcPath, 'utf-8');
  }
  return null;
}

// LRC 플레이스홀더 생성 (실제 가사 데이터 없는 경우)
function generatePlaceholderLRC(language: string): string {
  return `[00:00.00][ALL] ${language} lyrics will be added here
[00:05.00][ALL] Please add the actual lyrics
[00:10.00][ALL] This is just a placeholder`;
}

/**
 * 트랙 가사 시드
 * - 각 트랙별로 기본 언어 가사, 로마자 표기, 번역(선택적) 생성
 * - LRC 파일이 content/lyrics/ 폴더에 존재하면 해당 내용을 사용
 * - 존재하지 않으면 플레이스홀더 가사로 생성
 */
export async function seedLyrics(prisma: PrismaClient) {
  console.log('🎵 Seeding lyrics structure...');

  // 모든 트랙 가져오기
  const tracks = await prisma.track.findMany({
    orderBy: { trackNumber: 'asc' }
  });

  console.log(`Found ${tracks.length} tracks`);

  let created = 0;

  for (const track of tracks) {
    // 트랙의 언어 확인
    const primaryLanguage = track.language;
    
    console.log(`\n🎵 Processing: ${track.title} (${primaryLanguage})`);
    console.log(`  → trackId: ${track.id}`);
    
    // 트랙 타이틀을 파일명으로 변환 (버전 정보 처리 포함)
    let trackSlug = track.title.toLowerCase()
      // 버전 표기 변환
      .replace(/\(japanese\s*ver\.?\)/gi, '-jpver')
      .replace(/\(korean\s*ver\.?\)/gi, '-krver')
      .replace(/\(english\s*ver\.?\)/gi, '-enver')
      .replace(/\(chinese\s*ver\.?\)/gi, '-cnver')
      // 괄호 제거 및 정리
      .replace(/[()]/g, '')
      // 공백을 하이픈으로
      .replace(/\s+/g, '-')
      // 특수문자 제거 (하이픈과 숫자만 남김)
      .replace(/[^a-z0-9-]/g, '')
      // 연속된 하이픈 제거
      .replace(/-+/g, '-')
      // 앞뒤 하이픈 제거
      .replace(/^-|-$/g, '');
    
    // 타이틀에 버전 정보가 없지만 JAPANESE 언어인 경우 -jpver 추가
    if (primaryLanguage === Language.JAPANESE && !trackSlug.includes('jpver') && !trackSlug.includes('krver')) {
      trackSlug = trackSlug + '-jpver';
    }
    
    console.log(`  → trackSlug: ${trackSlug}`);
    
    // 기본 언어 가사 생성 (일본어 또는 한국어)
    const primaryLRCFileName = `${trackSlug}-${primaryLanguage.toLowerCase()}.lrc`;
    const primaryLRCContent = readLRCFile(primaryLRCFileName) || generatePlaceholderLRC(primaryLanguage);
    console.log(`  → Primary LRC: ${primaryLRCFileName} (${primaryLRCContent ? 'FOUND' : 'PLACEHOLDER'})`);
    
    console.log(`  → Upserting primary lyrics...`);
    const primaryLyric = await prisma.trackLyric.upsert({
      where: {
        trackId_language_script: {
          trackId: track.id,
          language: primaryLanguage,
          script: ScriptType.NATIVE
        }
      },
      update: {
        lrcContent: primaryLRCContent,
      },
      create: {
        trackId: track.id,
        language: primaryLanguage,
        script: ScriptType.NATIVE,
        isOfficial: false,
        text: `Lyrics for ${track.title} will be added here. Please update with actual content.`,
        lrcContent: primaryLRCContent,
      }
    });
    console.log(`  → Primary upserted: ${primaryLyric.id}`);

    // 로마자 표기 생성 (버전 정보 포함)
    const romanizedLRCFileName = `${trackSlug}-romanized.lrc`;
    const romanizedLRCContent = readLRCFile(romanizedLRCFileName) || generatePlaceholderLRC('Romanized');
    console.log(`  → Romanized LRC: ${romanizedLRCFileName} (${romanizedLRCContent ? 'FOUND' : 'PLACEHOLDER'})`);
    console.log(`  → Upserting romanized with trackId=${track.id}, language=${primaryLanguage}, script=ROMANTIZED`);
    
    const romanizedLyric = await prisma.trackLyric.upsert({
      where: {
        trackId_language_script: {
          trackId: track.id,
          language: primaryLanguage,
          script: ScriptType.ROMANTIZED
        }
      },
      update: {
        lrcContent: romanizedLRCContent,
      },
      create: {
        trackId: track.id,
        language: primaryLanguage,
        script: ScriptType.ROMANTIZED,
        isOfficial: false,
        text: `Romanized lyrics for ${track.title} will be added here.`,
        lrcContent: romanizedLRCContent,
      }
    });

    // 한국어곡이면 일본어 번역 추가, 일본어곡이면 한국어 번역 추가
    if (primaryLanguage === Language.KOREAN) {
      const japaneseLRCFileName = `${trackSlug}-japanese.lrc`;
      const japaneseLRCContent = readLRCFile(japaneseLRCFileName);
      console.log(`  → Translation (JP): ${japaneseLRCFileName} (${japaneseLRCContent ? 'FOUND' : 'NOT FOUND'})`);
      
      if (japaneseLRCContent) {
        await prisma.trackLyric.upsert({
          where: {
            trackId_language_script: {
              trackId: track.id,
              language: Language.JAPANESE,
              script: ScriptType.NATIVE
            }
          },
          update: {
            lrcContent: japaneseLRCContent,
          },
          create: {
            trackId: track.id,
            language: Language.JAPANESE,
            script: ScriptType.NATIVE,
            isOfficial: false,
            text: `Japanese translation for ${track.title} (optional)`,
            lrcContent: japaneseLRCContent,
          }
        });
      }
    } else if (primaryLanguage === Language.JAPANESE) {
      const koreanLRCFileName = `${trackSlug}-korean.lrc`;
      const koreanLRCContent = readLRCFile(koreanLRCFileName);
      console.log(`  → Translation (KR): ${koreanLRCFileName} (${koreanLRCContent ? 'FOUND' : 'NOT FOUND'})`);
      
      if (koreanLRCContent) {
        await prisma.trackLyric.upsert({
          where: {
            trackId_language_script: {
              trackId: track.id,
              language: Language.KOREAN,
              script: ScriptType.NATIVE
            }
          },
          update: {
            lrcContent: koreanLRCContent,
          },
          create: {
            trackId: track.id,
            language: Language.KOREAN,
            script: ScriptType.NATIVE,
            isOfficial: false,
            text: `Korean translation for ${track.title} (optional)`,
            lrcContent: koreanLRCContent,
          }
        });
      }
    }

    created++;
    if (created % 10 === 0) {
      console.log(`✅ Processed ${created}/${tracks.length} tracks`);
    }
  }

  console.log(`✅ Lyrics structure created for ${created} tracks`);
  console.log('📝 Please add actual lyrics to content/lyrics/ folder in LRC format');
  console.log('📝 Example: hands-up-japanese.lrc, hands-up-romanized.lrc');
}
