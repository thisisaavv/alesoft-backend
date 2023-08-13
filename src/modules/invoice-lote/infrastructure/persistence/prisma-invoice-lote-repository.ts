import { PrismaClient, InvoiceLote } from "@prisma/client";

import { Options } from "../../../../types";
import { InvoiceLoteRepository } from "../../domain/invoice-lote-repository";

export class PrismaInvoiceLoteRepository implements InvoiceLoteRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.invoiceLote.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.invoiceLote.findUnique({
			where: { id },
		});

		return item;
	}

	async createOne(data: InvoiceLote) {
		const item = await this.prisma.invoiceLote.create({
			data,
		});

		return item;
	}

	async createMany(data: InvoiceLote[]) {
		const itemsCreated = (await this.prisma.invoiceLote.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | InvoiceLote[];

		return itemsCreated;
	}

	async updateById(id: string, data: any): Promise<any> {
		const item = await this.prisma.invoiceLote.updateMany({
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Partial<InvoiceLote>) {
		const itemsUpdated = (await this.prisma.invoiceLote.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | InvoiceLote[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.invoiceLote.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.invoiceLote.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | InvoiceLote[];

		return itemsDeleted;
	}
}
