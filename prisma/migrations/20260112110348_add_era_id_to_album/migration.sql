-- AlterEnum
ALTER TYPE "ContentType" ADD VALUE 'REACTION';

-- AlterEnum
ALTER TYPE "EventType" ADD VALUE 'EVENT';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ExternalLinkType" ADD VALUE 'TICKET';
ALTER TYPE "ExternalLinkType" ADD VALUE 'STORE';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Platform" ADD VALUE 'YOUTUBE_MUSIC';
ALTER TYPE "Platform" ADD VALUE 'LINE_MUSIC';

-- AlterEnum
ALTER TYPE "ProgramType" ADD VALUE 'WEB_CONTENT';

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "eraId" TEXT;

-- CreateIndex
CREATE INDEX "Album_releaseDate_market_idx" ON "Album"("releaseDate", "market");

-- CreateIndex
CREATE INDEX "Content_platform_publishedAt_idx" ON "Content"("platform", "publishedAt");

-- CreateIndex
CREATE INDEX "Content_isHighlight_idx" ON "Content"("isHighlight");

-- CreateIndex
CREATE INDEX "Event_type_date_idx" ON "Event"("type", "date");

-- CreateIndex
CREATE INDEX "Event_country_city_idx" ON "Event"("country", "city");

-- CreateIndex
CREATE INDEX "Event_milestone_idx" ON "Event"("milestone");

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_eraId_fkey" FOREIGN KEY ("eraId") REFERENCES "Era"("id") ON DELETE SET NULL ON UPDATE CASCADE;
