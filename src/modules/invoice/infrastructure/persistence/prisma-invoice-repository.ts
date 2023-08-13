import { PrismaClient, Invoice } from "@prisma/client";

import { Options } from "../../../../types";
import { InvoiceRepository } from "../../domain/invoice-repository";

export class PrismaInvoiceRepository implements InvoiceRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.invoice.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.invoice.findUnique({
			where: { id },
		});

		return item;
	}

	async createOne(data: Invoice) {
		const item = await this.prisma.invoice.create({
			data,
		});

		return item;
	}

	async createMany(data: Invoice[]) {
		const itemsCreated = (await this.prisma.invoice.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Invoice[];

		return itemsCreated;
	}

	async updateById(id: string, data: Invoice) {
		const item = await this.prisma.invoice.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<Invoice>) {
		const itemsUpdated = (await this.prisma.invoice.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Invoice[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.invoice.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.invoice.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | Invoice[];

		return itemsDeleted;
	}
}
