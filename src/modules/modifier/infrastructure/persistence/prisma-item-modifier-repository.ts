import { PrismaClient, ItemModifier } from "@prisma/client";

import { Options } from "../../../../types";
import { ItemModifierRepository } from "../../domain/item-modifier-repository";
import { ItemModifierDTO } from "../../domain/item-modifier.schema";

export class PrismaItemModifierRepository implements ItemModifierRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.itemModifier.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
			include: {
				options: true,
			},
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.itemModifier.findUnique({
			where: { id },
			include: {
				options: true,
			},
		});

		return item;
	}

	async findByName(name: string) {
		const item = await this.prisma.itemModifier.findFirst({
			where: { name },
		});

		return item;
	}

	async createOne(data: ItemModifierDTO) {
		const item = await this.prisma.itemModifier.create({
			data: {
				name: data.name,
				options: {
					createMany: {
						data: data.options.map((modifier) => ({
							name: modifier.name,
							price: modifier.price,
						})),
					},
				},
			},
			include: {
				options: true,
			},
		});

		return item;
	}

	async createMany(data: ItemModifier[]) {
		const itemsCreated = (await this.prisma.itemModifier.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | ItemModifier[];

		return itemsCreated;
	}

	async updateById(id: string, data: ItemModifierDTO) {
		const item = await this.prisma.itemModifier.update({
			where: { id },
			data: {
				name: data.name,
				options: {
					upsert: data.options.map((option) => ({
						where: { id: option.id },
						update: {
							name: option.name,
							price: option.price,
						},
						create: {
							name: option.name,
							price: option.price,
						},
					})),
				},
			},
			include: {
				options: true,
			},
		});

		return item;
	}

	async updateOptions(id: string, options: ItemModifierDTO["options"]) {
		const item = await this.prisma.itemModifier.update({
			where: { id },

			data: {
				options: {
					upsert: options.map((option) => ({
						where: { id: option.id },
						create: {
							name: option.name,

							price: option.price,
						},
						update: {
							name: option.name,

							price: option.price,
						},
					})),
				},
			},
			include: {
				options: true,
			},
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<ItemModifier>) {
		const itemsUpdated = (await this.prisma.itemModifier.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | ItemModifier[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.itemModifier.delete({
			where: { id },
		});

		return item;
	}

	async deleteModifierOption(
		modifierId: string,
		optionId: string
	): Promise<void> {
		await this.prisma.itemModifier.update({
			where: { id: modifierId },
			data: {
				options: {
					delete: { id: optionId },
				},
			},
		});
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.itemModifier.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | ItemModifier[];

		return itemsDeleted;
	}
}
