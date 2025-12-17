-- AlterTable
ALTER TABLE "DigitalPhotoCard" ADD COLUMN     "albumId" TEXT;

-- AddForeignKey
ALTER TABLE "DigitalPhotoCard" ADD CONSTRAINT "DigitalPhotoCard_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE SET NULL ON UPDATE CASCADE;
