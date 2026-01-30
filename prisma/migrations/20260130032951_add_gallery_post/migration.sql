-- CreateTable
CREATE TABLE "GalleryPost" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "platform" "Platform" NOT NULL,
    "type" TEXT DEFAULT 'OFFICIAL',
    "caption" TEXT,
    "thumbnailUrl" TEXT,
    "width" INTEGER,
    "height" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GalleryPost_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GalleryPost_eventId_idx" ON "GalleryPost"("eventId");

-- CreateIndex
CREATE INDEX "GalleryPost_platform_idx" ON "GalleryPost"("platform");

-- AddForeignKey
ALTER TABLE "GalleryPost" ADD CONSTRAINT "GalleryPost_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
