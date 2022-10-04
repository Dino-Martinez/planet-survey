/*
  Warnings:

  - You are about to drop the `Response` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FormUserResponse" DROP CONSTRAINT "FormUserResponse_responseId_fkey";

-- DropTable
DROP TABLE "Response";

-- CreateTable
CREATE TABLE "InputResponse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL DEFAULT '',
    "formUserResponseId" TEXT,

    CONSTRAINT "InputResponse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InputResponse" ADD CONSTRAINT "InputResponse_formUserResponseId_fkey" FOREIGN KEY ("formUserResponseId") REFERENCES "FormUserResponse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
