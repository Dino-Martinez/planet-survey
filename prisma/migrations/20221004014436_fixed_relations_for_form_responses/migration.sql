/*
  Warnings:

  - A unique constraint covering the columns `[responseId]` on the table `FormUserResponse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `responseId` to the `FormUserResponse` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_formUserResponseId_fkey";

-- AlterTable
ALTER TABLE "FormUserResponse" ADD COLUMN     "responseId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "FormUserResponse_responseId_key" ON "FormUserResponse"("responseId");

-- AddForeignKey
ALTER TABLE "FormUserResponse" ADD CONSTRAINT "FormUserResponse_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
