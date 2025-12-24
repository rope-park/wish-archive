/**
 * Gallery API Route
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

interface FileSystemNode {
  id?: string;
  name: string;
  type: 'root' | 'folder' | 'image';
  children: FileSystemNode[];
  url?: string;
  thumbnailUrl?: string | null;
  date?: Date | string;
  description?: string | null;
  width?: number | null;
  height?: number | null;
}

/**
 * GET /api/gallery
 * @returns 가상 파일 시스템 구조의 갤러리 데이터
 */
export async function GET() {
  try {
    // 1. 이미지 타입의 미디어 조회
    const medias = await prisma.media.findMany({
      where: {
        mType: { in: ['IMAGE', 'DATA_PIC', 'POSTER'] }
      },
      include: {
        member: { select: { stageName: true } },
        album: { select: { title: true } },
        event: { select: { title: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    // 2. 가상 파일 시스템 생성
    const root: FileSystemNode = {
      id: 'root',
      name: '내 그림',
      type: 'root',
      children: [
        { id: 'folder-members', name: 'Members', type: 'folder', children: [] },
        { id: 'folder-albums', name: 'Albums', type: 'folder', children: [] },
        { id: 'folder-events', name: 'Events', type: 'folder', children: [] },
        { id: 'folder-all', name: 'All Photos', type: 'folder', children: [] }
      ]
    };

    // 폴더 참조 가져오기
    const membersDir = root.children.find(c => c.name === 'Members')!;
    const albumsDir = root.children.find(c => c.name === 'Albums')!;
    const eventsDir = root.children.find(c => c.name === 'Events')!;
    const allDir = root.children.find(c => c.name === 'All Photos')!;

    // 3. 분류 로직
    medias.forEach(media => {
      const file: FileSystemNode = {
        id: media.id,
        name: media.title || `image_${media.id.slice(0, 6)}`, // 제목 없으면 ID로
        type: 'image',
        children: [],
        url: media.url,
        thumbnailUrl: media.thumbnailUrl || media.url,
        date: media.updatedAt,
        description: media.description,
        width: media.width,
        height: media.height
      };

      // 전체 보기에 추가
      allDir.children.push(file);

      // 멤버별 폴더
      if (media.member) {
        let folder = membersDir.children.find(f => f.name === media.member?.stageName);
        if (!folder) {
          folder = {
            id: `folder-member-${media.member.stageName}`,
            name: media.member.stageName,
            type: 'folder',
            children: []
          };
          membersDir.children.push(folder);
        }
        folder.children.push(file);
      }

      // 앨범별 폴더
      if (media.album) {
        let folder = albumsDir.children.find(f => f.name === media.album?.title);
        if (!folder) {
          folder = {
            id: `folder-album-${media.album.title}`,
            name: media.album.title,
            type: 'folder',
            children: []
          };
          albumsDir.children.push(folder);
        }
        folder.children.push(file);
      }

      // 이벤트별 폴더
      if (media.event) {
        let folder = eventsDir.children.find(f => f.name === media.event?.title);
        if (!folder) {
          folder = {
            id: `folder-event-${media.event.title}`,
            name: media.event.title,
            type: 'folder',
            children: []
          };
          eventsDir.children.push(folder);
        }
        folder.children.push(file);
      }
    });

    return NextResponse.json(root);

  } catch (error) {
    console.error('Gallery API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
  }
}