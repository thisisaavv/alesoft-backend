import { PrismaClient, Category } from "@prisma/client";

import { Options } from "../../../../types";
import { CategoryRepository } from "../../domain/category-repository";

export class PrismaCategoryRepository implements CategoryRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.category.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.category.findUnique({
			where: { id },
			include: {
				items: true,
			},
		});

		return item;
	}

	async findByName(name: string) {
		const item = await this.prisma.category.findUnique({
			where: { name },
		});

		return item;
	}

	async createOne(data: Category) {
		console.log(data);
		const item = await this.prisma.category.create({
			data,
		});

		return item;
	}

	async createMany(data: Category[]) {
		const itemsCreated = (await this.prisma.category.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Category[];

		return itemsCreated;
	}

	async updateById(id: string, data: Category) {
		const item = await this.prisma.category.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Category>) {
		const itemsUpdated = (await this.prisma.category.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Category[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.category.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.category.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Category[];

		return itemsDeleted;
	}
}
