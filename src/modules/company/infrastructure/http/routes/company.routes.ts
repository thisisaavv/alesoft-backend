import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { CompanyController } from "../controllers/company.controller";
import {
	partialCompanySchema,
	companySchema,
} from "../../../domain/company.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class CompanyRouter implements Route {
	public path = "/companies";
	public router: Router = Router();

	constructor(private readonly companyController: CompanyController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.companyController.getSeveral.bind(this.companyController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(companySchema.pick({ id: true })),
			this.companyController.getOne.bind(this.companyController)
		);

		this.router.post(
			this.path,
			isAuthenticated,
			validateRequestBody(companySchema),
			this.companyController.createOne.bind(this.companyController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: companySchema.pick({ id: true }),
				body: partialCompanySchema,
			}),
			this.companyController.updateOneById.bind(this.companyController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(companySchema.pick({ id: true })),
			this.companyController.deleteOneById.bind(this.companyController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.companyController.deleteSeveral.bind(this.companyController)
		);
	}
}
