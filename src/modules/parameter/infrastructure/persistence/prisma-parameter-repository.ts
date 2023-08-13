import { PrismaClient, SystemSetting } from "@prisma/client";

import { Options } from "../../../../types";
import { ParameterRepository } from "../../domain/parameter-repository";
import { GetResult } from "@prisma/client/runtime/library";

export class PrismaParameterRepository implements ParameterRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.systemSetting.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.systemSetting.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string): Promise<SystemSetting> {
		const item = await this.prisma.systemSetting.findFirst({
			where: { name },
		});

		return item;
	}

	async findByValue(value: string) {
		const item = await this.prisma.systemSetting.findFirst({
			where: { value },
		});

		return item;
	}

	async findByCode(code: string) {
		const item = await this.prisma.systemSetting.findFirst({
			where: { code },
		});

		return item;
	}

	async createOne(data: SystemSetting) {
		const item = await this.prisma.systemSetting.create({
			data,
		});

		return item;
	}

	async createMany(data: SystemSetting[]) {
		const itemsCreated = (await this.prisma.systemSetting.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | SystemSetting[];

		return itemsCreated;
	}

	async updateById(id: string, data: SystemSetting) {
		const item = await this.prisma.systemSetting.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: any) {
		console.log({ data });
		// delete data.ids;
		const itemsUpdated = (await this.prisma.systemSetting.updateMany({
			data,
		})) as unknown as number | SystemSetting[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.systemSetting.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.systemSetting.deleteMany({
			where: {
				id: {
					in: ids,
				},
			},
		})) as unknown as number | SystemSetting[];

		return itemsDeleted;
	}
}
