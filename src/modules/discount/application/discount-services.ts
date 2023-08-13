import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { DiscountRepository } from "../domain/discount-repository";
import { Discount } from "../domain/discount.model";

export class DiscountServices {
	constructor(private readonly discountRepository: DiscountRepository) {}

	public async findServeral(options: Options): Promise<Discount[]> {
		const where: object = {};

		const itemsFound = await this.discountRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Discount> {
		const itemFound = await this.discountRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Discount) {
		const itemAlreadyExists = await this.discountRepository.findByName(
			data.name
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "Already exists");
		}

		const itemCreated = await this.discountRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Discount>
	): Promise<Discount> {
		const itemUpdated = await this.discountRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Discount> {
		const itemDeleted = await this.discountRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.discountRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
