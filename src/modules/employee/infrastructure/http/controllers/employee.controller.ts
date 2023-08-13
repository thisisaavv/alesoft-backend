import { NextFunction, Request, Response } from "express";

import { Employee } from "../../../domain/employee.model";
import { EmployeeServices } from "../../../application/employee-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class EmployeeController {
	constructor(private readonly employeeService: EmployeeServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const employeesList = await this.employeeService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: employeesList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: employeesList.length,
			};

			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const employeeFound = await this.employeeService.findById(id);
			return res.status(200).json(employeeFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const employeeData: Employee = req.body;

		try {
			const employeeCreated = await this.employeeService.createOne({
				...employeeData,
				created_by: req.user.id,
			});

			const httpResponse = {
				data: employeeCreated,
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
		const employeeData: Employee = req.body;

		try {
			const employeeUpdated = await this.employeeService.updateById(
				id,
				employeeData
			);

			const httpResponse = {
				data: employeeUpdated,
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
			const employeeDeleted = await this.employeeService.deleteById(id);

			const httpResponse = {
				data: employeeDeleted,
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
		const employeesDeleted = await this.employeeService.deleteMany(ids);

		try {
			return res.status(200).json(employeesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
