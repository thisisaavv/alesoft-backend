import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { CashRegisterRepository } from "../domain/cash-register-repository";
import { CashRegister } from "../domain/cash-register.model";

export class CashRegisterServices {
	constructor(
		private readonly cashRegisterRepository: CashRegisterRepository
	) {}

	public async findServeral(options: Options) {
		const where: object = options.where || {};

		const itemsFound = await this.cashRegisterRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string) {
		const itemFound = await this.cashRegisterRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: CashRegister) {
		const itemCreated = await this.cashRegisterRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<CashRegister>) {
		const itemUpdated = await this.cashRegisterRepository.updateById(
			id,
			data
		);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string) {
		const itemDeleted = await this.cashRegisterRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.cashRegisterRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
