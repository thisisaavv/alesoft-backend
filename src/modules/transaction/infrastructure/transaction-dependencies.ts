import { prisma } from "../../../config/prisma";
import { TransactionServices } from "../application/transaction-services";
import { TransactionController } from "./http/controllers/transaction.controller";
import { TransactionRouter } from "./http/routes/transaction.routes";
import { PrismaTransactionRepository } from "./persistence/prisma-transaction-repository";

const transactionRepository = new PrismaTransactionRepository(prisma);
const transactionServices = new TransactionServices(transactionRepository);
const transactionController = new TransactionController(transactionServices);
const transactionRouter = new TransactionRouter(transactionController);

const transactionDependencies = {
	controller: transactionController,
	services: transactionServices,
	repository: transactionRepository,
	router: transactionRouter,
};

export default transactionDependencies;
