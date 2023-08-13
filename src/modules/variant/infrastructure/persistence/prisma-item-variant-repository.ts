import { PrismaClient, ItemVariant } from "@prisma/client";

import { Options } from "../../../../types";
import { ItemVariantRepository } from "../../domain/item-variant-repository";

export class PrismaItemVariantRepository implements ItemVariantRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.itemVariant.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.itemVariant.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string) {
		const item = await this.prisma.itemVariant.findFirst({
			where: { name },
		});

		return item;
	}

	async createOne(data: ItemVariant) {
		const item = await this.prisma.itemVariant.create({
			data,
		});

		return item;
	}

	async createMany(data: ItemVariant[]) {
		const itemsCreated = (await this.prisma.itemVariant.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | ItemVariant[];

		return itemsCreated;
	}

	async updateById(id: string, data: ItemVariant) {
		const item = await this.prisma.itemVariant.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<ItemVariant>) {
		const itemsUpdated = (await this.prisma.itemVariant.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | ItemVariant[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.itemVariant.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.itemVariant.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | ItemVariant[];

		return itemsDeleted;
	}
}
