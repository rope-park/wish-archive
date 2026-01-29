/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Lore` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "ContentType" ADD VALUE 'CHEERING_GUIDE';

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'INTERVIEW';
ALTER TYPE "EventType" ADD VALUE 'COLLABORATION';

-- AlterEnum
ALTER TYPE "LoreType" ADD VALUE 'CONCEPT';

-- CreateTable
CREATE TABLE "WishMessage" (
    "id" TEXT NOT NULL,
    "authorName" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "message" TEXT NOT NULL,
    "targetMember" TEXT,
    "craneColor" TEXT NOT NULL DEFAULT '#FFB6C1',
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WishMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "WishMessage_targetMember_idx" ON "WishMessage"("targetMember");

-- CreateIndex
CREATE INDEX "WishMessage_createdAt_idx" ON "WishMessage"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Lore_title_key" ON "Lore"("title");
