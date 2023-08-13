import { prisma } from "../../../config/prisma";
import { InvoiceServices } from "../application/invoice-lote-services";
import { InvoiceLoteController } from "./http/controllers/invoice-lote.controller";
import { InvoiceLoteRouter } from "./http/routes/invoice-lote.routes";
import { PrismaInvoiceLoteRepository } from "./persistence/prisma-invoice-lote-repository";

const invoiceLoteRepository = new PrismaInvoiceLoteRepository(prisma);
const invoiceLoteServices = new InvoiceServices(invoiceLoteRepository);
const invoiceLoteController = new InvoiceLoteController(invoiceLoteServices);
const invoiceLoteRouter = new InvoiceLoteRouter(invoiceLoteController);

const invoiceLoteDependencies = {
	controller: invoiceLoteController,
	services: invoiceLoteServices,
	repository: invoiceLoteRepository,
	router: invoiceLoteRouter,
};

export default invoiceLoteDependencies;
