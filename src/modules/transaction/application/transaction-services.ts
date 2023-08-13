import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { TransactionRepository } from "../domain/transaction-repository";
import { Transaction } from "../domain/transaction.model";

export class TransactionServices {
	constructor(
		private readonly transactionRepository: TransactionRepository
	) {}

	public async findServeral(options: Options) {
		const where: object = {};

		const itemsFound = await this.transactionRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string) {
		const itemFound = await this.transactionRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Transaction) {
		if (!data.sub_type) data.sub_type = "Otros";
		const itemCreated = await this.transactionRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Transaction>) {
		const itemUpdated = await this.transactionRepository.updateById(
			id,
			data
		);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string) {
		const itemDeleted = await this.transactionRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.transactionRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
