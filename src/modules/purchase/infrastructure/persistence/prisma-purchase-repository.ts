import { PrismaClient, Purchase } from "@prisma/client";

import { Options } from "../../../../types";
import { PurchaseRepository } from "../../domain/purchase-repository";

export class PrismaPurchaseRepository implements PurchaseRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.purchase.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.purchase.findUnique({
			where: { id },
		});

		return item;
	}

	async createOne(data: Purchase & { purchase_items: any[] }) {
		const item = await this.prisma.purchase.create({
			data: {
				...data,
				code: data.code || new Date().getTime().toString(),
				purchase_items: {
					create: data.purchase_items.map((item) => ({
						...item,
						item_id: item.item_id,
					})),
				},
			},
		});

		return item;
	}

	async createMany(data: Purchase[]) {
		const itemsCreated = (await this.prisma.purchase.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Purchase[];

		return itemsCreated;
	}

	async updateById(id: string, data: Purchase) {
		const item = await this.prisma.purchase.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Purchase>) {
		const itemsUpdated = (await this.prisma.purchase.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Purchase[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.purchase.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.purchase.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Purchase[];

		return itemsDeleted;
	}
}
