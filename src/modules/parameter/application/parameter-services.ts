import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { ParameterRepository } from "../domain/parameter-repository";
import { SystemSetting } from "../domain/parameter.model";

export class ParameterServices {
	constructor(private readonly parameterRepository: ParameterRepository) {}

	public async findServeral(options: Options): Promise<SystemSetting[]> {
		const where: object = {};

		const itemsFound = await this.parameterRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<SystemSetting> {
		const itemFound = await this.parameterRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByName(name: string): Promise<SystemSetting> {
		const itemFound = await this.parameterRepository.findByName(name);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByValue(value: string): Promise<SystemSetting> {
		const itemFound = await this.parameterRepository.findByValue(value);
		if (!itemFound) throw new NotFoundException();

		return itemFound;
	}

	public async findByCode(code: string): Promise<SystemSetting> {
		const itemFound = await this.parameterRepository.findByCode(code);
		// if (!itemFound) throw new NotFoundException();

		return itemFound;
	}

	public async createOne(data: SystemSetting) {
		// const itemAlreadyExists = await this.parameterRepository.findByName(
		// 	data.name
		// );
		// if (itemAlreadyExists) {
		// 	throw new HttpException(409, "Already exists");
		// }

		console.log({ data });
		const itemCreated = await this.parameterRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<SystemSetting>
	): Promise<SystemSetting> {
		const itemUpdated = await this.parameterRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async updateMany(ids: string[], data: any) {
		const itemsUpdated = this.parameterRepository.updateMany(ids, data);

		return itemsUpdated;
	}

	public async deleteById(id: string): Promise<SystemSetting> {
		const itemDeleted = await this.parameterRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.parameterRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
