-- AlterTable
ALTER TABLE "User" ADD COLUMN     "authEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "authSecret" TEXT;
