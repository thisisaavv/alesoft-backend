import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { CustomerController } from "../controllers/customer.controller";
import {
	partialCustomerSchema,
	customerSchema,
} from "../../../domain/customer.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class CustomerRouter implements Route {
	public path = "/customers";
	public router: Router = Router();

	constructor(private readonly customerController: CustomerController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.customerController.getSeveral.bind(this.customerController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(customerSchema.pick({ id: true })),
			this.customerController.getOne.bind(this.customerController)
		);

		this.router.post(
			this.path,
			validateRequestBody(customerSchema),
			this.customerController.createOne.bind(this.customerController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: customerSchema.pick({ id: true }),
				body: partialCustomerSchema,
			}),
			this.customerController.updateOneById.bind(this.customerController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(customerSchema.pick({ id: true })),
			this.customerController.deleteOneById.bind(this.customerController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.customerController.deleteSeveral.bind(this.customerController)
		);
	}
}
