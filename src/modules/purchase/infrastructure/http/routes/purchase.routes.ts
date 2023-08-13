import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { PurchaseController } from "../controllers/purchase.controller";
import {
	partialPurchaseSchema,
	purchaseSchema,
} from "../../../domain/purchase.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class PurchaseRouter implements Route {
	public path = "/purchases";
	public router: Router = Router();

	constructor(private readonly purchaseController: PurchaseController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.purchaseController.getSeveral.bind(this.purchaseController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(purchaseSchema.pick({ id: true })),
			this.purchaseController.getOne.bind(this.purchaseController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			// validateRequestBody(purchaseSchema),
			this.purchaseController.createOne.bind(this.purchaseController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: purchaseSchema.pick({ id: true }),
				body: partialPurchaseSchema,
			}),
			this.purchaseController.updateOneById.bind(this.purchaseController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(purchaseSchema.pick({ id: true })),
			this.purchaseController.deleteOneById.bind(this.purchaseController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.purchaseController.deleteSeveral.bind(this.purchaseController)
		);
	}
}
