import { PrismaClient, User } from "@prisma/client";

import { Options } from "../../../../types";
import { UserRepository } from "../../domain/user-repository";

export class PrismaUserRepository implements UserRepository {
	constructor(private readonly prisma: PrismaClient) {}

	async findByUsername(username: string): Promise<User | null> {
		const item = await this.prisma.user.findUnique({
			where: { username },
			include: {
				Employee: true,
			},
		});

		return item;
	}

	async findUserData(id: string) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			include: {
				Employee: true,
			},
		});

		return user;
	}

	async findSessionsByUserId(id: string) {
		const userSessions = await this.prisma.user.findUnique({
			where: { id },
		});

		return userSessions;
	}

	async findByRoleId(roleId: string) {
		const items = await this.prisma.user.findMany({
			where: {
				user_role_id: roleId,
			},
		});

		return items;
	}

	async findByEmail(email: string) {
		const item = await this.prisma.user.findUnique({
			where: { email },
			include: {
				Employee: true,
			},
		});

		return item;
	}

	async findMany(options?: Options) {
		const items = await this.prisma.user.findMany({
			where: options?.where,
			take: options?.pagination?.limit,
			skip: options?.pagination?.offset,
			include: {
				Employee: true,
				UserRole: true,
			},
		});

		return items;
	}

	async findById(id: string) {
		const item = await this.prisma.user.findUnique({
			where: { id },
			include: {
				Employee: true,
				UserRole: true,
			},
		});

		return item;
	}

	async createOne(data: User) {
		const item = await this.prisma.user.create({
			data,
		});

		return item;
	}

	async createMany(data: User[]) {
		const items = await this.prisma.user.createMany({
			data,
			skipDuplicates: true,
		});

		return items.count;
	}

	async updateById(id: string, data: User) {
		const item = await this.prisma.user.update({
			where: { id },
			data,
		});

		return item;
	}

	async updateMany(ids: string[], data: User) {
		const isIdsArrayEmpty = ids.length === 0;
		const items = await this.prisma.user.updateMany({
			where: {
				...(!isIdsArrayEmpty && { id: { in: ids } }),
			},
			data,
		});

		return items.count;
	}

	async deleteById(id: string) {
		const item = await this.prisma.user.delete({
			where: { id },
		});

		return item;
	}

	async deleteMany(ids: string[]) {
		const isIdsArrayEmpty = ids.length === 0;
		const itemsDeleted = await this.prisma.user.deleteMany({
			where: {
				...(!isIdsArrayEmpty && { id: { in: ids } }),
			},
		});

		return itemsDeleted.count;
	}
}
