import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import transactionDependencies from "../../transaction/infrastructure/transaction-dependencies";
import { PurchaseRepository } from "../domain/purchase-repository";
import { Purchase } from "../domain/purchase.model";

export class PurchaseServices {
	constructor(private readonly purchaseRepository: PurchaseRepository) {}

	public async findServeral(options: Options) {
		const where: object = {};

		const itemsFound = await this.purchaseRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string) {
		const itemFound = await this.purchaseRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Purchase) {
		const itemCreated = await this.purchaseRepository.createOne(data);
		await transactionDependencies.services.createOne({
			amount: itemCreated.total,
			type: "EXPENSE",
			sub_type: "Compra",
			created_by: itemCreated.created_by,
		} as any);

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Purchase>) {
		const itemUpdated = await this.purchaseRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string) {
		const itemDeleted = await this.purchaseRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.purchaseRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
