import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { MenuRepository } from "../domain/menu-repository";
import { Menu } from "../domain/menu.model";

export class MenuServices {
	constructor(private readonly menuRepository: MenuRepository) {}

	public async findServeral(options: Options): Promise<Menu[]> {
		const where: object = {};

		const itemsFound = await this.menuRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Menu> {
		const itemFound = await this.menuRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByName(name: string): Promise<Menu> {
		const itemFound = await this.menuRepository.findByName(name);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Menu) {
		const itemAlreadyExists = await this.menuRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.menuRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Menu>): Promise<Menu> {
		const itemUpdated = await this.menuRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Menu> {
		const itemDeleted = await this.menuRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.menuRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
