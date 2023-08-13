import { SystemSetting } from "./parameter.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface ParameterRepository extends IBaseRepository<SystemSetting> {
	findByName(name: string): Promise<SystemSetting | null>;
	findByValue(value: string): Promise<SystemSetting | null>;
	findByCode(code: string): Promise<SystemSetting | null>;
}
