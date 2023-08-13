import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const parameterSchema = z
	.object({
		enabled: z.boolean().optional(),
		code: z.string().min(1).max(255),
		name: z.string().min(1).max(255),
		description: z.string().min(1),
		value: z.string().min(1).max(500),
	})
	.merge(genericSchema.partial());

export const partialParameterSchema = parameterSchema.partial();
