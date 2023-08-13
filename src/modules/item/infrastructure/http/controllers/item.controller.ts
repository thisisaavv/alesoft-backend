import { NextFunction, Request, Response } from "express";

import { Item } from "../../../domain/item.model";
import { ItemServices } from "../../../application/item-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class ItemController {
	constructor(private readonly itemService: ItemServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;

		try {
			const itemsList = await this.itemService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
			});

			const response = {
				data: itemsList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: itemsList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const itemFound = await this.itemService.findById(id);
			return res.status(200).json(itemFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const itemData: Item = req.body;

		try {
			const itemCreated = await this.itemService.createOne({
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
		const itemData: Item = req.body;

		try {
			const itemUpdated = await this.itemService.updateById(id, itemData);

			const httpResponse = {
				data: itemUpdated,
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
			const itemDeleted = await this.itemService.deleteById(id);

			const httpResponse = {
				data: itemDeleted,
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
		const itemsDeleted = await this.itemService.deleteMany(ids);

		try {
			return res.status(200).json(itemsDeleted);
		} catch (error) {
			next(error);
		}
	}
}
