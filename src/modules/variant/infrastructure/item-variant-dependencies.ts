import { prisma } from "../../../config/prisma";
import { ItemVariantServices } from "../application/item-variant-services";
import { ItemVariantController } from "./http/controllers/item-variant.controller";
import { ItemVariantRouter } from "./http/routes/item-variant.routes";
import { PrismaItemVariantRepository } from "./persistence/prisma-item-variant-repository";

const itemVariantRepository = new PrismaItemVariantRepository(prisma);
const itemVariantServices = new ItemVariantServices(itemVariantRepository);
const itemVariantController = new ItemVariantController(itemVariantServices);
const itemVariantRouter = new ItemVariantRouter(itemVariantController);

const itemVariantDependencies = {
	controller: itemVariantController,
	services: itemVariantServices,
	repository: itemVariantRepository,
	router: itemVariantRouter,
};

export default itemVariantDependencies;
