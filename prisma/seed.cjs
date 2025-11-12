// prisma/seed.cjs
async function main() {
  const { PrismaClient, AlbumType, EventType } = await import('@prisma/client');
  const prisma = new PrismaClient();

  try {
    // Era 하나 생성
    const debutEra = await prisma.era.create({
      data: {
        name: 'Debut Era',
        startDate: new Date('2025-02-01'),
        description: 'NCT WISH 데뷔 시기',
      },
    });

    // 앨범 하나 생성
    const debutAlbum = await prisma.album.create({
      data: {
        title: '1st Mini Album',
        releaseDate: new Date('2025-02-01'),
        type: AlbumType.MINI,
        coverUrl: null,
      },
    });

    // 이벤트(앨범 발매) 생성
    const albumReleaseEvent = await prisma.event.create({
      data: {
        type: EventType.ALBUM_RELEASE,
        date: new Date('2025-02-01'),
        title: '1st Mini Album 발매',
        description: 'NCT WISH 첫 미니 앨범 발매',
        eraId: debutEra.id,
      },
    });

    // Event ↔ Album 연결
    await prisma.eventOnAlbum.create({
      data: {
        eventId: albumReleaseEvent.id,
        albumId: debutAlbum.id,
      },
    });

    console.log('Seed 완료 ✅');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
