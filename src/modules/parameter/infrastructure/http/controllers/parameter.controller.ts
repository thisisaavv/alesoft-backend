import { NextFunction, Request, Response } from "express";

import { SystemSetting } from "../../../domain/parameter.model";
import { ParameterServices } from "../../../application/parameter-services";

export class ParameterController {
	constructor(private readonly parameterService: ParameterServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;

		try {
			const parametersList = await this.parameterService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
			});

			const response = {
				data: parametersList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: parametersList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const parameterFound = await this.parameterService.findById(id);
			return res.status(200).json(parameterFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		try {
			const parameterFound = await this.parameterService.findByName(name);
			return res.status(200).json(parameterFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByValue(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { value } = req.params;

		try {
			const parameterFound = await this.parameterService.findByValue(
				value
			);
			return res.status(200).json(parameterFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(req: Request, res: Response, next: NextFunction) {
		const parameterData: SystemSetting = req.body;

		try {
			const parameterCreated = await this.parameterService.createOne(
				parameterData
			);

			const httpResponse = {
				data: parameterCreated,
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
		if (id === "several") next();
		const parameterData: SystemSetting = req.body;

		try {
			const parameterUpdated = await this.parameterService.updateById(
				id,
				parameterData
			);

			const httpResponse = {
				data: parameterUpdated,
				message: "Updated",
			};
			return res.status(200).json(httpResponse);
		} catch (error) {
			next(error);
		}
	}

	public async updateSeveral(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { ids, data } = req.body;

		try {
			const parameteresUpdated = await this.parameterService.updateMany(
				ids,
				data
			);

			const httpResponse = {
				data: parameteresUpdated,
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
			const parameterDeleted = await this.parameterService.deleteById(id);

			const httpResponse = {
				data: parameterDeleted,
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
		const parametersDeleted = await this.parameterService.deleteMany(ids);

		try {
			return res.status(200).json(parametersDeleted);
		} catch (error) {
			next(error);
		}
	}
}
