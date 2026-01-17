/*
  Warnings:

  - The values [MV_TEASER,RECORDING_BEHIND,JACKET_BEHIND,PERFORMANCE_CLIP,POSTER] on the enum `ContentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MERCH_DROP] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `galleryAlbumId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `ExternalLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[eventId]` on the table `MusicShowTrophy` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `platform` on the `Content` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `platform` to the `ExternalLink` table without a default value. This is not possible if the table is not empty.
  - Added the required column `eventId` to the `MusicShowTrophy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `Program` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Platform" AS ENUM ('YOUTUBE', 'INSTAGRAM', 'X_TWITTER', 'TIKTOK', 'WEVERSE', 'FACEBOOK', 'WEIBO', 'BILIBILI', 'NAVER_TV', 'SPOTIFY', 'APPLE_MUSIC', 'AMAZON_MUSIC', 'MELON_MUSIC', 'GENIE_MUSIC', 'BUGS_MUSIC', 'FLO', 'VIBE', 'OFFICIAL_SITE', 'TICKET_LINK', 'INTERPARK', 'YES24', 'MELON_TICKET', 'ARTICLE', 'OTHER');

-- AlterEnum
BEGIN;
CREATE TYPE "ContentType_new" AS ENUM ('MV', 'TEASER', 'PERFORMANCE_VIDEO', 'DANCE_PRACTICE', 'BROADCAST_STAGE', 'OFFICIAL_CAM', 'FANCAM', 'WEB_VARIETY', 'VARIETY_CLIP', 'REALITY', 'VLOG', 'BEHIND', 'RECORDING', 'SHORTS', 'CHALLENGE', 'COVER', 'LIVE_STREAM', 'FAN_EDIT', 'INTERVIEW', 'UNBOXING', 'PLAYLIST', 'ANNOUNCEMENT', 'OTHER');
ALTER TABLE "Content" ALTER COLUMN "cType" TYPE "ContentType_new" USING ("cType"::text::"ContentType_new");
ALTER TYPE "ContentType" RENAME TO "ContentType_old";
ALTER TYPE "ContentType_new" RENAME TO "ContentType";
DROP TYPE "public"."ContentType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EditionType" ADD VALUE 'PHOTOBOOK';
ALTER TYPE "EditionType" ADD VALUE 'DIGIPACK';

-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('RELEASE', 'MUSIC_SHOW', 'CONCERT', 'TOUR', 'FESTIVAL', 'FANMEETING', 'FANSIGN', 'SHOWCASE', 'RADIO', 'VARIETY_SHOW', 'POPUP_STORE', 'AWARD_SHOW', 'CF_AD', 'MAGAZINE', 'BIRTHDAY', 'ANNIVERSARY', 'ONLINE_CONTENT', 'ANNOUNCEMENT', 'OTHER');
ALTER TABLE "Event" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TABLE "EventSeries" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "public"."EventType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ProgramType" ADD VALUE 'REALITY';
ALTER TYPE "ProgramType" ADD VALUE 'NEWS_INFO';

-- AlterEnum
ALTER TYPE "ReleaseType" ADD VALUE 'REPACKAGE';

-- DropForeignKey
ALTER TABLE "Appearance" DROP CONSTRAINT "Appearance_eventId_fkey";

-- DropIndex
DROP INDEX "ExternalLink_type_idx";

-- AlterTable
ALTER TABLE "Content" DROP COLUMN "platform",
ADD COLUMN     "platform" "Platform" NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "galleryAlbumId",
ADD COLUMN     "galleryFolderPath" TEXT,
ADD COLUMN     "milestone" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ExternalLink" DROP COLUMN "type",
ADD COLUMN     "platform" "Platform" NOT NULL;

-- AlterTable
ALTER TABLE "MusicShowTrophy" ADD COLUMN     "eventId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "aliases" TEXT[],
ADD COLUMN     "displayName" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ContentPlatform";

-- DropEnum
DROP TYPE "LinkType";

-- CreateIndex
CREATE INDEX "Content_platform_cType_idx" ON "Content"("platform", "cType");

-- CreateIndex
CREATE INDEX "ExternalLink_platform_idx" ON "ExternalLink"("platform");

-- CreateIndex
CREATE UNIQUE INDEX "MusicShowTrophy_eventId_key" ON "MusicShowTrophy"("eventId");

-- CreateIndex
CREATE INDEX "MusicShowTrophy_eventId_idx" ON "MusicShowTrophy"("eventId");

-- AddForeignKey
ALTER TABLE "Appearance" ADD CONSTRAINT "Appearance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicShowTrophy" ADD CONSTRAINT "MusicShowTrophy_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
