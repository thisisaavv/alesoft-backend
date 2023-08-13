import { NextFunction, Request, Response } from "express";

import { Company } from "../../../domain/company.model";
import { CompanyServices } from "../../../application/company-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class CompanyController {
	constructor(private readonly companyService: CompanyServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;

		try {
			const companyList = await this.companyService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
			});

			const response = {
				data: companyList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: companyList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const companyFound = await this.companyService.findById(id);
			return res.status(200).json(companyFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const companyData: Company = req.body;

		try {
			const companyCreated = await this.companyService.createOne({
				...companyData,
				created_by: req.user.id,
			});

			const httpResponse = {
				data: companyCreated,
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
		const companyData: Company = req.body;

		try {
			const companyUpdated = await this.companyService.updateById(
				id,
				companyData
			);

			const httpResponse = {
				data: companyUpdated,
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
			const companyDeleted = await this.companyService.deleteById(id);

			const httpResponse = {
				data: companyDeleted,
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
		const companysDeleted = await this.companyService.deleteMany(ids);

		try {
			return res.status(200).json(companysDeleted);
		} catch (error) {
			next(error);
		}
	}
}
