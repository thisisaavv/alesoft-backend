import { Customer } from "./customer.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface CustomerRepository extends IBaseRepository<Customer> {
	// findByEmailContact(email: string): Promise<Customer | null>;
	findByIdCard(idCard: string): Promise<Customer | null>;
	findByRtn(rtn: string): Promise<Customer | null>;
}
