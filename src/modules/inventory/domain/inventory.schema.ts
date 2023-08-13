import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const inventorySchema = z
	.object({
		name: z.string().min(3).max(255),
		description: z.string().min(3).max(255).optional(),
		company_id: z.string().uuid(),
	})
	.merge(genericSchema.partial());

export const partialInventorySchema = inventorySchema.partial();
