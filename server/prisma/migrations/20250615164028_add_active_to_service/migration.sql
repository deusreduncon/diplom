/*
  Warnings:

  - You are about to drop the column `active` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `arrowColor` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `icon` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `iconBgColor` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Service` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Service_slug_key";

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "active",
DROP COLUMN "arrowColor",
DROP COLUMN "icon",
DROP COLUMN "iconBgColor",
DROP COLUMN "slug";
