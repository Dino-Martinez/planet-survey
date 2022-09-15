/*
  Warnings:

  - The `type` column on the `Input` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Input" DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'text';

-- DropEnum
DROP TYPE "Types";
