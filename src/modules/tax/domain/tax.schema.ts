import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const taxSchema = z
	.object({
		name: z.string().min(1).max(255),
		description: z.string().min(1).max(255).optional(),
		rate: z.number().min(0).nonnegative(),
	})
	.merge(genericSchema.partial());

export const partialTaxSchema = taxSchema.partial();
