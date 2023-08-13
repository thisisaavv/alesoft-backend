import { Job } from "./job.model";
import { IBaseRepository } from "../../../shared/domain/repository";
import { Employee } from "../../employee/domain/employee.model";

export interface JobRepository extends IBaseRepository<Job> {
	findByName(name: string): Promise<Job | null>;
	// findEmployeesById(employerId: string): Promise<Employee[]>;
}
