import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { EmployeeController } from "../controllers/employee.controller";
import {
	partialEmployeeSchema,
	employeeSchema,
} from "../../../domain/employee.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class EmployeeRouter implements Route {
	public path = "/employees";
	public router: Router = Router();

	constructor(private readonly employeeController: EmployeeController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.employeeController.getSeveral.bind(this.employeeController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(employeeSchema.pick({ id: true })),
			this.employeeController.getOne.bind(this.employeeController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			// validateRequestBody(employeeSchema),
			this.employeeController.createOne.bind(this.employeeController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: employeeSchema.pick({ id: true }),
				// body: employeeSchema,
			}),
			this.employeeController.updateOneById.bind(this.employeeController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(employeeSchema.pick({ id: true })),
			this.employeeController.deleteOneById.bind(this.employeeController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.employeeController.deleteSeveral.bind(this.employeeController)
		);
	}
}
