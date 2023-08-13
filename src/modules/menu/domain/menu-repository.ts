import { Menu } from "./menu.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface MenuRepository extends IBaseRepository<Menu> {
	findByName(name: string): Promise<Menu | null>;
}
