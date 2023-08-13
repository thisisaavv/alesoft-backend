import { Invoice } from "./invoice.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface InvoiceRepository extends IBaseRepository<Invoice> {
	findByName?(name: string): Promise<Invoice | null>;
}
