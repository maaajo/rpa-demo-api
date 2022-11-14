/*
  Warnings:

  - You are about to drop the column `createdByIp` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `expires` on the `RefreshToken` table. All the data in the column will be lost.
  - You are about to drop the column `revoked` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "createdByIp",
DROP COLUMN "expires",
DROP COLUMN "revoked",
ADD COLUMN     "revokedTime" TIMESTAMP(3),
ALTER COLUMN "revokedByIp" DROP NOT NULL,
ALTER COLUMN "replacedByToken" DROP NOT NULL,
ALTER COLUMN "isExpired" SET DEFAULT false,
ALTER COLUMN "isActive" SET DEFAULT true;
