import { ItemVariant } from "./item-variant.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface ItemVariantRepository extends IBaseRepository<ItemVariant> {
	findByName(name: string): Promise<ItemVariant | null>;
}
