/*
  Warnings:

  - You are about to drop the column `value` on the `Input` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Input" DROP COLUMN "value";

-- CreateTable
CREATE TABLE "Response" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "formId" TEXT NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
