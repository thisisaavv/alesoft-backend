import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";
import { Invoice } from "@prisma/client";

export const invoiceSchema = z
	.object({
		file_url: z.string().url(),
		cai_number: z.string().min(1).max(50),
		invoice_lote_id: z.string().uuid(),
		sale_id: z.string().uuid(),
	})
	.merge(genericSchema.partial());

export const partialInvoiceSchema = invoiceSchema.partial();
