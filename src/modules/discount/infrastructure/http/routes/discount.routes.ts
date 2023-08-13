import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { DiscountController } from "../controllers/discount.controller";
import {
	partialDiscountSchema,
	discountSchema,
} from "../../../domain/discount.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class DiscountRouter implements Route {
	public path = "/discounts";
	public router: Router = Router();

	constructor(private readonly discountController: DiscountController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.discountController.getSeveral.bind(this.discountController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(discountSchema.pick({ id: true })),
			this.discountController.getOne.bind(this.discountController)
		);

		this.router.post(
			this.path,
			validateRequestBody(discountSchema),
			this.discountController.createOne.bind(this.discountController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: discountSchema.pick({ id: true }),
				body: partialDiscountSchema,
			}),
			this.discountController.updateOneById.bind(this.discountController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(discountSchema.pick({ id: true })),
			this.discountController.deleteOneById.bind(this.discountController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.discountController.deleteSeveral.bind(this.discountController)
		);
	}
}
