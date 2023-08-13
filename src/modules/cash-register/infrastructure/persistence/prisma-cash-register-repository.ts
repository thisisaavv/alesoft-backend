import { PrismaClient, CashRegister } from "@prisma/client";

import { Options } from "../../../../types";
import { CashRegisterRepository } from "../../domain/cash-register-repository";

export class PrismaCashRegisterRepository implements CashRegisterRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.cashRegister.findMany({
			where: {...options?.where},
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.cashRegister.findUnique({
			where: { id },
		});

		return item;
	}

	async createOne(data: CashRegister) {
		const item = await this.prisma.cashRegister.create({
			data,
		});

		return item;
	}

	async createMany(data: CashRegister[]): Promise<number | CashRegister[]> {
		const itemsCreated = (await this.prisma.cashRegister.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | CashRegister[];

		return itemsCreated;
	}

	async updateById(id: string, data: CashRegister) {
		const item = await this.prisma.cashRegister.update({
			where: { id },
			data: {
				...data,
				closing_date: new Date(),
			},
		});

		return item;
	}

	async updateMany(
		ids: string[],
		data: Partial<CashRegister>
	): Promise<number | CashRegister[]> {
		const itemsUpdated = (await this.prisma.cashRegister.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | CashRegister[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.cashRegister.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.cashRegister.deleteMany(
			{}
		)) as unknown as number;

		return itemsDeleted;
	}
}
