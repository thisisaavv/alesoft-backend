import { PrismaClient, Employee } from "@prisma/client";

import { Options } from "../../../../types";
import { EmployeeRepository } from "../../domain/employee-repository";

export class PrismaEmployeeRepository implements EmployeeRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.employee.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async disabled(employee: Employee) {
		const item = await this.prisma.employee.update({
			where: { id: employee.id },
			data: { enabled: true },
		});

		return item;
	}

	async findById(id: string) {
		const item = await this.prisma.employee.findUnique({
			where: { id },
		});

		return item;
	}

	async findByUsername(username: string) {
		const item = await this.prisma.employee.findFirst({
			where: {
				users: {
					some: {
						username: {
							equals: username,
						},
					},
				},
			},
		});

		return item;
	}

	async findByIdCard(idCard: string): Promise<Employee> {
		const item = await this.prisma.employee.findFirst({
			where: {
				id_card: {
					equals: idCard,
				},
			},
		});

		return item;
	}

	async createOne(data: Employee) {
		const item = await this.prisma.employee.create({
			data,
		});

		return item;
	}

	async createMany(data: Employee[]): Promise<number | Employee[]> {
		const itemsCreated = (await this.prisma.employee.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Employee[];

		return itemsCreated;
	}

	async updateById(id: string, data: Employee) {
		const item = await this.prisma.employee.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Employee) {
		const itemsUpdated = (await this.prisma.employee.updateMany({
			where: { id: { in: ids } },
			data,
		})) as unknown as number | Employee[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.employee.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.employee.deleteMany(
			{}
		)) as unknown as number | Employee[];
		return itemsDeleted;
	}
}
