/*
  Warnings:

  - Made the column `formUserResponseId` on table `InputResponse` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "InputResponse" DROP CONSTRAINT "InputResponse_formUserResponseId_fkey";

-- AlterTable
ALTER TABLE "InputResponse" ALTER COLUMN "formUserResponseId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "InputResponse" ADD CONSTRAINT "InputResponse_formUserResponseId_fkey" FOREIGN KEY ("formUserResponseId") REFERENCES "FormUserResponse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
