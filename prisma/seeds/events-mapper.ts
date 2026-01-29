// prisma/seeds/events-mapper.ts
import type { Era, Program, EventSeries, Album, Member, Track } from '@prisma/client';

/**
 * ==========================================
 * 1. Era (활동기) 매핑
 * ==========================================
 * 날짜 기준으로 해당 활동기에 속하는지 확인
 */
export function findEraIdByDate(date: Date, eras: Era[]): string | undefined {
  // 1. Pre-Debut 예외 처리 (안전장치)
  const preDebutEra = eras.find(e => e.name === 'Pre-Debut');

  if (preDebutEra && date < new Date('2024-01-18') && date > new Date('2023-09-07')) { // 프리데뷔 활동기
    return preDebutEra.id;
  }

  // 2. 일반적인 기간 매칭
  const targetEra = eras.find(era => {
    const start = new Date(era.startDate).getTime();
    // 종료일이 없으면(현재 진행중) 먼 미래로 설정
    const end = era.endDate ? new Date(era.endDate).getTime() : new Date('2099-12-31').getTime();
    const current = date.getTime();
    return current >= start && current <= end;
  });

  return targetEra?.id;
}

/**
 * ==========================================
 * 2. Program (방송 프로그램) 매핑
 * ==========================================
 * 스케줄 제목에 프로그램 이름이 포함되어 있는지 확인
 */
export function findProgramIdByTitle(title: string, programs: Program[]): string | undefined {
  if (!title) return undefined;

  for (const program of programs) {
    // 1. 정확한 이름 포함 여부 확인
    if (title.includes(program.name)) return program.id;

    // 2. 별칭(aliases) 확인
    for (let i = 0; i < program.aliases.length; i++) {
      if (title.includes(program.aliases[i])) return program.id;
    }
  }

  return undefined;
}

/**
 * ==========================================
 * 3. EventSeries (시리즈/투어) 매핑
 * ==========================================
 */
export function findSeriesIdByName(name: string | undefined, seriesList: EventSeries[]): string | undefined {
  if (!name) return undefined;

  const target = seriesList.find(s => s.name === name || name.includes(s.name));
  return target?.id;
}

/**
 * ==========================================
 * 4. Album (앨범) 매핑
 * ==========================================
 */
export function findAlbumIdByTitle(title: string | undefined, albums: Album[]): string | undefined {
  if (!title) return undefined;

  // 정확히 일치하거나, 스케줄 데이터의 앨범명이 DB 앨범명을 포함하는 경우
  const target = albums.find(a => a.title === title || title.includes(a.title));
  return target?.id;
}

/**
 * ==========================================
 * 5. Member (멤버) 매핑
 * ==========================================
 */
export function findMemberByName(name: string, members: Member[]): Member | undefined {
  if (!name) return undefined;

  // Stage Name(활동명) 우선 검색, 없으면 Real Name(본명) 검색
  return members.find(m => m.stageName === name || m.name === name);
}

/**
 * ==========================================
 * 6. Track (곡/음원) 매핑
 * ==========================================
 * 대소문자 구분 및 공백 차이를 무시하는 정규화(Normalization) 로직 사용
 */
export function findTrackIdByTitle(title: string | undefined, tracks: Track[]): string | undefined {
  if (!title) return undefined;

  // 비교를 위해 소문자로 변환하고 모든 공백을 제거하는 헬퍼 함수
  const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '');

  const normalizedInput = normalize(title);

  const target = tracks.find(t => {
    const normalizedTrackTitle = normalize(t.title);

    // 1. 정확히 일치 (Normalize 후)
    if (normalizedTrackTitle === normalizedInput) return true;

    // 2. "WISH (Japanese Ver.)" 같은 경우 "WISH"로 검색해도 찾을 수 있게 처리하려면:
    // 상황에 따라 포함 여부로 체크 (오탐지 가능성이 있으므로 주의)
    // if (normalizedTrackTitle.includes(normalizedInput)) return true;

    return false;
  });

  return target?.id;
}