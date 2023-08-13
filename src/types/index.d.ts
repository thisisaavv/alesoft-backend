export interface Pagination {
	limit?: number;
	offset?: number;
}

export interface Options {
	pagination?: Pagination;
	where?: any;
}
