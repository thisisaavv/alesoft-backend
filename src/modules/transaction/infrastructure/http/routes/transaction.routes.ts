import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { TransactionController } from "../controllers/transaction.controller";
import {
	partialTransactionSchema,
	transactionSchema,
} from "../../../domain/transaction.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class TransactionRouter implements Route {
	public path = "/transactions";
	public router: Router = Router();

	constructor(
		private readonly transactionController: TransactionController
	) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.transactionController.getSeveral.bind(
				this.transactionController
			)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(transactionSchema.pick({ id: true })),
			this.transactionController.getOne.bind(this.transactionController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(transactionSchema),
			this.transactionController.createOne.bind(
				this.transactionController
			)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: transactionSchema.pick({ id: true }),
				body: partialTransactionSchema,
			}),
			this.transactionController.updateOneById.bind(
				this.transactionController
			)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(transactionSchema.pick({ id: true })),
			this.transactionController.deleteOneById.bind(
				this.transactionController
			)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.transactionController.deleteSeveral.bind(
				this.transactionController
			)
		);
	}
}
