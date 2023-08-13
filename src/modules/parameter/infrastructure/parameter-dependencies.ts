import { prisma } from "../../../config/prisma";
import { ParameterServices } from "../application/parameter-services";
import { ParameterController } from "./http/controllers/parameter.controller";
import { ParameterRouter } from "./http/routes/parameter.routes";
import { PrismaParameterRepository } from "./persistence/prisma-parameter-repository";

const parameterRepository = new PrismaParameterRepository(prisma);
const parameterServices = new ParameterServices(parameterRepository);
const parameterController = new ParameterController(parameterServices);
const parameterRouter = new ParameterRouter(parameterController);

const parameterDependencies = {
	controller: parameterController,
	services: parameterServices,
	repository: parameterRepository,
	router: parameterRouter,
};

export default parameterDependencies;
