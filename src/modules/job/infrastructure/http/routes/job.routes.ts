import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { JobController } from "../controllers/job.controller";
import { partialJobSchema, jobSchema } from "../../../domain/job.schema";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class JobRouter implements Route {
	public path = "/jobs";
	public router: Router = Router();

	constructor(private readonly jobController: JobController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(
			this.path,
			isAuthenticated,
			this.jobController.getSeveral.bind(this.jobController)
		);

		this.router.get(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(jobSchema.pick({ id: true })),
			this.jobController.getOne.bind(this.jobController)
		);

		this.router.post(
			this.path,
			validateRequestBody(jobSchema),
			this.jobController.createOne.bind(this.jobController)
		);

		this.router.put(
			this.path + "/:id",
			isAuthenticated,
			validateRequest({
				params: jobSchema.pick({ id: true }),
				body: partialJobSchema,
			}),
			this.jobController.updateOneById.bind(this.jobController)
		);

		this.router.delete(
			this.path + "/:id",
			isAuthenticated,
			validateRequestParams(jobSchema.pick({ id: true })),
			this.jobController.deleteOneById.bind(this.jobController)
		);

		this.router.delete(
			this.path,
			isAuthenticated,
			this.jobController.deleteSeveral.bind(this.jobController)
		);
	}
}
