import { NextFunction, Request, Response } from "express";

import { Inventory } from "../../../domain/inventory.model";
import { InventoryServices } from "../../../application/inventory-services";

export class InventoryController {
	constructor(private readonly inventoryService: InventoryServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const itemsList = await this.inventoryService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
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
			const itemFound = await this.inventoryService.findById(id);
			return res.status(200).json(itemFound);
		} catch (error) {
			next(error);
		}
	}

	public async getInventoryItemsById(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;

		try {
			const itemsFound =
				await this.inventoryService.getInventoryItemsById(id);
			return res.status(200).json(itemsFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const itemData: Inventory = req.body;

		try {
			const itemCreated = await this.inventoryService.createOne(itemData);

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
		const itemData: Inventory = req.body;

		try {
			const itemUpdated = await this.inventoryService.updateById(
				id,
				itemData
			);

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
			const itemDeleted = await this.inventoryService.deleteById(id);

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
		const itemsDeleted = await this.inventoryService.deleteMany(ids);

		try {
			return res.status(200).json(itemsDeleted);
		} catch (error) {
			next(error);
		}
	}
}
