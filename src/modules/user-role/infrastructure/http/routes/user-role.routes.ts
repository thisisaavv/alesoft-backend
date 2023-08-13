import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { UserRoleController } from "../controllers/user-role.controller";
import {
	partialUserRoleSchema,
	userRoleSchema,
} from "../../../domain/user-role.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class UserRoleRouter implements Route {
	public path = "/user-roles";
	public router: Router = Router();

	constructor(private readonly userRoleController: UserRoleController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.userRoleController.getSeveral.bind(this.userRoleController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(userRoleSchema.pick({ id: true })),
			this.userRoleController.getOne.bind(this.userRoleController)
		);

		this.router.post(
			this.path,
			validateRequestBody(userRoleSchema),
			this.userRoleController.createOne.bind(this.userRoleController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: userRoleSchema.pick({ id: true }),
				// body: partialUserRoleSchema,
			}),
			this.userRoleController.updateOneById.bind(this.userRoleController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(userRoleSchema.pick({ id: true })),
			this.userRoleController.deleteOneById.bind(this.userRoleController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.userRoleController.deleteSeveral.bind(this.userRoleController)
		);
	}
}
