import { NextFunction, Request, Response } from "express";

import { ItemModifier } from "../../../domain/item-modifier.model";
import { ItemModifierServices } from "../../../application/item-modifier-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class ItemModifierController {
	constructor(private readonly itemModifierService: ItemModifierServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const itemModifiersList =
				await this.itemModifierService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
					where: {
						role: parsedRole,
					},
				});

			const response = {
				data: itemModifiersList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: itemModifiersList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const itemModifierFound = await this.itemModifierService.findById(
				id
			);
			return res.status(200).json(itemModifierFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const itemData: ItemModifier = req.body;

		try {
			const itemCreated = await this.itemModifierService.createOne({
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
		const itemData: ItemModifier = req.body;

		try {
			const itemModifierUpdated =
				await this.itemModifierService.updateById(id, itemData);

			const httpResponse = {
				data: itemModifierUpdated,
				message: "Updated",
			};
			return res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async updateOptions(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { id } = req.params;
		const { options } = req.body;

		try {
			const itemModifierUpdated =
				await this.itemModifierService.updateOptions(id, options);

			const httpResponse = {
				data: itemModifierUpdated,
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
			const itemModifierDeleted =
				await this.itemModifierService.deleteById(id);

			const httpResponse = {
				data: itemModifierDeleted,
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
		const itemModifiersDeleted = await this.itemModifierService.deleteMany(
			ids
		);

		try {
			return res.status(200).json(itemModifiersDeleted);
		} catch (error) {
			next(error);
		}
	}
}
