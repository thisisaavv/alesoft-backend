import { NextFunction, Request, Response } from "express";

import { Invoice } from "../../../domain/invoice.model";
import { InvoiceServices } from "../../../application/invoice-services";

export class InvoiceController {
	constructor(private readonly invoiceService: InvoiceServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const invoicesList = await this.invoiceService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: invoicesList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: invoicesList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const invoiceFound = await this.invoiceService.findById(id);
			return res.status(200).json(invoiceFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		try {
			const invoiceFound = await this.invoiceService.findByName(name);
			return res.status(200).json(invoiceFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const invoicData: Invoice = req.body;

		try {
			const invoicCreated = await this.invoiceService.createOne(
				invoicData
			);

			const httpResponse = {
				data: invoicCreated,
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
		const invoicData: Invoice = req.body;

		try {
			const invoicUpdated = await this.invoiceService.updateById(
				id,
				invoicData
			);

			const httpResponse = {
				data: invoicUpdated,
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
			const invoicDeleted = await this.invoiceService.deleteById(id);

			const httpResponse = {
				data: invoicDeleted,
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
		const invoicesDeleted = await this.invoiceService.deleteMany(ids);

		try {
			return res.status(200).json(invoicesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
