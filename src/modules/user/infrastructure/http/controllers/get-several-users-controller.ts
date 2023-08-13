import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../../../shared/infrastructure/Controller";
import { UserServices } from "../../../application/user-services";

class GetSeveralUsersController implements Controller {
	constructor(private userService: UserServices) {}

	public async run(
		request: Request,
		response: Response,
		next: NextFunction
	): Promise<void> {
		const { ids } = request.body;

		const usersFound = await this.userService.findServeral({
			pagination: {
				limit: 10,
				offset: 0,
			},
		});

		if (!usersFound) {
			throw new Error("No users found");
		}

		try {
			response.status(200).json(usersFound);
		} catch (error) {
			next(error);
		}
	}
}
