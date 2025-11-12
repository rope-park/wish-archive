-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('ALBUM_RELEASE', 'MUSIC_SHOW', 'CONCERT', 'VARIETY_SHOW', 'MERCH_DROP', 'OTHER');

-- CreateEnum
CREATE TYPE "AlbumType" AS ENUM ('SINGLE', 'MINI', 'FULL', 'OST');

-- CreateTable
CREATE TABLE "Era" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "description" TEXT,

    CONSTRAINT "Era_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "type" "AlbumType" NOT NULL,
    "coverUrl" TEXT,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "eraId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventOnAlbum" (
    "eventId" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,

    CONSTRAINT "EventOnAlbum_pkey" PRIMARY KEY ("eventId","albumId")
);

-- CreateIndex
CREATE INDEX "Album_releaseDate_idx" ON "Album"("releaseDate");

-- CreateIndex
CREATE INDEX "Event_date_idx" ON "Event"("date");

-- CreateIndex
CREATE INDEX "Event_type_idx" ON "Event"("type");

-- CreateIndex
CREATE INDEX "Event_eraId_idx" ON "Event"("eraId");

-- CreateIndex
CREATE INDEX "EventOnAlbum_albumId_idx" ON "EventOnAlbum"("albumId");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_eraId_fkey" FOREIGN KEY ("eraId") REFERENCES "Era"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOnAlbum" ADD CONSTRAINT "EventOnAlbum_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOnAlbum" ADD CONSTRAINT "EventOnAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
