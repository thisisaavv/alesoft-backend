import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const menuSchema = z
	.object({
		name: z.string().min(1).max(255),
		description: z.string().min(1).max(255).optional(),
		image_url: z.string().url().optional(),
	})
	.merge(genericSchema.partial());

export const partialMenuSchema = menuSchema.partial();
