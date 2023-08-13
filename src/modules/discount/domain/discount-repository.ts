import { Discount } from "./discount.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface DiscountRepository extends IBaseRepository<Discount> {
	findOneByAmount(amount: number): Promise<Discount | null>;
	findByName(name: string): Promise<Discount | null>;
}
