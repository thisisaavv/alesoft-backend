-- AlterTable
ALTER TABLE "Invoice" ALTER COLUMN "cai_number" DROP DEFAULT;

-- CreateTable
CREATE TABLE "CashOpening" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "opening_amount" DOUBLE PRECISION NOT NULL,
    "total_sales" DOUBLE PRECISION NOT NULL,
    "closing_amount" DOUBLE PRECISION NOT NULL,
    "closing_date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "terminal_id" TEXT,

    CONSTRAINT "CashOpening_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CashOpening" ADD CONSTRAINT "CashOpening_terminal_id_fkey" FOREIGN KEY ("terminal_id") REFERENCES "Terminal"("id") ON DELETE SET NULL ON UPDATE CASCADE;
