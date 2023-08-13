import { Purchase } from "./purchase.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface PurchaseRepository extends IBaseRepository<Purchase> {
	findByCode?(name: string): Promise<Purchase | null>;
}
