import { PrismaClient, Transaction } from "@prisma/client";

import { Options } from "../../../../types";
import { TransactionRepository } from "../../domain/transaction-repository";

export class PrismaTransactionRepository implements TransactionRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.transaction.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.transaction.findUnique({
			where: { id },
		});

		return item;
	}

	async createOne(data: Transaction) {
		const item = await this.prisma.transaction.create({
			data,
		});

		return item;
	}

	async createMany(data: Transaction[]): Promise<number | Transaction[]> {
		const itemsCreated = (await this.prisma.transaction.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Transaction[];

		return itemsCreated;
	}

	async updateById(id: string, data: Transaction) {
		const item = await this.prisma.transaction.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(
		ids: string[],
		data: Partial<Transaction>
	): Promise<number | Transaction[]> {
		const itemsUpdated = (await this.prisma.transaction.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Transaction[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.transaction.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.transaction.deleteMany(
			{}
		)) as unknown as number;

		return itemsDeleted;
	}
}
