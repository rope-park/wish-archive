/*
  Warnings:

  - The `editionType` column on the `AlbumEdition` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `Content` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `DigitalPhotoCard` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EditionType" AS ENUM ('CD', 'SMART_ALBUM', 'MUSIC_NFC_CD', 'QR_CARD');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ContentType" ADD VALUE 'POSTER';
ALTER TYPE "ContentType" ADD VALUE 'FANCAM';
ALTER TYPE "ContentType" ADD VALUE 'OFFICIAL_CAM';

-- DropForeignKey
ALTER TABLE "DigitalPhotoCard" DROP CONSTRAINT "DigitalPhotoCard_albumId_fkey";

-- DropForeignKey
ALTER TABLE "DigitalPhotoCard" DROP CONSTRAINT "DigitalPhotoCard_eventId_fkey";

-- DropForeignKey
ALTER TABLE "DigitalPhotoCard" DROP CONSTRAINT "DigitalPhotoCard_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_albumId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_appearanceId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_contentId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_groupId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_programId_fkey";

-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_trackId_fkey";

-- DropIndex (already dropped manually)
-- DROP INDEX "TrackLyric_trackId_key";

-- AlterTable
ALTER TABLE "AlbumEdition" DROP COLUMN "editionType",
ADD COLUMN     "editionType" "EditionType";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "tags",
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "DigitalPhotoCard";

-- DropTable
DROP TABLE "Media";

-- DropEnum
DROP TYPE "MediaType";

-- DropEnum
DROP TYPE "PhotoCardSource";

-- CreateTable
CREATE TABLE "_AppearanceToMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AppearanceToMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AppearanceToMember_B_index" ON "_AppearanceToMember"("B");

-- AddForeignKey
ALTER TABLE "_AppearanceToMember" ADD CONSTRAINT "_AppearanceToMember_A_fkey" FOREIGN KEY ("A") REFERENCES "Appearance"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppearanceToMember" ADD CONSTRAINT "_AppearanceToMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
