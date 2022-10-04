/*
  Warnings:

  - You are about to drop the column `formId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Response` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_formId_fkey";

-- DropForeignKey
ALTER TABLE "Response" DROP CONSTRAINT "Response_userId_fkey";

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "formId",
DROP COLUMN "userId",
ADD COLUMN     "formUserResponseId" TEXT;

-- CreateTable
CREATE TABLE "FormUserResponse" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FormUserResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormUserResponse" ADD CONSTRAINT "FormUserResponse_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormUserResponse" ADD CONSTRAINT "FormUserResponse_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formUserResponseId_fkey" FOREIGN KEY ("formUserResponseId") REFERENCES "FormUserResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
