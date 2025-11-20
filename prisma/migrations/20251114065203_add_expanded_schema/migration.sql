/*
  Warnings:

  - The values [OTHER] on the enum `Market` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `seriesName` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `distributors` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `genres` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `officialSiteUrl` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `snsLinks` on the `Group` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Album` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,provider]` on the table `Chart` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId,stageName]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,country]` on the table `Program` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[trackNumber]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Album` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Appearance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Certification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Chart` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ChartEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Era` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Made the column `groupId` on table `Member` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `Program` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LinkType" AS ENUM ('OFFICIAL_SITE', 'YOUTUBE', 'X_TWITTER', 'INSTAGRAM', 'TIKTOK', 'NAVER_TV', 'SPOTIFY', 'APPLE_MUSIC', 'MELON_MUSIC', 'FACEBOOK', 'WEIBO', 'BILIBILI', 'WEVERSE', 'ARTICLE', 'OTHER');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'MV', 'TEASER', 'DANCE_PRACTICE', 'PERFORMANCE', 'RECORDING_BEHIND', 'POSTER', 'OTHER');

-- CreateEnum
CREATE TYPE "CreditRole" AS ENUM ('LYRICS', 'COMPOSER', 'ARRANGER', 'PRODUCER', 'DIRECTOR', 'PHOTOGRAPHER', 'CHOREOGRAPHER', 'OTHER');

-- CreateEnum
CREATE TYPE "ContentPlatform" AS ENUM ('YOUTUBE', 'WEVERSE', 'NAVER_TV', 'INSTAGRAM', 'X_TWITTER', 'TIKTOK', 'BILIBILI', 'FACEBOOK', 'OFFICIAL_SITE', 'OTHER');

-- CreateEnum
CREATE TYPE "ContentType" AS ENUM ('MV', 'MV_TEASER', 'DANCE_PRACTICE', 'RECORDING_BEHIND', 'JACKET_BEHIND', 'BEHIND', 'LIVE_STREAM', 'SHORTS', 'CHALLENGE', 'INTERVIEW', 'VARIETY_CLIP', 'PERFORMANCE_CLIP', 'UNBOXING', 'ANNOUNCEMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "ScriptType" AS ENUM ('NATIVE', 'ROMANTIZED', 'TRANSLATION');

-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('KRW', 'JPY', 'USD', 'EUR');

-- AlterEnum
BEGIN;
CREATE TYPE "Market_new" AS ENUM ('KOREA', 'JAPAN', 'GLOBAL');
ALTER TABLE "public"."Album" ALTER COLUMN "market" DROP DEFAULT;
ALTER TABLE "Album" ALTER COLUMN "market" TYPE "Market_new" USING ("market"::text::"Market_new");
ALTER TYPE "Market" RENAME TO "Market_old";
ALTER TYPE "Market_new" RENAME TO "Market";
DROP TYPE "public"."Market_old";
ALTER TABLE "Album" ALTER COLUMN "market" SET DEFAULT 'KOREA';
COMMIT;

-- DropForeignKey
ALTER TABLE "EventOnAlbum" DROP CONSTRAINT "EventOnAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "EventOnAlbum" DROP CONSTRAINT "EventOnAlbum_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Member" DROP CONSTRAINT "Member_groupId_fkey";

-- DropForeignKey
ALTER TABLE "MemberOnEvent" DROP CONSTRAINT "MemberOnEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "MemberOnEvent" DROP CONSTRAINT "MemberOnEvent_memberId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_albumId_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "slug" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Appearance" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Certification" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Chart" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "ChartEntry" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Era" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "seriesName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "endDate" TIMESTAMP(3),
ADD COLUMN     "seriesId" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Group" DROP COLUMN "distributors",
DROP COLUMN "genres",
DROP COLUMN "officialSiteUrl",
DROP COLUMN "snsLinks",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hometown" TEXT,
ADD COLUMN     "nameHanja" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "groupId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Program" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "originalTrackId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "AlbumEdition" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sku" TEXT,
    "isLimited" BOOLEAN NOT NULL DEFAULT false,
    "priceAmount" INTEGER,
    "priceCurrency" "Currency",
    "components" JSONB,
    "url" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlbumEdition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackLyric" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "language" "Language" NOT NULL DEFAULT 'KOREAN',
    "script" "ScriptType" NOT NULL DEFAULT 'NATIVE',
    "versionTag" TEXT NOT NULL DEFAULT 'canonical',
    "isOfficial" BOOLEAN NOT NULL DEFAULT false,
    "provider" TEXT,
    "sourceUrl" TEXT,
    "copyright" TEXT,
    "text" TEXT,
    "lrc" JSONB,
    "sections" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TrackLyric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheeringGuide" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "isOfficial" BOOLEAN NOT NULL DEFAULT false,
    "provider" TEXT,
    "sourceUrl" TEXT,
    "text" TEXT,
    "steps" JSONB,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CheeringGuide_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSeries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "EventType" NOT NULL,
    "organizer" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventSeries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MusicShowTrophy" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "trackId" TEXT,
    "isTripleCrown" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MusicShowTrophy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlbumDailySales" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "units" INTEGER NOT NULL,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AlbumDailySales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contributor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "alias" TEXT,
    "country" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackCredit" (
    "trackId" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "role" "CreditRole" NOT NULL,

    CONSTRAINT "TrackCredit_pkey" PRIMARY KEY ("trackId","contributorId","role")
);

-- CreateTable
CREATE TABLE "AlbumCredit" (
    "albumId" TEXT NOT NULL,
    "contributorId" TEXT NOT NULL,
    "role" "CreditRole" NOT NULL,

    CONSTRAINT "AlbumCredit_pkey" PRIMARY KEY ("albumId","contributorId","role")
);

-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "platform" "ContentPlatform" NOT NULL,
    "cType" "ContentType" NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "channelName" TEXT,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "groupId" TEXT,
    "albumId" TEXT,
    "trackId" TEXT,
    "programId" TEXT,
    "eventId" TEXT,
    "appearanceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberOnContent" (
    "memberId" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "MemberOnContent_pkey" PRIMARY KEY ("memberId","contentId")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "mType" "MediaType" NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "groupId" TEXT,
    "memberId" TEXT,
    "albumId" TEXT,
    "trackId" TEXT,
    "programId" TEXT,
    "eventId" TEXT,
    "contentId" TEXT,
    "appearanceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoStat" (
    "id" TEXT NOT NULL,
    "contentId" TEXT NOT NULL,
    "snapshotAt" TIMESTAMP(3) NOT NULL,
    "viewCount" BIGINT NOT NULL,
    "likeCount" BIGINT,
    "commentCount" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoStat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwardOrganization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AwardOrganization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwardEvent" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "heldAt" TIMESTAMP(3),
    "location" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AwardEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwardCategory" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AwardCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AwardWin" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "eventId" TEXT,
    "groupId" TEXT,
    "albumId" TEXT,
    "trackId" TEXT,
    "awardedAt" TIMESTAMP(3),
    "isJoint" BOOLEAN NOT NULL DEFAULT false,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AwardWin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalLink" (
    "id" TEXT NOT NULL,
    "type" "LinkType" NOT NULL,
    "title" TEXT,
    "url" TEXT NOT NULL,
    "locale" TEXT,
    "notes" TEXT,
    "groupId" TEXT,
    "memberId" TEXT,
    "albumId" TEXT,
    "trackId" TEXT,
    "programId" TEXT,
    "eventId" TEXT,
    "contentId" TEXT,
    "contributorId" TEXT,
    "appearanceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExternalLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "AlbumEdition_albumId_idx" ON "AlbumEdition"("albumId");

-- CreateIndex
CREATE INDEX "AlbumEdition_name_idx" ON "AlbumEdition"("name");

-- CreateIndex
CREATE UNIQUE INDEX "TrackLyric_trackId_key" ON "TrackLyric"("trackId");

-- CreateIndex
CREATE INDEX "TrackLyric_trackId_language_idx" ON "TrackLyric"("trackId", "language");

-- CreateIndex
CREATE UNIQUE INDEX "TrackLyric_trackId_language_script_versionTag_key" ON "TrackLyric"("trackId", "language", "script", "versionTag");

-- CreateIndex
CREATE UNIQUE INDEX "CheeringGuide_trackId_key" ON "CheeringGuide"("trackId");

-- CreateIndex
CREATE INDEX "CheeringGuide_trackId_idx" ON "CheeringGuide"("trackId");

-- CreateIndex
CREATE INDEX "EventSeries_type_idx" ON "EventSeries"("type");

-- CreateIndex
CREATE INDEX "EventSeries_name_idx" ON "EventSeries"("name");

-- CreateIndex
CREATE INDEX "MusicShowTrophy_programId_date_idx" ON "MusicShowTrophy"("programId", "date");

-- CreateIndex
CREATE INDEX "MusicShowTrophy_trackId_idx" ON "MusicShowTrophy"("trackId");

-- CreateIndex
CREATE INDEX "AlbumDailySales_albumId_date_idx" ON "AlbumDailySales"("albumId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "AlbumDailySales_albumId_date_key" ON "AlbumDailySales"("albumId", "date");

-- CreateIndex
CREATE INDEX "Contributor_name_idx" ON "Contributor"("name");

-- CreateIndex
CREATE INDEX "TrackCredit_contributorId_idx" ON "TrackCredit"("contributorId");

-- CreateIndex
CREATE INDEX "AlbumCredit_contributorId_idx" ON "AlbumCredit"("contributorId");

-- CreateIndex
CREATE UNIQUE INDEX "Content_url_key" ON "Content"("url");

-- CreateIndex
CREATE INDEX "Content_platform_cType_idx" ON "Content"("platform", "cType");

-- CreateIndex
CREATE INDEX "Content_albumId_idx" ON "Content"("albumId");

-- CreateIndex
CREATE INDEX "Content_trackId_idx" ON "Content"("trackId");

-- CreateIndex
CREATE INDEX "Content_programId_idx" ON "Content"("programId");

-- CreateIndex
CREATE INDEX "Content_eventId_idx" ON "Content"("eventId");

-- CreateIndex
CREATE INDEX "Content_appearanceId_idx" ON "Content"("appearanceId");

-- CreateIndex
CREATE INDEX "MemberOnContent_contentId_idx" ON "MemberOnContent"("contentId");

-- CreateIndex
CREATE INDEX "Media_albumId_idx" ON "Media"("albumId");

-- CreateIndex
CREATE INDEX "Media_trackId_idx" ON "Media"("trackId");

-- CreateIndex
CREATE INDEX "Media_programId_idx" ON "Media"("programId");

-- CreateIndex
CREATE INDEX "Media_eventId_idx" ON "Media"("eventId");

-- CreateIndex
CREATE INDEX "Media_contentId_idx" ON "Media"("contentId");

-- CreateIndex
CREATE INDEX "Media_appearanceId_idx" ON "Media"("appearanceId");

-- CreateIndex
CREATE INDEX "VideoStat_contentId_snapshotAt_idx" ON "VideoStat"("contentId", "snapshotAt");

-- CreateIndex
CREATE UNIQUE INDEX "VideoStat_contentId_snapshotAt_key" ON "VideoStat"("contentId", "snapshotAt");

-- CreateIndex
CREATE INDEX "AwardOrganization_name_idx" ON "AwardOrganization"("name");

-- CreateIndex
CREATE INDEX "AwardEvent_organizationId_idx" ON "AwardEvent"("organizationId");

-- CreateIndex
CREATE INDEX "AwardEvent_heldAt_idx" ON "AwardEvent"("heldAt");

-- CreateIndex
CREATE INDEX "AwardCategory_eventId_idx" ON "AwardCategory"("eventId");

-- CreateIndex
CREATE INDEX "AwardCategory_name_idx" ON "AwardCategory"("name");

-- CreateIndex
CREATE INDEX "AwardWin_categoryId_idx" ON "AwardWin"("categoryId");

-- CreateIndex
CREATE INDEX "AwardWin_eventId_idx" ON "AwardWin"("eventId");

-- CreateIndex
CREATE INDEX "AwardWin_groupId_idx" ON "AwardWin"("groupId");

-- CreateIndex
CREATE INDEX "AwardWin_albumId_idx" ON "AwardWin"("albumId");

-- CreateIndex
CREATE INDEX "AwardWin_trackId_idx" ON "AwardWin"("trackId");

-- CreateIndex
CREATE UNIQUE INDEX "ExternalLink_url_key" ON "ExternalLink"("url");

-- CreateIndex
CREATE INDEX "ExternalLink_groupId_idx" ON "ExternalLink"("groupId");

-- CreateIndex
CREATE INDEX "ExternalLink_memberId_idx" ON "ExternalLink"("memberId");

-- CreateIndex
CREATE INDEX "ExternalLink_albumId_idx" ON "ExternalLink"("albumId");

-- CreateIndex
CREATE INDEX "ExternalLink_trackId_idx" ON "ExternalLink"("trackId");

-- CreateIndex
CREATE INDEX "ExternalLink_programId_idx" ON "ExternalLink"("programId");

-- CreateIndex
CREATE INDEX "ExternalLink_eventId_idx" ON "ExternalLink"("eventId");

-- CreateIndex
CREATE INDEX "ExternalLink_contentId_idx" ON "ExternalLink"("contentId");

-- CreateIndex
CREATE UNIQUE INDEX "Album_slug_key" ON "Album"("slug");

-- CreateIndex
CREATE INDEX "Chart_name_idx" ON "Chart"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Chart_name_provider_key" ON "Chart"("name", "provider");

-- CreateIndex
CREATE INDEX "Event_startDate_endDate_idx" ON "Event"("startDate", "endDate");

-- CreateIndex
CREATE INDEX "Event_seriesId_idx" ON "Event"("seriesId");

-- CreateIndex
CREATE UNIQUE INDEX "Group_slug_key" ON "Group"("slug");

-- CreateIndex
CREATE INDEX "Member_groupId_idx" ON "Member"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Member_groupId_stageName_key" ON "Member"("groupId", "stageName");

-- CreateIndex
CREATE INDEX "Program_pType_idx" ON "Program"("pType");

-- CreateIndex
CREATE UNIQUE INDEX "Program_name_country_key" ON "Program"("name", "country");

-- CreateIndex
CREATE UNIQUE INDEX "Track_trackNumber_key" ON "Track"("trackNumber");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumEdition" ADD CONSTRAINT "AlbumEdition_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_originalTrackId_fkey" FOREIGN KEY ("originalTrackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackLyric" ADD CONSTRAINT "TrackLyric_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheeringGuide" ADD CONSTRAINT "CheeringGuide_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "EventSeries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOnAlbum" ADD CONSTRAINT "EventOnAlbum_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventOnAlbum" ADD CONSTRAINT "EventOnAlbum_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOnEvent" ADD CONSTRAINT "MemberOnEvent_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOnEvent" ADD CONSTRAINT "MemberOnEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicShowTrophy" ADD CONSTRAINT "MusicShowTrophy_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MusicShowTrophy" ADD CONSTRAINT "MusicShowTrophy_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumDailySales" ADD CONSTRAINT "AlbumDailySales_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackCredit" ADD CONSTRAINT "TrackCredit_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrackCredit" ADD CONSTRAINT "TrackCredit_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumCredit" ADD CONSTRAINT "AlbumCredit_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumCredit" ADD CONSTRAINT "AlbumCredit_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Content" ADD CONSTRAINT "Content_appearanceId_fkey" FOREIGN KEY ("appearanceId") REFERENCES "Appearance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOnContent" ADD CONSTRAINT "MemberOnContent_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOnContent" ADD CONSTRAINT "MemberOnContent_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_appearanceId_fkey" FOREIGN KEY ("appearanceId") REFERENCES "Appearance"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoStat" ADD CONSTRAINT "VideoStat_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardEvent" ADD CONSTRAINT "AwardEvent_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "AwardOrganization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardCategory" ADD CONSTRAINT "AwardCategory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "AwardEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWin" ADD CONSTRAINT "AwardWin_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "AwardCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWin" ADD CONSTRAINT "AwardWin_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "AwardEvent"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWin" ADD CONSTRAINT "AwardWin_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWin" ADD CONSTRAINT "AwardWin_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AwardWin" ADD CONSTRAINT "AwardWin_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_contentId_fkey" FOREIGN KEY ("contentId") REFERENCES "Content"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_contributorId_fkey" FOREIGN KEY ("contributorId") REFERENCES "Contributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalLink" ADD CONSTRAINT "ExternalLink_appearanceId_fkey" FOREIGN KEY ("appearanceId") REFERENCES "Appearance"("id") ON DELETE SET NULL ON UPDATE CASCADE;
