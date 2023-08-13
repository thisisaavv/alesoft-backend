import { NextFunction, Request, Response } from "express";
import { Controller } from "../../../../../shared/infrastructure/Controller";
import { UserCreator } from "../../../application/create/create-one-user";
import { User } from "../../../domain/user.model";

export class CoursesPostController implements Controller {
	constructor(private readonly userCreateService: UserCreator) {}

	async run(request: Request, response: Response, next: NextFunction) {
		const userData: User = request.body;

		try {
			const userCreated = await this.userCreateService.execute.bind(
				this.userCreateService
			)(userData);
			const httpResponse = {
				data: userCreated,
				message: "Created",
			};

			response.status(201).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}
}
