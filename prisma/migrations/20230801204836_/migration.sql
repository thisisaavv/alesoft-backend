/*
  Warnings:

  - You are about to drop the column `orders_items_permission` on the `UserRole` table. All the data in the column will be lost.
  - You are about to drop the column `orders_permission` on the `UserRole` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "orders_items_permission",
DROP COLUMN "orders_permission",
ADD COLUMN     "purchase_items_permission" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sale_items_permission" BOOLEAN NOT NULL DEFAULT false;
