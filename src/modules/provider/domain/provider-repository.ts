import { Provider } from "./provider.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface ProviderRepository extends IBaseRepository<Provider> {
	findByName(name: string): Promise<Provider | null>;
}
