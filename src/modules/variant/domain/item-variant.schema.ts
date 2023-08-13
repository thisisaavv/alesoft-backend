import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const itemVariantSchema = z
	.object({
		name: z.string().min(2).max(100),
		options: z.array(z.string()).nonempty(),
	})
	.merge(genericSchema.partial());

export const partialItemVariantSchema = itemVariantSchema.partial();
