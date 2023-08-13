import { any, z } from "zod";
import { genericSchema } from "../../../shared/infrastructure/validations/generic-schema";

export const purchaseItemsSchema = z.object({
	item_id: z.string().uuid(),
	price: z.number().min(0).nonnegative(),
	note: z.string().max(500).optional(),
	quantity: z.number().min(1).nonnegative(),
	total: z.number().min(0).nonnegative(),
});

export const purchaseSchema = z
	.object({
		created_by: z.string().uuid().optional(),
		code: z.string().min(4).max(10).optional(),
		provider_id: z.string().uuid().optional(),
		tax_id: z.string().uuid().optional(),
		expected_date: z.date(),
		payment_method: z
			.enum(["CASH", "CARD", "TRANSFER", "OTHER"])
			.optional(),
		status: z.enum(["PENDING", "PAID", "CANCELLED"]).optional(),
		subtotal: z.number().min(0).nonnegative().optional(),
		total: z.number().min(0).nonnegative().optional(),
		note: z.string().max(500).optional(),
		purchase_items: z.any(),
	})
	.merge(genericSchema.partial());

export const partialPurchaseSchema = purchaseSchema.partial();
