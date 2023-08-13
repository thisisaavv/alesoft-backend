import { NextFunction, Request, Response } from "express";

import { Purchase } from "../../../domain/purchase.model";
import { PurchaseServices } from "../../../application/purchase-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class PurchaseController {
	constructor(private readonly purchaseService: PurchaseServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const purchasesList = await this.purchaseService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: purchasesList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: purchasesList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const purchaseFound = await this.purchaseService.findById(id);
			return res.status(200).json(purchaseFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: RequestWithUser, res: Response, next: NextFunction) {
		const purchaseData: Purchase = req.body;
		purchaseData.created_by = req.user.id;

		try {
			const purchaseCreated = await this.purchaseService.createOne(
				purchaseData
			);

			const httpResponse = {
				data: purchaseCreated,
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
		const purchaseData: Purchase = req.body;

		try {
			const purchaseUpdated = await this.purchaseService.updateById(
				id,
				purchaseData
			);

			const httpResponse = {
				data: purchaseUpdated,
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
			const purchaseDeleted = await this.purchaseService.deleteById(id);

			const httpResponse = {
				data: purchaseDeleted,
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
		const purchasesDeleted = await this.purchaseService.deleteMany(ids);

		try {
			return res.status(200).json(purchasesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
