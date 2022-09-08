/*
  Warnings:

  - You are about to drop the column `inputs` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "inputs";

-- CreateTable
CREATE TABLE "Input" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "Types" NOT NULL DEFAULT 'text',
    "formId" TEXT,

    CONSTRAINT "Input_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Input" ADD CONSTRAINT "Input_formId_fkey" FOREIGN KEY ("formId") REFERENCES "Form"("id") ON DELETE SET NULL ON UPDATE CASCADE;
