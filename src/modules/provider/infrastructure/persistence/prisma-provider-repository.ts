import { PrismaClient, Provider } from "@prisma/client";

import { Options } from "../../../../types";
import { ProviderRepository } from "../../domain/provider-repository";

export class PrismaProviderRepository implements ProviderRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.provider.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.provider.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string): Promise<Provider> {
		const item = await this.prisma.provider.findUnique({
			where: { name },
		});

		return item;
	}

	async createOne(data: Provider) {
		const item = await this.prisma.provider.create({
			data,
		});

		return item;
	}

	async createMany(data: Provider[]) {
		const itemsCreated = (await this.prisma.provider.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Provider[];

		return itemsCreated;
	}

	async updateById(id: string, data: Provider) {
		const item = await this.prisma.provider.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Provider>) {
		const itemsUpdated = (await this.prisma.provider.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Provider[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.provider.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.provider.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Provider[];

		return itemsDeleted;
	}
}
