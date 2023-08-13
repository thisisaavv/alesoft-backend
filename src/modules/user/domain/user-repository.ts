import { User } from "../domain/user.model";
import { IBaseRepository } from "../../../shared/domain/repository";

export interface UserRepository extends IBaseRepository<User> {
	findByEmail(email: string): Promise<User | null>;
	findByUsername(username: string): Promise<User | null>;
	findUserData(id: string): Promise<unknown>;
	findByRoleId(role: string): Promise<User[] | null>;
	findSessionsByUserId(userId: string): Promise<User | null>;
}
