import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const invoiceLoteSchema = z
	.object({
		enabled: z.boolean(),
		cai: z.string().min(1).max(255),
		start_date: z.date(),
		end_date: z.date(),
		start_range: z.string().min(1).max(255),
		end_range: z.string().min(1).max(255),
		current: z.string().min(1).max(255),
		used: z.boolean().optional(),
	})
	.merge(genericSchema.partial());

export const partialInvoiceLoteSchema = invoiceLoteSchema.partial();
