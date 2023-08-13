import { NextFunction, Request, Response } from "express";

import { Customer } from "../../../domain/customer.model";
import { CustomerServices } from "../../../application/customer-services";

export class CustomerController {
	constructor(private readonly customerService: CustomerServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const customersList = await this.customerService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: customersList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: customersList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const customerFound = await this.customerService.findById(id);
			return res.status(200).json(customerFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const customerData: Customer = req.body;

		try {
			const customerCreated = await this.customerService.createOne(
				customerData
			);

			const httpResponse = {
				data: customerCreated,
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
		const customerData: Customer = req.body;

		try {
			const customerUpdated = await this.customerService.updateById(
				id,
				customerData
			);

			const httpResponse = {
				data: customerUpdated,
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
			const customerDeleted = await this.customerService.deleteById(id);

			const httpResponse = {
				data: customerDeleted,
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
		const customersDeleted = await this.customerService.deleteMany(ids);

		try {
			return res.status(200).json(customersDeleted);
		} catch (error) {
			next(error);
		}
	}
}
