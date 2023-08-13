import { NextFunction, Response } from "express";

import { UnauthorizedException } from "../exceptions";
import { RequestWithUser } from "../types/vendors/request";
import userDependencies from "../modules/user/infrastructure/user-dependencies";
import { Token } from "../shared/infrastructure/jwt";
// import { logger } from "../utils/logger";

const token = Token.instance;

export const isAuthenticated = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	try {
		const userToken: string =
			req.headers.authorization?.split("Bearer ")[1];
		if (!userToken) throw new UnauthorizedException("No token provided");

		const validToken = token.verify(userToken);
		if (!validToken) throw new UnauthorizedException();

		try {
			const userId = validToken.payload.user;
			const userAuth = await userDependencies.services.findById(userId);
			if (!userAuth.enabled) throw new UnauthorizedException();

			req.user = userAuth;
		} catch (error) {
			throw (error.message = "Token is not valid or expired");
		}

		next();
	} catch (error) {
		next(error);
	}
};
