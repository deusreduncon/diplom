-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NEW', 'IN_PROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Application" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NEW';
