import { Item } from "./item.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface ItemRepository extends IBaseRepository<Item> {
	findByName(name: string): Promise<Item | null>;
}
