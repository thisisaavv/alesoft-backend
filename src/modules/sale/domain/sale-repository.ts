import { Sale } from "./sale.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface SaleRepository extends IBaseRepository<Sale> {
	findSalesByCustomerId?(id: string): Promise<Sale[]>;
}
