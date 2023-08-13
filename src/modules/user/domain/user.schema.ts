import * as z from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const userSchema = z
	.object({
		enabled: z.boolean().optional(),
		username: z.string().trim().min(2).max(50),
		email: z.string().trim().email(),
		password: z.string().min(8).max(50),
		employee_id: z.string().uuid(),
		// user_role_id: z.string().uuid(),
		verified: z.boolean().optional(),
	})
	.merge(genericSchema.partial());

export const partialUserSchema = userSchema.partial();
export const signInSchema = z.object({
	identifier: z.string().nonempty(),
	password: z.string().nonempty(),
});

export type SignIn = z.infer<typeof signInSchema>;
