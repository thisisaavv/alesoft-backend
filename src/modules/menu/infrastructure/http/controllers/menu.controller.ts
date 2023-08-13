import { NextFunction, Request, Response } from "express";

import { Menu } from "../../../domain/menu.model";
import { MenuServices } from "../../../application/menu-services";
import { RequestWithUser } from "../../../../../types/vendors/request";

export class MenuController {
	constructor(private readonly menuService: MenuServices) {}

	public async getSeveral(req: Request, res: Response, next: NextFunction) {
		const { limit, offset } = req.query;
		const parsedLimit = limit ? parseInt(limit as string) : 50;
		const parsedOffset = offset ? parseInt(offset as string) : 0;

		try {
			const menusList = await this.menuService.findServeral({
				pagination: {
					limit: parsedLimit,
					offset: parsedOffset,
				},
			});

			const response = {
				data: menusList,
				limit: parsedLimit,
				offset: parsedOffset,
				total: menusList.length,
			};
			return res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}

	public async getOne(req: Request, res: Response, next: NextFunction) {
		const { id } = req.params;

		try {
			const menuFound = await this.menuService.findById(id);
			return res.status(200).json(menuFound);
		} catch (error) {
			next(error);
		}
	}

	public async getOneByName(req: Request, res: Response, next: NextFunction) {
		const { name } = req.params;

		try {
			const menuFound = await this.menuService.findByName(name);
			return res.status(200).json(menuFound);
		} catch (error) {
			next(error);
		}
	}

	public async createOne(
		req: RequestWithUser,
		res: Response,
		next: NextFunction
	) {
		const menuData: Menu = req.body;

		try {
			const menuCreated = await this.menuService.createOne({
				...menuData,
				created_by: req.user.id,
			});

			const httpResponse = {
				data: menuCreated,
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
		const menuData: Menu = req.body;

		try {
			const menuUpdated = await this.menuService.updateById(id, menuData);

			const httpResponse = {
				data: menuUpdated,
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
			const menuDeleted = await this.menuService.deleteById(id);

			const httpResponse = {
				data: menuDeleted,
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
		const menusDeleted = await this.menuService.deleteMany(ids);

		try {
			return res.status(200).json(menusDeleted);
		} catch (error) {
			next(error);
		}
	}
}
