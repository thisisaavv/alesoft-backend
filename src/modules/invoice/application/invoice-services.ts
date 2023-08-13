import { HttpException, NotFoundException } from "../../../exceptions";
import { Options } from "../../../types";
import invoiceLoteDependencies from "../../invoice-lote/infrastructure/invoice-lote-dependencies";
import { InvoiceRepository } from "../domain/invoice-repository";
import { Invoice } from "../domain/invoice.model";
import invoiceDependencies from "../infrastructure/invoice-dependencies";

export class InvoiceServices {
	constructor(private readonly invoiceRepository: InvoiceRepository) {}

	public async findServeral(options: Options): Promise<Invoice[]> {
		const where: object = {};

		const itemsFound = await this.invoiceRepository.findMany({
			pagination: options.pagination,
			where,
		});

		return itemsFound;
	}

	public async findById(id: string): Promise<Invoice> {
		const itemFound = await this.invoiceRepository.findById(id);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}

	public async findByName(name: string): Promise<Invoice> {
		const itemFound = await this.invoiceRepository.findByName(name);
		if (!itemFound) {
			throw new NotFoundException();
		}

		return itemFound;
	}
	public async createOne(data: Invoice) {
		const invoiceLote = (
			await invoiceLoteDependencies.services.findServeral({})
		)[0];

		if (invoiceLote?.enabled || data?.cai_number === "add") {
			data.cai_number = invoiceLote?.current;
			data.invoice_lote_id = invoiceLote.id;

			const currentNumber = invoiceLote?.current.split("-")[3];
			const newCurrentNumber = `000-000-00-${String(
				Number(currentNumber) + 1
			).padStart(8, "0")}`;
			invoiceLoteDependencies.services.updateById(invoiceLote.id, {
				current: newCurrentNumber,
			});
		}

		const itemCreated = await this.invoiceRepository.createOne(data);
		if (!itemCreated) throw new Error("No item created");

		return itemCreated;
	}

	public async updateById(
		id: string,
		data: Partial<Invoice>
	): Promise<Invoice> {
		const itemUpdated = await this.invoiceRepository.updateById(id, data);
		if (!itemUpdated) {
			throw new Error("No item updated");
		}

		return itemUpdated;
	}

	public async deleteById(id: string): Promise<Invoice> {
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
