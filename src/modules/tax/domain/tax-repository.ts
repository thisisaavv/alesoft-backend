import { Tax } from "./tax.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface TaxRepository extends IBaseRepository<Tax> {
	findOneByRate(rate: number): Promise<Tax | null>;
	findByName(name: string): Promise<Tax | null>;
}
