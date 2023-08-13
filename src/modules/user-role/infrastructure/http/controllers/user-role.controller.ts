import { NextFunction, Request, Response } from "express";

import { UserRole } from "../../../domain/user-role.model";
import { UserRoleServices } from "../../../application/user-role-services";

export class UserRoleController {
	constructor(private readonly userRoleService: UserRoleServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const userRolesList = await this.userRoleService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: userRolesList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: userRolesList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const userRoleFound = await this.userRoleService.findById(id);
			return res.status(200).json(userRoleFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const userRoleData: UserRole = req.body;

		try {
			const userRoleCreated = await this.userRoleService.createOne(
				userRoleData
			);

			const httpResponse = {
				data: userRoleCreated,
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
		const userRoleData: UserRole = req.body;

		try {
			const userRoleUpdated = await this.userRoleService.updateById(
				id,
				userRoleData
			);

			const httpResponse = {
				data: userRoleUpdated,
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
			const userRoleDeleted = await this.userRoleService.deleteById(id);

			const httpResponse = {
				data: userRoleDeleted,
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
		const userRolesDeleted = await this.userRoleService.deleteMany(ids);

		try {
			return res.status(200).json(userRolesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
