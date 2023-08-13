import { PrismaClient, Inventory, Item } from "@prisma/client";

import { Options } from "../../../../types";
import { InventoryRepository } from "../../domain/inventory-repository";

export class PrismaInventoryRepository implements InventoryRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.inventory.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.inventory.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string) {
		const item = await this.prisma.inventory.findFirst({
			where: { name },
		});

		return item;
	}

	async findInventoryItemsById(id: string) {
		const items = await this.prisma.inventory.findUnique({
			where: { id },
			select: {
				items: true,
			},
		});

		return items.items;
	}

	async createOne(data: Inventory) {
		const item = await this.prisma.inventory.create({
			data,
		});

		return item;
	}

	async createMany(data: Inventory[]) {
		const itemsCreated = (await this.prisma.inventory.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Inventory[];

		return itemsCreated;
	}

	async updateById(id: string, data: Inventory) {
		const item = await this.prisma.inventory.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Inventory>) {
		const itemsUpdated = (await this.prisma.inventory.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Inventory[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.inventory.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.inventory.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Inventory[];

		return itemsDeleted;
	}
}
