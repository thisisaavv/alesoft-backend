import { z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const jobSchema = z
	.object({
		name: z.string().min(2).max(255),
		description: z.string().min(3),
	})
	.merge(genericSchema.partial());

export const partialJobSchema = jobSchema.partial();
