/*
  Warnings:

  - A unique constraint covering the columns `[cai_number]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "cai_number" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_cai_number_key" ON "Invoice"("cai_number");
