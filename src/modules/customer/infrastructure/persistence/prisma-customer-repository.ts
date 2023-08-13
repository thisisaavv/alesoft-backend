import { PrismaClient, Customer } from "@prisma/client";

import { Options } from "../../../../types";
import { CustomerRepository } from "../../domain/customer-repository";

export class PrismaCustomerRepository implements CustomerRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.customer.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.customer.findUnique({
			where: { id },
		});

		return item;
	}

	async findByIdCard(idCard: string): Promise<Customer> {
		const item = await this.prisma.customer.findFirst({
			where: { id_card: idCard },
		});

		return item;
	}

	async findByRtn(rtn: string): Promise<Customer> {
		const item = await this.prisma.customer.findFirst({
			where: { rtn },
		});

		return item;
	}

	async createOne(data: Customer) {
		const item = await this.prisma.customer.create({
			data,
		});

		return item;
	}

	async createMany(data: Customer[]): Promise<number | Customer[]> {
		const itemsCreated = (await this.prisma.customer.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Customer[];

		return itemsCreated;
	}

	async updateById(id: string, data: Customer) {
		const item = await this.prisma.customer.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(
		ids: string[],
		data: Partial<Customer>
	): Promise<number | Customer[]> {
		const itemsUpdated = (await this.prisma.customer.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Customer[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.customer.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.customer.deleteMany(
			{}
		)) as unknown as number;

		return itemsDeleted;
	}
}
