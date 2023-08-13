import { Server } from "./server";
import authModule from "./modules/auth/infrastructure/auth-dependencies";
import userModule from "./modules/user/infrastructure/user-dependencies";
import personModule from "./modules/company/infrastructure/company-dependencies";
import customerModule from "./modules/customer/infrastructure/customer-dependencies";
import employeeModule from "./modules/employee/infrastructure/employee-dependencies";
import userRoleModule from "./modules/user-role/infrastructure/user-role-dependencies";
import itemModule from "./modules/item/infrastructure/item-dependencies";
import saleModule from "./modules/sale/infrastructure/sale-dependencies";
import inventoryModule from "./modules/inventory/infrastructure/inventory-dependencies";
import companyModule from "./modules/company/infrastructure/company-dependencies";
import discountModule from "./modules/discount/infrastructure/discount-dependencies";
import taxModule from "./modules/tax/infrastructure/tax-dependencies";
import providerModule from "./modules/provider/infrastructure/provider-dependencies";
import menuModule from "./modules/menu/infrastructure/menu-dependencies";
import jobModule from "./modules/job/infrastructure/job-dependencies";
import categoryModule from "./modules/category/infrastructure/category-dependencies";
import itemModifierModule from "./modules/modifier/infrastructure/item-modifier-dependencies";
import itemVariantModule from "./modules/variant/infrastructure/item-variant-dependencies";
import invoiceModule from "./modules/invoice/infrastructure/invoice-dependencies";
import invoiceLoteModule from "./modules/invoice-lote/infrastructure/invoice-lote-dependencies";
import purchaseModules from "./modules/purchase/infrastructure/purchase-dependencies";
import backupModule from "./modules/backup/infrastructure/backup-dependencies";
import parameterModule from "./modules/parameter/infrastructure/parameter-dependencies";
import cashRegisterModule from "./modules/cash-register/infrastructure/cash-register-dependencies";
import transactionModule from "./modules/transaction/infrastructure/transaction-dependencies";

export default new Server({
	routes: [
		backupModule.router,
		parameterModule.router,
		userModule.router,
		authModule.router,
		personModule.router,
		employeeModule.router,
		customerModule.router,
		userRoleModule.router,
		saleModule.router,
		purchaseModules.router,
		inventoryModule.router,
		itemModule.router,
		categoryModule.router,
		itemVariantModule.router,
		itemModifierModule.router,
		menuModule.router,
		companyModule.router,
		discountModule.router,
		taxModule.router,
		providerModule.router,
		jobModule.router,
		invoiceModule.router,
		invoiceLoteModule.router,
		cashRegisterModule.router,
		transactionModule.router,
	],
	middlewares: [],
});
