import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { ItemRepository } from "../domain/item-repository";
import { Item } from "../domain/item.model";

export class ItemServices {
	constructor(private readonly itemRepository: ItemRepository) {}

	public async findServeral(options: Options): Promise<Item[]> {
		const where: object = {};

		const itemsFound = await this.itemRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Item> {
		const itemFound = await this.itemRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Item): Promise<Item> {
		const itemAlreadyExists = await this.itemRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}
		const itemCreated = await this.itemRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Item>): Promise<Item> {
		const itemUpdated = await this.itemRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Item> {
		const itemDeleted = await this.itemRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.itemRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
