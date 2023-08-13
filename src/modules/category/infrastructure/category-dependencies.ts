import { prisma } from "../../../config/prisma";
import { CategoryServices } from "../application/category-services";
import { CategoryController } from "./http/controllers/category.controller";
import { CategoryRouter } from "./http/routes/category.routes";
import { PrismaCategoryRepository } from "./persistence/prisma-category-repository";

const categoryRepository = new PrismaCategoryRepository(prisma);
const categoryServices = new CategoryServices(categoryRepository);
const categoryController = new CategoryController(categoryServices);
const categoryRouter = new CategoryRouter(categoryController);

const categoryDependencies = {
	controller: categoryController,
	services: categoryServices,
	repository: categoryRepository,
	router: categoryRouter,
};

export default categoryDependencies;
