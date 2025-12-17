/*
  Warnings:

  - You are about to drop the column `isPreRelease` on the `Album` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Track_trackNumber_idx";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "isPreRelease";

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "isPreRelease" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "releaseDate" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "AlbumRelease" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "market" "Market" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "format" TEXT NOT NULL DEFAULT 'PHYSICAL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlbumRelease_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AlbumRelease_albumId_idx" ON "AlbumRelease"("albumId");

-- CreateIndex
CREATE INDEX "AlbumRelease_date_idx" ON "AlbumRelease"("date");

-- AddForeignKey
ALTER TABLE "AlbumRelease" ADD CONSTRAINT "AlbumRelease_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
