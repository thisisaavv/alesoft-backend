import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const itemSchema = z
	.object({
		created_by: z.string().optional(),
		enabled: z.boolean().optional(),
		name: z.string().min(2).max(100),
		description: z.string().optional(),
		price: z.number().min(0),
		quantity: z.number().min(0).nonnegative(),
		category_id: z.string().uuid().optional(),
		images: z.array(z.string().url()).optional(),
		tax_id: z.string().uuid().optional(),
		provider_id: z.string().uuid().optional(),
		inventory_id: z.string().uuid(),
		menu_id: z.string().uuid().optional(),
	})
	.merge(genericSchema.partial());

export const partialItemSchema = itemSchema.partial();
