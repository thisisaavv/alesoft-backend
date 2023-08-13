import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { CategoryRepository } from "../domain/category-repository";
import { Category } from "../domain/category.model";

export class CategoryServices {
	constructor(private readonly categoryRepository: CategoryRepository) {}

	public async findServeral(options: Options): Promise<Category[]> {
		const where: object = {};

		const itemsFound = await this.categoryRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Category> {
		const itemFound = await this.categoryRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByName(name: string): Promise<Category> {
		const itemFound = await this.categoryRepository.findByName(name);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Category) {
		const itemAlreadyExists = await this.categoryRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			console.log(data);
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.categoryRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Category>
	): Promise<Category> {
		const itemUpdated = await this.categoryRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Category> {
		const itemDeleted = await this.categoryRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.categoryRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
