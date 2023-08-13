import { prisma } from "../../../config/prisma";
import { SaleServices } from "../application/sale-services";
import { SaleController } from "./http/controllers/sale.controller";
import { SaleRouter } from "./http/routes/sale.routes";
import { PrismaSaleRepository } from "./persistence/prisma-sale-repository";

const saleRepository = new PrismaSaleRepository(prisma);
const saleServices = new SaleServices(saleRepository);
const saleController = new SaleController(saleServices);
const saleRouter = new SaleRouter(saleController);

const saleDependencies = {
	controller: saleController,
	services: saleServices,
	repository: saleRepository,
	router: saleRouter,
};

export default saleDependencies;
