import { NextFunction, Request, Response } from "express";

import { Provider } from "../../../domain/provider.model";
import { ProviderServices } from "../../../application/provider-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class ProviderController {
	constructor(private readonly providerService: ProviderServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const providersList = await this.providerService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: providersList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: providersList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const providerFound = await this.providerService.findById(id);
			return res.status(200).json(providerFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		try {
			const providerFound = await this.providerService.findByName(name);
			return res.status(200).json(providerFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const providerData: Provider = req.body;

		try {
			const providerCreated = await this.providerService.createOne({
				...providerData,
				created_by: "SYSTEM",
			});

			const httpResponse = {
				data: providerCreated,
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
		const providerData: Provider = req.body;

		try {
			const providerUpdated = await this.providerService.updateById(
				id,
				providerData
			);

			const httpResponse = {
				data: providerUpdated,
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
			const providerDeleted = await this.providerService.deleteById(id);

			const httpResponse = {
				data: providerDeleted,
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
		const providersDeleted = await this.providerService.deleteMany(ids);

		try {
			return res.status(200).json(providersDeleted);
		} catch (error) {
			next(error);
		}
	}
}
