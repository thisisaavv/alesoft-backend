import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { MenuController } from "../controllers/menu.controller";
import { partialMenuSchema, menuSchema } from "../../../domain/menu.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class MenuRouter implements Route {
	public path = "/menus";
	public router: Router = Router();

	constructor(private readonly menuController: MenuController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.menuController.getSeveral.bind(this.menuController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(menuSchema.pick({ id: true })),
			this.menuController.getOne.bind(this.menuController)
		);

		this.router.get(
			this.path + "/name/:name",
			isAuthenticated,
			validateRequestParams(menuSchema.pick({ name: true })),
			this.menuController.getOneByName.bind(this.menuController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(menuSchema),
			this.menuController.createOne.bind(this.menuController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: menuSchema.pick({ id: true }),
				body: partialMenuSchema,
			}),
			this.menuController.updateOneById.bind(this.menuController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(menuSchema.pick({ id: true })),
			this.menuController.deleteOneById.bind(this.menuController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.menuController.deleteSeveral.bind(this.menuController)
		);
	}
}
