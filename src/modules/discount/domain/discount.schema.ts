import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const discountSchema = z
	.object({
		name: z.string().min(1).max(255),
		amount: z.number().min(0),
		note: z.string().min(1).max(255).optional(),
		amount_type: z.enum(["PERCENTAGE", "FIXED"]),
	})
	.merge(genericSchema.partial());

export const partialDiscountSchema = discountSchema.partial();
