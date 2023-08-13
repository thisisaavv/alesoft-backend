import { prisma } from "../../../config/prisma";
import { CompanyServices } from "../application/company-services";
import { CompanyController } from "./http/controllers/company.controller";
import { CompanyRouter } from "./http/routes/company.routes";
import { PrismaCompanyRepository } from "./persistence/prisma-company-repository";

const companyRepository = new PrismaCompanyRepository(prisma);
const companyServices = new CompanyServices(companyRepository);
const companyController = new CompanyController(companyServices);
const companyRouter = new CompanyRouter(companyController);

const companyDependencies = {
	controller: companyController,
	services: companyServices,
	repository: companyRepository,
	router: companyRouter,
};

export default companyDependencies;
