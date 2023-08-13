import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const providerSchema = z
	.object({
		enabled: z.boolean().optional(),
		name: z.string().min(2).max(255),
		email: z.string().email().optional().nullable(),
		bussiness_id: z.string().min(1).max(255).optional(),
		emails: z.array(z.string().email()).optional(),
		phones: z.array(z.string().min(8).max(14)).optional(),
		country: z.string().min(2).max(100),
		state: z.string().min(2).max(100),
		city: z.string().min(2).max(100),
		street: z.string().min(2).max(100),
		website_url: z.string().url().optional().nullable(),
	})
	.merge(genericSchema.partial());

export const partialProviderSchema = providerSchema.partial();
