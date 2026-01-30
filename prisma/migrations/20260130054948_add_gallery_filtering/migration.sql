/*
  Warnings:

  - You are about to drop the column `height` on the `GalleryPost` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `GalleryPost` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `GalleryPost` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `GalleryPost` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `GalleryPost` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `GalleryPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalUrl` to the `GalleryPost` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GalleryCategory" AS ENUM ('OFFICIAL', 'BEHIND', 'SELFIE', 'PRESS', 'FAN', 'EVENT', 'OTHER');

-- DropForeignKey
ALTER TABLE "GalleryPost" DROP CONSTRAINT "GalleryPost_eventId_fkey";

-- AlterTable
ALTER TABLE "GalleryPost" DROP COLUMN "height",
DROP COLUMN "thumbnailUrl",
DROP COLUMN "type",
DROP COLUMN "url",
DROP COLUMN "width",
ADD COLUMN     "category" "GalleryCategory" NOT NULL DEFAULT 'EVENT',
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "originalUrl" TEXT NOT NULL,
ALTER COLUMN "eventId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_GalleryPostToMember" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_GalleryPostToMember_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_GalleryPostToMember_B_index" ON "_GalleryPostToMember"("B");

-- CreateIndex
CREATE INDEX "GalleryPost_category_idx" ON "GalleryPost"("category");

-- AddForeignKey
ALTER TABLE "GalleryPost" ADD CONSTRAINT "GalleryPost_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GalleryPostToMember" ADD CONSTRAINT "_GalleryPostToMember_A_fkey" FOREIGN KEY ("A") REFERENCES "GalleryPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GalleryPostToMember" ADD CONSTRAINT "_GalleryPostToMember_B_fkey" FOREIGN KEY ("B") REFERENCES "Member"("id") ON DELETE CASCADE ON UPDATE CASCADE;
