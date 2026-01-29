/*
  Warnings:

  - Made the column `type` on table `ExternalLink` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "LoreType" AS ENUM ('SYMBOL', 'THEORY', 'CONNECTION', 'OBJECT', 'EASTER_EGG');

-- CreateEnum
CREATE TYPE "LoreStatus" AS ENUM ('SOLVED', 'UNSOLVED', 'ONGOING', 'DEBUNKED');

-- AlterEnum
ALTER TYPE "EditionType" ADD VALUE 'OTHER';

-- DropForeignKey
ALTER TABLE "Appearance" DROP CONSTRAINT "Appearance_eventId_fkey";

-- DropIndex
DROP INDEX "Album_releaseDate_market_idx";

-- AlterTable
ALTER TABLE "ExternalLink" ALTER COLUMN "type" SET NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "specialVideoUrl" TEXT;

-- CreateTable
CREATE TABLE "Lore" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "LoreType" NOT NULL,
    "status" "LoreStatus" NOT NULL,
    "era" TEXT,
    "description" TEXT NOT NULL,
    "solution" TEXT,
    "thumbnailUrl" TEXT,
    "discoveryDate" TIMESTAMP(3),
    "solvedDate" TIMESTAMP(3),
    "tags" TEXT[],
    "relatedEventIds" TEXT[],
    "relatedMemberIds" TEXT[],
    "relatedAlbumIds" TEXT[],
    "submittedBy" TEXT,
    "isUserSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "isApproved" BOOLEAN NOT NULL DEFAULT false,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoreImage" (
    "id" TEXT NOT NULL,
    "loreId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "filter" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoreImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoreVideo" (
    "id" TEXT NOT NULL,
    "loreId" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "timestamp" TEXT,
    "caption" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoreVideo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Lore_type_idx" ON "Lore"("type");

-- CreateIndex
CREATE INDEX "Lore_status_idx" ON "Lore"("status");

-- CreateIndex
CREATE INDEX "Lore_era_idx" ON "Lore"("era");

-- CreateIndex
CREATE INDEX "Lore_isApproved_idx" ON "Lore"("isApproved");

-- CreateIndex
CREATE INDEX "LoreImage_loreId_idx" ON "LoreImage"("loreId");

-- CreateIndex
CREATE INDEX "LoreVideo_loreId_idx" ON "LoreVideo"("loreId");

-- AddForeignKey
ALTER TABLE "Appearance" ADD CONSTRAINT "Appearance_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoreImage" ADD CONSTRAINT "LoreImage_loreId_fkey" FOREIGN KEY ("loreId") REFERENCES "Lore"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoreVideo" ADD CONSTRAINT "LoreVideo_loreId_fkey" FOREIGN KEY ("loreId") REFERENCES "Lore"("id") ON DELETE CASCADE ON UPDATE CASCADE;
