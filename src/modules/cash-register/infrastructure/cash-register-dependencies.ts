import { prisma } from "../../../config/prisma";
import { CashRegisterServices } from "../application/cash-register-services";
import { CashRegisterController } from "./http/controllers/cash-register.controller";
import { CashRegisterRouter } from "./http/routes/cash-register.routes";
import { PrismaCashRegisterRepository } from "./persistence/prisma-cash-register-repository";

const cashRegisterRepository = new PrismaCashRegisterRepository(prisma);
const cashRegisterServices = new CashRegisterServices(cashRegisterRepository);
const cashRegisterController = new CashRegisterController(cashRegisterServices);
const cashRegisterRouter = new CashRegisterRouter(cashRegisterController);

const cashRegisterDependencies = {
	controller: cashRegisterController,
	services: cashRegisterServices,
	repository: cashRegisterRepository,
	router: cashRegisterRouter,
};

export default cashRegisterDependencies;
