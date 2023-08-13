import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { SaleController } from "../controllers/sale.controller";
import { partialSaleSchema, saleSchema } from "../../../domain/sale.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class SaleRouter implements Route {
	public path = "/sales";
	public router: Router = Router();

	constructor(private readonly saleController: SaleController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.saleController.getSeveral.bind(this.saleController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(saleSchema.pick({ id: true })),
			this.saleController.getOne.bind(this.saleController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(saleSchema),
			this.saleController.createOne.bind(this.saleController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: saleSchema.pick({ id: true }),
				body: partialSaleSchema,
			}),
			this.saleController.updateOneById.bind(this.saleController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(saleSchema.pick({ id: true })),
			this.saleController.deleteOneById.bind(this.saleController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.saleController.deleteSeveral.bind(this.saleController)
		);
	}
}
