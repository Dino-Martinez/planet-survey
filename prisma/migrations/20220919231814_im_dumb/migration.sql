/*
  Warnings:

  - You are about to drop the column `response` on the `Input` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Input" DROP COLUMN "response",
ADD COLUMN     "value" TEXT NOT NULL DEFAULT '';
