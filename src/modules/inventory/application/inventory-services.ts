import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { InventoryRepository } from "../domain/inventory-repository";
import { Inventory } from "../domain/inventory.model";

export class InventoryServices {
	constructor(private readonly inventoryRepository: InventoryRepository) {}

	public async findServeral(options: Options): Promise<Inventory[]> {
		const where: object = {};

		const itemsFound = await this.inventoryRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Inventory> {
		const itemFound = await this.inventoryRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async getInventoryItemsById(id: string) {
		const itemsFound =
			await this.inventoryRepository.findInventoryItemsById(id);

		return itemsFound;
	}

	public async createOne(data: Inventory) {
		const itemAlreadyExists = await this.inventoryRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.inventoryRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Inventory>
	): Promise<Inventory> {
		const itemUpdated = await this.inventoryRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Inventory> {
		const itemDeleted = await this.inventoryRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.inventoryRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
