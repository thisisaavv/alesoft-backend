import { prisma } from "../../../config/prisma";
import { ItemServices } from "../application/item-services";
import { ItemController } from "./http/controllers/item.controller";
import { ItemRouter } from "./http/routes/item.routes";
import { PrismaItemRepository } from "./persistence/prisma-item-repository";

const itemRepository = new PrismaItemRepository(prisma);
const itemServices = new ItemServices(itemRepository);
const itemController = new ItemController(itemServices);
const itemRouter = new ItemRouter(itemController);

const itemDependencies = {
	controller: itemController,
	services: itemServices,
	repository: itemRepository,
	router: itemRouter,
};

export default itemDependencies;
