import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { ProviderController } from "../controllers/provider.controller";
import {
	partialProviderSchema,
	providerSchema,
} from "../../../domain/provider.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class ProviderRouter implements Route {
	public path = "/providers";
	public router: Router = Router();

	constructor(private readonly providerController: ProviderController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.providerController.getSeveral.bind(this.providerController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(providerSchema.pick({ id: true })),
			this.providerController.getOne.bind(this.providerController)
		);

		this.router.get(
			this.path + "/name/:name",
			isAuthenticated,
			validateRequestParams(providerSchema.pick({ name: true })),
			this.providerController.getOneByName.bind(this.providerController)
		);

		this.router.post(
			this.path,
			validateRequestBody(providerSchema),
			this.providerController.createOne.bind(this.providerController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: providerSchema.pick({ id: true }),
				body: partialProviderSchema,
			}),
			this.providerController.updateOneById.bind(this.providerController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(providerSchema.pick({ id: true })),
			this.providerController.deleteOneById.bind(this.providerController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.providerController.deleteSeveral.bind(this.providerController)
		);
	}
}
