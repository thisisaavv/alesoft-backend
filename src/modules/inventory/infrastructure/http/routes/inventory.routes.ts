import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { InventoryController } from "../controllers/inventory.controller";
import {
	partialInventorySchema,
	inventorySchema,
} from "../../../domain/inventory.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class InventoryRouter implements Route {
	public path = "/inventories";
	public router: Router = Router();

	constructor(private readonly inventoryController: InventoryController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.inventoryController.getSeveral.bind(this.inventoryController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(inventorySchema.pick({ id: true })),
			this.inventoryController.getOne.bind(this.inventoryController)
		);

		this.router.get(
			this.path + "/:id/items",
			isAuthenticated,
			validateRequestParams(inventorySchema.pick({ id: true })),
			this.inventoryController.getInventoryItemsById.bind(
				this.inventoryController
			)
		);

		this.router.post(
			this.path,
			validateRequestBody(inventorySchema),
			this.inventoryController.createOne.bind(this.inventoryController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: inventorySchema.pick({ id: true }),
				body: partialInventorySchema,
			}),
			this.inventoryController.updateOneById.bind(
				this.inventoryController
			)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(inventorySchema.pick({ id: true })),
			this.inventoryController.deleteOneById.bind(
				this.inventoryController
			)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.inventoryController.deleteSeveral.bind(
				this.inventoryController
			)
		);
	}
}
