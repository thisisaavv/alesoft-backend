import { prisma } from "../../../config/prisma";
import { InvoiceServices } from "../application/invoice-services";
import { InvoiceController } from "./http/controllers/invoice.controller";
import { InvoiceRouter } from "./http/routes/invoice.routes";
import { PrismaInvoiceRepository } from "./persistence/prisma-invoice-repository";

const invoiceRepository = new PrismaInvoiceRepository(prisma);
const invoiceServices = new InvoiceServices(invoiceRepository);
const invoiceController = new InvoiceController(invoiceServices);
const invoiceRouter = new InvoiceRouter(invoiceController);

const invoiceDependencies = {
	controller: invoiceController,
	services: invoiceServices,
	repository: invoiceRepository,
	router: invoiceRouter,
};

export default invoiceDependencies;
