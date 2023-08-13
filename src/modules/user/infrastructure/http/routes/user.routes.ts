import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { UserController } from "../controllers/user.controller";
import { partialUserSchema, userSchema } from "../../../domain/user.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class UserRouter implements Route {
	public path = "/users";
	public router: Router = Router();

	constructor(private readonly userController: UserController) {
		this.router.use(this.path, isAuthenticated);
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			this.userController.getSeveral.bind(this.userController)
		);

		this.router.get(
			this.path + "/:id",
			validateRequestParams(userSchema.pick({ id: true })),
			this.userController.getOne.bind(this.userController)
		);

		this.router.post(
			this.path,
			validateRequestBody(userSchema),
			this.userController.createOne.bind(this.userController)
		);

		this.router.put(
			this.path + "/:id",
			validateRequest({
				params: userSchema.pick({ id: true }),
				// body: partialUserSchema,
			}),
			this.userController.updateOneById.bind(this.userController)
		);

		this.router.delete(
			this.path + "/:id",
			validateRequestParams(userSchema.pick({ id: true })),
			this.userController.deleteOneById.bind(this.userController)
		);

		this.router.delete(
			this.path,
			this.userController.deleteSeveral.bind(this.userController)
		);
	}
}
