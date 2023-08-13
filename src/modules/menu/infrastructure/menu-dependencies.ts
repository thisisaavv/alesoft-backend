import { prisma } from "../../../config/prisma";
import { MenuServices } from "../application/menu-services";
import { MenuController } from "./http/controllers/menu.controller";
import { MenuRouter } from "./http/routes/menu.routes";
import { PrismaMenuRepository } from "./persistence/prisma-menu-repository";

const menuRepository = new PrismaMenuRepository(prisma);
const menuServices = new MenuServices(menuRepository);
const menuController = new MenuController(menuServices);
const menuRouter = new MenuRouter(menuController);

const menuDependencies = {
	controller: menuController,
	services: menuServices,
	repository: menuRepository,
	router: menuRouter,
};

export default menuDependencies;
