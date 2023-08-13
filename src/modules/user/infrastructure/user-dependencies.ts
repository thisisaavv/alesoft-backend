import { projectConfig } from "../../../config";
import { prisma } from "../../../config/prisma";
import { emailSender } from "../../../shared/infrastructure/dependecies";
import { UserServices } from "../application/user-services";
import { UserController } from "./http/controllers/user.controller";
import { UserRouter } from "./http/routes/user.routes";
import { PrismaUserRepository } from "./persistence/prisma-user-repository";

const userRepository = (() => {
	switch (projectConfig.database.type) {
		case "postgres":
			return new PrismaUserRepository(prisma);
		case "mysql":
			return new PrismaUserRepository(prisma);
		default:
			throw new Error("Database not supported");
	}
})();

const userServices = new UserServices(userRepository, emailSender);
const userController = new UserController(userServices);
const userRouter = new UserRouter(userController);

const userDependencies = {
	controller: userController,
	services: userServices,
	repository: userRepository,
	router: userRouter,
};

export default userDependencies;
// https://github.com/AlbertHernandez/repository-pattern-typescript-example/blob/main/src/users/infrastructure/dependencies.ts
