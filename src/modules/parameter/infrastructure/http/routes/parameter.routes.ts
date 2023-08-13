import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { ParameterController } from "../controllers/parameter.controller";
import {
	partialParameterSchema,
	parameterSchema,
} from "../../../domain/parameter.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class ParameterRouter implements Route {
	public path = "/parameters";
	public router: Router = Router();

	constructor(private readonly parametersController: ParameterController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.parametersController.getSeveral.bind(this.parametersController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(parameterSchema.pick({ id: true })),
			this.parametersController.getOne.bind(this.parametersController)
		);

		this.router.get(
			this.path + "/name/:name",
			isAuthenticated,
			validateRequestParams(parameterSchema.pick({ name: true })),
			this.parametersController.getOneByName.bind(
				this.parametersController
			)
		);

		this.router.get(
			this.path + "/value/:value",
			isAuthenticated,
			validateRequestParams(parameterSchema.pick({ value: true })),
			this.parametersController.getOneByValue.bind(
				this.parametersController
			)
		);

		this.router.post(
			this.path,
			// validateRequestBody(parameterSchema),
			this.parametersController.createOne.bind(this.parametersController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				// params: taxSchema.pick({ id: true }),
				// body: partialDiscountSchema,
			}),
			this.parametersController.updateOneById.bind(
				this.parametersController
			),
			this.parametersController.updateSeveral.bind(
				this.parametersController
			)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(parameterSchema.pick({ id: true })),
			this.parametersController.deleteOneById.bind(
				this.parametersController
			)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.parametersController.deleteSeveral.bind(
				this.parametersController
			)
		);
	}
}
