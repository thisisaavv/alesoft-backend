/*
  Warnings:

  - Made the column `sale_id` on table `Invoice` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_sale_id_fkey";

-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "sale_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceLote" ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
