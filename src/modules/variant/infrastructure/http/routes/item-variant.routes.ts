import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { ItemVariantController } from "../controllers/item-variant.controller";
import {
	partialItemVariantSchema,
	itemVariantSchema,
} from "../../../domain/item-variant.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class ItemVariantRouter implements Route {
	public path = "/variants";
	public router: Router = Router();

	constructor(private readonly itemVariantController: ItemVariantController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.itemVariantController.getSeveral.bind(
				this.itemVariantController
			)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(itemVariantSchema.pick({ id: true })),
			this.itemVariantController.getOne.bind(this.itemVariantController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(itemVariantSchema),
			this.itemVariantController.createOne.bind(
				this.itemVariantController
			)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: itemVariantSchema.pick({ id: true }),
				body: partialItemVariantSchema,
			}),
			this.itemVariantController.updateOneById.bind(
				this.itemVariantController
			)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(itemVariantSchema.pick({ id: true })),
			this.itemVariantController.deleteOneById.bind(
				this.itemVariantController
			)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.itemVariantController.deleteSeveral.bind(
				this.itemVariantController
			)
		);
	}
}
