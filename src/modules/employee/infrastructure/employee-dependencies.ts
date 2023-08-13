import { prisma } from "../../../config/prisma";
import { EmployeeServices } from "../application/employee-services";
import { EmployeeController } from "./http/controllers/employee.controller";
import { EmployeeRouter } from "./http/routes/employee.routes";
import { PrismaEmployeeRepository } from "./persistence/prisma-employee-repository";

const employeeRepository = new PrismaEmployeeRepository(prisma);
const employeeServices = new EmployeeServices(employeeRepository);
const employeeController = new EmployeeController(employeeServices);
const employeeRouter = new EmployeeRouter(employeeController);

const employeeDependencies = {
	controller: employeeController,
	services: employeeServices,
	repository: employeeRepository,
	router: employeeRouter,
};

export default employeeDependencies;
