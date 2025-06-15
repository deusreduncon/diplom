/*
  Warnings:

  - You are about to drop the column `active` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Service` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `arrowColor` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iconBgColor` to the `Service` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "active",
DROP COLUMN "createdAt",
DROP COLUMN "price",
ADD COLUMN     "arrowColor" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "iconBgColor" TEXT NOT NULL,
ADD COLUMN     "items" TEXT[],
ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
