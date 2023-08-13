import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const transactionSchema = z
	.object({
		// created_by: z.string().optional(),
		amount: z.number(),
		type: z.enum(["INCOME", "EXPENSE"]),
		sub_type: z.string().optional(),
		description: z.string(),
	})
	.merge(genericSchema.partial());

export const partialTransactionSchema = transactionSchema.partial();
