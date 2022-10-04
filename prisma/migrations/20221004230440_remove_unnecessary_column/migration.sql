/*
  Warnings:

  - You are about to drop the column `responseId` on the `FormUserResponse` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "FormUserResponse_responseId_key";

-- AlterTable
ALTER TABLE "FormUserResponse" DROP COLUMN "responseId";
