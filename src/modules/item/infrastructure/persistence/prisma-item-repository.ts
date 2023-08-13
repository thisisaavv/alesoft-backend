import { PrismaClient, Item } from "@prisma/client";

import { Options } from "../../../../types";
import { ItemRepository } from "../../domain/item-repository";

export class PrismaItemRepository implements ItemRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.item.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.item.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string) {
		const item = await this.prisma.item.findFirst({
			where: { name },
		});

		return item;
	}

	async createOne(data: Item) {
		const item = await this.prisma.item.create({
			data,
		});

		return item;
	}

	async createMany(data: Item[]) {
		const itemsCreated = (await this.prisma.item.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Item[];

		return itemsCreated;
	}

	async updateById(id: string, data: Item) {
		const item = await this.prisma.item.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Item>) {
		const itemsUpdated = (await this.prisma.item.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Item[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.item.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.item.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Item[];

		return itemsDeleted;
	}
}
