import { PrismaClient, Discount } from "@prisma/client";

import { Options } from "../../../../types";
import { DiscountRepository } from "../../domain/discount-repository";

export class PrismaDiscountRepository implements DiscountRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.discount.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.discount.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string): Promise<Discount> {
		const item = await this.prisma.discount.findUnique({
			where: { name },
		});

		return item;
	}

	async findOneByAmount(amount: number): Promise<Discount> {
		const item = await this.prisma.discount.findFirst({
			where: { amount },
		});

		return item;
	}

	async createOne(data: Discount) {
		const item = await this.prisma.discount.create({
			data,
		});

		return item;
	}

	async createMany(data: Discount[]) {
		const itemsCreated = (await this.prisma.discount.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Discount[];

		return itemsCreated;
	}

	async updateById(id: string, data: Discount) {
		const item = await this.prisma.discount.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Discount>) {
		const itemsUpdated = (await this.prisma.discount.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Discount[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.discount.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.discount.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Discount[];

		return itemsDeleted;
	}
}
