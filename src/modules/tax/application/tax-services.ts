import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { TaxRepository } from "../domain/tax-repository";
import { Tax } from "../domain/tax.model";

export class TaxServices {
	constructor(private readonly taxRepository: TaxRepository) {}

	public async findServeral(options: Options): Promise<Tax[]> {
		const where: object = {};

		const itemsFound = await this.taxRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Tax> {
		const itemFound = await this.taxRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByName(name: string): Promise<Tax> {
		const itemFound = await this.taxRepository.findByName(name);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findOneByRate(rate: number): Promise<Tax> {
		const itemFound = await this.taxRepository.findOneByRate(rate);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Tax) {
		const itemAlreadyExists = await this.taxRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.taxRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Tax>): Promise<Tax> {
		const itemUpdated = await this.taxRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Tax> {
		const itemDeleted = await this.taxRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.taxRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
