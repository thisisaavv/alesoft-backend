import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { ItemModifierRepository } from "../domain/item-modifier-repository";
import { ItemModifier } from "../domain/item-modifier.model";
import { ItemModifierDTO } from "../domain/item-modifier.schema";

export class ItemModifierServices {
	constructor(
		private readonly itemModifierRepository: ItemModifierRepository
	) {}

	public async findServeral(options: Options): Promise<ItemModifier[]> {
		const where: object = {};

		const itemsFound = await this.itemModifierRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<ItemModifier> {
		const itemFound = await this.itemModifierRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: ItemModifier): Promise<ItemModifier> {
		const itemAlreadyExists = await this.itemModifierRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.itemModifierRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<ItemModifier>
	): Promise<ItemModifier> {
		const itemUpdated = await this.itemModifierRepository.updateById(
			id,
			data
		);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async updateOptions(
		id: string,
		options: ItemModifierDTO["options"]
	): Promise<ItemModifier> {
		const itemUpdated = await this.itemModifierRepository.updateOptions(
			id,
			options
		);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<ItemModifier> {
		const itemDeleted = await this.itemModifierRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.itemModifierRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
