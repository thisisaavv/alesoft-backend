import { NextFunction, Request, Response } from "express";
import { RequestWithUser } from "../../../../../types/vendors/request";
import { AuthServices } from "../../../application/auth-services";
import { SignIn } from "../../../../user/domain/user.schema";

export class AuthController {
	constructor(private readonly authService: AuthServices) {}

	public async signIn(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const userCredentials: SignIn = req.body;
			const userSigned = await this.authService.signIn(userCredentials);

			const httpResponse = {
				user: userSigned.user,
				token: userSigned.token,
				message: "User signed in",
			};

			res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async signOut(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const userLogged = req.user;
			const userSignedOut = await this.authService.signOut(userLogged);

			const httpResponse = {
				data: userSignedOut,
				message: "User signed out",
			};

			res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async session(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const userLogged = req.user;
			const userSession = await this.authService.session(userLogged);

			const httpResponse = {
				data: userLogged,
				message: "User session",
			};

			res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async desactivateAccount(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { id } = req.user;
			const userDesativated = await this.authService.desactivateAccount(
				id
			);

			const httpResponse = {
				data: userDesativated,
				message: "User desactivated",
			};

			res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async changePassword(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { password } = req.body;
			const { id, password: oldPassword } = req.user;

			const userChangedPassword = await this.authService.changePassword(
				id,
				oldPassword,
				password
			);

			const httpResponse = {
				data: userChangedPassword,
				message: "Password changed",
			};

			res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async recoverAccount(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { email } = req.body;
			const userFound = await this.authService.forgotPassword(email);

			const httpResponse = {
				message: userFound && "Email sent",
			};

			res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async resetPassword(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const { new_password } = req.body;
			const { id } = req.user;

			const userResetedPassword = await this.authService.resetPassword(
				id,
				new_password
			);

			const httpResponse = {
				data: userResetedPassword,
				message: "Password reseted",
			};

			res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}
}
