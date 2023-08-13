import { Employee } from "./employee.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface EmployeeRepository extends IBaseRepository<Employee> {
	disabled(employee: Employee): Promise<Employee | null>;
	findByUsername(username: string): Promise<Employee | null>;
	findByIdCard(idCard: string): Promise<Employee | null>;
}
