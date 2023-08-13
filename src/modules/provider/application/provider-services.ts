import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { ProviderRepository } from "../domain/provider-repository";
import { Provider } from "../domain/provider.model";

export class ProviderServices {
	constructor(private readonly providerRepository: ProviderRepository) {}

	public async findServeral(options: Options): Promise<Provider[]> {
		const where: object = {};

		const itemsFound = await this.providerRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Provider> {
		const itemFound = await this.providerRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByName(name: string): Promise<Provider> {
		const itemFound = await this.providerRepository.findByName(name);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Provider) {
		const itemAlreadyExists = await this.providerRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) throw new HttpException(409, "Already exists");

		const itemCreated = await this.providerRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Provider>
	): Promise<Provider> {
		const itemUpdated = await this.providerRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Provider> {
		const itemDeleted = await this.providerRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.providerRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
