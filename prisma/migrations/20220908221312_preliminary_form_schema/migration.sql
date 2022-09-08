-- CreateEnum
CREATE TYPE "Types" AS ENUM ('text', 'number', 'date', 'email', 'password');

-- CreateTable
CREATE TABLE "Form" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "inputs" JSONB NOT NULL,

    CONSTRAINT "Form_pkey" PRIMARY KEY ("id")
);
