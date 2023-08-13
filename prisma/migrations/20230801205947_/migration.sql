/*
  Warnings:

  - You are about to drop the `CashOpening` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CashOpening" DROP CONSTRAINT "CashOpening_terminal_id_fkey";

-- DropTable
DROP TABLE "CashOpening";

-- CreateTable
CREATE TABLE "CashRegister" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT DEFAULT 'SYSTEM',
    "opening_amount" DOUBLE PRECISION NOT NULL,
    "total_sales" DOUBLE PRECISION NOT NULL,
    "closing_amount" DOUBLE PRECISION NOT NULL,
    "closing_date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "terminal_id" TEXT,

    CONSTRAINT "CashRegister_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashRegister" ADD CONSTRAINT "CashRegister_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "Terminal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
