import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { TaxController } from "../controllers/tax.controller";
import { partialTaxSchema, taxSchema } from "../../../domain/tax.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class TaxRouter implements Route {
	public path = "/taxes";
	public router: Router = Router();

	constructor(private readonly taxController: TaxController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.taxController.getSeveral.bind(this.taxController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(taxSchema.pick({ id: true })),
			this.taxController.getOne.bind(this.taxController)
		);

		this.router.get(
			this.path + "/name/:name",
			isAuthenticated,
			validateRequestParams(taxSchema.pick({ name: true })),
			this.taxController.getOneByName.bind(this.taxController)
		);

		this.router.post(
			this.path,
			validateRequestBody(taxSchema),
			this.taxController.createOne.bind(this.taxController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				// params: taxSchema.pick({ id: true }),
				// body: partialDiscountSchema,
			}),
			this.taxController.updateOneById.bind(this.taxController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(taxSchema.pick({ id: true })),
			this.taxController.deleteOneById.bind(this.taxController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.taxController.deleteSeveral.bind(this.taxController)
		);
	}
}
