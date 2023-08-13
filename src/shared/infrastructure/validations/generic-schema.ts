import { z } from "zod";

export const genericSchema = z.object({
	id: z.string().uuid(),
	created_at: z.date().or(z.string().datetime()),
	updated_at: z.date().or(z.string().datetime()),
});
