import { Router } from "express";
import { validateRequestBody } from "zod-express-middleware";

import { Route } from "../../../../../types/vendors/route";
import { signInSchema, userSchema } from "../../../../user/domain/user.schema";
import { AuthController } from "../controllers/auth-controller";
import { isAuthenticated } from "../../../../../middlewares/authenticate.middleware";

export class AuthRouter implements Route {
	public path = "/auth";
	public router: Router = Router();

	constructor(private readonly authController: AuthController) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.post(
			this.path + "/sign-in",
			validateRequestBody(signInSchema),
			this.authController.signIn.bind(this.authController)
		);

		this.router.post(
			this.path + "/sign-out",
			isAuthenticated,
			this.authController.signOut.bind(this.authController)
		);

		this.router.post(
			this.path + "/desactivate-account",
			isAuthenticated,
			this.authController.desactivateAccount.bind(this.authController)
		);

		this.router.post(
			this.path + "/me/change-password",
			isAuthenticated,
			this.authController.changePassword.bind(this.authController)
		);

		this.router.get(
			this.path + "/session",
			isAuthenticated,
			this.authController.session.bind(this.authController)
		);

		this.router.post(
			this.path + "/recover-account",
			validateRequestBody(userSchema.pick({ email: true })),
			this.authController.recoverAccount.bind(this.authController)
		);

		this.router.post(
			this.path + "/reset-password",
			isAuthenticated,
			this.authController.resetPassword.bind(this.authController)
		);
	}
}
