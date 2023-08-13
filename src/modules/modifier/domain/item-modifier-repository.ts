import { ItemModifier } from "./item-modifier.model";
import { IBaseRepository } from "../../../shared/domain/repository";
import { ItemModifierDTO } from "./item-modifier.schema";

export interface ItemModifierRepository extends IBaseRepository<ItemModifier> {
	findByName(name: string): Promise<ItemModifier | null>;
	deleteModifierOption(modifierId: string, optionId: string): Promise<void>;
	updateOptions(
		id: string,
		options: ItemModifierDTO["options"]
	): Promise<ItemModifier>;
}
