import { NextFunction, Request, Response } from "express";

import { Transaction } from "../../../domain/transaction.model";
import { TransactionServices } from "../../../application/transaction-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class TransactionController {
	constructor(private readonly transactionService: TransactionServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;

		try {
			const transactionsList = await this.transactionService.findServeral(
				{
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
				}
			);

			const response = {
				data: transactionsList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: transactionsList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const transactionFound = await this.transactionService.findById(id);
			return res.status(200).json(transactionFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const transactionData: Transaction = req.body;
		transactionData.created_by = req.user.id;

		try {
			const transactionCreated = await this.transactionService.createOne(
				transactionData
			);

			const httpResponse = {
				data: transactionCreated,
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
		const transactionData: Transaction = req.body;

		try {
			const transactionUpdated = await this.transactionService.updateById(
				id,
				transactionData
			);

			const httpResponse = {
				data: transactionUpdated,
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
			const transactionDeleted = await this.transactionService.deleteById(
				id
			);

			const httpResponse = {
				data: transactionDeleted,
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
		const transactionsDeleted = await this.transactionService.deleteMany(
			ids
		);

		try {
			return res.status(200).json(transactionsDeleted);
		} catch (error) {
			next(error);
		}
	}
}
