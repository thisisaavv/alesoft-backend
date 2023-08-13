import { CashRegister } from "./cash-register.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface CashRegisterRepository extends IBaseRepository<CashRegister> {
	findByEmailContact?(email: string): Promise<CashRegister | null>;
}
