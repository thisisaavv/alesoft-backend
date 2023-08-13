import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
	? ColumnType<S, I | undefined, U>
	: ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type {
	EmployeeContractType,
	PayrollType,
	SessionRevokedReason,
	DiscountType,
	TransactionType,
	TransactionStatus,
	PaymentType,
	OrderStatus,
	SystemClient,
	UnitType,
} from "./enums";

export type Analytic = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	value: string;
	type: string;
};
export type CashRegister = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	opening_amount: number;
	total_sales: Generated<number>;
	closing_amount: number | null;
	closing_date: Timestamp | null;
	note: string | null;
	terminal_id: string | null;
};
export type Category = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	name: string;
	description: string | null;
};
export type Company = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	created_by: Generated<string | null>;
	name: string;
	bussiness_id: string;
	logo_url: string | null;
	emails: string[];
	phones: string[];
	website_url: string | null;
	street: Generated<string | null>;
	country: Generated<string>;
	state: Generated<string>;
	city: Generated<string>;
};
export type Customer = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	first_name: string;
	middle_name: string | null;
	last_name: string;
	id_card: string | null;
	rtn: string | null;
	birthdate: Timestamp | null;
	emails: string[];
	phones: string[];
	website_url: string | null;
	street: Generated<string | null>;
	country: Generated<string>;
	state: Generated<string>;
	city: Generated<string>;
	company_id: string | null;
};
export type Discount = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	name: string;
	note: string | null;
	amount_type: Generated<DiscountType>;
	amount: number;
};
export type Employee = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	first_name: string;
	middle_name: string | null;
	last_name: string;
	id_card: string;
	birthdate: Timestamp;
	enabled: Generated<boolean>;
	contract_type: Generated<EmployeeContractType>;
	emails: string[];
	phones: string[];
	website_url: string | null;
	street: Generated<string | null>;
	country: Generated<string>;
	state: Generated<string>;
	city: Generated<string>;
	job_id: string;
	company_id: string;
};
export type Inventory = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	company_id: string;
};
export type Invoice = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	cai_number: string | null;
	file_url: string | null;
	sale_id: string;
	invoice_lote_id: string | null;
};
export type InvoiceLote = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	cai: string;
	start_date: Timestamp;
	end_date: Timestamp;
	start_range: string;
	end_range: string;
	current: string | null;
	used: Generated<boolean>;
};
export type Item = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	created_by: Generated<string | null>;
	name: string;
	description: string | null;
	quantity: number | null;
	price: number;
	images: string[];
	tax_id: string | null;
	category_id: string | null;
	inventory_id: string;
	provider_id: string | null;
};
export type ItemModifier = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	name: string;
};
export type ItemModifierOption = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	price: Generated<number>;
	item_modifier_id: string;
};
export type ItemVariant = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	name: string;
	options: string[];
};
export type ItemVariantOption = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	price: Generated<number>;
	item_variant_id: string;
};
export type Job = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string;
};
export type Log = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	client: SystemClient;
	type: string;
	message: string;
	table: string;
	query: string;
	row_id: string;
	row_data: unknown;
	hostname: string;
	ip: string;
	user_id: string;
};
export type Menu = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	name: string;
	description: string | null;
	image_url: string | null;
};
export type Payment = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	type: PaymentType;
	amount: number;
	note: string | null;
	transaction_id: string | null;
};
export type Payroll = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	amount: number;
	description: string | null;
	start_date: Timestamp;
	end_date: Timestamp;
	type: string;
};
export type PayrollItem = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	deductions: number;
	overtime: Generated<boolean>;
	salary: number;
	payroll_id: string;
	employee_id: string;
};
export type Provider = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	created_by: Generated<string | null>;
	name: string;
	bussiness_id: string;
	emails: string[];
	phones: string[];
	website_url: string | null;
	street: Generated<string | null>;
	country: Generated<string>;
	state: Generated<string>;
	city: Generated<string>;
};
export type Purchase = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	code: string;
	status: Generated<OrderStatus>;
	payment_method: Generated<PaymentType | null>;
	subtotal: number;
	total: number;
	note: string | null;
	expected_date: Timestamp;
	tax_id: string | null;
	provider_id: string;
};
export type PurchaseItem = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	price: string;
	quantity: number;
	total: number;
	note: string | null;
	purchase_id: string;
	item_id: string;
};
export type Sale = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	code: string;
	status: Generated<OrderStatus>;
	payment_method: Generated<PaymentType | null>;
	subtotal: number;
	total: number;
	note: string | null;
	tax_id: string | null;
	discount_id: string | null;
	customer_id: string | null;
};
export type SaleItem = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	price: string;
	note: string | null;
	quantity: number | null;
	sale_id: string | null;
	item_id: string;
	item_variant_id: string | null;
	item_modifier_id: string | null;
	discount_id: string | null;
};
export type SecurityQuestion = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	question: string;
	user_id: string | null;
};
export type SecurityQuestionAnswer = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	answer: string;
	question_id: string;
};
export type Session = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	token: string;
	expires_in: Timestamp;
	revoked: Generated<boolean>;
	revoked_reason: Generated<SessionRevokedReason | null>;
	user_id: string;
};
export type Shift = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	start_date: Timestamp;
	end_date: Timestamp;
	terminal_id: string | null;
};
export type SystemSetting = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	code: string;
	name: string;
	description: string;
	value: string;
};
export type Tax = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	name: string;
	description: string | null;
	rate: number;
};
export type Tenant = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	enabled: Generated<boolean>;
};
export type Terminal = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	company_id: string | null;
};
export type Transaction = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	type: TransactionType;
	sub_type: string | null;
	description: string | null;
	amount: number;
};
export type Unit = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	type: UnitType;
	description: string | null;
	symbol: string | null;
};
export type User = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	created_by: Generated<string | null>;
	email: string;
	username: string;
	password: string;
	enabled: Generated<boolean>;
	verified: Generated<boolean>;
	employee_id: string | null;
	user_role_id: string | null;
};
export type UserRole = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	enabled: Generated<boolean>;
	name: string;
	description: string | null;
	users_permission: Generated<boolean>;
	dashboard_permission: Generated<boolean>;
	jobs_permission: Generated<boolean>;
	payrolls_permission: Generated<boolean>;
	user_roles_permission: Generated<boolean>;
	employees_permission: Generated<boolean>;
	customers_permission: Generated<boolean>;
	companies_permission: Generated<boolean>;
	inventories_permission: Generated<boolean>;
	menus_permission: Generated<boolean>;
	items_permission: Generated<boolean>;
	items_variations_permission: Generated<boolean>;
	items_modifiers_permission: Generated<boolean>;
	pos_permission: Generated<boolean>;
	cash_register_permission: Generated<boolean>;
	terminals_permission: Generated<boolean>;
	categories_permission: Generated<boolean>;
	providers_permission: Generated<boolean>;
	taxes_permission: Generated<boolean>;
	discounts_permission: Generated<boolean>;
	transactions_permission: Generated<boolean>;
	invoices_permission: Generated<boolean>;
	payments_permission: Generated<boolean>;
	sales_permission: Generated<boolean>;
	sale_items_permission: Generated<boolean>;
	purchases_permission: Generated<boolean>;
	purchase_items_permission: Generated<boolean>;
	logs_permission: Generated<boolean>;
};
export type UserRolePermission = {
	id: string;
	created_at: Generated<Timestamp>;
	updated_at: Timestamp;
	name: string;
	description: string | null;
	key: string;
	key_group: string;
	user_role_id: string | null;
};
export type DB = {
	Analytic: Analytic;
	CashRegister: CashRegister;
	Category: Category;
	Company: Company;
	Customer: Customer;
	Discount: Discount;
	Employee: Employee;
	Inventory: Inventory;
	Invoice: Invoice;
	InvoiceLote: InvoiceLote;
	Item: Item;
	ItemModifier: ItemModifier;
	ItemModifierOption: ItemModifierOption;
	ItemVariant: ItemVariant;
	ItemVariantOption: ItemVariantOption;
	Job: Job;
	Log: Log;
	Menu: Menu;
	Payment: Payment;
	Payroll: Payroll;
	PayrollItem: PayrollItem;
	Provider: Provider;
	Purchase: Purchase;
	PurchaseItem: PurchaseItem;
	Sale: Sale;
	SaleItem: SaleItem;
	SecurityQuestion: SecurityQuestion;
	SecurityQuestionAnswer: SecurityQuestionAnswer;
	Session: Session;
	Shift: Shift;
	SystemSetting: SystemSetting;
	Tax: Tax;
	Tenant: Tenant;
	Terminal: Terminal;
	Transaction: Transaction;
	Unit: Unit;
	User: User;
	UserRole: UserRole;
	UserRolePermission: UserRolePermission;
};
