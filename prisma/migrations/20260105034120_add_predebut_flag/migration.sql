/*
  Warnings:

  - You are about to drop the column `isHighlighted` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `mainImageUrl` on the `Event` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "TrackLyric_trackId_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "isHighlighted",
DROP COLUMN "mainImageUrl",
ADD COLUMN     "isPreDebut" BOOLEAN NOT NULL DEFAULT false;
