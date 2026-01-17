/*
  Warnings:

  - You are about to drop the column `platform` on the `ExternalLink` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ExternalLinkType" AS ENUM ('OFFICIAL', 'SNS', 'NEWS', 'STREAMING', 'OTHER');

-- AlterEnum
ALTER TYPE "ContentType" ADD VALUE 'CONCEPT_FILM';

-- DropIndex
DROP INDEX "ExternalLink_platform_idx";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "time" TEXT;

-- AlterTable
ALTER TABLE "ExternalLink" DROP COLUMN "platform",
ADD COLUMN     "type" "ExternalLinkType";

-- CreateIndex
CREATE INDEX "ExternalLink_type_idx" ON "ExternalLink"("type");
