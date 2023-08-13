import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { ItemController } from "../controllers/item.controller";
import { partialItemSchema, itemSchema } from "../../../domain/item.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class ItemRouter implements Route {
	public path = "/items";
	public router: Router = Router();

	constructor(private readonly itemController: ItemController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.itemController.getSeveral.bind(this.itemController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(itemSchema.pick({ id: true })),
			this.itemController.getOne.bind(this.itemController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(itemSchema),
			this.itemController.createOne.bind(this.itemController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: itemSchema.pick({ id: true }),
				body: partialItemSchema,
			}),
			this.itemController.updateOneById.bind(this.itemController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(itemSchema.pick({ id: true })),
			this.itemController.deleteOneById.bind(this.itemController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.itemController.deleteSeveral.bind(this.itemController)
		);
	}
}
