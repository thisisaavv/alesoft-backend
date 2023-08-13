/*
  Warnings:

  - You are about to drop the column `date` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "date",
DROP COLUMN "status",
DROP COLUMN "total",
DROP COLUMN "type";
