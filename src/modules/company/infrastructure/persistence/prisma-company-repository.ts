import { PrismaClient, Company } from "@prisma/client";

import { Options } from "../../../../types";
import { CompanyRepository } from "../../domain/company-repository";

export class PrismaCompanyRepository implements CompanyRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.company.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.company.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string) {
		const item = await this.prisma.company.findFirst({
			where: { name },
		});

		return item;
	}

	async createOne(data: Company) {
		const item = await this.prisma.company.create({
			data,
		});

		return item;
	}

	async createMany(data: Company[]): Promise<number | Company[]> {
		const itemsCreated = (await this.prisma.company.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Company[];

		return itemsCreated;
	}

	async updateById(id: string, data: Company) {
		const item = await this.prisma.company.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Company) {
		const itemsUpdated = (await this.prisma.company.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Company[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.company.delete({
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
		})) as unknown as number | Company[];

		return itemsDeleted;
	}
}
