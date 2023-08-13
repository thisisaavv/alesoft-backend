import { NextFunction, Request, Response } from "express";

import { Discount } from "../../../domain/discount.model";
import { DiscountServices } from "../../../application/discount-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class DiscountController {
	constructor(private readonly discountService: DiscountServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const discountsList = await this.discountService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: discountsList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: discountsList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const discountFound = await this.discountService.findById(id);
			return res.status(200).json(discountFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const discountData: Discount = req.body;

		try {
			const discountCreated = await this.discountService.createOne(
				discountData
			);

			const httpResponse = {
				data: discountCreated,
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
		const discountData: Discount = req.body;

		try {
			const discountUpdated = await this.discountService.updateById(
				id,
				discountData
			);

			const httpResponse = {
				data: discountUpdated,
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
			const discountDeleted = await this.discountService.deleteById(id);

			const httpResponse = {
				data: discountDeleted,
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
		const discountsDeleted = await this.discountService.deleteMany(ids);

		try {
			return res.status(200).json(discountsDeleted);
		} catch (error) {
			next(error);
		}
	}
}
