import { prisma } from "../../../config/prisma";
import { UserRoleServices } from "../application/user-role-services";
import { UserRoleController } from "./http/controllers/user-role.controller";
import { UserRoleRouter } from "./http/routes/user-role.routes";
import { PrismaUserRoleRepository } from "./persistence/prisma-user-role-repository";

const userRoleRepository = new PrismaUserRoleRepository(prisma);
const userRoleServices = new UserRoleServices(userRoleRepository);
const userRoleController = new UserRoleController(userRoleServices);
const userRoleRouter = new UserRoleRouter(userRoleController);

const userRoleDependencies = {
	controller: userRoleController,
	services: userRoleServices,
	repository: userRoleRepository,
	router: userRoleRouter,
};

export default userRoleDependencies;
