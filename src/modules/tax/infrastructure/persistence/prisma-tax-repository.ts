import { PrismaClient, Tax } from "@prisma/client";

import { Options } from "../../../../types";
import { TaxRepository } from "../../domain/tax-repository";

export class PrismaTaxRepository implements TaxRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.tax.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.tax.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string): Promise<Tax> {
		const item = await this.prisma.tax.findUnique({
			where: { name },
		});

		return item;
	}

	async findOneByRate(rate: number): Promise<Tax> {
		const item = await this.prisma.tax.findFirst({
			where: { rate },
		});

		return item;
	}

	async createOne(data: Tax) {
		const item = await this.prisma.tax.create({
			data,
		});

		return item;
	}

	async createMany(data: Tax[]) {
		const itemsCreated = (await this.prisma.tax.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Tax[];

		return itemsCreated;
	}

	async updateById(id: string, data: Tax) {
		const item = await this.prisma.tax.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Tax>) {
		const itemsUpdated = (await this.prisma.tax.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Tax[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.tax.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.tax.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Tax[];

		return itemsDeleted;
	}
}
