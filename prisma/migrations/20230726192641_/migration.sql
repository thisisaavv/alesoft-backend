-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "file_url" TEXT,
ALTER COLUMN "cai_number" SET DEFAULT 'N/A';

-- AlterTable
ALTER TABLE "SaleItem" ALTER COLUMN "quantity" DROP NOT NULL;
