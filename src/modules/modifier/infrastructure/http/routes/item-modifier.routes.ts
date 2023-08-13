import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { ItemModifierController } from "../controllers/item-modifier.controller";
import {
	partialItemModifierSchema,
	itemModifierSchema,
} from "../../../domain/item-modifier.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class ItemModifierRouter implements Route {
	public path = "/modifiers";
	public router: Router = Router();

	constructor(
		private readonly itemModifierController: ItemModifierController
	) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.itemModifierController.getSeveral.bind(
				this.itemModifierController
			)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(itemModifierSchema.pick({ id: true })),
			this.itemModifierController.getOne.bind(this.itemModifierController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(itemModifierSchema),
			this.itemModifierController.createOne.bind(
				this.itemModifierController
			)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: itemModifierSchema.pick({ id: true }),
				body: partialItemModifierSchema,
			}),
			this.itemModifierController.updateOneById.bind(
				this.itemModifierController
			)
		);

		this.router.put(
			this.path + "/:id/options",
			isAuthenticated,
			validateRequestParams(itemModifierSchema.pick({ id: true })),
			validateRequestBody(itemModifierSchema.pick({ options: true })),
			this.itemModifierController.updateOptions.bind(
				this.itemModifierController
			)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(itemModifierSchema.pick({ id: true })),
			this.itemModifierController.deleteOneById.bind(
				this.itemModifierController
			)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.itemModifierController.deleteSeveral.bind(
				this.itemModifierController
			)
		);
	}
}
