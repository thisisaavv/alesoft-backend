import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { ItemVariantRepository } from "../domain/item-variant-repository";
import { ItemVariant } from "../domain/item-variant.model";

export class ItemVariantServices {
	constructor(
		private readonly itemVariantRepository: ItemVariantRepository
	) {}

	public async findServeral(options: Options): Promise<ItemVariant[]> {
		const where: object = {};

		const itemsFound = await this.itemVariantRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<ItemVariant> {
		const itemFound = await this.itemVariantRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: ItemVariant): Promise<ItemVariant> {
		const itemAlreadyExists = await this.itemVariantRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.itemVariantRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<ItemVariant>
	): Promise<ItemVariant> {
		const itemUpdated = await this.itemVariantRepository.updateById(
			id,
			data
		);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<ItemVariant> {
		const itemDeleted = await this.itemVariantRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.itemVariantRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
