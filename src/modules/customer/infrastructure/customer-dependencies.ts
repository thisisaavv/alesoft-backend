import { prisma } from "../../../config/prisma";
import { CustomerServices } from "../application/customer-services";
import { CustomerController } from "./http/controllers/customer.controller";
import { CustomerRouter } from "./http/routes/customer.routes";
import { PrismaCustomerRepository } from "./persistence/prisma-customer-repository";

const customerRepository = new PrismaCustomerRepository(prisma);
const customerServices = new CustomerServices(customerRepository);
const customerController = new CustomerController(customerServices);
const customerRouter = new CustomerRouter(customerController);

const customerDependencies = {
	controller: customerController,
	services: customerServices,
	repository: customerRepository,
	router: customerRouter,
};

export default customerDependencies;
