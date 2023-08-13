import { NextFunction, Request, Response } from "express";

import { ItemVariant } from "../../../domain/item-variant.model";
import { ItemVariantServices } from "../../../application/item-variant-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class ItemVariantController {
	constructor(private readonly itemVariantService: ItemVariantServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const itemVariantsList = await this.itemVariantService.findServeral(
				{
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
					where: {
						role: parsedRole,
					},
				}
			);

			const response = {
				data: itemVariantsList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: itemVariantsList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const itemVariantFound = await this.itemVariantService.findById(id);
			return res.status(200).json(itemVariantFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const itemData: ItemVariant = req.body;

		try {
			const itemCreated = await this.itemVariantService.createOne({
				...itemData,
				created_by: req.user.id,
			});

			const httpResponse = {
				data: itemCreated,
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
		const itemData: ItemVariant = req.body;

		try {
			const itemVariantUpdated = await this.itemVariantService.updateById(
				id,
				itemData
			);

			const httpResponse = {
				data: itemVariantUpdated,
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
			const itemVariantDeleted = await this.itemVariantService.deleteById(
				id
			);

			const httpResponse = {
				data: itemVariantDeleted,
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
		const itemVariantsDeleted = await this.itemVariantService.deleteMany(
			ids
		);

		try {
			return res.status(200).json(itemVariantsDeleted);
		} catch (error) {
			next(error);
		}
	}
}
