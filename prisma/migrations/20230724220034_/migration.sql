/*
  Warnings:

  - You are about to drop the column `discount_id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `SystemSettings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_discount_id_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "discount_id";

-- AlterTable
ALTER TABLE "SaleItem" ADD COLUMN     "discount_id" TEXT;

-- DropTable
DROP TABLE "SystemSettings";

-- CreateTable
CREATE TABLE "SystemSetting" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "SystemSetting_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_discount_id_fkey" FOREIGN KEY ("discount_id") REFERENCES "Discount"("id") ON DELETE SET NULL ON UPDATE CASCADE;
