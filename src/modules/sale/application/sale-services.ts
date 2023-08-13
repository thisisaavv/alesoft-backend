import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { SaleRepository } from "../domain/sale-repository";
import { Sale } from "../domain/sale.model";
import invoiceDependencies from "../../invoice/infrastructure/invoice-dependencies";
import transactionDependencies from "../../transaction/infrastructure/transaction-dependencies";

export class SaleServices {
	constructor(private readonly saleRepository: SaleRepository) {}

	public async findServeral(options: Options): Promise<Sale[]> {
		const where: object = options.where || {};

		const itemsFound = await this.saleRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Sale> {
		const itemFound = await this.saleRepository.findById(id);

		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: Sale): Promise<Sale> {
		const itemCreated = await this.saleRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");
		const invoiceServices = invoiceDependencies.services;

		const invoiceData = {
			sale_id: itemCreated.id,
			cai_number: "add",
		} as any;
		await invoiceServices.createOne(invoiceData);
		await transactionDependencies.services.createOne({
			amount: itemCreated.total,
			type: "INCOME",
			sub_type: "Venta",
			created_by: itemCreated.created_by,
		} as any)

		return itemCreated;
	}

	public async updateById(id: string, data: Partial<Sale>): Promise<Sale> {
		const itemUpdated = await this.saleRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Sale> {
		const itemDeleted = await this.saleRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.saleRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
