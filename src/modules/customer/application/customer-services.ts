import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { CustomerRepository } from "../domain/customer-repository";
import { Customer } from "../domain/customer.model";

export class CustomerServices {
	constructor(private readonly customerRepository: CustomerRepository) {}

	public async findServeral(options: Options): Promise<Customer[]> {
		const where: object = {};

		const itemsFound = await this.customerRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Customer> {
		const itemFound = await this.customerRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Customer): Promise<Customer> {
		const itemAlreadyExists = await this.customerRepository.findByIdCard(
			data.id_card
		);
		if (itemAlreadyExists) {
			throw new HttpException(409, "User already exists");
		}

		const itemCreated = await this.customerRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Customer>
	): Promise<Customer> {
		const itemUpdated = await this.customerRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Customer> {
		const itemDeleted = await this.customerRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.customerRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
