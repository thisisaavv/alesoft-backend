import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { InvoiceLoteController } from "../controllers/invoice-lote.controller";
import {
	partialInvoiceLoteSchema,
	invoiceLoteSchema,
} from "../../../domain/invoice-lote.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class InvoiceLoteRouter implements Route {
	public path = "/invoice-lotes";
	public router: Router = Router();

	constructor(private readonly invoiceLoteController: InvoiceLoteController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.invoiceLoteController.getSeveral.bind(
				this.invoiceLoteController
			)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(invoiceLoteSchema.pick({ id: true })),
			this.invoiceLoteController.getOne.bind(this.invoiceLoteController)
		);

		this.router.post(
			this.path,
			validateRequestBody(invoiceLoteSchema),
			this.invoiceLoteController.createOne.bind(
				this.invoiceLoteController
			)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				// params: taxSchema.pick({ id: true }),
				// body: partialDiscountSchema,
			}),
			this.invoiceLoteController.updateOneById.bind(
				this.invoiceLoteController
			)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(invoiceLoteSchema.pick({ id: true })),
			this.invoiceLoteController.deleteOneById.bind(
				this.invoiceLoteController
			)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.invoiceLoteController.deleteSeveral.bind(
				this.invoiceLoteController
			)
		);
	}
}
