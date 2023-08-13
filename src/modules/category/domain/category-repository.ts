import { Category } from "./category.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface CategoryRepository extends IBaseRepository<Category> {
	findByName(name: string): Promise<Category | null>;
}
