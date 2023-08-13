import { PrismaClient, Menu } from "@prisma/client";

import { Options } from "../../../../types";
import { MenuRepository } from "../../domain/menu-repository";

export class PrismaMenuRepository implements MenuRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.menu.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.menu.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string): Promise<Menu> {
		const item = await this.prisma.menu.findUnique({
			where: { name },
		});

		return item;
	}

	async createOne(data: Menu) {
		const item = await this.prisma.menu.create({
			data,
		});

		return item;
	}

	async createMany(data: Menu[]) {
		const itemsCreated = (await this.prisma.menu.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Menu[];

		return itemsCreated;
	}

	async updateById(id: string, data: Menu) {
		const item = await this.prisma.menu.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Menu>) {
		const itemsUpdated = (await this.prisma.menu.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Menu[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.menu.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.menu.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Menu[];

		return itemsDeleted;
	}
}
