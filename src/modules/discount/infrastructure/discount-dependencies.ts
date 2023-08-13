import { prisma } from "../../../config/prisma";
import { DiscountServices } from "../application/discount-services";
import { DiscountController } from "./http/controllers/discount.controller";
import { DiscountRouter } from "./http/routes/discount.routes";
import { PrismaDiscountRepository } from "./persistence/prisma-discount-repository";

const discountRepository = new PrismaDiscountRepository(prisma);
const discountServices = new DiscountServices(discountRepository);
const discountController = new DiscountController(discountServices);
const discountRouter = new DiscountRouter(discountController);

const discountDependencies = {
	controller: discountController,
	services: discountServices,
	repository: discountRepository,
	router: discountRouter,
};

export default discountDependencies;
