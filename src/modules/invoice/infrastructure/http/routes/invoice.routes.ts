import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { InvoiceController } from "../controllers/invoice.controller";
import {
	partialInvoiceSchema,
	invoiceSchema,
} from "../../../domain/invoice.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class InvoiceRouter implements Route {
	public path = "/invoices";
	public router: Router = Router();

	constructor(private readonly invoiceController: InvoiceController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.invoiceController.getSeveral.bind(this.invoiceController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(invoiceSchema.pick({ id: true })),
			this.invoiceController.getOne.bind(this.invoiceController)
		);

		this.router.post(
			this.path,
			validateRequestBody(invoiceSchema),
			this.invoiceController.createOne.bind(this.invoiceController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				// params: taxSchema.pick({ id: true }),
				// body: partialDiscountSchema,
			}),
			this.invoiceController.updateOneById.bind(this.invoiceController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(invoiceSchema.pick({ id: true })),
			this.invoiceController.deleteOneById.bind(this.invoiceController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.invoiceController.deleteSeveral.bind(this.invoiceController)
		);
	}
}
