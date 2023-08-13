import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const categorySchema = z
	.object({
		name: z.string().min(1).max(255),
		description: z.string().min(1).max(255).optional(),
	})
	.merge(genericSchema.partial());

export const partialCategorySchema = categorySchema.partial();
