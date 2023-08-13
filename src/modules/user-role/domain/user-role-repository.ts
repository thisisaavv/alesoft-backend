import { UserRole } from "./user-role.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface UserRoleRepository extends IBaseRepository<UserRole> {
	findByRoleName(name: string): Promise<UserRole | null>;
}
