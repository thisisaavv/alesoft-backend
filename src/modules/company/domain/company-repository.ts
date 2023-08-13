import { Company } from "./company.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface CompanyRepository extends IBaseRepository<Company> {
	findByName(name: string): Promise<Company | null>;
}
