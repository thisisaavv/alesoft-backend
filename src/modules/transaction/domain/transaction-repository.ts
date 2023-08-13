import { Transaction } from "./transaction.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface TransactionRepository extends IBaseRepository<Transaction> {
	findByEmailContact?(email: string): Promise<Transaction | null>;
}
