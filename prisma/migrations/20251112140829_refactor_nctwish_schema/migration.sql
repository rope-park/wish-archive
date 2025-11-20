/*
  Warnings:

  - The values [ALBUM_RELEASE] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `type` on the `Album` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ReleaseType" AS ENUM ('STUDIO_ALBUM', 'MINI_ALBUM', 'SINGLE_ALBUM', 'DIGITAL_SINGLE', 'PARTICIPATION');

-- CreateEnum
CREATE TYPE "Market" AS ENUM ('KOREA', 'JAPAN', 'GLOBAL', 'OTHER');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('KOREAN', 'JAPANESE', 'ENGLISH', 'OTHER');

-- CreateEnum
CREATE TYPE "ProgramType" AS ENUM ('MUSIC_SHOW', 'VARIETY_SHOW', 'RADIO');

-- CreateEnum
CREATE TYPE "CertBody" AS ENUM ('RIAJ', 'KMCA');

-- CreateEnum
CREATE TYPE "CertLevel" AS ENUM ('GOLD', 'PLATINUM', 'DOUBLE_PLATINUM', 'MILLION');

-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('RELEASE', 'MUSIC_SHOW', 'CONCERT', 'TOUR', 'FANMEETING', 'SHOWCASE', 'VARIETY_SHOW', 'POPUP_STORE', 'AWARD_SHOW', 'CF_AD', 'MAGAZINE', 'ONLINE_CONTENT', 'MERCH_DROP', 'OTHER');
ALTER TABLE "Event" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "public"."EventType_old";
COMMIT;

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "catalogNumber" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "distributor" TEXT,
ADD COLUMN     "groupId" TEXT,
ADD COLUMN     "isOst" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPreDebut" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isPreRelease" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "label" TEXT,
ADD COLUMN     "market" "Market" NOT NULL DEFAULT 'KOREA',
ADD COLUMN     "primaryLanguage" "Language" NOT NULL DEFAULT 'KOREAN',
ADD COLUMN     "totalLengthSec" INTEGER,
ADD COLUMN     "trackCount" INTEGER,
DROP COLUMN "type",
ADD COLUMN     "type" "ReleaseType" NOT NULL;

-- AlterTable
ALTER TABLE "Era" ADD COLUMN     "color" TEXT,
ADD COLUMN     "groupId" TEXT;

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "programName" TEXT,
ADD COLUMN     "seriesName" TEXT,
ADD COLUMN     "tags" TEXT,
ADD COLUMN     "url" TEXT;

-- DropEnum
DROP TYPE "AlbumType";

-- CreateTable
CREATE TABLE "Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "nameKo" TEXT,
    "debutDate" TIMESTAMP(3),
    "formationDate" TIMESTAMP(3),
    "fandomName" TEXT,
    "officialColor" TEXT,
    "agency" TEXT,
    "label" TEXT,
    "distributors" TEXT,
    "genres" TEXT,
    "officialSiteUrl" TEXT,
    "snsLinks" TEXT,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "stageName" TEXT NOT NULL,
    "name" TEXT,
    "nameEn" TEXT,
    "birthDate" TIMESTAMP(3),
    "nationality" TEXT,
    "positions" TEXT,
    "emoji" TEXT,
    "ownNumber" INTEGER,
    "bloodType" TEXT,
    "joinDate" TIMESTAMP(3),
    "leaveDate" TIMESTAMP(3),
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "profileImageUrl" TEXT,
    "note" TEXT,
    "groupId" TEXT,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Track" (
    "id" TEXT NOT NULL,
    "albumId" TEXT NOT NULL,
    "trackNumber" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "durationSec" INTEGER,
    "language" "Language" NOT NULL DEFAULT 'KOREAN',
    "isTitle" BOOLEAN NOT NULL DEFAULT false,
    "isSingle" BOOLEAN NOT NULL DEFAULT false,
    "hasMv" BOOLEAN NOT NULL DEFAULT false,
    "mvUrl" TEXT,
    "audioUrl" TEXT,
    "note" TEXT,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MemberOnEvent" (
    "memberId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "role" TEXT,

    CONSTRAINT "MemberOnEvent_pkey" PRIMARY KEY ("memberId","eventId")
);

-- CreateTable
CREATE TABLE "Program" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "network" TEXT,
    "country" TEXT,
    "pType" "ProgramType" NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Program_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appearance" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "episode" TEXT,
    "notes" TEXT,
    "eventId" TEXT,
    "trackId" TEXT,

    CONSTRAINT "Appearance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chart" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "provider" TEXT,
    "country" TEXT,
    "notes" TEXT,

    CONSTRAINT "Chart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChartEntry" (
    "id" TEXT NOT NULL,
    "chartId" TEXT NOT NULL,
    "weekStart" TIMESTAMP(3) NOT NULL,
    "position" INTEGER NOT NULL,
    "albumId" TEXT,
    "trackId" TEXT,

    CONSTRAINT "ChartEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "body" "CertBody" NOT NULL,
    "level" "CertLevel" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "units" INTEGER,
    "albumId" TEXT,
    "trackId" TEXT,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Track_albumId_idx" ON "Track"("albumId");

-- CreateIndex
CREATE INDEX "Track_trackNumber_idx" ON "Track"("trackNumber");

-- CreateIndex
CREATE INDEX "MemberOnEvent_eventId_idx" ON "MemberOnEvent"("eventId");

-- CreateIndex
CREATE INDEX "Appearance_date_idx" ON "Appearance"("date");

-- CreateIndex
CREATE INDEX "Appearance_programId_idx" ON "Appearance"("programId");

-- CreateIndex
CREATE INDEX "Appearance_trackId_idx" ON "Appearance"("trackId");

-- CreateIndex
CREATE INDEX "ChartEntry_weekStart_idx" ON "ChartEntry"("weekStart");

-- CreateIndex
CREATE INDEX "ChartEntry_albumId_idx" ON "ChartEntry"("albumId");

-- CreateIndex
CREATE INDEX "ChartEntry_trackId_idx" ON "ChartEntry"("trackId");

-- CreateIndex
CREATE INDEX "Certification_body_level_date_idx" ON "Certification"("body", "level", "date");

-- CreateIndex
CREATE INDEX "Certification_albumId_idx" ON "Certification"("albumId");

-- CreateIndex
CREATE INDEX "Certification_trackId_idx" ON "Certification"("trackId");

-- CreateIndex
CREATE INDEX "Album_type_idx" ON "Album"("type");

-- CreateIndex
CREATE INDEX "Album_market_idx" ON "Album"("market");

-- CreateIndex
CREATE INDEX "Event_country_idx" ON "Event"("country");

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Era" ADD CONSTRAINT "Era_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOnEvent" ADD CONSTRAINT "MemberOnEvent_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberOnEvent" ADD CONSTRAINT "MemberOnEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appearance" ADD CONSTRAINT "Appearance_programId_fkey" FOREIGN KEY ("programId") REFERENCES "Program"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appearance" ADD CONSTRAINT "Appearance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appearance" ADD CONSTRAINT "Appearance_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartEntry" ADD CONSTRAINT "ChartEntry_chartId_fkey" FOREIGN KEY ("chartId") REFERENCES "Chart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartEntry" ADD CONSTRAINT "ChartEntry_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChartEntry" ADD CONSTRAINT "ChartEntry_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Certification" ADD CONSTRAINT "Certification_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
