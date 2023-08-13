import { NextFunction, Request, Response } from "express";

import { Job } from "../../../domain/job.model";
import { JobServices } from "../../../application/jobs-services";

export class JobController {
	constructor(private readonly jobService: JobServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const companyList = await this.jobService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
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
			const companyFound = await this.jobService.findById(id);
			return res.status(200).json(companyFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const companyData: Job = req.body;

		try {
			const companyCreated = await this.jobService.createOne(companyData);

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
		const companyData: Job = req.body;

		try {
			const companyUpdated = await this.jobService.updateById(
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
			const companyDeleted = await this.jobService.deleteById(id);

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
		const companysDeleted = await this.jobService.deleteMany(ids);

		try {
			return res.status(200).json(companysDeleted);
		} catch (error) {
			next(error);
		}
	}
}
