import { NextFunction, Request, Response } from "express";

import { Category } from "../../../domain/category.model";
import { CategoryServices } from "../../../application/category-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class CategoryController {
	constructor(private readonly categoryService: CategoryServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset, role } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;
		const parsedRole = role ? (role as string) : undefined;

		try {
			const categoriesList = await this.categoryService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
				where: {
					role: parsedRole,
				},
			});

			const response = {
				data: categoriesList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: categoriesList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const categoryFound = await this.categoryService.findById(id);
			return res.status(200).json(categoryFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		try {
			const categoryFound = await this.categoryService.findByName(name);
			return res.status(200).json(categoryFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const categoryData: Category = req.body;

		try {
			const categoryCreated = await this.categoryService.createOne({
				...categoryData,
				created_by: req.user.id,
			});

			const httpResponse = {
				data: categoryCreated,
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
		const categoryData: Category = req.body;

		try {
			const categoryUpdated = await this.categoryService.updateById(
				id,
				categoryData
			);

			const httpResponse = {
				data: categoryUpdated,
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
			const categoryDeleted = await this.categoryService.deleteById(id);

			const httpResponse = {
				data: categoryDeleted,
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
		const categoriesDeleted = await this.categoryService.deleteMany(ids);

		try {
			return res.status(200).json(categoriesDeleted);
		} catch (error) {
			next(error);
		}
	}
}
