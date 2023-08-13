export const EmployeeContractType = {
	FULL_TIME: "FULL_TIME",
	PART_TIME: "PART_TIME",
	TEMPORARY: "TEMPORARY",
	INTERNSHIP: "INTERNSHIP",
	VOLUNTEER: "VOLUNTEER",
	OTHER: "OTHER",
} as const;
export type EmployeeContractType =
	(typeof EmployeeContractType)[keyof typeof EmployeeContractType];
export const PayrollType = {
	SALARY: "SALARY",
	BONUS: "BONUS",
	COMMISSION: "COMMISSION",
	OVERTIME: "OVERTIME",
	ALLOWANCE: "ALLOWANCE",
	OTHER: "OTHER",
} as const;
export type PayrollType = (typeof PayrollType)[keyof typeof PayrollType];
export const SessionRevokedReason = {
	REVOKED: "REVOKED",
	LOGOUT: "LOGOUT",
	EXPIRED: "EXPIRED",
} as const;
export type SessionRevokedReason =
	(typeof SessionRevokedReason)[keyof typeof SessionRevokedReason];
export const DiscountType = {
	PERCENTAGE: "PERCENTAGE",
	FIXED: "FIXED",
} as const;
export type DiscountType = (typeof DiscountType)[keyof typeof DiscountType];
export const TransactionType = {
	INCOME: "INCOME",
	EXPENSE: "EXPENSE",
} as const;
export type TransactionType =
	(typeof TransactionType)[keyof typeof TransactionType];
export const TransactionStatus = {
	PENDING: "PENDING",
	COMPLETED: "COMPLETED",
	FAILED: "FAILED",
	CANCELLED: "CANCELLED",
} as const;
export type TransactionStatus =
	(typeof TransactionStatus)[keyof typeof TransactionStatus];
export const PaymentType = {
	CASH: "CASH",
	CARD: "CARD",
	TRANSFER: "TRANSFER",
	OTHER: "OTHER",
} as const;
export type PaymentType = (typeof PaymentType)[keyof typeof PaymentType];
export const OrderStatus = {
	PENDING: "PENDING",
	PAID: "PAID",
	CANCELLED: "CANCELLED",
} as const;
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export const SystemClient = {
	HTTP_CLIENT: "HTTP_CLIENT",
	DELI_JUNIOR: "DELI_JUNIOR",
	ALESSANDROS_FOOD: "ALESSANDROS_FOOD",
} as const;
export type SystemClient = (typeof SystemClient)[keyof typeof SystemClient];
export const UnitType = {
	LENGTH: "LENGTH",
	AREA: "AREA",
	VOLUME: "VOLUME",
	WEIGHT: "WEIGHT",
	TIME: "TIME",
	DIGITAL: "DIGITAL",
	OTHER: "OTHER",
} as const;
export type UnitType = (typeof UnitType)[keyof typeof UnitType];
