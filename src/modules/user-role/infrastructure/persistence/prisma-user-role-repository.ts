import { PrismaClient, UserRole } from "@prisma/client";

import { Options } from "../../../../types";
import { UserRoleRepository } from "../../domain/user-role-repository";

export class PrismaUserRoleRepository implements UserRoleRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findMany(options?: Options) {
		const items = await this.prisma.userRole.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
		});

		return items;
	}

	async findByRoleName(name: string) {
		const item = await this.prisma.userRole.findUnique({
			where: { name },
		});

		return item;
	}

	async findById(id: string) {
		const item = await this.prisma.userRole.findUnique({
			where: { id },
		});

		return item;
	}

	async createOne(data: UserRole) {
		const item = await this.prisma.userRole.create({
			data,
		});

		return item;
	}

	async createMany(data: UserRole[]): Promise<number | UserRole[]> {
		const itemsCreated = (await this.prisma.userRole.createMany({
			data,
			skipDuplicates: true,
		})) as unknown as number | UserRole[];

		return itemsCreated;
	}

	async updateById(id: string, data: UserRole) {
		const item = await this.prisma.userRole.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(
		ids: string[],
		data: Partial<UserRole>
	): Promise<number | UserRole[]> {
		const itemsUpdated = (await this.prisma.userRole.updateMany({
			where: {
				id: {
					in: ids,
				},
			},
			data,
		})) as unknown as number | UserRole[];

		return itemsUpdated;
	}

	async deleteById(id: string) {
		const item = await this.prisma.userRole.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const itemsDeleted = (await this.prisma.userRole.deleteMany(
			{}
		)) as unknown as number;

		return itemsDeleted;
	}
}
