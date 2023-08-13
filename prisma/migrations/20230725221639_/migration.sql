/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `SystemSetting` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `SystemSetting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SystemSetting" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SystemSetting_code_key" ON "SystemSetting"("code");
