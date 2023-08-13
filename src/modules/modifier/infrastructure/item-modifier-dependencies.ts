import { prisma } from "../../../config/prisma";
import { ItemModifierServices } from "../application/item-modifier-services";
import { ItemModifierController } from "./http/controllers/item-modifier.controller";
import { ItemModifierRouter } from "./http/routes/item-modifier.routes";
import { PrismaItemModifierRepository } from "./persistence/prisma-item-modifier-repository";

const itemModifierRepository = new PrismaItemModifierRepository(prisma);
const itemModifierServices = new ItemModifierServices(itemModifierRepository);
const itemModifierController = new ItemModifierController(itemModifierServices);
const itemModifierRouter = new ItemModifierRouter(itemModifierController);

const itemModifierDependencies = {
	controller: itemModifierController,
	services: itemModifierServices,
	repository: itemModifierRepository,
	router: itemModifierRouter,
};

export default itemModifierDependencies;
