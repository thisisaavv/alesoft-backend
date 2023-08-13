-- AlterTable
ALTER TABLE "CashRegister" ALTER COLUMN "total_sales" SET DEFAULT 0.00,
ALTER COLUMN "closing_amount" DROP NOT NULL,
ALTER COLUMN "closing_date" DROP NOT NULL;
