import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { CashRegisterController } from "../controllers/cash-register.controller";
import {
	partialCashRegisterSchema,
	cashRegisterSchema,
} from "../../../domain/cash-register.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class CashRegisterRouter implements Route {
	public path = "/cash-registers";
	public router: Router = Router();

	constructor(
		private readonly cashRegisterController: CashRegisterController
	) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.cashRegisterController.getSeveral.bind(
				this.cashRegisterController
			)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(cashRegisterSchema.pick({ id: true })),
			this.cashRegisterController.getOne.bind(this.cashRegisterController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(cashRegisterSchema),
			this.cashRegisterController.createOne.bind(
				this.cashRegisterController
			)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: cashRegisterSchema.pick({ id: true }),
				body: partialCashRegisterSchema,
			}),
			this.cashRegisterController.updateOneById.bind(
				this.cashRegisterController
			)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(cashRegisterSchema.pick({ id: true })),
			this.cashRegisterController.deleteOneById.bind(
				this.cashRegisterController
			)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.cashRegisterController.deleteSeveral.bind(
				this.cashRegisterController
			)
		);
	}
}
