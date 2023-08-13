import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import { InvoiceLoteRepository } from "../domain/invoice-lote-repository";
import { InvoiceLote } from "../domain/invoice-lote.model";

export class InvoiceServices {
	constructor(private readonly invoiceRepository: InvoiceLoteRepository) {}

	public async findServeral(options: Options): Promise<InvoiceLote[]> {
		const where: object = {};

		const itemsFound = await this.invoiceRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<InvoiceLote> {
		const itemFound = await this.invoiceRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByName(name: string): Promise<InvoiceLote> {
		const itemFound = await this.invoiceRepository.findByName(name);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async createOne(data: InvoiceLote) {
		const itemCreated = await this.invoiceRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<InvoiceLote>
	): Promise<InvoiceLote> {
		const itemUpdated = await this.invoiceRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<InvoiceLote> {
		const itemDeleted = await this.invoiceRepository.deleteById(id);

		if (!itemDeleted) {
			throw new Error("No item deleted");
		}

		return itemDeleted;
	}

	public async deleteMany(ids: string[]) {
		const itemsDeleted = await this.invoiceRepository.deleteMany(ids);

		if (!itemsDeleted) {
			throw new Error("No items deleted");
		}

		return itemsDeleted;
	}
}
