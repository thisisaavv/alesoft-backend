import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { UserRoleRepository } from "../domain/user-role-repository";
import { UserRole } from "../domain/user-role.model";

export class UserRoleServices {
	constructor(private readonly userRoleRepository: UserRoleRepository) {}

	public async findServeral(options: Options): Promise<UserRole[]> {
		const where: object = {};

		const itemsFound = await this.userRoleRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<UserRole> {
		const itemFound = await this.userRoleRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: UserRole): Promise<UserRole> {
		const itemAlreadyExists = await this.userRoleRepository.findByRoleName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "User already exists");
		}

		const itemCreated = await this.userRoleRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<UserRole>
	): Promise<UserRole> {
		const itemUpdated = await this.userRoleRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<UserRole> {
		const itemDeleted = await this.userRoleRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.userRoleRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
