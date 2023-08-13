import { Inventory } from "./inventory.model";
import { IBaseRepository } from "../../../shared/domain/repository";
import { Item } from "../../item/domain/item.model";

export interface InventoryRepository extends IBaseRepository<Inventory> {
	findByName(name: string): Promise<Inventory | null>;
	findInventoryItemsById(id: string): Promise<Item[]>;
}
