import { prisma } from "../../../config/prisma";
import { ProviderServices } from "../application/provider-services";
import { ProviderController } from "./http/controllers/provider.controller";
import { ProviderRouter } from "./http/routes/provider.routes";
import { PrismaProviderRepository } from "./persistence/prisma-provider-repository";

const providerRepository = new PrismaProviderRepository(prisma);
const providerServices = new ProviderServices(providerRepository);
const providerController = new ProviderController(providerServices);
const providerRouter = new ProviderRouter(providerController);

const providerDependencies = {
	controller: providerController,
	services: providerServices,
	repository: providerRepository,
	router: providerRouter,
};

export default providerDependencies;
