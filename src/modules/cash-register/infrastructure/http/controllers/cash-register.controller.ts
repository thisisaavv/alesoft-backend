import { NextFunction, Request, Response } from "express";

import { CashRegister } from "../../../domain/cash-register.model";
import { CashRegisterServices } from "../../../application/cash-register-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class CashRegisterController {
	constructor(private readonly cashRegisterService: CashRegisterServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, open } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedOpen = open ? open === "true" : false;

		try {
			const cashRegistersList =
				await this.cashRegisterService.findServeral({
					pagination: {
						limit: parsedLimit,
						offset: parsedOffset,
					},
					where: {
						closing_date: {
							...(parsedOpen && { equals: null }),
						},
					},
				});

			const response = {
				data: cashRegistersList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: cashRegistersList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const cashRegisterFound = await this.cashRegisterService.findById(
				id
			);
			return res.status(200).json(cashRegisterFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: RequestWithUser, res: Response, next: NextFunction) {
		const cashRegisterData: CashRegister = req.body;

		try {
			cashRegisterData.created_by = req.user.id;
			const cashRegisterCreated =
				await this.cashRegisterService.createOne(cashRegisterData);

			const httpResponse = {
				data: cashRegisterCreated,
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
		const cashRegisterData: CashRegister = req.body;

		try {
			const cashRegisterUpdated =
				await this.cashRegisterService.updateById(id, cashRegisterData);

			const httpResponse = {
				data: cashRegisterUpdated,
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
			const cashRegisterDeleted =
				await this.cashRegisterService.deleteById(id);

			const httpResponse = {
				data: cashRegisterDeleted,
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
		const cashRegistersDeleted = await this.cashRegisterService.deleteMany(
			ids
		);

		try {
			return res.status(200).json(cashRegistersDeleted);
		} catch (error) {
			next(error);
		}
	}
}
