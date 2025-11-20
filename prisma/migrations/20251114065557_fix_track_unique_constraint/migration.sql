/*
  Warnings:

  - A unique constraint covering the columns `[albumId,trackNumber]` on the table `Track` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Track_trackNumber_key";

-- CreateIndex
CREATE UNIQUE INDEX "Track_albumId_trackNumber_key" ON "Track"("albumId", "trackNumber");
