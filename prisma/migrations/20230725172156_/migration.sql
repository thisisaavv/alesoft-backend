/*
  Warnings:

  - You are about to drop the column `invoice_cai_id` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `InvoiceCAI` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_invoice_cai_id_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "invoice_cai_id",
ADD COLUMN     "invoice_lote_id" TEXT;

-- DropTable
DROP TABLE "InvoiceCAI";

-- CreateTable
CREATE TABLE "InvoiceLote" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "cai" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_range" TEXT NOT NULL,
    "end_range" TEXT NOT NULL,
    "current" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InvoiceLote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_invoice_lote_id_fkey" FOREIGN KEY ("invoice_lote_id") REFERENCES "InvoiceLote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
