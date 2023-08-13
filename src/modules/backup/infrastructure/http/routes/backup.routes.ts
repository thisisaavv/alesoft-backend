import { Router } from "express";
import {
	validateRequest,
	validateRequestBody,
	validateRequestParams,
} from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { BackupController } from "../controllers/backup.controller";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class BackupRouter implements Route {
	public path = "/backups";
	public router: Router = Router();

	constructor(private readonly purchaseController: BackupController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			this.path,
			this.purchaseController.createBackup.bind(this.purchaseController)
		);
	}
}
