import { NextFunction, Request, Response } from "express";

import { Tax } from "../../../domain/tax.model";
import { TaxServices } from "../../../application/tax-services";

export class TaxController {
	constructor(private readonly taxService: TaxServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const taxesList = await this.taxService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: taxesList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: taxesList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const taxFound = await this.taxService.findById(id);
			return res.status(200).json(taxFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		try {
			const taxFound = await this.taxService.findByName(name);
			return res.status(200).json(taxFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByRate(req: Request, res: Response, next: NextFunction) {
		const { rate } = req.params;
		const parsedRate = parseFloat(rate);

		try {
			const taxFound = await this.taxService.findOneByRate(parsedRate);
			return res.status(200).json(taxFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const taxData: Tax = req.body;

		try {
			const taxCreated = await this.taxService.createOne(taxData);

			const httpResponse = {
				data: taxCreated,
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
		const taxData: Tax = req.body;

		try {
			const taxUpdated = await this.taxService.updateById(id, taxData);

			const httpResponse = {
				data: taxUpdated,
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
			const taxDeleted = await this.taxService.deleteById(id);

			const httpResponse = {
				data: taxDeleted,
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
		const taxesDeleted = await this.taxService.deleteMany(ids);

		try {
			return res.status(200).json(taxesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
