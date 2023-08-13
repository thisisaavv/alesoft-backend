import { InvoiceLote } from "./invoice-lote.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface InvoiceLoteRepository extends IBaseRepository<InvoiceLote> {
	findByName?(name: string): Promise<InvoiceLote | null>;
}
