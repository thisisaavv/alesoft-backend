import { prisma } from "../../../config/prisma";
import { InventoryServices } from "../application/inventory-services";
import { InventoryController } from "./http/controllers/inventory.controller";
import { InventoryRouter } from "./http/routes/inventory.routes";
import { PrismaInventoryRepository } from "./persistence/prisma-inventory-repository";

const inventoryRepository = new PrismaInventoryRepository(prisma);
const inventoryServices = new InventoryServices(inventoryRepository);
const inventoryController = new InventoryController(inventoryServices);
const inventoryRouter = new InventoryRouter(inventoryController);

const inventoryDependencies = {
	controller: inventoryController,
	services: inventoryServices,
	repository: inventoryRepository,
	router: inventoryRouter,
};

export default inventoryDependencies;
