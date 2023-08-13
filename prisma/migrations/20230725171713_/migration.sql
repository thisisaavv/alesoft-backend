/*
  Warnings:

  - You are about to drop the column `lote_id` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `InvoiceLote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_lote_id_fkey";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "lote_id",
ADD COLUMN     "invoice_cai_id" TEXT;

-- DropTable
DROP TABLE "InvoiceLote";

-- CreateTable
CREATE TABLE "InvoiceCAI" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "start_range" TEXT NOT NULL,
    "end_range" TEXT NOT NULL,
    "current" TEXT NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "InvoiceCAI_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tenant" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "enabled" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Tenant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenant_name_key" ON "Tenant"("name");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_invoice_cai_id_fkey" FOREIGN KEY ("invoice_cai_id") REFERENCES "InvoiceCAI"("id") ON DELETE SET NULL ON UPDATE CASCADE;
