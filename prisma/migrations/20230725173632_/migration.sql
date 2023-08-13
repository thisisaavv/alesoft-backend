/*
  Warnings:

  - A unique constraint covering the columns `[cai]` on the table `InvoiceLote` will be added. If there are existing duplicate values, this will fail.
  - Made the column `cai` on table `InvoiceLote` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "InvoiceLote" ALTER COLUMN "cai" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "InvoiceLote_cai_key" ON "InvoiceLote"("cai");
