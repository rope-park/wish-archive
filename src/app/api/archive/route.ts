/**
 * Archive API Route
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface FileNode {
  id?: string;
  name: string;
  type: 'root' | 'drive' | 'folder' | 'era' | 'album' | 'event';
  description?: string;
  date?: Date;
  cover?: string;
  eventType?: string;
  children?: FileNode[];
}

/**
 * GET /api/archive
 * @returns 트리 구조로 된 아카이브 데이터
 */
export async function GET() {
  try {
    // 1. 모든 Era(활동기) 조회 (날짜순)
    const eras = await prisma.era.findMany({
      orderBy: { startDate: 'asc' },
      include: {
        events: {
          orderBy: { date: 'asc' },
          select: { id: true, title: true, type: true, date: true }
        },
        mainAlbum: {
            select: { id: true, title: true, type: true, releaseDate: true, coverImageUrl: true }
        }
      }
    });

    // 2. Era에 속하지 않은 독립 이벤트들 조회 (기타 폴더용)
    const miscEvents = await prisma.event.findMany({
      where: { eraId: null },
      orderBy: { date: 'asc' },
      select: { id: true, title: true, type: true, date: true }
    });

    // 3. 트리 구조 생성 로직
    const fileSystem = {
      name: '내 컴퓨터',
      type: 'root',
      children: [
        {
          name: 'WISH Archive (D:)',
          type: 'drive',
          children: [] as FileNode[]
        }
      ]
    };

    const drive = fileSystem.children[0] as FileNode;

    // 연도별 그룹화 함수
    const getYearFolder = (date: Date) => {
      const year = new Date(date).getFullYear().toString();
      let folder = drive.children?.find((f: FileNode) => f.name === year);
      if (!folder) {
        folder = { name: year, type: 'folder', children: [] as FileNode[] };
        drive.children?.push(folder);
      }
      return folder;
    };

    // Era를 폴더로 변환하여 연도 폴더에 넣기
    eras.forEach(era => {
      const yearFolder = getYearFolder(era.startDate);
      
      const eraFolder: FileNode = {
        id: era.id,
        name: era.name,
        type: 'era', // 특수 폴더
        description: era.description ?? undefined,
        children: [] as FileNode[]
      };

      // 앨범 파일 추가
      if (era.mainAlbum && eraFolder.children) {
        eraFolder.children.push({
          id: era.mainAlbum.id,
          name: era.mainAlbum.title,
          type: 'album',
          date: era.mainAlbum.releaseDate,
          cover: era.mainAlbum.coverImageUrl ?? undefined,
        });
      }

      // 이벤트 파일 추가
      era.events.forEach(event => {
        if (eraFolder.children) {
          eraFolder.children.push({
            id: event.id,
            name: event.title,
            type: 'event',
            eventType: event.type ?? undefined,
            date: event.date,
          });
        }
      });

      if (yearFolder.children) {
        yearFolder.children.push(eraFolder);
      }
    });

    // 기타 이벤트 처리
    if (miscEvents.length > 0) {
        const miscFolder = { name: 'Misc', type: 'folder', children: [] as FileNode[] };
        miscEvents.forEach(event => {
            const yearFolder = getYearFolder(event.date);
            // 연도 폴더 바로 아래에 파일로 넣거나, Misc 폴더를 만들어 넣음
            // 여기서는 연도 폴더 바로 아래에 둠
            if (yearFolder.children) {
                yearFolder.children.push({
                    id: event.id,
                    name: event.title,
                    type: 'event',
                    eventType: event.type,
                    date: event.date
                });
            }
        });
    }

    // 연도 정렬
    if (drive.children) {
      drive.children.sort((a: FileNode, b: FileNode) => a.name.localeCompare(b.name));
    }

    return NextResponse.json(fileSystem);

  } catch (error) {
    console.error('Archive API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch archive' }, { status: 500 });
  }
}