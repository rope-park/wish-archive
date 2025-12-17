-- CreateEnum
CREATE TYPE "PhotoCardSource" AS ENUM ('ALBUM', 'EVENT', 'COLLAB', 'OTHER');

-- AlterTable
ALTER TABLE "DigitalPhotoCard" ADD COLUMN     "eventId" TEXT,
ADD COLUMN     "sourceType" "PhotoCardSource" NOT NULL DEFAULT 'ALBUM';

-- AddForeignKey
ALTER TABLE "DigitalPhotoCard" ADD CONSTRAINT "DigitalPhotoCard_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
