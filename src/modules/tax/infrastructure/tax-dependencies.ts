import { prisma } from "../../../config/prisma";
import { TaxServices } from "../application/tax-services";
import { TaxController } from "./http/controllers/tax.controller";
import { TaxRouter } from "./http/routes/tax.routes";
import { PrismaTaxRepository } from "./persistence/prisma-tax-repository";

const taxRepository = new PrismaTaxRepository(prisma);
const taxServices = new TaxServices(taxRepository);
const taxController = new TaxController(taxServices);
const taxRouter = new TaxRouter(taxController);

const taxDependencies = {
	controller: taxController,
	services: taxServices,
	repository: taxRepository,
	router: taxRouter,
};

export default taxDependencies;
