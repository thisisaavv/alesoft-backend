import { NextFunction, Request, Response } from "express";

import { InvoiceLote } from "../../../domain/invoice-lote.model";
import { InvoiceServices } from "../../../application/invoice-lote-services";

export class InvoiceLoteController {
	constructor(private readonly invoiceLoteService: InvoiceServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;

		try {
			const invoiceLotesFound =
				await this.invoiceLoteService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
				});

			const response = {
				data: invoiceLotesFound,
				limit: parsedLimit,
				offset: parsedOffset,
				total: invoiceLotesFound.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const invoiceLotesFound = await this.invoiceLoteService.findById(
				id
			);
			return res.status(200).json(invoiceLotesFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		try {
			const invoiceLotesFound = await this.invoiceLoteService.findByName(
				name
			);
			return res.status(200).json(invoiceLotesFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const invoiceLoteData: InvoiceLote = req.body;

		try {
			const invoiceLoteCreated = await this.invoiceLoteService.createOne(
				invoiceLoteData
			);

			const httpResponse = {
				data: invoiceLoteCreated,
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
		const invoicData: InvoiceLote = req.body;

		try {
			const invoicUpdated = await this.invoiceLoteService.updateById(
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
			const invoicDeleted = await this.invoiceLoteService.deleteById(id);

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
		const invoicesDeleted = await this.invoiceLoteService.deleteMany(ids);

		try {
			return res.status(200).json(invoicesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
