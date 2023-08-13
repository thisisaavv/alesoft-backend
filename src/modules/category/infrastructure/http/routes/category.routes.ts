import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { CategoryController } from "../controllers/category.controller";
import {
	partialCategorySchema,
	categorySchema,
} from "../../../domain/category.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class CategoryRouter implements Route {
	public path = "/categories";
	public router: Router = Router();

	constructor(private readonly categoryController: CategoryController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.categoryController.getSeveral.bind(this.categoryController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(categorySchema.pick({ id: true })),
			this.categoryController.getOne.bind(this.categoryController)
		);

		this.router.get(
			this.path + "/name/:name",
			isAuthenticated,
			validateRequestParams(categorySchema.pick({ name: true })),
			this.categoryController.getOneByName.bind(this.categoryController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(categorySchema),
			this.categoryController.createOne.bind(this.categoryController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: categorySchema.pick({ id: true }),
				body: partialCategorySchema,
			}),
			this.categoryController.updateOneById.bind(this.categoryController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(categorySchema.pick({ id: true })),
			this.categoryController.deleteOneById.bind(this.categoryController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.categoryController.deleteSeveral.bind(this.categoryController)
		);
	}
}
