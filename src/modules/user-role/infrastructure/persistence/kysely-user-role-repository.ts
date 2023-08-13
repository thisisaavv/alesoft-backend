import { Options } from "../../../../types";
import { UserRoleRepository } from "../../domain/user-role-repository";
import { UserRole } from "../../domain/user-role.model";

export class KyselyUserRoleRepository implements UserRoleRepository {
	constructor(private readonly database: unknown) {}

	async createOne(data: UserRole): Promise<UserRole> {
		throw new Error("Method not implemented.");
	}

	async createMany(data: UserRole[]): Promise<number | UserRole[]> {
		throw new Error("Method not implemented.");
	}

	async updateById(id: string, data: UserRole): Promise<UserRole> {
		throw new Error("Method not implemented.");
	}

	async updateMany(
		ids: string[],
		data: Partial<UserRole>
	): Promise<number | UserRole[]> {
		throw new Error("Method not implemented.");
	}

	async deleteById(id: string): Promise<UserRole> {
		throw new Error("Method not implemented.");
	}

	async deleteMany(ids: string[]): Promise<number> {
		throw new Error("Method not implemented.");
	}

	async findMany(options: Options): Promise<UserRole[]> {
		throw new Error("Method not implemented.");
	}

	async findById(id: string): Promise<UserRole> {
		throw new Error("Method not implemented.");
	}

	async findByPhoneContact(phone: string): Promise<UserRole> {
		throw new Error("Method not implemented.");
	}

	async findByRoleName(email: string): Promise<UserRole> {
		throw new Error("Method not implemented.");
	}

	async findByPhysicalId(id: string): Promise<UserRole> {
		throw new Error("Method not implemented.");
	}
}
