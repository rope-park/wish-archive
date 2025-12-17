/*
  Warnings:

  - You are about to drop the column `catalogNumber` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `coverUrl` on the `Album` table. All the data in the column will be lost.
  - You are about to drop the column `themeIcon` on the `Album` table. All the data in the column will be lost.
  - The primary key for the `AlbumCredit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `priceAmount` on the `AlbumEdition` table. All the data in the column will be lost.
  - You are about to drop the column `priceCurrency` on the `AlbumEdition` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `AlbumEdition` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `Appearance` table. All the data in the column will be lost.
  - You are about to drop the column `awardedAt` on the `AwardWin` table. All the data in the column will be lost.
  - You are about to drop the column `position` on the `ChartEntry` table. All the data in the column will be lost.
  - You are about to drop the column `weekStart` on the `ChartEntry` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `CheeringGuide` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Contributor` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Contributor` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Era` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `EventSeries` table. All the data in the column will be lost.
  - You are about to drop the column `locale` on the `ExternalLink` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `ExternalLink` table. All the data in the column will be lost.
  - You are about to drop the column `leaveDate` on the `Member` table. All the data in the column will be lost.
  - You are about to drop the column `note` on the `Member` table. All the data in the column will be lost.
  - The primary key for the `TrackCredit` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `role` on the `TrackCredit` table. All the data in the column will be lost.
  - You are about to drop the column `lrc` on the `TrackLyric` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `TrackLyric` table. All the data in the column will be lost.
  - You are about to drop the column `sections` on the `TrackLyric` table. All the data in the column will be lost.
  - You are about to drop the column `sourceUrl` on the `TrackLyric` table. All the data in the column will be lost.
  - You are about to drop the column `versionTag` on the `TrackLyric` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[albumId,date,provider]` on the table `AlbumDailySales` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,provider,periodType]` on the table `Chart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[mainAlbumId]` on the table `Era` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trackId,language,script]` on the table `TrackLyric` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `date` to the `ChartEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rank` to the `ChartEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `CreditRole` to the `TrackCredit` table without a default value. This is not possible if the table is not empty.
  - Made the column `text` on table `TrackLyric` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LinkType" ADD VALUE 'AMAZON_MUSIC';
ALTER TYPE "LinkType" ADD VALUE 'GENIE_MUSIC';
ALTER TYPE "LinkType" ADD VALUE 'BUGS_MUSIC';

-- DropIndex
DROP INDEX "AlbumDailySales_albumId_date_idx";

-- DropIndex
DROP INDEX "AlbumDailySales_albumId_date_key";

-- DropIndex
DROP INDEX "Certification_body_level_date_idx";

-- DropIndex
DROP INDEX "Certification_trackId_idx";

-- DropIndex
DROP INDEX "Chart_name_provider_key";

-- DropIndex
DROP INDEX "ChartEntry_albumId_idx";

-- DropIndex
DROP INDEX "ChartEntry_weekStart_idx";

-- DropIndex
DROP INDEX "Content_appearanceId_idx";

-- DropIndex
DROP INDEX "Content_programId_idx";

-- DropIndex
DROP INDEX "Content_trackId_idx";

-- DropIndex
DROP INDEX "ExternalLink_albumId_idx";

-- DropIndex
DROP INDEX "ExternalLink_contentId_idx";

-- DropIndex
DROP INDEX "ExternalLink_eventId_idx";

-- DropIndex
DROP INDEX "ExternalLink_memberId_idx";

-- DropIndex
DROP INDEX "ExternalLink_programId_idx";

-- DropIndex
DROP INDEX "ExternalLink_trackId_idx";

-- DropIndex
DROP INDEX "ExternalLink_url_key";

-- DropIndex
DROP INDEX "Media_appearanceId_idx";

-- DropIndex
DROP INDEX "Media_programId_idx";

-- DropIndex
DROP INDEX "Media_trackId_idx";

-- DropIndex
DROP INDEX "TrackLyric_trackId_language_script_versionTag_key";

-- AlterTable
ALTER TABLE "Album" DROP COLUMN "catalogNumber",
DROP COLUMN "coverUrl",
DROP COLUMN "themeIcon",
ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "diskImageUrl" TEXT,
ADD COLUMN     "vinylImageUrl" TEXT;

-- AlterTable
ALTER TABLE "AlbumCredit" DROP CONSTRAINT "AlbumCredit_pkey",
ADD COLUMN     "detail" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "AlbumCredit_pkey" PRIMARY KEY ("albumId", "contributorId");

-- AlterTable
ALTER TABLE "AlbumDailySales" ADD COLUMN     "daySequence" INTEGER,
ADD COLUMN     "provider" TEXT,
ADD COLUMN     "totalUnits" INTEGER;

-- AlterTable
ALTER TABLE "AlbumEdition" DROP COLUMN "priceAmount",
DROP COLUMN "priceCurrency",
DROP COLUMN "url",
ADD COLUMN     "coverImageUrl" TEXT,
ADD COLUMN     "currency" "Currency",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "editionType" TEXT,
ADD COLUMN     "memberId" TEXT,
ADD COLUMN     "packageImageUrl" TEXT,
ADD COLUMN     "purchaseUrl" TEXT,
ADD COLUMN     "releasePrice" INTEGER;

-- AlterTable
ALTER TABLE "Appearance" DROP COLUMN "notes",
ADD COLUMN     "isPerformance" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "note" TEXT,
ADD COLUMN     "role" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "AwardCategory" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'OTHER';

-- AlterTable
ALTER TABLE "AwardEvent" ADD COLUMN     "edition" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "posterUrl" TEXT;

-- AlterTable
ALTER TABLE "AwardOrganization" ADD COLUMN     "abbreviation" TEXT,
ADD COLUMN     "logoUrl" TEXT;

-- AlterTable
ALTER TABLE "AwardWin" DROP COLUMN "awardedAt",
ADD COLUMN     "memberId" TEXT,
ADD COLUMN     "sceneImageUrl" TEXT,
ADD COLUMN     "speechUrl" TEXT;

-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "badgeImageUrl" TEXT;

-- AlterTable
ALTER TABLE "Chart" ADD COLUMN     "colorCode" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "officialUrl" TEXT,
ADD COLUMN     "periodType" TEXT NOT NULL DEFAULT 'WEEKLY';

-- AlterTable
ALTER TABLE "ChartEntry" DROP COLUMN "position",
DROP COLUMN "weekStart",
ADD COLUMN     "change" INTEGER,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "isNew" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rank" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CheeringGuide" DROP COLUMN "notes",
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "title" TEXT,
ADD COLUMN     "videoUrl" TEXT;

-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "isHighlight" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "thumbnailUrl" TEXT;

-- AlterTable
ALTER TABLE "Contributor" DROP COLUMN "country",
DROP COLUMN "note",
ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Era" DROP COLUMN "color",
ADD COLUMN     "backgroundUrl" TEXT,
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "mainAlbumId" TEXT,
ADD COLUMN     "themeColor" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "tags",
DROP COLUMN "url",
ADD COLUMN     "galleryAlbumId" TEXT,
ADD COLUMN     "isHighlighted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mainImageUrl" TEXT,
ADD COLUMN     "programId" TEXT,
ADD COLUMN     "relatedUrl" TEXT,
ADD COLUMN     "ticketUrl" TEXT;

-- AlterTable
ALTER TABLE "EventSeries" DROP COLUMN "notes",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "posterUrl" TEXT;

-- AlterTable
ALTER TABLE "ExternalLink" DROP COLUMN "locale",
DROP COLUMN "notes",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "iconUrl" TEXT,
ADD COLUMN     "isOfficial" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "description" TEXT,
ADD COLUMN     "iconUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "nameJa" TEXT;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "fileSize" INTEGER,
ADD COLUMN     "height" INTEGER,
ADD COLUMN     "isMain" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "thumbnailUrl" TEXT,
ADD COLUMN     "width" INTEGER;

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "leaveDate",
DROP COLUMN "note",
ADD COLUMN     "characterUrl" TEXT,
ADD COLUMN     "colorCode" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "mbti" TEXT,
ALTER COLUMN "ownNumber" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "MemberOnContent" ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "MemberOnEvent" ADD COLUMN     "isAbsent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "note" TEXT;

-- AlterTable
ALTER TABLE "MusicShowTrophy" ADD COLUMN     "score" INTEGER;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "airTime" TEXT,
ADD COLUMN     "dayOfWeek" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "officialUrl" TEXT;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "genre" TEXT,
ADD COLUMN     "themeColor" TEXT;

-- AlterTable
ALTER TABLE "TrackCredit" DROP CONSTRAINT "TrackCredit_pkey",
DROP COLUMN "role",
ADD COLUMN     "CreditRole" "CreditRole" NOT NULL,
ADD COLUMN     "detail" TEXT,
ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0,
ADD CONSTRAINT "TrackCredit_pkey" PRIMARY KEY ("trackId", "contributorId");

-- AlterTable
ALTER TABLE "TrackLyric" DROP COLUMN "lrc",
DROP COLUMN "notes",
DROP COLUMN "sections",
DROP COLUMN "sourceUrl",
DROP COLUMN "versionTag",
ADD COLUMN     "lrcContent" TEXT,
ALTER COLUMN "text" SET NOT NULL;

-- CreateTable
CREATE TABLE "Quote" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wish" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "nickname" TEXT,
    "password" TEXT,
    "color" TEXT NOT NULL,
    "posX" DOUBLE PRECISION,
    "posY" DOUBLE PRECISION,
    "rotation" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Wish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DigitalPhotoCard" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "backUrl" TEXT,
    "rarity" TEXT NOT NULL DEFAULT 'COMMON',
    "memberId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DigitalPhotoCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaylistTrack" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "artist" TEXT NOT NULL DEFAULT 'NCT WISH',
    "youtubeId" TEXT NOT NULL,
    "trackId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlaylistTrack_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AlbumDailySales_albumId_idx" ON "AlbumDailySales"("albumId");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumDailySales_albumId_date_provider_key" ON "AlbumDailySales"("albumId", "date", "provider");

-- CreateIndex
CREATE INDEX "AlbumEdition_memberId_idx" ON "AlbumEdition"("memberId");

-- CreateIndex
CREATE INDEX "Certification_body_level_idx" ON "Certification"("body", "level");

-- CreateIndex
CREATE UNIQUE INDEX "Chart_name_provider_periodType_key" ON "Chart"("name", "provider", "periodType");

-- CreateIndex
CREATE INDEX "ChartEntry_date_idx" ON "ChartEntry"("date");

-- CreateIndex
CREATE INDEX "ChartEntry_chartId_idx" ON "ChartEntry"("chartId");

-- CreateIndex
CREATE INDEX "Content_publishedAt_idx" ON "Content"("publishedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Era_mainAlbumId_key" ON "Era"("mainAlbumId");

-- CreateIndex
CREATE INDEX "ExternalLink_type_idx" ON "ExternalLink"("type");

-- CreateIndex
CREATE INDEX "ExternalLink_order_idx" ON "ExternalLink"("order");

-- CreateIndex
CREATE UNIQUE INDEX "TrackLyric_trackId_language_script_key" ON "TrackLyric"("trackId", "language", "script");

-- AddForeignKey
ALTER TABLE "AlbumEdition" ADD CONSTRAINT "AlbumEdition_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Era" ADD CONSTRAINT "Era_mainAlbumId_fkey" FOREIGN KEY ("mainAlbumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWin" ADD CONSTRAINT "AwardWin_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quote" ADD CONSTRAINT "Quote_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DigitalPhotoCard" ADD CONSTRAINT "DigitalPhotoCard_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;
