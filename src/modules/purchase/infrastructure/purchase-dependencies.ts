import { prisma } from "../../../config/prisma";
import { PurchaseServices } from "../application/purchase-services";
import { PurchaseController } from "./http/controllers/purchase.controller";
import { PurchaseRouter } from "./http/routes/purchase.routes";
import { PrismaPurchaseRepository } from "./persistence/prisma-purchase-repository";

const purchaseRepository = new PrismaPurchaseRepository(prisma);
const purchaseServices = new PurchaseServices(purchaseRepository);
const purchaseController = new PurchaseController(purchaseServices);
const purchaseRouter = new PurchaseRouter(purchaseController);

const purchaseDependencies = {
	controller: purchaseController,
	services: purchaseServices,
	repository: purchaseRepository,
	router: purchaseRouter,
};

export default purchaseDependencies;
