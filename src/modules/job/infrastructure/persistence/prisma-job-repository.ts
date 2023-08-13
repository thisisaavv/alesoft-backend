import { PrismaClient, Job } from "@prisma/client";

import { Options } from "../../../../types";
import { JobRepository } from "../../domain/job-repository";

export class PrismaJobRepository implements JobRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.job.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.job.findUnique({
			where: { id },
		});

		return item;
	}

	async findByName(name: string) {
		const item = await this.prisma.job.findFirst({
			where: { name },
		});

		return item;
	}

	async createOne(data: Job) {
		const item = await this.prisma.job.create({
			data,
		});

		return item;
	}

	async createMany(data: Job[]) {
		const itemsCreated = (await this.prisma.job.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | Job[];

		return itemsCreated;
	}

	async updateById(id: string, data: Job) {
		const item = await this.prisma.job.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: Job) {
		const itemsUpdated = (await this.prisma.job.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | Job[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.job.delete({
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
		})) as unknown as number | Job[];

		return itemsDeleted;
	}
}
