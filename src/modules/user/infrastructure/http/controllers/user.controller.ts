import { NextFunction, Request, Response } from "express";

import { User } from "../../../domain/user.model";
import { UserServices } from "../../../application/user-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class UserController {
	constructor(private readonly userService: UserServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		// req.log.debug("Calling getSeveral endpoint with params: %o", req.query);
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const usersList = await this.userService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: usersList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: usersList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const userFound = await this.userService.findById(id);
			return res.status(200).json(userFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const userData: User = req.body;

		try {
			const userCreated = await this.userService.createOne({
				...userData,
				created_by: req.user.id,
			});

			const httpResponse = {
				data: userCreated,
				message: "Created",
			};
			res.status(201).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async updateOneById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;
		const userData: User = req.body;

		try {
			const userUpdated = await this.userService.updateById(id, userData);

			const httpResponse = {
				data: userUpdated,
				message: "Updated",
			};
			return res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async deleteOneById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;

		try {
			const userDeleted = await this.userService.deleteById(id);

			const httpResponse = {
				data: userDeleted,
				message: "Deleted",
			};
			return res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async deleteSeveral(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { ids } = req.body;
		const usersDeleted = await this.userService.deleteMany(ids);

		try {
			return res.status(200).json(usersDeleted);
		} catch (error) {
			next(error);
		}
	}
}
