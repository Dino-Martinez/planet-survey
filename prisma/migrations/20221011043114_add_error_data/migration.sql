/*
  Warnings:

  - Added the required column `code` to the `ErrorLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ErrorLog" ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "stack" TEXT;
